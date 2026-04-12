import { Link, Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname.includes("/login");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,209,117,0.18),transparent_32%),linear-gradient(180deg,#fffdfb_0%,#f9f3f1_100%)] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[36px] border border-[#f2e8eb] bg-white shadow-[0_28px_70px_rgba(97,18,50,0.10)]">
        <aside className="relative hidden w-[42%] overflow-hidden bg-[#611232] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <img
            src="/img/fondos/Vector.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_36%)]" />

          <div className="relative z-10">
            <Link to="/" className="text-[40px] font-bold text-white">
              NezaGo!
            </Link>
            <p className="mt-8 inline-flex rounded-full bg-[#FFD175] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6A4B00]">
              Acceso seguro
            </p>
            <h1 className="mt-6 text-[48px] font-bold leading-[0.98]">
              {isLogin ? "Vuelve a tu recorrido" : "Crea tu cuenta"}
            </h1>
            <p className="mt-5 max-w-[360px] text-[17px] leading-7 text-white/88">
              {isLogin
                ? "Entra a tu cuenta para explorar eventos, rutas, cupones y recomendaciones dentro de NezaGo."
                : "Registrate para guardar tu progreso, usar Coyito y descubrir mejor tu ciudad."}
            </p>
          </div>

          <div className="relative z-10 rounded-[26px] bg-white/12 p-5 backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#FFD175]">
              Nezahualcoyotl
            </p>
            <p className="mt-3 text-[15px] leading-7 text-white/88">
              Tu app para moverte, descubrir cultura local y conectar con la vida urbana de Neza.
            </p>
          </div>
        </aside>

        <main className="flex w-full items-center justify-center px-5 py-8 sm:px-8 lg:w-[58%] lg:px-10">
          <div className="w-full max-w-[460px]">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="text-[34px] font-bold text-[#611232]">
                NezaGo!
              </Link>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
