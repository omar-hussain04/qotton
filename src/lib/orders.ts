import { collection, doc, setDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderInput } from "@/types";

export const ordersCollection = collection(db, "orders");

/** Create a new order in Firestore */
export async function createOrder(orderData: OrderInput, userId?: string): Promise<string> {
  try {
    const newOrderRef = doc(ordersCollection);
    await setDoc(newOrderRef, {
      ...orderData,
      userId: userId ?? null,
      status: "pending",
      paymentMethod: "cod",
      createdAt: Timestamp.now(),
    });
    return newOrderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/** Get all orders belonging to a specific user */
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const q = query(ordersCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Order[];

    // Sort descending by createdAt (avoids needing a composite index)
    orders.sort((a, b) => {
      const timeA = a.createdAt?.toMillis?.() ?? 0;
      const timeB = b.createdAt?.toMillis?.() ?? 0;
      return timeB - timeA;
    });

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
