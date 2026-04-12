import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="space-y-7">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8D6B10]">
          Bienvenido
        </p>
        <h2 className="mt-3 text-[38px] font-bold leading-[1] text-[#23171C]">
          Inicia sesion
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#6f6166]">
          Accede a tu cuenta para continuar explorando NezaGo.
        </p>
      </div>

      <form className="space-y-4">
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
          Entrar
        </button>
      </form>

      <p className="text-center text-[14px] text-[#6f6166]">
        ¿Aun no tienes cuenta?{" "}
        <Link to="/auth/registro" className="font-bold text-[#611232]">
          Registrate
        </Link>
      </p>
    </section>
  );
}
