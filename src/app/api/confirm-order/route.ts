import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/services/serverEmailService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reservationNumber = searchParams.get('reservation');
    const email = searchParams.get('email');

    if (!reservationNumber || !email) {
      return NextResponse.redirect(
        new URL('/order-confirmed?error=missing_params', request.url)
      );
    }

    const decodedReservationNumber = decodeURIComponent(reservationNumber);
    const decodedEmail = decodeURIComponent(email);

    // Send simple confirmation email
    await sendOrderConfirmationEmail(decodedEmail, decodedReservationNumber);

    // Redirect to success page
    return NextResponse.redirect(
      new URL('/order-confirmed?success=true', request.url)
    );
  } catch (error: any) {
    return NextResponse.redirect(
      new URL(`/order-confirmed?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}

