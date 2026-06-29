// app/about/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServicesHero from "@/components/hizmetlerimiz/services-hero";
import ServicesAccordion from "@/components/hizmetlerimiz/service-details";
import ServicesContact from "@/components/hizmetlerimiz/services-contact";

export default function ServicesPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />
      
      <main>
        {/* 1. Sayfanın en üstündeki devasa başlık alanı */}
        <ServicesHero />
        
        {/* 2. DÜZELTME 2: Az önce oluşturduğumuz Dünya Haritası ve Vizyon/Misyon bileşeni */}
        <ServicesAccordion />
        
        {/* 3. İletişim Formu (Contact) alanı */}
        <ServicesContact />

        {/* 3. İletişim Formu (Contact) alanı */}
        <section className="relative flex flex-col items-center pt-28 pb-20 overflow-hidden bg-[#f8f9fa]">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <div className="w-full lg:w-8/12 mx-auto">
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}