"use client";

import Link from "next/link";
import {
  FaEnvelope,
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";

const footerLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetlerimiz" },
  { label: "İşlerimiz", href: "/islerimiz" },
  { label: "İletişim", href: "/iletisim" },
];

const socialLinks = [
    {
    label: "Instagram",
    href: "https://instagram.com/caeldigitalcom",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },

];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#eeeeef] px-5 pb-8 pt-24 text-[#08080c] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap text-[23vw] font-black leading-none tracking-normal text-blue-500 text-zinc-200/60">
          CAEL
        </span>
      </div>

      <section className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <div className="flex h-[72px] w-[150px] items-center justify-center rounded-[22px] border border-white/80 bg-white px-6 shadow-[0_6px_0_rgba(0,0,0,0.04),0_18px_28px_rgba(0,0,0,0.10)]">
          <img
            src="/caeldigitallogok.png"
            alt="Cael Digital Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <h2 className="mt-10 max-w-xl text-[30px] font-semibold leading-tight tracking-normal sm:text-[34px]">
          Cael Digital ile sosyal medyada bağlantıda kal
        </h2>

        <p className="mt-5 text-[18px] font-medium text-zinc-700">
          Yeni içeriklerimizi ve dijital pazarlama ipuçlarını kaçırma.
        </p>

        <div className="mt-14 flex w-full max-w-[900px] flex-wrap justify-center gap-4">
  {socialLinks.map((item) => {
    const Icon = item.icon;

          return (
           <Link
             key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
             className="group flex h-[58px] w-[190px] items-center justify-center gap-3 rounded-[18px] border border-white/80 bg-[#f5f5f6] text-[16px] font-semibold shadow-[0_4px_0_rgba(0,0,0,0.04),0_10px_16px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-0.5"
           >
             <span>{item.label}</span>

             <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#242424] text-white shadow-[0_3px_0_rgba(0,0,0,0.28),0_7px_12px_rgba(0,0,0,0.18)] transition duration-300 group-hover:bg-[#00BFFF]">
                <Icon size={13} />
              </span>
            </Link>
          );
       })}
      </div>
      </section>

      <div className="relative z-10 mx-auto mt-32 flex max-w-[1620px] flex-col items-center justify-between gap-8 border-t border-zinc-300/70 pt-10 text-[17px] font-medium text-zinc-500 lg:flex-row">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#08080c] underline underline-offset-2 transition hover:text-[#00BFFF]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-center md:text-center lg:text-center">© 2026 Cael Digital. Tüm hakları saklıdır.</p>

      </div>
    </footer>
  );
}