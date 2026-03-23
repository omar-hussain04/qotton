"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCartStore } from "@/store/useCartStore";
import { SearchModal } from "./SearchModal";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-text hover:text-accent transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">القائمة</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-3xl text-accent font-bold">قطن</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-text hover:text-accent transition-colors font-medium">الرئيسية</Link>
            <Link href="/products" className="text-text hover:text-accent transition-colors font-medium">المنتجات</Link>
            <Link href="/about" className="text-text hover:text-accent transition-colors font-medium">عن قطن</Link>
            <Link href="/contact" className="text-text hover:text-accent transition-colors font-medium">تواصل معنا</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              className="text-text hover:text-accent transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">بحث</span>
            </button>
            <Link href="/wishlist" className="hidden sm:block text-text hover:text-accent transition-colors relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">المفضلة</span>
            </Link>
            <button 
              className="text-text hover:text-accent transition-colors relative"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-primary flex items-center justify-center font-numbers">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">السلة</span>
            </button>
            <Link href="/account" className="hidden sm:block text-text hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              <span className="sr-only">حسابي</span>
            </Link>
          </div>
        </div>
      </Container>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
