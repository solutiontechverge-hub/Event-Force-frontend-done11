export type TermsIconKey = 'gavel' | 'security' | 'creditCard' | 'carRental' | 'event';

export type TermsSection = {
  title: string;
  iconKey: TermsIconKey;
  color: string;
  content: string[];
};

export type TermsParagraph = {
  title: string;
  content: string;
};

export const TERMS_LAST_UPDATED = 'December 2024';

export const TERMS_SECTIONS: TermsSection[] = [
  {
    title: '1. Acceptance of Terms',
    iconKey: 'gavel',
    color: '#52A4C1',
    content: [
      'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement.',
      'If you do not agree to abide by the above, please do not use this service.',
      'These terms apply to all visitors, users, and others who access or use the service.',
    ],
  },
  {
    title: '2. Service Description',
    iconKey: 'carRental',
    color: '#1976d2',
    content: [
      'Event Force provides premium transportation and event logistics services across Saudi Arabia.',
      'Our services include luxury vehicle rentals, chauffeur services, event transportation, and logistics planning.',
      'All services are subject to availability and may be modified or discontinued at our discretion.',
      'We reserve the right to refuse service to anyone for any reason at any time.',
    ],
  },
  {
    title: '3. User Accounts',
    iconKey: 'security',
    color: '#f57c00',
    content: [
      'You must provide accurate, current, and complete information when creating an account.',
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You must notify us immediately of any unauthorized use of your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    title: '4. Booking and Payment',
    iconKey: 'creditCard',
    color: '#4caf50',
    content: [
      'All bookings are subject to availability and confirmation by Event Force.',
      'Payment is required at the time of booking unless otherwise agreed.',
      'We accept major credit cards, bank transfers, and approved corporate billing.',
      'Prices are subject to change without notice, but confirmed bookings will be honored at the agreed rate.',
      'Cancellation policies vary by service type and are detailed in your booking confirmation.',
    ],
  },
  {
    title: '5. Event Logistics Services',
    iconKey: 'event',
    color: '#9c27b0',
    content: [
      'Event logistics services require detailed planning and may involve additional terms.',
      'Client cooperation is essential for successful event execution.',
      'Changes to event logistics must be communicated at least 48 hours in advance.',
      'Additional charges may apply for last-minute changes or special requirements.',
    ],
  },
];

export const TERMS_ADDITIONAL: TermsParagraph[] = [
  {
    title: '6. Limitation of Liability',
    content:
      'Event Force shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.',
  },
  {
    title: '7. Indemnification',
    content:
      'You agree to defend, indemnify, and hold harmless Event Force and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these terms.',
  },
  {
    title: '8. Privacy Policy',
    content:
      'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.',
  },
  {
    title: '9. Modifications',
    content:
      'We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.',
  },
  {
    title: '10. Governing Law',
    content:
      'These terms shall be interpreted and governed by the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Saudi Arabia.',
  },
];

