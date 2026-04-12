import { Link } from "react-router-dom";

export default function QuickLinkCard({ to, label, icon, alt }) {
  return (
    <Link
      to={to}
      className="card flex w-[88px] flex-col items-center text-center md:w-full md:rounded-[24px] md:bg-white md:px-5 md:py-6 md:shadow-[0_10px_24px_rgba(97,18,50,0.10)]"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(97,18,50,0.10)] md:bg-[#f8f5f6] md:shadow-none">
        <span
          aria-label={alt}
          role="img"
          className="block h-8 w-8 bg-[#611232]"
          style={{
            WebkitMask: `url('${icon}') center / contain no-repeat`,
            mask: `url('${icon}') center / contain no-repeat`,
          }}
        />
      </div>
      <p className="text-btn mt-3 min-h-[32px] text-center font-bold leading-4 md:mt-4">
        {label}
      </p>
    </Link>
  );
}
