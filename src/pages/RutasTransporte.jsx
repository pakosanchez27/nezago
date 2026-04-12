import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import transporteData from "../data/transporte.json";

const nezaCenter = [19.4006, -99.0148];

function sanitizeText(value) {
  if (!value) return "";

  return String(value)
    .replaceAll("Ã¡", "á")
    .replaceAll("Ã©", "é")
    .replaceAll("Ã­", "í")
    .replaceAll("Ã³", "ó")
    .replaceAll("Ãº", "ú")
    .replaceAll("Ã±", "ñ")
    .replaceAll("Ã", "Á")
    .replaceAll("Ã‰", "É")
    .replaceAll("Ã", "Í")
    .replaceAll("Ã“", "Ó")
    .replaceAll("Ãš", "Ú")
    .replaceAll("\n", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value = "") {
  return sanitizeText(value).toLowerCase().trim().replace(/\s+/g, " ");
}

function parseCoordinate(value, fallback = null) {
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

function getTransportIcon(type = "") {
  const normalized = normalizeText(type);

  if (normalized.includes("metro")) return "/img/iconos/mapa.svg";
  if (normalized.includes("mexibus")) return "/img/iconos/directions.svg";
  if (normalized.includes("autobus")) return "/img/iconos/assistant_navigation.svg";
  if (normalized.includes("taxi")) return "/img/iconos/local_mall.svg";

  return "/img/iconos/directions.svg";
}

const iconCache = {};

function createTransportPin(type) {
  if (!iconCache[type]) {
    const iconUrl = getTransportIcon(type);

    iconCache[type] = divIcon({
      className: "",
      html: `
        <div style="
          width: 54px;
          height: 54px;
          position: relative;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,0.22));
        ">
          <div style="
            position:absolute;
            inset:0;
            border-radius:999px;
            background:#611232;
            display:flex;
            align-items:center;
            justify-content:center;
          ">
            <img
              src="${iconUrl}"
              alt=""
              style="width:24px; height:24px; object-fit:contain; filter: brightness(0) invert(1);"
            />
          </div>
        </div>
      `,
      iconSize: [54, 54],
      iconAnchor: [27, 27],
    });
  }

  return iconCache[type];
}

const transportPoints = (transporteData.features ?? [])
  .map((feature, index) => {
    const props = feature.properties ?? {};
    const coordinates = feature.geometry?.coordinates ?? [];
    const lng = parseCoordinate(coordinates[0], null);
    const lat = parseCoordinate(coordinates[1], null);

    if (lat === null || lng === null) {
      return null;
    }

    const position = [lat, lng];

    if (!isValidPosition(position)) {
      return null;
    }

    const type = sanitizeText(props.fclass) || "Transporte";
    const name = sanitizeText(props.name) || type;

    return {
      id: props.fid ?? index,
      name,
      type,
      normalizedType: normalizeText(type),
      position,
      description: `Punto de transporte tipo ${type.toLowerCase()} en Nezahualcoyotl.`,
      schedule: "Consulta horario en sitio",
      address: "Nezahualcoyotl, Estado de Mexico",
    };
  })
  .filter(Boolean);

export default function RutasTransporte() {
  const navigate = useNavigate();
  const categories = useMemo(
    () => ["todo", ...new Set(transportPoints.map((point) => point.type))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState("todo");
  const [selectedPoint, setSelectedPoint] = useState(null);

  const visiblePoints = transportPoints.filter((point) => {
    return (
      activeCategory === "todo" ||
      point.normalizedType === normalizeText(activeCategory)
    );
  });

  const mapsUrl = selectedPoint
    ? `https://www.google.com/maps/search/?api=1&query=${selectedPoint.position[0]},${selectedPoint.position[1]}`
    : "#";

  return (
    <section className="relative isolate -mx-4 -mt-8 h-[calc(100vh-5rem)] overflow-hidden bg-[#E5EEF3] md:mx-0 md:rounded-[32px]">
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

          {visiblePoints.map((point) => (
            <Marker
              key={point.id}
              position={point.position}
              icon={createTransportPin(point.type)}
              eventHandlers={{ click: () => setSelectedPoint(point) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[500] flex flex-col">
        <div className="pointer-events-auto p-5">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              selectedPoint
                ? "pointer-events-none max-h-0 opacity-0"
                : "pointer-events-auto max-h-[240px] opacity-100"
            }`}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(244,249,252,0.94))] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.10)] backdrop-blur-sm">
              <div className="absolute right-[-10px] top-[-10px] h-16 w-16 rounded-full bg-[#9fd8ff]/30" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-[#e8f6ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1b6e97] shadow-[inset_0_0_0_1px_rgba(27,110,151,0.08)]">
                    Rutas de Transporte
                  </span>
                  <h1 className="mt-2 text-[16px] font-bold leading-tight text-[#611232]">
                    {visiblePoints.length} puntos disponibles
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="shrink-0 rounded-full bg-[#611232] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                >
                  Regresar
                </button>
              </div>

              <div className="relative z-10 mt-3 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((category) => {
                  const normalizedCategory = normalizeText(category);
                  const isActive = activeCategory === normalizedCategory;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(normalizedCategory);
                        setSelectedPoint(null);
                      }}
                      className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                        isActive
                          ? "bg-[#611232] text-white"
                          : "bg-[#F5F1F2] text-[#6f5c63]"
                      }`}
                    >
                      {category === "todo" ? "Todo" : category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-24">
          {selectedPoint ? (
            <div className="pointer-events-auto overflow-hidden rounded-[30px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)] md:ml-auto md:max-w-[720px]">
              <div className="relative h-[160px] overflow-hidden bg-[linear-gradient(135deg,#173a4f,#2f6d92)]">
                <img
                  src="/img/fondos/fondo.png"
                  alt=""
                  className="h-full w-full object-cover opacity-15"
                />
                <button
                  type="button"
                  onClick={() => setSelectedPoint(null)}
                  aria-label="Cerrar ficha"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#173a4f] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                >
                  &times;
                </button>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-flex rounded-full bg-[#9fd8ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#173a4f]">
                    {selectedPoint.type}
                  </span>
                  <h2 className="mt-3 text-[24px] font-bold leading-tight">
                    {selectedPoint.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-[14px] leading-6 text-[#5F4B52]">
                  {selectedPoint.description}
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-[18px] bg-[#f1f6f8] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a7e89]">
                      Tipo
                    </p>
                    <p className="mt-2 text-[14px] font-semibold text-[#243139]">
                      {selectedPoint.type}
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#f1f6f8] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6a7e89]">
                      Horario
                    </p>
                    <p className="mt-2 text-[14px] font-semibold text-[#243139]">
                      {selectedPoint.schedule}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full bg-[#611232] px-4 py-3 text-center text-[14px] font-bold text-white"
                  >
                    Como llegar
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="pointer-events-auto rounded-[30px] border-2 border-dashed border-[#b8cbd6] bg-white/60 p-5 text-center text-[14px] text-[#5d6f79]">
              Selecciona un punto en el mapa para ver los detalles
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
