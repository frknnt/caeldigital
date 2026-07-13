"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type PortfolioItem = {
  id: string;
  image_url: string | null;
  brand_name: string;
  description: string;
  service: string;
  sector: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const services = [
  "Web Site Kurulumu",
  "Sosyal Medya Yönetimi",
  "Reklam Yönetimi",
  "Grafik Tasarım",
  "Katalog Tasarımı",
];

const emptyForm = {
  image_url: "",
  brand_name: "",
  description: "",
  service: services[0],
  sector: "",
  is_published: true,
  sort_order: 0,
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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

export default function AdminPortfolioPage() {
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("Tümü");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(null);
  const [portfolioImagePreview, setPortfolioImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const publishedCount = portfolio.filter((item) => item.is_published).length;

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((item) => {
      const serviceMatch =
        selectedService === "Tümü" || item.service === selectedService;

      const searchMatch =
        item.brand_name.toLowerCase().includes(search.toLowerCase()) ||
        item.sector.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase());

      return serviceMatch && searchMatch;
    });
  }, [portfolio, search, selectedService]);

  const fetchPortfolio = async () => {
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
      .from("portfolios")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setPortfolio((data || []) as PortfolioItem[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const uploadPortfolioImage = async () => {
    if (!portfolioImageFile) {
      return form.image_url.trim() || null;
    }

    const fileExt = portfolioImageFile.name.split(".").pop() || "jpg";
    const fileName = `${createSlug(form.brand_name)}-${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, portfolioImageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handlePortfolioImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    setPortfolioImageFile(file);
    setPortfolioImagePreview(URL.createObjectURL(file));
  };

  const clearPortfolioImage = () => {
    setPortfolioImageFile(null);
    setPortfolioImagePreview("");
    setForm({ ...form, image_url: "" });
  };

  const openAddModal = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setPortfolioImageFile(null);
    setPortfolioImagePreview("");
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setForm({
      image_url: item.image_url || "",
      brand_name: item.brand_name,
      description: item.description,
      service: item.service,
      sector: item.sector,
      is_published: item.is_published,
      sort_order: item.sort_order || 0,
    });
    setPortfolioImageFile(null);
    setPortfolioImagePreview("");
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setForm(emptyForm);
    setPortfolioImageFile(null);
    setPortfolioImagePreview("");
  };

  const handleSavePortfolio = async () => {
    if (
      !form.brand_name.trim() ||
      !form.description.trim() ||
      !form.service.trim() ||
      !form.sector.trim()
    ) {
      setErrorMessage("Marka adı, açıklama, hizmet ve sektör alanları zorunlu.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    let imageUrl: string | null = null;

    try {
      imageUrl = await uploadPortfolioImage();
    } catch (error) {
      setSaving(false);
      setErrorMessage("Görsel yüklenirken hata oluştu.");
      return;
    }

    const payload = {
      image_url: imageUrl,
      brand_name: form.brand_name.trim(),
      description: form.description.trim(),
      service: form.service,
      sector: form.sector.trim(),
      is_published: form.is_published,
      sort_order: Number(form.sort_order) || 0,
    };

    if (editingItem) {
      const { data, error } = await supabase
        .from("portfolios")
        .update(payload)
        .eq("id", editingItem.id)
        .select()
        .single();

      setSaving(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setPortfolio((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? (data as PortfolioItem) : item
        )
      );

      closeModal();
      return;
    }

    const { data, error } = await supabase
      .from("portfolios")
      .insert(payload)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setPortfolio((prev) => [data as PortfolioItem, ...prev]);
    closeModal();
  };

  const handleDeletePortfolio = async (id: string) => {
    const confirmed = window.confirm("Bu portfolyo işini silmek istiyor musun?");
    if (!confirmed) return;

    const { error } = await supabase.from("portfolios").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setPortfolio((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="fixed inset-0 z-[9999] flex overflow-hidden bg-white font-sans text-black">
      <AdminSidebar />

      <section className="relative min-w-0 flex-1 overflow-y-auto bg-white px-10 py-9">
        <div className="mb-12">
          <h1 className="text-[42px] font-black leading-tight tracking-[-0.03em] text-black">
            Cael Digital Portfolyo Yönetimi
          </h1>
        </div>

        <div className="mb-11 grid max-w-[860px] grid-cols-2 gap-5">
          <div className="rounded-[22px] border border-[#dfe3eb] bg-white px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Toplam Proje
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {portfolio.length}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Sisteme eklenen toplam portfolyo işi
            </span>
          </div>

          <div className="rounded-[22px] border border-[#d7e6ff] bg-[#eef5ff] px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Yayındaki Proje
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {publishedCount}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Web sitesinde görüntülenen işler
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
              Portfolyo Listesi
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="h-[58px] w-[260px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] font-medium outline-none"
              >
                <option value="Tümü">Tümü</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Marka ara"
                className="h-[58px] w-[220px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] outline-none placeholder:text-zinc-500"
              />

              <button className="h-[58px] rounded-full bg-[#093efe] px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.25)]">
                Proje Ara
              </button>

              <button
                onClick={openAddModal}
                className="h-[58px] rounded-full bg-black px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
              >
                Portfolyo Ekle
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-[18px] font-bold text-zinc-500">
              Portfolyo yükleniyor...
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#dfe3eb] text-left">
                    <th className="w-[130px] pb-4 text-[17px] font-black">
                      Görsel
                    </th>
                    <th className="pb-4 text-[17px] font-black">Marka Adı</th>
                    <th className="pb-4 text-[17px] font-black">Açıklama</th>
                    <th className="pb-4 text-[17px] font-black">Hizmet</th>
                    <th className="pb-4 text-[17px] font-black">Sektör</th>
                    <th className="pb-4 text-[17px] font-black">Durum</th>
                    <th className="pb-4 text-[17px] font-black">
                      Eklenme Tarihi
                    </th>
                    <th className="w-[120px] pb-4 text-[17px] font-black">
                      İşlemler
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPortfolio.map((item) => (
                    <tr key={item.id} className="border-b border-[#e5e7eb]">
                      <td className="py-5">
                        <img
                          src={item.image_url || "/mitogustologo.png"}
                          alt={item.brand_name}
                          className="h-[64px] w-[92px] rounded-[10px] bg-white object-contain"
                        />
                      </td>

                      <td className="max-w-[220px] py-5 text-[18px] font-black">
                        {item.brand_name}
                      </td>

                      <td className="max-w-[360px] py-5 pr-8 text-[16px] leading-7 text-slate-700">
                        {item.description}
                      </td>

                      <td className="py-5 text-[17px] font-medium">
                        {item.service}
                      </td>

                      <td className="py-5 text-[17px]">{item.sector}</td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-4 py-2 text-[14px] font-black ${
                            item.is_published
                              ? "bg-[#eaf1ff] text-[#093efe]"
                              : "bg-[#f4f4f5] text-zinc-600"
                          }`}
                        >
                          {item.is_published ? "Yayında" : "Pasif"}
                        </span>
                      </td>

                      <td className="py-5 text-[17px]">
                        {formatDate(item.created_at)}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-[#18325f]"
                          >
                            <EditIcon />
                          </button>

                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="text-[#c0262d]"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredPortfolio.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-16 text-center text-[18px] font-bold text-zinc-500"
                      >
                        Portfolyo bulunamadı.
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
          <div className="w-full max-w-[960px] rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[34px] font-black tracking-[-0.03em]">
                  {editingItem ? "Portfolyo Düzenle" : "Yeni Portfolyo Ekle"}
                </h3>
                <p className="mt-2 text-[16px] text-zinc-500">
                  Marka görseli, açıklama, hizmet ve sektör bilgilerini buradan yönet.
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
                  Marka Adı
                </span>
                <input
                  value={form.brand_name}
                  onChange={(e) =>
                    setForm({ ...form, brand_name: e.target.value })
                  }
                  placeholder="Örn: Mito Gusto"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Görsel
                </span>

                <div className="flex min-h-[150px] items-center gap-5 rounded-[20px] border border-[#dfe3eb] bg-white p-4">
                  <div className="flex h-[118px] w-[170px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#f3f4f6]">
                    {portfolioImagePreview || form.image_url ? (
                      <img
                        src={portfolioImagePreview || form.image_url}
                        alt="Portfolyo görseli"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="px-4 text-center text-sm font-bold text-zinc-400">
                        Görsel seçilmedi
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <input
                      id="portfolio-image"
                      type="file"
                      accept="image/*"
                      onChange={handlePortfolioImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="portfolio-image"
                      className="w-max cursor-pointer rounded-full bg-[#093efe] px-6 py-3 text-[15px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.22)]"
                    >
                      Görsel Seç
                    </label>

                    <p className="text-sm font-medium text-zinc-500">
                      JPG, PNG veya WEBP yükleyebilirsin. Maksimum 5MB.
                    </p>

                    {(portfolioImagePreview || form.image_url) && (
                      <button
                        type="button"
                        onClick={clearPortfolioImage}
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
                  Verilen Hizmet
                </span>
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Sektör
                </span>
                <input
                  value={form.sector}
                  onChange={(e) =>
                    setForm({ ...form, sector: e.target.value })
                  }
                  placeholder="Örn: Pasta ve Tatlı Ürünleri"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Yayın Durumu
                </span>
                <select
                  value={form.is_published ? "published" : "passive"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_published: e.target.value === "published",
                    })
                  }
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                >
                  <option value="published">Yayında</option>
                  <option value="passive">Pasif</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Sıralama
                </span>
                <input
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: Number(e.target.value) })
                  }
                  type="number"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Açıklama
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Proje açıklamasını buraya gir..."
                  className="min-h-[170px] resize-none rounded-[20px] border border-[#dfe3eb] px-5 py-4 text-[16px] leading-7 outline-none focus:border-[#093efe]"
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
                onClick={handleSavePortfolio}
                disabled={saving}
                className="h-[54px] rounded-full bg-[#093efe] px-9 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(9,62,254,0.28)] disabled:opacity-60"
              >
                {saving
                  ? "Kaydediliyor..."
                  : editingItem
                    ? "Değişiklikleri Kaydet"
                    : "Portfolyoyu Kaydet"}
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