export const navigationData = {
  logo: {
    textFirst: 'Orbi',
    textSecond: 'tecks',
    dotColor: 'var(--purple)',
  },
  navLinks: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blog', label: 'Blog' },
  ],
  buttons: {
    talk: "Let's Talk",
    consultation: "Free Consultation",
  },
  footer: {
    cta: {
      subtitle: '✦ Got a Project?',
      titleFirst: 'Crafting',
      titleSecond: 'Since 2020',
      description: "We're a passionate team of designers and developers who craft exceptional digital experiences. Let's build something amazing together.",
      btnStart: 'Start a Project →',
      btnWork: 'View Our Work',
    },
    sections: [
      {
        label: 'Pages',
        links: [
          { to: '/', label: 'Home' },
          { to: '/about', label: 'About Us' },
          { to: '/services', label: 'Services' },
          { to: '/portfolio', label: 'Portfolio' },
          { to: '/blog', label: 'Blog' },
          { to: '/contact', label: 'Contact' },
        ],
      },
      {
        label: 'Services',
        links: [
          { to: '/services/brand-identity', label: 'Brand Identity' },
          { to: '/services/web-design-dev', label: 'Web Design' },
          { to: '/services/seo-growth', label: 'SEO & Marketing' },
          { to: '/services/shopify-ecommerce', label: 'Shopify & E-Com' },
          { to: '/services/ui-ux-design', label: 'UI/UX Design' },
        ],
      },
      {
        label: 'Policies',
        links: [
          { to: '/terms', label: 'Terms of Service' },
          { to: '/privacy-policy', label: 'Privacy Policy' },
          { to: '/refund-policy', label: 'Refund Policy' },
          { to: '/nda', label: 'NDA Agreement' },
        ],
      },
      {
        label: 'Contact',
        links: [
          { href: 'mailto:hello@orbitecks.agency', label: 'hello@orbitecks.agency' },
          { href: 'tel:+1234567890', label: '+1 (234) 567-890' },
        ],
      },
    ],
    bottom: {
      copyright: '© Orbitecks Agency. All rights reserved.',
      socials: [
        { label: 'GitHub', icon: 'git' },
        { label: 'Instagram', icon: 'ig' },
        { label: 'LinkedIn', icon: 'in' },
      ],
    },
  },
};
