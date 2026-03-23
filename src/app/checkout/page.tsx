"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronRight, CreditCard, Banknote, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total > 399 ? 0 : 25;
  const finalTotal = total + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/order-success");
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-heading text-4xl text-accent mb-4">السلة فارغة</h1>
        <p className="text-muted mb-8">يرجى إضافة منتجات للسلة لإتمام الطلب.</p>
        <Link href="/products" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors bg-accent text-primary hover:bg-accent-light shadow-dark h-10 px-4 py-2">
          العودة للتسوق
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-8 transition-colors">
        <ChevronRight className="h-4 w-4" /> العودة للتسوق
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="font-heading text-3xl font-bold text-text mb-8">إتمام الطلب</h1>
          
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping Info */}
            <section className="bg-surface p-6 rounded-lg border border-border/50">
              <h2 className="font-heading text-xl text-accent mb-6 font-semibold">١. بيانات المستلم</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">الاسم الأول</label>
                  <input required className="w-full bg-background border border-border rounded-sm h-12 px-4 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">الاسم الأخير</label>
                  <input required className="w-full bg-background border border-border rounded-sm h-12 px-4 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-text">رقم الجوال</label>
                  <input required type="tel" dir="ltr" placeholder="+966 5X XXX XXXX" className="w-full bg-background border border-border rounded-sm h-12 px-4 text-text focus:outline-none focus:ring-2 focus:ring-accent text-right" />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="bg-surface p-6 rounded-lg border border-border/50">
              <h2 className="font-heading text-xl text-accent mb-6 font-semibold">٢. عنوان التوصيل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-text">المدينة</label>
                  <select required className="w-full bg-background border border-border rounded-sm h-12 px-4 text-text focus:outline-none focus:ring-2 focus:ring-accent appearance-none">
                    <option value="">اختر المدينة...</option>
                    <option value="riyadh">الرياض</option>
                    <option value="jeddah">جدة</option>
                    <option value="dammam">الدمام</option>
                    <option value="mecca">مكة المكرمة</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-text">العنوان التفصيلي (الحي، الشارع)</label>
                  <input required className="w-full bg-background border border-border rounded-sm h-12 px-4 text-text focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-surface p-6 rounded-lg border border-border/50">
              <h2 className="font-heading text-xl text-accent mb-6 font-semibold">٣. طريقة الدفع</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer hover:bg-background/50 transition-colors">
                  <input type="radio" name="payment" value="card" defaultChecked className="text-accent focus:ring-accent scale-125 accent-accent" />
                  <CreditCard className="text-muted h-5 w-5" />
                  <span className="font-medium text-text">البطاقة الائتمانية / مدى</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border rounded-sm cursor-pointer hover:bg-background/50 transition-colors">
                  <input type="radio" name="payment" value="cod" className="text-accent focus:ring-accent scale-125 accent-accent" />
                  <Banknote className="text-muted h-5 w-5" />
                  <span className="font-medium text-text">الدفع عند الاستلام</span>
                </label>
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-lg border border-border/50 sticky top-24">
            <h2 className="font-heading text-xl text-text mb-6 font-bold">ملخص الطلب</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text line-clamp-1 flex-1 ml-2">{item.quantity}x {item.product.name}</span>
                  <span className="font-numbers text-accent font-medium whitespace-nowrap">{item.product.price * item.quantity} ر.س</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-muted text-sm relative">
                <span>المجموع الفرعي</span>
                <span className="font-numbers">{total} ر.س</span>
              </div>
              <div className="flex justify-between text-muted text-sm">
                <span>الشحن</span>
                <span className="font-numbers">{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span>
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 mb-8">
              <div className="flex justify-between items-center text-text font-bold">
                <span className="text-lg">الإجمالي</span>
                <span className="font-numbers text-2xl text-accent">{finalTotal} ر.س</span>
              </div>
            </div>

            <Button type="submit" form="checkout-form" size="lg" className="w-full text-lg h-14 shadow-dark">
              تأكيد الطلب
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck className="h-4 w-4" />
              تسوق آمن ومشفر 100%
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
