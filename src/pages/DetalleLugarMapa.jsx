import { useLocation, useNavigate } from "react-router-dom";

export default function DetalleLugarMapa() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const place = state?.place ?? {
    name: "Lugar de interes",
    category: "Punto destacado",
    image: "/img/eventos/evento1.jpg",
    address: "Nezahualcoyotl, Estado de Mexico",
    position: [19.4006, -99.0148],
    description:
      "Espacio de referencia para visualizar informacion detallada del punto seleccionado en el mapa.",
  };

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.position[0]},${place.position[1]}`;
  return (
    <section className="space-y-6 pb-8">
      <div className="relative -mx-4 -mt-8 h-[280px] overflow-hidden rounded-b-[32px] bg-black md:mx-0">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.62))]" />

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
        <h2>Datos del comercio</h2>
        <p className="mt-4 text-[15px] leading-6 text-[#5F4B52]">
          {place.description}
        </p>
      </section>

      <section className="rounded-[28px] bg-[#611232] p-5 text-white shadow-[0_16px_36px_rgba(97,18,50,0.16)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#FFD175]">
          Direccion
        </p>
        <p className="mt-3 text-[16px] leading-6 text-white/90">{place.address}</p>

        <div className="mt-6">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#FFD175] px-4 py-3 text-[14px] font-bold text-[#6A4B00]"
          >
            ¿Como llegar?
          </a>
        </div>
      </section>
    </section>
  );
}
