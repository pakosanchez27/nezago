import { Link } from "react-router-dom";

export default function Registro() {
  return (
    <section className="space-y-7">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8D6B10]">
          Nueva cuenta
        </p>
        <h2 className="mt-3 text-[38px] font-bold leading-[1] text-[#23171C]">
          Crea tu registro
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#6f6166]">
          Solo te tomara un momento empezar a usar NezaGo.
        </p>
      </div>

      <form className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-[#4b3940]">
            Nombre
          </span>
          <input
            type="text"
            placeholder="Tu nombre completo"
            className="h-14 w-full rounded-[18px] border border-[#eadde2] bg-[#fcf9f8] px-4 text-[15px] text-[#24181d] outline-none transition focus:border-[#611232] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-[#4b3940]">
            Telefono
          </span>
          <input
            type="tel"
            placeholder="55 0000 0000"
            className="h-14 w-full rounded-[18px] border border-[#eadde2] bg-[#fcf9f8] px-4 text-[15px] text-[#24181d] outline-none transition focus:border-[#611232] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-[#4b3940]">
            Email
          </span>
          <input
            type="email"
            placeholder="tu@email.com"
            className="h-14 w-full rounded-[18px] border border-[#eadde2] bg-[#fcf9f8] px-4 text-[15px] text-[#24181d] outline-none transition focus:border-[#611232] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-[#4b3940]">
            Password
          </span>
          <input
            type="password"
            placeholder="••••••••"
            className="h-14 w-full rounded-[18px] border border-[#eadde2] bg-[#fcf9f8] px-4 text-[15px] text-[#24181d] outline-none transition focus:border-[#611232] focus:bg-white"
          />
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#611232] px-5 py-4 text-[15px] font-bold text-white shadow-[0_14px_28px_rgba(97,18,50,0.18)] transition hover:translate-y-[-1px]"
        >
          Crear cuenta
        </button>
      </form>

      <p className="text-center text-[14px] text-[#6f6166]">
        ¿Ya tienes cuenta?{" "}
        <Link to="/auth/login" className="font-bold text-[#611232]">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
}
