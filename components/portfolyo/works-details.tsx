import Image from "next/image";

const works = [
  {
    title: "Luna Beauty Studio",
    image: "/works/luna-beauty.jpg",
    description: "Marka kimliğiyle uyumlu web sitesi, sosyal medya içerik düzeni ve reklam dönüşüm kurgusu hazırlandı.",
    deliverables: "Web site, Meta Ads, içerik planı",
    industry: "Güzellik",
  },
  {
    title: "Nova E-Ticaret",
    image: "/works/nova-commerce.jpg",
    description: "Satış odaklı landing page, ürün kampanya yapısı ve reklam yönetimiyle dönüşüm performansı artırıldı.",
    deliverables: "Landing page, reklam yönetimi",
    industry: "E-ticaret",
  },
  {
    title: "Ares Clinic",
    image: "/works/ares-clinic.jpg",
    description: "Kurumsal algıyı güçlendiren modern site tasarımı ve randevu odaklı reklam akışı oluşturuldu.",
    deliverables: "Kurumsal site, sosyal medya",
    industry: "Sağlık",
  },
  {
    title: "Mira Cafe",
    image: "/works/mira-cafe.jpg",
    description: "Yerel görünürlüğü artıran sosyal medya yönetimi, kampanya tasarımları ve reklam setleri hazırlandı.",
    deliverables: "Sosyal medya, Meta Ads",
    industry: "Yeme içme",
  },
];

export default function WorksDetails() {
  return (
    <main className="min-h-screen px-4 py-20 text-[#0b0b0f] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-sky-500 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            İşlerimiz
          </div>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            Öne Çıkan Çalışmalar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Cael Digital olarak web site kurulumu, sosyal medya yönetimi ve
            reklam yönetimi alanlarında hazırladığımız seçili projeler.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {works.map((work, index) => (
            <article
              key={work.title}
              className="rounded-[28px] border border-white bg-[#f7f7f8] p-3 shadow-[0_10px_24px_rgba(0,0,0,0.13)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-200">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>

              <div className="px-4 pb-5 pt-5 sm:px-6">
                

                <div className="border-t border-zinc-300 pt-6">
                  <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.8fr_0.55fr]">
                    <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl xl:text-3xl">
                      {work.title}
                    </h2>

                    <div>
                      <p className="text-xs font-medium uppercase text-zinc-400">
                        Açıklama
                      </p>
                      <p className="mt-1 text-sm font-medium leading-5">
                        {work.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase text-zinc-400">
                        Hizmetler
                      </p>
                      <p className="mt-1 text-sm font-medium leading-5">
                        {work.deliverables}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase text-zinc-400">
                        Sektör
                      </p>
                      <p className="mt-1 text-sm font-medium leading-5">
                        {work.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
