"use client";

import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockProducts } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = mockProducts.find(p => p.slug === resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);

  const addItemToCart = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItemToCart(product, quantity, selectedColor.name, selectedSize);
  };

  return (
    <Container className="py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-accent transition-colors">المنتجات</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-text">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="flex flex-col gap-4 md:sticky md:top-24">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-surface border border-border/30">
            <Image 
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.isNew && (
              <div className="absolute top-4 right-4 z-10">
                <Badge>جديد</Badge>
              </div>
            )}
            <button className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-text hover:text-accent transition-colors shadow-sm">
              <Heart className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(img)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  activeImage === img ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${product.name} - صورة ${i+1}`} fill sizes="(max-width: 768px) 25vw, 15vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-accent font-medium">{product.category}</div>
          <h1 className="font-heading text-3xl md:text-5xl text-text font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-4 mb-6">
            <span className="font-numbers text-3xl text-accent font-bold">{product.price} د.أ</span>
            {product.originalPrice && (
              <span className="font-numbers text-lg text-muted line-through mb-1.5">{product.originalPrice} د.أ</span>
            )}
            {product.discount && (
              <Badge variant="destructive" className="mb-1.5">خصم %{product.discount}</Badge>
            )}
          </div>

          <p className="text-text/90 text-lg leading-relaxed mb-8">{product.description}</p>

          <div className="w-full h-px bg-border/50 mb-8" />

          {/* Color Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-text">اللون: <span className="text-muted mr-1">{selectedColor.name}</span></span>
            </div>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "relative h-10 w-10 rounded-full flex items-center justify-center transition-all",
                    selectedColor.name === color.name ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "hover:scale-110 shadow-sm"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-text">المقاس: <span className="text-accent font-bold mr-1">{selectedSize}</span></span>
              <button className="text-sm text-muted underline underline-offset-4 hover:text-accent transition-colors">دليل المقاسات</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "flex-1 min-w-[3rem] h-12 rounded-sm border flex items-center justify-center font-numbers text-lg font-medium transition-all",
                    selectedSize === size 
                      ? "border-accent bg-accent/10 text-accent font-bold" 
                      : "border-border text-text hover:border-accent/50 hover:bg-surface"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <div className="flex items-center border border-border rounded-sm h-14 bg-surface">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full flex items-center justify-center text-text hover:text-accent disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-numbers w-8 text-center text-lg font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-full flex items-center justify-center text-text hover:text-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg gap-3"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5" />
              أضف للسلة
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-sm bg-surface border border-border/50">
              <Truck className="text-accent h-6 w-6" />
              <div>
                <div className="font-medium text-text text-sm mb-0.5">شحن مجاني</div>
                <div className="text-xs text-muted">للطلبات فوق ٥٠ د.أ</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-sm bg-surface border border-border/50">
              <ShieldCheck className="text-accent h-6 w-6" />
              <div>
                <div className="font-medium text-text text-sm mb-0.5">جودة مضمونة</div>
                <div className="text-xs text-muted">استبدال خلال ١٤ يوم</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-sm bg-surface border border-border/50">
              <RefreshCw className="text-accent h-6 w-6" />
              <div>
                <div className="font-medium text-text text-sm mb-0.5">إرجاع سهل</div>
                <div className="text-xs text-muted">سياسة إرجاع مرنة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
