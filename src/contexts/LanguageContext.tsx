"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.fleet": "Our Fleet",
    "nav.contact": "Contact Us",
    "nav.booking": "Booking",
    "nav.signup": "Sign Up",

    // Common
    "common.loading": "Loading...",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.select": "Select",
    "common.all": "All",

    // Header
    "header.login": "Login",
    "header.logout": "Logout",
    "header.profile": "Profile",
    "header.account": "Account",
    "header.signUp": "Sign Up",


    // Footer
    "footer.navigation": "Navigation",
    "footer.services": "Services",
    "footer.support": "Support",
    "footer.luxuryTransportation": "Luxury Transportation",
    "footer.eventLogistics": "Event Logistics",
    "footer.corporateEvents": "Corporate Events",
    "footer.weddingServices": "Wedding Services",
    "footer.helpCenter": "Help Center",
    "footer.faq": "FAQ",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.copyright": "All rights reserved",
    "footer.description":
      "Premium transportation and event logistics solutions across Saudi Arabia. Making every occasion memorable with our luxury fleet and professional service.",
    "footer.location": "Saudi Arabia",

    // Booking
    "booking.title": "Manage Booking",
    "booking.subtitle": "Book Your Perfect Ride",
    "booking.fullName": "Full Name",
    "booking.fullNamePlaceholder": "Enter your full name",
    "booking.email": "Email Address",
    "booking.emailPlaceholder": "Enter your email address here",
    "booking.phone": "Contact Number",
    "booking.phonePlaceholder": "Enter your contact number",
    "booking.countryCode": "Country Code",
    "booking.car": "Select Vehicle",
    "booking.selectVehicle": "Select Vehicle",
    "booking.color": "Select Color",
    "booking.serviceType": "Service Type",
    "booking.selectServiceType": "Select Service Type",
    "booking.pickupLocation": "Pickup Location",
    "booking.pickupLocationPlaceholder": "Enter pickup location",
    "booking.destination": "Destination",
    "booking.destinationPlaceholder": "Enter destination",
    "booking.pickupDate": "Pickup Date & Time",
    "booking.flightNumber": "Flight #",
    "booking.flightNumberPlaceholder": "Enter flight number",
    "booking.photo": "Upload Photo (Optional)",
    "booking.photoDescription": "Upload a photo if needed",
    "booking.submit": "Submit Booking",
    "booking.cancel": "Cancel",
    "booking.backToDetails": "Back to Details",
    "booking.success":
      "Your booking details submitted successfully! A message will be provided to you soon.",
    "booking.error": "Failed to submit booking. Please try again later.",
    "booking.minTime": "Minimum booking time: 2 hours in advance",
    "booking.price": "Price",
    "booking.excludesVAT": "*Excludes VAT 15%",
    "booking.rent": "Rent",

    // Fleet
    "fleet.selectBranch": "Select Branch",
    "fleet.fleetClass": "Fleet Class",
    "fleet.economy": "Economy",
    "fleet.suv": "SUV",
    "fleet.luxury": "Luxury",
    "fleet.van": "Van",
    "fleet.bus": "Bus",
    "fleet.viewDetails": "View Details",
    "fleet.bookNow": "Book Now",
    "fleet.rent": "Rent",
    "fleet.perHour": "Per hour",
    "fleet.noVehicles": "No vehicles found matching your criteria.",
    "fleet.description":
      "Browse our extensive fleet of modern, reliable vehicles for every need. Choose from Economy, SUVs, luxury cars, and buses available for daily or monthly rental.",
    "fleet.mostRentedCars": "Most Rented Cars",

    // Contact (duplicates removed - using expanded version below)

    // About (duplicates removed - using expanded version below)

    // General
    "general.premium": "Premium",
    "general.selectColor": "Select Color",
    "general.disclaimer":
      "Images shown are for illustrative purposes only. Actual specifications, features, and details may vary.",

    // Hero Section
    "hero.title": "Premium Transportation",
    "hero.title2": "& Event Logistics",
    "hero.subtitle":
      "From luxury VIP vehicles to large-scale event logistics, we provide seamless, reliable, and premium transportation solutions that elevate every occasion.",
    "hero.bookNow": "Book Now",
    "hero.learnMore": "Learn More",

    // Benefits Section
    "benefits.title": "Why Choose Us",
    "benefits.onTime": "On-Time Guarantee",
    "benefits.luxuryFleet": "Luxury Fleet",
    "benefits.gpsTracking": "Real-Time GPS Tracking",
    "benefits.wifi": "In-Car Wi-Fi",
    "benefits.clean": "Clean & Comfy",
    "benefits.support": "24/7 Customer Support",
    "benefits.booking": "Easy Online Booking",
    "benefits.drivers": "Trained Drivers",

    // Mission Vision
    "mission.title": "Our Mission",
    "mission.text":
      "To deliver seamless, high-quality transportation and logistical solutions that elevate events and experiences across Saudi Arabia, with a focus on professionalism, precision, and customer satisfaction.",
    "vision.title": "Our Vision",
    "vision.text":
      "To become the leading provider of premium transportation and event logistics services in Saudi Arabia, recognized for excellence, innovation, and unwavering commitment to exceeding customer expectations.",

    // Testimonials
    "testimonials.title": "What Our Clients Say About Us",

    // Contact Section
        "contact.title": "Contact Us",
    "contact.getInTouch": "Get In Touch",
    "contact.description":
      "Have questions or need assistance? We're here to help! Reach out to us through any of the following channels.",
    "contact.contactUs": "Contact Us",
    "contact.name": "Name",
    "contact.namePlaceholder": "Enter your name",
    "contact.emailPlaceholder": "Enter your email",
    "contact.messagePlaceholder": "Enter your message",
    "contact.sendMessage": "Send Message",
     "contact.message": "Message",
    "contact.success":
      "Your details submitted successfully! A message will be provided to you soon.",
    "contact.error": "Failed to send message. Please try again later.",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.headquarters": "Headquarters",
    "contact.branch": "Branch",

    // Download Profile
    "download.title": "Download Our Company Profile",
    "download.description":
      "Get detailed information about our services, fleet, and company details.",
    "download.button": "Download Profile",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle":
      "Find quick answers to the most common questions about our services",
    "faq.searchPlaceholder": "Search for questions...",
    "faq.generalQuestions": "General Questions",
    "faq.bookingReservations": "Booking & Reservations",
    "faq.pricingPayment": "Pricing & Payment",
    "faq.services": "Services",
    "faq.safety": "Safety & Security",

    // Help Center
    "help.title": "Help Center",
    "help.subtitle":
      "Find answers to your questions and get the support you need",
    "help.gettingStarted": "Getting Started",
    "help.bookingReservations": "Booking & Reservations",
    "help.pricingPayment": "Pricing & Payment",
    "help.services": "Services",
    "help.safety": "Safety & Security",

    // About Us
      "about.title": "About Us",
    "about.subtitle":
      "Your trusted partner for premium transportation and event logistics",

    // Vehicle Details
    "vehicle.view360": "360° View",
    "vehicle.specifications": "Specifications",
    "vehicle.features": "Features",
    "vehicle.interior": "Interior",
    "vehicle.bookNow": "Book Now",
    "vehicle.selectColor": "Select Color",
    "vehicle.engine": "Engine",
    "vehicle.performance": "Performance",
    "vehicle.safety": "Safety",
    "vehicle.technology": "Technology",

    // Service Types
    "service.airport": "Airport Pickup/Drop to City",
    "service.downtown": "Downtown to Inside City",
    "service.intercity": "Inter-City Route",
    "service.hourly": "Hourly Rate",
    "service.8hours": "8 Hours Package",
    "service.12hours": "12 Hours Package",

    // Select Car
    "booking.selectCar": "Select Car",
    "booking.selectCarPlaceholder": "Select car",

    // Locations
    "location.riyadh": "Riyadh",
    "location.jeddah": "Jeddah",
    "location.makkah": "Makkah",
    "location.medina": "Medina",
    "location.dammam": "Dammam",
    "location.kaust": "KAUST",
    "location.kaec": "KAEC",
    "location.yanbu": "Yanbu",
    "location.umluj": "Umluj",
    "location.redsea": "Red Sea",
    "location.neom": "NEOM",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.fleet": "أسطولنا",
    "nav.contact": "اتصل بنا",
    "nav.booking": "الحجز",
    "nav.signup": " اشتراك",
    // Common
    "common.loading": "جاري التحميل...",
    "common.submit": "إرسال",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.close": "إغلاق",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.select": "اختر",
    "common.all": "الكل",

    // Header
    "header.login": "تسجيل الدخول",
    "header.logout": "تسجيل الخروج",
    "header.profile": "الملف الشخصي",
    "header.account": "الحساب",
    "header.signUp": "اشتراك",


    // Footer
    "footer.navigation": "التنقل",
    "footer.services": "الخدمات",
    "footer.support": "الدعم",
    "footer.luxuryTransportation": "النقل الفاخر",
    "footer.eventLogistics": "لوجستيات الفعاليات",
    "footer.corporateEvents": "الفعاليات المؤسسية",
    "footer.weddingServices": "خدمات الزفاف",
    "footer.helpCenter": "مركز المساعدة",
    "footer.faq": "الأسئلة الشائعة",
    "footer.terms": "شروط الخدمة",
    "footer.privacy": "سياسة الخصوصية",
    "footer.copyright": "جميع الحقوق محفوظة",
    "footer.description":
      "حلول النقل الفاخر ولوجستيات الفعاليات في جميع أنحاء المملكة العربية السعودية. نجعل كل مناسبة لا تُنسى بأسطولنا الفاخر وخدمتنا المهنية.",
    "footer.location": "المملكة العربية السعودية",

    // Booking
    "booking.title": "إدارة الحجز",
    "booking.subtitle": "احجز رحلتك المثالية",
    "booking.fullName": "الاسم الكامل",
    "booking.fullNamePlaceholder": "أدخل اسمك الكامل",
    "booking.email": "عنوان البريد الإلكتروني",
    "booking.emailPlaceholder": "أدخل عنوان بريدك الإلكتروني هنا",
    "booking.phone": "رقم الاتصال",
    "booking.phonePlaceholder": "أدخل رقم الاتصال الخاص بك",
    "booking.countryCode": "رمز الدولة",
    "booking.car": "اختر المركبة",
    "booking.selectVehicle": "اختر المركبة",
    "booking.color": "اختر اللون",
    "booking.serviceType": "نوع الخدمة",
    "booking.selectServiceType": "اختر نوع الخدمة",
    "booking.pickupLocation": "موقع الاستلام",
    "booking.pickupLocationPlaceholder": "أدخل موقع الاستلام",
    "booking.destination": "الوجهة",
    "booking.destinationPlaceholder": "أدخل الوجهة",
    "booking.pickupDate": "تاريخ ووقت الاستلام",
    "booking.flightNumber": "رقم الرحلة",
    "booking.flightNumberPlaceholder": "أدخل رقم الرحلة",
    "booking.photo": "رفع صورة (اختياري)",
    "booking.photoDescription": "قم برفع صورة إذا لزم الأمر",
    "booking.submit": "إرسال الحجز",
    "booking.cancel": "إلغاء",
    "booking.backToDetails": "العودة إلى التفاصيل",
    "booking.success":
      "تم إرسال تفاصيل الحجز بنجاح! سيتم تزويدك برسالة قريبًا.",
    "booking.error": "فشل إرسال الحجز. يرجى المحاولة مرة أخرى لاحقًا.",
    "booking.minTime": "الحد الأدنى لوقت الحجز: ساعتان مقدمًا",
    "booking.price": "السعر",
    "booking.excludesVAT": "*لا يشمل ضريبة القيمة المضافة 15%",
    "booking.rent": "الإيجار",

    // Fleet
    "fleet.selectBranch": "اختر الفرع",
    "fleet.fleetClass": "فئة الأسطول",
    "fleet.economy": "اقتصادي",
    "fleet.suv": "دفع رباعي",
    "fleet.luxury": "فاخر",
    "fleet.van": "فان",
    "fleet.bus": "حافلة",
    "fleet.viewDetails": "عرض التفاصيل",
    "fleet.bookNow": "احجز الآن",
    "fleet.rent": "الإيجار",
    "fleet.perHour": "في الساعة",
    "fleet.noVehicles": "لم يتم العثور على مركبات تطابق معاييرك.",
    "fleet.description":
      "تصفح أسطولنا الواسع من المركبات الحديثة والموثوقة لكل احتياج. اختر من بين الاقتصادية، ودفع رباعي، والسيارات الفاخرة، والحافلات المتاحة للإيجار اليومي أو الشهري.",
    "fleet.mostRentedCars": "السيارات الأكثر إيجارًا",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.name": "الاسم",
    "contact.message": "الرسالة",
    "contact.send": "إرسال الرسالة",

    // About
    "about.title": "من نحن",

    // General
    "general.premium": "مميز",
    "general.selectColor": "اختر اللون",
    "general.disclaimer":
      "الصور المعروضة هي لأغراض توضيحية فقط. المواصفات والميزات والتفاصيل الفعلية قد تختلف.",

    // Hero Section
    "hero.title": "النقل الفاخر",
    "hero.title2": "ولوجستيات الفعاليات",
    "hero.subtitle":
      "من مركبات VIP الفاخرة إلى لوجستيات الفعاليات واسعة النطاق، نقدم حلول نقل سلسة وموثوقة وفاخرة ترفع من مستوى كل مناسبة.",
    "hero.bookNow": "احجز الآن",
    "hero.learnMore": "اعرف المزيد",

    // Benefits Section
    "benefits.title": "لماذا تختارنا",
    "benefits.onTime": "ضمان الوصول في الوقت المحدد",
    "benefits.luxuryFleet": "أسطول فاخر",
    "benefits.gpsTracking": "تتبع GPS في الوقت الفعلي",
    "benefits.wifi": "واي فاي داخل السيارة",
    "benefits.clean": "نظيف ومريح",
    "benefits.support": "دعم العملاء على مدار الساعة",
    "benefits.booking": "حجز سهل عبر الإنترنت",
    "benefits.drivers": "سائقون مدربون",

    // Mission Vision
    "mission.title": "مهمتنا",
    "mission.text":
      "تقديم حلول نقل ولوجستية عالية الجودة وسلسة ترفع من مستوى الفعاليات والتجارب في جميع أنحاء المملكة العربية السعودية، مع التركيز على الاحترافية والدقة ورضا العملاء.",
    "vision.title": "رؤيتنا",
    "vision.text":
      "أن نصبح المزود الرائد لخدمات النقل الفاخر ولوجستيات الفعاليات في المملكة العربية السعودية، معترفًا بنا للتميز والابتكار والالتزام الثابت بتجاوز توقعات العملاء.",

    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا عنا",

    // Contact Section
    "contact.getInTouch": "تواصل معنا",
    "contact.description":
      "هل لديك أسئلة أو تحتاج إلى مساعدة؟ نحن هنا لمساعدتك! تواصل معنا من خلال أي من القنوات التالية.",
    "contact.contactUs": "اتصل بنا",
    "contact.namePlaceholder": "أدخل اسمك",
    "contact.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "contact.messagePlaceholder": "أدخل رسالتك",
    "contact.sendMessage": "إرسال الرسالة",
    "contact.success": "تم إرسال تفاصيلك بنجاح! سيتم تزويدك برسالة قريبًا.",
    "contact.error": "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.location": "الموقع",
    "contact.headquarters": "المقر الرئيسي",
    "contact.branch": "الفرع",

    // Download Profile
    "download.title": "تحميل ملف الشركة",
    "download.description":
      "احصل على معلومات مفصلة عن خدماتنا وأسطولنا وتفاصيل الشركة.",
    "download.button": "تحميل الملف",

    // FAQ
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "ابحث عن إجابات سريعة للأسئلة الأكثر شيوعًا حول خدماتنا",
    "faq.searchPlaceholder": "ابحث عن الأسئلة...",
    "faq.generalQuestions": "أسئلة عامة",
    "faq.bookingReservations": "الحجز والاستفسارات",
    "faq.pricingPayment": "التسعير والدفع",
    "faq.services": "الخدمات",
    "faq.safety": "السلامة والأمان",

    // Help Center
    "help.title": "مركز المساعدة",
    "help.subtitle": "ابحث عن إجابات لأسئلتك واحصل على الدعم الذي تحتاجه",
    "help.searchPlaceholder": "ابحث عن مقالات المساعدة...",
    "help.gettingStarted": "البدء",
    "help.bookingReservations": "الحجز والاستفسارات",
    "help.pricingPayment": "التسعير والدفع",
    "help.services": "الخدمات",
    "help.safety": "السلامة والأمان",

    // About Us
    "about.subtitle": "شريكك الموثوق للنقل الفاخر ولوجستيات الفعاليات",

    // Vehicle Details
    "vehicle.view360": "عرض 360 درجة",
    "vehicle.specifications": "المواصفات",
    "vehicle.features": "الميزات",
    "vehicle.interior": "الداخلية",
    "vehicle.bookNow": "احجز الآن",
    "vehicle.selectColor": "اختر اللون",
    "vehicle.engine": "المحرك",
    "vehicle.performance": "الأداء",
    "vehicle.safety": "السلامة",
    "vehicle.technology": "التكنولوجيا",

    // Service Types
    "service.airport": "استلام/إنزال المطار إلى المدينة",
    "service.downtown": "وسط المدينة إلى داخل المدينة",
    "service.intercity": "طريق بين المدن",
    "service.hourly": "السعر بالساعة",
    "service.8hours": "باقة 8 ساعات",
    "service.12hours": "باقة 12 ساعة",

    // Select Car
    "booking.selectCar": "اختر السيارة",
    "booking.selectCarPlaceholder": "اختر السيارة",

    // Locations
    "location.riyadh": "الرياض",
    "location.jeddah": "جدة",
    "location.makkah": "مكة",
    "location.medina": "المدينة المنورة",
    "location.dammam": "الدمام",
    "location.kaust": "جامعة الملك عبدالله",
    "location.kaec": "مدينة الملك عبدالله الاقتصادية",
    "location.yanbu": "ينبع",
    "location.umluj": "أملج",
    "location.redsea": "البحر الأحمر",
    "location.neom": "نيوم",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from localStorage if available (client-side only)
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
        return savedLanguage;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      // Update HTML lang attribute and dir
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    // Set initial HTML attributes
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const t = (key: string): string => {
    // Ensure we have a valid language
    const currentLang = language || "en";
    const translation = translations[currentLang]?.[key];
    if (translation) {
      return translation;
    }
    // Fallback to English if Arabic translation not found
    if (currentLang === "ar" && translations["en"]?.[key]) {
      return translations["en"][key];
    }
    return key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
