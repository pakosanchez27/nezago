export default function Cupones() {
  const categories = [
    { label: "Restaurantes", icon: "/img/iconos/briefcase_meal.svg", active: true },
    { label: "Cafeterias", icon: "/img/iconos/chat_bubble.svg", active: false },
    { label: "Comercios", icon: "/img/iconos/local_mall.svg", active: false },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(255,209,117,0.14),transparent_36%),linear-gradient(180deg,#ffffff_0%,#faf7f6_100%)] p-6 shadow-[0_14px_34px_rgba(97,18,50,0.06)] md:p-8">
        <div className="max-w-[540px]">
          <h1 className="text-[34px] font-bold leading-[1.12] text-black md:text-[52px]">
            <span className="inline border-b-[4px] border-[#2a92ff]">Cupones y</span>
            <br />
            <span className="inline border-b-[4px] border-[#2a92ff]">
              Descuentos
            </span>
          </h1>

          <p className="mt-5 max-w-[470px] text-[18px] leading-8 text-[#8b8581] md:text-[20px]">
            Explora las mejores ofertas locales de Neza hoy.
          </p>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category.label}
              type="button"
              className={`inline-flex shrink-0 items-center gap-3 rounded-full px-5 py-4 text-[15px] font-semibold transition ${
                category.active
                  ? "bg-[#ffd175] text-[#7a5a00] shadow-[0_10px_20px_rgba(255,209,117,0.28)]"
                  : "bg-white text-[#8a8480] shadow-[0_10px_20px_rgba(97,18,50,0.05)]"
              }`}
            >
              <img
                src={category.icon}
                alt=""
                className={`h-5 w-5 brightness-0 ${
                  category.active ? "" : "opacity-60"
                }`}
              />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
