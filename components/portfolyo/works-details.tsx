"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type PortfolioItem = {
  id: string;
  image_url: string | null;
  brand_name: string;
  description: string;
  service: string;
  sector: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function WorksDetails() {
  const [works, setWorks] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Portfolio fetch error:", error.message);
        setLoading(false);
        return;
      }

      setWorks((data || []) as PortfolioItem[]);
      setLoading(false);
    };

    fetchWorks();
  }, []);

  return (
    <main className="min-h-screen px-4 py-20 text-[#0b0b0f] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex justify-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#093efe]" />
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

        {loading ? (
          <div className="py-20 text-center text-lg font-semibold text-zinc-500">
            Portfolyo yükleniyor...
          </div>
        ) : works.length === 0 ? (
          <div className="py-20 text-center text-lg font-semibold text-zinc-500">
            Henüz yayınlanmış portfolyo bulunmuyor.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {works.map((work) => (
              <article
                key={work.id}
                className="group rounded-[28px] border border-white bg-white p-3 shadow-[0_10px_24px_rgba(0,0,0,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-white">
                  <img
                    src={work.image_url || "/mitogustologo.png"}
                    alt={work.brand_name}
                    className="h-full w-full bg-white object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="px-4 pb-5 pt-5 sm:px-6">
                  <div className="border-t border-zinc-300 pt-6">
                    <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.8fr_0.55fr]">
                      <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl xl:text-3xl">
                        {work.brand_name}
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
                          {work.service}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase text-zinc-400">
                          Sektör
                        </p>
                        <p className="mt-1 text-sm font-medium leading-5">
                          {work.sector}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}