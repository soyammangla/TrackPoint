// lib/mailer.ts
import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string; // ✅ Add this
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"TrackPoint CRM" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html, // ✅ Add this
  });

  console.log("Email sent:", info.messageId);
  return info;
}
