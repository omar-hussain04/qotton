import { NextResponse } from "next/server";
import { setDoc, doc } from "firebase/firestore";
import { productsCollection } from "@/lib/db";
import { mockProducts } from "@/lib/data";

export async function GET() {
  try {
    let count = 0;
    for (const product of mockProducts) {
      // Use the product ID as the document ID
      const productRef = doc(productsCollection, product.id);
      await setDoc(productRef, product);
      count++;
    }
    return NextResponse.json({ message: `Successfully seeded ${count} products to Firestore.` });
  } catch (error: unknown) {
    console.error("Error seeding DB:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
