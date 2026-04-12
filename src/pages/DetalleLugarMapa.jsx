import { useLocation, useNavigate } from "react-router-dom";

function toList(value, fallback = []) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(/[,|/]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}

function getAmenityIcon(amenity = "") {
  const normalized = amenity.toLowerCase();

  if (normalized.includes("wifi")) return "/img/iconos/chatbot.svg";
  if (normalized.includes("estacionamiento")) return "/img/iconos/local_mall.svg";
  if (normalized.includes("acceso")) return "/img/iconos/assistant_navigation.svg";
  if (normalized.includes("sanitario")) return "/img/iconos/hospital.png";
  if (normalized.includes("pet")) return "/img/iconos/home.svg";

  return "/img/iconos/briefcase_meal.svg";
}

function buildPlaceDetails(rawPlace) {
  const place = rawPlace ?? {};
  const fallbackGallery = [
    place.image || "/img/eventos/evento1.jpg",
    "/img/eventos/evento2.jpg",
    "/img/eventos/evento3.jpg",
  ];

  return {
    ...place,
    name: place.name || "Lugar de interes",
    category: place.category || place.commerceType || "Punto destacado",
    image: place.image || "/img/eventos/evento1.jpg",
    address: place.address || "Nezahualcoyotl, Estado de Mexico",
    position: place.position || [19.4006, -99.0148],
    description:
      place.description ||
      "Espacio de referencia para visualizar informacion detallada del punto seleccionado en el mapa.",
    hours: place.hours || "Lunes a domingo de 09:00 a 20:00 hrs",
    averageCost:
      place.averageCost || place.averagePrice || place.costoPromedio || "$200 MXN",
    commerceType: place.commerceType || place.foodType || place.category || "Comercio local",
    phone: place.phone || "55 0000 0000",
    email: place.email || "reservas@nezago.local",
    socials: {
      facebook: place.facebook || place.socialFacebook || "",
      instagram: place.instagram || place.socialInstagram || "",
      tiktok: place.tiktok || place.socialTiktok || "",
    },
    amenities: toList(place.amenities || place.amenidades, [
      "Wifi",
      "Acceso accesible",
      "Sanitarios",
    ]),
    menuImage: place.menuImage || place.image || "/img/playlist.png",
    menuUrl: place.menuUrl || place.menu || "#",
    gallery: toList(place.gallery, fallbackGallery).slice(0, 6),
  };
}

export default function DetalleLugarMapa() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const place = buildPlaceDetails(state?.place);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.position[0]},${place.position[1]}`;
  const socialLinks = [
    {
      key: "facebook",
      label: "Facebook",
      icon: "/img/iconos/facebook.png",
      url: place.socials.facebook,
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: "/img/iconos/instagram.png",
      url: place.socials.instagram,
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: "/img/iconos/tik-tok.png",
      url: place.socials.tiktok,
    },
  ];

  return (
    <section className="space-y-6 pb-8">
      <div className="relative -mx-4 -mt-8 h-[300px] overflow-hidden rounded-b-[32px] bg-black md:mx-0 md:rounded-[32px]">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.65))]" />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-6">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-white backdrop-blur-sm transition hover:bg-white/22"
            >
              <span aria-hidden="true">&larr;</span>
              Regresar
            </button>
          </div>

          <div>
            <p className="inline-flex rounded-full bg-[#611232] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              {place.category}
            </p>
            <h1 className="mt-3 text-[36px] font-bold leading-[1.02] text-white">
              {place.name}
            </h1>
          </div>
        </div>
      </div>

      <section className="rounded-[28px] border border-[#611232]/8 bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <h2 className="text-[26px] font-bold text-[#23171C]">
          Descripcion del comercio
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#5F4B52]">
          {place.description}
        </p>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <h2 className="text-[26px] font-bold text-[#23171C]">Datos</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-[20px] bg-[#f8f3f1] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
              Horario
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#2f2026]">{place.hours}</p>
          </div>
          <div className="rounded-[20px] bg-[#f8f3f1] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
              Costo promedio por persona
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#2f2026]">
              {place.averageCost}
            </p>
          </div>
          <div className="rounded-[20px] bg-[#f8f3f1] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
              Direccion
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#2f2026]">
              {place.address}
            </p>
          </div>
          <div className="rounded-[20px] bg-[#f8f3f1] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
              Tipo de comercio
            </p>
            <p className="mt-2 text-[15px] font-semibold text-[#2f2026]">
              {place.commerceType}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-[#611232] p-5 text-white shadow-[0_16px_36px_rgba(97,18,50,0.16)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h2 className="text-[24px] font-bold text-white">Datos para reservar</h2>
            <p className="text-[15px] text-white/90">Telefono: {place.phone}</p>
            <p className="text-[15px] text-white/90">Email: {place.email}</p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#FFD175]">
              Redes sociales
            </p>
            <div className="mt-3 flex gap-3">
              {socialLinks.map((social) =>
                social.url ? (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 backdrop-blur-sm"
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="h-5 w-5 object-contain"
                    />
                  </a>
                ) : (
                  <span
                    key={social.key}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 opacity-60"
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="h-5 w-5 object-contain"
                    />
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#FFD175] px-4 py-3 text-[14px] font-bold text-[#6A4B00]"
          >
            Como llegar
          </a>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <h2 className="text-[26px] font-bold text-[#23171C]">Amenidades</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {place.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-[20px] bg-[#f8f3f1] px-4 py-3"
            >
              <img
                src={getAmenityIcon(amenity)}
                alt=""
                className="h-5 w-5 object-contain"
              />
              <span className="text-[13px] font-semibold text-[#33242a]">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[26px] font-bold text-[#23171C]">Menu</h2>
          <a
            href={place.menuUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#F5F1F2] px-4 py-2 text-[13px] font-bold text-[#611232]"
          >
            Descargar
          </a>
        </div>

        <div className="mt-4 overflow-hidden rounded-[24px] bg-[#f8f3f1]">
          <img
            src={place.menuImage}
            alt={`Menu de ${place.name}`}
            className="h-[220px] w-full object-cover"
          />
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <h2 className="text-[26px] font-bold text-[#23171C]">Galeria de imagenes</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {place.gallery.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[22px]">
              <img
                src={image}
                alt={`${place.name} ${index + 1}`}
                className="h-[150px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
