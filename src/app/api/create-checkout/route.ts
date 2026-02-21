import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {

    // ✅ Get data from frontend
    const body = await req.json();

    const {
      carName,
      price,
      email,
      customerName,
      carSlug,
      from
    } = body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "sar",
            product_data: {
              name: `${carName} Airport Transfer`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],

      customer_email: email,

      // ✅ Dynamic redirect URL
      success_url:
`${process.env.NEXT_PUBLIC_DOMAIN}/manage-booking?car=${carSlug}&from=${from}&payment=success`,

cancel_url:
`${process.env.NEXT_PUBLIC_DOMAIN}/manage-booking?car=${carSlug}&from=${from}&payment=cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err: any) {

    console.log("Stripe error:", err.message);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}