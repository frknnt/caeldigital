"use client";

import { useMemo, useState } from "react";
import { AdminSidebar } from "@/app/admin/components/AdminSidebar";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

const initialMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@mail.com",
    phone: "+90 555 555 55 55",
    subject: "Web Site Talebi",
    message: "Merhaba, işletmem için web sitesi yaptırmak istiyorum.",
    date: "2026-10-15",
    read: false,
  },
  {
    id: "2",
    name: "Cael Digital (Destek)",
    email: "destek@caeldigital.com",
    phone: "+90 555 000 00 00",
    subject: "Destek Mesajı",
    message: "Form sistemi test mesajıdır.",
    date: "2026-10-14",
    read: true,
  },
  {
    id: "3",
    name: "Sercan Baki",
    email: "sercan@mail.com",
    phone: "+90 532 222 22 22",
    subject: "Reklam Yönetimi",
    message: "Meta reklam yönetimi için teklif almak istiyorum.",
    date: "2026-10-12",
    read: false,
  },
  {
    id: "4",
    name: "Özlem Toprak",
    email: "ozlem@mail.com",
    phone: "+90 536 333 33 33",
    subject: "Portfolyo Talebi",
    message: "Daha önce yaptığınız işleri görmek istiyorum.",
    date: "2026-10-10",
    read: true,
  },
];

export default function AdminContactPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  const totalMessages = messages.length;
  const unreadMessages = messages.filter((message) => !message.read).length;

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchText = `${message.name} ${message.email} ${message.phone} ${message.subject}`
        .toLowerCase()
        .trim();

      const matchesSearch =
        !search || searchText.includes(search.toLowerCase().trim());

      const matchesDate = !selectedDate || message.date === selectedDate;

      return matchesSearch && matchesDate;
    });
  }, [messages, search, selectedDate]);

  const openMessage = (message: ContactMessage) => {
    setMessages((currentMessages) =>
      currentMessages.map((item) =>
        item.id === message.id ? { ...item, read: true } : item
      )
    );

    setSelectedMessage({ ...message, read: true });
  };

  const deleteMessage = (id: string) => {
    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== id)
    );

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] flex overflow-hidden bg-white font-sans text-black">
      <AdminSidebar />

      <section className="relative min-w-0 flex-1 overflow-y-auto bg-white px-10 py-9">
        <h1 className="text-[34px] font-black leading-none tracking-[-0.04em] text-black">
          Cael Digital İletişim Formları Yönetimi
        </h1>

        <div className="mt-12 flex flex-wrap gap-6">
          <div className="min-h-[136px] w-[270px] rounded-[22px] border border-[#dfe3ea] bg-white px-6 py-5 shadow-[0_7px_18px_rgba(15,23,42,0.09)]">
            <p className="text-[14px] font-black uppercase tracking-[0.28em] text-black">
              Toplam Mesaj
            </p>
            <p className="mt-5 text-[34px] font-black leading-none text-black">
              {totalMessages}
            </p>
            <p className="mt-3 text-[15px] font-medium leading-tight text-black">
              Gelen toplam iletişim formu
            </p>
          </div>

          <div className="min-h-[136px] w-[270px] rounded-[22px] border border-[#dbe7ff] bg-[#f2f7ff] px-6 py-5 shadow-[0_7px_18px_rgba(15,23,42,0.06)]">
            <p className="text-[14px] font-black uppercase tracking-[0.28em] text-black">
              Okunmamış Mesajlar
            </p>
            <p className="mt-5 text-[34px] font-black leading-none text-black">
              {unreadMessages}
            </p>
            <p className="mt-3 text-[15px] font-medium leading-tight text-black">
              Henüz tıklanmamış formlar
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-[28px] border border-[#dfe3ea] bg-white px-7 pb-7 pt-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-[29px] font-black leading-none tracking-[-0.03em] text-black">
              Gelen Mesajlar Listesi
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="İsim, e-posta veya konu ara"
                className="h-[54px] w-[330px] rounded-full border-2 border-[#111827] bg-white px-6 text-[16px] font-medium text-black outline-none placeholder:text-zinc-500"
              />

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="h-[54px] w-[200px] rounded-full border-2 border-[#111827] bg-white px-5 text-[14px] font-medium text-black outline-none"
              />

              <button
                type="button"
                className="h-[54px] rounded-full bg-[#093efe] px-8 text-[16px] font-black text-white shadow-[0_10px_24px_rgba(9,62,254,0.22)]"
              >
                Mesaj Ara
              </button>
            </div>
          </div>

          <table className="mt-10 w-full border-collapse">
            <thead>
              <tr className="border-b border-[#dfe3ea] text-left">
                <th className="w-[150px] pb-4 pl-3 text-[17px] font-black text-black">
                  Mesaj Durumu
                </th>
                <th className="w-[230px] pb-4 text-[17px] font-black text-black">
                  Gönderen Adı
                </th>
                <th className="pb-4 text-[17px] font-black text-black">
                  Konu
                </th>
                <th className="w-[170px] pb-4 text-[17px] font-black text-black">
                  Geliş Tarihi
                </th>
                <th className="w-[140px] pb-4 pr-3 text-right text-[17px] font-black text-black">
                  İşlemler
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className="cursor-pointer border-b border-[#e5e7eb] transition hover:bg-[#f8fafc]"
                >
                  <td className="py-4 pl-3">
                    <div className="flex items-center gap-3">
                      <EyeIcon
                        className={`h-[30px] w-[30px] ${
                          message.read ? "text-[#9ca3af]" : "text-[#093efe]"
                        }`}
                      />
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          message.read
                            ? "bg-gray-100 text-gray-500"
                            : "bg-[#eef3ff] text-[#093efe]"
                        }`}
                      >
                        {message.read ? "Okundu" : "Yeni"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-[17px] font-medium text-black">
                    {message.name}
                  </td>

                  <td className="py-4 text-[17px] font-medium text-black">
                    {message.subject}
                  </td>

                  <td className="py-4 text-[17px] font-medium text-black">
                    {new Date(message.date).toLocaleDateString("tr-TR")}
                  </td>

                  <td className="py-4 pr-3">
                    <div className="flex justify-end gap-5">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openMessage(message);
                        }}
                        className="text-[#17255f] transition hover:text-[#093efe]"
                        aria-label="Mesajı aç"
                      >
                        <EyeIcon className="h-[23px] w-[23px]" />
                      </button>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteMessage(message.id);
                        }}
                        className="text-[#d21f32] transition hover:text-red-700"
                        aria-label="Sil"
                      >
                        <TrashIcon className="h-[22px] w-[22px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>

      {selectedMessage && (
        <aside className="w-[390px] shrink-0 border-l border-[#e5e7eb] bg-[#f6f7fb] p-6">
          <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#093efe]">
                  Mesaj Detayı
                </p>
                <h3 className="mt-3 text-2xl font-black text-black">
                  {selectedMessage.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-black text-black"
              >
                Kapat
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm font-medium text-gray-600">
              <p>
                <span className="font-black text-black">E-posta:</span>{" "}
                {selectedMessage.email}
              </p>
              <p>
                <span className="font-black text-black">Telefon:</span>{" "}
                {selectedMessage.phone}
              </p>
              <p>
                <span className="font-black text-black">Konu:</span>{" "}
                {selectedMessage.subject}
              </p>
              <p>
                <span className="font-black text-black">Tarih:</span>{" "}
                {new Date(selectedMessage.date).toLocaleDateString("tr-TR")}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f8fafc] p-5">
              <p className="text-sm font-bold leading-6 text-black">
                {selectedMessage.message}
              </p>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5h18v14H3V5Zm9 8.2 7-5.2V7l-7 5-7-5v1l7 5.2Z" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" />
      <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 16h10l1-16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}