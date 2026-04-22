import emailjs from "@emailjs/browser";

/* =====================================================
   EMAILJS CONFIG
===================================================== */

const getEmailJSConfig = () => {
  // Prefer environment variables so config works across environments
  // Fallbacks preserve current behavior if env is not set.
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_p81vwl5",
    templateIdContact:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT || "template_x36w5vj",
    templateIdBooking:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BOOKING || "template_m4d7mlk",
    publicKey:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "-mDuRKSIkk-3w_jOo",
  };
};

/* =====================================================
   INITIALIZE EMAILJS
===================================================== */

let initialized = false;

const initializeEmailJS = () => {
  if (typeof window === "undefined") return;

  if (initialized) return;

  const { publicKey } = getEmailJSConfig();

  emailjs.init(publicKey);

  initialized = true;
};

if (typeof window !== "undefined") {
  initializeEmailJS();
}

/* =====================================================
   TYPES
===================================================== */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  selectedCar: string;
  pickupLocation?: string;
  destination?: string;
  pickupDate?: string;
  returnDate?: string;
  reservationNumber?: string;
  price?: number | string; 
}

/* =====================================================
   HELPERS
===================================================== */

const getTimeFromDateTime = (dateTime?: string) => {
  if (!dateTime) return "";
  return dateTime.split("T")[1] || "";
};

const getDateFromDateTime = (dateTime?: string) => {
  if (!dateTime) return "";
  return dateTime.split("T")[0] || "";
};

/* =====================================================
   CONTACT EMAIL
===================================================== */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<void> => {
  initializeEmailJS();

  const { serviceId, templateIdContact } = getEmailJSConfig();

  const params = {
    name: formData.name,          // ✅ REQUIRED
    from_name: formData.name,     // ✅ BEST PRACTICE
    email: formData.email,        // ✅ REQUIRED
    reply_to: formData.email,     // ✅ so you can reply
    message: formData.message,

    to_email: "reservations@eventforce.sa.com",
  };

  await emailjs.send(
    serviceId,
    templateIdContact,
    params
  );
};


/* =====================================================
   BOOKING EMAIL
===================================================== */

export const sendBookingEmail = async (
  formData: BookingFormData
): Promise<void> => {
  initializeEmailJS();

  const { serviceId, templateIdBooking } = getEmailJSConfig();

  const reservationNumber =
    formData.reservationNumber || "PENDING";

  /* ===============================
     BASE PARAMS
  =============================== */

  const baseParams = {
    full_name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    car: formData.selectedCar,
    pickup_location: formData.pickupLocation || "",
    destination: formData.destination || "",
    pickup_date: getDateFromDateTime(formData.pickupDate),
    pickup_time: getTimeFromDateTime(formData.pickupDate),
    flight_no: formData.returnDate || "",
    reservation_number: reservationNumber,
    price: formData.price ? `${formData.price} SAR` : "Contact for price", // ✅ ADD THIS
  };

  /* ===============================
     SEND EMAIL TO ADMIN
  =============================== */

  await emailjs.send(serviceId, templateIdBooking, {
    ...baseParams,

    // ADMIN RECEIVES
    to_email: "reservations@eventforce.sa.com",

    reply_to: formData.email,
   });


  /* ===============================
     SEND EMAIL TO CLIENT
  =============================== */

  await emailjs.send(serviceId, templateIdBooking, {
    ...baseParams,

    // CLIENT RECEIVES
    to_email: formData.email,

    reply_to: "reservations@eventforce.sa.com",
  });
};
