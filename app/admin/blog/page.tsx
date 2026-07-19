"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type BlogStatus = "draft" | "published";

type Blog = {
  id: string;
  title: string;
  slug: string;
  cover_image_url: string | null;
  category: string;
  content: string;
  author: string;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  seo_keywords: string | null;
  focus_keyword: string | null;
  image_alt: string | null;
};

const categories = [
  "Yazılım",
  "Pazarlama",
  "Sosyal Medya",
  "Web Tasarım",
  "Reklam Yönetimi",
];

const emptyForm = {
  title: "",
  slug: "",
  cover_image_url: "",
  category: categories[0],
  content: "",
  status: "draft" as BlogStatus,
  meta_title: "",
  meta_description: "",
  seo_keywords: "",
  focus_keyword: "",
  image_alt: "",
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

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
  const router = useRouter();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryMatch =
        selectedCategory === "Tümü" || blog.category === selectedCategory;

      const searchMatch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [blogs, selectedCategory, search]);

  const draftCount = blogs.filter((blog) => blog.status === "draft").length;

  const fetchBlogs = async () => {
    setLoading(true);
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/admin/giris");
      return;
    }

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setBlogs((data || []) as Blog[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createUniqueSlug = async (title: string) => {
    const baseSlug = createSlug(title) || "blog-yazisi";

    const { data } = await supabase
      .from("blogs")
      .select("slug")
      .ilike("slug", `${baseSlug}%`);

    const existingSlugs = (data || []).map((item) => item.slug);

    if (!existingSlugs.includes(baseSlug)) {
      return baseSlug;
    }

    let counter = 2;
    let nextSlug = `${baseSlug}-${counter}`;

    while (existingSlugs.includes(nextSlug)) {
      counter += 1;
      nextSlug = `${baseSlug}-${counter}`;
    }

    return nextSlug;
  };

  const uploadBlogImage = async () => {
    if (!coverImageFile) {
      return form.cover_image_url.trim() || null;
    }

    const fileExt = coverImageFile.name.split(".").pop() || "jpg";
    const fileName = `${createSlug(form.title)}-${Date.now()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, coverImageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Lütfen geçerli bir görsel seç.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Görsel boyutu en fazla 5MB olabilir.");
      return;
    }

    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const clearCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview("");
    setForm({ ...form, cover_image_url: "" });
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setCoverImageFile(null);
    setCoverImagePreview("");
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      slug: blog.slug,
      cover_image_url: blog.cover_image_url || "",
      category: blog.category,
      content: blog.content,
      status: blog.status,
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      seo_keywords: blog.seo_keywords || "",
      focus_keyword: blog.focus_keyword || "",
      image_alt: blog.image_alt || "",
    });
    setCoverImageFile(null);
    setCoverImagePreview("");
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setForm(emptyForm);
    setCoverImageFile(null);
    setCoverImagePreview("");
  };

  const handleSaveBlog = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setErrorMessage("Başlık ve içerik alanları zorunlu.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    let coverImageUrl: string | null = null;

    try {
      coverImageUrl = await uploadBlogImage();
    } catch (error) {
      setSaving(false);
      setErrorMessage("Görsel yüklenirken hata oluştu.");
      return;
    }

    const publishedAt =
      form.status === "published"
        ? editingBlog?.published_at || new Date().toISOString()
        : null;

    const seoPayload = {
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      seo_keywords: form.seo_keywords.trim() || null,
      focus_keyword: form.focus_keyword.trim() || null,
      image_alt: form.image_alt.trim() || null,
    };

    if (editingBlog) {
      const { data, error } = await supabase
        .from("blogs")
        .update({
          title: form.title.trim(),
          slug: createSlug(form.slug || form.title) || editingBlog.slug,
          cover_image_url: coverImageUrl,
          category: form.category,
          content: form.content.trim(),
          status: form.status,
          published_at: publishedAt,
          ...seoPayload,
        })
        .eq("id", editingBlog.id)
        .select()
        .single();

      setSaving(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setBlogs((prev) =>
        prev.map((blog) => (blog.id === editingBlog.id ? (data as Blog) : blog))
      );

      closeModal();
      return;
    }

    const slug = await createUniqueSlug(form.slug || form.title);

    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title: form.title.trim(),
        slug,
        cover_image_url: coverImageUrl,
        category: form.category,
        content: form.content.trim(),
        author: "Cael Digital",
        status: form.status,
        published_at: publishedAt,
        ...seoPayload,
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setBlogs((prev) => [data as Blog, ...prev]);
    closeModal();
  };

  const handleDeleteBlog = async (id: string) => {
    const confirmed = window.confirm("Bu blog yazısını silmek istiyor musun?");
    if (!confirmed) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
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
              {blogs.length}
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

        {errorMessage && (
          <div className="mb-6 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[15px] font-bold text-red-600">
            {errorMessage}
          </div>
        )}

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

              <button
                onClick={openAddModal}
                className="h-[58px] rounded-full bg-[#093efe] px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.25)]"
              >
                Blog Ekle
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-[18px] font-bold text-zinc-500">
              Bloglar yükleniyor...
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#dfe3eb] text-left">
                    <th className="w-[120px] pb-4 text-[17px] font-black">
                      Görsel
                    </th>
                    <th className="pb-4 text-[17px] font-black">Başlık</th>
                    <th className="pb-4 text-[17px] font-black">Kategori</th>
                    <th className="pb-4 text-[17px] font-black">Yazar</th>
                    <th className="pb-4 text-[17px] font-black">
                      Eklenme Tarihi
                    </th>
                    <th className="pb-4 text-[17px] font-black">Durum</th>
                    <th className="w-[120px] pb-4 text-[17px] font-black">
                      İşlemler
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-[#e5e7eb]">
                      <td className="py-4">
                        <img
                          src={blog.cover_image_url || "/blog-1.jpg"}
                          alt={blog.title}
                          className="h-[58px] w-[86px] rounded-[9px] object-cover"
                        />
                      </td>

                      <td className="py-4 text-[18px] font-medium">
                        {blog.title}
                      </td>
                      <td className="py-4 text-[18px]">{blog.category}</td>
                      <td className="py-4 text-[18px]">{blog.author}</td>
                      <td className="py-4 text-[18px]">
                        {formatDate(blog.created_at)}
                      </td>

                      <td className="py-4">
                        <span
                          className={`rounded-full px-4 py-2 text-[14px] font-black ${
                            blog.status === "published"
                              ? "bg-[#eaf1ff] text-[#093efe]"
                              : "bg-[#f4f4f5] text-zinc-600"
                          }`}
                        >
                          {blog.status === "published" ? "Yayında" : "Taslak"}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => openEditModal(blog)}
                            className="text-[#18325f]"
                          >
                            <EditIcon />
                          </button>

                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-[#c0262d]"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredBlogs.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center text-[18px] font-bold text-zinc-500"
                      >
                        Blog bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[7px]">
          <div className="w-full max-w-[1020px] rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[34px] font-black tracking-[-0.03em]">
                  {editingBlog ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı"}
                </h3>
                <p className="mt-2 text-[16px] text-zinc-500">
                  Eklenme tarihi otomatik olarak kaydedilecek:{" "}
                  <span className="font-bold text-black">
                    {editingBlog
                      ? formatDate(editingBlog.created_at)
                      : getCurrentDateTime()}
                  </span>
                </p>
              </div>

              <button
                onClick={closeModal}
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
                  URL Slug
                </span>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: createSlug(e.target.value) })
                  }
                  placeholder="profesyonel-web-tasarim"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
                <span className="text-xs font-bold text-zinc-400">
                  Boş bırakırsan başlıktan otomatik oluşturulur.
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Kapak Görseli
                </span>

                <div className="flex min-h-[150px] items-center gap-5 rounded-[20px] border border-[#dfe3eb] bg-white p-4">
                  <div className="flex h-[118px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#f3f4f6]">
                    {coverImagePreview || form.cover_image_url ? (
                      <img
                        src={coverImagePreview || form.cover_image_url}
                        alt="Kapak görseli"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="px-4 text-center text-sm font-bold text-zinc-400">
                        Görsel seçilmedi
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <input
                      id="blog-cover-image"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="blog-cover-image"
                      className="w-max cursor-pointer rounded-full bg-[#093efe] px-6 py-3 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.22)]"
                    >
                      Görsel Seç
                    </label>

                    <p className="text-sm font-medium text-zinc-500">
                      JPG, PNG veya WEBP yükleyebilirsin. Maksimum 5MB.
                    </p>

                    {(coverImagePreview || form.cover_image_url) && (
                      <button
                        type="button"
                        onClick={clearCoverImage}
                        className="w-max text-sm font-black text-red-500"
                      >
                        Görseli Kaldır
                      </button>
                    )}
                  </div>
                </div>
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
                  <option value="draft">Taslak</option>
                  <option value="published">Yayında</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Meta Başlık
                </span>
                <input
                  value={form.meta_title}
                  onChange={(e) =>
                    setForm({ ...form, meta_title: e.target.value })
                  }
                  placeholder="Google'da görünecek başlık"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Odak Anahtar Kelime
                </span>
                <input
                  value={form.focus_keyword}
                  onChange={(e) =>
                    setForm({ ...form, focus_keyword: e.target.value })
                  }
                  placeholder="web tasarım"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Meta Açıklama
                </span>
                <textarea
                  value={form.meta_description}
                  onChange={(e) =>
                    setForm({ ...form, meta_description: e.target.value })
                  }
                  placeholder="Google sonuçlarında görünecek kısa açıklama"
                  className="min-h-[96px] resize-none rounded-[18px] border border-[#dfe3eb] px-5 py-4 text-[16px] leading-7 outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  SEO Anahtar Kelimeler
                </span>
                <input
                  value={form.seo_keywords}
                  onChange={(e) =>
                    setForm({ ...form, seo_keywords: e.target.value })
                  }
                  placeholder="web tasarım, dijital ajans, seo"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Görsel Alt Metni
                </span>
                <input
                  value={form.image_alt}
                  onChange={(e) =>
                    setForm({ ...form, image_alt: e.target.value })
                  }
                  placeholder="Blog kapak görseli açıklaması"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  İçerik
                </span>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Blog yazısının içeriğini buraya gir..."
                  className="min-h-[220px] resize-none rounded-[20px] border border-[#dfe3eb] px-5 py-4 text-[16px] leading-7 outline-none focus:border-[#093efe]"
                />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="h-[54px] rounded-full border border-[#d1d5db] bg-white px-8 text-[16px] font-black"
              >
                Vazgeç
              </button>

              <button
                onClick={handleSaveBlog}
                disabled={saving}
                className="h-[54px] rounded-full bg-[#093efe] px-9 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(9,62,254,0.28)] disabled:opacity-60"
              >
                {saving
                  ? "Kaydediliyor..."
                  : editingBlog
                    ? "Değişiklikleri Kaydet"
                    : "Blogu Kaydet"}
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
