"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useWishlistStore } from "@/store/useWishlistStore";
import { getUserProfile, updateUserWishlist } from "@/lib/users";

/**
 * Headless component to handle wishlist synchronization between Firestore and Zustand.
 */
export function WishlistSync() {
  const { user, loading } = useAuth();
  const { items, setItems } = useWishlistStore();
  const lastSyncUid = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;

    async function sync() {
      if (user) {
        // Logged In:
        // 1. If we just logged in (uid changed from null/other to current user)
        if (lastSyncUid.current !== user.uid) {
          const profile = await getUserProfile(user.uid);
          const cloudItems = profile?.wishlist || [];
          
          // Merge local items with cloud items (avoid losing guest wishlist data)
          const mergedItems = Array.from(new Set([...items, ...cloudItems]));
          
          // Update both store and firestore with merged result
          setItems(mergedItems);
          if (mergedItems.length > cloudItems.length) {
             await updateUserWishlist(user.uid, mergedItems);
          }
          lastSyncUid.current = user.uid;
        }
      } else {
        // Logged Out:
        // Clear wishlist when user logs out for privacy and account isolation
        if (lastSyncUid.current !== null) {
          setItems([]);
          lastSyncUid.current = null;
        }
      }
    }

    sync();
  }, [user, loading, setItems]); // We only sync on auth state change

  return null;
}
