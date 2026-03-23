import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/data";

export default function ProductsPage() {
  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-accent mb-2">أحدث المجموعات</h1>
        <p className="text-muted text-lg">اكتشف هوديات صُممت بعناية لتُعانق ذوقك الرفيع.</p>
      </div>

      {/* Simple Filters UI */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-4 border-b border-border overflow-x-auto">
        <button className="px-5 py-2 rounded-full border border-accent bg-accent text-primary text-sm font-medium whitespace-nowrap">الكل</button>
        <button className="px-5 py-2 rounded-full border border-border text-muted hover:text-text hover:border-accent/50 text-sm font-medium whitespace-nowrap transition-colors">رجالي</button>
        <button className="px-5 py-2 rounded-full border border-border text-muted hover:text-text hover:border-accent/50 text-sm font-medium whitespace-nowrap transition-colors">نسائي</button>
        <button className="px-5 py-2 rounded-full border border-border text-muted hover:text-text hover:border-accent/50 text-sm font-medium whitespace-nowrap transition-colors">أطفال</button>
        <button className="px-5 py-2 rounded-full border border-border text-muted hover:text-text hover:border-accent/50 text-sm font-medium whitespace-nowrap transition-colors">للجنسين</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* Repeating the array to fill the grid for demo purposes */}
        {mockProducts.map((product) => (
          <ProductCard key={`${product.id}-clone`} product={{...product, id: `${product.id}-clone`, name: `${product.name} (نسخة)`}} />
        ))}
        {mockProducts.map((product) => (
          <ProductCard key={`${product.id}-clone2`} product={{...product, id: `${product.id}-clone2`, name: `${product.name} (نسخة ٢)`}} />
        ))}
      </div>
    </Container>
  );
}
