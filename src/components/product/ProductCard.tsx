"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleItem, hasItem } = useWishlistStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isFavorited = mounted ? hasItem(product.id) : false;

  return (
    <div className="group relative flex flex-col bg-background rounded-lg hover:shadow-dark transition-all duration-300">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-lg bg-surface">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">عن المنتج {product.name}</span>
        </Link>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          {product.isNew && <Badge>جديد</Badge>}
          {product.discount && <Badge variant="destructive">خصم %{product.discount}</Badge>}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product.id);
          }}
          className="absolute top-3 left-3 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-text hover:text-accent transition-colors shadow-sm"
        >
          <Heart className={cn("h-4 w-4 transition-colors", isFavorited ? "fill-accent text-accent" : "")} />
          <span className="sr-only">أضف للمفضلة</span>
        </button>

        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <Button className="w-full gap-2 shadow-dark">
            <ShoppingCart className="h-4 w-4" />
            أضف للسلة
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 pb-5">
        <div className="text-xs text-muted mb-1">{product.category}</div>
        <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors">
          <h3 className="font-heading font-medium text-lg leading-tight mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="mt-auto flex items-center gap-3">
          <span className="font-numbers text-xl font-bold text-accent">
            {product.price} ر.س
          </span>
          {product.originalPrice && (
            <span className="font-numbers text-sm text-muted line-through">
              {product.originalPrice} ر.س
            </span>
          )}
        </div>

        {/* Colors Available */}
        <div className="mt-3 flex gap-1.5">
          {product.colors.map((color) => (
            <div 
              key={color.name}
              className="h-4 w-4 rounded-full border border-border/50 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
