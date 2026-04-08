import { Link } from "react-router-dom";
import CardGeneral from "../components/CardGeneral";
import ImageCarousel from "../components/ImageCarousel";
import PlaylistSection from "../components/PlaylistSection";
import QuickLinkCard from "../components/QuickLinkCard";
import TianguisCard from "../components/TianguisCard";

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
    {
      image: "/img/eventos/evento1.jpg",
      category: "Musica",
      title: "Noche de Jazz Neza",
    },
    {
      image: "/img/eventos/evento2.jpg",
      category: "Cultura",
      title: "Festival Comunitario en la Explanada",
    },
    {
      image: "/img/eventos/evento3.jpg",
      category: "Gastronomia",
      title: "Sabores de Barrio y Cocina Local",
    },
    {
      image: "/img/eventos/evento4.jpg",
      category: "Arte urbano",
      title: "Encuentro de Talento Joven",
    },
  ];

  const tianguisCards = [
    {
      title: "Tianguis del Sol",
      schedule: "08:00 - 16:00 hrs",
      location: "Av. Chimalhuacan",
    },
    {
      title: "Tianguis Benito Juarez",
      schedule: "09:00 - 17:00 hrs",
      location: "Col. Benito Juarez",
    },
    {
      title: "Tianguis Reforma",
      schedule: "07:30 - 15:30 hrs",
      location: "Av. Reforma",
    },
    {
      title: "Tianguis La Perla",
      schedule: "08:30 - 16:30 hrs",
      location: "Calle La Perla",
    },
    {
      title: "Tianguis Zaragoza",
      schedule: "08:00 - 15:00 hrs",
      location: "Av. Zaragoza",
    },
  ];

  return (
    <>
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
    </>
  );
}
