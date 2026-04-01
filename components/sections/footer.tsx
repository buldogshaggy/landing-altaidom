import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="flex flex-col relative overflow-hidden pb-[50px] md:pb-[260px]">
      
      {/* ОСНОВНОЙ БЛОК */}
      <div className="relative z-10 mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8 py-10 md:py-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_400px] gap-8">
          
          {/* ЛОГО */}
          <div>
              <Image
                src="images/logo/slogan2.png"
                alt="Сила леса"
                width={200}
                height={120}
                className="lg:mx-0 w-auto h-auto"
                priority
              />
          </div>

          <div />

          {/* КОНТАКТЫ */}
          <div>
            <div className="flex flex-wrap gap-6 mb-6">
              
              <div>
                <a href="tel:+73852239999" className="text-[22px] hover:text-[var(--color-green)]">
                  8 800 700 12 84
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Работаем с 8.00 до 17.00
                </p>
              </div>

              <div>
                <a href="mailto:altaidom@altaidom.com" className="text-[22px] hover:text-[var(--color-green)]">
                  altaidom@altaidom.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Для вопросов и предложений
                </p>
              </div>

            </div>

            <div className="mb-6 text-[#2b2b2b]">
              г. Барнаул, ул. Чкалова, 69 А (2 этаж)
            </div>

            {/* СОЦСЕТИ */}
            <div className="flex gap-4">
              <a href="https://t.me/altailes_doma" target="_blank">
                <Image src="images/logo/tg.svg" alt="" width={40} height={40} />
              </a>

              <a href="https://vk.com/lhk_altailes" target="_blank">
                <Image src="images/logo/vk.svg" alt="" width={40} height={40} />
              </a>

              <a href="https://max.ru/id2224095725_biz" target="_blank">
                <Image src="images/logo/logo-max.svg" alt="" width={40} height={40} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* БОЛЬШОЙ ЛОГО СНИЗУ */}
      <Image
        src="images/logo/logo-footer-big.svg"
        alt=""
        width={1920}
        height={300}
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-full"
        priority
      />

    </footer>
  );
};