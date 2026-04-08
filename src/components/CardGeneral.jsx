import { Link } from "react-router-dom";

export default function CardGeneral({ item, event, to }) {
  const card = item ?? event;
  const target = to ?? card?.to ?? "/eventos";

  return (
    <div className="cars-eventos mt-4">
      <Link
        to={target}
        className="card-evento group flex h-[198px] w-[300px] flex-col overflow-hidden rounded-[24px] border border-[#611232]/8 bg-white shadow-[0_14px_34px_rgba(97,18,50,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(97,18,50,0.12)]"
      >
        <div className="relative h-28 w-full shrink-0 overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 items-end justify-between gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#8C6D78]">
              {card.category}
            </p>
            <p className="mt-1 text-[14px] font-bold leading-5 text-black">
              {card.title}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F8EEF1] text-xl leading-none text-[#611232] transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
}
