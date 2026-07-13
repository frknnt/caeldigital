"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    label: "Ana Sayfa",
    href: "/",
  },
  {
    label: "Hakkımızda",
    href: "/hakkimizda",
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetlerimiz",
  },
  {
    label: "İşlerimiz",
    href: "/portfolyo",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "İletişim",
    href: "/iletisim",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-50 flex w-full justify-center px-4 transition-all duration-300 z-[9999]">
      <div
        className={`relative flex w-full max-w-[1100px] items-center justify-between rounded-full px-3 py-2.5 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
            : "bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        }`}
      >
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2 pl-4"
        >
          <img
            src="/caeldigitallogok.png"
            alt="Cael Digital Logo"
            className="h-7 md:h-8"
          />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href} className="relative py-2">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 font-semibold transition-colors ${
                      active
                        ? "text-[#093efe] after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-[#093efe] after:content-['']"
                        : "text-gray-900 hover:text-[#093efe]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center">
          <Link
            href="/iletisim"
            className="hidden rounded-full border border-[#444] bg-gradient-to-b from-[#333333] to-[#1a1a1a] px-8 py-3.5 font-semibold text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:from-[#1a1a1a] hover:to-[#000000] lg:flex"
          >
            Hemen Teklif Al
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-2 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none lg:hidden"
            type="button"
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`absolute left-0 right-0 top-full mx-3 mt-4 origin-top overflow-hidden rounded-3xl border border-gray-100 bg-white/95 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
            mobileMenuOpen
              ? "scale-y-100 opacity-100"
              : "h-0 scale-y-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-6 py-4">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-gray-100 pb-2 text-lg font-semibold transition-colors last:border-b-0 ${
                    active
                      ? "text-[#093efe]"
                      : "text-gray-700 hover:text-[#093efe]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full rounded-full bg-gradient-to-b from-[#333333] to-[#1a1a1a] py-3.5 text-center font-bold text-white"
            >
              Hemen Teklif Al
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
