import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Trackpoint" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You’re Subscribed to Trackpoint Updates ✅",
      html: `
    <h2>Hello!</h2>
    <p>Thank you for subscribing to Trackpoint updates. You will now receive all the latest tips, news, and updates from us.</p>
    <p>We appreciate your interest and support!</p>
  `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.log("Subscription Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}
