import { url } from "inspector";

export function Hero() {
    return (
        <section className="relative flex-1 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('images/hero-bg.jpg')" }}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative mx-auto w-full max-w-[1534px] px-4 py-10 md:px-6 lg:px-8">
                <h1 className="h1 uppercase text-6xl text-white"><span className="text-[var(--color-gold)]">Строим премиальные дома</span><br></br>
                из алтайского клееного бруса<br></br><span className="text-[var(--color-gold)]"> по всему Казахстану</span></h1>
            </div>
        </section>
    )
}