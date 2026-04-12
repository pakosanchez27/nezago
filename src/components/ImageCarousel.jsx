import { useState } from "react";
import { Link } from "react-router-dom";
import { carouselPosts } from "../data/carouselPosts";

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselPosts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTouchStartX(null);
  };

  return (
    <div className="mx-auto -mt-[100px] w-full max-w-[398px] md:mt-0 md:max-w-none">
      <div
        className="relative h-[200px] overflow-hidden rounded-[20px] shadow-[0_14px_40px_rgba(97,18,50,0.25)] md:h-[260px] md:rounded-[28px] lg:h-[290px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselPosts.map((slide) => (
            <article key={slide.id} className="relative h-full min-w-full">
              <div className="absolute inset-0 bg-[#4b403d]" />
              <Link
                to={`/blog/${slide.slug}`}
                className="block h-full w-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_35%,rgba(0,0,0,0.58)_100%)]" />

                <div className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,rgba(97,18,50,0.45)_0%,rgba(97,18,50,0)_100%)]" />

                <div className="absolute bottom-4 right-5 z-10 flex items-end gap-1 opacity-70">
                  <span className="h-5 w-[2px] rounded-full bg-neza-secondary rotate-[40deg]" />
                  <span className="h-8 w-[2px] rounded-full bg-neza-secondary rotate-[18deg]" />
                  <span className="h-11 w-[2px] rounded-full bg-neza-secondary" />
                  <span className="h-7 w-[2px] rounded-full bg-neza-secondary -rotate-[18deg]" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                  <p className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-neza-secondary">
                    {slide.eyebrow}
                  </p>
                  <h2 className="whitespace-pre-line text-[22px] font-bold leading-[1.15] text-white">
                    {slide.title}
                  </h2>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={goToPrevious}
          className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-xl text-white backdrop-blur-sm transition hover:bg-black/20"
        >
          <span aria-hidden="true">&#8249;</span>
        </button>

        <button
          type="button"
          aria-label="Siguiente imagen"
          onClick={goToNext}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-xl text-neza-secondary backdrop-blur-sm transition hover:bg-black/20"
        >
          <span aria-hidden="true">&#8250;</span>
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {carouselPosts.map((slide, index) => (
            <span
              key={slide.id}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
