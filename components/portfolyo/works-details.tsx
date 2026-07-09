import Image from "next/image";

const works = [
  {
    title: "Mito Gusto",
    image: "/mitogustologo.png",
    description:
      "Kullanıcı dostu arayüz ve güçlü görsel dil ile Mitogusto’nun dijital marka deneyimi güçlendirildi.",
    deliverables: "Web Tasarım",
    industry: "Pasta ve Tatlı Ürünleri",
  },
  {
    title: "Mito Gusto",
    image: "/mitogustologo.png",
    description:
      "Markanın ürün çeşitliliğini düzenli, anlaşılır ve estetik bir yapıyla sunan katalog tasarımı hazırlandı.",
    deliverables: "Katalog Tasarımı",
    industry: "Pasta ve Tatlı Ürünleri",
  },
  {
    title: "Asdem Endüstriyel Mutfak Cihazları",
    image: "/asdemlogo.jpeg",
    description:
      "Modern, mobil uyumlu ve kurumsal bir web sitesiyle Asdem’in dijitalde daha profesyonel görünmesi sağlandı.",
    deliverables: "Web Tasarım",
    industry: "Endüstriyel Mutfak Cihazları",
  },
  {
    title: "Asdem Endüstriyel Mutfak Cihazları",
    image: "/asdemlogo.jpeg",
    description:
      "Endüstriyel mutfak ürünlerini kategorik, sade ve profesyonel bir düzenle öne çıkaran katalog tasarımı oluşturuldu.",
    deliverables: "Katalog Tasarımı",
    industry: "Endüstriyel Mutfak Cihazları",
  },
];

export default function WorksDetails() {
  return (
    <main className="min-h-screen px-4 py-20 text-[#0b0b0f] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex justify-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#093efe]"></div>
            <span className="text-[0.85rem] font-bold tracking-wide text-[#093efe]">
              İşlerimiz
            </span>
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
              key={`${work.title}-${work.deliverables}`}
              className="group rounded-[28px] border border-white bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-white">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="bg-white object-contain transition-transform duration-700 group-hover:scale-105"
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