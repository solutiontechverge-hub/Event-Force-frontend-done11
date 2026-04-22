export type FooterLinkGroupKey = 'navigation' | 'services' | 'support';

export type FooterLinkDef = {
  /**
   * Translation key passed to `t(...)` inside the Footer.
   * Keeping keys here avoids recreating arrays in the component.
   */
  labelKey: string;
  href: string;
};

export const FOOTER_LINKS: Record<FooterLinkGroupKey, FooterLinkDef[]> = {
  navigation: [
    { labelKey: 'nav.about', href: '/about-us' },
    { labelKey: 'nav.fleet', href: '/our-fleet' },
    { labelKey: 'nav.booking', href: '/manage-booking' },
    { labelKey: 'nav.contact', href: '/contact-us' },
  ],
  services: [
    { labelKey: 'footer.luxuryTransportation', href: '#' },
    { labelKey: 'footer.eventLogistics', href: '#' },
    { labelKey: 'footer.corporateEvents', href: '#' },
    { labelKey: 'footer.weddingServices', href: '#' },
  ],
  support: [
    { labelKey: 'footer.helpCenter', href: '/support/help-center' },
    { labelKey: 'footer.faq', href: '/support/faq' },
    { labelKey: 'footer.terms', href: '/support/terms' },
    { labelKey: 'footer.privacy', href: '/support/privacy' },
  ],
};

