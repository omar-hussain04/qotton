import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "هودي الليالي الدافئة",
    slug: "warm-nights-hoodie",
    price: 149,
    originalPrice: 199,
    discount: 25,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"],
    colors: [
      { name: "بني داكن", hex: "#3B1A0E", stock: 10 },
      { name: "رملي", hex: "#D2B48C", stock: 5 }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "هودي فاخر مصنوع من أجود أنواع القطن، يوفر لك الدفء والراحة مع طابع عربي أصيل. مثالي للأمسيات الباردة.",
    category: "رجالي",
    tags: ["جديد", "bestseller"],
    rating: 4.8,
    reviewsCount: 124,
    isNew: true,
    inStock: true
  },
  {
    id: "p2",
    name: "هودي الأصالة",
    slug: "heritage-hoodie",
    price: 189,
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"],
    colors: [
      { name: "أسود ليلي", hex: "#111111", stock: 15 },
    ],
    sizes: ["M", "L", "XL"],
    description: "تصميم كلاسيكي يجمع بين الفخامة والبساطة.",
    category: "نسائي",
    tags: ["bestseller"],
    rating: 4.5,
    reviewsCount: 89,
    isNew: false,
    inStock: true
  },
  {
    id: "p3",
    name: "هودي الصحراء الذهبية",
    slug: "golden-desert-hoodie",
    price: 159,
    originalPrice: 189,
    discount: 15,
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"],
    colors: [
      { name: "ذهبي دافئ", hex: "#C9963A", stock: 8 },
      { name: "كريمي", hex: "#F5E6C8", stock: 12 }
    ],
    sizes: ["S", "M", "L"],
    description: "مستوحى من ألوان الصحراء الدافئة. مريح وأنيق لجميع الأوقات.",
    category: "للجنسين",
    tags: ["جديد"],
    rating: 4.9,
    reviewsCount: 45,
    isNew: true,
    inStock: true
  }
];
