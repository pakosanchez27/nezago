import { Link } from "react-router-dom";
import StampCard from "./StampCard";

export default function StampGrid({ stamps }) {
  return (
    <section className="rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f6_100%)] p-5 shadow-[0_14px_34px_rgba(97,18,50,0.06)] md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-[28px] font-bold text-[#1f1318]">Tus Sellos</h2>
        <Link
          to="/ruta-gastronomica/mapa"
          className="text-[12px] font-semibold text-neza-primary"
        >
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {stamps.map((stamp, index) => (
          <StampCard key={`${stamp.name}-${index}`} stamp={stamp} index={index} />
        ))}
      </div>
    </section>
  );
}
