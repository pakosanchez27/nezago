import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventBySlug } from "../data/eventsData";

export default function DetalleEvento() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const event = getEventBySlug(slug);
  const initialInterestedCount = Number.parseInt(event?.interested ?? "0", 10) || 0;
  const [isAttending, setIsAttending] = useState(false);
  const interestedCount = initialInterestedCount + (isAttending ? 1 : 0);
  const mapsUrl = event?.coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${event.coordinates[0]},${event.coordinates[1]}`
    : null;
  const mapEmbedUrl = event?.coordinates
    ? `https://www.google.com/maps?q=${event.coordinates[0]},${event.coordinates[1]}&z=15&output=embed`
    : null;

  if (!event) {
    return (
      <section className="space-y-6 pb-8">
        <div className="rounded-[28px] border border-[#611232]/8 bg-white p-6 shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
          <h1 className="text-[32px] font-bold text-[#611232]">
            Evento no encontrado
          </h1>
          <p className="mt-4 text-[15px] leading-6 text-[#5F4B52]">
            El evento que intentaste abrir no esta disponible.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#611232] px-4 py-3 text-[14px] font-bold text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Regresar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 pb-8">
      <div className="relative -mx-4 -mt-8 overflow-hidden rounded-b-[34px] bg-[#1c0d18] md:mx-0 md:rounded-[34px]">
        <div className="relative h-[360px] md:h-[440px]">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,8,14,0.18)_0%,rgba(58,11,28,0.12)_42%,rgba(255,255,255,0.96)_100%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-7 pt-5 md:px-7 md:pb-8">
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-full bg-[#ffd175] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7b5200]">
                {event.availability}
              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Regresar"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-[20px] text-white backdrop-blur-sm"
              >
                &larr;
              </button>
            </div>

            <div className="max-w-[560px] text-[#611232]">
              <h1 className="text-[40px] font-bold leading-[0.98] md:text-[56px]">
                {event.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded-[22px] bg-white p-4 shadow-[0_12px_28px_rgba(97,18,50,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B8890]">
            Fecha
          </p>
          <p className="mt-2 text-[18px] font-bold text-[#2c1c23]">{event.date}</p>
        </article>

        <article className="rounded-[22px] bg-white p-4 shadow-[0_12px_28px_rgba(97,18,50,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B8890]">
            Hora
          </p>
          <p className="mt-2 text-[18px] font-bold text-[#2c1c23]">{event.time}</p>
        </article>

        <article className="rounded-[22px] bg-white p-4 shadow-[0_12px_28px_rgba(97,18,50,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B8890]">
            Ubicacion
          </p>
          <p className="mt-2 text-[18px] font-bold text-[#2c1c23]">{event.location}</p>
        </article>
      </div>

      <section className="rounded-[28px] bg-white p-5 shadow-[0_14px_32px_rgba(97,18,50,0.06)] md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#611232] text-[11px] font-bold text-white">
                N
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FFD175] text-[11px] font-bold text-[#6A4B00]">
                G
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#23171C] text-[11px] font-bold text-white">
                +
              </span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#3f3136]">
                {interestedCount}+ personas interesadas
              </p>
              <p className="text-[12px] text-[#8B7B81]">
                Confirma si planeas asistir a este evento
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAttending((current) => !current)}
            className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[14px] font-bold transition ${
              isAttending
                ? "bg-[#f6eef1] text-[#611232] shadow-[inset_0_0_0_1px_rgba(97,18,50,0.12)]"
                : "bg-[#611232] text-white shadow-[0_14px_28px_rgba(97,18,50,0.18)] hover:translate-y-[-1px]"
            }`}
          >
            {isAttending ? "Asistencia confirmada" : "Asistire"}
          </button>
        </div>

        <h2 className="mt-6 text-[28px] font-bold text-[#23171C]">
          {event.aboutTitle}
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#5F4B52]">
          {event.description}
        </p>
      </section>

      <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_14px_32px_rgba(97,18,50,0.06)]">
        <div className="h-[180px] bg-[#d7e7bd]">
          {mapEmbedUrl ? (
            <iframe
              title={`Mapa de ${event.location}`}
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <img
              src={event.mapImage}
              alt={`Mapa de ${event.location}`}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-[22px] font-bold text-[#2C1C23]">{event.mapTitle}</p>
            <p className="mt-1 text-[14px] text-[#75646B]">{event.mapSubtitle}</p>
          </div>

          <a
            href={mapsUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f0f2] text-[#611232]"
          >
            <img
              src="/img/iconos/directions.svg"
              alt=""
              className="h-5 w-5 brightness-0 saturate-100"
            />
          </a>
        </div>
      </section>
    </section>
  );
}
