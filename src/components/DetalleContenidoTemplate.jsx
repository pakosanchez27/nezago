import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetalleContenidoTemplate({ data }) {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);

  const {
    tipo,
    fecha,
    titulo,
    portada,
    introduccion,
    desarrollo = [],
    galeria = [],
  } = data;

  const [imagenPrincipal, ...imagenesSecundarias] = galeria;

  return (
    <section className="mb-8 space-y-6">
      <div className="relative -mx-4 -mt-8 h-[260px] overflow-hidden rounded-b-[32px] bg-[#611232] md:mx-0">
        <img
          src={portada}
          alt={titulo}
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(97,18,50,0.78))]" />
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
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#FFD175]">
              {tipo}
            </p>
            {fecha ? (
              <p className="mt-2 inline-flex rounded-full bg-black/20 px-3 py-1 text-[12px] text-white/90 backdrop-blur-sm">
                {fecha}
              </p>
            ) : null}
          </div>

          <div>
            <h1 className="mt-2 text-[36px] font-bold leading-[1.02] text-white">
              {titulo}
            </h1>
          </div>
        </div>
      </div>

      {introduccion ? (
        <section className="rounded-[28px] border border-[#611232]/8 bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
          <h2>Introduccion</h2>
          <p className="mt-4">{introduccion}</p>
        </section>
      ) : null}

      {desarrollo.length > 0 ? (
        <section className="rounded-[28px] bg-[#611232] p-5 text-white shadow-[0_16px_36px_rgba(97,18,50,0.16)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#FFD175]">
            Desarrollo
          </p>
          <div className="mt-4 space-y-4">
            {desarrollo.map((parrafo) => (
              <p key={parrafo} className="text-white/88">
                {parrafo}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {imagenPrincipal ? (
        <section className="space-y-4">
          <h2>Galeria</h2>
          <button
            type="button"
            onClick={() => setActiveImage(imagenPrincipal)}
            className="block w-full"
          >
            <img
              src={imagenPrincipal}
              alt={titulo}
              className="h-[220px] w-full rounded-[26px] object-cover"
            />
          </button>
          {imagenesSecundarias.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {imagenesSecundarias.slice(0, 2).map((imagen) => (
                <button
                  key={imagen}
                  type="button"
                  onClick={() => setActiveImage(imagen)}
                  className="block w-full"
                >
                  <img
                    src={imagen}
                    alt={titulo}
                    className="h-[130px] w-full rounded-[22px] object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {activeImage ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 px-4">
          <button
            type="button"
            aria-label="Cerrar imagen"
            className="absolute inset-0"
            onClick={() => setActiveImage(null)}
          />
          <div className="relative z-10 w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/14 text-2xl text-white backdrop-blur-sm"
            >
              &times;
            </button>
            <img
              src={activeImage}
              alt="Vista ampliada de la galeria"
              className="max-h-[85vh] w-full rounded-[28px] object-contain bg-black"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
