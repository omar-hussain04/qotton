"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCartStore } from "@/store/useCartStore";
import { getUserProfile, updateUserCart } from "@/lib/users";
import { CartItem } from "@/types";

/**
 * Headless component to handle cart synchronization between Firestore and Zustand.
 * Ensures the cart persists across sessions and is shared between devices for logged-in users.
 */
export function CartSync() {
  const { user, loading } = useAuth();
  const { items, setItems, clearCart } = useCartStore();
  const lastSyncUid = useRef<string | null>(null);
  const isInitialLoad = useRef(true);

  // 1. Handle Login/Logout sync
  useEffect(() => {
    if (loading) return;

    async function syncOnAuthStateChange() {
      if (user) {
        // Logged In: 
        // If we just logged in (uid changed from null/other to current user)
        if (lastSyncUid.current !== user.uid) {
          const profile = await getUserProfile(user.uid);
          const cloudItems = profile?.cart || [];
          
          if (items.length === 0) {
            // If local cart is empty, just take the cloud cart
            setItems(cloudItems);
          } else {
            // Merge local guest cart with cloud cart
            const mergedMap = new Map<string, CartItem>();
            
            // Add cloud items first
            cloudItems.forEach(item => mergedMap.set(item.id, { ...item }));
            
            // Merge local items
            items.forEach(localItem => {
              const existing = mergedMap.get(localItem.id);
              if (existing) {
                // If exists, sum the quantities
                existing.quantity += localItem.quantity;
              } else {
                // If new, add it
                mergedMap.set(localItem.id, { ...localItem });
              }
            });

            const mergedItems = Array.from(mergedMap.values());
            setItems(mergedItems);
            
            // Save the merged result back to cloud
            await updateUserCart(user.uid, mergedItems);
          }
          lastSyncUid.current = user.uid;
        }
      } else {
        // Logged Out:
        // Clear the cart on logout to prevent account data leakage
        if (lastSyncUid.current !== null) {
          clearCart();
          lastSyncUid.current = null;
        }
      }
      isInitialLoad.current = false;
    }

    syncOnAuthStateChange();
  }, [user, loading, setItems, clearCart]);

  // 2. Handle Continuous Sync (Local -> Cloud)
  // When items change and user is logged in, sync to Firestore
  useEffect(() => {
    if (loading || !user || isInitialLoad.current) return;

    // We use a small timeout to avoid double-syncing during the login merge process
    const timeoutId = setTimeout(async () => {
        // Double check uid hasn't changed (logout happened during timeout)
        if (lastSyncUid.current === user.uid) {
            await updateUserCart(user.uid, items);
        }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [items, user, loading]);

  return null;
}
