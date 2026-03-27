"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { getUserOrders } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Calendar, MapPin, ChevronRight, Phone, User } from "lucide-react";
import { Order } from "@/types";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        setIsFetching(true);
        try {
          const data = await getUserOrders(user.uid);
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsFetching(false);
        }
      }
    }

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading || isFetching) {
    return (
      <Container className="py-20 min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container className="py-10 min-h-[70vh]">
      <div className="mb-8">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent font-medium mb-4 transition-colors">
          <ChevronRight className="h-4 w-4" /> العودة لحسابي
        </Link>
        <h1 className="font-heading text-4xl text-accent flex items-center gap-3">
          <Package className="h-8 w-8" /> الطلبات السابقة
        </h1>
        <p className="text-muted mt-2">استعرض تفاصيل وحالة طلباتك السابقة.</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface border border-border/50 rounded-xl p-12 text-center text-muted col-span-full">
          لا يوجد لديك طلبات سابقة حتى الآن.
          <div className="mt-6">
            <Link href="/products" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-colors bg-accent text-primary hover:bg-accent-light px-8 py-3 shadow-dark">
              تصفح المنتجات
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const date = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString("ar-SA") : "تاريخ غير متوفر";
            
            return (
              <div key={order.id} className="bg-surface border border-border/50 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-background/50 border-b border-border/50 p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div>
                    <div className="text-sm text-muted mb-1 flex items-center gap-2">
                       <bdo dir="ltr" className="font-numbers text-text">#{order.id.slice(0, 8).toUpperCase()}</bdo> :رقم الطلب
                    </div>
                    <div className="text-sm text-muted flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {date}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center w-full md:w-auto justify-between md:justify-end">
                    <span className="text-lg font-bold font-numbers text-accent">{order.totals?.finalTotal || 0} د.أ</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                      {order.status === "pending" ? "قيد المعالجة" : 
                       order.status === "processing" ? "قيد التجهيز" : 
                       order.status === "shipped" ? "تم الشحن" : order.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Items List */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-heading text-lg font-semibold text-text mb-3">المنتجات</h4>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-background/50 p-3 rounded-lg border border-border/50">
                        <div className="flex-1">
                          <h5 className="font-medium text-text">{item.name}</h5>
                          <div className="text-sm text-muted flex gap-3 mt-1">
                            {item.selectedSize && <span>المقاس: <bdo dir="ltr">{item.selectedSize}</bdo></span>}
                            {item.selectedColor && (
                              <span className="flex items-center gap-1">
                                اللون: 
                                <span className="w-3 h-3 rounded-full inline-block border border-border" style={{ backgroundColor: item.selectedColor }} />
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-muted">الكمية: {item.quantity}</div>
                          <div className="font-numbers text-accent font-medium">{item.price} د.أ</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-4 bg-background/30 p-4 rounded-lg border border-border/50">
                    <h4 className="font-heading text-lg font-semibold text-text mb-3">تفاصيل التوصيل</h4>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 text-muted mt-0.5" />
                        <div>
                          <p className="text-muted line-clamp-1">{order.customer?.firstName} {order.customer?.lastName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-muted mt-0.5" />
                        <div>
                          <p className="text-muted"><bdo dir="ltr">{order.customer?.phone}</bdo></p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-muted mt-0.5" />
                        <div>
                          <p className="text-muted">{order.customer?.city}</p>
                          <p className="text-muted mt-1">{order.customer?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
