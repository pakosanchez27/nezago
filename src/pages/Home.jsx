import { Link } from "react-router-dom";
import CardGeneral from "../components/CardGeneral";
import ImageCarousel from "../components/ImageCarousel";
import PlaylistSection from "../components/PlaylistSection";
import QuickLinkCard from "../components/QuickLinkCard";
import TianguisCard from "../components/TianguisCard";
import { featuredEvent, upcomingEvents } from "../data/eventsData";
import tianguisData from "../data/tianguis.json";

function sanitizeText(value) {
  if (!value) return "";

  return String(value)
    .replaceAll("Ã¡", "á")
    .replaceAll("Ã©", "é")
    .replaceAll("Ã­", "í")
    .replaceAll("Ã³", "ó")
    .replaceAll("Ãº", "ú")
    .replaceAll("Ã±", "ñ")
    .replaceAll("\n", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDay(value = "") {
  const cleaned = sanitizeText(value).toLowerCase().trim();

  if (cleaned.startsWith("lun")) return "lunes";
  if (cleaned.startsWith("mar")) return "martes";
  if (cleaned.startsWith("mie")) return "miercoles";
  if (cleaned.startsWith("mié")) return "miercoles";
  if (cleaned.startsWith("jue")) return "jueves";
  if (cleaned.startsWith("vie")) return "viernes";
  if (cleaned.startsWith("sab")) return "sabado";
  if (cleaned.startsWith("sáb")) return "sabado";
  if (cleaned.startsWith("dom")) return "domingo";

  return cleaned;
}

function getTodayKey() {
  const dayIndex = new Date().getDay();
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  return days[dayIndex];
}

export default function Home() {
  const quickLinks = [
    {
      to: "/historia-de-nezahualcoyotl",
      label: "Historia de Neza",
      icon: "/img/iconos/account_balance.svg",
      alt: "Icono de historia de Neza",
    },
    {
      to: "/pasaporte",
      label: "Pasaporte Gastronomico",
      icon: "/img/iconos/passport.svg",
      alt: "Icono de pasaporte gastronomico",
    },
    {
      to: "/cuponera",
      label: "Cuponera Local",
      icon: "/img/iconos/cupon.svg",
      alt: "Icono de cuponera local",
    },
    {
      to: "/eventos",
      label: "Proximos Eventos",
      icon: "/img/iconos/comedy_mask.svg",
      alt: "Icono de proximos eventos",
    },
  ];

  const featuredEvents = [
    { ...featuredEvent, category: "Destacado" },
    ...upcomingEvents.map((event) => ({
      ...event,
      category:
        event.slug === "festival-del-taco-neza-2024"
          ? "Gastronomia"
          : event.slug === "expo-arte-urbano-neza"
            ? "Cultura"
            : "Musica",
    })),
  ];

  const todayKey = getTodayKey();
  
  const tianguisCards = (tianguisData.features ?? [])
    .map((feature, index) => {
      const day = sanitizeText(feature.properties?.dia);
      const address =
        sanitizeText(feature.properties?.direccion_2) || "Direccion no disponible";

      return {
        id: feature.properties?.fid ?? index,
        day,
        normalizedDay: normalizeDay(day),
        title: `Tianguis ${day || "del dia"}`,
        schedule: "07:00 - 16:00 hrs",
        location: address,
        position: [Number(feature.geometry?.coordinates?.[1]), Number(feature.geometry?.coordinates?.[0])],
      };
    })
    .filter((tianguis) => tianguis.normalizedDay === todayKey)
    .slice(0, 6);

  return (
    <>
      <div className="md:hidden">
        <section
          className="relative -mx-4 -mt-8 h-[250px] overflow-hidden bg-neza-primary md:mx-0"
          aria-label="Seccion principal"
        >
          <img
            src="/img/fondos/Vector.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_38%),linear-gradient(180deg,rgba(97,18,50,0.28),rgba(97,18,50,0.12))]" />
          <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-20">
            <div className="mb-4 inline-flex w-max items-center gap-2 rounded-full bg-[#FFD175] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6A4B00] shadow-[0_8px_18px_rgba(255,209,117,0.28)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#611232]" />
              <span>Bienvenido de vuelta</span>
            </div>
            <h1 className="text-[40px] font-bold leading-[1.02] text-white">
              Hola, Francisco
            </h1>
            <p className="mt-2 max-w-[250px] text-[18px] leading-6 text-white/92">
              Tu viaje urbano continua hoy.
            </p>
          </div>
        </section>

        <div className="space-y-8">
          <section className="carrusel">
            <ImageCarousel />
          </section>

          <section id="categorias">
            <div className="cards flex justify-between gap-y-6">
              {quickLinks.map((item) => (
                <QuickLinkCard key={item.to} {...item} />
              ))}
            </div>
          </section>

          <section className="section">
            <div className="flex items-center justify-between">
              <h2>Proximos Eventos</h2>
              <Link to="/eventos" className="text-neza-primary">
                Ver mas
              </Link>
            </div>

            <div
              className="cards flex items-center gap-3 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {featuredEvents.map((event) => (
                <CardGeneral key={event.title} event={event} />
              ))}
            </div>
          </section>

          <PlaylistSection />

          <section>
            <div className="mb-6">
              <h2>Tianguis de Hoy</h2>
            </div>

            <div
              className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {tianguisCards.map((tianguis) => (
                <TianguisCard key={tianguis.title} tianguis={tianguis} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="hidden space-y-8 md:block">
        <section className="grid grid-cols-[280px_minmax(0,1fr)] items-stretch gap-5">
          <article className="relative overflow-hidden rounded-[28px] bg-neza-primary">
            <img
              src="/img/fondos/Vector.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_38%),linear-gradient(180deg,rgba(97,18,50,0.28),rgba(97,18,50,0.12))]" />
            <div className="relative z-10 flex h-full min-h-[290px] flex-col justify-center px-7 py-8">
              <div className="mb-4 inline-flex w-max items-center gap-2 rounded-full bg-[#FFD175] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6A4B00] shadow-[0_8px_18px_rgba(255,209,117,0.28)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#611232]" />
                <span>Bienvenido de vuelta</span>
              </div>
              <h1 className="text-[42px] font-bold leading-[1.02] text-white">
                Hola, Francisco
              </h1>
              <p className="mt-3 max-w-[220px] text-[17px] leading-6 text-white/92">
                Tu viaje urbano continua hoy.
              </p>
            </div>
          </article>

          <section className="min-w-0">
            <ImageCarousel />
          </section>
        </section>

        <section id="categorias" className="rounded-[28px] bg-white px-2 py-1">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[28px] font-bold text-[#240e16]">
              Explora tu Ciudad
            </h2>
            <Link
              to="/mapa"
              className="text-sm font-semibold text-neza-primary transition hover:text-[#7d2a4b]"
            >
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {quickLinks.map((item) => (
              <QuickLinkCard key={item.to} {...item} />
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-white px-2 py-1">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[28px] font-bold text-[#240e16]">
              Proximos Eventos
            </h2>
            <Link
              to="/eventos"
              className="text-sm font-semibold text-neza-primary transition hover:text-[#7d2a4b]"
            >
              Ver mas
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5 xl:grid-cols-4">
            {featuredEvents.map((event) => (
              <CardGeneral key={event.title} event={event} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-6">
          <div className="rounded-[28px] bg-[#fbf7f5] p-6">
            <PlaylistSection />
          </div>

          <div className="rounded-[28px] bg-[#fffaf5] p-6 shadow-[inset_0_0_0_1px_rgba(97,18,50,0.06)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[26px] font-bold text-[#240e16]">
                Tianguis de Hoy
              </h2>
              <Link
                to="/tianguis-de-hoy"
                className="text-sm font-semibold text-neza-primary"
              >
                Ver mas
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {tianguisCards.map((tianguis) => (
                <TianguisCard key={tianguis.title} tianguis={tianguis} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
