import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/lib/projects";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function ProjectsPage() {
  return (
    <main>
      <section className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
        <Header />
      </section>

      <section className="mx-auto w-full max-w-[1534px] px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mb-10">
          <h1 className="text-3xl uppercase md:text-5xl lg:text-[64px]">
            <span className="text-[var(--color-gold)]">Реализованные</span>{" "}
            <span className="text-[#4a4a4a]">проекты</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              images={project.images}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}