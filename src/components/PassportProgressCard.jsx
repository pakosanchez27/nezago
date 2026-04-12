export default function PassportProgressCard({
  visitedCount,
  totalCount,
  level = "Master",
}) {
  const percent = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

  return (
    <section className="rounded-[28px] bg-[#f5d9d7] p-5 shadow-[0_14px_34px_rgba(97,18,50,0.08)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-bold leading-none text-[#611232] md:text-[44px]">
            Mi Pasaporte
          </h1>
          <p className="mt-3 max-w-[180px] text-[16px] leading-6 text-[#6e5a61]">
            Porcentaje de Exploracion
          </p>
        </div>

        <span className="inline-flex rounded-full bg-[#ffc25a] px-4 py-2 text-[15px] font-bold uppercase text-[#7a4e00]">
          {level}
        </span>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className="text-[60px] font-bold leading-none text-[#611232] md:text-[72px]">
          {percent}%
        </span>
        <span className="mb-2 text-[18px] font-semibold text-[#9b6200]">
          Completado
        </span>
      </div>

      <div className="mt-6 h-5 overflow-hidden rounded-full bg-white/45">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#6b1036_0%,#9f194f_55%,#f6b34c_100%)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-[15px] font-semibold text-[#6e5a61]">
        {visitedCount}/{totalCount} lugares
      </p>
    </section>
  );
}
