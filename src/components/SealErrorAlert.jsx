export default function SealErrorAlert({
  isOpen,
  onClose,
  eyebrow = "Error",
  title = "Intenta de nuevo",
  message = "Ocurrio un problema al validar el codigo.",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
      <button
        type="button"
        aria-label="Cerrar alerta de error"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="seal-alert-pop relative z-10 w-full max-w-sm rounded-[30px] bg-white px-6 py-7 text-center shadow-[0_28px_64px_rgba(0,0,0,0.24)]">
        <div className="mx-auto flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-[#fde4e6] shadow-[inset_0_0_0_10px_rgba(191,52,84,0.12)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9f194f] text-[34px] font-bold text-white">
            !
          </div>
        </div>

        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9f194f]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-[28px] font-bold leading-tight text-[#611232]">
          {title}
        </h2>
        <p className="mt-3 text-[14px] leading-6 text-[#6b5b61]">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex rounded-full bg-[#611232] px-5 py-3 text-[14px] font-bold text-white"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
