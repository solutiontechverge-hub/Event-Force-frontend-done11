import { BookingFormData } from './emailService';

// Simple in-memory storage for booking data
// In production, replace this with a proper database (PostgreSQL, MongoDB, etc.)
const bookingStorage = new Map<string, BookingFormData>();

export const storeBookingData = (
  reservationNumber: string,
  bookingData: BookingFormData
): void => {
  console.log('Storing booking data:', { reservationNumber, email: bookingData.email });
  bookingStorage.set(reservationNumber, bookingData);
  console.log('Total bookings stored:', bookingStorage.size);
};

export const getBookingData = (
  reservationNumber: string
): BookingFormData | null => {
  console.log('Getting booking data for:', reservationNumber);
  console.log('Available reservation numbers:', Array.from(bookingStorage.keys()));
  const data = bookingStorage.get(reservationNumber) || null;
  console.log('Found booking data:', !!data);
  return data;
};

export const deleteBookingData = (reservationNumber: string): void => {
  bookingStorage.delete(reservationNumber);
};

