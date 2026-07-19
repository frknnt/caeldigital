import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

type BlogSitemapRow = {
  slug: string;
  updated_at: string | null;
  published_at: string | null;
  created_at: string | null;
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://caeldigital.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolyo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return staticRoutes;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data } = await supabase
    .from("blogs")
    .select("slug, updated_at, published_at, created_at")
    .eq("status", "published");

  const blogRoutes: MetadataRoute.Sitemap = ((data || []) as BlogSitemapRow[])
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updated_at || blog.published_at || blog.created_at || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}
