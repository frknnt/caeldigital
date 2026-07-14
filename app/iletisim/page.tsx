// app/about/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactDetails from "@/components/iletisim/contact-details";
import Contact from "@/components/iletisim/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Web site, sosyal medya ve reklam yönetimi ihtiyaçlarınız için Cael Digital ile iletişime geçin.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />
      
      <main>
        
        
        {/* 2. DÜZELTME 2: Az önce oluşturduğumuz Dünya Haritası ve Vizyon/Misyon bileşeni */}
        <ContactDetails />
        
        {/* 3. İletişim Formu (Contact) alanı */}
        <Contact />

        {/* 3. İletişim Formu (Contact) alanı */}
        <section className="relative flex flex-col items-center pt-28 overflow-hidden bg-[#f8f9fa]">
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