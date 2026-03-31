import { url } from "inspector";

export function Hero() {
    return (
        <section className="relative bg-cover bg-center bg-no-repeat min-h-[600px] sm:flex-1 lg:flex-1" style={{ backgroundImage: "url('images/hero-bg.jpg')" }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative mx-auto w-full max-w-[1534px] px-4 py-10 md:px-6 lg:px-8">
                <h1 className="uppercase text-white tracking-tight leading-[0.95] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"><span className="text-[var(--color-gold)]">Строим премиальные дома</span><br></br>
                из алтайского клееного бруса<br></br><span className="text-[var(--color-gold)]"> по всему Казахстану</span></h1>
            </div>
        </section>
    )
}