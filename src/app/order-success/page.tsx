import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <Container className="py-20 max-w-2xl text-center">
      <div className="bg-surface border border-border/50 rounded-2xl p-10 flex flex-col items-center shadow-2xl">
        <CheckCircle2 className="h-24 w-24 text-accent mb-6" />
        <h1 className="font-heading text-4xl md:text-5xl text-text font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-lg text-muted mb-8 text-balance">
          شكراً لتسوقك من قطن. سيتم تجهيز طلبك قريباً والتواصل معك من قبل مندوب التوصيل.
        </p>
        
        <div className="bg-background border border-border rounded-lg p-6 w-full max-w-sm mb-10">
          <div className="text-sm text-muted mb-2">رقم الطلب</div>
          <div className="font-numbers text-3xl font-bold text-accent">#{orderNumber}</div>
        </div>

        <Link 
          href="/products" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-colors bg-accent text-primary hover:bg-accent-light shadow-dark h-14 px-10 text-lg w-full max-w-sm"
        >
          متابعة التسوق
        </Link>
      </div>
    </Container>
  );
}
