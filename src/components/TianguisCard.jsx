import { Link } from "react-router-dom";

export default function TianguisCard({ tianguis }) {
  return (
    <Link
      to="/tianguis-de-hoy"
      className="group relative flex h-[250px] w-[300px] shrink-0 flex-col overflow-hidden rounded-[30px] border border-[#F1E7EA] bg-[linear-gradient(180deg,#ffffff_0%,#fff8f2_100%)] p-5 shadow-[0_18px_40px_rgba(97,18,50,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(97,18,50,0.12)] md:h-full md:w-full"
    >
      <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-[#FFD175]/20" />
      <div className="absolute bottom-[-28px] left-[-18px] h-24 w-24 rounded-full bg-[#611232]/6" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex rounded-full bg-[#fff1cf] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8D6B10]">
            Tianguis de hoy
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#611232] shadow-[0_10px_22px_rgba(97,18,50,0.16)]">
            <img
              src="/img/iconos/tianguis.png"
              alt=""
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        <div className="mt-5 min-h-[56px]">
          <h3 className="text-[20px] font-bold leading-6 text-[#611232]">
            {tianguis.location}
          </h3>
        </div>



      </div>
    </Link>
  );
}
