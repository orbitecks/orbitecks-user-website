export const consultationData = {
  hero: {
    badge: '✦ Free, No-Commitment Consultation',
    title: 'Book Your Free\nConsultation',
    description: "30 minutes with our senior strategist. We'll review your goals, explore solutions, and outline a clear roadmap — completely free.",
  },
  steps: [
    { label: 'Your Details', icon: '👤' },
    { label: 'Project Info', icon: '📋' },
    { label: 'Schedule', icon: '📅' },
  ],
  form: {
    success: {
      title: "You're All Set!",
      desc: "Your consultation request has been received. Our team will confirm your slot and send you a calendar invite within 24 hours.",
      btnHome: 'Back to Home',
      btnWork: 'Explore Our Work',
    },
    step0: {
      title: 'Tell Us About You',
      desc: "We'd love to know a bit about you before our session.",
      labelName: 'Full Name *',
      labelEmail: 'Email Address *',
      labelCompany: 'Company / Brand',
      labelPhone: 'Phone Number',
    },
    step1: {
      title: 'About Your Project',
      desc: 'Help us understand what you\'re looking to achieve.',
      labelService: 'Service Needed *',
      labelBudget: 'Budget Range',
      labelTimeline: 'Project Timeline',
      labelDesc: 'Project Description',
    },
    step2: {
      title: 'Pick Your Slot',
      desc: 'Choose a convenient time for your 30-minute consultation.',
      labelAvailable: 'Available Slots This Week',
      labelCustomDate: 'Or Pick a Custom Date',
      labelCustomTime: 'Custom Time',
      labelNotes: 'Anything Else?',
    },
    slots: [
      'Mon Jul 7, 10am', 'Mon Jul 7, 2pm', 'Tue Jul 8, 11am',
      'Tue Jul 8, 3pm', 'Wed Jul 9, 10am', 'Thu Jul 10, 2pm',
    ],
    btnBack: '← Back',
    btnContinue: 'Continue →',
    btnBook: 'Book Consultation',
  },
  expect: {
    title: 'What To Expect',
    subtitle: 'Here\'s what happens during your free 30-minute consultation',
    list: [
      { icon: 'target', title: 'Goal Alignment', desc: 'We discuss your business objectives and challenges to ensure we understand exactly what success looks like for you.' },
      { icon: 'bulb', title: 'Strategy Overview', desc: 'Our expert will outline a high-level strategy tailored to your specific needs, industry, and budget.' },
      { icon: 'map', title: 'Clear Roadmap', desc: 'You\'ll leave with a clear action plan and next steps, whether you decide to work with us or not.' },
    ],
  },
  trustBadges: ['✓ Completely Free', '✓ No Obligation', '✓ 30 Minutes', '✓ Senior Strategist'],
  budgets: ['Under ₹15,000', '₹15,000 – ₹30,000', '₹30,000 – ₹60,000', '₹60,000 – ₹1,00,000', '₹1,00,000+'],
};
