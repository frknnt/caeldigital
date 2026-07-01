"use client";

export default function Hakkimizda() {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1200px]">
        
        {/* Üst Kısım: Rozet ve Başlık */}
        <div className="mb-10 md:mb-16 pl-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]"></div>
            <span className="text-sm font-bold text-[#00BFFF] tracking-wide">About Us</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 leading-[1.1]">
            Human-Centered AI,<br className="hidden md:block" /> Built for Production
          </h2>
        </div>

        {/* Ana Grid Yapısı */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Sol Kutu: Koyu Tema Dünya Kartı */}
          <div className="w-full lg:w-[55%] bg-gradient-to-b from-[#222222] to-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl min-h-[400px] md:min-h-[500px]">
            {/* İçerik (Z-index ile görselin üstünde tutuyoruz) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] animate-pulse"></div>
                <span className="text-sm font-medium text-gray-200">Available for worldwide project</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight">
                Based in <span className="text-[#00BFFF]">Montréal, Canada</span>
              </h3>
              
              <button className="px-8 py-4 bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] border border-[#444] rounded-full text-white font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                Start a Project
              </button>
            </div>

            {/* Dünya Görseli */}
            {/* Görselin tam yolunu ayarlamayı unutma! Orijinal HTML'de earth.png şeklindeydi */}
            <img 
              src="/assets/images/item/earth.png" 
              alt="World Globe" 
              className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 w-[130%] md:w-[110%] max-w-none opacity-60 pointer-events-none" 
            />
          </div>

          {/* Sağ Sütun: Alt Alta İki Açık Renk Kart */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 lg:gap-8">
            
            {/* Üst Kart: Our Vision */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl md:text-[2rem] font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100 tracking-tight">
                Our Vision
              </h3>
              <p className="text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-[1.8] font-medium">
                To pioneer the next era of digital transformation by making artificial intelligence accessible, ethical, and highly effective. We envision a future where human ingenuity is amplified by AI, creating unprecedented opportunities for growth and innovation across all global industries.
              </p>
            </div>

            {/* Alt Kart: Our Mission */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl md:text-[2rem] font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100 tracking-tight">
                Our Mission
              </h3>
              <p className="text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-[1.8] font-medium">
                Based in Montréal, Canada, we build human-centered AI for production. Our mission is to create intelligent systems that empower people and organizations. By uniting research, design, and engineering, we deliver scalable and reliable AI solutions—technology that's practical, trustworthy, and designed to make a meaningful impact in the real world.
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}