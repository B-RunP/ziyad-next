"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Grip, Menu, MapPin, Search, ShoppingBasket, User, X } from "lucide-react";
import Image from "next/image";
import { CartDrawer } from "./cart-drawer";

const shell = "mx-auto w-[calc(100%-40px)] max-w-[1280px]";

const menus = [
  ["Catalog", ["Semua Produk", "Buku Anak", "Paket Sekolah", "Islamic Kids"]],
  ["Sale", ["Flash Sale", "Diskon Mingguan"]],
  ["Snap Deal", []],
  ["Shop by Category", ["Cerita Anak", "Aktivitas & Mewarnai", "Buku Edukasi", "Buku Islami Anak"]],
  ["Resources", ["Tips Membaca", "Panduan Belanja", "Tentang Kami"]],
] as const;

function PromoBar() {
  return (
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
  );
}

function DesktopHeader({ onCartClick }: { onCartClick: () => void }) {
  return (
    <div className="hidden bg-white lg:block">
      <PromoBar />
      <div className="border-b border-[#eceeea] bg-[#f7f7f7]">
        <div className={`${shell} flex min-h-[76px] items-center justify-between gap-8`}>
          <Image src="/ziyadbooks.png" alt="Ziyad Books" width={160} height={50} className="shrink-0" />
          <nav className="flex flex-1 items-center gap-8" aria-label="Navigasi utama">
            <a href="#" className="text-[14px] font-semibold text-[#ff5a4f]">Home</a>
            {menus.slice(0, 1).map(([name, items]) => (
              <div className="group relative" key={name}>
                <button type="button" className="flex items-center gap-1.5 py-7 text-[14px] font-semibold hover:text-[#ff5a4f]">{name} <ChevronDown size={14} /></button>
                <div className="invisible absolute left-0 top-full z-50 w-[250px] translate-y-2 rounded-b-[12px] bg-white p-5 opacity-0 shadow-[0_18px_40px_rgba(31,41,51,0.16)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {items.map((item) => <a key={item} href="#" className="block border-b border-[#edf0ec] py-3 text-sm last:border-0 hover:text-[#ff5a4f]">{item}</a>)}
                </div>
              </div>
            ))}
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Sale <span className="rounded-full bg-[#d50b6f] px-2 py-0.5 text-[9px] text-white">FLASH</span> <ChevronDown size={14} /></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Snap Deal <span className="rounded-full bg-[#5f4a9e] px-2 py-0.5 text-[9px] text-white">WOW</span></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Shop by Category <ChevronDown size={14} /></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold hover:text-[#ff5a4f]">Resources <ChevronDown size={14} /></a>
          </nav>
          <div className="flex items-center gap-2 whitespace-nowrap text-sm"><span>ID</span><span>IDR</span><ChevronDown size={13} /><span className="mx-2 h-5 border-l border-[#cdd3ce]" /><span>Indonesia</span><ChevronDown size={13} /></div>
        </div>
      </div>
      <div className={`${shell} flex items-center gap-4 py-5`}>
        <button type="button" className="inline-flex h-[54px] shrink-0 items-center gap-3 rounded-[10px] bg-[#1f2933] px-6 text-sm font-bold text-white"><Grip size={18} /> Produk Terbaru</button>
        <div className="flex h-[54px] flex-1 items-center rounded-[10px] bg-[#f3f3f3] px-5"><input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7f8882]" placeholder="Cari buku favorit si kecil..." /><Search size={21} className="text-[#1f2933]" /></div>
        <a href="#" className="grid size-[54px] place-items-center rounded-[10px] bg-[#f3f3f3]" aria-label="Akun"><User size={21} /></a>
        <button type="button" onClick={onCartClick} className="grid size-[54px] place-items-center rounded-[10px] bg-[#f3f3f3]" aria-label="Keranjang"><ShoppingBasket size={21} /></button>
        <a href="#" className="flex h-[54px] items-center gap-2 rounded-[10px] bg-[#f3f3f3] px-6 text-sm font-semibold"><MapPin size={18} /> Lokasi Toko</a>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 120);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <DesktopHeader onCartClick={() => setCartOpen(true)} />
      <div className={`fixed inset-x-0 top-0 z-[110] hidden border-b border-[#e5e5e5] bg-white shadow-[0_8px_24px_rgba(31,41,51,0.12)] transition-transform duration-500 ease-out lg:block ${isScrolled ? "translate-y-0" : "-translate-y-full"} ${isScrolled ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`${shell} flex min-h-[76px] items-center gap-8`}>
          <Image src="/ziyadbooks.png" alt="Ziyad Books" width={160} height={50} className="shrink-0" />
          <nav className="flex flex-1 items-center justify-center gap-8" aria-label="Navigasi sticky">
            <a href="#" className="text-[14px] font-semibold text-[#d5006d]">Home</a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold">Catalog <ChevronDown size={14} /></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold">Sale <span className="rounded-full bg-[#d5006d] px-2 py-0.5 text-[9px] text-white">FLASH</span> <ChevronDown size={14} /></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold">Snap Deal <span className="rounded-full bg-[#5f4a9e] px-2 py-0.5 text-[9px] text-white">WOW</span></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold">Shop by Category <ChevronDown size={14} /></a>
            <a href="#" className="flex items-center gap-1.5 text-[14px] font-semibold">Resources <ChevronDown size={14} /></a>
          </nav>
          <div className="flex items-center gap-2 whitespace-nowrap text-sm"><span>ID</span><span>IDR</span><ChevronDown size={13} /><span className="mx-2 h-5 border-l border-[#cdd3ce]" /><span>Indonesia</span><ChevronDown size={13} /><button type="button" onClick={() => setCartOpen(true)} className="ml-3 grid size-11 place-items-center rounded-[10px] bg-[#f3f3f3]" aria-label="Keranjang"><ShoppingBasket size={20} /></button></div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="bg-[#d50b6f] px-4 py-2 text-center text-[11px] font-bold text-white">Penawaran terbatas! &nbsp; <u>BELANJA SEKARANG!</u></div>
        <div className={`${shell} flex min-h-[74px] items-center justify-between gap-4`}>
          <Image src="/ziyadbooks.png" alt="Ziyad Books" width={135} height={42} />
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="grid size-11 place-items-center rounded-[8px] border-2 border-[#1f2933]" aria-label="Buka menu"><Menu size={25} /></button>
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
          <div className="flex items-center justify-between border-b border-[#dfe4df] px-7 py-5"><Image src="/ziyadbooks.png" alt="Ziyad Books" width={135} height={42} /><button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Tutup menu"><X size={26} /></button></div>
          <nav className="px-7" aria-label="Navigasi mobile">
            <a href="#" className="block border-b border-[#bfc5c0] py-5 text-sm font-medium text-[#ff5a4f]">Home</a>
            {menus.map(([name, items]) => (
              <details key={name} className="group border-b border-[#bfc5c0]"><summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium [&::-webkit-details-marker]:hidden">{name}<ChevronDown size={14} className="transition-transform group-open:rotate-180" /></summary><div className="pb-3">{items.map((item) => <a key={item} href="#" className="block py-2 text-sm text-[#6b716c]">{item}</a>)}</div></details>
            ))}
          </nav>
          <div className="absolute bottom-8 left-0 flex w-full justify-center gap-5 text-xs text-[#1f2933]"><span>IDR <ChevronDown className="inline" size={13} /></span><span className="border-l border-[#9da59f] pl-5">Indonesia <ChevronDown className="inline" size={13} /></span></div>
        </div>
      ) : null}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
