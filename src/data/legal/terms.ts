export const TERMS_LAST_UPDATED = 'December 2024';

export const termsHeroSubtitle =
  'Please read these terms carefully before using our services';

export const termsSupportIntro =
  'These Terms of Service ("Terms") govern your use of Event Force\'s transportation and event logistics services. By using our services, you agree to be bound by these terms.';

export type TermsSectionIcon =
  | 'Gavel'
  | 'CarRental'
  | 'Security'
  | 'CreditCard'
  | 'Event';

export interface TermsMainSection {
  title: string;
  icon: TermsSectionIcon;
  color: string;
  content: string[];
}

export const termsMainSections: TermsMainSection[] = [
  {
    title: '1. Acceptance of Terms',
    icon: 'Gavel',
    color: '#52A4C1',
    content: [
      'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement.',
      'If you do not agree to abide by the above, please do not use this service.',
      'These terms apply to all visitors, users, and others who access or use the service.',
    ],
  },
  {
    title: '2. Service Description',
    icon: 'CarRental',
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
    icon: 'Security',
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
    icon: 'CreditCard',
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
    icon: 'Event',
    color: '#9c27b0',
    content: [
      'Event logistics services require detailed planning and may involve additional terms.',
      'Client cooperation is essential for successful event execution.',
      'Changes to event logistics must be communicated at least 48 hours in advance.',
      'Additional charges may apply for last-minute changes or special requirements.',
    ],
  },
];

export interface TermsAdditionalSection {
  title: string;
  content: string;
}

export const termsAdditionalSections: TermsAdditionalSection[] = [
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

export interface TermsSupportSection {
  title: string;
  content: string;
}

export const termsSupportSections: TermsSupportSection[] = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
  },
  {
    title: '2. Description of Service',
    content:
      'Event Force provides premium transportation and event logistics services including but not limited to luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events across Saudi Arabia.',
  },
  {
    title: '3. User Responsibilities',
    content:
      'Users are responsible for providing accurate information during booking, arriving on time for scheduled services, treating drivers and staff with respect, and following all applicable laws and regulations. Any damage to vehicles or equipment will be charged to the user.',
  },
  {
    title: '4. Booking and Cancellation Policy',
    content:
      'Bookings must be made at least 24 hours in advance. Free cancellation is available up to 24 hours before scheduled service. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.',
  },
  {
    title: '5. Payment Terms',
    content:
      'Payment is required at the time of booking confirmation. We accept all major credit cards, bank transfers, and digital wallets. All payments are processed securely through encrypted channels. Corporate clients may arrange monthly billing with approved credit terms.',
  },
  {
    title: '6. Service Availability',
    content:
      'While we strive to provide reliable service, we cannot guarantee availability during peak times, severe weather conditions, or other circumstances beyond our control. We reserve the right to substitute vehicles of similar quality and capacity when necessary.',
  },
  {
    title: '7. Liability and Insurance',
    content:
      'Event Force carries comprehensive commercial insurance coverage for all vehicles and services. Our liability is limited to the cost of the service provided. Users are responsible for their personal belongings and any damage caused by their negligence.',
  },
  {
    title: '8. Privacy and Data Protection',
    content:
      'We are committed to protecting your privacy and personal information. All data is collected, stored, and processed in accordance with applicable privacy laws and our Privacy Policy. We do not sell or share your personal information with third parties without your consent.',
  },
  {
    title: '9. Prohibited Activities',
    content:
      'Users are prohibited from using our services for illegal activities, transporting prohibited items, smoking in vehicles, consuming alcohol, or engaging in any behavior that may endanger the driver, other passengers, or the public.',
  },
  {
    title: '10. Intellectual Property',
    content:
      'All content, trademarks, logos, and intellectual property displayed on our website and materials are the property of Event Force or our licensors. Users may not reproduce, distribute, or use any content without written permission.',
  },
  {
    title: '11. Termination',
    content:
      'We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use the service will cease immediately.',
  },
  {
    title: '12. Governing Law',
    content:
      'These terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Saudi Arabia.',
  },
  {
    title: '13. Changes to Terms',
    content:
      'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the new terms.',
  },
  {
    title: '14. Contact Information',
    content:
      'For questions about these terms or our services, please contact us at:\n\nEmail: legal@eventforce.sa.com\nPhone: +9660549454525 (WhatsApp) | +966125786869 \nAddress: Riyadh, Saudi Arabia',
  },
];

export const termsContactEmail = 'legal@eventforce.sa.com';
export const termsContactPhone = '+9660549454525 (WhatsApp) | +966125786869';
