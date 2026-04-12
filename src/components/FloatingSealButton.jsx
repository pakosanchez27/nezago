export default function FloatingSealButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-50 right-5 z-40 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#ffd175] text-[#611232] shadow-[0_12px_26px_rgba(97,18,50,0.22)] transition hover:scale-[1.03] md:bottom-8 md:right-8"
    >
      <img
        src="/img/iconos/sello.png"
        alt=""
        aria-hidden="true"
        className="h-5 w-5 object-contain"
      />
      <span className="mt-0.5 text-[9px] font-bold uppercase">Sellar</span>
    </button>
  );
}
