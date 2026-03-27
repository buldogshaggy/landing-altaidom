export function Header() {
    return (
        <header className="flex items-center justify-between py-5">
            <div>
                <img src="/images/logo/logo-one-line.svg" alt="Логотип Алтайлес" className="h-10 w-auto"></img>
                <p className="text-lg uppercase text-[var(--color-gold)]">19 лет роста</p>
            </div>
            <nav className="flex flex-1 items-center justify-center gap-10 text-lg">
                <a href="#" className="transition hover:text-[var(--color-green)]">Перейти на основной сайт</a>
                <a href="#" className="transition hover:text-[var(--color-green)]">Реализованные объекты</a>
            </nav>
            <a href="tel:+78007001284" className="text-2xl text-[var(--color-green)]">8 800 700 12 84</a>
        </header>
    );
}