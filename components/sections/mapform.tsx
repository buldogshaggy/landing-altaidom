"use client";
import { useState } from "react";

export const MapForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    personal: false,
    policy: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.personal || !form.policy) {
      alert("Подтвердите согласия");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          personal: form.personal,
          policy: form.policy,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Заявка отправлена!");
        setForm({
          name: "",
          phone: "",
          personal: false,
          policy: false,
        });
      } else {
        alert(data.message || "Ошибка отправки");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
                title="map"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-4xl font-medium">
              <span className="text-[#D7B56D]">ОСТАВЬТЕ ЗАЯВКУ</span>
            </h2>

            <p className="mb-3 text-base text-[var(--color-gray)]">
              и получите лучшее предложение
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Имя и фамилия"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#2E7D5B]"
                id="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                placeholder="Номер телефона"
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#2E7D5B]"
                id="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <div className="text-xs text-gray-500 space-y-1">
                <label className="flex gap-2 items-center">
                  <input
                    id="personal"
                    type="checkbox"
                    checked={form.personal}
                    onChange={handleChange}
                  />
                  <span>Согласен на обработку персональных данных</span>
                </label>

                <label className="flex gap-2 items-center">
                  <input
                    id="policy"
                    type="checkbox"
                    checked={form.policy}
                    onChange={handleChange}
                  />
                  <span>Подтверждаю, что ознакомлен с политикой</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#2E7D5B] px-6 py-3 text-white transition hover:opacity-90 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};