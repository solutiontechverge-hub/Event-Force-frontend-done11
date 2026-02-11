import emailjs from '@emailjs/nodejs';

// Server-side EmailJS configuration
const getServerEmailJSConfig = () => {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_hd0oru9',
    templateIdBooking: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BOOKING || 'template_e1k0rs3',
    privateKey: process.env.EMAILJS_PRIVATE_KEY || 'YOUR_PRIVATE_KEY_HERE',
  };
};

const getTimeFromDateTime = (dateTime: any) => {
  if (!dateTime) return 'Not specified';
  return dateTime.split('T')[1]; // 19:32
};

export interface BookingFormData {
  fullName: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  selectedCar: string;
  selectedColor?: string;
  serviceType: string;
  pickupLocation?: string;
  destination?: string;
  pickupDate?: string;
  pickupTime?: string;
  returnDate?: string;
  returnTime?: string;
  reservationNumber?: string;
}

// Simple order confirmation email (no booking data needed)
export const sendOrderConfirmationEmail = async (
  email: string,
  reservationNumber: string
): Promise<void> => {
  const { serviceId, templateIdBooking, privateKey } = getServerEmailJSConfig();

  // Check if EmailJS is configured
  if (!serviceId || !templateIdBooking) {
    const missingVars = [];
    if (!serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateIdBooking) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BOOKING');
    
    throw new Error(
      `EmailJS server-side is not configured. Missing: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all EmailJS environment variables are set.`
    );
  }

  // Warn if private key is missing or using placeholder (but allow to proceed)
  if (!privateKey || privateKey === 'YOUR_PRIVATE_KEY_HERE') {
  }

  try {
    const templateParams = {
      reservation_number: reservationNumber,
      email: email,
      to_email: email,
      reply_to: 'reservations@eventforce.sa.com',
      message: `Your order with reservation number ${reservationNumber} has been confirmed successfully. Thank you for choosing Event Force!`,
    };

    await emailjs.send(
      serviceId,
      templateIdBooking,
      templateParams,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'nP_FvyDKuyE4gtfQe',
        privateKey: privateKey,
      }
    );
  } catch (error: any) {
    const errorMessage = error?.text || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to send confirmation email: ${errorMessage}. Please check your EmailJS configuration.`);
  }
};

export const resendBookingConfirmationEmail = async (
  formData: BookingFormData
): Promise<void> => {
  const { serviceId, templateIdBooking, privateKey } = getServerEmailJSConfig();

  // Check if EmailJS is configured
  if (!serviceId || !templateIdBooking) {
    const missingVars = [];
    if (!serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateIdBooking) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BOOKING');
    
    throw new Error(
      `EmailJS server-side is not configured. Missing: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all EmailJS environment variables are set.`
    );
  }

  // Warn if private key is missing or using placeholder (but allow to proceed)
  if (!privateKey || privateKey === 'YOUR_PRIVATE_KEY_HERE') {
  }

  try {
    const reservationNumber = formData.reservationNumber || 'PENDING';
    
    // Generate confirm order link with full domain
    // Priority: NEXT_PUBLIC_BASE_URL > VERCEL_URL > localhost
    let baseUrl: string;
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    } else if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      baseUrl = 'http://localhost:3000';
    }
    // Ensure baseUrl doesn't have trailing slash
    baseUrl = baseUrl.replace(/\/$/, '');
    
    // Encode booking data in URL to avoid storage issues
    const bookingDataForUrl = {
      reservationNumber,
      fullName: formData.fullName,
      email: formData.email,
      countryCode: formData.countryCode,
      contactNumber: formData.contactNumber,
      selectedCar: formData.selectedCar,
      selectedColor: formData.selectedColor,
      serviceType: formData.serviceType,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
    };
    const encodedData = Buffer.from(JSON.stringify(bookingDataForUrl)).toString('base64');
    const confirmOrderLink = `${baseUrl}/api/confirm-order?data=${encodeURIComponent(encodedData)}`;

    const templateParams = {
      full_name: formData.fullName,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.contactNumber}`,
      car: formData.selectedCar,
      color: formData.selectedColor || (formData.selectedCar.toLowerCase().includes('ford taurus') ? 'Agate Black (Default)' : 'Not specified'),
      service_type: formData.serviceType,
      pickup_location: formData.pickupLocation || 'Not specified',
      destination: formData.destination || 'Not specified',
      pickup_date: formData.pickupDate || 'Not specified',
      pickup_time: getTimeFromDateTime(formData.pickupDate),
      return_date: formData.returnDate || 'Not specified',
      return_time: getTimeFromDateTime(formData.returnDate),
      reservation_number: reservationNumber,
      confirm_order_link: confirmOrderLink,
      to_email: formData.email, // Send confirmation to customer
      reply_to: 'reservations@eventforce.sa.com',
    };

    await emailjs.send(
      serviceId,
      templateIdBooking,
      templateParams,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'nP_FvyDKuyE4gtfQe',
        privateKey: privateKey,
      }
    );
  } catch (error: any) {
    const errorMessage = error?.text || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to resend confirmation email: ${errorMessage}. Please check your EmailJS configuration.`);
  }
};

