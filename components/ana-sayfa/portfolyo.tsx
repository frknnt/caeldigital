"use client";

// Örnek projeler
const works = [
  {
    title: "Mito Gusto",
    image: "/mitogustologo.png",
    description:
      "Kullanıcı dostu arayüz ve güçlü görsel dil ile Mitogusto’nun dijital marka deneyimi güçlendirildi.",
    deliverables: "Web Site Kurulumu, Grafik Tasarım",
    industry: "Pasta ve Tatlı Ürünleri",
  },
  {
    title: "Asdem Endüstriyel Mutfak Cihazları",
    image: "/asdemlogo.jpeg",
    description:
      "Modern, mobil uyumlu ve kurumsal bir web sitesiyle Asdem’in dijitalde daha profesyonel görünmesi sağlandı.",
    deliverables: "Web Site Kurulumu, Grafik Tasarım",
    industry: "Endüstriyel Mutfak Cihazları",
  },
];

export default function FeaturedWorks() {
  return (
    <section id="works" className="bg-white py-20 md:py-32">
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#093efe]"></div>
            <span className="text-sm font-bold tracking-wide text-[#093efe]">
              Portfolyo
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          {works.map((work, index) => (
            <div
              key={index}
              className="group flex cursor-pointer flex-col rounded-[2.5rem] border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-6"
            >
              <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-[2rem] md:aspect-[4/3]">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f3f4f6"/></svg>';
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col px-2 md:px-4">
                <div className="mb-8 h-px w-full bg-gray-100"></div>

                <div className="flex flex-col items-start gap-8 xl:flex-row xl:gap-6">
                  <h3 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl xl:w-1/3">
                    {work.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:w-2/3">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Açıklama
                      </p>
                      <p className="text-sm font-semibold leading-snug text-gray-800">
                        {work.description}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Yapılanlar
                      </p>
                      <p className="text-sm font-semibold leading-snug text-gray-800">
                        {work.deliverables}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Sektör
                      </p>
                      <p className="text-sm font-semibold leading-snug text-gray-800">
                        {work.industry}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}