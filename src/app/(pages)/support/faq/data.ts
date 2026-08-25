export type FAQCategoryKey =
  | 'general'
  | 'booking'
  | 'payment'
  | 'event'
  | 'safety';

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  key: FAQCategoryKey;
  title: string;
  color: string;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    key: 'general',
    title: 'General Questions',
    color: '#52A4C1',
    questions: [
      {
        question: 'What is Event Force?',
        answer:
          'Event Force is a premium transportation and event logistics company based in Saudi Arabia. We provide luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events.',
      },
      {
        question: 'Where do you operate?',
        answer:
          'We operate throughout Saudi Arabia, serving major cities including Riyadh, Jeddah, Dammam, and other regions. Our services are available nationwide with local expertise in each area.',
      },
      {
        question: 'What types of events do you handle?',
        answer:
          'We handle a wide range of events including corporate meetings, weddings, conferences, airport transfers, city tours, VIP transportation, and large-scale event logistics. Our team can accommodate events of any size.',
      },
      {
        question: 'Do you provide 24/7 service?',
        answer:
          'Yes, we provide 24/7 customer support and emergency services. Our fleet is available around the clock for urgent transportation needs, though advance booking is recommended for better availability.',
      },
    ],
  },
  {
    key: 'booking',
    title: 'Booking & Reservations',
    color: '#52A4C1',
    questions: [
      {
        question: 'How do I make a booking?',
        answer:
          "You can make a booking through our website, mobile app, or by calling our customer service team. Simply select your pickup location, destination, date, time, and vehicle preference. We'll confirm your booking within 24 hours.",
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 24-48 hours in advance for standard services. For special events, peak seasons, or large groups, booking 1-2 weeks ahead ensures better availability and pricing options.',
      },
      {
        question: 'Can I modify my booking?',
        answer:
          'Yes, you can modify your booking up to 24 hours before your scheduled pickup time. Changes include date, time, pickup location, and vehicle type. Contact our support team or use the "Manage Booking" section in your account.',
      },
      {
        question: 'What if I need to cancel my booking?',
        answer:
          'Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.',
      },
    ],
  },
  {
    key: 'payment',
    title: 'Payment & Pricing',
    color: '#52A4C1',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and digital wallets. Corporate clients can also arrange monthly billing. All payments are processed securely through encrypted channels.',
      },
      {
        question: 'When will I be charged?',
        answer:
          'Payment is typically charged at the time of booking confirmation. For long-term rentals, we may require a deposit upfront with the balance due before service delivery. Corporate accounts may have different billing arrangements.',
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          'No, we believe in transparent pricing. All fees are clearly displayed during the booking process. Additional charges may apply for extra services like waiting time, tolls, or special requests, but these are always communicated upfront.',
      },
      {
        question: 'Do you offer corporate discounts?',
        answer:
          'Yes, we offer special rates for corporate clients with regular bookings. Contact our corporate team to discuss volume discounts and customized service packages for your business needs.',
      },
    ],
  },
  {
    key: 'event',
    title: 'Event Logistics',
    color: '#52A4C1',
    questions: [
      {
        question: 'What is included in event logistics services?',
        answer:
          'Our event logistics services include transportation planning, vehicle coordination, driver management, route optimization, timeline management, and on-site support. We handle everything from small meetings to large-scale events.',
      },
      {
        question: 'Do you provide event planning services?',
        answer:
          'While we specialize in transportation and logistics, we work closely with event planners and can coordinate with other vendors. Our team can provide recommendations and connections to trusted event planning partners.',
      },
      {
        question: 'Can you handle international guests?',
        answer:
          'Yes, we provide services for international guests including airport transfers, city tours, and event transportation. Our drivers are professional and can assist with language barriers and cultural considerations.',
      },
      {
        question: 'What if my event has special requirements?',
        answer:
          'We accommodate special requirements including accessibility needs, luxury vehicle preferences, specific timing, and custom routes. Please discuss your needs during the booking process so we can make appropriate arrangements.',
      },
    ],
  },
  {
    key: 'safety',
    title: 'Safety & Security',
    color: '#52A4C1',
    questions: [
      {
        question: 'Are your drivers licensed and insured?',
        answer:
          'Yes, all our drivers are professionally licensed, fully insured, and undergo regular background checks. They are trained in defensive driving, customer service, and emergency procedures to ensure your safety.',
      },
      {
        question: 'What safety measures do you have in place?',
        answer:
          'We maintain comprehensive safety protocols including regular vehicle inspections, GPS tracking, emergency communication systems, and 24/7 monitoring. All vehicles are equipped with safety features and maintained to the highest standards.',
      },
      {
        question: 'Do you have insurance coverage?',
        answer:
          'Yes, we carry comprehensive commercial insurance coverage for all our vehicles and services. This includes liability coverage, vehicle damage protection, and passenger insurance to ensure complete protection.',
      },
      {
        question: 'What happens in case of an emergency?',
        answer:
          'In case of emergency, our drivers are trained to handle various situations and can contact our 24/7 support team immediately. We have established protocols for medical emergencies, vehicle breakdowns, and other urgent situations.',
      },
    ],
  },
];

export const popularQuestions = [
  'How much does it cost to book a vehicle?',
  'Can I book a vehicle for the same day?',
  'What types of vehicles do you have?',
  'Do you provide airport transfers?',
  'Can I book multiple vehicles for an event?',
  'What is your cancellation policy?',
  'Do you offer chauffeur services?',
  'How do I track my vehicle?',
];
