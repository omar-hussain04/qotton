import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[];
  setItems: (ids: string[]) => void;
  toggleItem: (id: string, userId?: string) => void;
  hasItem: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      setItems: (items) => set({ items }),
      toggleItem: (id, userId) => {
        const items = get().items;
        const newItems = items.includes(id) 
          ? items.filter((i) => i !== id) 
          : [...items, id];
        
        set({ items: newItems });

        // If user is logged in, sync to Firestore
        if (userId) {
          import("@/lib/users").then(lib => {
            lib.updateUserWishlist(userId, newItems);
          });
        }
      },
      hasItem: (id) => get().items.includes(id),
    }),
    {
      name: "qotton-wishlist",
    }
  )
);
