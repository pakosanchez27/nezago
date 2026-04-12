import { Link } from "react-router-dom";
import { featuredEvent, upcomingEvents } from "../data/eventsData";

const eventCategories = ["Todo", "Musica", "Cultura", "Gastronomia"];

export default function Eventos() {
  return (
    <>
      <section className="space-y-6">
        <article className="relative overflow-hidden rounded-[36px] shadow-[0_20px_44px_rgba(97,18,50,0.18)]">
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
            className="h-[520px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,10,16,0.02)_0%,rgba(55,12,28,0.22)_38%,rgba(97,18,50,0.88)_100%)]" />

          <div className="absolute left-5 top-5">
            <span className="inline-flex rounded-full bg-[#ffd175] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#7b5200]">
              Destacado
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-2 text-[13px] font-semibold backdrop-blur-sm">
              <img
                src="/img/iconos/confirmation_number.svg"
                alt=""
                className="h-4 w-4 brightness-0 invert"
              />
              <span>{featuredEvent.scheduleLabel}</span>
            </div>

            <h1 className="mt-4 max-w-[260px] text-[23px] font-bold leading-[1.05] text-white">
              {featuredEvent.title}
            </h1>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-[15px] text-white/90">
                <span className="text-[16px]">*</span>
                <span>{featuredEvent.location}</span>
              </div>

              <Link
                to={`/eventos/${featuredEvent.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-[#ffd175] px-6 py-4 text-[16px] font-bold text-[#6f4f00] shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              >
                {featuredEvent.cta}
              </Link>
            </div>
          </div>
        </article>

        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {eventCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`inline-flex shrink-0 items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold transition ${
                index === 0
                  ? "bg-[#611232] text-white shadow-[0_12px_22px_rgba(97,18,50,0.22)]"
                  : "bg-white text-[#6d5f65] shadow-[0_10px_20px_rgba(97,18,50,0.06)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[28px] font-bold text-[#611232]">Proximos Eventos</h2>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.slug}
              className="overflow-hidden rounded-[34px] bg-white shadow-[0_18px_34px_rgba(97,18,50,0.10)]"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-[240px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(97,18,50,0.04)_0%,rgba(97,18,50,0.26)_100%)]" />
                <span className="absolute left-4 top-4 inline-flex rounded-full bg-[#ffd175] px-3 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-[#7b5200]">
                  {event.scheduleLabel}
                </span>
              </div>

              <div className="space-y-3 px-5 pb-6 pt-5">
                <h3 className="text-[20px] font-bold leading-tight text-[#2b2125]">
                  {event.title}
                </h3>

                <div className="flex items-start gap-2 text-[14px] text-[#7f6d73]">
                  <span className="mt-0.5 text-[14px] text-[#8D6B10]">*</span>
                  <span>{event.location}</span>
                </div>

                <p className="text-[16px] font-bold text-[#611232]">{event.price}</p>

                <Link
                  to={`/eventos/${event.slug}`}
                  className="ml-auto inline-flex w-fit items-center justify-center rounded-full bg-[#611232] px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_rgba(97,18,50,0.16)] transition hover:translate-y-[-1px]"
                >
                  Mas info
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
