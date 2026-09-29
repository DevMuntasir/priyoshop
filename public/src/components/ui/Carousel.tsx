import { useEffect, useRef, useState } from "react";

export interface CarouselSlide {
  id?: string | number;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  rounded?: boolean;
  className?: string;
}

export default function Carousel({
  slides,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  rounded = true,
  className = "",
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previous = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goTo = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!autoPlay || paused || slides.length <= 1) return;

    setProgress(0);

    const start = Date.now();

    progressRef.current = setInterval(() => {
      const percent = Math.min(
        ((Date.now() - start) / interval) * 100,
        100
      );

      setProgress(percent);
    }, 20);

    intervalRef.current = setTimeout(() => {
      next();
    }, interval);

    return () => {
      clearTimeout(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [current, paused, autoPlay, interval]);

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${rounded ? "rounded-2xl" : ""
        } ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id ?? index}
            className="relative w-full flex-shrink-0"
          >
            <img
              src={slide.image}
              alt={slide.alt ?? ""}
              className="aspect-[16/9] w-full object-cover"
            />

            {(slide.title || slide.description) && (
              <div className="absolute inset-x-0 bottom-0 bg-black/40 p-6 text-white">
                {slide.title && (
                  <h2 className="text-xl font-bold md:text-3xl">
                    {slide.title}
                  </h2>
                )}

                {slide.description && (
                  <p className="mt-2 hidden text-sm md:block">
                    {slide.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}

      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={previous}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
          >
            ❮
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
          >
            ❯
          </button>
        </>
      )}

      {/* Indicators */}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/40 md:w-14"
            >
              <span
                className="absolute left-0 top-0 h-full rounded-full bg-violet-600"
                style={{
                  width:
                    current === index
                      ? `${progress}%`
                      : current > index
                        ? "100%"
                        : "0%",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}