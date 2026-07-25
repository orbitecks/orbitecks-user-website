import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface ServiceDetailData {
  title: string;
  icon: string;
  desc: string;
  heroImg: string;
  features: string[];
  process: { step: string; desc: string }[];
  deliverables: string[];
  techStack: string[];
}

const serviceCatalog: Record<string, ServiceDetailData> = {
  'brand-identity': {
    title: 'Brand Identity',
    icon: '✦',
    desc: 'Establish a memorable, professional identity that resonates with your core audience. We craft comprehensive visual languages, from logos to guidelines, that tell your unique story.',
    heroImg: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80&fit=crop',
    features: [
      'Custom Logo Design & Visual System',
      'Harmonious Color Palette & Typographic System',
      'Comprehensive Brand Style Guidelines',
      'Stationery, Business Cards, and Collateral Design',
      'Brand Strategy & Positioning Advisory'
    ],
    process: [
      { step: '01. Discovery & Strategy', desc: 'Understanding your values, mission, target demographics, and market positioning.' },
      { step: '02. Concept Development', desc: 'Brainstorming, sketching, and refining multiple distinct visual concepts.' },
      { step: '03. Feedback & Revisions', desc: 'Collaborating closely to iterate and polish the chosen identity.' },
      { step: '04. Asset Delivery', desc: 'Providing vector formats, font suggestions, and a comprehensive style guide book.' }
    ],
    deliverables: ['Vector Logos (AI, SVG, PDF)', 'Brand Guidelines Book', 'Social Media Branding Kit', 'Stationery Assets'],
    techStack: ['Adobe Illustrator', 'Figma', 'Adobe InDesign', 'Photoshop']
  },
  'web-design-dev': {
    title: 'Web Design & Dev',
    icon: '⬡',
    desc: 'High-performance, bespoke corporate websites built to convert visitors into loyal customers. We merge premium visual aesthetics with state-of-the-art frontend technology.',
    heroImg: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&q=80&fit=crop',
    features: [
      'Responsive Web Layouts (Mobile & Tablet optimized)',
      'Modern Jamstack & Single-Page Application architectures',
      'Headless CMS integrations (Contentful, Sanity, Strapi)',
      'Page speed optimization & clean Semantic HTML',
      'SEO-friendly structure & accessible coding (WCAG compliance)'
    ],
    process: [
      { step: '01. Wireframing & UX Map', desc: 'Structuring user journeys, site maps, and layout blueprints.' },
      { step: '02. UI Design & Mockups', desc: 'Creating premium visual mockups matching brand identities.' },
      { step: '03. Frontend & CMS Dev', desc: 'Developing with clean code, setting up headless workflows.' },
      { step: '04. QA & Launch', desc: 'Exhaustive cross-browser testing and seamless hosting deployment.' }
    ],
    deliverables: ['Figma Design Files', 'Production-ready Codebase', 'CMS Admin Access', 'Performance Reports'],
    techStack: ['React.js / Next.js', 'Vite', 'TypeScript', 'Node.js', 'Sanity / Contentful', 'Vercel']
  },
  'seo-growth': {
    title: 'SEO & Growth',
    icon: '◎',
    desc: 'Boost your visibility on major search engines and drive high-intent organic traffic that scales your lead generation organically.',
    heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop',
    features: [
      'Comprehensive Keyword Research & Analysis',
      'On-Page Optimization (Meta tags, content structure, schema markup)',
      'Technical SEO audits (Site speeds, indexing issues, core web vitals)',
      'High-quality Link Building & Digital PR strategies',
      'Competitor analysis & rank tracking dashboards'
    ],
    process: [
      { step: '01. SEO Audit', desc: 'Exposing current search performance, technical leaks, and rankings.' },
      { step: '02. Strategic Setup', desc: 'Identifying high-impact keywords and configuring metadata.' },
      { step: '03. Content Expansion', desc: 'Drafting intent-focused landing pages and articles.' },
      { step: '04. Monitor & Iterate', desc: 'Analyzing monthly ranking reports, adjusting strategy based on analytics.' }
    ],
    deliverables: ['SEO Audit Report', 'Rank Tracking Dashboard Access', 'Monthly Performance Report', 'Content Strategy Map'],
    techStack: ['Google Analytics 4', 'Ahrefs / Semrush', 'Google Search Console', 'Screaming Frog']
  },
  'shopify-ecommerce': {
    title: 'Shopify & E-Commerce',
    icon: '◈',
    desc: 'Beautiful online storefronts engineered for maximum conversion. We construct frictionless purchasing journeys that turn casual visitors into repeating buyers.',
    heroImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&fit=crop',
    features: [
      'Custom Shopify Theme Design & Development',
      'Seamless checkout flow optimization & cart recovery setups',
      'Third-party integrations (ERP, inventory systems, CRM)',
      'Sub-second load times for catalog pages',
      'Tailored product filtering & advanced search functionality'
    ],
    process: [
      { step: '01. User Journey Analysis', desc: 'Analyzing ideal customer behavior to reduce friction.' },
      { step: '02. Store UI Design', desc: 'Bespoke designs highlighting products, catalogs, and checkout steps.' },
      { step: '03. Shopify Liquid Dev', desc: 'Building custom custom components on Shopify Slate / Liquid.' },
      { step: '04. Migration & Launch', desc: 'Migrating product catalogs, customer logs, and setting up DNS.' }
    ],
    deliverables: ['Custom Shopify Theme', 'App Integrations Config', 'Inventory Workflow Setup', 'E-com Analytics Setup'],
    techStack: ['Shopify Liquid / Hydrogen', 'Figma', 'JavaScript / Tailwind', 'Klaviyo', 'Stripe']
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: '⊕',
    desc: 'User-centric product designs that maximize user engagement. We combine meticulous user research with striking user interface aesthetics.',
    heroImg: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&fit=crop',
    features: [
      'In-depth User Research & User Persona creation',
      'Interactive Prototyping & wireframe flows',
      'Clean Design Systems & Component Libraries',
      'Usability Testing & Feedback collection',
      'Smooth handoff workflows to developers'
    ],
    process: [
      { step: '01. Empathize & Define', desc: 'Conducting interviews and defining user challenge scenarios.' },
      { step: '02. Wireframing', desc: 'Mapping rapid low-fidelity layouts to test flows.' },
      { step: '03. Visual System Design', desc: 'Constructing typography, components, and high-fidelity interfaces.' },
      { step: '04. Interactive Testing', desc: 'Building functional prototypes to test with actual user groups.' }
    ],
    deliverables: ['Figma Prototype', 'UX Research Report', 'Design System Library', 'Developer Specs Handoff'],
    techStack: ['Figma', 'Adobe XD', 'Principle', 'Maze (testing)']
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    icon: '▣',
    desc: 'Reach the right audience with strategic marketing solutions. We design full-funnel ad campaigns and brand promotions that scale qualified leads.',
    heroImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop',
    features: [
      'Social Media Ads (Meta, LinkedIn, TikTok)',
      'Search Engine Advertising (Google Search & Shopping Ads)',
      'Tailored Email Marketing & Automation workflows',
      'Conversion Funnel Optimization',
      'High-impact Landing Page layouts designed to capture leads'
    ],
    process: [
      { step: '01. Audience Research', desc: 'Locating and segmenting your highest value potential buyers.' },
      { step: '02. Creative Strategy', desc: 'Drafting high-converting ad copy and visual assets.' },
      { step: '03. Campaign Setup', desc: 'Configuring campaigns, pixels, budgets, and bid strategies.' },
      { step: '04. Scaling & Optimization', desc: 'A/B testing copies and scaling high-performing channels.' }
    ],
    deliverables: ['Ad Creative Templates', 'Email Sequence Setup', 'Monthly ROI Reports', 'Growth Strategy Doc'],
    techStack: ['Meta Ads Manager', 'Google Ads', 'Klaviyo / Mailchimp', 'HubSpot']
  },
  'motion-video': {
    title: 'Motion & Video',
    icon: '◇',
    desc: 'Elevate your brand communication with premium animation, brand videos, and high-quality motion design that capture and retain attention instantly.',
    heroImg: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&fit=crop',
    features: [
      '2D & 3D Vector Explainer Animations',
      'Corporate Promotional Videos & Product Showcases',
      'Social Media video template design',
      'Sleek Typography & Logo Animation',
      'Post-production, sound engineering, and editing'
    ],
    process: [
      { step: '01. Script & Storyboard', desc: 'Writing script concepts and drawing storyboard frames.' },
      { step: '02. Art Direction', desc: 'Defining the illustration, lighting, and animation styling.' },
      { step: '03. Animation Production', desc: 'Assembling elements, animating keyframes, adding transitions.' },
      { step: '04. Sound & Edit', desc: 'Sound design, mixing voiceovers, exporting formats.' }
    ],
    deliverables: ['High-res Video Files (MP4/MOV)', 'Social Cuts & Reels', 'Animation Source Files'],
    techStack: ['Adobe After Effects', 'Cinema 4D', 'Premiere Pro', 'Audition']
  },
  'content-strategy': {
    title: 'Content Strategy',
    icon: '◉',
    desc: 'Craft valuable content that engages your potential buyers. We setup complete editorial flows, copywriting, and strategic publishing guides.',
    heroImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&fit=crop',
    features: [
      'In-depth Content Audits & GAP Analysis',
      'Comprehensive Editorial Calendar Planning',
      'High-impact Landing Page Copywriting',
      'SEO Blog content production guides',
      'Social Media messaging strategies'
    ],
    process: [
      { step: '01. Topic Analysis', desc: 'Finding key topic groups relevant to buyer pain points.' },
      { step: '02. Editorial Flow Set', desc: 'Developing guides for tone, structure, and readability.' },
      { step: '03. Content Generation', desc: 'Drafting high-quality articles, landing pages, and email copy.' },
      { step: '04. Analysis & Update', desc: 'Checking monthly post performance and updating existing content.' }
    ],
    deliverables: ['Tone of Voice Guide', 'Editorial Calendar', 'Copywritten Assets', 'Performance Guide'],
    techStack: ['Notion', 'Google Docs', 'Grammarly', 'SurferSEO']
  },
  'analytics-cro': {
    title: 'Analytics & CRO',
    icon: '⬤',
    desc: 'Transform raw visitor data into actionable optimizations. We design split tests, install advanced tracking systems, and optimize page logic.',
    heroImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop',
    features: [
      'Advanced Google Analytics 4 configuration & tag set',
      'Heatmapping & Visitor Session record analysis',
      'A/B Split Test setup & monitoring',
      'Friction audit & checkout path optimizations',
      'Weekly automated marketing reporting dashboards'
    ],
    process: [
      { step: '01. Tracking Set', desc: 'Installing tracking codes, goals, and customized custom events.' },
      { step: '02. Friction Audit', desc: 'Locating exact drop-off points in user pathways.' },
      { step: '03. Hypothesizing', desc: 'Suggesting updates to layout structure, CTA copy, or design.' },
      { step: '04. Split Testing', desc: 'Launching variations to measure actual metric boosts.' }
    ],
    deliverables: ['Custom Tracking Dashboards', 'Friction Audit Report', 'CRO Experiment Log', 'GA4 Configuration Specs'],
    techStack: ['Google Tag Manager', 'Hotjar / Microsoft Clarity', 'VWO / Optimizely', 'Looker Studio']
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceCatalog[serviceId] : null;

  if (!service) {
    return (
      <div className="page" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div className="container">
          <h2 className="heading-lg">Service Not Found</h2>
          <p style={{ color: 'var(--gray-400)', marginTop: 12, marginBottom: 24 }}>
            The requested service details could not be found.
          </p>
          <Link to="/services" className="btn btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <SEO 
        title={`${service.title} - Dedicated Service`} 
        description={service.desc} 
        keywords={`${service.title}, professional agency services, design development solutions`} 
      />
      {/* ─── PAGE HERO ─── */}
      <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25,
          backgroundImage: `url(${service.heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Dedicated Service
          </div>
          <h1 className="page-hero-title">
            {service.icon} {service.title}
          </h1>
          <p className="page-hero-desc" style={{ maxWidth: 640 }}>
            {service.desc}
          </p>
        </div>
      </section>

      {/* ─── DETAILS & PROCESS ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="servicedetail-layout">
            {/* Left: Features & Process */}
            <div>
              <div style={{ marginBottom: 48 }}>
                <h2 className="heading-md" style={{ marginBottom: 20 }}>Core Capabilities</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {service.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'var(--dark2)' }}>
                      <span style={{
                        width: 22, height: 22, background: 'var(--purple-faint2)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: 'var(--purple)', fontSize: 12, flexShrink: 0
                      }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="heading-md" style={{ marginBottom: 24 }}>Our Method & Process</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {service.process.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16 }}>
                      <div style={{
                        fontSize: 14, fontWeight: 700, color: 'var(--purple)',
                        width: 32, height: 32, background: 'var(--purple-faint)',
                        borderRadius: 'var(--radius-sm)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark)', marginBottom: 4 }}>
                          {step.step}
                        </h4>
                        <p style={{ fontSize: 14, color: 'var(--gray-400)', lineHeight: 1.6 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Info Card & Deliverables */}
            <div style={{
              background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-xl)', padding: 32, position: 'sticky', top: 100
            }}>
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark2)', marginBottom: 12 }}>
                  Key Deliverables
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {service.deliverables.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--gray-600)' }}>
                      <span style={{ color: 'var(--purple)', fontWeight: 700 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark2)', marginBottom: 12 }}>
                  Tools & Technologies
                </h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {service.techStack.map((tech, i) => (
                    <span key={i} className="badge badge-purple" style={{ fontSize: 12, padding: '6px 12px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 24, textAlign: 'center' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark2)', marginBottom: 8 }}>
                  Ready to start a project?
                </h4>
                <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 20 }}>
                  Let's discuss how we can customize this service for your business needs.
                </p>
                <Link to="/consultation" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Free Consultation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ / CONTACT LINK ─── */}
      <section className="section" style={{ background: 'var(--gray-50)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="heading-md" style={{ marginBottom: 14 }}>Have questions about this service?</h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: 480, margin: '0 auto 28px', fontSize: 15 }}>
            Reach out to our support specialists or review our general frequently asked questions on the contact page.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-outline">Go to FAQ / Contact</Link>
            <Link to="/services" className="btn btn-ghost">Browse Other Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
