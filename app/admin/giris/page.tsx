"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import is avoided to prevent build-time module resolution errors in some environments
// Supabase client will be loaded dynamically at runtime

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: any = null;

const getSupabase = async () => {
  if (supabase) return supabase;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  // dynamic import to avoid static type/module resolution issues
  // @ts-ignore - some environments may not have the package types available at build time
  const mod = await import("@supabase/supabase-js");
  supabase = mod.createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
};

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const client = await getSupabase();
    if (!client) {
      setError("Supabase bağlantısı eksik. ENV bilgilerini kontrol et.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("E-posta ve şifre alanlarını doldur.");
      return;
    }

    setLoading(true);

    const { error } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
        console.log("Supabase login error:", error.message);
         setError(error.message);
         return;
    }

    router.push("/admin/blog");
  };

  return (
    <main className="fixed inset-0 z-[9999] flex overflow-hidden bg-white font-sans text-black">

      <section className="flex min-w-0 flex-1 items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-[520px]">
          <div className="mb-10 lg:hidden">
            <img
              src="/caeldigitallogo.png"
              alt="Cael Digital"
              className="h-[48px] w-auto object-contain"
            />
          </div>

          <div className="rounded-[34px] border border-[#e1e5ec] bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.10)] sm:p-10">
            <div className="mb-9">
              <p className="mb-4 text-[14px] font-black uppercase tracking-[0.28em] text-[#093efe]">
                ADMİN GİRİŞİ
              </p>

              <h2 className="text-[42px] font-black leading-tight tracking-[-0.04em]">
                Hoş geldin.
              </h2>

              <p className="mt-3 text-[17px] leading-7 text-zinc-500">
                Panele erişmek için yönetici hesabınla giriş yap.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-[14px] font-black uppercase tracking-[0.18em]">
                  E-posta
                </span>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@caeldigital.com"
                  className="h-[58px] w-full rounded-[18px] border border-[#dfe3eb] bg-white px-5 text-[17px] outline-none transition focus:border-[#093efe]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[14px] font-black uppercase tracking-[0.18em]">
                  Şifre
                </span>

                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-[58px] w-full rounded-[18px] border border-[#dfe3eb] bg-white px-5 pr-24 text-[17px] outline-none transition focus:border-[#093efe]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-black text-[#093efe]"
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </label>

              {error && (
                <div className="rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[15px] font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-3 h-[60px] w-full rounded-full bg-[#093efe] text-[18px] font-black text-white shadow-[0_14px_28px_rgba(9,62,254,0.26)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Giriş yapılıyor..." : "Panele Giriş Yap"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}