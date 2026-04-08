import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardGeneral from "../components/CardGeneral";

export default function HistoriaNezahualcoyotl() {
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

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
  ];

  const timelineSlides = [
    {
      id: "origenes",
      items: [
        {
          label: "Ayer",
          image: "/img/portada-historia.png",
          alt: "Nezahualcoyotl en el pasado",
          tint: "bg-[#611232]",
          grayscale: true,
          align: "left-3",
        },
        {
          label: "Hoy",
          image: "/img/playlist.png",
          alt: "Nezahualcoyotl en la actualidad",
          tint: "bg-[#A87C14]",
          grayscale: false,
          align: "right-3",
        },
      ],
    },
    {
      id: "memoria",
      items: [
        {
          label: "Ayer",
          image: "/img/eventos/evento1.jpg",
          alt: "Memoria visual de Nezahualcoyotl",
          tint: "bg-[#611232]",
          grayscale: true,
          align: "left-3",
        },
        {
          label: "Hoy",
          image: "/img/eventos/evento2.jpg",
          alt: "Vista actual de Nezahualcoyotl",
          tint: "bg-[#A87C14]",
          grayscale: false,
          align: "right-3",
        },
      ],
    },
    {
      id: "ciudad",
      items: [
        {
          label: "Ayer",
          image: "/img/eventos/evento3.jpg",
          alt: "Registro historico de la ciudad",
          tint: "bg-[#611232]",
          grayscale: true,
          align: "left-3",
        },
        {
          label: "Hoy",
          image: "/img/eventos/evento4.jpg",
          alt: "Imagen contemporanea de la ciudad",
          tint: "bg-[#A87C14]",
          grayscale: false,
          align: "right-3",
        },
      ],
    },
  ];

  const handleTimelineScroll = () => {
    const container = timelineRef.current;

    if (!container) {
      return;
    }

    const firstSlide = container.firstElementChild;

    if (!firstSlide) {
      return;
    }

    const slideWidth = firstSlide.clientWidth + 4;
    const nextIndex = Math.round(container.scrollLeft / slideWidth);

    setActiveTimelineIndex(
      Math.max(0, Math.min(nextIndex, timelineSlides.length - 1)),
    );
  };

  return (

    <>
      <section className="space-y-8 mb-8">
        <div className="relative -mx-4 -mt-8 h-[250px] overflow-hidden rounded-b-[32px] bg-black md:mx-0">
          <img
            src="/img/portada-historia.png"
            alt="Portada historica de Nezahualcoyotl"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.48)),radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_38%)]" />

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
                Raices urbanas
              </p>
              <h1 className="mt-2 text-[42px] font-bold leading-[1.02] text-white">
                Nuestra Identidad
              </h1>
            </div>
          </div>
        </div>

      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between">
          <h2>Datos Historicos</h2>
          <Link
            to="/historia-de-nezahualcoyotl/datos-historicos"
            className="text-neza-primary"
          >
            Ver mas
          </Link>
        </div>

        <div
          className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {historicalFacts.map((fact) => (
            <CardGeneral key={fact.title} item={fact} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div>
          <h2>El paso del tiempo</h2>
          <p className="btn-text">Desliza a la derecha para ver la transformacion de Neza</p>
        </div>
        <div className="mt-5">
          <div
            ref={timelineRef}
            onScroll={handleTimelineScroll}
            className="flex gap-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {timelineSlides.map((slideGroup) => (
              <div
                key={slideGroup.id}
                className="flex w-full shrink-0 snap-start gap-1"
              >
                {slideGroup.items.map((slide) => (
                  <article
                    key={slide.label}
                    className="relative h-[165px] w-[160px] shrink-0 overflow-hidden rounded-[22px] bg-black"
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className={`h-full w-full object-cover ${
                        slide.grayscale ? "grayscale" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 ${slide.align} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white ${slide.tint}`}
                    >
                      {slide.label}
                    </span>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {timelineSlides.map((slide, index) => (
              <span
                key={slide.label}
                className={`rounded-full transition-all duration-300 ${
                  index === activeTimelineIndex
                    ? "h-[3px] w-6 bg-[#A87C14]"
                    : "h-[3px] w-2 bg-[#E5D7DB]"
                }`}
              />
            ))}
          </div>
        </div>

      </section>

    </>
  );
}
