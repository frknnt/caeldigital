"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const servicesList = [
  { 
    id: "01", 
    title: "Web Hizmetleri", 
    description: "Markanızın dijital vitrinini modern, hızlı ve kullanıcı dostu web siteleriyle güçlendiriyoruz. Kurumsal web sitelerinden landing page tasarımlarına, mobil uyumlu arayüzlerden yönetilebilir altyapılara kadar tüm süreci markanıza özel şekilde planlıyoruz.", 
    tag: ["E-Ticaret","Kurumsal Web Tasarım", "Mobil Uyumlu Tasarım", "UI&UX","SEO Uyumlu Altyapı"],
    image: "/webhizmetleri.png" // 1. hizmetin görseli
  },
  { 
    id: "02", 
    title: "Sosyal Medya Yönetimi", 
    description: "Markanızın sosyal medyada düzenli, profesyonel ve güven veren bir görünüm kazanması için içerik planlama, görsel tasarım, metin yazımı ve paylaşım sürecini stratejik şekilde yönetiyoruz. Sadece paylaşım yapmakla kalmıyor, markanızın dijital dilini oluşturuyoruz.", 
    tag: ["İçerik Planlama", "Post & Story Tasarımı", "Profil Düzenleme","Etkileşim Yönetimi","Aylık Raporlama"],
    image: "/sosyalmedyayonetimi.png" // 2. hizmetin görseli
  },
  { 
    id: "03", 
    title: "Meta Reklam Yönetimi", 
    description: "Instagram ve Facebook reklamlarınızı doğru hedef kitle, doğru kreatif ve doğru bütçe yönetimiyle profesyonel şekilde hazırlıyoruz. Amacımız yalnızca görünürlük sağlamak değil; markanız için mesaj, trafik, satış veya potansiyel müşteri odaklı sonuçlar üretmek.", 
    tag: ["Instagram Reklamları", "Facebook Reklamları", "Hedef Kitle Analizi","Bütçe Optimizasyonu","Performans Takibi"],
    image: "/metareklamyonetimi2.png" // 3. hizmetin görseli
  },
  { 
    id: "04", 
    title: "Grafik Tasarım", 
    description: "Markanızın görsel kimliğini güçlendiren, dikkat çekici ve profesyonel tasarımlar hazırlıyoruz. Sosyal medya görsellerinden reklam kreatiflerine, kurumsal kimlik çalışmalarından kampanya tasarımlarına kadar markanızın her temas noktasında güçlü görünmesini sağlıyoruz.", 
    tag: ["Sosyal Medya Tasarımları", "Logo Tasarımı", "Kurumsal Kimlik","Reklam Kreatifleri","Kampanya Tasarımları"],
    image: "/grafiktasarim.png" // 4. hizmetin görseli
  },
];

export default function ServicesAccordion() {
  // İlk kart (index 0) varsayılan olarak açık gelsin
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-[#f2f3f5]">
      <div className="container mx-auto px-4 max-w-[1000px] lg:max-w-[1100px]">
        
        {/* Üst Kısım: Rozet, Başlık ve Alt Metin */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#093efe]"></div>
            <span className="text-[0.85rem] font-bold text-[#093efe] tracking-wide">Hizmetlerimiz</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#222d36] mb-6">
            Uçtan Uca Dijital Çözümler
          </h2>
          
          <p className="text-[1.05rem] text-[#666666] font-light max-w-2xl leading-[1.8]">
            Web tasarım, reklam yönetimi ve sosyal medya süreçlerini tek bir strateji altında birleştirerek markanızın dijitalde daha güçlü, görünür ve profesyonel bir konuma ulaşmasını sağlıyoruz.
          </p>
        </div>

        {/* Akordeon Listesi */}
        <div className="flex flex-col gap-5">
          {servicesList.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={service.id}
                onClick={() => toggleAccordion(index)}
                className={`cursor-pointer transition-all duration-500 overflow-hidden flex flex-col justify-start rounded-[2rem] w-full ${
                  isOpen 
                    ? "bg-[#1c1c1c] shadow-2xl pb-10" // Açık kart stili (Koyu)
                    : "bg-[#fafafa] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]" // Kapalı kart stili (Açık)
                }`}
              >
                {/* Her Kartın Üst Barı (Başlık ve Ok İkonu) */}
                <div className={`flex items-center justify-between px-8 py-7 md:px-12 md:py-8 ${isOpen ? "pb-6" : ""}`}>
                  <h3 className={`text-[1.5rem] md:text-[2rem] font-medium tracking-tight ${isOpen ? "text-white" : "text-[#666666]"}`}>
                    {service.title}
                  </h3>
                  
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors duration-300 shrink-0 ml-4 ${
                    isOpen ? "border-white/20 text-white" : "border-gray-300 text-gray-400"
                  }`}>
                    {isOpen ? (
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    )}
                  </div>
                </div>

                {/* Açık Kart İçeriği (Sadece isOpen true ise görünür) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Ayırıcı Çizgi */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mx-auto h-[1px] bg-white/10 mb-8 md:mb-10"></div>
                    
                    {/* Alt İçerik: Görsel (Sol) ve Metinler (Sağ) */}
                    <div className="flex flex-col lg:flex-row gap-10 px-8 md:px-12 relative">
                      
                      {/* Sol Görsel Kutusu */}
                      <div className="w-full lg:w-1/2 rounded-[1.5rem] overflow-hidden bg-[#2a2a2a] relative z-10">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover min-h-[200px] md:min-h-[280px]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23333"/></svg>';
                          }}
                        />
                      </div>

                      {/* Sağ Metin ve Etiketler */}
                      <div className="w-full lg:w-1/2 flex flex-col justify-start relative z-10 pt-2">
                        <p className="text-[0.95rem] md:text-[1.05rem] text-gray-300 font-light leading-[1.8] mb-8">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          {service.tag.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="px-4 py-2 rounded-full bg-white/10 border border-white/5 text-gray-300 text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arkaplandaki Büyük Silik Numara */}
                      <div className="absolute right-8 md:right-12 bottom-0 translate-y-1/4 text-[6rem] md:text-[8rem] font-semibold text-white/5 pointer-events-none select-none z-0">
                        {service.id}
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}