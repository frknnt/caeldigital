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
            
            {/* Üst Kart: Trustpilot */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <p className="text-lg md:text-xl font-medium text-gray-800 relative z-10 leading-relaxed max-w-md">
                Trusted by 120+ clients across 4 industries -<br/>
                shipping AI from idea to production in 8–10 weeks
              </p>
              
              <div className="mt-10 md:mt-16 relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-7 h-7 text-[#00b67a]" viewBox="0 0 26 24" fill="currentColor">
                    <path d="M12.6792 18.3019L18.1887 16.9057L20.4906 24L12.6792 18.3019ZM25.3585 9.13208H15.6604L12.6792 0L9.69811 9.13208H0L7.84906 14.7925L4.86792 23.9245L12.717 18.2641L17.5472 14.7925L25.3585 9.13208Z"/>
                  </svg>
                  <span className="font-bold text-gray-900 text-lg">Trustpilot</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 bg-[#00b67a] flex items-center justify-center rounded-sm">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.9996 16.4114L15.6496 15.4341L17.1746 20.4001L11.9996 16.4114ZM20.3996 9.99255H13.9746L11.9996 3.6001L10.0246 9.99255H3.59961L8.79961 13.9548L6.82461 20.3473L12.0246 16.385L15.2246 13.9548L20.3996 9.99255Z"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arkaplandaki Silik 120+ Yazısı */}
              <div className="absolute -right-4 -bottom-10 text-[9rem] md:text-[11rem] font-bold text-gray-100 leading-none pointer-events-none select-none z-0">
                120+
              </div>
            </div>

            {/* Alt Kart: Müşteri Yorumu */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 md:gap-8 flex-1">
              
              {/* Profil Görseli */}
              <div className="w-32 h-40 md:w-36 md:h-44 shrink-0 rounded-2xl overflow-hidden shadow-inner">
                {/* HTML kodundaki quotes-1.jpg */}
                <img 
                  src="/assets/images/section/quotes-1.jpg" 
                  alt="Ava Collins" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Resim yüklenemezse geçici kırmızı arka plan göstersin
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23cc0000"/></svg>';
                  }}
                />
              </div>

              {/* Yorum İçeriği */}
              <div className="flex flex-col justify-center">
                {/* Tırnak İkonu */}
                <svg className="w-8 h-8 text-gray-200 mb-4" viewBox="0 0 23 20" fill="currentColor">
                  <path d="M12.9375 20V10.3597C12.9375 7.72182 13.824 5.51559 15.5969 3.74101C17.4177 1.91847 19.8854 0.671463 23 0V6.40288C21.8021 6.78657 21.0115 7.26619 20.6281 7.84173C20.2448 8.3693 20.0292 9.04077 19.9813 9.85612H23V20H12.9375ZM0 20V10.3597C0 7.72182 0.886459 5.51559 2.65938 3.74101C4.48021 1.91847 6.94792 0.671463 10.0625 0V6.40288C8.9125 6.78657 8.12187 7.26619 7.69062 7.84173C7.30729 8.3693 7.09167 9.04077 7.04375 9.85612H10.0625V20H0Z"/>
                </svg>
                
                <p className="text-[1.1rem] md:text-xl font-bold text-gray-900 mb-6 leading-snug">
                  Good AI feels obvious—because the hard work is hidden.
                </p>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm">
                  <span className="font-bold text-gray-900">Ava Collins</span>
                  <span className="text-gray-300 hidden sm:block">|</span>
                  <span className="text-gray-500 font-medium">Aigocy's Design Lead</span>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}