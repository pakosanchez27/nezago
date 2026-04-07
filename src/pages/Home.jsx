export default function Home() {
  return (
    <>
    <section
      className="relative -mx-4 -mt-8 h-[330px] overflow-hidden bg-neza-primary md:mx-0"
      aria-label="Seccion principal"
    >
      <img
        src="/img/fondos/Vector.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="relative z-10 flex flex-col h-full justify-start px-6 py-6">
        <div className="text-sm font-medium text-white bg-neza-secondary-b px-4 py-2 rounded-2xl w-max mb-2 flex justify-between items-center gap-2">
          <span>BIENVENIDO DE VUELTA</span>
        </div>
        <h1 className="text-white">Bienvenido a NezaGo!</h1>
        <p className=" text-white">Tu viaje urbano continúa hoy.</p>
      </div>
    </section>
    <section className="carrusel">
        hola
    </section>
    </>
  );
}
