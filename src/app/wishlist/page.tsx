"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/db";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { items } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    async function fetchProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  if (!mounted) return null;

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <Container className="py-12 min-h-[70vh]">
      <h1 className="font-heading text-4xl text-text font-bold mb-8 flex items-center gap-3">
        <Heart className="h-8 w-8 text-accent fill-accent" />
        المفضلة
      </h1>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-surface rounded-xl border border-border/50">
          <Heart className="h-20 w-20 text-muted mb-6" />
          <h2 className="text-2xl text-text font-medium mb-3">قائمة مفضلتك فارغة</h2>
          <p className="text-muted mb-8">لم تقم بإضافة أي منتجات إلى المفضلة بعد.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors bg-accent text-primary hover:bg-accent-light shadow-dark h-12 px-8"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
