export default function SealSuccessAlert({ isOpen, stampName, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
      <button
        type="button"
        aria-label="Cerrar alerta"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="seal-alert-pop relative z-10 w-full max-w-sm rounded-[30px] bg-white px-6 py-7 text-center shadow-[0_28px_64px_rgba(0,0,0,0.24)]">
        <div className="mx-auto flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-[#fff1cf] shadow-[inset_0_0_0_10px_rgba(255,209,117,0.35)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#611232]">
            <img
              src="/img/iconos/sello.png"
              alt=""
              aria-hidden="true"
              className="h-7 w-7 object-contain brightness-0 invert"
            />
          </div>
        </div>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8D6B10]">
          Sello desbloqueado
        </p>
        <h2 className="mt-2 text-[28px] font-bold leading-tight text-[#611232]">
          Listo
        </h2>
        <p className="mt-3 text-[14px] leading-6 text-[#6b5b61]">
          El establecimiento <span className="font-bold text-[#31131f]">{stampName}</span>{" "}
          ya fue agregado a tu pasaporte.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex rounded-full bg-[#611232] px-5 py-3 text-[14px] font-bold text-white"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
