"use client";

import { useMemo, useState } from "react";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type BlogStatus = "Yayında" | "Taslak";

type BlogPost = {
  id: string;
  image: string;
  title: string;
  category: string;
  author: string;
  content: string;
  createdAt: string;
  status: BlogStatus;
};

const categories = ["Yazılım", "Pazarlama", "Sosyal Medya", "Web Tasarım", "Reklam Yönetimi"];

const initialPosts: BlogPost[] = [
  {
    id: "1",
    image: "/blog-1.jpg",
    title: "Web Tasarım Trendleri 2026",
    category: "Yazılım",
    author: "Cael Digital",
    content: "Web tasarım dünyasında öne çıkan trendler ve işletmeler için uygulanabilir öneriler.",
    createdAt: "09.07.2026 10:24",
    status: "Yayında",
  },
  {
    id: "2",
    image: "/blog-2.jpg",
    title: "Sosyal Medyada Marka Bilinirliği",
    category: "Sosyal Medya",
    author: "Cael Digital",
    content: "Markaların sosyal medyada daha görünür olmasını sağlayan temel stratejiler.",
    createdAt: "09.07.2026 11:05",
    status: "Taslak",
  },
  {
    id: "3",
    image: "/blog-3.jpg",
    title: "Reklam Yönetiminde Doğru Hedefleme",
    category: "Reklam Yönetimi",
    author: "Cael Digital",
    content: "Dijital reklam kampanyalarında doğru hedef kitle seçiminin önemi.",
    createdAt: "09.07.2026 12:40",
    status: "Yayında",
  },
];

const emptyForm = {
  title: "",
  image: "",
  category: categories[0],
  author: "Cael Digital",
  content: "",
  status: "Taslak" as BlogStatus,
};

function getCurrentDateTime() {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch =
        selectedCategory === "Tümü" || post.category === selectedCategory;

      const searchMatch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [posts, selectedCategory, search]);

  const publishedCount = posts.filter((post) => post.status === "Yayında").length;
  const draftCount = posts.filter((post) => post.status === "Taslak").length;

  const handleAddPost = () => {
    if (!form.title.trim() || !form.content.trim()) return;

    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: form.title,
      image: form.image || "/blog-1.jpg",
      category: form.category,
      author: form.author || "Cael Digital",
      content: form.content,
      createdAt: getCurrentDateTime(),
      status: form.status,
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm(emptyForm);
    setIsAddOpen(false);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <main className="fixed inset-0 z-[9999] flex overflow-hidden bg-white font-sans text-black">
      <AdminSidebar />

      <section className="relative min-w-0 flex-1 overflow-y-auto bg-white px-10 py-9">
        <div className="mb-12">
          <h1 className="text-[42px] font-black leading-tight tracking-[-0.03em] text-black">
            Cael Digital Blog Yönetimi
          </h1>
        </div>

        <div className="mb-11 grid max-w-[760px] grid-cols-2 gap-5">
          <div className="rounded-[22px] border border-[#dfe3eb] bg-white px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Toplam Yazı
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {posts.length}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Yayınlanan ve taslak toplamı
            </span>
          </div>

          <div className="rounded-[22px] border border-[#d7e6ff] bg-[#eef5ff] px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Taslak Yazılar
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {draftCount}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Yayımlanmayı bekleyen içerikler
            </span>
          </div>
        </div>

        <section className="rounded-[28px] border border-[#e1e5ec] bg-white p-8 shadow-[0_14px_35px_rgba(15,23,42,0.07)]">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
            <h2 className="text-[30px] font-black tracking-[-0.02em]">
              Blog Yazıları Listesi
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-[58px] w-[260px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] font-medium outline-none"
              >
                <option value="Tümü">Kategori Seçin</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Yazı ara"
                className="h-[58px] w-[220px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] outline-none placeholder:text-zinc-500"
              />

              <button className="h-[58px] rounded-full bg-[#093efe] px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.25)]">
                Yazı Ara
              </button>

              <button
                onClick={() => setIsAddOpen(true)}
                className="h-[58px] rounded-full bg-black px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
              >
                Blog Ekle
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#dfe3eb] text-left">
                  <th className="w-[120px] pb-4 text-[17px] font-black">Görsel</th>
                  <th className="pb-4 text-[17px] font-black">Başlık</th>
                  <th className="pb-4 text-[17px] font-black">Kategori</th>
                  <th className="pb-4 text-[17px] font-black">Yazar</th>
                  <th className="pb-4 text-[17px] font-black">Eklenme Tarihi</th>
                  <th className="pb-4 text-[17px] font-black">Durum</th>
                  <th className="w-[120px] pb-4 text-[17px] font-black">İşlemler</th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[#e5e7eb]">
                    <td className="py-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-[58px] w-[86px] rounded-[9px] object-cover"
                      />
                    </td>

                    <td className="py-4 text-[18px] font-medium">{post.title}</td>
                    <td className="py-4 text-[18px]">{post.category}</td>
                    <td className="py-4 text-[18px]">{post.author}</td>
                    <td className="py-4 text-[18px]">{post.createdAt}</td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-4 py-2 text-[14px] font-black ${
                          post.status === "Yayında"
                            ? "bg-[#eaf1ff] text-[#093efe]"
                            : "bg-[#f4f4f5] text-zinc-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-5">
                        <button className="text-[#18325f]">
                          <EditIcon />
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-[#c0262d]"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {isAddOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[7px]">
          <div className="w-full max-w-[820px] rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[34px] font-black tracking-[-0.03em]">
                  Yeni Blog Yazısı
                </h3>
                <p className="mt-2 text-[16px] text-zinc-500">
                  Eklenme tarihi otomatik olarak kaydedilecek:{" "}
                  <span className="font-bold text-black">{getCurrentDateTime()}</span>
                </p>
              </div>

              <button
                onClick={() => setIsAddOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f3f7] text-[24px] font-black"
              >
                ×
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Başlık
                </span>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Blog başlığı"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Kapak Görseli
                </span>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/blog-1.jpg"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Kategori
                </span>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Durum
                </span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as BlogStatus })
                  }
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                >
                  <option value="Taslak">Taslak</option>
                  <option value="Yayında">Yayında</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  İçerik
                </span>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Blog yazısının içeriğini buraya gir..."
                  className="min-h-[180px] resize-none rounded-[20px] border border-[#dfe3eb] px-5 py-4 text-[16px] leading-7 outline-none focus:border-[#093efe]"
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setIsAddOpen(false)}
                className="h-[54px] rounded-full border border-[#d1d5db] bg-white px-8 text-[16px] font-black"
              >
                Vazgeç
              </button>

              <button
                onClick={handleAddPost}
                className="h-[54px] rounded-full bg-[#093efe] px-9 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(9,62,254,0.28)]"
              >
                Blogu Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EditIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5C17.33 2.67 18.67 2.67 19.5 3.5L20.5 4.5C21.33 5.33 21.33 6.67 20.5 7.5L8 20H4V16L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 11V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 11V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 7L7 21H17L18 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V4H15V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}