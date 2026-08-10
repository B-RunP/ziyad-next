"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronRight, Grid2X2, Grip, Heart, List, MapPin, Menu, Search, ShoppingBasket, SlidersHorizontal, User, X } from "lucide-react";
import Link from "next/link";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

const fallbackImages = ["/product-1.avif", "/product-2.jpg", "/product-3.avif", "/product-4.jpg", "/product-5.avif", "/product-6.jpg", "/product-7.avif", "/product-8.jpg", "/product-9.avif", "/product-10.avif"];
const genres = ["Merchandise", "Flash Sale", "Kitab & Referensi", "Spiritualitas & Ibadah", "Promo Spesial", "Keluarga & Parenting", "Pengetahuan & Aktivitas Anak", "Edutoys", "Hobi & Kesehatan", "Kisah Hikmah & Motivasi", "Pre Order", "Remaja & Muslimah", "Pendidikan & Penunjang Sekolah", "Produk Ecer"];
const authors = ["Arthur Gonzalez", "Dana Chambers", "Ernesto Wade", "Karla Newman", "Misty Figueroa", "Rita James", "Suzanne Casey"];

type Product = {
  id: string;
  slug?: string;
  name: string;
  category: string;
  author: string;
  price: string;
  stockLabel?: string;
  image?: string;
  fallback: string;
};

function money(value: unknown) {
  if (typeof value === "number") return `Rp${value.toLocaleString("id-ID")}`;
  return String(value ?? "Rp0");
}

function normalizeProducts(payload: unknown): Product[] {
  const raw: unknown[] = [];
  const collect = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(collect);
    if (!value || typeof value !== "object") return;
    const item = value as Record<string, unknown>;
    const nested = item.products ?? item.items ?? item.data;
    if (Array.isArray(nested)) return nested.forEach(collect);
    if (item.name || item.title || item.product_name || item.productName) raw.push(item);
  };
  collect((payload as { data?: unknown })?.data ?? payload);

  return raw.slice(0, 12).map((entry, index) => {
    const item = entry as Record<string, unknown>;
    const rawImage = item.image ?? item.image_url ?? item.imageUrl ?? item.thumbnail;
    const image = typeof rawImage === "string" ? rawImage : undefined;
    return {
      id: String(item.id ?? item.product_id ?? index),
      slug: typeof item.slug === "string" ? item.slug : undefined,
      name: String(item.name ?? item.title ?? item.product_name ?? item.productName ?? `Produk ${index + 1}`),
      category: String(item.category_name ?? item.categoryName ?? item.category ?? "Koleksi Ziyad"),
      author: String(item.author_name ?? item.authorName ?? item.author ?? "Ziyad Books"),
      price: money(item.price ?? item.sale_price ?? item.selling_price ?? item.sellingPrice),
      stockLabel: typeof item.sisastok_label === "string" ? item.sisastok_label : typeof item.sisastokLabel === "string" ? item.sisastokLabel : undefined,
      image: image && /^(https?:\/\/|data:)/i.test(image) ? image : image ? `${apiBaseUrl}/${image.replace(/^\/+/, "")}` : undefined,
      fallback: fallbackImages[index % fallbackImages.length],
    };
  });
}

function ProductVisual({ product, list = false }: { product: Product; list?: boolean }) {
  return (
    <div className={`group relative ${list ? "h-[300px] w-[230px] shrink-0" : "aspect-[0.78] w-full"}`}>
      {product.image ? (
        <img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.src = product.fallback; }} className="h-full w-full rounded-[12px] object-contain" />
      ) : (
        <img src={product.fallback} alt={product.name} className="h-full w-full rounded-[12px] object-contain" />
      )}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2">
        <button type="button" aria-label={`Sukai ${product.name}`} className="grid size-10 translate-x-3 place-items-center rounded-full bg-white text-[#29252D] opacity-0 shadow-[0_8px_20px_rgba(41,37,45,0.14)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-[#ff5a4f] hover:text-white"><Heart size={19} /></button>
        <button type="button" aria-label={`Tambah ${product.name} ke keranjang`} className="grid size-10 translate-x-3 place-items-center rounded-full bg-white text-[#29252D] opacity-0 shadow-[0_8px_20px_rgba(41,37,45,0.14)] transition-all delay-75 duration-200 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-[#ff5a4f] hover:text-white"><ShoppingBasket size={19} /></button>
      </div>
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="min-w-0">
      <h3 className="mt-4 line-clamp-2 min-h-[48px] text-base font-semibold leading-snug text-[#29252D]">{product.name}</h3>
      <p className="mt-2 truncate text-xs text-[#9da59f]">{product.author}</p>
      {product.stockLabel ? <p className="mt-2 text-xs text-[#6b716c]">{product.stockLabel}</p> : null}
      <strong className="mt-2 block text-[19px] font-semibold text-[#D5006D]">{product.price}</strong>
    </div>
  );
}

function FilterPanel({ onClose, mobile = false }: { onClose?: () => void; mobile?: boolean }) {
  return (
    <aside className={`${mobile ? "h-full overflow-y-auto bg-white p-6" : "space-y-5"}`}>
      {mobile ? <div className="mb-6 flex items-center justify-between border-b border-[#F1F1F1] pb-5"><h2 className="m-0 text-xl font-semibold">Filter</h2><button type="button" onClick={onClose} aria-label="Tutup filter"><X /></button></div> : null}
      <div className="rounded-[12px] border border-[#F1F1F1] bg-white">
        <h2 className="border-b border-[#F1F1F1] px-6 py-5 text-base font-semibold">Genre</h2>
        <div className="space-y-3 px-6 py-5">{genres.map((genre) => <label key={genre} className="flex items-center gap-2 text-sm text-[#6b716c]"><input type="checkbox" className="size-4 accent-[#D5006D]" />{genre}</label>)}</div>
      </div>
      <div className="rounded-[12px] border border-[#F1F1F1] bg-white">
        <h2 className="border-b border-[#F1F1F1] px-6 py-5 text-base font-semibold">Authors</h2>
        <div className="space-y-3 px-6 py-5">{authors.map((author, index) => <label key={author} className="flex items-center justify-between gap-2 text-sm text-[#6b716c]"><span className="flex items-center gap-2"><input type="checkbox" className="size-4 accent-[#D5006D]" />{author}</span><span>({index % 3 + 1})</span></label>)}</div>
      </div>
      <div className="rounded-[12px] border border-[#F1F1F1] bg-white p-6"><h2 className="mb-5 text-base font-semibold">Filter By Price</h2><input type="range" className="w-full accent-[#D5006D]" /><p className="mt-3 text-xs text-[#7c8580]">Price: Rp30 – Rp1,000</p><button className="mt-3 text-xs font-bold text-[#D5006D]">FILTER</button></div>
      <div className="rounded-[12px] border border-[#F1F1F1] bg-white p-6"><h2 className="mb-5 text-base font-semibold">Review Ratings</h2><div className="space-y-2 text-sm text-[#f0a61a]"><div className="flex flex-wrap items-center gap-1"><span aria-label="5 stars">★★★★★</span><span className="text-[#29252D]">(7)</span></div><div className="flex flex-wrap items-center gap-1"><span aria-label="5 stars">★★★★★</span><span className="text-[#29252D]">(23)</span></div><div className="flex flex-wrap items-center gap-1"><span aria-label="4 stars">★★★★☆</span><span className="text-[#29252D]">(4)</span></div></div></div>
    </aside>
  );
}

export default function CategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetch("/api/proxy/api/v1/ecommerce/products/all/category?limit=12").then((response) => response.json()).then((payload) => setProducts(normalizeProducts(payload))).catch(() => setProducts([]));
  }, []);

  const visibleProducts = useMemo(() => products.length ? products : fallbackImages.map((image, index) => ({ id: String(index), slug: undefined, name: ["The Book of Five Rings", "Treachery: Alpha Colony Book 8", "Blood on the Snow", "The Girl and the Last Sleepover", "Feral: Shadow Breed: Book 3", "The Story of Success", "The Murder of Roger Ackroyd", "City of the Dead", "The Dirty and the Dead", "The Beatles: GetBack"][index] ?? `Produk ${index + 1}`, category: "Koleksi Ziyad", author: "Ziyad Books", price: ["Rp439.83", "Rp814.66", "Rp216.98", "Rp125.00", "Rp938.78", "Rp50.89", "Rp283.47", "Rp628.28", "Rp997.03", "Rp802.88"][index] ?? "Rp0", fallback: image })), [products]);

  return (
    <main className="min-h-screen bg-white text-[#29252D]">
      <section className="border-b border-[#F1F1F1] bg-white"><div className="mx-auto flex min-h-[72px] w-[calc(100%-40px)] max-w-[1280px] items-center gap-7 text-sm"><Link href="/" aria-label="Kembali ke beranda" className="text-[#29252D]"><ArrowLeft size={18} /></Link><Link href="/" className="text-[#29252D]">Home</Link><ChevronRight size={16} className="text-[#9da59f]" /><span className="text-[#29252D]">Products</span></div></section>
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-10 md:py-12">
        <div className="mb-5 flex items-center justify-between border-b border-[#F1F1F1] pb-4"><button type="button" onClick={() => setFilterOpen(true)} className="flex items-center gap-2 text-sm font-semibold md:hidden"><SlidersHorizontal size={17} /> Filter</button><div className="hidden items-center gap-2 md:flex"><button onClick={() => setView("grid")} className={view === "grid" ? "text-[#D5006D]" : "text-[#9da59f]"} aria-label="Tampilan grid"><Grid2X2 size={19} /></button><button onClick={() => setView("list")} className={view === "list" ? "text-[#D5006D]" : "text-[#9da59f]"} aria-label="Tampilan list"><List size={21} /></button></div><div className="flex items-center gap-4 text-sm text-[#6b716c]"><select className="bg-transparent outline-none"><option>Default sorting</option><option>Harga terendah</option><option>Harga tertinggi</option></select><span className="hidden h-5 border-l border-[#F1F1F1] sm:block" /><span>Show 12</span></div></div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[230px_minmax(0,1fr)]"><div className="hidden md:block"><FilterPanel /></div><section>{view === "grid" ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">{visibleProducts.map((product) => <article key={product.id} role="link" tabIndex={0} onClick={() => { window.location.href = `/${product.slug || product.id}`; }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = `/${product.slug || product.id}`; }} className="min-w-0 cursor-pointer border-b border-[#F1F1F1] pb-6"><ProductVisual product={product} /><ProductInfo product={product} /></article>)}</div> : <div className="divide-y divide-[#F1F1F1]">{visibleProducts.map((product) => <article key={product.id} role="link" tabIndex={0} onClick={() => { window.location.href = `/${product.slug || product.id}`; }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = `/${product.slug || product.id}`; }} className="flex cursor-pointer gap-6 py-6 first:pt-0"><ProductVisual product={product} list /><div className="flex-1 pt-2"><ProductInfo product={product}/><p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#7c8580]">Koleksi pilihan Ziyad Books untuk menemani aktivitas membaca dan belajar di rumah.</p><button className="mt-5 rounded-full bg-[#D5006D] px-5 py-2.5 text-sm font-semibold text-white">Tambah ke keranjang</button></div></article>)}</div>}</section></div>
      </div>
      <section className="border-y border-[#F1F1F1] bg-white"><div className="mx-auto grid w-[calc(100%-40px)] max-w-[1280px] grid-cols-4 gap-5 py-6 max-sm:grid-cols-2">{["Promo terbaik setiap pekan", "Pengiriman cepat", "Packing aman", "Produk original"].map((item) => <div key={item} className="flex items-center gap-3"><span className="size-10 shrink-0 rounded-full bg-[#F9E5EF]" /><span className="text-sm text-[#6b716c]">{item}</span></div>)}</div></section> 
      {filterOpen ? <div className="fixed inset-0 z-50 bg-black/30 md:hidden"><div className="h-full w-[min(88vw,380px)] overflow-y-auto"><FilterPanel mobile onClose={() => setFilterOpen(false)} /></div></div> : null}
    </main>
  );
}
