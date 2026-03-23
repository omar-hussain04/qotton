import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Noto_Sans_Arabic, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_Arabic({
  variable: "--font-noto-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "قطن | Qotton",
  description: "خيطٌ يَنسجُ لأثرٍ يَبقى - هوديات مصنوعة بعناية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoNaskh.variable} ${notoSans.variable} ${cormorant.variable} antialiased selection:bg-accent selection:text-primary`}>
      <body className="min-h-screen flex flex-col font-body">
        <Header />
        <main className="flex-1 shrink-0 bg-background relative z-0">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
