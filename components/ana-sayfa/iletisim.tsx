"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Mail, Headset } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const initialForm = {
  full_name: "",
  phone: "",
  subject: "Web Site Talebi",
  message: "",
};

const subjects = [
  "Web Site Talebi",
  "Sosyal Medya Yönetimi",
  "Reklam Yönetimi",
  "Portfolyo Talebi",
  "Genel İletişim",
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!form.full_name.trim() || !form.phone.trim() || !form.message.trim()) {
      setErrorMessage("Lütfen isim, telefon ve mesaj alanlarını doldurun.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_forms").insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.log("Contact form error:", error.message);
      return;
    }

    setSuccessMessage("Formunuz başarıyla gönderildi. En kısa sürede dönüş yapacağız.");
    setForm(initialForm);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gray-50 py-20 md:py-32"
    >
      <img
        src="/assets/images/section/contact-image-bg.jpg"
        alt="Contact Background"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-90"
        onError={(e) => {
          const image = e.target as HTMLImageElement;
          image.style.display = "none";
          image.parentElement?.classList.add(
            "bg-gradient-to-br",
            "from-gray-200",
            "via-gray-100",
            "to-blue-100"
          );
        }}
      />

      <div className="container relative z-10 mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col lg:w-5/12">
            <div className="mb-8 inline-flex w-max items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#093efe]" />
              <span className="text-sm font-bold tracking-wide text-[#093efe]">
                İletişim Formu
              </span>
            </div>

            <h2 className="mb-12 text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Dijital Yolculuğunuzu <br /> Birlikte Planlayalım
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                  <Mail className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                    E-posta Adresimiz
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    destek@caeldigital.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
                  <Headset className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                    Telefon Numaramız
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    +90 (544) 633 43 57
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="rounded-[2.5rem] border border-white bg-white/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-12">
              <h3 className="mb-10 text-3xl font-bold tracking-tight text-gray-900">
                Lütfen Aşağıdaki Formu Doldurun
              </h3>

              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-900">
                    İsminiz
                  </label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                    placeholder="Lütfen isminizi giriniz"
                    className="w-full border-0 border-b border-gray-200 bg-transparent pb-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#093efe] focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-900">
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="Lütfen telefon numaranızı giriniz"
                    className="w-full border-0 border-b border-gray-200 bg-transparent pb-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#093efe] focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-900">
                    Konu
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full border-0 border-b border-gray-200 bg-transparent pb-3 text-gray-900 outline-none transition-colors focus:border-[#093efe] focus:ring-0"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-900">
                    Merak Ettikleriniz
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Projeniz veya talebiniz hakkında kısa bilgi verin"
                    className="w-full resize-none border-0 border-b border-gray-200 bg-transparent pb-8 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#093efe] focus:ring-0"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-bold text-[#093efe]">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-full border border-[#444] bg-gradient-to-b from-[#333333] to-[#1a1a1a] py-4 font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Gönderiliyor..." : "Formu Gönderin"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}