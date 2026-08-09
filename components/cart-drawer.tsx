"use client";

import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CartItem, formatCurrency, readCart, writeCart } from "./cart-state";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  function updateItem(id: string, change: number) {
    const next = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item);
    setItems(next);
    writeCart(next);
  }

  function removeItem(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    writeCart(next);
  }

  return (
    <div className={`fixed inset-0 z-[120] transition ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button type="button" onClick={onClose} className={`absolute inset-0 bg-black/45 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} aria-label="Tutup keranjang" />
      <aside className={`absolute right-0 top-0 flex h-full w-[min(100%,520px)] flex-col bg-[#fff0f8] shadow-2xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`} aria-label="Shopping Cart">
        <div className="border-b border-[#f2cfe1] px-7 pb-5 pt-6"><div className="flex items-center justify-between"><h2 className="text-3xl font-semibold">Keranjang</h2><button type="button" onClick={onClose} aria-label="Tutup keranjang"><X size={27} /></button></div><p className="mt-2 text-sm leading-relaxed">Gunakan kode kupon <b>WELCOME10</b> untuk diskon 10% pesanan pertama.</p><p className="mt-5 text-sm">Belanja lebih banyak untuk mendapatkan <span className="rounded-full bg-[#ffd1e6] px-3 py-1 font-medium">free shipping</span></p><div className="mt-3 h-1.5 rounded-full bg-[#ffd3e6]"><div className="h-full w-2/3 rounded-full bg-[#16852d]" /></div></div>
        <div className="min-h-0 flex-1 overflow-y-auto px-7">{items.length ? items.map((item) => <div key={item.id} className="flex gap-4 border-b border-[#f2cfe1] py-6"><div className="grid size-[92px] shrink-0 place-items-center rounded-xl border border-[#f4c3db] bg-white p-2"><img src={item.image || item.fallbackImage || "/product-1.avif"} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = item.fallbackImage || "/product-1.avif"; }} alt={item.title} className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><p className="text-xs text-[#6b6068]">{item.category || "Ziyad Books"}</p><h3 className="mt-1 text-lg font-medium leading-snug">{item.title}</h3><p className="mt-3 font-medium">{formatCurrency(item.price)}</p><div className="mt-4 flex items-center gap-5"><div className="flex h-12 items-center gap-5 rounded-xl bg-[#ffcbe2] px-4"><button type="button" onClick={() => updateItem(item.id, -1)} aria-label={`Kurangi ${item.title}`}><Minus size={16} /></button><span>{item.quantity}</span><button type="button" onClick={() => updateItem(item.id, 1)} aria-label={`Tambah ${item.title}`}><Plus size={16} /></button></div><button type="button" onClick={() => removeItem(item.id)} className="text-[#d5006d]" aria-label={`Hapus ${item.title}`}><Trash2 size={21} /></button></div></div></div>) : <div className="grid h-full place-items-center py-20 text-center"><ShoppingBasket className="text-[#d5006d]" size={42} /><p className="mt-3 text-lg font-semibold">Keranjang masih kosong</p></div>}</div>
        <div className="border-t border-[#edc6d9] bg-[#f9d6e8] p-6"><div className="flex items-center justify-between"><span className="text-lg">Total item dipilih</span><b className="text-lg">{totalItems}</b></div><div className="mt-2 flex items-center justify-between"><span className="text-lg underline">Subtotal</span><b className="text-2xl">{formatCurrency(subtotal)}</b></div><p className="mt-2 text-xs">Pajak dan ongkos kirim dihitung saat checkout.</p><Link href="/cart" onClick={onClose} className="mt-4 block rounded-xl bg-[#d5006d] py-4 text-center font-semibold text-white">Checkout</Link><Link href="/cart" onClick={onClose} className="mt-4 block text-center text-lg underline underline-offset-4">Lihat keranjang</Link></div>
      </aside>
    </div>
  );
}
