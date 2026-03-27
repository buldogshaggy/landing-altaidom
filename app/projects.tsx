"use client";

import { useRef, useState } from "react";
import { ProjectCard } from "@/components/sections/project-card";

const projects = [
  {
    id: 1,
    title: "Дом в Алматы",
    images: [
      "images/projects/1_1.jpg",
      "images/projects/1_2.jpg",
      "images/projects/1_3.jpg",
    ],
  },
  {
    id: 2,
    title: "Дом в Астане",
    images: ["images/projects/2_1.jpg"],
  },
  {
    id: 3,
    title: "Дом в Шымкенте",
    images: ["images/projects/3_1.jpg"],
  },
  {
    id: 4,
    title: "Дом в Караганде",
    images: ["images/projects/4_1.jpg"],
  },
  {
    id: 5,
    title: "Дом в Костанае",
    images: ["images/projects/5_1.jpg"],
  },
  {
    id: 6,
    title: "Дом в Павлодаре",
    images: ["images/projects/6_1.jpg"],
  },
  {
    id: 7,
    title: "Дом в Караганде",
    images: ["images/projects/4_1.jpg"],
  },
  {
    id: 8,
    title: "Дом в Костанае",
    images: ["images/projects/5_1.jpg"],
  },
  {
    id: 9,
    title: "Дом в Павлодаре",
    images: ["images/projects/6_1.jpg"],
  },
];

export function Projects() {
  const [isExpanded, setExpanded] = useState(false);
  const hiddenProjectsRef = useRef<HTMLDivElement | null>(null);

  const visibleProjects = projects.slice(0, 3);
  const hiddenProjects = projects.slice(3);

  const handleToggle = () => {
    if (!isExpanded) {
      setExpanded(true);

      requestAnimationFrame(() => {
        setTimeout(() => {
          hiddenProjectsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 220);
      });

      return;
    }

    setExpanded(false);
  };

  return (
    <section className="mx-auto w-full max-w-[1534px] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
      <div className="mb-10">
        <h2 className="text-3xl uppercase md:text-5xl lg:text-[64px]">
          <span className="text-[var(--color-gold)]">Реализованные</span>{" "}
          <span className="text-[#4a4a4a]">проекты</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            images={project.images}
          />
        ))}
      </div>

      <div
        className={`overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isExpanded ? "max-h-[2200px]" : "max-h-0"
        }`}
      >
        <div
          ref={hiddenProjectsRef}
          className="grid grid-cols-1 gap-10 pt-10 md:grid-cols-2 xl:grid-cols-3"
        >
          {hiddenProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transform-gpu transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isExpanded
                  ? "translate-y-0 scale-100 opacity-100 blur-0"
                  : "pointer-events-none translate-y-8 scale-[0.985] opacity-0 blur-[2px]"
              }`}
              style={{
                transitionDelay: isExpanded ? `${index * 140}ms` : "0ms",
              }}
            >
              <ProjectCard title={project.title} images={project.images} />
            </div>
          ))}
        </div>
      </div>

      {projects.length > 3 && (
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={handleToggle}
            className="rounded-full bg-[var(--color-green)] px-6 py-3 text-white transition hover:bg-black/80"
          >
            {isExpanded ? "Свернуть" : "Смотреть все"}
          </button>
        </div>
      )}
    </section>
  );
}