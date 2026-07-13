"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type ContactForm = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  read_at: string | null;
  opened_count: number;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function formatDate(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getDateInputValue(date: string) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminContactFormsPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactForm[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactForm | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const unreadCount = messages.filter((message) => !message.is_read).length;

  const filteredMessages = useMemo(() => {
    return messages.filter((item) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        item.full_name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        (item.subject || "").toLowerCase().includes(searchText);

      const dateMatch =
        !selectedDate || getDateInputValue(item.created_at) === selectedDate;

      return searchMatch && dateMatch;
    });
  }, [messages, search, selectedDate]);

  const fetchMessages = async () => {
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
      .from("contact_forms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setMessages((data || []) as ContactForm[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessageDetail = async (message: ContactForm) => {
    setSelectedMessage(message);

    const nextOpenedCount = (message.opened_count || 0) + 1;

    const { data, error } = await supabase
      .from("contact_forms")
      .update({
        is_read: true,
        read_at: message.read_at || new Date().toISOString(),
        opened_count: nextOpenedCount,
      })
      .eq("id", message.id)
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const updatedMessage = data as ContactForm;

    setMessages((prev) =>
      prev.map((item) => (item.id === message.id ? updatedMessage : item))
    );

    setSelectedMessage(updatedMessage);
  };

  const handleDeleteMessage = async (id: string) => {
    const confirmed = window.confirm("Bu mesajı silmek istiyor musun?");
    if (!confirmed) return;

    const { error } = await supabase.from("contact_forms").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessages((prev) => prev.filter((item) => item.id !== id));

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] flex overflow-hidden bg-white font-sans text-black">
      <AdminSidebar />

      <section className="relative min-w-0 flex-1 overflow-y-auto bg-white px-10 py-9">
        <div className="mb-12">
          <h1 className="text-[42px] font-black leading-tight tracking-[-0.03em] text-black">
            Cael Digital İletişim Formları Yönetimi
          </h1>
        </div>

        <div className="mb-11 grid max-w-[860px] grid-cols-2 gap-5">
          <div className="rounded-[22px] border border-[#dfe3eb] bg-white px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Toplam Mesaj
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {messages.length}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Gelen ve okunan toplam mesaj
            </span>
          </div>

          <div className="rounded-[22px] border border-[#d7e6ff] bg-[#eef5ff] px-8 py-7 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <p className="mb-5 text-[15px] font-black uppercase tracking-[0.32em]">
              Okunmamış Mesajlar
            </p>
            <strong className="block text-[42px] font-black leading-none">
              {unreadCount}
            </strong>
            <span className="mt-4 block text-[18px] text-black">
              Cevaplanmayı bekleyen mesajlar
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
              Gelen Mesajlar Listesi
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="İsim, e-posta veya konu ara"
                className="h-[58px] w-[360px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] outline-none placeholder:text-zinc-500"
              />

              <input
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                type="date"
                className="h-[58px] w-[230px] rounded-full border-2 border-[#111827] bg-white px-6 text-[17px] outline-none"
              />

              <button className="h-[58px] rounded-full bg-[#093efe] px-9 text-[17px] font-black text-white shadow-[0_10px_20px_rgba(9,62,254,0.25)]">
                Mesaj Ara
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-[18px] font-bold text-zinc-500">
              Mesajlar yükleniyor...
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#dfe3eb] text-left">
                    <th className="w-[170px] pb-4 text-[17px] font-black">
                      Mesaj Durumu
                    </th>
                    <th className="pb-4 text-[17px] font-black">Gönderen Adı</th>
                    <th className="pb-4 text-[17px] font-black">Konu</th>
                    <th className="pb-4 text-[17px] font-black">Geliş Tarihi</th>
                    <th className="w-[140px] pb-4 text-[17px] font-black">
                      İşlemler
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b border-[#e5e7eb] transition hover:bg-[#f8fafc]"
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <EnvelopeIcon
                            className={
                              message.is_read ? "text-[#9ca3af]" : "text-[#093efe]"
                            }
                          />

                          <span
                            className={`rounded-full px-4 py-2 text-[14px] font-black ${
                              message.is_read
                                ? "bg-[#f1f3f7] text-zinc-500"
                                : "bg-[#eaf1ff] text-[#093efe]"
                            }`}
                          >
                            {message.is_read ? "Okundu" : "Yeni"}
                          </span>
                        </div>
                      </td>

                      <td className="py-5 text-[18px] font-medium">
                        {message.full_name}
                      </td>

                      <td className="py-5 text-[18px]">
                        {message.subject || "Konu belirtilmedi"}
                      </td>

                      <td className="py-5 text-[18px]">
                        {formatDate(message.created_at)}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => openMessageDetail(message)}
                            className="text-[#18325f]"
                            title="Mesajı görüntüle"
                          >
                            <EnvelopeIcon className="text-[#18325f]" />
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-[#c0262d]"
                            title="Mesajı sil"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredMessages.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-16 text-center text-[18px] font-bold text-zinc-500"
                      >
                        Mesaj bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      {selectedMessage && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 px-5 backdrop-blur-[7px]">
          <div className="w-full max-w-[520px] rounded-[28px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <p className="mb-4 text-[15px] font-black uppercase tracking-[0.32em] text-[#093efe]">
                  Mesaj Detayı
                </p>

                <h3 className="text-[30px] font-black tracking-[-0.03em]">
                  {selectedMessage.full_name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-full bg-[#f1f3f7] px-5 py-2 text-[16px] font-black"
              >
                Kapat
              </button>
            </div>

            <div className="space-y-4 text-[18px]">
              <p>
                <strong>E-posta:</strong>{" "}
                <span className="text-slate-700">{selectedMessage.email}</span>
              </p>

              <p>
                <strong>Telefon:</strong>{" "}
                <span className="text-slate-700">
                  {selectedMessage.phone || "-"}
                </span>
              </p>

              <p>
                <strong>Konu:</strong>{" "}
                <span className="text-slate-700">
                  {selectedMessage.subject || "Konu belirtilmedi"}
                </span>
              </p>

              <p>
                <strong>Tarih:</strong>{" "}
                <span className="text-slate-700">
                  {formatDate(selectedMessage.created_at)}
                </span>
              </p>

              <p>
                <strong>Açılma:</strong>{" "}
                <span className="text-slate-700">
                  {selectedMessage.opened_count} kez görüntülendi
                </span>
              </p>

              <p>
                <strong>Okunma:</strong>{" "}
                <span className="text-slate-700">
                  {formatDateTime(selectedMessage.read_at)}
                </span>
              </p>
            </div>

            <div className="mt-7 rounded-[22px] bg-[#f8fafc] px-6 py-6 text-[18px] font-bold leading-8">
              {selectedMessage.message}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-[28px] w-[28px] ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.3-.5 6.7 5.1L18.7 5H5.3Zm13.7 2.2-6.4 4.9a1 1 0 0 1-1.2 0L5 7.2v11.3c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V7.2Z" />
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