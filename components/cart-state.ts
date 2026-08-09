export type CartItem = {
  id: string;
  title: string;
  price: number;
  category?: string;
  image?: string;
  fallbackImage?: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "ziyad-books-cart";

export function parsePrice(value: string | number) {
  if (typeof value === "number") return value;
  const parsed = Number(value.replace(/[^0-9,.-]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCurrency(value: number) {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
  const current = readCart();
  const existing = current.find((cartItem) => cartItem.id === item.id);
  if (existing) existing.quantity += quantity;
  else current.push({ ...item, quantity });
  writeCart(current);
}

