import emailjs from '@emailjs/browser';

// Helper function to get EmailJS configuration from environment variables
const getEmailJSConfig = () => {
  return {
    serviceId: 'service_72jtj46',
    templateIdContact: 'template_h6syf6i',
    templateIdBooking: 'template_m4d7mlk',
    publicKey: '-mDuRKSIkk-3w_jOo',
  };
};

// Initialize EmailJS only if configured and in browser
const initializeEmailJS = () => {
  if (typeof window === 'undefined') return;

  const { publicKey } = getEmailJSConfig();
  if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
    try {
      emailjs.init(publicKey);
    } catch (error) {
      console.warn('EmailJS initialization failed:', error);
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

  console.log('EmailJS Config:', { serviceId, templateIdContact, publicKey });

  console.log('sendContactEmail called with formData:', formData);

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('EmailJS Config Check:', {
      serviceId: serviceId ? '✓ Set' : '✗ Missing',
      templateIdContact: templateIdContact ? '✓ Set' : '✗ Missing',
      publicKey: publicKey && publicKey !== 'YOUR_PUBLIC_KEY_HERE' ? '✓ Set' : '✗ Missing or Placeholder',
    });
  }

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
      console.warn('EmailJS initialization warning:', error);
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
    console.error('Error sending contact email:', error);
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

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('EmailJS Config Check:', {
      serviceId: serviceId ? '✓ Set' : '✗ Missing',
      templateIdBooking: templateIdBooking ? '✓ Set' : '✗ Missing',
      publicKey: publicKey && publicKey !== 'YOUR_PUBLIC_KEY_HERE' ? '✓ Set' : '✗ Missing or Placeholder',
    });
  }

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
      console.warn('EmailJS initialization warning:', error);
    }
  }

  try {
    const reservationNumber = formData.reservationNumber || 'PENDING';
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
      to_email: 'reservations@eventforce.sa.com',
      reply_to: formData.email,
    };

    await emailjs.send(
      serviceId,
      templateIdBooking,
      templateParams
    );
  } catch (error: any) {
    console.error('Error sending booking email:', error);
    const errorMessage = error?.text || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to submit booking: ${errorMessage}. Please check your EmailJS configuration.`);
  }
};

