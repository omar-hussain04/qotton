import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AuthProvider } from "@/components/providers/AuthProvider";

const lyonArabic = localFont({
  src: [
    {
      path: '../../public/fonts/COMM - Lyon Arabic Display Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/COMM - Lyon Arabic Display Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/COMM - Lyon Arabic Display Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/COMM - Lyon Arabic Display Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/COMM - Lyon Arabic Display Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-lyon',
  display: 'swap',
});

const tsHikayat = localFont({
  src: '../../public/fonts/TSHikayatVF.otf',
  variable: '--font-hikayat',
  display: 'swap',
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
    <html lang="ar" dir="rtl" className={`${tsHikayat.variable} ${lyonArabic.variable} ${cormorant.variable} antialiased selection:bg-accent selection:text-primary`}>
      <body className="min-h-screen flex flex-col font-body">
        <AuthProvider>
          <Header />
          <main className="flex-1 shrink-0 bg-background relative z-0">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
