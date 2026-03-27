"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ProjectCardProps = {
  title: string;
  images: string[];
};

export function ProjectCard({ title, images }: ProjectCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowRight") {
        setModalIndex((prev) => (prev + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setModalIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, images.length]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsOpen(true);
  };

  const showPrev = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl">
        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl bg-black"
            ref={emblaRef}
          >
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 basis-full bg-black"
                >
                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="block w-full text-left"
                    aria-label={`Открыть фото ${index + 1} проекта ${title}`}
                  >
                    <div className="relative h-[260px] md:h-[320px] lg:h-[380px]">
                      <img
                        src={image}
                        alt={`${title} ${index + 1}`}
                        className="block h-full w-full scale-[1.002] object-cover select-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-[var(--color-gold)]"
              >
                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>

              <span className="text-sm text-white">{title}</span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === selectedIndex
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Перейти к фото ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </article>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
              aria-label="Закрыть"
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-2xl bg-black">
              <img
                src={images[modalIndex]}
                alt={`${title} ${modalIndex + 1}`}
                className="block max-h-[85vh] w-full object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setModalIndex(index)}
                    className={`overflow-hidden rounded-md border transition ${
                      index === modalIndex
                        ? "border-white"
                        : "border-white/20 hover:border-white/60"
                    }`}
                    aria-label={`Открыть миниатюру ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${title} миниатюра ${index + 1}`}
                      className="block h-14 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}