import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import rutaGastronomica from "../data/ruta.json";

const nezaCenter = [19.4006, -99.0148];

// Normaliza textos del GeoJSON para evitar problemas de acentos o saltos de linea
// heredados del archivo fuente antes de mostrarlos en la UI.
function sanitizeText(value) {
  if (!value) return "";

  return String(value)
    .replaceAll("ÃƒÆ’Ã‚Â¡", "Ã¡")
    .replaceAll("ÃƒÆ’Ã‚Â©", "Ã©")
    .replaceAll("ÃƒÆ’Ã‚Â­", "Ã­")
    .replaceAll("ÃƒÆ’Ã‚Â³", "Ã³")
    .replaceAll("ÃƒÆ’Ã‚Âº", "Ãº")
    .replaceAll("ÃƒÆ’Ã‚Â", "Ã")
    .replaceAll("ÃƒÆ’Ã¢â‚¬Â°", "Ã‰")
    .replaceAll("ÃƒÆ’Ã‚Â", "Ã")
    .replaceAll("ÃƒÆ’Ã¢â‚¬Å“", "Ã“")
    .replaceAll("ÃƒÆ’Ã…Â¡", "Ãš")
    .replaceAll("ÃƒÆ’Ã‚Â±", "Ã±")
    .replaceAll("ÃƒÆ’Ã¢â‚¬Ëœ", "Ã‘")
    .replaceAll("ÃƒÆ’Ã‚Â¼", "Ã¼")
    .replaceAll("ÃƒÆ’Ã…â€œ", "Ãœ")
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
    .replaceAll("Ã‚Â¨", "Â¨")
    .replaceAll("Ã‚", "")
    .replaceAll("\n", " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Convierte cualquier valor de coordenada a numero y devuelve un fallback si no es valido.
function parseCoordinate(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

// Leaflet falla si recibe posiciones invalidas, asi que filtramos cualquier punto incompleto.
function isValidPosition(position) {
  return (
    Array.isArray(position) &&
    position.length === 2 &&
    Number.isFinite(position[0]) &&
    Number.isFinite(position[1])
  );
}

// Transforma el GeoJSON de la ruta a una estructura mas simple para la vista:
// nombre, imagen, direccion, horario, telefono y posicion lista para Leaflet.
const gastronomicPlaces = (rutaGastronomica.features ?? [])
  .map((feature) => {
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

    const name = sanitizeText(props.nombre) || "Parada gastronomica";
    const branch = sanitizeText(props.sucursal);
    const image =
      sanitizeText(props["img.fuera"]) ||
      sanitizeText(props.logo) ||
      "/img/carrusel/groovelanddesigns-beans-4783866.jpg";

    return {
      id: props.fid,
      name: branch ? `${name} - Sucursal ${branch}` : name,
      position,
      description:
        sanitizeText(props.amenidades) ||
        sanitizeText(props["tipo de comda"]) ||
        "Parada gastronomica incluida en la ruta.",
      image,
      address: sanitizeText(props.direccion) || "Nezahualcoyotl, Estado de Mexico",
      menu: sanitizeText(props.menu),
      phone: sanitizeText(props.telefono),
      hours: sanitizeText(props.horario),
      social: sanitizeText(props["redes sociales"]),
      foodType: sanitizeText(props["tipo de comda"]),
    };
  })
  .filter(Boolean);

// Crea el marcador visual personalizado para cada punto de la ruta.
function createPin() {
  return divIcon({
    className: "",
    html: `
      <div style="
        width: 110px;
        height: 110px;
        position: relative;
        filter: drop-shadow(0 8px 18px rgba(0,0,0,0.22));
      ">
        <img
          src="/img/iconos/punto-ruta.png"
          alt=""
          style="position:absolute; inset:0; width:110px; height:110px; object-fit:contain;"
        />
      </div>
    `,
    iconSize: [54, 54],
    iconAnchor: [27, 27],
  });
}

export default function MapaRutaGastronomica() {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Construye el enlace a Google Maps solo cuando hay un establecimiento seleccionado.
  const mapsUrl = selectedPlace
    ? `https://www.google.com/maps/search/?api=1&query=${selectedPlace.position[0]},${selectedPlace.position[1]}`
    : "#";

  return (
    <section className="relative isolate -mx-4 -mt-8 h-[calc(100vh-5rem)] overflow-hidden bg-[#F4E4D5] md:mx-0 md:rounded-[32px]">
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
          {/* Renderiza un marcador por cada punto valido del archivo de ruta. */}
          {gastronomicPlaces
            .filter((place) => isValidPosition(place.position))
            .map((place) => (
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
          <div
            className={`overflow-hidden transition-all duration-300 ${
              selectedPlace
                ? "pointer-events-none mt-0 max-h-0 opacity-0"
                : "pointer-events-auto mt-0 max-h-[160px] opacity-100"
            }`}
          >
            {/* Esta cabecera se oculta cuando se abre un punto para dar mas espacio a la ficha. */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,248,240,0.94))] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.10)] backdrop-blur-sm">
              <div className="absolute right-[-10px] top-[-10px] h-16 w-16 rounded-full bg-[#ffd175]/25" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-[#fff1cf] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8D6B10] shadow-[inset_0_0_0_1px_rgba(141,107,16,0.08)]">
                    Ruta Gastronomica
                  </span>
                  <h1 className="mt-2 text-[16px] font-bold leading-tight text-[#611232]">
                    Mapa del recorrido
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
            </div>
          </div>
        </div>

        <div className="mt-auto px-5 pb-24">
          {selectedPlace ? (
            <>
              {/* La ficha inferior muestra el detalle del establecimiento activo. */}
              <div className="pointer-events-auto max-h-[calc(100vh-7.5rem)] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)] md:ml-auto md:max-h-[calc(100vh-6rem)] md:max-w-[780px]">
                <div className="max-h-[calc(100vh-7.5rem)] overflow-y-auto md:grid md:max-h-[calc(100vh-6rem)] md:grid-cols-[300px_minmax(0,1fr)]">
                  <div className="relative h-[155px] overflow-hidden md:h-full md:min-h-[320px]">
                    <img
                      src={selectedPlace.image}
                      alt={selectedPlace.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent md:bg-gradient-to-r md:from-black/10 md:to-transparent" />
                    <button
                      type="button"
                      onClick={() => setSelectedPlace(null)}
                      aria-label="Cerrar ficha"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#7A0F35] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4 p-5 md:flex md:flex-col md:justify-between md:p-7">
                    <div>
                      {selectedPlace.foodType ? (
                        <span className="inline-flex rounded-full bg-[#fff1cf] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8D6B10]">
                          {selectedPlace.foodType}
                        </span>
                      ) : null}

                      <h2 className="mt-3 text-[16px] font-bold leading-5 text-[#23171C] md:text-[24px] md:leading-7">
                        {selectedPlace.name}
                      </h2>
                      <p className="mt-2 text-[12px] text-[#7D6870] md:text-[13px]">
                        • {selectedPlace.address}
                      </p>

                      <p className="mt-4 text-[13px] leading-6 text-[#5F4B52] md:text-[14px]">
                        {selectedPlace.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {selectedPlace.hours || selectedPlace.phone ? (
                        <div className="grid gap-2 text-[12px] text-[#7D6870] md:grid-cols-2 md:gap-3 md:text-[13px]">
                          {selectedPlace.hours ? (
                            <div className="rounded-[18px] bg-[#f8f3f1] px-4 py-3">
                              <p className="font-semibold text-[#611232]">Horario</p>
                              <p className="mt-1">{selectedPlace.hours}</p>
                            </div>
                          ) : null}
                          {selectedPlace.phone ? (
                            <div className="rounded-[18px] bg-[#f8f3f1] px-4 py-3">
                              <p className="font-semibold text-[#611232]">Telefono</p>
                              <p className="mt-1">{selectedPlace.phone}</p>
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="flex gap-3 md:pt-2">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-full bg-[#611232] px-4 py-3 text-center text-[13px] font-bold text-white md:text-[14px]"
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
                          className="rounded-full bg-[#F5F1F2] px-5 py-3 text-[13px] font-bold text-[#3F3136] md:text-[14px]"
                        >
                          Ver mas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
