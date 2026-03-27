import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { ContactMessage } from "@/types";

export const messagesCollection = collection(db, "messages");

/** Save a contact form submission to Firestore */
export async function saveContactMessage(messageData: ContactMessage): Promise<string> {
  try {
    const docRef = await addDoc(messagesCollection, {
      ...messageData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
}
