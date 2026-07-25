export const servicesData = {
  hero: {
    tag: 'What We Offer',
    titleMain: 'Services That Drive',
    titleAccent: 'Real Results',
    description: 'From brand identity to full digital transformation — we offer a comprehensive suite of services to elevate your business at every stage.',
  },
  expertise: {
    label: 'Our Expertise',
    title: 'Everything You Need To\nGrow Your Business',
    cards: [
      { id: 'brand-identity', icon: '✦', title: 'Brand Identity', desc: 'Logos, typography, color systems, and complete brand guidelines that define your visual language.' },
      { id: 'web-design-dev', icon: '⬡', title: 'Web Design & Dev', desc: 'Beautiful, fast, and conversion-optimized websites built with modern technologies.' },
      { id: 'seo-growth', icon: '◎', title: 'SEO & Growth', desc: 'Data-driven SEO strategies that improve rankings and drive sustainable organic growth.' },
      { id: 'shopify-ecommerce', icon: '◈', title: 'Shopify & E-Commerce', desc: 'High-converting e-commerce stores with seamless UX and powerful backend integrations.' },
      { id: 'ui-ux-design', icon: '⊕', title: 'UI/UX Design', desc: 'User research, wireframing, prototyping, and polished interfaces that people love.' },
      { id: 'digital-marketing', icon: '▣', title: 'Digital Marketing', desc: 'Full-funnel campaigns across paid ads, social media, email, and content marketing.' },
      { id: 'motion-video', icon: '◇', title: 'Motion & Video', desc: 'Brand films, motion graphics, and social content that captivate and convert.' },
      { id: 'content-strategy', icon: '◉', title: 'Content Strategy', desc: 'Strategic content planning, copywriting, and editorial calendars that engage your audience.' },
      { id: 'analytics-cro', icon: '⬤', title: 'Analytics & CRO', desc: 'Data analysis, A/B testing, and conversion rate optimization to maximize your ROI.' },
    ],
  },
  process: {
    label: 'How We Work',
    title: 'Our Proven Process\nFor Success',
    description: "We've refined our workflow over years of working with hundreds of clients. Every project follows a structured process that ensures quality, transparency, and results.",
    steps: [
      { n: '01', t: 'Discovery & Brief', d: 'Deep dive into your business, goals, and market positioning.' },
      { n: '02', t: 'Strategy & Planning', d: 'Custom roadmap aligned with your objectives and timeline.' },
      { n: '03', t: 'Design & Build', d: 'Iterative execution with regular reviews and feedback.' },
      { n: '04', t: 'Launch & Optimize', d: 'Go live with ongoing optimization for best results.' },
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&q=80&fit=crop',
      roiLabel: 'Average Project ROI',
      roiValue: '342%',
    },
  },
  pricing: {
    label: 'Transparent Pricing',
    title: 'Simple, Clear Packages',
    packages: [
      {
        name: 'Starter',
        price: '₹2,00,000',
        period: '/project',
        desc: 'Perfect for startups and small businesses looking to establish their digital presence.',
        features: ['Brand Identity Design', 'Landing Page Design', 'SEO Foundation', 'Social Media Kit', '30-day Support'],
        highlight: false,
      },
      {
        name: 'Growth',
        price: '₹6,00,000',
        period: '/project',
        desc: 'Complete digital transformation for growing businesses ready to scale.',
        features: ['Full Brand Identity', 'Multi-page Website', 'SEO Strategy & Setup', 'Content Strategy', 'Shopify Store Setup', 'Analytics Dashboard', '90-day Support'],
        highlight: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        desc: 'Comprehensive agency partnership for established businesses and corporations.',
        features: ['Everything in Growth', 'Dedicated Account Manager', 'Custom Development', 'Ongoing Marketing', 'Quarterly Strategy Review', 'Priority Support', 'Custom SLA'],
        highlight: false,
      },
    ],
  },
  cta: {
    title: 'Ready To Get Started?',
    description: 'Book your free consultation today and let\'s discuss how we can transform your business.',
    btnText: 'Book Free Consultation →',
  },
};
