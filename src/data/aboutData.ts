export const aboutData = {
  hero: {
    tag: 'About Us',
    titleMain: 'We Are A',
    titleAccent: 'Creative',
    titleEnd: 'Digital Agency',
    description: "Since 2020, we've been helping businesses of all sizes transform their digital presence. Our passionate team of 25+ experts crafts exceptional experiences that drive real growth.",
  },
  stats: [
    { val: '500', unit: '+', desc: 'Projects Completed' },
    { val: '28', unit: '+', desc: 'Years Experience' },
    { val: '25', unit: '+', desc: 'Team Members' },
    { val: '4.9', unit: '★', desc: 'Average Rating' },
  ],
  mission: {
    label: 'Our Mission',
    title: 'Powerful Agency For\nCorporate Business.',
    description1: 'Our mission is to empower businesses with cutting-edge digital solutions that drive measurable results. We believe every brand deserves world-class creative and strategic support, regardless of size.',
    description2: 'Founded in 2020, Orbitecks has grown into a full-service digital agency trusted by startups and Fortune 500 companies alike. Our diverse team brings expertise across design, development, strategy, and marketing.',
    btnStart: { text: 'Get Started →', to: '/consultation' },
    btnWork: { text: 'Our Work', to: '/portfolio' },
    image: {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop',
      label: 'Trusted Worldwide',
      subtext: '500+ Happy Clients across 30+ Countries',
    },
  },
  team: {
    label: 'Our Team',
    title: 'Meet The People Behind\nThe Magic',
    members: [] as { name: string; role: string; img: string; linkedin: string }[],
  },
  values: {
    label: 'What We Stand For',
    title: 'Our Core Values',
    list: [
      { icon: '✦', title: 'Creative Excellence', desc: 'We push the boundaries of design and innovation to deliver work that truly stands out in the market.' },
      { icon: '◎', title: 'Client-First', desc: 'Your success is our success. We build deep partnerships and are invested in your long-term growth.' },
      { icon: '⬡', title: 'Data-Driven', desc: 'Every decision is backed by research, analytics, and measurable outcomes — no guesswork.' },
      { icon: '◈', title: 'Transparency', desc: 'Open communication, honest timelines, and clear pricing. No surprises, just results.' },
      { icon: '▣', title: 'Agility', desc: 'We adapt quickly to market changes and evolving client needs with fast, iterative execution.' },
      { icon: '⊕', title: 'Impact', desc: 'We measure our success by the real business impact our work creates for our clients.' },
    ],
  },
  cta: {
    label: 'Work With Us',
    title: 'Ready To Elevate Your Brand?',
    description: "Let's discuss your project and create something extraordinary together.",
    btnPrimary: { text: 'Get Free Consultation →', to: '/consultation' },
    btnSecondary: { text: 'Contact Us', to: '/contact' },
  },
};
