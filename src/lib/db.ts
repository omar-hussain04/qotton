import { collection, getDocs, getDoc, doc, setDoc, addDoc, Timestamp, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "@/types";

// Collection references
export const productsCollection = collection(db, "products");
export const ordersCollection = collection(db, "orders");
export const messagesCollection = collection(db, "messages");

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const snapshot = await getDocs(productsCollection);
    const product = snapshot.docs.find(doc => doc.data().slug === slug);
    if (product) {
      return { id: product.id, ...product.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// Create an order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createOrder(orderData: any, userId?: string) {
  try {
    const newOrderRef = doc(ordersCollection);
    await setDoc(newOrderRef, {
      ...orderData,
      userId: userId || null,
      status: "pending",
      paymentMethod: "cod",
      createdAt: Timestamp.now()
    });
    return newOrderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get user orders
export async function getUserOrders(userId: string) {
  try {
    const q = query(
      ordersCollection, 
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort orders by date descending locally since composite index is not guaranteed to exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders.sort((a: any, b: any) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

// Save contact message
export async function saveContactMessage(messageData: { name: string, email: string, subject: string, message: string }) {
  try {
    const docRef = await addDoc(messagesCollection, {
      ...messageData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
}

// ===== User Profile =====

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  address?: string;
  email?: string;
  updatedAt?: Timestamp;
}

// Get user profile
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

// Save or update user profile
export async function saveUserProfile(userId: string, profileData: UserProfile) {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
      ...profileData,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}
