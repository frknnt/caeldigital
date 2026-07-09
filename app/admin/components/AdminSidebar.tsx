"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type IconProps = {
  className?: string;
};




const menuItems = [
  {
    label: "Blog Yönetimi",
    href: "/admin/blog",
    icon: FileIcon,
  },
  {
    label: "İletişim Formları",
    href: "/admin/iletisim",
    icon: MailIcon,
  },
  {
    label: "Portfolyo Sayfaları",
    href: "/admin/portfolyo",
    icon: ImageIcon,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const router = useRouter();
  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.replace("/admin/giris");
  router.refresh();
};

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#e5e7eb] bg-[#f6f7fb]">
      <div className="flex h-[94px] items-center border-b border-[#e5e7eb] px-8">
        <Link href="/admin/blog">
          <img
            src="/caeldigitallogok.png"
            alt="Cael Digital"
            className="h-[42px] w-auto object-contain"
          />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-4 px-4 pt-16">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-[58px] items-center gap-4 rounded-[10px] px-5 text-left text-[18px] font-bold transition ${
                active
                  ? "bg-white text-[#093efe] shadow-[0_7px_20px_rgba(15,23,42,0.12)]"
                  : "text-black hover:bg-white"
              }`}
            >
              <Icon
                className={`h-[22px] w-[22px] ${
                  active ? "text-[#093efe]" : "text-[#7c6f98]"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-6">
        <button
            type="button"
             onClick={handleLogout}
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[10px] border border-[#9ca3af] bg-white text-[17px] font-bold text-black transition hover:border-[#093efe] hover:text-[#093efe]"
            >
            <LogoutIcon className="h-[21px] w-[21px] text-[#6b7280]" />
             Oturumu Kapat
            </button>
      </div>
    </aside>
  );
}

function FileIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2h8l4 4v16H6V2Zm7 1.5V7h3.5L13 3.5ZM8 11h8v2H8v-2Zm0 4h8v2H8v-2Z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5h18v14H3V5Zm9 8.2 7-5.2V7l-7 5-7-5v1l7 5.2Z" />
    </svg>
  );
}

function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 5h16v14H4V5Zm2 2v8.6l3.4-3.4 3 3 2-2.4L18 16.3V7H6Zm2.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0H4Z" />
    </svg>
  );
}

function GearIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 0 1-2.98 2.98l-.04-.04A1.8 1.8 0 0 0 14.8 19.6a1.8 1.8 0 0 0-1 .55V20.2a2.1 2.1 0 0 1-4.2 0v-.05a1.8 1.8 0 0 0-1-.55 1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 0 1-2.98-2.98l.04-.04A1.8 1.8 0 0 0 4 15a1.8 1.8 0 0 0-.55-1H3.4a2.1 2.1 0 0 1 0-4.2h.05A1.8 1.8 0 0 0 4 8.8a1.8 1.8 0 0 0-.36-1.98l-.04-.04A2.1 2.1 0 0 1 6.58 3.8l.04.04A1.8 1.8 0 0 0 8.6 4.2a1.8 1.8 0 0 0 1-.55V3.6a2.1 2.1 0 0 1 4.2 0v.05a1.8 1.8 0 0 0 1 .55 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.1 2.1 0 0 1 2.98 2.98l-.04.04A1.8 1.8 0 0 0 19.4 8.8a1.8 1.8 0 0 0 .55 1H20a2.1 2.1 0 0 1 0 4.2h-.05a1.8 1.8 0 0 0-.55 1Z" />
    </svg>
  );
}

function LogoutIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 17l5-5-5-5" />
      <path d="M20 12H8" />
      <path d="M12 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
    </svg>
  );
}