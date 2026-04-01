"use client";
import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  personal: boolean;
  policy: boolean;
};

type FormErrors = {
  name?: string;
  phone?: string;
  agreements?: string;
  submit?: string;
};

export const MapForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    personal: false,
    policy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, "");

    if (!digits) return "";

    if (digits[0] === "8") {
      digits = "7" + digits.slice(1);
    }

    if (digits[0] !== "7") {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    let result = "+7";

    if (digits.length > 1) {
      result += ` (${digits.slice(1, 4)}`;
    }

    if (digits.length >= 5) {
      result += `) ${digits.slice(4, 7)}`;
    }

    if (digits.length >= 8) {
      result += `-${digits.slice(7, 9)}`;
    }

    if (digits.length >= 10) {
      result += `-${digits.slice(9, 11)}`;
    }

    return result;
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Пожалуйста, заполните имя и фамилию";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (!phoneDigits.length) {
      newErrors.phone = "Пожалуйста, укажите номер телефона";
    } else if (phoneDigits.length < 11) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (!form.personal || !form.policy) {
      newErrors.agreements = "Подтвердите все согласия";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]:
        id === "phone"
          ? formatPhone(value)
          : type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id === "personal" || id === "policy" ? "agreements" : id]: "",
      submit: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

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
        setForm({
          name: "",
          phone: "",
          personal: false,
          policy: false,
        });
        setSuccessOpen(true);
      } else {
        setErrors({
          submit: data.message || "Ошибка отправки. Попробуйте ещё раз.",
        });
      }
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Ошибка сервера. Попробуйте позже.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1534px] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-medium md:text-4xl">
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
              <h2 className="text-xl font-medium md:text-4xl">
                <span className="text-[#D7B56D]">ОСТАВЬТЕ ЗАЯВКУ</span>
              </h2>

              <p className="mb-3 text-base text-[var(--color-gray)]">
                и получите лучшее предложение
              </p>

              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                <div>
                  <input
                    type="text"
                    placeholder="Имя и фамилия"
                    className={`w-full border px-4 py-3 outline-none transition ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#2E7D5B]"
                    }`}
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <div className="mt-1 min-h-[20px]">
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full border px-4 py-3 outline-none transition ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#2E7D5B]"
                    }`}
                  />
                  <div className="mt-1 min-h-[20px]">
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-2 text-xs text-gray-500">
                    <label className="flex items-start gap-2">
                      <input
                        id="personal"
                        type="checkbox"
                        checked={form.personal}
                        onChange={handleChange}
                        className="mt-0.5"
                      />
                      <span>
                        Согласен на{" "}
                        <a
                          href="docs/soglasie.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2E7D5B] underline hover:opacity-80"
                        >
                          обработку персональных данных
                        </a>
                      </span>
                    </label>

                    <label className="flex items-start gap-2">
                      <input
                        id="policy"
                        type="checkbox"
                        checked={form.policy}
                        onChange={handleChange}
                        className="mt-0.5"
                      />
                      <span>
                        Подтверждаю, что ознакомлен с{" "}
                        <a
                          href="docs/policy.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2E7D5B] underline hover:opacity-80"
                        >
                          политикой конфиденциальности
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="mt-1 min-h-[20px]">
                    {errors.agreements && (
                      <p className="text-xs text-red-500">
                        {errors.agreements}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer bg-[#2E7D5B] px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Отправка..." : "Отправить"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2E7D5B]/10">
              <svg
                className="h-7 w-7 text-[#2E7D5B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-semibold text-[#4a4a4a]">
              Заявка отправлена
            </h3>

            <p className="mb-6 text-sm text-gray-600">
              Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее
              время.
            </p>

            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="rounded-lg bg-[#2E7D5B] px-6 py-3 text-white transition hover:opacity-90"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};