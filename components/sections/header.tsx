"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <header className="flex items-center justify-between gap-10 py-4 md:py-5">
        
        {/* ЛОГО */}
        <a href="/">
          <img
            src="images/logo/logo-one-line.svg"
            alt="Логотип Алтайлес"
            className="h-8 md:h-10 w-auto"
          />
          <p className="text-xs md:text-lg uppercase text-[var(--color-gold)]">
            19 лет роста
          </p>
        </a>

        {/* ДЕСКТОП МЕНЮ */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-10 text-lg">
          <a href="https://altaidom.com/" target="_blank" className="transition hover:text-[var(--color-green)]">
            Перейти на основной сайт
          </a>
          <a href="/projects" className="transition hover:text-[var(--color-green)]">
            Реализованные объекты
          </a>
        </nav>

        {/* ТЕЛЕФОН (только десктоп) */}
        <a
          href="tel:+78007001284"
          className="hidden md:block text-2xl text-[var(--color-green)]"
        >
          8 800 700 12 84
        </a>

        {/* БУРГЕР */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden flex h-10 w-10 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        </button>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      <div
        className={`fixed inset-0 z-50 transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* затемнение */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* панель */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white p-6 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* закрыть */}
          <button
            onClick={() => setIsOpen(false)}
            className="mb-6 text-2xl"
          >
            ×
          </button>

          {/* меню */}
          <nav className="flex flex-col gap-6 text-lg">
            <a href="#">Перейти на основной сайт</a>
            <a href="#">Реализованные объекты</a>
          </nav>

          {/* телефон */}
          <a
            href="tel:+78007001284"
            className="mt-8 block text-xl text-[var(--color-green)]"
          >
            8 800 700 12 84
          </a>
        </div>
      </div>
    </>
  );
}