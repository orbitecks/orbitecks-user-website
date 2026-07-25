import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { homeData } from '../data/homeData';
import { IconPin, IconChart, IconCheck } from '../components/Icons';
import SEO from '../components/SEO';
import SocialIcon from '../components/SocialIcon';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';

// Helper to map database icon strings to professional geometric symbols or emojis
const getServiceIcon = (iconName: string) => {
  if (!iconName) return '✦';
  const name = iconName.toLowerCase().trim();
  switch (name) {
    case 'palette':
    case 'brand':
    case 'design':
      return '✦'; // Sparkles / Star
    case 'code':
    case 'web':
    case 'dev':
      return '⬡'; // Hexagon
    case 'trending-up':
    case 'seo':
    case 'growth':
      return '◎'; // Double Circle
    case 'shopping-bag':
    case 'shopify':
    case 'ecommerce':
    case 'e-commerce':
      return '◈'; // Diamond
    case 'target':
      return '🎯';
    case 'bulb':
      return '💡';
    default:
      if (iconName.length <= 2) return iconName;
      return '✦'; // Premium sparkle default fallback
  }
};

interface AccordionItemProps {
  item: typeof homeData.servicesSection.accordions[0];
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ item, isOpen, onToggle }: AccordionItemProps) => (
  <div className="accordion-item">
    <button
      className={`accordion-trigger${isOpen ? ' open' : ''}`}
      onClick={onToggle}
    >
      <div className="accordion-trigger-left">
        <span className="accordion-icon">{item.icon}</span>
        <span className="accordion-title">{item.title}</span>
      </div>
      <span className="accordion-arrow">{isOpen ? '−' : '+'}</span>
    </button>
    <div className={`accordion-content${isOpen ? ' open' : ''}`}>
      <div className="accordion-body">
        <p style={{ marginBottom: 12 }}>{item.content}</p>
        <Link to={`/services/${item.id}`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--purple)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          Learn More →
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('brand-identity');

  const [hero, setHero] = useState(homeData.hero);
  const [ctaBanner, setCtaBanner] = useState(homeData.ctaBanner);
  const [recentWork, setRecentWork] = useState(homeData.recentWork);
  const [servicesSection, setServicesSection] = useState(homeData.servicesSection);
  const [blogSection, setBlogSection] = useState(homeData.blogSection);
  const [aboutSnippet, setAboutSnippet] = useState(homeData.aboutSnippet);
  const [processSection, setProcessSection] = useState(homeData.processSection);
  const [testimonialsSection, setTestimonialsSection] = useState(homeData.testimonialsSection);

  useEffect(() => {
    fetchDynamicData();
  }, []);

  const fetchDynamicData = async () => {
    try {
      // 1. Fetch copy
      const { data: rawCData } = await supabase.from('homepage_copy').select('*').eq('id', 1).maybeSingle();
      const cData = formatDataNewlines(rawCData);
      if (cData) {
        setHero(prev => ({
          ...prev,
          tag: cData.hero_tag,
          titleMain: cData.hero_title_main,
          titleSub: cData.hero_title_sub,
          titleAccent: cData.hero_title_accent,
          description: cData.hero_description,
          analyticsCard: {
            ...prev.analyticsCard,
            mainPersonImg: cData.hero_analytics_card?.mainPersonImg || prev.analyticsCard.mainPersonImg,
            img: cData.hero_analytics_card?.img || prev.analyticsCard.img
          },
          floatCards: {
            successRate: {
              value: cData.hero_float_cards?.successRate?.value || prev.floatCards.successRate.value,
              label: cData.hero_float_cards?.successRate?.label || prev.floatCards.successRate.label
            },
            decidedQuality: {
              title1: cData.hero_float_cards?.decidedQuality?.title1 || prev.floatCards.decidedQuality.title1,
              title2: cData.hero_float_cards?.decidedQuality?.title2 || prev.floatCards.decidedQuality.title2,
              subtitle: cData.hero_float_cards?.decidedQuality?.subtitle || prev.floatCards.decidedQuality.subtitle
            },
            happyClients: {
              value: cData.hero_float_cards?.happyClients?.value || prev.floatCards.happyClients.value,
              label: cData.hero_float_cards?.happyClients?.label || prev.floatCards.happyClients.label
            }
          }
        }));

        if (cData.about_snippet && typeof cData.about_snippet === 'object' && Object.keys(cData.about_snippet).length > 0) {
          setAboutSnippet(prev => ({
            ...prev,
            ...cData.about_snippet
          }));
        }

        if (cData.process_section && typeof cData.process_section === 'object' && Object.keys(cData.process_section).length > 0) {
          setProcessSection(prev => ({
            ...prev,
            ...cData.process_section
          }));
        }

        if (cData.testimonials_section && typeof cData.testimonials_section === 'object' && Object.keys(cData.testimonials_section).length > 0) {
          setTestimonialsSection(prev => ({
            ...prev,
            ...cData.testimonials_section
          }));
        }

        if (cData.cta_banner && typeof cData.cta_banner === 'object' && Object.keys(cData.cta_banner).length > 0) {
          setCtaBanner(prev => ({
            ...prev,
            badge: cData.cta_banner.badge || prev.badge,
            title: cData.cta_banner.title || prev.title,
            description: cData.cta_banner.description || prev.description,
            image: {
              img: cData.cta_banner.image?.img || prev.image.img,
              qualityText: cData.cta_banner.image?.qualityText || prev.image.qualityText,
              workText: cData.cta_banner.image?.workText || prev.image.workText
            }
          }));
        }
      }

      // 2. Fetch services
      const { data: rawSvList } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
      const svList = formatDataNewlines(rawSvList);
      if (svList && svList.length > 0) {
        setServicesSection(prev => ({
          ...prev,
          accordions: svList.slice(0, 4).map((sv: any) => ({
            id: sv.id,
            icon: getServiceIcon(sv.icon_name),
            title: sv.title,
            content: sv.desc_short
          }))
        }));
      }

      // 3. Fetch projects
      const { data: rawPjList } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
      const pjList = formatDataNewlines(rawPjList);
      if (pjList && Array.isArray(pjList)) {
        setRecentWork(prev => ({
          ...prev,
          projects: pjList.slice(0, 3).map((pj: any, idx: number) => ({
            id: pj.id,
            year: pj.year,
            client: pj.client,
            title: pj.title,
            description: pj.description,
            btnText: 'View Project →',
            img: pj.img_url,
            gridClass: idx === 0 ? 'large' : 'medium'
          }))
        }));
      }

      // 4. Fetch blog posts
      const { data: rawArtList } = await supabase
        .from('articles')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      const artList = formatDataNewlines(rawArtList);
      if (artList && Array.isArray(artList)) {
        setBlogSection(prev => ({
          ...prev,
          articles: artList.slice(0, 3).map((art: any) => ({
            img: art.img_url,
            title: art.title,
            cat: art.cat,
            date: art.publish_date,
            excerpt: art.excerpt,
            authorName: art.author_name,
            authorLinkedin: art.author_linkedin || ''
          }))
        }));
      }
    } catch (err) {
      console.warn('Supabase data load failed.', err);
    }
  };

  const toggle = (id: string) => setOpenAccordion(prev => (prev === id ? null : id));

  return (
    <div className="page">
      <SEO 
        title="Creative Agency for High-Growth Businesses" 
        description="Orbitecks is a premium creative agency developing state-of-the-art websites, SaaS visual designs, brand identities, and high-impact digital marketing systems." 
        keywords="branding agency, UI/UX design, SaaS websites, creative digital marketing, corporate web development"
      />
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-inner">
            {/* Left */}
            <div className="hero-content" style={{ animation: 'fadeInUp 0.7s ease forwards' }}>
              <div className="hero-tag">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor' }} />
                {hero.tag}
              </div>
              <h1 className="hero-title">
                {hero.titleMain}<br />
                {hero.titleSub}<br />
                <em>{hero.titleAccent}</em>
              </h1>
              <p className="hero-desc">
                {hero.description}
              </p>
              <div className="hero-actions">
                <Link to={hero.btnPrimary.to} className="btn btn-primary btn-lg">
                  {hero.btnPrimary.text}
                </Link>
                <Link to={hero.btnSecondary.to} className="btn btn-outline btn-lg">
                  {hero.btnSecondary.text}
                </Link>
              </div>
              <div className="hero-stats-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex' }}>
                    {['#7C3AED','#10B981','#F59E0B'].map((c, i) => (
                      <div key={i} style={{
                        width: 30, height: 30, borderRadius: '50%', background: c,
                        border: '2px solid white', marginLeft: i ? -10 : 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'white', fontWeight: 700
                      }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="hero-stats-title">{hero.clientList.text}</p>
                    <p className="hero-stats-sub">{hero.clientList.subtext}</p>
                  </div>
                </div>
                <div className="hero-stats-divider" />
                <div>
                  <p className="hero-stats-title">{hero.rating.stars}</p>
                  <p className="hero-stats-sub">{hero.rating.text}</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hero-visual">
              <div className="hero-img-wrap">
                {/* Main person image */}
                <img
                  src={hero.analyticsCard.mainPersonImg}
                  alt="Creative professional"
                  className="hero-img-main"
                />

                {/* Overlay analytics card */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  padding: '16px',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                      src={hero.analyticsCard.img}
                      alt="Analytics dashboard"
                      style={{ width: 80, height: 52, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 3 }}>{hero.analyticsCard.title}</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--dark)', letterSpacing: '-0.03em' }}>{hero.analyticsCard.score}</span>
                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{hero.analyticsCard.total}</span>
                        <div style={{
                          background: 'rgba(16,185,129,0.12)', color: '#10B981',
                          padding: '2px 7px', borderRadius: 'var(--radius-pill)',
                          fontSize: 11, fontWeight: 700
                        }}> {hero.analyticsCard.stat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Float Cards */}
                <div className="hero-float-card card-score">
                  <div className="float-icon purple-bg">
                    <IconChart size={18} color="var(--purple)" />
                  </div>
                  <div>
                    <div className="float-number">
                      {(() => {
                        const val = hero.floatCards.successRate.value;
                        const match = val.match(/^([\d.]+)([^\d.]+)$/);
                        if (match) {
                          return (
                            <>
                              {match[1]}
                              <span style={{ color: 'var(--purple)' }}>{match[2]}</span>
                            </>
                          );
                        }
                        return val;
                      })()}
                    </div>
                    <div className="float-label">{hero.floatCards.successRate.label}</div>
                  </div>
                </div>

                <div className="hero-float-card card-quality">
                  <div className="float-icon green-bg">
                    <IconCheck size={16} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', lineHeight: 1 }}>{hero.floatCards.decidedQuality.title1}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)', lineHeight: 1 }}>{hero.floatCards.decidedQuality.title2}</div>
                    <div className="float-label" style={{ marginTop: 3 }}>{hero.floatCards.decidedQuality.subtitle}</div>
                  </div>
                </div>

                <div className="hero-float-card card-clients">
                  <div>
                    <div className="float-number">
                      {(() => {
                        const val = hero.floatCards.happyClients.value;
                        const match = val.match(/^([\d.]+)([^\d.]+)$/);
                        if (match) {
                          return (
                            <>
                              {match[1]}
                              <span style={{ color: 'var(--purple)' }}>{match[2]}</span>
                            </>
                          );
                        }
                        return val;
                      })()}
                    </div>
                    <div className="float-label">{hero.floatCards.happyClients.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ─── ABOUT / POWERFUL AGENCY ─── */}
      <section className="about-section section">
        <div className="container">
          <div className="about-inner">
            {/* Images */}
            <div className="about-images">
              <div className="about-img-grid">
                <div className="about-img">
                  <img src={aboutSnippet.imgs.team} alt="Team collaboration" />
                </div>
                <div className="about-img tall">
                  <img src={aboutSnippet.imgs.office} alt="Modern office space" />
                </div>
              </div>
              {/* Stat badge */}
              <div className="about-stat-badge">
                <div style={{ textAlign: 'center' }}>
                  <div className="stat-number">{aboutSnippet.stat.number}<sup>+</sup></div>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gray-400)' }}>{aboutSnippet.stat.yearsText}</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'var(--gray-100)' }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>{aboutSnippet.stat.expText1}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--dark)' }}>{aboutSnippet.stat.expText2}</div>
                </div>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'var(--purple)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white'
                }}>
                  <IconPin size={16} color="white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="about-content">
              <p className="section-label">{aboutSnippet.label}</p>
              <h2 className="about-title" style={{ whiteSpace: 'pre-line' }}>
                {aboutSnippet.title}
              </h2>
              <p className="about-desc">
                {aboutSnippet.description}
              </p>
              <div className="about-features">
                {aboutSnippet.features.map((f, i) => (
                  <div key={i} className="about-feature-item">
                    <div className="feature-check">✓</div>
                    {f}
                  </div>
                ))}
              </div>
              <Link to={aboutSnippet.btn.to} className="btn btn-primary">
                {aboutSnippet.btn.text}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECENT WORK (Dark) ─── */}
      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-header">
            <div>
              <p className="section-label" style={{ color: 'rgba(167,139,250,0.9)' }}>
                {recentWork.label}
              </p>
              <h2 className="portfolio-title" style={{ whiteSpace: 'pre-line' }}>
                {recentWork.title}
              </h2>
            </div>
            <Link to={recentWork.btn.to} className="btn btn-outline-white">
              {recentWork.btn.text}
            </Link>
          </div>

          <div className="portfolio-grid">
            {recentWork.projects.map((proj, idx) => (
              <Link key={idx} to={`/portfolio/${proj.id}`} className="portfolio-home-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="portfolio-home-img">
                  <img src={proj.img} alt={proj.title} />
                  <div className="portfolio-home-overlay">
                    <div className="view-icon">→</div>
                  </div>
                </div>
                <div className="portfolio-home-body">
                  <div className="portfolio-home-cat">{proj.year}</div>
                  <div className="portfolio-home-title">{proj.title}</div>
                  <div className="portfolio-home-desc">{proj.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ACCORDION ─── */}
      <section className="services-section">
        <div className="container">
          <div className="services-inner">
            {/* Left sticky */}
            <div className="services-left">
              <p className="section-label">{servicesSection.label}</p>
              <h2 className="services-title" style={{ whiteSpace: 'pre-line' }}>
                {servicesSection.title}
              </h2>
              <p className="services-desc">
                {servicesSection.description}
              </p>
              <Link to={servicesSection.btn.to} className="btn btn-primary">
                {servicesSection.btn.text}
              </Link>
              <div className="services-img">
                <img src={servicesSection.img} alt="Web development workspace" />
              </div>
            </div>

            {/* Accordion */}
            <div>
              <div className="accordion">
                {servicesSection.accordions.map((s) => (
                  <AccordionItem
                    key={s.id}
                    item={s}
                    isOpen={openAccordion === s.id}
                    onToggle={() => toggle(s.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <div>
              <p className="section-label">{processSection.label}</p>
              <h2 className="process-title" style={{ whiteSpace: 'pre-line' }}>
                {processSection.title}
              </h2>
            </div>
            <div>
              <p className="process-desc">
                {processSection.description}
              </p>
              <Link to={processSection.btn.to} className="btn btn-primary" style={{ marginTop: 20 }}>
                {processSection.btn.text}
              </Link>
            </div>
          </div>

          {/* Process Images */}
          <div className="process-images" style={{ marginBottom: 48 }}>
            {processSection.images.map((img: any, idx: number) => (
              <div key={idx} className={`process-img-wrap ${img.className}`}>
                <img src={img.img} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="process-caption">{img.title}</div>
              </div>
            ))}
          </div>

          {/* Process Steps */}
          <div className="process-steps">
            {processSection.steps.map((step: any, i: number) => (
              <div key={i} className="process-step">
                <div className="step-number">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <p className="section-label" style={{ justifyContent: 'center', color: 'rgba(167,139,250,0.8)' }}>
              {testimonialsSection.label}
            </p>
            <h2 className="testimonials-title" style={{ whiteSpace: 'pre-line' }}>
              {testimonialsSection.title}
            </h2>
          </div>

          {/* Grid */}
          <div className="testimonials-grid">
            {testimonialsSection.list.map((t: any, i: number) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                  <div className="author-logos">
                    <span>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA DARK BANNER ─── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-content">
              <div className="cta-banner-badge">
                {ctaBanner.badge}
              </div>
              <h2 className="cta-title" style={{ whiteSpace: 'pre-line' }}>
                {ctaBanner.title}
              </h2>
              <p className="cta-desc">
                {ctaBanner.description}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to={ctaBanner.btnPrimary.to} className="btn btn-primary btn-lg">
                  {ctaBanner.btnPrimary.text}
                </Link>
                <Link to={ctaBanner.btnSecondary.to} className="btn btn-outline-white btn-lg">
                  {ctaBanner.btnSecondary.text}
                </Link>
              </div>
            </div>
            <div className="cta-image">
              <img src={ctaBanner.image.img} alt="Creative agency workspace" />
              <div className="cta-image-overlay" />
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius)', padding: '10px 14px'
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>{ctaBanner.image.qualityText}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{ctaBanner.image.workText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG / ARTICLES ─── */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-header">
            <div>
              <p className="section-label">{blogSection.label}</p>
              <h2 className="blog-title">{blogSection.title}</h2>
            </div>
            <Link to="/blog" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              View All Articles →
            </Link>
          </div>
          {blogSection.articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-400)' }}>
              <p style={{ fontSize: 15, fontWeight: 600 }}>No articles published yet.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogSection.articles.map((a: any, i: number) => (
                <div key={i} className="blog-card">
                  <div className="blog-img">
                    <img src={a.img} alt={a.title} />
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span className="blog-cat">{a.cat}</span>
                      <span style={{ color: 'var(--gray-300)' }}>·</span>
                      <span className="blog-date">{a.date}</span>
                    </div>
                    <h3 className="blog-card-title">{a.title}</h3>
                    <p className="blog-excerpt">{a.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, borderTop: '1px solid var(--gray-100)', paddingTop: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--purple-faint)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, border: '1px solid rgba(124,58,237,0.15)' }}>
                          {a.authorName ? a.authorName.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark2)' }}>{a.authorName}</span>
                          <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>Contributor</span>
                        </div>
                      </div>
                      {a.authorLinkedin && (
                        <a 
                          href={a.authorLinkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 28, height: 28, borderRadius: '50%', background: 'var(--gray-50)',
                            color: 'var(--gray-600)', transition: 'var(--transition)'
                          }}
                          className="author-linkedin-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <SocialIcon platform="linkedin" size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
