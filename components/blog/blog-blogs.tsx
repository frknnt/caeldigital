"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type BlogPost = {
  id: string;
  category: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  image_alt: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogBlogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(
          "id, category, title, slug, cover_image_url, image_alt, status, published_at, created_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Blog fetch error:", error.message);
        setLoading(false);
        return;
      }

      setBlogPosts((data || []) as BlogPost[]);
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  return (
    <main className="min-h-screen px-5 py-24 text-[#08080c] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-[1500px] pt-24">
        {loading ? (
          <div className="py-24 text-center text-lg font-semibold text-zinc-500">
            Bloglar yükleniyor...
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="py-24 text-center text-lg font-semibold text-zinc-500">
            Henüz yayınlanmış blog yazısı bulunmuyor.
          </div>
        ) : (
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[1.39/1] overflow-hidden rounded-[10px] bg-zinc-300">
                    <img
                      src={post.cover_image_url || "/blog/website-design-1.jpg"}
                      alt={post.image_alt || post.title}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>

                  <div className="px-6 pt-8 sm:px-7">
                    <p className="text-[20px] font-medium leading-none text-zinc-500">
                      {post.category}
                    </p>

                    <h2 className="mt-5 text-[28px] font-semibold leading-tight tracking-normal text-[#08080c] lg:text-[30px]">
                      {post.title}
                    </h2>

                    <div className="mt-6 inline-flex h-[66px] items-center gap-4 rounded-full border border-white/90 bg-white px-8 text-[18px] font-semibold text-[#15151a] shadow-[0_4px_0_rgba(0,0,0,0.08),0_9px_18px_rgba(0,0,0,0.14)] transition duration-300 group-hover:-translate-y-0.5">
                      Devamını Oku
                      <ArrowUpRight size={22} strokeWidth={1.8} />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
