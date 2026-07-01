"use client";
import { useState } from "react";

// Hizmetlerimizin verisi (Görselleri kendi public klasörüne göre güncelleyebilirsin)
const servicesList = [
  { 
    id: "01", 
    title: "Web Hizmetleri", 
    desc: "Markanızın dijital vitrinini modern, hızlı ve kullanıcı dostu web siteleriyle güçlendiriyoruz. Kurumsal web sitelerinden landing page tasarımlarına, mobil uyumlu arayüzlerden yönetilebilir altyapılara kadar tüm süreci markanıza özel şekilde planlıyoruz.", 
    tags: ["E-Ticaret","Kurumsal Web Tasarım", "Mobil Uyumlu Tasarım", "UI&UX","SEO Uyumlu Altyapı"],
    image: "/webhizmetleri.png" // 1. hizmetin görseli
  },
  { 
    id: "02", 
    title: "Sosyal Medya Yönetimi", 
    desc: "Markanızın sosyal medyada düzenli, profesyonel ve güven veren bir görünüm kazanması için içerik planlama, görsel tasarım, metin yazımı ve paylaşım sürecini stratejik şekilde yönetiyoruz. Sadece paylaşım yapmakla kalmıyor, markanızın dijital dilini oluşturuyoruz.", 
    tags: ["İçerik Planlama", "Post & Story Tasarımı", "Profil Düzenleme","Etkileşim Yönetimi","Aylık Raporlama"],
    image: "/sosyalmedyayonetimi.png" // 2. hizmetin görseli
  },
  { 
    id: "03", 
    title: "Meta Reklam Yönetimi", 
    desc: "Instagram ve Facebook reklamlarınızı doğru hedef kitle, doğru kreatif ve doğru bütçe yönetimiyle profesyonel şekilde hazırlıyoruz. Amacımız yalnızca görünürlük sağlamak değil; markanız için mesaj, trafik, satış veya potansiyel müşteri odaklı sonuçlar üretmek.", 
    tags: ["Instagram Reklamları", "Facebook Reklamları", "Hedef Kitle Analizi","Bütçe Optimizasyonu","Performans Takibi"],
    image: "/metareklamyonetimi2.png" // 3. hizmetin görseli
  },
  { 
    id: "04", 
    title: "Grafik Tasarım", 
    desc: "Markanızın görsel kimliğini güçlendiren, dikkat çekici ve profesyonel tasarımlar hazırlıyoruz. Sosyal medya görsellerinden reklam kreatiflerine, kurumsal kimlik çalışmalarından kampanya tasarımlarına kadar markanızın her temas noktasında güçlü görünmesini sağlıyoruz.", 
    tags: ["Sosyal Medya Tasarımları", "Logo Tasarımı", "Kurumsal Kimlik","Reklam Kreatifleri","Kampanya Tasarımları"],
    image: "/grafiktasarim.png" // 4. hizmetin görseli
  },
];

export default function Services() {
  // Varsayılan olarak görseldeki gibi 01 numaralı tab açık gelsin
  const [activeTab, setActiveTab] = useState("01");

  // Aktif olan tab'ın görselini buluyoruz
  const activeService = servicesList.find(s => s.id === activeTab) || servicesList[0];

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-wrap lg:flex-nowrap gap-12 lg:gap-20">
        
        {/* Sol Sütun (Başlık ve Değişen Görsel) */}
        <div className="w-full lg:w-5/12 flex flex-col">
          {/* Rozet */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 mb-8 w-max">
            <div className="w-1.5 h-1.5 rounded-full bg-[#093efe]"></div>
            <span className="text-sm font-bold text-[#093efe] tracking-wide">Hizmetlerimiz</span>
          </div>
          
          {/* Başlık */}
          <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Uçtan Uca <br /> Dijital Çözümler
          </h2>
          
          {/* Açıklama Metni */}
          <p className="text-lg font-medium text-gray-600 leading-relaxed mb-12 max-w-md">
            Markanızın dijitalde daha profesyonel, güvenilir ve görünür olması için web, sosyal medya, reklam ve tasarım süreçlerini tek çatı altında yönetiyoruz.
          </p>

          {/* Dinamik Görsel Alanı (Seçilen hizmete göre değişir) */}
          <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl mt-auto hidden lg:block">
            {/* Resimler arası geçiş yaparken yumuşak bir fade efekti sağlamak için key kullanıyoruz */}
            <img 
              key={activeService.id}
              src={activeService.image} 
              alt={activeService.title} 
              className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in-out]"
              onError={(e) => {
                // Görsel bulunamazsa gri arkaplan versin
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23d1d5db"/></svg>';
              }}
            />
          </div>
        </div>

        {/* Sağ Sütun (Akordiyon Listesi) */}
        <div className="w-full lg:w-7/12 flex flex-col gap-5">
          {servicesList.map((service) => {
            const isActive = activeTab === service.id;

            return (
              <button 
                key={service.id} 
                type="button"
                onClick={() => setActiveTab(service.id)}
                className={`w-full text-left block cursor-pointer transition-all duration-500 overflow-hidden touch-manipulation outline-none ${
                  isActive 
                    ? "bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)]" // Aktif durum (Koyu Tema)
                    : "bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white hover:border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]" // Pasif durum (3D Beyaz Hap)
                }`}
              >
                {/* Akordiyon Başlığı */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className={`text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}>
                    {service.title}
                  </h3>
                  <span className={`text-lg font-bold mt-2 transition-colors duration-300 ${
                    isActive ? "text-gray-300" : "text-gray-400"
                  }`}>
                    ({service.id})
                  </span>
                </div>

                {/* Akordiyon İçeriği (Sadece aktifken görünür) */}
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    isActive ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <p className="text-[1.1rem] text-gray-300 mb-8 font-medium leading-relaxed max-w-lg">
                    {service.desc}
                  </p>
                  
                  {/* Etiketler (Tags) */}
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-5 py-2.5 bg-[#333333] border border-[#444] text-gray-200 text-sm font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Sadece Mobilde Görünen Görsel (Masaüstünde sol sütunda olduğu için burada gizliyoruz) */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mt-8 lg:hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23d1d5db"/></svg>';
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}