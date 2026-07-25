export interface ProjectDetails {
  id: string;
  cat: string;
  title: string;
  desc: string;
  img: string;
  year: string;
  client: string;
  duration: string;
  services: string[];
  challenge: string;
  solution: string;
  outcome: string;
  results: string[];
}

export const portfolioData = {
  hero: {
    tag: 'Our Work',
    titleMain: 'Work That',
    titleAccent: 'Speaks',
    titleEnd: 'For Itself',
    description: 'Explore our portfolio of work across branding, web design, e-commerce, and digital marketing. Every project tells a unique story of transformation.',
  },
  stats: [
    { val: '500+', label: 'Projects Delivered' },
    { val: '50+', label: 'Industries Served' },
    { val: '30+', label: 'Countries' },
    { val: '4.9★', label: 'Client Rating' },
  ],
  categories: ['All', 'Branding', 'Web Design', 'E-Commerce', 'Marketing', 'UI/UX'],
  projects: [] as ProjectDetails[],
  featuredCaseStudy: null,
  cta: {
    label: 'Start Today',
    title: 'Your Project Could Be\nOur Next Case Study',
    description: "Let's create something remarkable together. Book a free consultation and let's explore your project.",
    btnPrimary: { text: 'Get Free Consultation →', to: '/consultation' },
    btnSecondary: { text: 'Contact Us', to: '/contact' },
  },
};
