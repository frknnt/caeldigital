"use client";

// Örnek projeler (Görselleri kendi public klasörüne göre güncelleyebilirsin)
const works = [
  {
    title: "Support Copilot for SaaS",
    image: "/assets/images/section/featured-works-1.jpg",
    description: "Draft replies and pulls account context; reduced first-response time by 38%.",
    deliverables: "AI strategy, AI UX flows, LLM agent, RAG",
    industry: "SaaS",
    activeDot: 0
  },
  {
    title: "Underwriting Risk Copilot",
    image: "/assets/images/section/featured-works-2.jpg",
    description: "Built a triage assistant to summarize claims; cut manual review time by 42%.",
    deliverables: "Use-case mapping, Prompt & UI patterns",
    industry: "Fintech",
    activeDot: 1
  },
  {
    title: "Clinical Note Summarizer",
    image: "/assets/images/section/featured-works-3.jpg",
    description: "Clinic-lobby assistant answering pre-visit questions; decreased front-desk calls by 28%.",
    deliverables: "PHI-safe RAG, HIPAA-aligned workflows",
    industry: "Healthcare",
    activeDot: 2
  },
  {
    title: "Catalog Intelligence Engine",
    image: "/assets/images/section/featured-works-4.jpg",
    description: "Launched a shopping copilot that understands attributes; raised add-to-cart by 12%.",
    deliverables: "Data cleaning & embeddings",
    industry: "Ecommerce/Retail",
    activeDot: 3
  }
];

export default function FeaturedWorks() {
  return (
    <section id="works" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 max-w-[1400px]">
        
        {/* Başlık Alanı */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
            <span className="text-sm font-bold text-[#00BFFF] tracking-wide">Featured Works</span>
          </div>
          {/* Eğer istersen buraya büyük bir başlık da eklenebilir, görselde sadece rozet vardı */}
        </div>

        {/* Projeler Grid Alanı (Mobilde 1, Masaüstünde 2 Sütun) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {works.map((work, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Proje Görseli */}
              <div className="w-full aspect-[16/10] md:aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f3f4f6"/></svg>';
                  }}
                />
              </div>

              <div className="px-2 md:px-4 flex flex-col flex-1">
                {/* Noktalar (Pagination Dots) */}
                <div className="flex gap-1.5 mb-6">
                  {[0, 1, 2, 3].map((dotIndex) => (
                    <div 
                      key={dotIndex} 
                      className={`w-2 h-2 rounded-full transition-colors ${
                        dotIndex === work.activeDot ? 'bg-[#00BFFF]' : 'bg-gray-200'
                      }`} 
                    />
                  ))}
                </div>

                {/* İnce Ayırıcı Çizgi */}
                <div className="w-full h-px bg-gray-100 mb-8"></div>

                {/* Proje Detayları (Başlık Üstte, Özellikler Altta 3 Sütun) */}
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-6 items-start">
                  
                  {/* Başlık (Sol Taraf) */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight xl:w-1/3">
                    {work.title}
                  </h3>

                  {/* Özellikler Grid (Sağ Taraf) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 xl:w-2/3">
                    {/* Description */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description</p>
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{work.description}</p>
                    </div>
                    
                    {/* Deliverables */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Deliverables</p>
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{work.deliverables}</p>
                    </div>
                    
                    {/* Industry */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Industry</p>
                      <p className="text-sm font-semibold text-gray-800 leading-snug">{work.industry}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}