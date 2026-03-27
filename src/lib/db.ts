/**
 * db.ts — Backwards-compatible barrel
 * All Firestore logic has been split into focused service modules.
 * Import directly from the specific service for new code.
 */

// Products
export { productsCollection, getProducts, getProductBySlug } from "./products";

// Orders
export { ordersCollection, createOrder, getUserOrders } from "./orders";

// Users
export { getUserProfile, saveUserProfile } from "./users";

// Messages
export { messagesCollection, saveContactMessage } from "./messages";
