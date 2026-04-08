import { Link } from "react-router-dom";

export default function TianguisCard({ tianguis }) {
  return (
    <Link
      to="/tianguis-de-hoy"
      className="flex h-[230px] w-[300px] shrink-0 flex-col rounded-[28px] border border-[#F1E7EA] bg-white p-5 shadow-[0_18px_40px_rgba(97,18,50,0.08)]"
    >
      <div className="min-h-[48px]">
        <h3 className="text-[18px] font-bold leading-6 text-[#611232]">
          {tianguis.title}
        </h3>
      </div>

      <div className="mt-5 flex-1 space-y-3 text-[15px] text-[#5F4B52]">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full border border-[#611232]" />
          <span>{tianguis.schedule}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-[#611232]" />
          <span>{tianguis.location}</span>
        </div>
      </div>

      <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FFD175] px-4 py-3 text-[15px] font-bold uppercase text-[#7A5A00]">
        Ver en mapa
      </span>
    </Link>
  );
}
