"use client";

import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[72vh] flex-col items-center overflow-hidden bg-[#f8f9fa] pb-10 pt-32 md:min-h-[78vh] md:pb-14 md:pt-36">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-red-50/30"></div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:mb-9">
          <Sparkles className="h-4 w-4 text-[#093efe]" />
          <span className="text-sm font-bold tracking-wide text-[#093efe]">
            Hakkımızda
          </span>
        </div>

        <h1 className="mb-7 flex flex-col items-center text-[2.75rem] font-bold leading-[1.1] tracking-tight text-[#222d36] md:text-7xl lg:text-[5.5rem]">
          <span className="mb-2 block md:mb-4">
            Dijital Çağın Yaratıcı ve
          </span>

          <span className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <span>Yenilikçi Ajansı</span>

            <div className="relative mt-2 ml-2 inline-flex h-12 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-800 shadow-[0_0_40px_rgba(9,62,254,0.35)] md:mt-0 md:ml-4 md:h-[4.5rem] md:w-40">
              <img
                src="/meta.webp"
                alt="Meta"
                className="absolute -top-4 -left-4 h-10 w-10 -rotate-12 drop-shadow-xl transition-transform duration-300 hover:rotate-0 md:-top-6 md:-left-6 md:h-14 md:w-14"
              />
              <img
                src="/instagram.webp"
                alt="Instagram"
                className="absolute -bottom-4 left-6 h-10 w-10 rotate-12 drop-shadow-xl transition-transform duration-300 hover:rotate-0 md:-bottom-6 md:left-8 md:h-14 md:w-14"
              />
              <img
                src="/facebook.webp"
                alt="Facebook"
                className="absolute top-1 -right-4 h-10 w-10 rotate-[20deg] drop-shadow-xl transition-transform duration-300 hover:rotate-0 md:top-2 md:-right-6 md:h-14 md:w-14"
              />
            </div>
          </span>
        </h1>

        <p className="mx-auto max-w-2xl px-4 text-lg font-medium leading-relaxed text-gray-600 md:text-[1.15rem]">
          İşletmen internette sadece var olmasın, fark edilsin.
          <br className="hidden md:block" /> Biz dijitalde iz bırakacak markalar
          tasarlarız.
        </p>
      </div>
    </section>
  );
}