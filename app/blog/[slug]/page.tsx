import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  category: string;
  content: string;
  author: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  focus_keyword: string | null;
  image_alt: string | null;
};

type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: blog } = await supabase
    .from("blogs")
    .select(
      "title, slug, cover_image_url, meta_title, meta_description, seo_keywords, image_alt"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!blog) {
    return {
      title: "Blog Yazısı Bulunamadı | Cael Digital",
      description: "Aradığınız blog yazısı bulunamadı.",
    };
  }

  const title = blog.meta_title || `${blog.title} | Cael Digital`;
  const description =
    blog.meta_description ||
    "Cael Digital blogunda web tasarım, sosyal medya yönetimi ve reklam yönetimi hakkında içerikler.";

  return {
    title,
    description,
    keywords: blog.seo_keywords
      ? blog.seo_keywords.split(",").map((keyword: string) => keyword.trim())
      : undefined,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://caeldigital.com/blog/${blog.slug}`,
      siteName: "Cael Digital",
      locale: "tr_TR",
      images: blog.cover_image_url
        ? [
            {
              url: blog.cover_image_url,
              width: 1200,
              height: 630,
              alt: blog.image_alt || blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.cover_image_url ? [blog.cover_image_url] : undefined,
    },
  };
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function parseContent(content: string): ContentBlock[] {
  const lines = content.split("\n");
  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.replace("## ", "").trim() });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.replace("### ", "").trim() });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.replace("- ", "").trim());
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !blog) {
    notFound();
  }

  const currentBlog = blog as BlogPost;
  const blocks = parseContent(currentBlog.content);
  const readingTime = getReadingTime(currentBlog.content);

  const { data: relatedData } = await supabase
    .from("blogs")
    .select(
      "id, title, slug, cover_image_url, category, content, author, status, published_at, created_at, meta_title, meta_description, seo_keywords, focus_keyword, image_alt"
    )
    .eq("status", "published")
    .neq("id", currentBlog.id)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(3);

  const relatedBlogs = (relatedData || []) as BlogPost[];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#08080c]">
      <Header />

      <main className="relative overflow-hidden pt-36 md:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-140px] h-[520px] w-[520px] rounded-full bg-[#093efe]/10 blur-[140px]" />
          <div className="absolute right-[-180px] top-[220px] h-[560px] w-[560px] rounded-full bg-[#093efe]/14 blur-[160px]" />
          <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(9,62,254,0.10),transparent_56%)]" />
        </div>

        <section className="relative px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[980px]">
            <Link
              href="/blog"
              className="mb-10 inline-flex h-[48px] items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 text-sm font-bold text-zinc-700 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:border-[#093efe]/30 hover:text-[#093efe]"
            >
              <ArrowLeft size={18} />
              Bloga Dön
            </Link>

            <p className="mb-5 text-center text-xs font-black uppercase tracking-[0.35em] text-[#093efe] md:text-left">
              Cael Digital Blog
            </p>

            <h1 className="mx-auto max-w-[880px] text-center text-[42px] font-black leading-[0.98] tracking-[-0.055em] text-[#08080c] sm:text-[58px] md:text-left lg:text-[72px]">
              {currentBlog.title}
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="inline-flex h-[40px] items-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-700 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
                {currentBlog.category}
              </span>

              <span className="inline-flex h-[40px] items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-700 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
                <CalendarDays size={16} className="text-[#093efe]" />
                {formatDate(currentBlog.published_at || currentBlog.created_at)}
              </span>

              <span className="inline-flex h-[40px] items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-700 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
                <Clock3 size={16} className="text-[#093efe]" />
                {readingTime} dk okuma
              </span>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-14 sm:px-8 lg:px-12">
          <article className="mx-auto max-w-[860px]">
            <div className="space-y-7 text-[17px] font-medium leading-8 text-zinc-700">
              {blocks.map((block, index) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={index}
                      className="pt-9 text-[27px] font-black leading-tight tracking-[-0.035em] text-[#08080c] md:text-[34px]"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "h3") {
                  return (
                    <h3
                      key={index}
                      className="pt-5 text-[22px] font-black leading-tight tracking-[-0.02em] text-[#08080c]"
                    >
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul key={index} className="space-y-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#093efe]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return <p key={index}>{block.text}</p>;
              })}
            </div>
          </article>
        </section>

        <section className="relative px-5 pb-18 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[860px] rounded-[26px] border border-zinc-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-9">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#093efe]">
                  Projeni Konuşalım
                </p>
                <h2 className="max-w-[540px] text-[28px] font-black leading-tight tracking-[-0.04em] text-[#08080c] md:text-[36px]">
                  Web siten, reklamların veya sosyal medya sürecin için net bir
                  yol haritası çıkaralım.
                </h2>
              </div>

              <Link
                href="/iletisim"
                className="inline-flex h-[56px] w-max items-center gap-3 rounded-full bg-[#093efe] px-7 text-[16px] font-black text-white shadow-[0_18px_38px_rgba(9,62,254,0.28)] transition hover:-translate-y-0.5"
              >
                Teklif Al
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative px-5 pb-24 pt-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#093efe]">
                  Benzer Haberler
                </p>
                <h2 className="text-[34px] font-black tracking-[-0.04em] text-[#08080c]">
                  Diğer Bloglar
                </h2>
              </div>

              <Link
                href="/blog"
                className="hidden rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-zinc-700 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:text-[#093efe] md:inline-flex"
              >
                Tümünü Gör
              </Link>
            </div>

            {relatedBlogs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {relatedBlogs.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-[22px] border border-zinc-200 bg-white p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.10)]"
                  >
                    <div className="aspect-[1.55/1] overflow-hidden rounded-[16px] bg-zinc-200">
                      <img
                        src={post.cover_image_url || "/blog/website-design-1.jpg"}
                        alt={post.image_alt || post.title}
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>

                    <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#093efe]">
                      {post.category}
                    </p>

                    <h3 className="mt-3 text-[20px] font-black leading-tight tracking-[-0.03em] text-[#08080c]">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-zinc-200 bg-white px-6 py-10 text-center text-zinc-500 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                Şimdilik başka blog yazısı yok.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
