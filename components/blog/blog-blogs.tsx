import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const blogPosts = [
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-1.jpg",
    href: "/blog/helve-tica-website-redesign",
  },
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-2.jpg",
    href: "/blog/website-design-sureci",
  },
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-3.jpg",
    href: "/blog/marka-icin-web-sitesi",
  },
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-1.jpg",
    href: "/blog/donusum-odakli-web-tasarim",
  },
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-2.jpg",
    href: "/blog/sosyal-medya-stratejisi",
  },
  {
    category: "Website Design",
    title: "Helve Tica Website Redesign",
    image: "/blog/website-design-3.jpg",
    href: "/blog/reklam-yonetimi",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen px-5 py-24 text-[#08080c] sm:px-8 lg:px-12">
      <section className="mx-auto max-w-[1500px] pt-24">
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.href} className="group">
              <Link href={post.href} className="block">
                <div className="relative aspect-[1.39/1] overflow-hidden rounded-[10px] bg-zinc-300">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 31vw"
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
                    Read more
                    <ArrowUpRight size={22} strokeWidth={1.8} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
