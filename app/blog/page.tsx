// app/about/page.tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BlogHero from "@/components/blog/blog-hero";
import Blog from "@/components/blog/blog-blogs";


export default function BlogPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />
      
      <main>
        {/* 1. Sayfanın en üstündeki devasa başlık alanı */}
        <BlogHero />
        <Blog />
        


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