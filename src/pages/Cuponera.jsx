import { useState } from "react";

function CouponQrModal({ coupon, onClose }) {
  if (!coupon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1f1318]/55 px-4 pb-28 pt-4 backdrop-blur-[2px] sm:items-center sm:p-6">
      <div className="max-h-[calc(100vh-8.5rem)] w-full max-w-[560px] overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] md:max-h-[90vh] md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8D6B10]">
              Cupon activo
            </p>
            <h2 className="mt-2 text-[28px] font-bold leading-tight text-[#003b17]">
              {coupon.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6f1f2] text-[24px] leading-none text-[#611232]"
          >
            &times;
          </button>
        </div>

        <div className="mt-5 rounded-[28px] border border-[#efe6e9] bg-[linear-gradient(180deg,#fffdf8_0%,#fff_100%)] p-5 text-center shadow-[inset_0_0_0_1px_rgba(97,18,50,0.03)]">
          <p className="text-[15px] font-semibold text-[#6b5b61]">
            Muestra este codigo en caja para aplicar tu descuento
          </p>
          <div className="mx-auto mt-5 flex w-fit flex-col items-center rounded-[24px] bg-white p-4 shadow-[0_16px_30px_rgba(97,18,50,0.08)]">
            <img
              src={coupon.qrImage}
              alt={`QR del cupon de ${coupon.title}`}
              className="h-[220px] w-[220px] object-contain"
            />
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8D6B10]">
              {coupon.discount} {coupon.badge}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[24px] bg-[#faf6f7] p-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#611232]">
            Terminos y condiciones
          </p>
          <ul className="mt-3 space-y-2 text-[14px] leading-6 text-[#5c4d53]">
            {coupon.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Cuponera() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const categories = [
    { label: "Restaurantes", icon: "/img/iconos/briefcase_meal.svg", active: true },
    { label: "Cafeterias", icon: "/img/iconos/chat_bubble.svg", active: false },
    { label: "Comercios", icon: "/img/iconos/local_mall.svg", active: false },
  ];

  const coupons = [
    {
      title: "Tacos los Primos",
      description: "Cupon valido para compras mayores a 200 mxn en consumo local.",
      discount: "-20%",
      badge: "Descuento",
      expiresIn: "Vence en 2 dias",
      qrImage: "/img/qr-code.png",
      terms: [
        "Valido en compras mayores a $200 MXN.",
        "Aplica unicamente en consumo dentro del establecimiento.",
        "No acumulable con otras promociones.",
        "Vigente hasta la fecha indicada en el cupon.",
      ],
    },
    {
      title: "Cafeteria Aurora",
      description: "Disfruta una promocion especial en bebidas y pan artesanal.",
      discount: "-15%",
      badge: "Descuento",
      expiresIn: "Vence en 4 dias",
      qrImage: "/img/qr-code.png",
      terms: [
        "Promocion valida en bebidas seleccionadas y pan artesanal.",
        "Limitado a un canje por usuario.",
        "No aplica en pedidos por plataformas externas.",
        "Sujeto a disponibilidad del establecimiento.",
      ],
    },
    {
      title: "Mercado del Barrio",
      description: "Aprovecha descuentos exclusivos en productos seleccionados.",
      discount: "-10%",
      badge: "Descuento",
      expiresIn: "Vence en 1 dia",
      qrImage: "/img/qr-code.png",
      terms: [
        "Valido en productos marcados dentro del local.",
        "No canjeable por efectivo.",
        "No acumulable con otras ofertas vigentes.",
        "Presenta el QR antes de realizar tu pago.",
      ],
    },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(255,209,117,0.14),transparent_36%),linear-gradient(180deg,#ffffff_0%,#faf7f6_100%)] p-6 shadow-[0_14px_34px_rgba(97,18,50,0.06)] md:p-8">
        <div className="max-w-[540px]">
          <h1 className="text-[34px] font-bold leading-[1.12] text-black md:text-[52px]">
            <span className="inline">Cupones y</span>
            <br />
            <span className="inline">Descuentos</span>
          </h1>

          <p className="mt-5 max-w-[470px] text-[18px] leading-8 text-[#8b8581] md:text-[20px]">
            Explora las mejores ofertas locales de Neza hoy.
          </p>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category.label}
              type="button"
              className={`inline-flex shrink-0 items-center gap-3 rounded-full px-5 py-4 text-[15px] font-semibold transition ${
                category.active
                  ? "bg-[#ffd175] text-[#7a5a00] shadow-[0_10px_20px_rgba(255,209,117,0.28)]"
                  : "bg-white text-[#8a8480] shadow-[0_10px_20px_rgba(97,18,50,0.05)]"
              }`}
            >
              <img
                src={category.icon}
                alt=""
                className={`h-5 w-5 brightness-0 ${
                  category.active ? "" : "opacity-60"
                }`}
              />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="space-y-5">
        {coupons.map((coupon) => (
          <article
            key={coupon.title}
            className="relative overflow-hidden rounded-[32px] border border-[#f0e7ea] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,246,0.96)),url('/img/fondos/fondo.png')] bg-cover bg-center p-5 shadow-[0_18px_34px_rgba(97,18,50,0.10)] md:p-6"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),transparent_36%)]" />
            <div className="absolute left-[-16px] top-[-16px] h-24 w-24 rounded-full bg-[#ece6e7]/90" />
            <div className="absolute bottom-[-40px] right-[-14px] h-28 w-28 rounded-full bg-[#611232]/[0.04]" />

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]" />

                <div className="rounded-[24px] bg-[#fff9e7]/95 px-4 py-3 text-right shadow-[inset_0_0_0_1px_rgba(141,107,16,0.08)]">
                  <p className="text-[30px] font-semibold leading-none text-[#8D6B10] md:text-[46px]">
                    {coupon.discount}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[#8D6B10] md:text-[13px]">
                    {coupon.badge}
                  </p>
                </div>
              </div>

              <div className="max-w-[630px]">
                <h2 className="text-[27px] font-bold leading-tight text-[#003b17] md:text-[36px]">
                  {coupon.title}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#261d1f] md:text-[18px]">
                  {coupon.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/92 px-4 py-3 text-[13px] font-semibold text-[#8b8581] shadow-[0_8px_18px_rgba(97,18,50,0.06)] md:text-[14px]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4ecef]">
                    <img
                      src="/img/iconos/confirmation_number.svg"
                      alt=""
                      className="h-4 w-4 opacity-55 bg-amber-700"
                    />
                  </span>
                  <span className="text-xs">{coupon.expiresIn}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCoupon(coupon)}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#611232] px-5 py-4 text-[15px] font-bold text-white shadow-[0_14px_24px_rgba(97,18,50,0.24)] transition hover:translate-y-[-1px] sm:w-auto md:px-6 md:text-[16px]"
                >
                  <img
                    src="/img/iconos/confirmation_number.svg"
                    alt=""
                    className="h-5 w-5 brightness-0 invert"
                  />
                  <span>Ver QR</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CouponQrModal
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />
    </section>
  );
}
