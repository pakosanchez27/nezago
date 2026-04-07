import { NavLink } from "react-router-dom";

const sidebarItems = [
  { label: "Inicio", icon: "/img/iconos/home.svg", to: "/" },
  { label: "Pasaporte", icon: "/img/iconos/passport.svg", to: "/pasaporte" },
  { label: "Ruta Gastronomica", icon: "/img/iconos/briefcase_meal.svg", to: "/ruta-gastronomica" },
  { label: "Cuponera", icon: "/img/iconos/confirmation_number.svg", to: "/cuponera" },
  { label: "Eventos", icon: "/img/iconos/comedy_mask.svg", to: "/eventos" },
  { label: "Mapa de Nezahualcoyotl", icon: "/img/iconos/mapa.svg", to: "/mapa" },
  { label: "Historia de Nezahualcoyotl", icon: "/img/iconos/account_balance.svg", to: "/historia-de-nezahualcoyotl" },
  { label: "Rutas de Transporte", icon: "/img/iconos/directions.svg", to: "/rutas-de-transporte" },
  { label: "Tianguis de hoy", icon: "/img/iconos/local_mall.svg", to: "/tianguis-de-hoy" },
  { label: "Chat Bot", icon: "/img/iconos/chat_bubble.svg", to: "/chat" },
];

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Cerrar menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        id="mobile-sidebar"
        className={`relative h-full w-[min(85vw,20rem)] overflow-hidden rounded-br-[3rem] bg-[#6f1238] text-white shadow-2xl transition-transform duration-300 ease-out md:w-[22rem] lg:w-[24rem] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu lateral"
      >
        <div className="flex items-center justify-between border-b border-[#8f3a5c] px-6 py-5">
          <span className="text-2xl font-bold text-white">NezaGo!</span>
          <button
            type="button"
            aria-label="Cerrar menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-4xl leading-none text-white transition hover:bg-white/10"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <nav aria-label="Opciones del menu" className="py-1">
          {sidebarItems.map(({ label, icon, to }) => {
            const itemClassName =
              "flex w-full items-center gap-3 border-b border-[#8f3a5c] px-6 py-3 text-left text-xl transition";

            return (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `${itemClassName} ${
                    isActive ? "bg-[#b78ea0]" : "hover:bg-white/10"
                  }`
                }
              >
                <img src={icon} alt="" className="h-6 w-6 brightness-0 invert" />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
