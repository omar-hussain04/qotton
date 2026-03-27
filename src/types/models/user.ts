import type { Timestamp } from "firebase/firestore";

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  address?: string;
  email?: string;
  wishlist?: string[];
  updatedAt?: Timestamp;
}
