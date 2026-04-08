import { useNavigate } from "react-router-dom";
import CardGeneral from "../components/CardGeneral";

export default function DatosHistoricos() {
  const navigate = useNavigate();

  const historicalFacts = [
    {
      image: "/img/portada-historia.png",
      category: "Historia",
      title: "Los origenes urbanos de Nezahualcoyotl",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/portada-historia.png",
      category: "Memoria",
      title: "La transformacion del territorio y sus barrios",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/portada-historia.png",
      category: "Cultura",
      title: "Tradiciones populares que dieron identidad a Neza",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/portada-historia.png",
      category: "Ciudad",
      title: "Momentos clave en el crecimiento de la ciudad",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/eventos/evento1.jpg",
      category: "Archivo",
      title: "Primeras memorias visuales del territorio",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/eventos/evento2.jpg",
      category: "Barrio",
      title: "La vida cotidiana en la consolidacion de Neza",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/eventos/evento3.jpg",
      category: "Patrimonio",
      title: "Espacios que marcaron la memoria colectiva",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
    {
      image: "/img/eventos/evento4.jpg",
      category: "Identidad",
      title: "Hechos que formaron el caracter de la ciudad",
      to: "/historia-de-nezahualcoyotl/detalle",
    },
  ];

  return (
    <section className="space-y-6 pb-8">
      <div className="relative -mx-4 -mt-8 h-[220px] overflow-hidden rounded-b-[32px] bg-black md:mx-0">
        <img
          src="/img/portada-historia.png"
          alt="Datos historicos"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.56))]" />
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
              Archivo urbano
            </p>
            <h1 className="mt-2 text-[36px] font-bold leading-[1.02] text-white">
              Datos Historicos
            </h1>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 justify-center">
        {historicalFacts.map((fact) => (
          <CardGeneral key={fact.title} item={fact} />
        ))}
      </section>
    </section>
  );
}
