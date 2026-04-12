export default function StampCard({ stamp, index }) {
  const isUnlocked = stamp.status === "visitado";

  return (
    <article
      className={`rounded-[28px] px-4 py-5 text-center shadow-[inset_0_0_0_1px_rgba(97,18,50,0.04)] ${
        isUnlocked
          ? "bg-white shadow-[0_12px_28px_rgba(97,18,50,0.08)]"
          : "bg-[#fcf8f8] opacity-55"
      }`}
    >
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center ${
          isUnlocked ? "" : "grayscale"
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center ${
            isUnlocked ? "bg-[#611232]" : "bg-[#e7dde0]"
          } [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]`}
        >
          <img
            src={
              isUnlocked
                ? index % 2 === 0
                  ? "/img/iconos/briefcase_meal.svg"
                  : "/img/iconos/account_balance.svg"
                : index % 2 === 0
                  ? "/img/iconos/briefcase_meal.svg"
                  : "/img/iconos/local_mall.svg"
            }
            alt=""
            className={`h-6 w-6 ${isUnlocked ? "brightness-0 invert" : "opacity-35"}`}
          />
        </div>
      </div>

      <h3
        className={`mt-4 text-[15px] font-bold leading-5 ${
          isUnlocked ? "text-[#221418]" : "text-[#75666c]"
        }`}
      >
        {stamp.name}
      </h3>
      <p
        className={`mt-2 text-[11px] ${
          isUnlocked ? "text-[#8d7c83]" : "text-[#a99aa0]"
        }`}
      >
        {stamp.detail}
      </p>
    </article>
  );
}
