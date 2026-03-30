import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile, CartItem } from "@/types";

/** Fetch a user's profile from Firestore */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/** Save or update a user's profile in Firestore */
export async function saveUserProfile(userId: string, profileData: UserProfile): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { ...profileData, updatedAt: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

/** Update only the wishlist field for a user */
export async function updateUserWishlist(userId: string, wishlist: string[]): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { wishlist, updatedAt: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    throw error;
  }
}

/** Update only the cart field for a user */
export async function updateUserCart(userId: string, cart: CartItem[]): Promise<void> {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { cart, updatedAt: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}
