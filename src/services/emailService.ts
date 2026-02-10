import emailjs from '@emailjs/browser';

// Helper function to get EmailJS configuration from environment variables
// clint 
const getEmailJSConfig = () => {
  return {
    serviceId: 'service_p81vwl5',
    templateIdContact: 'template_x36w5vj',
    templateIdBooking: 'template_m4d7mlk',
    publicKey: '-mDuRKSIkk-3w_jOo',
  };
};

// const getEmailJSConfig = () => {
//   return {
//     serviceId: 'service_u4he2zl',
//     templateIdContact: 'template_8i9xoai',
//     templateIdBooking: 'template_e1k0rs3',
//     publicKey: 'nP_FvyDKuyE4gtfQe',
//   };
// };

// Initialize EmailJS only if configured and in browser
const initializeEmailJS = () => {
  if (typeof window === 'undefined') return;

  const { publicKey } = getEmailJSConfig();
  if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
    try {
      emailjs.init(publicKey);
    } catch (error) {
      // EmailJS initialization failed
    }
  }
};

// Initialize on module load if in browser
if (typeof window !== 'undefined') {
  initializeEmailJS();
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

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

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  // Get EmailJS configuration from environment variables
  const { serviceId, templateIdContact, publicKey } = getEmailJSConfig();



  // Check if EmailJS is configured
  if (!serviceId || !publicKey || !templateIdContact || publicKey === 'YOUR_PUBLIC_KEY_HERE') {
    const missingVars = [];
    if (!serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateIdContact) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT');
    if (!publicKey || publicKey === 'YOUR_PUBLIC_KEY_HERE') missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');

    throw new Error(
      `EmailJS is not configured. Missing or invalid: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all EmailJS environment variables are set. ` +
      `Then restart your development server.`
    );
  }

  // Initialize EmailJS if not already initialized
  if (typeof window !== 'undefined') {
    try {
      emailjs.init(publicKey);
    } catch (error) {
      // EmailJS initialization warning
    }
  }

  try {
    const templateParams = {
      title: 'New Contact Form Submission',
      name: formData.name,
      from_name: formData.name,
      from_email: formData.email,
      email: formData.email,
      message: formData.message,
      to_email: 'reservations@eventforce.sa.com',
      reply_to: formData.email,
    };

    await emailjs.send(
      serviceId,
      templateIdContact,
      templateParams
    );

  } catch (error: any) {
    const errorMessage = error?.text || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to send message: ${errorMessage}. Please check your EmailJS configuration.`);
  }
};
const getTimeFromDateTime = (dateTime: any) => {
  if (!dateTime) return 'Not specified';
  return dateTime.split('T')[1]; // 19:32
};

export const sendBookingEmail = async (formData: BookingFormData): Promise<void> => {
  // Get EmailJS configuration from environment variables
  const { serviceId, templateIdBooking, publicKey } = getEmailJSConfig();

  // Check if EmailJS is configured
  if (!serviceId || !publicKey || !templateIdBooking || publicKey === 'YOUR_PUBLIC_KEY_HERE') {
    const missingVars = [];
    if (!serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
    if (!templateIdBooking) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BOOKING');
    if (!publicKey || publicKey === 'YOUR_PUBLIC_KEY_HERE') missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');

    throw new Error(
      `EmailJS is not configured. Missing or invalid: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all EmailJS environment variables are set. ` +
      `Then restart your development server.`
    );
  }

  // Initialize EmailJS if not already initialized
  if (typeof window !== 'undefined') {
    try {
      emailjs.init(publicKey);
    } catch (error) {
      throw new Error(`EmailJS initialization failed: ${error}`);
    }
  } else {
    throw new Error('EmailJS can only be used in browser environment');
  }

  try {
    const reservationNumber = formData.reservationNumber || 'PENDING';
    const templateParams = {
      full_name: formData.fullName,
      email: 'reservations@eventforce.sa.com',
      phone: `${formData.countryCode} ${formData.contactNumber}`,
      car: formData.selectedCar,

      service_type: formData.serviceType,
      pickup_location: formData.pickupLocation || 'Not specified',
      destination: formData.destination || 'Not specified',
      pickup_date: formData.pickupDate || 'Not specified',
      pickup_time: getTimeFromDateTime(formData.pickupDate),

      flight_no: formData.returnDate || 'Not specified',

      reservation_number: reservationNumber,
      to_email: 'reservations@eventforce.sa.com',
      reply_to: formData.email,
    };

    const templateParamsUser = {
      full_name: formData.fullName,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.contactNumber}`,
      car: formData.selectedCar,

      service_type: formData.serviceType,
      pickup_location: formData.pickupLocation || 'Not specified',
      destination: formData.destination || 'Not specified',
      pickup_date: formData.pickupDate || 'Not specified',
      pickup_time: getTimeFromDateTime(formData.pickupDate),

      flight_no: formData.returnDate || 'Not specified',

      reservation_number: reservationNumber,
      to_email: 'reservations@eventforce.sa.com',
      reply_to: 'reservations@eventforce.sa.com',
    };

    // Send admin email
    let adminEmailSuccess = false;
    let userEmailSuccess = false;
    const errors: string[] = [];

    try {
      await emailjs.send(
        serviceId,
        templateIdBooking,
        templateParams
      );
      adminEmailSuccess = true;
    } catch (adminError: any) {
      const adminErrorMessage = adminError?.text || adminError?.message || 'Unknown error occurred';
      errors.push(`Admin email failed: ${adminErrorMessage}`);
    }

    // Send user email (try even if admin email failed)
    try {
      await emailjs.send(
        serviceId,
        templateIdBooking,
        templateParamsUser
      );
      userEmailSuccess = true;
    } catch (userError: any) {
      const userErrorMessage = userError?.text || userError?.message || 'Unknown error occurred';
      errors.push(`User email failed: ${userErrorMessage}`);
    }

    // If both emails failed, throw error
    if (!adminEmailSuccess && !userEmailSuccess) {
      throw new Error(`Both emails failed. ${errors.join(' | ')}`);
    }

    // If at least one email succeeded, continue without failing
    if (!adminEmailSuccess || !userEmailSuccess) {
      // Partial email success
    }

  } catch (error: any) {
    const errorMessage = error?.text || error?.message || error?.toString() || 'Unknown error occurred';
    throw new Error(`Failed to submit booking: ${errorMessage}. Please check your EmailJS configuration.`);
  }
};

