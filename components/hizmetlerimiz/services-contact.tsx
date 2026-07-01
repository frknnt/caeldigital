"use client";

import { Mail, Headset, Paperclip } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
      
      {/* Arka Plan Görseli */}
      {/* Görselin tam yolunu kendi public klasörüne göre kontrol etmelisin */}
      <img 
        src="/assets/images/section/contact-image-bg.jpg" 
        alt="Contact Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        onError={(e) => {
          // Görsel bulunamazsa yerine geçici bir gradient arkaplan göstersin
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-gray-200', 'via-gray-100', 'to-blue-100');
        }}
      />

      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Sol Sütun: Başlık ve İletişim Bilgileri */}
          <div className="w-full lg:w-5/12 flex flex-col">
            
            {/* Rozet */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 mb-8 w-max">
              <div className="w-1.5 h-1.5 rounded-full bg-[#093efe]"></div>
              <span className="text-sm font-bold text-[#093efe] tracking-wide">İletişim Formu</span>
            </div>
            
            {/* Ana Başlık */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-12 tracking-tight">
              Dijital Yolculuğunuzu  <br /> Birlikte Planlayalım
            </h2>
            
            {/* İletişim Bilgileri Kutuları */}
            <div className="space-y-6">
              
              {/* Email */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">E-MAİL ADRESİMİZ</p>
                  <p className="text-lg font-medium text-gray-600">destek@caeldigital.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-700">
                  <Headset className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">Telefon Numaramız</p>
                  <p className="text-lg font-medium text-gray-600">+90 (544) 633 43 57</p>
                </div>
              </div>

            </div>
          </div>

          {/* Sağ Sütun: Form Kartı */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white">
              
              <h3 className="text-3xl font-bold text-gray-900 mb-10 tracking-tight">
                Lütfen Aşağıdaki Formu Doldurun
              </h3>
              
              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                
                {/* İsim Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">İsminiz</label>
                  <input 
                    type="text" 
                    placeholder="Lütfen isminizi giriniz" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none" 
                    required 
                  />
                </div>

                {/* Telefon Input (Orijinal HTML'de placeholder "Enter the e-mail" olarak unutulmuş, onu düzelttim) */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Telefon Numaranız</label>
                  <input 
                    type="tel" 
                    placeholder="Lütfen telefon numaranızı giriniz" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none" 
                    required 
                  />
                </div>

                {/* Proje Detayı Textarea */}
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2">Merak Ettikleriniz</label>
                  <textarea 
                    rows={1}
                    placeholder="" 
                    className="w-full bg-transparent border-0 border-b border-gray-200 pb-8 text-gray-900 focus:ring-0 focus:border-[#00BFFF] transition-colors outline-none resize-none"
                  ></textarea>
                </div>


                {/* Submit Butonu (Koyu Temalı 3D Hap Buton) */}
                <button 
                  type="submit" 
                  className="w-full py-4 mt-4 bg-gradient-to-b from-[#333333] to-[#1a1a1a] border border-[#444] text-white font-semibold rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  Formu Gönderin 
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}