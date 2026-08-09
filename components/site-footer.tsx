import { shell } from "./site-shell";

export function SiteFooter() {
  return (
    <footer className="bg-white py-14">
      <div className={`${shell} grid grid-cols-[1.35fr_1.25fr_repeat(3,1fr)] gap-9 max-lg:grid-cols-2 max-sm:grid-cols-1`}>
        <div className="flex flex-col items-start gap-2"><a className="inline-flex items-center gap-2 whitespace-nowrap text-[21px] font-extrabold" href="#">Ziyad Books</a><p className="text-sm leading-relaxed text-[#6b7280]">Jl. Contoh Toko Buku No. 27<br />Jakarta, Indonesia</p><a className="text-xs font-extrabold text-[#ff5a4f]" href="#">Lihat lokasi toko</a></div>
        <div className="flex flex-col items-start gap-2"><h3 className="m-0 mb-2 text-sm font-extrabold">Kontak</h3><strong className="text-[22px] text-[#ff5a4f]">+62 812-3456-7890</strong><p className="text-sm leading-relaxed text-[#6b7280]">Senin - Jumat: 09.00-20.00<br />Sabtu: 10.00-16.00</p><p className="text-sm text-[#6b7280]">halo@ziyadbooks.com</p></div>
        {[['Explore', 'Tentang kami', 'Katalog', 'Promo', 'Blog'], ['Layanan', 'Bantuan', 'Pengiriman', 'Retur', 'Konfirmasi bayar'], ['Kategori', 'Buku Anak', 'Islamic Kids', 'Paket Sekolah', 'Parenting']].map(([title, ...links]) => <div className="flex flex-col items-start gap-2" key={title}><h3 className="m-0 mb-2 text-sm font-extrabold">{title}</h3>{links.map((link) => <a className="text-xs font-extrabold text-[#ff5a4f]" href="#" key={link}>{link}</a>)}</div>)}
      </div>
    </footer>
  );
}
