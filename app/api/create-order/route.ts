// /app/api/create-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay keys are not set! Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.",
    );
  }

  return new Razorpay({ key_id, key_secret });
}

export async function POST(req: NextRequest) {
  try {
    const razorpay = getRazorpayInstance();

    const body = await req.json();
    const amount = body.amount;

    const options = {
      amount: amount * 100, // convert rupees to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err: any) {
    console.error("Error creating Razorpay order:", err.message);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
