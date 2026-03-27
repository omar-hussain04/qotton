import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "@/types";

export const productsCollection = collection(db, "products");

/** Fetch all products from Firestore */
export async function getProducts(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/** Fetch a single product by its slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(productsCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
