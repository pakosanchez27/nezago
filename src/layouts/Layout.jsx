import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";
import MobileSidebar from "../components/MobileSidebar";

const desktopNavItems = [
  { label: "Inicio", icon: "/img/iconos/home.svg", to: "/" },
  { label: "Mapa", icon: "/img/iconos/mapa.svg", to: "/mapa" },
  { label: "Eventos", icon: "/img/iconos/comedy_mask.svg", to: "/eventos" },
  { label: "Chat", icon: "/img/iconos/chat_bubble.svg", to: "/coyito" },
  {
    label: "Historia",
    icon: "/img/iconos/account_balance.svg",
    to: "/historia-de-nezahualcoyotl",
  },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const hideMobileMenu = location.pathname === "/coyito";

  return (
    <>
      <div
        className="min-h-screen bg-white bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: 'url("/img/fondos/fondo.png")' }}
      >
        <header className="bg-neza-primary px-4 py-2 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-sidebar"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition hover:bg-white/10"
            >
              <span className="h-1 w-8 rounded-full bg-white" />
              <span className="h-1 w-8 rounded-full bg-white" />
              <span className="h-1 w-8 rounded-full bg-white" />
            </button>

            <Link to="/" className="m-0 text-3xl font-bold text-white">
              NezaGo!
            </Link>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-400 text-sm font-semibold text-[#6f1238]">
              NG
            </div>
          </div>
        </header>

        <div className="hidden w-full p-4 md:block">
          <div className="grid min-h-[calc(100vh-32px)] grid-cols-[224px_minmax(0,1fr)] gap-4 rounded-[28px] bg-white p-4 shadow-[0_20px_60px_rgba(97,18,50,0.08)]">
            <aside className="flex h-full flex-col rounded-[24px] bg-[#faf7f6] px-5 py-6">
              <Link to="/" className="block border-b border-[#eee4e7] pb-5">
                <p className="text-4xl font-bold text-neza-primary">NezaGo!</p>

              </Link>

              <nav aria-label="Navegacion principal" className="mt-4 space-y-0.5">
                {desktopNavItems.map(({ label, icon, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-[14px] px-3.5 py-2 text-[13px] font-medium transition ${
                        isActive
                          ? "bg-white text-neza-primary shadow-[0_10px_22px_rgba(97,18,50,0.10)]"
                          : "text-[#7a6870] hover:bg-white/80 hover:text-neza-primary"
                      }`
                    }
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 bg-current"
                      style={{
                        WebkitMask: `url('${icon}') center / contain no-repeat`,
                        mask: `url('${icon}') center / contain no-repeat`,
                      }}
                    />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <div className="rounded-[18px] bg-white p-3 shadow-[0_8px_20px_rgba(97,18,50,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd175] text-xs font-bold text-[#6f4f00]">
                      NG
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#41212d]">
                        Curador Local
                      </p>
                      <p className="text-[11px] text-[#9a8088]">NezaGo!</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 rounded-[24px] bg-white px-3 py-2 lg:px-4 lg:py-3">
       

              <main className="pb-4">
                <Outlet />
              </main>
            </div>
          </div>
        </div>

        <main
          className={`mx-auto max-w-7xl px-4 py-8 md:hidden ${
            hideMobileMenu ? "pb-8" : "pb-[116px]"
          }`}
        >
          <Outlet />
        </main>
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {!hideMobileMenu ? <MobileMenu /> : null}
      </div>
    </>
  );
}
