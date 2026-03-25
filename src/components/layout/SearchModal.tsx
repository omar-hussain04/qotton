"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { mockProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const lowerQuery = query.toLowerCase();
  const results = query.trim().length > 1 
    ? mockProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col pt-16 sm:pt-24 px-4 bg-background/95 backdrop-blur-md transition-opacity">
      <div className="absolute inset-0 z-0" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-surface border border-border/50 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        <div className="flex items-center px-4 h-16 border-b border-border gap-3">
          <SearchIcon className="h-5 w-5 text-muted" />
          <input 
            autoFocus
            type="text"
            placeholder="ابحث عن منتج، فئة..."
            className="flex-1 bg-transparent border-none outline-none text-text text-lg h-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 text-muted hover:text-accent transition-colors rounded-full hover:bg-background">
            <X className="h-5 w-5" />
          </button>
        </div>

        {query.trim().length > 1 && (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {results.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">النتائج ({results.length})</h3>
                {results.map(product => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 hover:bg-background rounded-lg border border-transparent hover:border-border transition-all group"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-background">
                      <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-text mb-1">{product.name}</h4>
                      <p className="text-accent font-numbers">{product.price} د.أ</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted">
                لا توجد نتائج مطابقة لبحثك &quot;{query}&quot;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
