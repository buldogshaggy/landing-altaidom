import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "./projects";
import { Trust } from "@/components/sections/trust";

export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
          <Header />
        </div>  
        <Hero />
      </section>

      <Projects />
      <Trust />
    </main>
  );
}