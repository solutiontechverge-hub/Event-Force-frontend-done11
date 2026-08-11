export const PRIVACY_LAST_UPDATED = 'December 2024';

export const privacyIntro =
  'This Privacy Policy explains how Event Force collects, uses, and protects your personal information when you use our transportation and event logistics services. By using our services, you agree to the collection and use of information in accordance with this policy.';

export const privacySupportIntro =
  'This Privacy Policy explains how Event Force collects, uses, and protects your personal information when you use our transportation and event logistics services. We are committed to protecting your privacy and ensuring the security of your personal data.';

export const privacyDataTypes = [
  'Personal identification information (name, email, phone number)',
  'Payment information (credit card details, billing address)',
  'Location data (pickup and destination addresses)',
  'Booking history and preferences',
  'Communication records (emails, calls, messages)',
  'Device information (IP address, browser type, operating system)',
  'Usage data (website interactions, app usage patterns)',
];

export const privacyDataUsage = [
  'Process and fulfill your transportation bookings',
  'Provide customer support and respond to inquiries',
  'Send booking confirmations and updates',
  'Process payments and prevent fraud',
  'Improve our services and user experience',
  'Send marketing communications (with your consent)',
  'Comply with legal obligations and regulations',
  'Ensure safety and security of our services',
];

export const privacyDataProtection = [
  'Encryption of sensitive data in transit and at rest',
  'Regular security audits and vulnerability assessments',
  'Access controls and authentication measures',
  'Secure data centers with physical security measures',
  'Employee training on data protection practices',
  'Incident response procedures for data breaches',
  'Regular backup and recovery procedures',
  'Compliance with international data protection standards',
];

export interface PrivacyUserRight {
  title: string;
  description: string;
  icon: 'Visibility' | 'Settings' | 'Delete' | 'DataUsage';
}

export const privacyUserRights: PrivacyUserRight[] = [
  {
    title: 'Right to Access',
    description:
      'You can request a copy of all personal data we hold about you.',
    icon: 'Visibility',
  },
  {
    title: 'Right to Rectification',
    description:
      'You can request correction of inaccurate or incomplete personal data.',
    icon: 'Settings',
  },
  {
    title: 'Right to Erasure',
    description:
      'You can request deletion of your personal data under certain circumstances.',
    icon: 'Delete',
  },
  {
    title: 'Right to Data Portability',
    description:
      'You can request your data in a structured, machine-readable format.',
    icon: 'DataUsage',
  },
];

export interface PrivacyCookieType {
  type: string;
  purpose: string;
  examples: string;
}

export const privacyCookieTypes: PrivacyCookieType[] = [
  {
    type: 'Essential Cookies',
    purpose: 'Required for basic website functionality and security',
    examples: 'Authentication, session management, security features',
  },
  {
    type: 'Analytics Cookies',
    purpose: 'Help us understand how visitors interact with our website',
    examples: 'Google Analytics, user behavior tracking, performance metrics',
  },
  {
    type: 'Marketing Cookies',
    purpose: 'Used to deliver relevant advertisements and marketing content',
    examples: 'Social media pixels, advertising networks, remarketing',
  },
  {
    type: 'Preference Cookies',
    purpose: 'Remember your choices and preferences for a better experience',
    examples: 'Language settings, theme preferences, location settings',
  },
];

export interface PrivacySection {
  title: string;
  content: string;
}

export const privacySupportSections: PrivacySection[] = [
  {
    title: '1. Information We Collect',
    content:
      'We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes:\n\n• Personal information (name, email, phone number)\n• Booking details (pickup/destination, dates, vehicle preferences)\n• Payment information (processed securely through encrypted channels)\n• Communication records (emails, calls, support tickets)\n• Usage data (website interactions, app usage, preferences)',
  },
  {
    title: '2. How We Use Your Information',
    content:
      'We use the information we collect to:\n\n• Provide and improve our transportation services\n• Process bookings and payments\n• Communicate with you about your bookings\n• Send service updates and promotional offers (with your consent)\n• Provide customer support\n• Ensure safety and security\n• Comply with legal obligations\n• Analyze usage patterns to improve our services',
  },
  {
    title: '3. Information Sharing',
    content:
      'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:\n\n• With service providers who assist us in operating our business (payment processors, SMS providers)\n• With drivers and staff who need access to provide services\n• When required by law or to protect our rights\n• In case of business transfers or mergers\n• With your explicit consent',
  },
  {
    title: '4. Data Security',
    content:
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:\n\n• Encryption of sensitive data in transit and at rest\n• Regular security assessments and updates\n• Access controls and authentication measures\n• Secure payment processing\n• Staff training on data protection practices',
  },
  {
    title: '5. Data Retention',
    content:
      'We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Generally:\n\n• Booking information: 7 years for accounting and legal purposes\n• Customer support records: 3 years\n• Marketing data: Until you opt out or 2 years of inactivity\n• Legal compliance data: As required by applicable laws',
  },
  {
    title: '6. Your Rights',
    content:
      'You have the following rights regarding your personal information:\n\n• Access: Request a copy of your personal data\n• Rectification: Correct inaccurate or incomplete information\n• Erasure: Request deletion of your personal data\n• Portability: Receive your data in a structured format\n• Objection: Opt out of certain data processing activities\n• Restriction: Limit how we process your data\n• Withdraw consent: Revoke consent for marketing communications',
  },
  {
    title: '7. Cookies and Tracking',
    content:
      'We use cookies and similar technologies to:\n\n• Remember your preferences and settings\n• Analyze website traffic and usage patterns\n• Provide personalized content and advertisements\n• Ensure website functionality and security\n\nYou can control cookie settings through your browser, but disabling cookies may affect website functionality.',
  },
  {
    title: '8. Third-Party Services',
    content:
      'Our services may integrate with third-party services for:\n\n• Payment processing (stripe, PayPal)\n• SMS notifications (Twilio)\n• Analytics (Google Analytics)\n• Maps and navigation (Google Maps)\n\nThese services have their own privacy policies, and we encourage you to review them.',
  },
  {
    title: '9. International Transfers',
    content:
      'Your personal information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers, including:\n\n• Standard contractual clauses\n• Adequacy decisions by relevant authorities\n• Binding corporate rules\n• Your explicit consent where required',
  },
  {
    title: "10. Children's Privacy",
    content:
      'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.',
  },
  {
    title: '11. Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:\n\n• Posting the updated policy on our website\n• Sending email notifications to registered users\n• Displaying prominent notices on our services\n\nContinued use of our services after changes constitutes acceptance of the updated policy.',
  },
  {
    title: '12. Contact Us',
    content:
      'If you have any questions about this Privacy Policy or our data practices, please contact us:\n\n• Email: privacy@eventforce.sa.com\n• Phone: +9660549454525 (WhatsApp) | +966125786869 \n• Address: Riyadh, Saudi Arabia\n• Data Protection Officer: dpo@eventforce.sa.com\n\nWe will respond to your inquiry within 30 days.',
  },
];

export const privacyContactEmail = 'privacy@eventforce.sa.com';
export const privacyContactPhone =
  '++966 54 945 4525 (WhatsApp) | +966125786869';
