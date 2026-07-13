import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BlogBlogs from "@/components/blog/blog-blogs";

export default function BlogPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans selection:bg-red-500 selection:text-white">
      <Header />

      <main>
        <BlogBlogs />
      </main>

      <Footer />
    </div>
  );
}