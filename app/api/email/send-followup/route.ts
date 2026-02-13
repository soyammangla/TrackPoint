import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { dealId } = await req.json();
    if (!dealId)
      return NextResponse.json({ error: "Missing dealId" }, { status: 400 });

    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
      include: { lead: true },
    });

    if (!deal)
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });

    await sendEmail({
      to: deal.email!,
      subject: `Follow-up for Deal - ${deal.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <div style="background-color: #d9534f; color: white; padding: 20px; text-align: center;">
            <h1>TrackPoint CRM</h1>
            <p>Follow-up</p>
          </div>

          <div style="padding: 20px;">
            <p>Hi <strong>${deal.lead?.name ?? ""}</strong>,</p>
            <p>We noticed your deal "<strong>${deal.name}</strong>" has been closed as lost. We'd love to stay in touch and explore future opportunities with you.</p>

            <p>If you have any questions or feedback, feel free to reply to this email.</p>
            <p>Thanks,<br/>TrackPoint CRM Team</p>
          </div>

          <div style="background-color: #f5f5f5; color: #666; padding: 10px; text-align: center; font-size: 12px;">
            © ${new Date().getFullYear()} TrackPoint CRM. All rights reserved.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SEND FOLLOW-UP EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
