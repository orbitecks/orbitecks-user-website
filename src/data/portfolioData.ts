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
    titleMain: 'Projects That',
    titleAccent: 'Define Us',
    titleEnd: '',
    description: 'Explore our latest client collaborations, visual redesigns, software applications, and search engine optimization case studies.',
  },
  stats: [
    { val: '500+', label: 'Projects Finished' },
    { val: '99%', label: 'Client Satisfaction' },
    { val: '3.5X', label: 'Average Growth ROI' },
  ],
  categories: ['All', 'Branding', 'Web Design', 'Development', 'SEO'],
  projects: [] as ProjectDetails[],
  featuredCaseStudy: null,
  cta: {
    label: 'Start Today',
    title: 'Ready To Build Something Amazing?',
    description: "Let's discuss your objectives and build a digital solution that translates into growth.",
    btnPrimary: { text: 'Get Free Consultation →', to: '/consultation' },
    btnSecondary: { text: 'Contact Us', to: '/contact' },
  },
};
