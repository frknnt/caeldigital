import React from 'react';
import { Rocket, Lightbulb, Handshake, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [

        {
      title: "Veriyle Büyüme",
      icon: <Handshake className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Tahminlerle değil, analizlerle ilerliyoruz. Sosyal medya performansı, web sitesi davranışları ve reklam sonuçlarını takip ederek markalar için daha doğru, daha etkili ve sürdürülebilir dijital büyüme stratejileri oluşturuyoruz."
    },
    {
      title: "Marka Hikâyesi",
      icon: <Lightbulb className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Her markanın dijitalde anlatılması gereken güçlü bir hikâyesi olduğuna inanıyoruz. Bu hikâyeyi doğru dil, yaratıcı görseller ve etkili içeriklerle görünür hale getirerek markaların akılda kalmasını sağlıyoruz."
    },
        {
      title: "Stratejik Görünürlük",
      icon: <Rocket className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Markaların dijitalde sadece var olmasını değil, doğru kitle tarafından fark edilmesini hedefliyoruz. Web sitesi, sosyal medya ve reklam stratejilerini tek bir bütün olarak ele alarak markanın dijital görünürlüğünü güçlendiriyoruz."
    },

    {
      title: "Dönüşüm Odaklı Tasarım",
      icon: <Sparkles className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Güzel görünen ama sonuç üretmeyen tasarımlar yerine, kullanıcıyı aksiyona yönlendiren dijital deneyimler tasarlıyoruz. Her sayfa, her içerik ve her görsel; güven, ilgi ve dönüşüm oluşturacak şekilde planlanır."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 lg:p-12">
      {/* Dörtlü Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full">
        
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-[#f4f5f7] rounded-[32px] p-8 lg:p-10 w-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col justify-start"
          >
            {/* İkon Kutusu */}
            <div className="w-[72px] h-[72px] bg-[#222222] rounded-[24px] flex items-center justify-center shadow-[0_15px_25px_-10px_rgba(0,0,0,0.6)] mb-8 shrink-0">
              {feature.icon}
            </div>

            {/* Başlık */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
              {feature.title}
            </h3>

            {/* Metin */}
            <p className="text-gray-500 text-[15px] leading-relaxed font-light">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}