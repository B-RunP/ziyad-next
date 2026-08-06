"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const categorySlides = [
  { name: "Religion & Spirituality", image: "/img_dummy_kategori.png" },
  { name: "Romance Books", image: "/img_dummy_kategori.png" },
  { name: "Literature & Fiction", image: "/img_dummy_kategori.png" },
  { name: "Biographies & Memoirs", image: "/img_dummy_kategori.png" },
  { name: "Children's Books", image: "/img_dummy_kategori.png" },
  { name: "Christian Living", image: "/img_dummy_kategori.png" },
  { name: "Educational Curriculum", image: "/img_dummy_kategori.png" },
  { name: "Fiction & Fantasy", image: "/img_dummy_kategori.png" },
];

export function CategoryCarousel({ shell }: { shell: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section className={`${shell} relative py-12`} aria-label="Kategori buku">
      <button
        className="absolute left-0 top-1/2 z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(31,41,51,0.12)] transition-colors hover:text-[#ff5a4f] max-sm:hidden"
        type="button"
        aria-label="Geser kategori ke kiri"
        onClick={() => scroll("left")}
      >
        <ChevronLeft size={34} strokeWidth={2.5} />
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-16 overflow-x-auto overflow-y-visible scroll-smooth px-6 pt-12 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-lg:gap-10 max-sm:gap-6 max-sm:px-0 max-sm:pt-9"
      >
        {categorySlides.map((category) => (
          <a
            className="group grid min-w-[190px] snap-center justify-items-center gap-8 text-center max-sm:min-w-[150px]"
            href="#"
            key={category.name}
          >
            <span
              className="relative grid size-[180px] place-items-center rounded-full bg-[#f6f6f6] transition-colors duration-300 group-hover:bg-[#ff5a4f] max-sm:size-[140px]"
            >
              <span className="relative z-10 h-[230px] w-[180px] -translate-y-14 transition-transform duration-300 group-hover:-translate-y-16 group-hover:scale-110 max-sm:h-[175px] max-sm:w-[138px] max-sm:-translate-y-11 max-sm:group-hover:-translate-y-12">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 138px, 180px"
                  className="object-contain"
                />
              </span>
            </span>
            <strong className="max-w-[190px] text-[20px] leading-snug font-medium text-black max-sm:text-base">
              {category.name}
            </strong>
          </a>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 z-10 grid size-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(31,41,51,0.12)] transition-colors hover:text-[#ff5a4f] max-sm:hidden"
        type="button"
        aria-label="Geser kategori ke kanan"
        onClick={() => scroll("right")}
      >
        <ChevronRight size={34} strokeWidth={2.5} />
      </button>
    </section>
  );
}
