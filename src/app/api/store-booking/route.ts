import { NextRequest, NextResponse } from 'next/server';
import { storeBookingData } from '@/services/bookingStorage';
import { BookingFormData } from '@/services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservationNumber, bookingData } = body;

    if (!reservationNumber || !bookingData) {
      return NextResponse.json(
        { error: 'Missing reservationNumber or bookingData' },
        { status: 400 }
      );
    }

    // Store booking data
    storeBookingData(reservationNumber, bookingData as BookingFormData);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to store booking data' },
      { status: 500 }
    );
  }
}

