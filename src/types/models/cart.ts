import type { Product } from "./product";

export interface CartItem {
  /** Unique ID constructed from productId-color-size */
  id: string;
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  product: Product;
}
