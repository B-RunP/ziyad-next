"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem, formatCurrency, readCart, writeCart } from "../../components/cart-state";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => { const next = readCart(); setItems(next); setSelected(next.map((item) => item.id)); };
    sync();
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const selectedItems = items.filter((item) => selected.includes(item.id));
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateItem(id: string, change: number) {
    const next = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item);
    setItems(next); writeCart(next);
  }

  function removeItem(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next); setSelected((current) => current.filter((selectedId) => selectedId !== id)); writeCart(next);
  }

  return <main className="min-h-screen bg-white text-[#29252D]"><div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-10 md:py-16"><div className="flex items-start justify-between gap-8"><div><h1 className="text-3xl font-semibold md:text-4xl">Keranjang belanja</h1><p className="mt-3 text-sm">Gunakan kode kupon <b>WELCOME10</b> untuk diskon 10% pesanan pertama.</p><p className="mt-6 text-sm">Belanja lebih banyak untuk mendapatkan <span className="rounded-full bg-[#ffd1e6] px-3 py-1">free shipping</span></p><div className="mt-3 h-1.5 w-[360px] max-w-full rounded-full bg-[#ddd]"><div className="h-full w-2/3 rounded-full bg-[#16852d]" /></div></div><Link href="/" className="text-sm underline">Lanjut belanja →</Link></div><div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px]"><section><div className="hidden grid-cols-[1fr_180px_110px] border-b border-[#ddd] px-1 pb-4 text-sm font-semibold md:grid"><span>Produk</span><span>Jumlah</span><span>Total</span></div>{items.length ? items.map((item) => <div key={item.id} className="grid gap-4 border-b border-[#e5e5e5] py-7 md:grid-cols-[1fr_180px_110px] md:items-center"><label className="flex min-w-0 items-center gap-4"><input type="checkbox" checked={selected.includes(item.id)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id))} className="size-4 accent-[#d5006d]" aria-label={`Pilih ${item.title}`} /><span className="grid size-16 shrink-0 place-items-center rounded-lg border border-[#e6e6e6] bg-white p-2"><img src={item.image || item.fallbackImage || "/product-1.avif"} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = item.fallbackImage || "/product-1.avif"; }} alt={item.title} className="h-full w-full object-contain" /></span><span className="min-w-0"><small className="block text-xs text-[#777]">{item.category || "Ziyad Books"}</small><b className="mt-1 block truncate text-sm">{item.title}</b><span className="mt-1 block text-sm">{formatCurrency(item.price)}</span></span></label><div className="ml-8 flex items-center gap-4 md:ml-0"><div className="flex items-center gap-4 rounded-lg bg-[#f5f5f5] px-3 py-2"><button type="button" onClick={() => updateItem(item.id, -1)} aria-label="Kurangi"><Minus size={13} /></button><span className="text-sm">{item.quantity}</span><button type="button" onClick={() => updateItem(item.id, 1)} aria-label="Tambah"><Plus size={13} /></button></div><button type="button" onClick={() => removeItem(item.id)} aria-label={`Hapus ${item.title}`} className="text-[#d5006d]"><Trash2 size={17} /></button></div><strong className="ml-8 text-sm md:ml-0">{formatCurrency(item.price * item.quantity)}</strong></div>) : <p className="py-16 text-center text-sm text-[#777]">Keranjang masih kosong.</p>}</section><aside className="h-fit rounded-sm bg-[#f9e1ee] p-5"><div className="flex items-center justify-between"><span className="text-lg underline">Subtotal</span><b>{formatCurrency(subtotal)}</b></div><p className="mt-4 text-xs">Total item dipilih: {totalItems}</p><p className="mt-2 text-xs">Pajak dan ongkos kirim dihitung saat checkout.</p><button type="button" disabled={!selectedItems.length} className="mt-5 w-full rounded-lg bg-[#d5006d] py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Checkout</button></aside></div></div></main>;
}
