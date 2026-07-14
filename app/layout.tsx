import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://caeldigital.com"),
  title: {
    default: "Cael Digital | Web Tasarım, Sosyal Medya ve Reklam Yönetimi",
    template: "%s | Cael Digital",
  },
  description:
    "Cael Digital; web site kurulumu, sosyal medya yönetimi ve reklam yönetimi hizmetleriyle markanızı dijitalde görünür kılan dijital ajanstır.",
  keywords: [
    "Cael Digital",
    "web tasarım",
    "web site kurulumu",
    "sosyal medya yönetimi",
    "reklam yönetimi",
    "dijital ajans",
  ],
  authors: [{ name: "Cael Digital" }],
  creator: "Cael Digital",
  publisher: "Cael Digital",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://caeldigital.com",
    siteName: "Cael Digital",
    title: "Cael Digital | Dijital Ajans",
    description:
      "Web site kurulumu, sosyal medya yönetimi ve reklam yönetimi hizmetleriyle markanızı dijitalde büyütüyoruz.",
    images: [
      {
        url: "/caeldigitallogo.png",
        width: 1200,
        height: 630,
        alt: "Cael Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cael Digital | Dijital Ajans",
    description:
      "Web site kurulumu, sosyal medya yönetimi ve reklam yönetimi hizmetleri.",
    images: ["/caeldigitallogo.png"],
  },
  icons: {
    icon: "/caelfavicon.png",
    apple: "/caelfavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}