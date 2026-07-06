"use client";

const stats = [
  {
    value: "12+",
    label: "Tamamlanan Proje",
    desc: "Web tasarım, sosyal medya ve reklam yönetimi çalışmaları.",
  },
  {
    value: "%100",
    label: "Markaya Özel Çözümler",
    desc: "Her markanın ihtiyacına göre şekillenen özgün dijital stratejiler..",
  },
];

export default function WorksHero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fa] px-4 pb-16 pt-36 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <span className="h-2 w-2 rounded-full bg-[#093efe]" />
            <span className="text-sm font-bold tracking-wide text-[#093efe]">
              İşlerimiz
            </span>
          </div>

          <h1 className="max-w-4xl text-[3.2rem] font-bold leading-[0.98] tracking-tight text-[#18212b] md:text-7xl lg:text-[6.2rem]">
            Markaları dijitalde daha net görünür kılan işler.
          </h1>

          <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
            Hizmetlerimizi markanızın hedeflerine göre planlıyor; dijitalde daha görünür, güvenilir ve tercih edilen bir marka olmanızı sağlıyoruz.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`rounded-[2rem] border p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${
                index === 1
                  ? "border-[#093efe] bg-[#093efe] text-white"
                  : "border-white bg-white/85 text-[#18212b]"
              }`}
            >
              <p
                className={`text-5xl font-bold ${
                  index === 1 ? "text-white" : "text-[#093efe]"
                }`}
              >
                {stat.value}
              </p>

              <h2 className="mt-4 text-xl font-bold leading-tight">
                {stat.label}
              </h2>

              <p
                className={`mt-3 text-sm font-medium leading-relaxed ${
                  index === 1 ? "text-white/75" : "text-gray-500"
                }`}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}