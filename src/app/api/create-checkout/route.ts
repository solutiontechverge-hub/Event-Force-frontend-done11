import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is missing");
    }

    const stripe = new Stripe(stripeSecretKey);

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

      success_url:
`${process.env.NEXT_PUBLIC_DOMAIN}/manage-booking?car=${carSlug}&from=${from}&payment=success`,

      cancel_url:
`${process.env.NEXT_PUBLIC_DOMAIN}/manage-booking?car=${carSlug}&from=${from}&payment=cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}