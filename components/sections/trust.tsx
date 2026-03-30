import {
  Factory,
  Building2,
  Briefcase,
  Users,
  Truck,
} from "lucide-react";

export const Trust = () => {
  const items = [
    {
      text: <>Собственное производство домов из клееного бруса расположенное<br></br> на Алтае</>,
      icon: Factory,
    },
    {
      text: <>Реализовано более 2300 объектов<br></br> за 17 лет работы</>,
      icon: Building2,
    },
    {
      text: "Профессиональный подход к проектам любой сложности",
      icon: Briefcase,
    },
    {
      text: <>Команда опытных производственников<br></br> и проектировщиков</>,
      icon: Users,
    },
    {
      text: "Проработана логистика в направлении Казахстана",
      icon: Truck,
    },
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
        
        <h2 className="mb-6 text-xl md:text-4xl font-medium text-[#4a4a4a]">
          Вы можете нам доверять потому что у нас:
        </h2>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {items.map(({ text, icon: Icon }, index) => (
              <div
                key={index}
                className="flex min-h-[140px] flex-col items-center justify-start rounded-lg bg-white p-4 text-center"
              >
                {/* Иконка */}
                <Icon className="mb-3 h-8 w-8 text-[var(--color-green)]" />

                {/* Текст */}
                <p className="text-sm md:text-[17px] leading-snug text-[#222]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};