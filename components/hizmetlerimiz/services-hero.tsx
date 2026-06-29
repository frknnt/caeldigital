"use client";

import Link from "next/link";
import { Sparkles, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-40 pb-20 overflow-hidden bg-[#f8f9fa]">
      {/* Arka Plan Görseli / Gradyanı */}
      {/* Şablondaki o şık kırmızı/gri dalgalı arka planı buraya bağlıyoruz */}
      <div className="absolute inset-0 z-0">
        {/* Görselin tam yolunu kendi projendeki klasöre göre güncelleyebilirsin (örn: /assets/images/hero-bg.jpg) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-red-50/30"></div>
        {/* Eğer arka plan resmi varsa bu img etiketini kullan: */}
        {/* <img src="/assets/images/backgrounds/hero-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-80" /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        
        {/* Üst Badge (AI-Driven Agency) */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-8 md:mb-10">
          <Sparkles className="w-4 h-4 text-[#00BFFF]" />
          <span className="text-sm font-bold text-[#00BFFF] tracking-wide">AI-Driven Agency</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-[2.75rem] leading-[1.1] md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#222d36] mb-8 flex flex-col items-center">
          <span className="block mb-2 md:mb-4">Your AI Sprint Team</span>
          
          <span className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <span>on Demand</span>
            
            {/* Etrafında İkonların Uçuştuğu Kırmızı Hap (Pill) */}
            <div className="relative inline-flex items-center justify-center w-28 h-12 md:w-40 md:h-[4.5rem] bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-[0_0_40px_rgba(239,68,68,0.4)] ml-2 md:ml-4 mt-2 md:mt-0">
              {/* Uçuşan İkonlar (Görsel yollarını kendi projene göre ayarla) */}
              <img 
                src="/assets/images/item/hero-1.svg" 
                alt="Icon 1" 
                className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-10 h-10 md:w-14 md:h-14 drop-shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-300"
              />
              <img 
                src="/assets/images/item/hero-2.svg" 
                alt="Icon 2" 
                className="absolute -bottom-4 left-6 md:-bottom-6 md:left-8 w-10 h-10 md:w-14 md:h-14 drop-shadow-xl rotate-12 hover:rotate-0 transition-transform duration-300"
              />
              <img 
                src="/assets/images/item/hero-3.svg" 
                alt="Icon 3" 
                className="absolute top-1 -right-4 md:top-2 md:-right-6 w-10 h-10 md:w-14 md:h-14 drop-shadow-xl rotate-[20deg] hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </span>
        </h1>

        {/* Alt Metin */}
        <p className="text-lg md:text-[1.15rem] text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed px-4 font-medium">
          From discovery to deployment, we plug into your stack to prototype, <br className="hidden md:block" /> validate, and launch AI experiences your users actually love.
        </p>
      </div>

      
    </section>
  );
}