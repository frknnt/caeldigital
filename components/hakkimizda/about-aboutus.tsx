"use client";

export default function aboutus() {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1200px]">
        
        {/* Üst Kısım: Rozet ve Başlık */}
        <div className="mb-10 md:mb-16 pl-2">
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 leading-[1.1]">
            Yaratıcı Fikirler,<br className="hidden md:block" /> Güçlü Dijital Markalar
          </h2>
        </div>

        {/* Ana Grid Yapısı */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          <div className="w-full lg:w-[55%] bg-gradient-to-b from-[#222222] to-[#0a0a0a] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl min-h-[400px] md:min-h-[500px]">
            <img
             src="/dunya.png"
             alt="Dünya görseli"
            className="absolute bottom-0 left-1/2 z-0 w-[115%] max-w-none -translate-x-1/2 object-contain pointer-events-none"
             />

           <div className="relative z-20 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#093efe] animate-pulse"></div>
               <span className="text-sm font-medium text-gray-200">
                  Yeni Nesil Dijital Çözümler
               </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight">
               Dijital dünyada <span className="text-[#093efe]">markanızı daha güçlü konumlandırıyoruz.</span>
              </h3>

           </div>
            </div>


          {/* Sağ Sütun: Alt Alta İki Açık Renk Kart */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 lg:gap-8">
            
            {/* Üst Kart: Our Vision */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl md:text-[2rem] font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100 tracking-tight">
                Vizyonumuz
              </h3>
              <p className="text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-[1.8] font-medium">
                Dijitalde sadece var olan değil, fark edilen markalar oluşturmak. Yaratıcı, yenilikçi ve sonuç odaklı çözümlerle Cael Digital’i markaların güvenle tercih ettiği güçlü bir dijital ajans haline getirmek.
              </p>
            </div>

            {/* Alt Kart: Our Mission */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex-1 flex flex-col justify-center">
              <h3 className="text-3xl md:text-[2rem] font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100 tracking-tight">
                Misyonumuz
              </h3>
              <p className="text-[1.05rem] md:text-[1.1rem] text-gray-700 leading-[1.8] font-medium">
                Cael Digital olarak markaların dijital dünyada daha güçlü, profesyonel ve görünür hale gelmesini sağlıyoruz. Web tasarım, sosyal medya yönetimi ve reklam çözümleriyle işletmelerin hedef kitlesine doğru şekilde ulaşmasına yardımcı oluyoruz.
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}