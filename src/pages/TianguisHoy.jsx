import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import tianguisData from "../data/tianguis.json";

const nezaCenter = [19.4006, -99.0148];
const weekDays = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miercoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sabado" },
  { key: "domingo", label: "Domingo" },
];

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

function isValidPosition(position) {
  return (
    Array.isArray(position) &&
    position.length === 2 &&
    Number.isFinite(position[0]) &&
    Number.isFinite(position[1])
  );
}

function parseCoordinate(value, fallback = null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function createTianguisPin() {
  return divIcon({
    className: "",
    html: `
      <div style="
        width: 58px;
        height: 58px;
        position: relative;
        filter: drop-shadow(0 8px 18px rgba(0,0,0,0.22));
      ">
        <img
          src="/img/iconos/tianguis.png"
          alt=""
          style="position:absolute; inset:0; width:58px; height:58px; object-fit:contain;"
        />
      </div>
    `,
    iconSize: [58, 58],
    iconAnchor: [29, 29],
  });
}

function FocusMap({ tianguis }) {
  const map = useMap();

  useEffect(() => {
    if (!tianguis || !isValidPosition(tianguis.position)) return;
    map.flyTo(tianguis.position, 15, { duration: 0.8 });
  }, [map, tianguis]);

  return null;
}

const allTianguis = (tianguisData.features ?? [])
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

    const day = sanitizeText(props.dia);
    const address = sanitizeText(props.direccion_2) || "Direccion no disponible";

    return {
      id: props.fid ?? index,
      name: `Tianguis ${day || "del dia"}`,
      day,
      normalizedDay: normalizeDay(day),
      address,
      position,
      schedule: "07:00 - 16:00 hrs",
      description:
        "Recorrido comercial al aire libre con productos locales, antojitos y articulos para el hogar.",
    };
  })
  .filter(Boolean);

export default function TianguisHoy() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const todayKey = getTodayKey();
  const [activeDay, setActiveDay] = useState(todayKey);
  const [selectedTianguis, setSelectedTianguis] = useState(null);

  const filteredTianguis = useMemo(
    () => allTianguis.filter((item) => item.normalizedDay === activeDay),
    [activeDay],
  );
  const safeSelectedTianguis =
    selectedTianguis && isValidPosition(selectedTianguis.position)
      ? selectedTianguis
      : null;

  useEffect(() => {
    if (state?.activeDay) {
      setActiveDay(state.activeDay);
    }
  }, [state?.activeDay]);

  useEffect(() => {
    if (!state?.selectedTianguisId) return;

    const matchedTianguis = allTianguis.find(
      (item) => item.id === state.selectedTianguisId,
    );

    if (matchedTianguis && isValidPosition(matchedTianguis.position)) {
      setSelectedTianguis(matchedTianguis);
    }
  }, [state?.selectedTianguisId]);

  const mapsUrl = safeSelectedTianguis
    ? `https://www.google.com/maps/search/?api=1&query=${safeSelectedTianguis.position[0]},${safeSelectedTianguis.position[1]}`
    : "#";

  return (
    <section className="relative isolate -mx-4 -mt-8 h-[calc(100vh-5rem)] overflow-hidden bg-[#F6E7D7] md:mx-0 md:rounded-[32px]">
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
          <FocusMap tianguis={safeSelectedTianguis} />

          {filteredTianguis
            .filter((tianguis) => isValidPosition(tianguis.position))
            .map((tianguis) => (
            <Marker
              key={tianguis.id}
              position={tianguis.position}
              icon={createTianguisPin()}
              eventHandlers={{ click: () => setSelectedTianguis(tianguis) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[500] flex flex-col">
        <div className="pointer-events-auto p-5">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              safeSelectedTianguis
                ? "pointer-events-none max-h-0 opacity-0"
                : "pointer-events-auto max-h-[240px] opacity-100"
            }`}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,248,240,0.94))] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.10)] backdrop-blur-sm">
              <div className="absolute right-[-10px] top-[-10px] h-16 w-16 rounded-full bg-[#ffd175]/25" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-[#fff1cf] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8D6B10] shadow-[inset_0_0_0_1px_rgba(141,107,16,0.08)]">
                    Tianguis de Hoy
                  </span>
                  <h1 className="mt-2 text-[16px] font-bold leading-tight text-[#611232]">
                    {filteredTianguis.length > 0
                      ? `${filteredTianguis.length} tianguis para ${activeDay}`
                      : "No hay tianguis registrados para este dia"}
                  </h1>
                  <p className="mt-1 text-[12px] text-[#7D6870]">
                    Hoy es: {todayKey}. Puedes cambiar el filtro.
                  </p>
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
                {weekDays.map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => {
                      setActiveDay(day.key);
                      setSelectedTianguis(null);
                    }}
                    className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition ${
                      activeDay === day.key
                        ? "bg-[#611232] text-white"
                        : "bg-[#F5F1F2] text-[#6f5c63]"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-24">
          {safeSelectedTianguis ? (
            <div className="pointer-events-auto overflow-hidden rounded-[30px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)] md:ml-auto md:max-w-[720px]">
              <div className="relative h-[160px] overflow-hidden bg-[linear-gradient(135deg,#611232,#8f234e)]">
                <img
                  src="/img/fondos/fondo.png"
                  alt=""
                  className="h-full w-full object-cover opacity-15"
                />
                <button
                  type="button"
                  onClick={() => setSelectedTianguis(null)}
                  aria-label="Cerrar ficha"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#7A0F35] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                >
                  &times;
                </button>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-flex rounded-full bg-[#FFD175] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6A4B00]">
                    {safeSelectedTianguis.day}
                  </span>
                  <h2 className="mt-3 text-[24px] font-bold leading-tight">
                    {safeSelectedTianguis.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-[14px] leading-6 text-[#5F4B52]">
                  {safeSelectedTianguis.description}
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-[18px] bg-[#f8f3f1] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
                      Horario
                    </p>
                    <p className="mt-2 text-[14px] font-semibold text-[#2f2026]">
                      {safeSelectedTianguis.schedule}
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#f8f3f1] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7B81]">
                      Direccion
                    </p>
                    <p className="mt-2 text-[14px] font-semibold text-[#2f2026]">
                      {safeSelectedTianguis.address}
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
            <div className="pointer-events-auto rounded-[30px] border-2 border-dashed border-[#c9b8b0] bg-white/60 p-5 text-center text-[14px] text-[#7A6B70]">
              Selecciona un tianguis en el mapa para ver los detalles
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
