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

    // Send professional email
    await sendEmail({
      to: deal.email!,
      subject: `Congratulations! Deal Closed Won - ${deal.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
          <div style="background-color: #0f4c81; color: white; padding: 20px; text-align: center;">
            <h1>TrackPoint CRM</h1>
          </div>

          <div style="padding: 20px;">
            <p>Hi <strong>${deal.lead?.name ?? ""}</strong>,</p>
            <p>Congratulations! Your deal <strong>${deal.name}</strong> has been successfully closed.</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Deal Name</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${deal.name}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Owner</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${deal.owner}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Amount</td>
                <td style="border: 1px solid #ddd; padding: 8px;">₹ ${deal.amount.toLocaleString()}</td>
              </tr>
            </table>

            <p style="margin-top: 20px;">We will send your invoice shortly.</p>
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
    console.error("SEND WON EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
