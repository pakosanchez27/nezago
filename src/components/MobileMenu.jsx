import { Link, NavLink } from "react-router-dom";

const mobileMenuItems = [
  { to: "/mapa", label: "Mapa", icon: "/img/iconos/mapa.svg" },
  { to: "/pasaporte", label: "Pasaporte", icon: "/img/iconos/passport.svg" },
  { to: "/", label: "Inicio", icon: "/img/iconos/home.svg", featured: true },
  { to: "/cuponera", label: "Cupones", icon: "/img/iconos/cupon.svg" },
  { to: "/eventos", label: "Eventos", icon: "/img/iconos/comedy_mask.svg" },
];

export default function MobileMenu() {
  return (
    <div
      id="menu-mobile"
      className="fixed inset-x-0 bottom-0 z-50 block w-full md:hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-20 flex justify-end px-5">
        <Link
          to="/coyito"
          aria-label="Abrir chat de Coyito"
          className="pointer-events-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_14px_30px_rgba(97,18,50,0.18)] ring-4 ring-white/80 transition hover:-translate-y-1"
        >
          <img
            src="/img/iconos/coyito.png"
            alt="Coyito"
            className="h-14 w-14 rounded-full object-cover"
          />
        </Link>
      </div>

      <nav
        aria-label="Menu principal movil"
        className="w-full rounded-t-[2.25rem] bg-white px-3 pt-3 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.10)]"
      >
        <div className="grid w-full grid-cols-5 items-end gap-1">
          {mobileMenuItems.map(({ to, label, icon, featured }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex min-h-11 flex-col items-center justify-end py-1 text-center transition ${
                  featured ? "gap-1.5" : "gap-1"
                } ${isActive ? "text-[#795801]" : "text-[#7a736f]"}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`flex items-center justify-center transition ${
                    featured
                      ? isActive
                        ? "h-16 w-16 rounded-full bg-[#FFD175] text-[#795801] shadow-[0_6px_16px_rgba(255,209,117,0.38)]"
                        : "h-16 w-16 rounded-full"
                      : isActive
                        ? "h-16 min-w-[4.8rem] rounded-full bg-[#FFD175] px-2 text-[#795801] shadow-[0_6px_16px_rgba(255,209,117,0.38)]"
                        : "h-16 min-w-[4.8rem] rounded-full bg-transparent px-2"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={icon}
                      alt=""
                      className="h-6 w-6 brightness-0 opacity-55"
                    />
                    <span
                      className={`${
                        featured ? "text-sm font-bold" : "text-xs font-semibold"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
