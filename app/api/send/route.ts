import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, personal, policy } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Заполните имя и телефон" },
        { status: 400 }
      );
    }

    if (!personal || !policy) {
      return NextResponse.json(
        { message: "Подтвердите согласия" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: "gss@altailes.com",
      subject: "Новая заявка с сайта",
      text: `Новая заявка с сайта

Имя: ${name}
Телефон: ${phone}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Заявка отправлена" });
  } catch (error) {
    console.error("Send form error:", error);
    return NextResponse.json(
      { message: "Ошибка отправки письма" },
      { status: 500 }
    );
  }
}