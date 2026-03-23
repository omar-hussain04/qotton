import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop" 
            alt="Qotton Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <Container className="relative z-10 text-center py-20 flex flex-col items-center">
          <span className="text-accent tracking-widest text-sm md:text-base mb-4 font-medium uppercase">خيطٌ يَنسجُ لأثرٍ يَبقى</span>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-text font-bold mb-6 drop-shadow-2xl">
            قطن
          </h1>
          <p className="text-xl md:text-2xl text-text max-w-2xl mx-auto opacity-90 mb-10 leading-relaxed">
            هوديات بملمس الفخامة وتفاصيل الأصالة — لتُرافقك في كل لحظة وتمنحك الدفء بأناقة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full font-bold">
              اكتشف المجموعة
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full font-bold">
              تسوّق الآن
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-background">
        <Container>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent tracking-wider text-sm font-medium mb-2 block">المجموعة الأحدث</span>
              <h2 className="font-heading text-4xl md:text-5xl text-text">تألق بأصالة</h2>
            </div>
            <Button variant="link" className="hidden sm:inline-flex">عرض الكل</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" className="w-full">عرض الكل</Button>
          </div>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-surface border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-accent mb-8">نسج من الأصالة</h2>
            <p className="text-lg md:text-xl text-text/90 leading-relaxed mb-8">
              في قطن، نؤمن أن الملبس ليس مجرد قماش، بل قصة تُحكى في كل خيط. نحن نجمع بين التراث العربي العريق والتصميم العصري المريح لنقدم لك هوديات تعكس هويتك وترافقك في كل لحظاتك.
            </p>
            <div className="w-24 h-px bg-border mx-auto" />
          </div>
        </Container>
      </section>
    </div>
  );
}
