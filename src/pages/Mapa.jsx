import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import lugaresMapa from "../data/mapa.json";

const nezaCenter = [19.4006, -99.0148];

function sanitizeText(value) {
  if (!value) return "";

  return String(value)
    .replaceAll("Ã¡", "á")
    .replaceAll("Ã©", "é")
    .replaceAll("Ã­", "í")
    .replaceAll("Ã³", "ó")
    .replaceAll("Ãº", "ú")
    .replaceAll("Ã", "Á")
    .replaceAll("Ã‰", "É")
    .replaceAll("Ã", "Í")
    .replaceAll("Ã“", "Ó")
    .replaceAll("Ãš", "Ú")
    .replaceAll("Ã±", "ñ")
    .replaceAll("Ã‘", "Ñ")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("Â°", "°")
    .replaceAll("Âº", "º")
    .replaceAll("Â", "")
    .replaceAll("\n", " ")
    .trim();
}

function resolveCategory(nombreActividad = "") {
  const activity = sanitizeText(nombreActividad).toLowerCase();

  if (activity.includes("otras especialidades")) return "Especialidades";
  if (activity.includes("no requieren hospitalizacion")) return "Atencion medica";
  return "Hospital general";
}

const CATEGORY_STYLES = {
  "Hospital general": "#7A0F35",
  Especialidades: "#8D6B10",
  "Atencion medica": "#0F6A4B",
};

const mapPlaces = lugaresMapa.features.map((feature) => {
  const props = feature.properties ?? {};
  const [lng, lat] = feature.geometry?.coordinates ?? [nezaCenter[1], nezaCenter[0]];
  const category = resolveCategory(props.nombre_act);

  return {
    id: props.fid,
    name: sanitizeText(props.nom_estab) || "Lugar sin nombre",
    category,
    position: [lat, lng],
    description:
      sanitizeText(props.nombre_act) || "Punto de interes cargado desde GeoJSON.",
    color: CATEGORY_STYLES[category] || "#7A0F35",
    image: sanitizeText(props.imagen) || "/img/eventos/evento1.jpg",
    address: sanitizeText(props.direccion) || sanitizeText(props.nom_vial),
    rating: "4.8",
    phone: sanitizeText(props.telefono),
    website: sanitizeText(props.www),
    email: sanitizeText(props.correoelec),
  };
});

function createPin() {
  return divIcon({
    className: "",
    html: `
      <div style="
        width: 44px;
        height: 44px;
        position: relative;
        filter: drop-shadow(0 8px 18px rgba(0,0,0,0.22));
      ">
        <img
          src="/img/iconos/clinica.png"
          alt=""
          style="position: absolute; inset: 0; width: 44px; height: 44px; object-fit: contain;"
        />
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 38],
  });
}

function FocusMap({ place }) {
  const map = useMap();

  useEffect(() => {
    if (!place) return;
    map.flyTo(place.position, 15, { duration: 0.8 });
  }, [map, place]);

  return null;
}

export default function Mapa() {
  const navigate = useNavigate();
  const categories = ["Todo", ...new Set(mapPlaces.map((place) => place.category))];
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const visiblePlaces = mapPlaces.filter((place) => {
    const loweredQuery = query.toLowerCase();
    const matchesCategory =
      activeCategory === "Todo" || place.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      place.name.toLowerCase().includes(loweredQuery) ||
      place.category.toLowerCase().includes(loweredQuery) ||
      place.address.toLowerCase().includes(loweredQuery);

    return matchesCategory && matchesQuery;
  });

  const placesToRender = visiblePlaces.length > 0 ? visiblePlaces : mapPlaces;

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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <FocusMap place={selectedPlace} />
          {placesToRender.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              icon={createPin()}
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
                placeholder="Buscar murales, monumentos..."
                className="w-full bg-transparent text-[14px] text-[#4B3940] outline-none placeholder:text-[#9B8B91]"
              />
              <span className="text-[#7A0F35]">☷</span>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-medium transition ${
                    activeCategory === category
                      ? "bg-[#FFD175] text-[#6A4B00]"
                      : "bg-[#F5F6F8] text-[#5F4B52]"
                  }`}
                >
                  {category}
                </button>
              ))}
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[18px] font-bold leading-6 text-[#23171C]">
                      {selectedPlace.name}
                    </h2>
                    <p className="mt-1 text-[13px] text-[#7D6870]">
                      • {selectedPlace.address}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF3D6] px-2.5 py-1 text-[12px] font-bold text-[#8D6B10]">
                    ★ {selectedPlace.rating}
                  </span>
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
                    ¿Como llegar?
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
                    Ver más
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
