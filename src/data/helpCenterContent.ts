export type HelpCenterIconKey = 'help' | 'book' | 'support';

export type HelpCenterArticle = {
  question: string;
  answer: string;
};

export type HelpCenterCategory = {
  title: string;
  iconKey: HelpCenterIconKey;
  color: string;
  articles: HelpCenterArticle[];
};

export const HELP_CENTER_CATEGORIES: HelpCenterCategory[] = [
  {
    title: 'Getting Started',
    iconKey: 'help',
    color: '#52A4C1',
    articles: [
      {
        question: 'How do I create an account?',
        answer:
          'Creating an account is simple! Click on "Sign Up" in the top right corner, fill in your details, and verify your email address. You can also sign up using Google or Apple for faster registration.',
      },
      {
        question: 'What information do I need to book a vehicle?',
        answer:
          "To book a vehicle, you'll need to provide your pickup location, destination, date and time, contact information, and any special requirements. We also need to know the number of passengers and luggage requirements.",
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'We recommend booking at least 24-48 hours in advance for standard services. For special events or peak times, booking 1-2 weeks ahead ensures better availability and pricing options.',
      },
    ],
  },
  {
    title: 'Booking & Reservations',
    iconKey: 'book',
    color: '#52A4C1',
    articles: [
      {
        question: 'Can I modify my booking?',
        answer:
          'Yes! You can modify your booking up to 24 hours before your scheduled pickup time. Changes include date, time, pickup location, and vehicle type. Contact our support team or use the "Manage Booking" section in your account.',
      },
      {
        question: 'What is your cancellation policy?',
        answer:
          'Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.',
      },
      {
        question: 'How do I track my vehicle?',
        answer:
          "Once your booking is confirmed, you'll receive a tracking link via SMS and email. You can also track your vehicle in real-time through our mobile app or website using your booking reference number.",
      },
    ],
  },
  {
    title: 'Payment & Billing',
    iconKey: 'support',
    color: '#52A4C1',
    articles: [
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
        question: 'Can I get a receipt for my booking?',
        answer:
          'Yes! Receipts are automatically generated and sent to your email after payment. You can also download receipts from your account dashboard. For corporate clients, detailed invoices are provided for accounting purposes.',
      },
    ],
  },
];

export const HELP_CENTER_POPULAR_TOPICS: string[] = [
  'Vehicle availability',
  'Pricing information',
  'Driver details',
  'Booking modifications',
  'Payment issues',
  'Cancellation policy',
  'Event logistics',
  'Corporate services',
];

