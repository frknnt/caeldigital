// app/about/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AboutHero from "@/components/hakkimizda/about-hero";
import Mission from "@/components/hakkimizda/about-aboutus"; 
import Values from "@/components/hakkimizda/about-values";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Cael Digital'in dijital pazarlama, web tasarım ve marka büyütme yaklaşımını yakından tanıyın.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />
      
      <main>
        {/* 1. Sayfanın en üstündeki devasa başlık alanı */}
        <AboutHero />
        
        {/* 2. DÜZELTME 2: Az önce oluşturduğumuz Dünya Haritası ve Vizyon/Misyon bileşeni */}
        <Mission />
        
        {/* 3. İletişim Formu (Contact) alanı */}
        <section className="relative flex flex-col items-center pt-28 pb-20 overflow-hidden bg-[#f8f9fa]">
          <div className="container mx-auto px-4 max-w-[1200px]">
            <div className="w-full lg:w-8/12 mx-auto">
             <Values />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}