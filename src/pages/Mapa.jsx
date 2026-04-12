import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lugaresMapa from "../data/mapa-completo.json";

const nezaCenter = [19.4006, -99.0148];

function sanitizeText(value) {
  if (!value) return "";

  return String(value)
    .replaceAll("ÃƒÂ¡", "Ã¡")
    .replaceAll("ÃƒÂ©", "Ã©")
    .replaceAll("ÃƒÂ­", "Ã­")
    .replaceAll("ÃƒÂ³", "Ã³")
    .replaceAll("ÃƒÂº", "Ãº")
    .replaceAll("ÃƒÂ", "Ã")
    .replaceAll("Ãƒâ€°", "Ã‰")
    .replaceAll("ÃƒÂ", "Ã")
    .replaceAll("Ãƒâ€œ", "Ã“")
    .replaceAll("ÃƒÅ¡", "Ãš")
    .replaceAll("ÃƒÂ±", "Ã±")
    .replaceAll("Ãƒâ€˜", "Ã‘")
    .replaceAll("ÃƒÂ¼", "Ã¼")
    .replaceAll("ÃƒÅ“", "Ãœ")
    .replaceAll("Ã‚Â°", "Â°")
    .replaceAll("Ã‚Âº", "Âº")
    .replaceAll("Ã‚", "")
    .replaceAll("\n", " ")
    .trim();
}

function normalizeText(value = "") {
  return sanitizeText(value).toLowerCase().trim().replace(/\s+/g, " ");
}

function getCategoryIcon(category = "") {
  const text = normalizeText(category);
  console.log('====================================');
  console.log(text);
  console.log('====================================');
  if (text.includes("policia")) return "/img/iconos/Policia.png";
  if (text.includes("seguridad")) return "/img/iconos/seguridad.png";
  if (text.includes("bomberos")) return "/img/iconos/Bomberos.png";
  if (text.includes("proteccion civil")) return "/img/iconos/proteccion-civil.png";
  if (text.includes("hospital")) return "/img/iconos/hospital.png";
  if (text.includes("clínica")) return "/img/iconos/clinica.png";

  return "/img/iconos/ubicacion.png";
}

const iconCache = {};

function getIcon(category) {
  if (!iconCache[category]) {
    const iconUrl = getCategoryIcon(category);

    iconCache[category] = divIcon({
      className: "",
      html: `
        <div style="
          width: 110px;
          height: 110px;
          position: relative;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.22));
        ">
          <img
            src="${iconUrl}"
            alt="${category}"
            style="position: absolute; inset: 0; width: 110px; height: 110px; object-fit: contain;"
          />
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 38],
    });
  }

  return iconCache[category];
}

function parseCoordinate(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isValidPosition(position) {
  return (
    Array.isArray(position) &&
    position.length === 2 &&
    Number.isFinite(position[0]) &&
    Number.isFinite(position[1])
  );
}

const mapPlaces = (lugaresMapa.features ?? [])
  .map((feature) => {
    const props = feature.properties ?? {};
    const coordinates = feature.geometry?.coordinates ?? [];
    const lng = parseCoordinate(coordinates[0], null);
    const lat = parseCoordinate(coordinates[1], null);

    if (lat === null || lng === null) {
      return null;
    }

    const categoryLabel = sanitizeText(props.nombre_act) || "Sin categoria";
    const position = [lat, lng];

    if (!isValidPosition(position)) {
      return null;
    }

    return {
      id: props.fid,
      name: sanitizeText(props.nom_estab) || "Lugar sin nombre",
      category: categoryLabel,
      normalizedCategory: normalizeText(categoryLabel),
      position,
      description:
        sanitizeText(props.nombre_act) ||
        "Punto de interes cargado desde GeoJSON.",
      image: sanitizeText(props.imagen) || "/img/eventos/evento1.jpg",
      address: sanitizeText(props.direccion) || sanitizeText(props.nom_vial),
      phone: sanitizeText(props.telefono),
      website: sanitizeText(props.www),
      email: sanitizeText(props.correoelec),
    };
  })
  .filter(Boolean);

function FocusMap({ place }) {
  const map = useMap();

  useEffect(() => {
    if (!place || !isValidPosition(place.position)) return;
    map.flyTo(place.position, 15, { duration: 0.8 });
  }, [map, place]);

  return null;
}

export default function Mapa() {
  const navigate = useNavigate();
  const categories = useMemo(
    () => [ ...new Set(mapPlaces.map((place) => place.category))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("policia");
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const normalizedQuery = normalizeText(query);

  const visiblePlaces = mapPlaces.filter((place) => {
    const matchesCategory =
      activeCategory === "todo" || place.normalizedCategory === activeCategory;

    const matchesQuery =
      normalizedQuery === "" ||
      normalizeText(place.name).includes(normalizedQuery) ||
      place.normalizedCategory.includes(normalizedQuery) ||
      normalizeText(place.address).includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  const searchResults =
    normalizedQuery === ""
      ? []
      : mapPlaces
          .filter((place) => {
            return (
              normalizeText(place.name).includes(normalizedQuery) ||
              place.normalizedCategory.includes(normalizedQuery) ||
              normalizeText(place.address).includes(normalizedQuery)
            );
          })
          .slice(0, 6);

  const mapsUrl = selectedPlace
    ? `https://www.google.com/maps/search/?api=1&query=${selectedPlace.position[0]},${selectedPlace.position[1]}`
    : "#";

  return (
    <section className="relative isolate -mx-4 -mt-8 h-[calc(100vh-5rem)] overflow-hidden bg-[#D7E8EC] md:mx-0 md:rounded-[32px]">
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={nezaCenter}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FocusMap place={selectedPlace} />
          {visiblePlaces
            .filter((place) => isValidPosition(place.position))
            .map((place) => (
              <Marker
                key={place.id}
                position={place.position}
                icon={getIcon(place.category)}
                eventHandlers={{ click: () => setSelectedPlace(place) }}
              />
            ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[500] flex flex-col">
        <div className="pointer-events-auto p-5">
          <div className="rounded-[28px] bg-white/92 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-full bg-[#F5F6F8] px-4 py-3">
              <span className="text-[#7D6870]">⌕</span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar policias, hospitales o direcciones..."
                className="w-full bg-transparent text-[14px] text-[#4B3940] outline-none placeholder:text-[#9B8B91]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[#7A0F35]"
                >
                  ×
                </button>
              ) : (
                <span className="text-[#7A0F35]">⌖</span>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="mt-3 max-h-[250px] overflow-y-auto rounded-[22px] bg-[#F5F6F8] p-2">
                {searchResults.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory("todo");
                      setSelectedPlace(place);
                      setQuery(place.name);
                    }}
                    className="flex w-full items-start justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition hover:bg-white"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-[#23171C]">
                        {place.name}
                      </p>
                      <p className="mt-1 text-[12px] text-[#7D6870]">
                        {place.address}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase text-[#611232]">
                      {place.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-3 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const normalizedCategory = normalizeText(category);
                const isActive = activeCategory === normalizedCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(normalizedCategory)}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-medium transition ${
                      isActive
                        ? "bg-[#FFD175] text-[#6A4B00]"
                        : "bg-[#F5F6F8] text-[#5F4B52]"
                    }`}
                  >
                    {category === "todo" ? "Todo" : category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-24">
          {selectedPlace ? (
            <div className="pointer-events-auto overflow-hidden rounded-[30px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)]">
              <div className="relative h-[155px] overflow-hidden">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedPlace(null)}
                  aria-label="Cerrar ficha"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#7A0F35] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                >
                  &times;
                </button>
                <span className="absolute bottom-3 left-3 rounded-full bg-[#7A0F35] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                  {selectedPlace.category}
                </span>
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <h2 className="text-[18px] font-bold leading-6 text-[#23171C]">
                    {selectedPlace.name}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#7D6870]">
                    • {selectedPlace.address}
                  </p>
                </div>

                <p className="text-[14px] leading-6 text-[#5F4B52]">
                  {selectedPlace.description}
                </p>

                <div className="flex gap-3">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full bg-[#611232] px-4 py-3 text-center text-[14px] font-bold text-white"
                  >
                    Como llegar
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/mapa/detalle", {
                        state: { place: selectedPlace },
                      })
                    }
                    className="rounded-full bg-[#F5F1F2] px-5 py-3 text-[14px] font-bold text-[#3F3136]"
                  >
                    Ver mas
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
