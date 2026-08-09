"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  BookText,
  Camera,
  ChevronDown,
  CircleUserRound,
  Compass,
  Feather,
  Flag,
  Flower2,
  Grip,
  Heart,
  Landmark,
  Menu,
  MapPin,
  PhoneCall,
  Search,
  ShoppingBasket,
  Star,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { CategoryCarousel } from "./category-carousel";
import { CartDrawer } from "../components/cart-drawer";
import { addToCart, parsePrice } from "../components/cart-state";

const shell = "mx-auto w-[calc(100%-40px)] max-w-[1280px]";

const searchCategories = [
  "Action & Adventure",
  "Activity Books",
  "Animals",
  "Anthologies",
  "Arts & Literature",
  "Cars & Trucks",
  "Classics",
  "Contemporary",
  "Cultural",
  "Education",
];

const navCategories: { name: string; Icon: LucideIcon }[] = [
  { name: "Action & Adventure", Icon: Compass },
  { name: "Americas", Icon: Star },
  { name: "Arts & Photography", Icon: Feather },
  { name: "Biographies", Icon: BookOpen },
  { name: "Children's Books", Icon: CircleUserRound },
  { name: "Classics", Icon: Landmark },
  { name: "Contemporary", Icon: Flag },
  { name: "Education & Reference", Icon: BookText },
  { name: "Genre Fiction", Icon: Flower2 },
  { name: "Historical", Icon: Camera },
];

const mainMenus = [
  {
    name: "Home",
    active: true,
    items: ["Home v1", "Home v2", "Home v3", "Home v4", "Home v5", "Home v6", "Home v7", "Home v8"],
  },
  {
    name: "Shop",
    items: ["Semua Produk", "Buku Anak", "Paket Sekolah", "Islamic Kids", "Buku Baru", "Promo Buku"],
  },
  {
    name: "Paket",
    items: ["Paket Hemat", "Paket Calistung", "Paket Hadiah", "Paket Sekolah", "Paket Bundling"],
  },
  {
    name: "Promo",
    items: ["Flash Sale", "Diskon Mingguan", "Best Offer", "Voucher", "Clearance"],
  },
  {
    name: "Blog",
    items: ["Tips Membaca", "Panduan Belanja", "Review Buku", "Cerita Pelanggan"],
  },
];

const categoryMenuColumns = [
  {
    title: "Buku Anak",
    items: ["Cerita Anak", "Aktivitas & Mewarnai", "Buku Edukasi", "Buku Islami Anak"],
  },
  {
    title: "Koleksi Pilihan",
    items: ["Buku Terlaris", "Buku Terbaru", "Paket Hemat", "Paket Hadiah"],
  },
  {
    title: "Berdasarkan Usia",
    items: ["0–3 Tahun", "4–6 Tahun", "7–9 Tahun", "10 Tahun ke Atas"],
  },
  {
    title: "Belajar di Rumah",
    items: ["Calistung", "Kartu Edukasi", "Workbook", "Perlengkapan Sekolah"],
  },
];

const vendors = [
  { name: "Ziyad Edukasi", color: "bg-[#7ed0e6]" },
  { name: "Katalog Anak", color: "bg-[#e7b05b]" },
  { name: "Rumah Belajar", color: "bg-[#ff7b9b]" },
  { name: "Little Muslim", color: "bg-[#6f4b2c]" },
];

const favorites = [
  {
    title: "Paket Pintar Membaca",
    category: "Buku Anak",
    price: "Rp89.000",
    oldPrice: "Rp125.000",
    tone: "cover-green",
    image: "/product-1.avif",
  },
  {
    title: "Aku Suka Shalat",
    category: "Islamic Kids",
    price: "Rp42.000",
    oldPrice: "Rp55.000",
    tone: "cover-red",
    image: "/product-2.jpg",
  },
  {
    title: "Flash Card Hijaiyah",
    category: "Kartu Edukasi",
    price: "Rp35.000",
    oldPrice: "Rp48.000",
    tone: "cover-yellow",
    image: "/product-3.avif",
  },
  {
    title: "Workbook Anak Hebat",
    category: "Aktivitas",
    price: "Rp58.000",
    oldPrice: "Rp79.000",
    tone: "cover-blue",
    image: "/product-4.jpg",
  },
  {
    title: "Seri Adab Sehari-hari",
    category: "Karakter",
    price: "Rp74.000",
    oldPrice: "Rp96.000",
    tone: "cover-pink",
    image: "/product-5.avif",
  },
];

const trending = [
  {
    title: "Mengenal Angka 1-20",
    category: "Pra Sekolah",
    price: "Rp29.000",
    oldPrice: "Rp39.000",
    tone: "cover-purple",
    image: "/product-6.jpg",
  },
  {
    title: "Buku Gunting Tempel",
    category: "Motorik Halus",
    price: "Rp31.000",
    oldPrice: "Rp45.000",
    tone: "cover-orange",
    image: "/product-7.avif",
  },
  {
    title: "Kisah Nabi Untuk Anak",
    category: "Cerita Islami",
    price: "Rp67.000",
    oldPrice: "Rp85.000",
    tone: "cover-teal",
  },
  {
    title: "Paket Calistung Ceria",
    category: "Paket Hemat",
    price: "Rp119.000",
    oldPrice: "Rp160.000",
    tone: "cover-lime",
  },
];

const bestsellers = [
  {
    title: "Ensiklopedia Anak Muslim",
    category: "Pengetahuan",
    price: "Rp145.000",
    oldPrice: "Rp180.000",
    tone: "cover-navy",
  },
  {
    title: "Aktivitas Matematika TK",
    category: "Matematika",
    price: "Rp36.000",
    oldPrice: "Rp49.000",
    tone: "cover-mint",
  },
  {
    title: "100 Doa Harian",
    category: "Hafalan",
    price: "Rp52.000",
    oldPrice: "Rp69.000",
    tone: "cover-coral",
  },
  {
    title: "Buku Stiker Profesi",
    category: "Stiker",
    price: "Rp33.000",
    oldPrice: "Rp45.000",
    tone: "cover-cream",
  },
];

const popular = [
  {
    title: "Board Book Hewan",
    category: "Balita",
    price: "Rp64.000",
    oldPrice: "Rp82.000",
    tone: "cover-forest",
  },
  {
    title: "Latihan Menulis Huruf",
    category: "Baca Tulis",
    price: "Rp28.000",
    oldPrice: "Rp38.000",
    tone: "cover-sky",
  },
  {
    title: "Paket Hafalan Pendek",
    category: "Islamic Kids",
    price: "Rp88.000",
    oldPrice: "Rp118.000",
    tone: "cover-rose",
  },
  {
    title: "Cerita Akhlak Mulia",
    category: "Cerita",
    price: "Rp57.000",
    oldPrice: "Rp73.000",
    tone: "cover-gold",
  },
];

const posts = [
  {
    title: "Cara Memilih Buku Aktivitas Sesuai Usia Anak",
    meta: "Panduan Belanja",
    tone: "post-library",
  },
  {
    title: "Ide Paket Hadiah Buku Untuk Teman Sekelas",
    meta: "Inspirasi",
    tone: "post-desk",
  },
  {
    title: "Kenapa Buku Square Lebih Enak Untuk Katalog Anak",
    meta: "Tips Toko",
    tone: "post-stack",
  },
];

type Book = {
  title: string;
  slug?: string;
  category: string;
  price: string;
  oldPrice: string;
  tone: string;
  image?: string;
  fallbackImage?: string;
  stockLabel?: string;
};

function normalizeApiBooks(payload: unknown): Book[] {
  const source = payload as { data?: unknown };
  const root = source?.data ?? payload;
  const rawItems: unknown[] = [];

  const collect = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(collect);
      return;
    }
    if (!value || typeof value !== "object") return;
    const item = value as Record<string, unknown>;
    const nested = item.products ?? item.items ?? item.data;
    if (Array.isArray(nested)) {
      nested.forEach(collect);
    } else if (item.name || item.title || item.product_name || item.productName) {
      rawItems.push(item);
    }
  };

  collect(root);

  return rawItems.slice(0, 12).map((entry, index) => {
    const item = entry as Record<string, unknown>;
    const images = item.images ?? item.product_images ?? item.productImages;
    const firstImage = Array.isArray(images) ? images[0] : undefined;
    const image = typeof firstImage === "string" ? firstImage : firstImage && typeof firstImage === "object"
      ? (firstImage as Record<string, unknown>).url ?? (firstImage as Record<string, unknown>).image_url
      : undefined;
    const price = item.price ?? item.sale_price ?? item.selling_price ?? item.sellingPrice ?? 0;
    const oldPrice = item.old_price ?? item.original_price ?? item.compare_at_price ?? price;

    const rawImage = typeof item.image === "string" ? item.image : typeof item.image_url === "string" ? item.image_url : typeof item.imageUrl === "string" ? item.imageUrl : typeof item.thumbnail === "string" ? item.thumbnail : typeof image === "string" ? image : undefined;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
    const resolvedImage = rawImage && /^https?:\/\//i.test(rawImage) ? rawImage : rawImage ? `${apiBaseUrl}/${rawImage.replace(/^\/+/, "")}` : undefined;

    const fallbackImages = ["/product-1.avif", "/product-2.jpg", "/product-3.avif", "/product-4.jpg", "/product-5.avif", "/product-6.jpg", "/product-7.avif", "/product-8.jpg", "/product-9.avif", "/product-10.avif"];

    return {
      title: String(item.name ?? item.title ?? item.product_name ?? item.productName ?? `Produk ${index + 1}`),
      slug: typeof item.slug === "string" ? item.slug : undefined,
      category: String(item.category_name ?? item.categoryName ?? item.category ?? "Koleksi Ziyad"),
      price: typeof price === "number" ? `Rp${price.toLocaleString("id-ID")}` : String(price),
      oldPrice: typeof oldPrice === "number" ? `Rp${oldPrice.toLocaleString("id-ID")}` : String(oldPrice),
      tone: ["cover-green", "cover-blue", "cover-pink", "cover-purple"][index % 4],
      image: resolvedImage,
      fallbackImage: fallbackImages[index % fallbackImages.length],
      stockLabel: typeof item.sisastok_label === "string" ? item.sisastok_label : typeof item.sisastokLabel === "string" ? item.sisastokLabel : undefined,
    };
  });
}

function productHref(title: string, slug?: string) {
  const resolvedSlug = slug || title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `/${resolvedSlug}`;
}

function SectionTitle({
  title,
  label = "Lihat Semua",
}: {
  title: string;
  label?: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
      <h2 className="m-0 text-[28px] leading-tight font-extrabold tracking-normal text-[#1f2933]">
        {title}
      </h2>
      <span className="h-px flex-1 bg-[#e7ece6] max-sm:hidden" aria-hidden="true" />
      <a
        className="inline-flex min-h-8 items-center rounded-full bg-[#ff5a4f] px-4 text-xs font-extrabold text-white"
        href="#"
      >
        {label}
      </a>
    </div>
  );
}

function BookMockup({ title, tone, image, fallbackImage }: { title: string; tone: string; image?: string; fallbackImage?: string }) {
  const remoteImage = image?.startsWith("http");

  return (
    <div className={`book-mockup ${tone} ${image ? "has-product-image" : ""}`} aria-label={title}>
      {image ? (remoteImage ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={image} alt={title} onError={(event) => { if (fallbackImage && event.currentTarget.src !== `${window.location.origin}${fallbackImage}`) event.currentTarget.src = fallbackImage; }} className="absolute inset-0 h-full w-full object-contain" /> : <Image src={image} alt={title} fill sizes="(max-width: 640px) 120px, 360px" className="object-contain" />) : <span>{title}</span>}
      {!image ? <i /> : null}
    </div>
  );
}

function ProductCard({
  book,
  compact = false,
  simple = false,
}: {
  book: Book;
  compact?: boolean;
  simple?: boolean;
}) {
  if (compact) {
    return (
      <article role="link" tabIndex={0} onClick={() => { window.location.href = productHref(book.title, book.slug); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = productHref(book.title, book.slug); }} className="grid cursor-pointer grid-cols-[132px_1fr] items-center gap-5 border-b border-[#e7ece6] py-4 first:pt-0 last:border-b-0 last:pb-0">
        <div className={`grid place-items-center rounded-[10px] ${book.image ? "bg-transparent" : "bg-[#f7faf7]"}`}>
          <BookMockup title={book.title} tone={`${book.tone} compact-book`} image={book.image} fallbackImage={book.fallbackImage} />
        </div>
        <div className="min-w-0">
          <h3 className="m-0 line-clamp-2 text-sm leading-snug font-semibold text-[#1f2933]">
            {book.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <strong className="text-sm text-[#ff5a4f]">{book.price}</strong>
            <s className="text-xs text-[#a3aaa5]">{book.oldPrice}</s>
          </div>
        </div>
      </article>
    );
  }

  if (simple) {
    return (
      <article role="link" tabIndex={0} onClick={() => { window.location.href = productHref(book.title, book.slug); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = productHref(book.title, book.slug); }} className="group relative min-w-0 cursor-pointer border-r border-[#e7ece6] px-4 pb-5 last:border-r-0 max-lg:border-b max-lg:pb-5 max-sm:px-2">
        <div className="relative grid min-h-[210px] place-items-center rounded-[10px] bg-transparent">
          <BookMockup title={book.title} tone={book.tone} image={book.image} fallbackImage={book.fallbackImage} />
          <div className="absolute bottom-3 right-3 flex flex-col gap-2">
            <button type="button" aria-label={`Sukai ${book.title}`} className="grid size-10 translate-x-3 place-items-center rounded-full bg-white text-[#29252D] opacity-0 shadow-[0_8px_20px_rgba(41,37,45,0.14)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-[#ff5a4f] hover:text-white">
              <Heart size={19} strokeWidth={1.8} />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); addToCart({ id: book.slug || book.title, title: book.title, price: parsePrice(book.price), category: book.category, image: book.image, fallbackImage: book.fallbackImage }); }} aria-label={`Tambah ${book.title} ke keranjang`} className="grid size-10 translate-x-3 place-items-center rounded-full bg-white text-[#29252D] opacity-0 shadow-[0_8px_20px_rgba(41,37,45,0.14)] transition-all delay-75 duration-200 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-[#ff5a4f] hover:text-white">
              <ShoppingBasket size={19} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-[48px] text-base leading-snug font-semibold text-[#29252D]">
          {book.title}
        </h3>
        {book.stockLabel ? <span className="mt-3 block text-xs font-medium text-[#7c8580]">{book.stockLabel}</span> : null}
        <strong className="mt-1 block text-[19px] font-semibold text-[#D5006D]">{book.price}</strong>
      </article>
    );
  }

  return (
    <article role="link" tabIndex={0} onClick={() => { window.location.href = productHref(book.title, book.slug); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = productHref(book.title, book.slug); }} className="flex min-h-[360px] min-w-0 cursor-pointer flex-col rounded-[10px] border border-[#e7ece6] bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(36,76,54,0.12)]">
      <div className={`grid min-h-[178px] place-items-center rounded-[10px] ${book.image ? "bg-transparent" : "bg-[#f7faf7]"}`}>
        <BookMockup title={book.title} tone={book.tone} image={book.image} fallbackImage={book.fallbackImage} />
      </div>
      {!simple ? <p className="mt-3.5 mb-1.5 text-xs font-extrabold text-[#ff5a4f]">{book.category}</p> : null}
      <h3 className="m-0 min-h-[48px] line-clamp-2 text-base leading-snug font-semibold text-[#1f2933]">
        {book.title}
      </h3>
      {!simple ? <div className="mt-2 text-xs text-[#f0a61a]">***** <span className="text-[#6b7280]">5.0</span></div> : null}
      <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
        <strong className="text-base text-[#ff5a4f]">{book.price}</strong>
        {!simple ? <s className="text-xs text-[#a3aaa5]">{book.oldPrice}</s> : null}
      </div>
    </article>
  );
}

function PromoPanel({
  tone,
  eyebrow,
  title,
  body,
  cta,
  imageSrc,
  imageAlt,
}: {
  tone: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <article
      className={`group relative min-h-[286px] overflow-hidden rounded-[14px] p-8 ${tone}`}
    >
      <div className="relative z-10 max-w-[68%]">
      <span className="mb-2.5 block text-xs font-black tracking-[0.06em] uppercase">
        {eyebrow}
      </span>
      <h2 className="m-0 max-w-[370px] text-[34px] leading-none font-extrabold tracking-normal">
        {title}
      </h2>
      <p className="max-w-[340px] text-sm leading-relaxed opacity-80">{body}</p>
      <a
        className="mt-3 inline-flex min-h-9 items-center rounded-full bg-white px-4 text-sm font-extrabold text-[#1f2933]"
        href="#"
      >
        {cta}
      </a>
      </div>
      {imageSrc ? (
        <div className="absolute -right-22 -bottom-28 h-[360px] w-[420px] rotate-[-12deg] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[-7deg] max-sm:-right-10 max-sm:w-[180px]">
          <Image src={imageSrc} alt={imageAlt ?? "Ilustrasi promosi"} fill className={`object-contain ${imageSrc === "/image-1.png" ? "mix-blend-multiply" : ""}`} />
        </div>
      ) : null}
    </article>
  );
}

function MainMenuItem({
  name,
  items,
  active = false,
}: {
  name: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div className="group relative z-20">
      <a
        className={`relative flex min-h-18 items-center gap-1.5 text-[15px] font-semibold transition-colors ${active ? "text-[#ff5a4f]" : "text-[#111111] hover:text-[#ff5a4f]"
          }`}
        href="#"
      >
        {name}
        <ChevronDown
          className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          size={14}
        />
        {active ? (
          <span className="absolute bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#ff5a4f]" />
        ) : null}
      </a>
      <div className="invisible absolute left-1/2 top-full w-[280px] -translate-x-1/2 translate-y-2 rounded-[10px] bg-white px-8 py-5 opacity-0 shadow-[0_20px_45px_rgba(31,41,51,0.18)] transition-all duration-200 before:absolute before:-top-3 before:left-1/2 before:size-6 before:-translate-x-1/2 before:rotate-45 before:bg-white group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 max-sm:left-0 max-sm:w-[calc(100vw-40px)] max-sm:translate-x-0">
        {items.map((item, index) => (
          <a
            className="block border-b border-[#e7ece6] py-3 text-[15px] font-medium text-[#111111] transition-colors last:border-b-0 hover:text-[#ff5a4f]"
            href="#"
            key={item}
          >
            <span className="mr-1.5 text-[#ff5a4f]">
              {String(index + 1).padStart(2, "0")}
            </span>
            - {item}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiBooks, setApiBooks] = useState<Book[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    fetch(`${apiBaseUrl}/api/v1/ecommerce/products/all/category?limit=12`)
      .then((response) => response.json())
      .then((payload) => {
        if (active) setApiBooks(normalizeApiBooks(payload));
      })
      .catch(() => {
        // Fallback content remains visible when the API is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  const apiCatalog = apiBooks.length ? apiBooks : [...trending, ...bestsellers, ...popular];

  return (
    <main className="min-h-screen bg-white text-[#1f2933]">
      {false && (
        <>
      <header className="hidden bg-white lg:block">
        <div className="overflow-hidden bg-[#d50b6f] text-white">
          <div className={`${shell} flex min-h-9 items-center whitespace-nowrap text-xs font-bold`}>
            <span className="shrink-0 px-6">Penawaran terbatas!</span>
            <div className="min-w-0 flex-1 overflow-hidden pl-4" aria-label="Promo berjalan">
              <div className="marquee-track flex w-max shrink-0 items-center">
                {[0, 1].map((copy) => (
                  <div className="marquee-group flex shrink-0 items-center gap-10 pr-10" key={copy} aria-hidden={copy === 1}>
                    <span>#PROMOZIYADBOOKS: &nbsp; Nikmati penawaran eksklusif di Ziyadbooks! &nbsp; <u>BELANJA SEKARANG!</u></span>
                    <span className="hidden xl:inline">#SELAMATDATANG: &nbsp; Temukan promo dan penawaran terbaik &nbsp; <u>BELANJA SEKARANG!</u></span>
                    <span className="hidden 2xl:inline">#GAYAAMANZIYADBOOKS: &nbsp; Tampil aman dan percaya diri setiap hari</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-[#eceeea] bg-[#f7f7f7]">
          <div className={`${shell} flex min-h-[76px] items-center justify-between gap-8`}>
            <Image src="/ziyadbooks.png" alt="Ziyad Books" width={160} height={50} className="shrink-0" />
            <nav className="flex flex-1 items-center gap-8" aria-label="Navigasi utama">
              <a href="#" className="text-[14px] font-semibold text-[#ff5a4f]">Home</a>
              <div className="group relative"><button type="button" className="flex items-center gap-1.5 py-7 text-[14px] font-semibold hover:text-[#ff5a4f]">Catalog <ChevronDown size={14} /></button><div className="invisible absolute left-0 top-full z-50 w-[250px] translate-y-2 rounded-b-[12px] bg-white p-5 opacity-0 shadow-[0_18px_40px_rgba(31,41,51,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{mainMenus[1].items.map((item) => <a key={item} href="#" className="block border-b border-[#edf0ec] py-3 text-sm last:border-0 hover:text-[#ff5a4f]">{item}</a>)}</div></div>
              <div className="group relative"><a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Sale <span className="rounded-full bg-[#d50b6f] px-2 py-0.5 text-[9px] text-white">FLASH</span><ChevronDown size={14} /></a></div>
              <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Snap Deal <span className="rounded-full bg-[#5f4a9e] px-2 py-0.5 text-[9px] text-white">WOW</span></a>
              <div className="group relative"><button type="button" className="flex items-center gap-1.5 py-7 text-[14px] font-semibold hover:text-[#ff5a4f]">Shop by Category <ChevronDown size={14} /></button><div className="invisible absolute left-1/2 top-full z-50 w-[min(100vw-40px,1120px)] -translate-x-1/2 translate-y-2 rounded-b-[14px] bg-white p-8 opacity-0 shadow-[0_20px_45px_rgba(31,41,51,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><div className="grid grid-cols-4 gap-8">{categoryMenuColumns.map((column) => <div key={column.title}><h3 className="mb-3 text-sm font-extrabold">{column.title}</h3>{column.items.map((item) => <a key={item} href="#" className="block py-2 text-sm text-[#505852] hover:text-[#ff5a4f]">{item}</a>)}</div>)}</div></div></div>
              <div className="group relative"><button type="button" className="flex items-center gap-1.5 py-7 text-[14px] font-semibold hover:text-[#ff5a4f]">Resources <ChevronDown size={14} /></button><div className="invisible absolute left-1/2 top-full z-50 w-[220px] -translate-x-1/2 translate-y-2 rounded-b-[12px] bg-white p-4 opacity-0 shadow-[0_18px_40px_rgba(31,41,51,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{["Tips Membaca", "Panduan Belanja", "Review Buku", "Tentang Kami"].map((item) => <a key={item} href="#" className="block py-2.5 text-sm hover:text-[#ff5a4f]">{item}</a>)}</div></div>
            </nav>
            <div className="flex items-center gap-2 whitespace-nowrap text-sm"><span>🇮🇩</span><span>IDR</span><ChevronDown size={13} /><span className="mx-2 h-5 border-l border-[#cdd3ce]" /><span>Indonesia</span><ChevronDown size={13} /></div>
          </div>
        </div>
        <div className={`${shell} flex items-center gap-4 py-5`}>
          <button type="button" className="inline-flex h-[54px] shrink-0 items-center gap-3 rounded-[10px] bg-[#1f2933] px-6 text-sm font-bold text-white"><Grip size={18} /> Produk Terbaru</button>
          <div className="flex h-[54px] flex-1 items-center rounded-[10px] bg-[#f3f3f3] px-5"><input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7f8882]" placeholder="Cari buku favorit si kecil..." /><Search size={21} className="text-[#1f2933]" /></div>
          <a href="#" className="grid size-[54px] place-items-center rounded-[10px] bg-[#f3f3f3]" aria-label="Akun"><User size={21} /></a>
           <button type="button" onClick={() => setCartOpen(true)} className="grid size-[54px] place-items-center rounded-[10px] bg-[#f3f3f3]" aria-label="Keranjang"><ShoppingBasket size={21} /></button>
          <a href="#" className="flex h-[54px] items-center gap-2 rounded-[10px] bg-[#f3f3f3] px-6 text-sm font-semibold"><MapPin size={18} /> Lokasi Toko</a>
        </div>
      </header>
      <header className="hidden">
        <div className="bg-[#d50b6f] text-center text-xs font-bold text-white">
          <div className={`${shell} flex min-h-9 items-center justify-center gap-8 whitespace-nowrap`}>
            <span>Penawaran terbatas!</span>
            <span className="hidden sm:inline">#PROMOZIYADBOOKS: Nikmati penawaran eksklusif di Ziyadbooks! &nbsp; <u>BELANJA SEKARANG!</u></span>
            <span className="hidden xl:inline">#SELAMATDATANG: Temukan promo dan penawaran terbaik &nbsp; <u>BELANJA SEKARANG!</u></span>
          </div>
        </div>
        <div className="border-b border-[#e7ece6]">
          <div
            className={`${shell} flex min-h-8 items-center justify-between gap-6 text-xs text-[#7c8580] max-sm:flex-col max-sm:items-start max-sm:gap-3 max-sm:py-3`}
          >
            <nav className="flex text-[13px] py-3 items-center max-sm:flex-col max-sm:items-start max-sm:gap-3" aria-label="Tautan cepat">
              <a href="#" className="hover:text-[#f65d4e] transition-all border-r border-[#e7ece6] px-2">Tentang Kami</a>
              <a href="#" className="hover:text-[#f65d4e] transition-all border-r border-[#e7ece6] px-2">Akun Saya</a>
              <a href="#" className="hover:text-[#f65d4e] transition-all border-r border-[#e7ece6] px-2">Wishlist</a>
              <a href="#" className="hover:text-[#f65d4e] transition-all px-2">Cek Pesanan</a>
            </nav>
            <span className="flex items-center gap-5">
              <svg width="16px" height="16px" className="text-[#1f2933] cursor-pointer transition-colors hover:text-[#ff5a4f]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" fill="currentColor" />
              </svg>
              <svg fill="#000000" width="14px" height="14px" className="text-[#1f2933] cursor-pointer transition-colors hover:text-[#ff5a4f]" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z" fill="currentColor" />
              </svg>
              <svg width="16px" height="16px" className="text-[#1f2933] cursor-pointer transition-colors hover:text-[#ff5a4f]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
                <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>

        <div className="border-b border-[#e7ece6]">
          <div
            className={`${shell} flex min-h-[96px] items-center justify-between gap-6 max-lg:flex-wrap max-sm:flex-col max-sm:items-start max-sm:py-5`}
          >
            <Image src="/ziyadbooks.png" alt="Ziyad Books" width={160} height={50} />
            <div className="relative flex h-[38px] max-w-[640px] flex-1 overflow-visible rounded-full bg-[#f7f7f7] max-lg:order-3 max-lg:basis-full max-lg:max-w-none max-sm:w-full">
              <input
                className="min-w-0 flex-1 rounded-l-full bg-transparent px-7 text-[17px] text-[#1f2933] outline-none placeholder:text-[#6b7280]"
                placeholder="Cari Buku..."
              />
              <details className="group relative z-30 flex items-center">
                <summary className="flex h-full cursor-pointer list-none items-center gap-2 px-6 text-[14px] font-semibold text-[#111111] [&::-webkit-details-marker]:hidden">
                  Semua Kategori
                  <svg
                    className="size-4 transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="absolute right-0 top-full max-h-[300px] w-[250px] overflow-y-auto border border-[#e7ece6] bg-white py-2 text-[16px] shadow-[0_16px_35px_rgba(31,41,51,0.14)]">
                  {searchCategories.map((category) => (
                    <a
                      className="block px-6 py-2.5 text-[#2f3430] transition-colors hover:bg-[#f7f7f7] hover:text-[#ff5a4f]"
                      href="#"
                      key={category}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </details>
              <button
                className="m-0 grid h-[38px] w-[66px] place-items-center rounded-full border-0 bg-[#ff5a4f] text-white"
                type="button"
                aria-label="Cari produk"
              >
                <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className="flex h-10 items-center text-sm font-bold text-[#5a655d] max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-3"
              aria-label="Aksi belanja"
            >
              <a href="#" className="flex h-10 items-center gap-2 px-4 text-[14px] text-black underline underline-offset-4">
                <MapPin size={18} />
                <span className="underline hover:text-[#ff5a4f]">
                  Lokasi Toko
                </span>
              </a>
              <a href="#" className="flex h-10 items-center border-r border-[#e7ece6] px-4"><User size={20} className="hover:text-[#ff5a4f]" /></a>
              <a href="#" className="flex h-10 items-center border-r border-[#e7ece6] px-4">
                <span className="relative inline-flex">
                  <Heart size={20} className="hover:text-[#ff5a4f]" />
                  <span className="absolute -right-2.5 -top-2 grid size-4 place-items-center rounded-full bg-[#ff5a4f] text-[10px] leading-none font-extrabold text-white">
                    0
                  </span>
                </span>
              </a>
              <button type="button" onClick={() => setCartOpen(true)} className="flex h-10 items-center px-4" aria-label="Keranjang">
                <span className="relative inline-flex">
                  <ShoppingBasket size={20} className="hover:text-[#ff5a4f]" />
                  <span className="absolute -right-2.5 -top-2 grid size-4 place-items-center rounded-full bg-[#ff5a4f] text-[10px] leading-none font-extrabold text-white">
                    0
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${shell} flex min-h-18 items-center justify-between gap-6 text-sm text-[#38443b] max-lg:flex-wrap max-sm:flex-col max-sm:items-start max-sm:py-4`}
        >
          <div className="group relative z-20 max-sm:w-full">
            <button
              className="min-w-[210px] cursor-pointer rounded-full border-0 bg-[#ff5a4f] px-8 py-3 text-left text-white max-sm:w-full"
              type="button"
            >
              <span className="flex items-center justify-between gap-6">
                <span className="flex items-center gap-3 pr-8 text-[14px] font-bold">
                  <Grip size={22} /> Kategori
                </span>
                <ChevronDown
                  className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                  size={18}
                />
              </span>
            </button>
            <div className="invisible absolute left-0 top-[calc(100%+18px)] w-[320px] translate-y-2 rounded-[10px] bg-white px-10 py-4 opacity-0 shadow-[0_20px_45px_rgba(31,41,51,0.18)] transition-all duration-200 before:absolute before:-top-3 before:left-1/2 before:size-6 before:-translate-x-1/2 before:rotate-45 before:bg-white group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 max-sm:left-0 max-sm:w-[calc(100vw-40px)]">
              {navCategories.map(({ name, Icon }) => (
                <a
                  className="flex items-center gap-4 border-b border-[#e7ece6] py-3 text-[15px] font-medium text-[#5f6460] transition-colors last:border-b-0 hover:text-[#ff5a4f]"
                  href="#"
                  key={name}
                >
                  <Icon className="text-[#c9c9c9]" size={24} strokeWidth={2.4} />
                  {name}
                </a>
              ))}
            </div>
          </div>
          <nav className="flex items-center gap-10 max-sm:flex-col max-sm:items-start max-sm:gap-3" aria-label="Navigasi utama">
            {mainMenus.map((menu) => (
              <MainMenuItem
                active={menu.active}
                items={menu.items}
                key={menu.name}
                name={menu.name}
              />
            ))}

          </nav>
          <a className="flex items-center gap-4" href="tel:+6281234567890">
            <span className="grid size-12 place-items-center rounded-full bg-[#f7f7f7] text-[#111111]">
              <PhoneCall size={16} strokeWidth={2.2} />
            </span>
            <span className="flex flex-col">
              <strong className="text-[20px] leading-tight font-semibold text-[#ff5a4f]">
                +62 812-3456-7890
              </strong>
            </span>
          </a>
        </div>
      </header>

      <div className="lg:hidden">
        <div className="bg-[#d50b6f] px-4 py-2 text-center text-[11px] font-bold text-white">
          Penawaran terbatas! &nbsp; <u>BELANJA SEKARANG!</u>
        </div>
        <div className={`${shell} flex min-h-[74px] items-center justify-between gap-4`}>
          <Image src="/ziyadbooks.png" alt="Ziyad Books" width={135} height={42} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="grid size-11 place-items-center rounded-[8px] border-2 border-[#1f2933]"
            aria-label="Buka menu"
          >
            <Menu size={25} />
          </button>
        </div>
        <div className={`${shell} flex items-center justify-between gap-3 pb-4`}>
          <button className="grid size-12 place-items-center rounded-[10px] bg-[#f7f7f7]" aria-label="Cari buku"><Search size={21} /></button>
          <a href="#" className="grid size-12 place-items-center rounded-[10px] bg-[#f7f7f7]" aria-label="Akun"><User size={21} /></a>
           <button type="button" onClick={() => setCartOpen(true)} className="grid size-12 place-items-center rounded-[10px] bg-[#f7f7f7]" aria-label="Keranjang"><ShoppingBasket size={21} /></button>
          <a href="#" className="grid size-12 place-items-center rounded-[10px] bg-[#f7f7f7]" aria-label="Lokasi toko"><MapPin size={21} /></a>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-[100] bg-[#f8f8f8] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu utama">
          <div className="flex items-center justify-between border-b border-[#dfe4df] px-7 py-5">
            <Image src="/ziyadbooks.png" alt="Ziyad Books" width={135} height={42} />
            <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Tutup menu"><X size={26} /></button>
          </div>
          <nav className="px-7" aria-label="Navigasi mobile">
            <a href="#" className="block border-b border-[#bfc5c0] py-5 text-sm font-medium text-[#ff5a4f]">Home</a>
            {[
              ["Catalog", mainMenus[1].items],
              ["Sale", ["Flash Sale", "Diskon Mingguan"]],
              ["Snap Deal", []],
              ["Shop by Category", categoryMenuColumns.flatMap((column) => column.items)],
              ["Resources", ["Tips Membaca", "Panduan Belanja", "Tentang Kami"]],
            ].map(([name, items]) => (
              <details key={name as string} className="group border-b border-[#bfc5c0]">
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {name as string}
                  <span className="flex items-center gap-2">
                    {name === "Sale" ? <span className="rounded bg-[#d50b6f] px-1.5 py-0.5 text-[9px] font-bold text-white">FLASH</span> : null}
                    <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="pb-3">{(items as string[]).map((item) => <a key={item} href="#" className="block py-2 text-sm text-[#6b716c]">{item}</a>)}</div>
              </details>
            ))}
          </nav>
          <div className="absolute bottom-8 left-0 flex w-full justify-center gap-5 text-xs text-[#1f2933]"><span>🇮🇩 &nbsp; IDR <ChevronDown className="inline" size={13} /></span><span className="border-l border-[#9da59f] pl-5">Indonesia <ChevronDown className="inline" size={13} /></span></div>
        </div>
      ) : null}
        </>
      )}

      {(() => {
        const slides = [
          {
            eyebrow: "Koleksi Buku Terbaik",
            title: (
              <>
                Dongeng Klasik Pilihan untuk <br />
                <span className="brush-underline">Menemani Hari</span> Si Kecil
              </>
            ),
            subtitle: "Penawaran Terbatas. Dapatkan Selama Persediaan Masih Ada!",
            cta: "Belanja Sekarang",
            imageLeft: "/hero1-2.jpeg",
            imageRight: "/hero-1-1.jpeg",
          },
          {
            eyebrow: "Promo Spesial Ziyad Books",
            title: (
              <>
                Tumbuhkan Minat Baca <br />
                <span className="brush-underline">Si Kecil</span> Sejak Dini
              </>
            ),
            subtitle: "Dapatkan Diskon Spesial s/d 50% Selama Persediaan Ada!",
            cta: "Belanja Sekarang",
            imageLeft: "/hero-1-1.jpeg",
            imageRight: "/hero1-2.jpeg",
          }
        ];

        return (
          <section className="relative min-h-[500px] py-5 max-lg:py-4 max-sm:py-2 flex flex-col justify-center overflow-hidden text-slate-800">
            {/* Carousel Content Wrapper */}
            <div className={`${shell} overflow-hidden`}>
              <div
                className="flex items-stretch transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="grid min-w-full grid-cols-[0.82fr_1.7fr_0.82fr] items-stretch gap-3 max-lg:grid-cols-1 max-lg:gap-4">

              {/* Left Column: Tilted Book Showcase & Foliage */}
              <div className="relative flex items-center justify-center w-full min-h-[440px] max-lg:hidden">

                {/* Organic Leaf Deco 1 - Top Left */}
                <div className="hidden">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10 80 C 30 50, 40 30, 80 20 C 50 40, 30 50, 10 80 Z" />
                    <path d="M25 65 C 40 45, 50 35, 75 30" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Organic Leaf Deco 2 - Bottom Right */}
                <div className="hidden">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10 80 C 30 50, 40 30, 80 20 C 50 40, 30 50, 10 80 Z" />
                    <path d="M25 65 C 40 45, 50 35, 75 30" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Main Showcase Image tilted */}
                <div className="relative h-full min-h-[440px] w-full max-w-none overflow-hidden rounded-[18px] transition-transform duration-500 ease-out cursor-pointer drop-shadow-[0_18px_28px_rgba(0,0,0,0.12)]">
                  <Image
                    src={slide.imageLeft}
                    alt="Buku Animals in the Quran"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Cute Giftbox deco bottom-left */}
              </div>

              {/* Right Column: Copywriting & CTA */}
              <div className="flex min-h-[440px] flex-col items-start justify-center rounded-[18px] bg-[#5b469e] px-10 py-12 text-left text-white transition-all duration-300 mx-auto w-full max-lg:min-h-[420px] max-sm:px-7 max-sm:py-9 max-lg:items-center max-lg:text-center">
                <span className="rounded-[7px] bg-[#a8e8ef] px-3 py-1.5 text-xs font-bold text-[#1f2933]">
                  {slide.eyebrow}
                </span>

                <h1 className="m-0 mt-7 text-white font-black text-[clamp(30px,4.3vw,58px)] leading-[1.08] mb-5">
                  {slide.title}
                </h1>

                <p className="m-0 text-white/90 text-sm md:text-base font-medium mb-8 max-w-[500px]">
                  {slide.subtitle}
                </p>

                <div className="flex justify-start w-full gap-3 max-lg:justify-center">
                  <button
                    onClick={() => document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex h-12 items-center justify-center rounded-[9px] bg-white px-8 text-sm font-black text-[#1f2933] shadow-sm transition-all duration-200 gap-1.5 cursor-pointer hover:bg-[#f2f2f2]"
                  >
                    {slide.cta} <span className="text-[13px] font-bold">&gt;</span>
                  </button>
                  <a href="#produk" className="inline-flex h-12 items-center justify-center px-3 text-sm font-bold text-white">Lihat Koleksi <span className="ml-2">›</span></a>
                </div>
              </div>

              <div className="relative min-h-[440px] overflow-hidden rounded-[18px] max-lg:hidden">
                <Image
                  src={slide.imageRight}
                  alt="Buku Daily Doa"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className={`${shell} z-20 mt-3 flex items-center justify-between`}>
              <button
                type="button"
                onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                aria-label="Slide sebelumnya"
                className="grid size-9 place-items-center rounded-full text-2xl text-[#1f2933] transition-colors hover:bg-[#f3f3f3]"
              >
                ←
              </button>
              <div className="flex items-center gap-7 text-sm">
                {slides.map((_, index) => (
                  <button key={index} type="button" onClick={() => setCurrentSlide(index)} className="flex items-center gap-3 text-[#59625c]" aria-label={`Buka slide ${index + 1}`}>
                    <span className={`h-1 w-4 rounded-full ${index === currentSlide ? "bg-[#1f2933]" : "bg-[#dfe2df]"}`} />
                    <span className={index === currentSlide ? "text-[#1f2933]" : ""}>{index === 0 ? "New Arrivals" : "Limited Edition"}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                aria-label="Slide berikutnya"
                className="grid size-9 place-items-center rounded-full text-2xl text-[#1f2933] transition-colors hover:bg-[#f3f3f3]"
              >
                →
              </button>
            </div>

          </section>
        );
      })()}

      <CategoryCarousel shell={shell} />

      <section id="produk" className={`${shell} grid grid-cols-2 gap-6 max-sm:grid-cols-1`}>
        <PromoPanel
          tone="bg-[#7760df] text-white"
          eyebrow="Diskon 20%"
          title="Buku Jadi Hadiah yang Berkesan"
          body="Pilihan paket hadiah untuk anak, teman, dan keluarga."
          cta="Lihat Paket"
          imageSrc="/image-1.png"
          imageAlt="Koleksi buku hadiah"
        />
        <PromoPanel
          tone="bg-[#f1a400] text-[#2a2210]"
          eyebrow="Novelis & edukasi"
          title="Sale 10% Off"
          body="Untuk seri bacaan favorit dan stok terbaru minggu ini."
          cta="Shop Now"
          imageSrc="/image-2.png"
          imageAlt="Buku pilihan untuk edukasi"
        />
      </section>

      {/* <section className={`${shell} pt-14`}>
        <SectionTitle title="Top Selling Series" />
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {vendors.map((vendor) => (
            <article
              className="flex items-center gap-3.5 rounded-[10px] border border-[#e7ece6] p-3.5"
              key={vendor.name}
            >
              <div className={`size-[58px] rounded-[10px] ${vendor.color}`} />
              <div>
                <h3 className="m-0 font-extrabold">{vendor.name}</h3>
                <p className="mt-1 mb-0 text-xs text-[#6b7280]">Produk pilihan</p>
                <span className="text-xs text-[#f0a61a]">*****</span>
              </div>
            </article>
          ))}
        </div>
      </section> */}

      <section
        className={`${shell} promo-shape relative mt-12 flex min-h-[150px] items-center justify-between overflow-hidden rounded-[14px] bg-[#62ad43] p-8 text-white max-sm:flex-col max-sm:items-start max-sm:gap-4`}
      >
        <div>
          <p className="mb-2.5 text-xs font-black tracking-[0.06em] uppercase">
            Our best sale
          </p>
          <h2 className="m-0 text-[34px] leading-none font-extrabold tracking-normal">
            Paket mulai Rp59.900
          </h2>
          <span className="mt-2 block text-white/80">
            Untuk buku aktivitas, stiker, dan cerita anak.
          </span>
        </div>
        <a
          className="inline-flex min-h-9 items-center rounded-full bg-white px-4 text-sm font-extrabold text-[#1f2933]"
          href="#"
        >
          Ambil Promo
        </a>
      </section>

      <section className={`${shell} pt-14`}>
        <SectionTitle title="Rekomendasi Ziyad" />
        <div className="hidden rounded-[14px] border border-[#e7ece6] bg-white p-5 lg:grid lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <div className="grid pr-5">
            {favorites.slice(0, 3).map((book) => (
              <ProductCard compact book={book} key={book.title} />
            ))}
          </div>
          <article className="grid content-center justify-items-center border-x border-[#e7ece6] px-6 text-center">
            <BookMockup title={favorites[3].title} tone={`${favorites[3].tone} feature-book`} image={favorites[3].image} />
            <p className="mt-3.5 mb-1.5 text-xs font-extrabold text-[#ff5a4f]">
              {favorites[3].category}
            </p>
            <h3 className="m-0 text-lg font-extrabold">{favorites[3].title}</h3>
            <strong className="mt-2 text-[22px] text-[#ff5a4f]">
              {favorites[3].price}
            </strong>
          </article>
          <div className="grid pl-5">
            {[favorites[4], ...trending.slice(0, 2)].map((book) => (
              <ProductCard compact book={book} key={book.title} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-[14px] border border-[#e7ece6] bg-white p-4 sm:grid-cols-2 lg:hidden">
          {[...favorites, ...trending.slice(0, 2)].map((book) => (
            <ProductCard book={book} key={book.title} />
          ))}
        </div>
      </section>

      {[
        {
          title: "Trending Now",
          books: apiCatalog.slice(0, 4),
          promo: "bg-[#ff7b55] text-white",
          eyebrow: "Buy one, get one",
          heading: "30% Off",
          body: "Untuk seri tertentu selama promo berlangsung.",
          cta: "Cek Promo",
        },
        {
          title: "Bestselling Books",
          books: apiCatalog.slice(4, 8),
          promo: "bg-[#cceecf] text-[#23442a]",
          eyebrow: "Big sale",
          heading: "25% Off",
          body: "Paket sekolah, buku latihan, dan reading tools.",
          cta: "Belanja Paket",
        },
        {
          title: "Popular Books",
          books: apiCatalog.slice(8, 12),
          promo: "bg-[#c99742] text-white",
          eyebrow: "Monthly picks",
          heading: "Pilihan Editor",
          body: "Kurasi buku yang cocok untuk hadiah dan belajar di rumah.",
          cta: "Lihat Pilihan",
        },
      ].map((section) => (
        <section
          className={`${shell} grid grid-cols-[minmax(0,1fr)_300px] items-stretch gap-6 pt-30 max-lg:grid-cols-1`}
          key={section.title}
        >
          <div>
            <SectionTitle title={section.title} />
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-2">
              {section.books.map((book) => (
                <ProductCard book={book} simple key={book.title} />
              ))}
            </div>
          </div>
          <PromoPanel
            tone={`${section.promo} min-h-full max-lg:min-h-[220px]`}
            eyebrow={section.eyebrow}
            title={section.heading}
            body={section.body}
            cta={section.cta}
          />
        </section>
      ))}

      <section
        className={`${shell} mt-20 grid min-h-[168px] grid-cols-[1fr_420px] items-center gap-7 rounded-[14px] bg-[#f3b0ad] bg-[linear-gradient(90deg,rgba(255,255,255,0.28),transparent)] p-8 max-lg:grid-cols-1 max-sm:p-6`}
      >
        <div>
          <h2 className="m-0 text-[34px] leading-none font-extrabold tracking-normal">
            Dapatkan 10% Off Pesanan Pertama
          </h2>
          <p className="max-w-[520px] text-sm leading-relaxed text-[#1f2933]/70">
            Masukkan email untuk menerima info promo dan rekomendasi buku terbaru.
          </p>
        </div>
        <form className="flex h-11 overflow-hidden rounded-full bg-white max-sm:h-auto max-sm:flex-col max-sm:gap-2 max-sm:bg-transparent">
          <input
            className="min-w-0 flex-1 border-0 px-4 outline-none max-sm:min-h-11 max-sm:rounded-full max-sm:bg-white"
            placeholder="Email kamu"
          />
          <button
            className="m-1 rounded-full border-0 bg-[#ff5a4f] px-4 font-extrabold text-white max-sm:m-0 max-sm:min-h-11"
            type="button"
          >
            Subscribe
          </button>
        </form>
      </section>

      <section
        className={`${shell} mt-10 grid grid-cols-4 overflow-hidden rounded-[14px] max-sm:grid-cols-1`}
        aria-label="Suasana toko"
      >
        <div className="min-h-[180px] bg-[#78604d] bg-[linear-gradient(135deg,rgba(0,0,0,0.18),transparent)]" />
        <div className="min-h-[180px] bg-[#a98d78] bg-[linear-gradient(135deg,rgba(0,0,0,0.18),transparent)]" />
        <div className="min-h-[180px] bg-[#4f6b5b] bg-[linear-gradient(135deg,rgba(0,0,0,0.18),transparent)]" />
        <div className="min-h-[180px] bg-[#91623f] bg-[linear-gradient(135deg,rgba(0,0,0,0.18),transparent)]" />
      </section>

      <section className="mt-11 border-y border-[#e7ece6]">
        <div className={`${shell} grid grid-cols-4 gap-5 py-6 max-lg:grid-cols-2 max-sm:grid-cols-1`}>
          {[
            "Promo terbaik setiap pekan",
            "Pengiriman cepat",
            "Packing aman",
            "Produk original",
          ].map((item) => (
            <article className="grid grid-cols-[42px_1fr] items-center gap-x-3 gap-y-2" key={item}>
              <span className="row-span-2 size-[42px] rounded-full bg-[#ffe0dc]" />
              <strong className="text-sm">{item}</strong>
              <p className="m-0 text-xs text-[#6b7280]">Belanja buku lebih nyaman.</p>
            </article>
          ))}
        </div>
      </section>

      {false && (<footer className="bg-white py-14">
        <div className={`${shell} grid grid-cols-[1.35fr_1.25fr_repeat(3,1fr)] gap-9 max-lg:grid-cols-2 max-sm:grid-cols-1`}>
          <div className="flex flex-col items-start gap-2">
            <a
              className="inline-flex items-center gap-2 whitespace-nowrap text-[21px] font-extrabold tracking-normal"
              href="#"
            >
              Ziyad Books
            </a>
            <p className="text-sm leading-relaxed text-[#6b7280]">
              Jl. Contoh Toko Buku No. 27
              <br />
              Jakarta, Indonesia
            </p>
            <a className="text-xs font-extrabold text-[#ff5a4f]" href="#">
              Lihat lokasi toko
            </a>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h3 className="m-0 mb-2 text-sm font-extrabold">Kontak</h3>
            <strong className="text-[22px] text-[#ff5a4f]">+62 812-3456-7890</strong>
            <p className="text-sm leading-relaxed text-[#6b7280]">
              Senin - Jumat: 09.00-20.00
              <br />
              Sabtu: 10.00-16.00
            </p>
            <p className="text-sm text-[#6b7280]">halo@ziyadbooks.com</p>
          </div>
          {[
            ["Explore", "Tentang kami", "Katalog", "Promo", "Blog"],
            ["Layanan", "Bantuan", "Pengiriman", "Retur", "Konfirmasi bayar"],
            ["Kategori", "Buku Anak", "Islamic Kids", "Paket Sekolah", "Parenting"],
          ].map(([title, ...links]) => (
            <div className="flex flex-col items-start gap-2" key={title}>
              <h3 className="m-0 mb-2 text-sm font-extrabold">{title}</h3>
              {links.map((link) => (
                <a className="text-xs font-extrabold text-[#ff5a4f]" href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>)}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
