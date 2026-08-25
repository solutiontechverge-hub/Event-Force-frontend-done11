export type SupportItemIcon =
  | 'Help'
  | 'QuestionAnswer'
  | 'Description'
  | 'PrivacyTip';

export type QuickActionIcon = 'ContactSupport' | 'Support';

export type QuickActionType = 'link' | 'whatsapp';

export interface SupportItem {
  title: string;
  description: string;
  icon: SupportItemIcon;
  href: string;
  color: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: QuickActionIcon;
  href: string;
  color: string;
  type: QuickActionType;
}

export const supportItems: SupportItem[] = [
  {
    title: 'Help Center',
    description:
      'Find answers to common questions and get step-by-step guides',
    icon: 'Help',
    href: '/support/help-center',
    color: '#52A4C1',
  },
  {
    title: 'FAQ',
    description: 'Browse frequently asked questions for quick solutions',
    icon: 'QuestionAnswer',
    href: '/support/faq',
    color: '#1976d2',
  },
  {
    title: 'Terms of Service',
    description: 'Read our terms and conditions for using our services',
    icon: 'Description',
    href: '/support/terms',
    color: '#f57c00',
  },
  {
    title: 'Privacy Policy',
    description: 'Learn how we protect and handle your personal information',
    icon: 'PrivacyTip',
    href: '/support/privacy',
    color: '#9c27b0',
  },
];

export const quickActions: QuickAction[] = [
  {
    title: 'Contact Support',
    description: 'Get in touch with our support team',
    icon: 'ContactSupport',
    href: '/contact-us',
    color: '#52A4C1',
    type: 'link',
  },
  {
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    icon: 'Support',
    href: '#',
    color: '#1976d2',
    type: 'whatsapp',
  },
];

export const popularTopics = [
  'Booking Issues',
  'Payment Problems',
  'Driver Contact',
  'Cancellation',
  'Refunds',
];

export const WHATSAPP_PHONE = '+966594279012';
export const WHATSAPP_MESSAGE =
  'Hello! I need support regarding Event Force services.';
