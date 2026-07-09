"use client";

import { useMemo, useState } from "react";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type PortfolioItem = {
  id: string;
  image: string;
  brandName: string;
  description: string;
  service: string;
  sector: string;
  createdAt: string;
};

const services = [
  "Web Site Kurulumu",
  "Sosyal Medya Yönetimi",
  "Reklam Yönetimi",
  "Grafik Tasarım",
  "Katalog Tasarımı",
];

const initialPortfolio: PortfolioItem[] = [
  {
    id: "1",
    image: "/mitogustologo.png",
    brandName: "Mito Gusto",
    description:
      "Kullanıcı dostu arayüz ve güçlü görsel dil ile markanın dijital deneyimi güçlendirildi.",
    service: "Web Site Kurulumu",
    sector: "Pasta ve Tatlı Ürünleri",
    createdAt: "09.07.2026 13:20",
  },
  {
    id: "2",
    image: "/asdemlogo.jpeg",
    brandName: "Asdem Endüstriyel Mutfak Cihazları",
    description:
      "Modern, mobil uyumlu ve kurumsal bir web sitesiyle dijital görünürlük artırıldı.",
    service: "Web Site Kurulumu",
    sector: "Endüstriyel Mutfak Cihazları",
    createdAt: "09.07.2026 13:45",
  },
];

const emptyForm = {
  image: "",
  brandName: "",
  description: "",
  service: services[0],
  sector: "",
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

export default function AdminPortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("Tümü");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter((item) => {
      const serviceMatch =
        selectedService === "Tümü" || item.service === selectedService;

      const searchMatch =
        item.brandName.toLowerCase().includes(search.toLowerCase()) ||
        item.sector.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase());

      return serviceMatch && searchMatch;
    });
  }, [portfolio, search, selectedService]);

  const handleOpenAddModal = () => {
    setEditingItemId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setForm({
      image: item.image,
      brandName: item.brandName,
      description: item.description,
      service: item.service,
      sector: item.sector,
    });
    setIsModalOpen(true);
  };

  const handleSavePortfolio = () => {
    if (!form.brandName.trim() || !form.description.trim() || !form.sector.trim()) {
      return;
    }

    if (editingItemId) {
      setPortfolio((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                image: form.image || "/mitogustologo.png",
                brandName: form.brandName,
                description: form.description,
                service: form.service,
                sector: form.sector,
              }
            : item
        )
      );
    } else {
      const newItem: PortfolioItem = {
        id: crypto.randomUUID(),
        image: form.image || "/mitogustologo.png",
        brandName: form.brandName,
        description: form.description,
        service: form.service,
        sector: form.sector,
        createdAt: getCurrentDateTime(),
      };

      setPortfolio((prev) => [newItem, ...prev]);
    }

    setForm(emptyForm);
    setEditingItemId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
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

        <div className="mb-11 grid max-w-[760px] grid-cols-2 gap-5">
          <div className="rounded-[22px] border border-[#dfe3eb] bg-white px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Toplam Proje
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {portfolio.length}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Yayında olan portfolyo işleri
            </span>
          </div>
        </div>

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
                <option value="Tümü">Hizmet Seçin</option>
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
                onClick={handleOpenAddModal}
                className="h-[58px] rounded-full bg-black px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
              >
                Portfolyo Ekle
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#dfe3eb] text-left">
                  <th className="w-[125px] pb-4 text-[17px] font-black">Görsel</th>
                  <th className="pb-4 text-[17px] font-black">Marka Adı</th>
                  <th className="pb-4 text-[17px] font-black">Açıklama</th>
                  <th className="pb-4 text-[17px] font-black">Hizmet</th>
                  <th className="pb-4 text-[17px] font-black">Sektör</th>
                  <th className="pb-4 text-[17px] font-black">Eklenme Tarihi</th>
                  <th className="w-[120px] pb-4 text-[17px] font-black">İşlemler</th>
                </tr>
              </thead>

              <tbody>
                {filteredPortfolio.map((item) => (
                  <tr key={item.id} className="border-b border-[#e5e7eb]">
                    <td className="py-4">
                      <img
                        src={item.image}
                        alt={item.brandName}
                        className="h-[64px] w-[92px] rounded-[10px] object-contain bg-white"
                      />
                    </td>

                    <td className="py-4 text-[18px] font-bold">
                      {item.brandName}
                    </td>

                    <td className="max-w-[380px] py-4 pr-8 text-[16px] leading-6 text-zinc-700">
                      {item.description}
                    </td>

                    <td className="py-4 text-[17px] font-medium">
                      {item.service}
                    </td>

                    <td className="py-4 text-[17px]">
                      {item.sector}
                    </td>

                    <td className="py-4 text-[17px]">
                      {item.createdAt}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="text-[#18325f]"
                        >
                          <EditIcon />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/35 px-5 backdrop-blur-[7px]">
          <div className="w-full max-w-[860px] rounded-[32px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-7 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-[34px] font-black tracking-[-0.03em]">
                  {editingItemId ? "Portfolyo Düzenle" : "Yeni Portfolyo Ekle"}
                </h3>
                <p className="mt-2 text-[16px] text-zinc-500">
                  Marka bilgilerini, hizmet türünü ve proje açıklamasını buradan yönet.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
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
                  value={form.brandName}
                  onChange={(e) =>
                    setForm({ ...form, brandName: e.target.value })
                  }
                  placeholder="Örn: Mito Gusto"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-black uppercase tracking-[0.18em]">
                  Görsel
                </span>
                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  placeholder="/mitogustologo.png"
                  className="h-[54px] rounded-[16px] border border-[#dfe3eb] px-5 text-[16px] outline-none focus:border-[#093efe]"
                />
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

            {form.image && (
              <div className="mt-6 rounded-[22px] border border-[#e5e7eb] bg-[#f8fafc] p-5">
                <p className="mb-3 text-[14px] font-black uppercase tracking-[0.18em]">
                  Görsel Önizleme
                </p>
                <img
                  src={form.image}
                  alt="Portfolyo önizleme"
                  className="h-[110px] max-w-[260px] rounded-[14px] bg-white object-contain"
                />
              </div>
            )}

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-[54px] rounded-full border border-[#d1d5db] bg-white px-8 text-[16px] font-black"
              >
                Vazgeç
              </button>

              <button
                onClick={handleSavePortfolio}
                className="h-[54px] rounded-full bg-[#093efe] px-9 text-[16px] font-black text-white shadow-[0_12px_24px_rgba(9,62,254,0.28)]"
              >
                {editingItemId ? "Değişiklikleri Kaydet" : "Portfolyoyu Kaydet"}
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