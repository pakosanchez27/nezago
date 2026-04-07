import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";
import MobileSidebar from "../components/MobileSidebar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        <header className="bg-neza-primary px-4 py-2 shadow-sm">
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

            <Link to="/" className="m-0 text-3xl font-bold text-white md:text-5xl">
              NezaGo!
            </Link>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-400 text-sm font-semibold text-[#6f1238]">
              NG
            </div>
          </div>
        </header>

        <main className="px-4 py-8 pb-24 md:pb-8">
          <Outlet />
        </main>
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MobileMenu />
      </div>
    </>
  );
}
