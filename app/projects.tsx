"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/lib/projects";

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
    watchDrag: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="mx-auto w-full max-w-[1534px] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="text-3xl uppercase md:text-5xl lg:text-[64px]">
          <span className="text-[var(--color-gold)]">Реализованные</span>{" "}
          <span className="text-[#4a4a4a]">проекты</span>
        </h2>

        <Link
          href="/projects"
          className="text-base uppercase tracking-wide text-[#4a4a4a] transition hover:text-[var(--color-gold)] md:mb-2"
        >
          Смотреть все
        </Link>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {projects.map((project) => (
              <div
                key={project.id}
                className="min-w-0 shrink-0 basis-full pl-6 md:basis-1/2 xl:basis-1/3"
              >
                <ProjectCard title={project.title} images={project.images} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 md:-translate-x-1/2 items-center justify-center rounded-full bg-white text-xl text-[var(--color-green)] shadow-lg transition hover:bg-[var(--color-green)] hover:text-white disabled:opacity-30"
          aria-label="Предыдущие проекты"
        >
          ‹
        </button>

        {/* 🔥 СТРЕЛКА ВПРАВО */}
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute top-1/2 right-0 z-10 flex -translate-y-1/2 md:translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[var(--color-green)] shadow-lg transition hover:bg-[var(--color-green)] hover:text-white disabled:opacity-30"
          aria-label="Следующие проекты"
        >
          ›
        </button>

      </div>
    </section>
  );
}