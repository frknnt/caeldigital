"use client";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] px-4 pb-20 pt-36 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-24 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <span className="h-2 w-2 rounded-full bg-[#093efe]" />
          <span className="text-sm font-bold tracking-wide text-[#093efe]">
            Hakkımızda
          </span>
        </div>

        <h1 className="mx-auto max-w-5xl text-[3.2rem] font-bold leading-[0.98] tracking-tight text-[#222d36] md:text-7xl lg:text-[5.8rem]">
          Markanızın dijitaldeki duruşunu güçlendiriyoruz.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
          Cael Digital; web tasarım, sosyal medya yönetimi ve reklam
          süreçlerinde markalara modern, güvenilir ve sonuç odaklı dijital
          çözümler sunar.
        </p>
      </div>
    </section>
  );
}