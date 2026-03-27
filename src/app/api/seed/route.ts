import { NextResponse } from "next/server";
import { setDoc, doc } from "firebase/firestore";
import { productsCollection } from "@/lib/db";
import { mockProducts } from "@/lib/data";

export async function GET(req: Request) {
  // Security Guard: Prevent accidental seeding in production or by unauthorized users
  const isDev = process.env.NODE_ENV === 'development';
  const seedSecret = process.env.SEED_SECRET;
  const providedSecret = req.headers.get('x-seed-secret');

  if (!isDev && (!seedSecret || providedSecret !== seedSecret)) {
    return NextResponse.json({ error: "Unauthorized. Seed is disabled in production." }, { status: 401 });
  }

  try {
    let count = 0;
    for (const product of mockProducts) {
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
