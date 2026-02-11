import { BookingFormData } from './emailService';

// Simple in-memory storage for booking data
// In production, replace this with a proper database (PostgreSQL, MongoDB, etc.)
const bookingStorage = new Map<string, BookingFormData>();

export const storeBookingData = (
  reservationNumber: string,
  bookingData: BookingFormData
): void => {
  bookingStorage.set(reservationNumber, bookingData);
};

export const getBookingData = (
  reservationNumber: string
): BookingFormData | null => {
  const data = bookingStorage.get(reservationNumber) || null;
  return data;
};

export const deleteBookingData = (reservationNumber: string): void => {
  bookingStorage.delete(reservationNumber);
};

