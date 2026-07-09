import { Headphones, Mail, MapPin } from "lucide-react";

const contactItems = [
  {
    title: "E-posta adresi",
    value: "destek@caeldigital.com",
    icon: Mail,
  },
  {
    title: "Telefon numarası",
    value: "+90 544 633 43 57",
    icon: Headphones,
  },
  {
    title: "Konumumuz",
    value: "Türkiye, İzmir",
    icon: MapPin,
  },
];

export default function ContactDetails() {
  return (
    <section className="px-5 py-12 sm:px-8 lg:px-12 ">
      <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3 pt-24">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[22px] border border-white/70 bg-white/25 px-6 py-8 text-center shadow-[0_8px_22px_rgba(0,0,0,0.06)] backdrop-blur-sm"
            >
              <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-[14px] bg-[#242424] text-white shadow-[0_10px_20px_rgba(0,0,0,0.18)]">
                <Icon size={30} strokeWidth={2} />
              </div>

              <h3 className="mt-6 text-[21px] font-semibold leading-tight tracking-normal text-[#08080c]">
                {item.title}
              </h3>

              <p className="mt-2 text-[15px] font-medium leading-relaxed text-zinc-600">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
