export const MapForm = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* КАРТА */}
          <div>
            <h2 className="mb-4 text-xl md:text-4xl font-medium">
              <span className="text-[#D7B56D]">КАРТА</span>{" "}
              <span className="text-[#4a4a4a]">ОБЪЕКТОВ</span>
            </h2>

            <div className="overflow-hidden rounded-lg border">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1_Ny7JN2R0xQqV2YdZHeaZ5eSEIU_GiXn&ehbc=#D7B56D"
                width="100%"
                height="420"
                loading="lazy"
              />
            </div>
          </div>

          {/* ФОРМА */}
          <div>
            <h2 className="text-xl md:text-4xl font-medium">
              <span className="text-[#D7B56D]">ОСТАВЬТЕ ЗАЯВКУ</span>
            </h2>

            <p className="mb-3 text-base text-[var(--color-gray)]">
              и получите лучшее предложение
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Имя и фамилия"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#2E7D5B]"
                id="name"
                autoComplete="name"
              />

              <input
                type="tel"
                placeholder="Номер телефона"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#2E7D5B]"
                id="phone"
                autoComplete="tel"
              />

              <div className="text-xs text-gray-500 space-y-1">
                <label className="flex gap-2 items-center">
                  <input id="personal" type="checkbox" className="" />
                  <span>
                    Согласен на обработку персональных данных
                  </span>
                </label>

                <label className="flex items-start gap-2 items-center">
                  <input id="policy" type="checkbox" className="" />
                  <span>
                    Подтверждаю, что ознакомлен с политикой
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#2E7D5B] px-6 py-3 text-white transition hover:opacity-90 cursor-pointer"
              >
                Отправить
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};