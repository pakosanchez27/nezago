import { Link } from "react-router-dom";

export default function RouteMapCallout() {
  return (
    <section className="overflow-hidden rounded-[28px] bg-[#611232] text-white shadow-[0_16px_34px_rgba(97,18,50,0.16)]">
      <div className="relative p-6 md:p-7">
        <div className="absolute right-[-20px] top-[-20px] h-36 w-36 rounded-full bg-white/8" />
        <div className="absolute bottom-[-30px] right-10 h-28 w-28 rounded-full border-[18px] border-[#ffd175]/30" />

        <div className="relative z-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#ffd175]">
            Ruta Gastronomica
          </p>
          <h2 className="mt-3 text-[28px] font-bold leading-tight text-white">
            Explora el mapa de la ruta
          </h2>
          <p className="mt-3 max-w-[440px] text-[15px] leading-6 text-white/82">
            Consulta ubicaciones, planea tu recorrido y descubre los puntos
            destacados de la ruta gastronomica en Neza.
          </p>

          <Link
            to="/ruta-gastronomica/mapa"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ffd175] px-5 py-3 text-[15px] font-bold text-[#6f4f00] transition hover:bg-[#ffc85f]"
          >
            Ir al mapa
          </Link>
        </div>
      </div>
    </section>
  );
}
