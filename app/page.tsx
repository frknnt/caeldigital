import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Hero from "../components/ana-sayfa/hero";
import Hakkimizda from "../components/ana-sayfa/hakkimizda";
import Hizmetlerimiz from "../components/ana-sayfa/hizmetlerimiz";
import Portfolio from "../components/ana-sayfa/portfolyo";
import Iletisim from "../components/ana-sayfa/iletisim";

export default function Home() {
  return (
    <div className="bg-[#111111] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      <Header />
      
      <main>
        <Hero />
        <Hakkimizda />
        
        {/* Beyaz alana geçiş bölgesi */}
        <div className="bg-[#f8f9fa]">
          <div className="bg-white text-black rounded-t-[40px] md:rounded-t-[80px] overflow-hidden">
          <Hizmetlerimiz />
          <Portfolio />
          </div>
        </div>
        
        {/* Tekrar siyah alana geçiş */}
        <div className="bg-[#111111] text-white">
          <Iletisim />
        </div>
      </main>

      <Footer />
    </div>
  );
}