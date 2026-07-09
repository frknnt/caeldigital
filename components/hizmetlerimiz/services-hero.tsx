"use client";

import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[105vh] flex-col items-center overflow-hidden bg-[#f8f9fa] pb-10 pt-32 md:min-h-[90vh] md:pb-14 md:pt-36">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-red-50/30"></div>
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:mb-9">
          <Sparkles className="h-4 w-4 text-[#093efe]" />
          <span className="text-sm font-bold tracking-wide text-[#093efe]">
            Hizmetlerimiz
          </span>
        </div>

        <h1 className="mb-7 flex flex-col items-center text-[2.75rem] font-bold leading-[1.1] tracking-tight text-[#222d36] md:text-7xl lg:text-[5.5rem]">
          <span className="mb-2 block md:mb-4">
            Markanız İçin Gereken
          </span>

          <span className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <span>Tüm Dijital Çözümler</span>
          </span>
        </h1>

        <p className="mx-auto max-w-2xl px-4 text-lg font-medium leading-relaxed text-gray-600 md:text-[1.15rem]">
          Web tasarım, reklam yönetimi ve sosyal medya süreçlerini markanızın hedeflerine göre planlıyor;
          <br className="hidden md:block" />  dijitalde daha görünür, güçlü ve tercih edilen bir marka olmanızı sağlıyoruz.
        </p>
      </div>
    </section>
  );
}