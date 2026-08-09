"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Grip, Heart, MapPin, Menu, Minus, Plus, Search, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

type ProductImage = { id?: number | string; url: string };

type ProductDetail = {
  name: string;
  slug: string;
  description?: string;
  kategory_name?: string;
  display_photo?: string;
  fotos?: ProductImage[];
  penulis?: string;
  isbn?: string;
  sku?: string;
  price_final_formatted?: string;
  price_final?: number;
  price_original_formatted?: string;
  price_original?: number;
  discount_label?: string;
  stok_label?: string;
  stok?: number;
  is_preorder?: boolean;
  user_specific?: { is_in_cart?: boolean; cart_qty?: number };
};

function formatPrice(value: number | undefined, formatted?: string) {
  if (formatted) return formatted;
  return typeof value === "number" ? `Rp ${value.toLocaleString("id-ID")}` : "Harga belum tersedia";
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`${apiBaseUrl}/api/v1/ecommerce/products/${encodeURIComponent(slug)}/detail`)
      .then((response) => { if (!response.ok) throw new Error("Produk tidak ditemukan"); return response.json(); })
      .then((payload: { data?: ProductDetail }) => { if (!payload.data) throw new Error("Data produk tidak tersedia"); setProduct(payload.data); })
      .catch((requestError: Error) => setError(requestError.message || "Gagal memuat detail produk"))
      .finally(() => setLoading(false));
  }, [slug]);

  const images = useMemo(() => {
    if (!product) return [];
    const all = [product.display_photo, ...(product.fotos ?? []).map((photo) => photo.url)].filter((image): image is string => Boolean(image));
    return [...new Set(all)];
  }, [product]);

  if (loading) return <main className="grid min-h-screen place-items-center bg-white text-sm text-[#7c8580]">Memuat detail produk...</main>;
  if (error || !product) return <main className="grid min-h-screen place-items-center bg-white px-5 text-center"><div><p className="text-lg font-semibold text-[#29252D]">Produk tidak ditemukan</p><p className="mt-2 text-sm text-[#7c8580]">{error || "Data produk belum tersedia."}</p><Link href="/categories" className="mt-5 inline-block rounded-full bg-[#D5006D] px-5 py-3 text-sm font-semibold text-white">Kembali ke katalog</Link></div></main>;

  const mainImage = images[selectedImage] ?? images[0];
  const price = formatPrice(product.price_final, product.price_final_formatted);
  const originalPrice = product.price_original && product.price_original > (product.price_final ?? 0) ? formatPrice(product.price_original, product.price_original_formatted) : null;

  return (
    <main className="min-h-screen bg-white text-[#29252D]">
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-8 md:py-12">
        <div className="mb-7 flex items-center gap-2 text-sm text-[#7c8580]"><Link href="/" className="hover:text-[#D5006D]">Home</Link><ChevronRight size={15} /><Link href="/categories" className="hover:text-[#D5006D]">Products</Link><ChevronRight size={15} /><span className="truncate text-[#29252D]">{product.name}</span></div>
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-7">
          <div className="rounded-[16px] border border-[#E8E8E8] bg-white p-5 md:p-7"><div className="flex aspect-[0.9] items-center justify-center rounded-[10px] bg-[#FAFAFA] p-3 md:aspect-[0.94] md:p-6"><img src={mainImage} alt={product.name} className="h-full w-full object-contain" /></div><div className="mt-5 flex gap-3 overflow-x-auto pb-1">{images.map((image, index) => <button type="button" key={image} onClick={() => setSelectedImage(index)} aria-label={`Lihat gambar ${index + 1}`} className={`size-[76px] shrink-0 rounded-[10px] border-2 bg-white p-1.5 transition md:size-[88px] ${selectedImage === index ? "border-[#D5006D]" : "border-[#F1F1F1]"}`}><img src={image} alt="" className="h-full w-full object-contain" /></button>)}</div></div>
          <div className="rounded-[16px] border border-[#E8E8E8] bg-white p-6 md:p-8"><div className="flex items-center justify-between"><span className="rounded bg-[#E6F7E7] px-2 py-1 text-xs font-semibold text-[#4cae69]">{product.is_preorder ? "PRE ORDER" : product.stok_label || "TERSEDIA"}</span><div className="hidden items-center gap-4 text-xs text-[#9da59f] sm:flex"><button type="button" className="flex items-center gap-1"><ChevronLeft size={17} /> PREV</button><button type="button" className="flex items-center gap-1">NEXT <ChevronRight size={17} /></button></div></div><h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{product.name}</h1><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#9da59f]"><span>Penulis: <b className="font-normal text-[#29252D]">{product.penulis || "-"}</b></span>{product.sku ? <><span className="hidden h-4 border-l border-[#E5E5E5] sm:block" /><span>SKU: {product.sku}</span></> : null}{product.stok_label ? <><span className="hidden h-4 border-l border-[#E5E5E5] sm:block" /><span>{product.stok_label}</span></> : null}</div><div className="my-6 border-t border-[#F1F1F1]" /><div className="flex items-end gap-3"><strong className="text-3xl font-bold text-[#D5006D]">{price}</strong>{originalPrice ? <del className="text-sm text-[#9da59f]">{originalPrice}</del> : null}</div>{product.discount_label && product.discount_label !== "0" ? <span className="mt-2 inline-block rounded bg-[#FDE8F2] px-2 py-1 text-xs font-semibold text-[#D5006D]">{product.discount_label}</span> : null}<div className="my-6 border-t border-[#F1F1F1]" /><p className="mb-3 text-sm text-[#9da59f]">Jumlah</p><div className="flex flex-wrap items-center gap-3"><div className="flex h-[52px] items-center rounded-full border border-[#E5E5E5]"><button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid size-12 place-items-center" aria-label="Kurangi jumlah"><Minus size={16} /></button><span className="w-7 text-center text-sm font-semibold">{quantity}</span><button type="button" onClick={() => setQuantity((current) => current + 1)} className="grid size-12 place-items-center" aria-label="Tambah jumlah"><Plus size={16} /></button></div><button type="button" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#D5006D] px-6 text-sm font-bold text-white"><ShoppingBasket size={18} /> Tambah ke keranjang</button><button type="button" aria-label="Tambah ke wishlist" className="grid size-[52px] place-items-center rounded-full border border-[#E5E5E5] text-[#7c8580]"><Heart size={19} /></button></div><div className="my-7 border-t border-[#F1F1F1]" /><div className="space-y-2 text-sm text-[#7c8580]"><p>Kategori: <span className="text-[#29252D]">{product.kategory_name || "-"}</span></p>{product.isbn ? <p>ISBN: <span className="text-[#29252D]">{product.isbn}</span></p> : null}</div></div>
        </section>
        <section className="mt-10"><div className="flex border-b border-[#E5E5E5]"><button type="button" onClick={() => setDescriptionOpen(true)} className={`px-5 py-4 text-base font-bold ${descriptionOpen ? "border-b-2 border-[#D5006D] text-[#29252D]" : "text-[#9da59f]"}`}>Deskripsi</button><button type="button" onClick={() => setDescriptionOpen(false)} className={`px-5 py-4 text-base font-bold ${!descriptionOpen ? "border-b-2 border-[#D5006D] text-[#29252D]" : "text-[#9da59f]"}`}>Reviews</button></div><div className="rounded-b-[16px] border border-t-0 border-[#E8E8E8] bg-white p-6 md:px-12 md:py-8">{descriptionOpen ? <div className="prose prose-sm max-w-none leading-relaxed text-[#6b716c]" dangerouslySetInnerHTML={{ __html: product.description || "Belum ada deskripsi produk." }} /> : <p className="text-sm text-[#7c8580]">Belum ada review untuk produk ini.</p>}</div></section>
      </div>
    </main>
  );
}
