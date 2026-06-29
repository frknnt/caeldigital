"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const servicesData = [
  {
    id: "01",
    title: "AI Strategy & Mapping",
    description: "Identify high-ROI use cases and define a realistic, measurable AI roadmap. Our AI Strategy & Mapping process aligns technology with business goals through stakeholder discovery, KPI modeling, and data readiness assessment to ensure sustainable growth and measurable transformation outcomes.",
    tags: ["Stakeholder discovery", "Value model & KPI definition", "Data readiness assessment"],
    image: "/assets/images/services/strategy.jpg" // Görsel yolunu kendi projene göre ayarla
  },
  {
    id: "02",
    title: "AI UX & Product Design",
    description: "Transform complex AI capabilities into intuitive, user-centric experiences. We design interfaces that build trust, reduce friction, and make AI interactions feel natural and accessible for every user.",
    tags: ["User research", "Interface design", "Prototyping"],
    image: "/assets/images/services/design.jpg"
  },
  {
    id: "03",
    title: "LLM / Agent Development",
    description: "Build custom large language models and autonomous agents tailored to your specific business workflows. We develop intelligent systems capable of complex reasoning, task execution, and seamless integration.",
    tags: ["Custom LLMs", "Autonomous agents", "Prompt engineering"],
    image: "/assets/images/services/development.jpg"
  },
  {
    id: "04",
    title: "Data Engineering & Pipelines",
    description: "Establish robust, scalable data infrastructure to power your AI initiatives. We design clean, automated pipelines that ensure your models are trained on high-quality, real-time data.",
    tags: ["Data architecture", "ETL processes", "Database optimization"],
    image: "/assets/images/services/data.jpg"
  }
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
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
            <span className="text-[0.85rem] font-bold text-[#00BFFF] tracking-wide">Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#222d36] mb-6">
            End-to-End AI Services
          </h2>
          
          <p className="text-[1.05rem] text-[#666666] font-light max-w-2xl leading-[1.8]">
            We turn ambiguous AI ideas into production features your users trust—combining strategy, design, engineering, and rigorous evaluation.
          </p>
        </div>

        {/* Akordeon Listesi */}
        <div className="flex flex-col gap-5">
          {servicesData.map((service, index) => {
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
                          {service.tags.map((tag, idx) => (
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