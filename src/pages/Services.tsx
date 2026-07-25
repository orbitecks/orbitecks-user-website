import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import SEO from '../components/SEO';
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

const Services = () => {
  const [copy, setCopy] = useState(servicesData);
  const [expertise, setExpertise] = useState(servicesData.expertise);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      // 1. Fetch Page Copy settings
      const { data: rawPageRes } = await supabase.from('services_page_settings').select('*').eq('id', 1).maybeSingle();
      const pageRes = formatDataNewlines(rawPageRes);
      if (pageRes) {
        setCopy({
          hero: {
            tag: pageRes.hero_tag,
            titleMain: pageRes.hero_title_main,
            titleAccent: pageRes.hero_title_accent,
            description: pageRes.hero_description,
          },
          expertise: {
            label: pageRes.expertise_label,
            title: pageRes.expertise_title,
            cards: servicesData.expertise.cards
          },
          process: {
            label: pageRes.process_label,
            title: pageRes.process_title,
            description: pageRes.process_description,
            steps: servicesData.process.steps,
            image: {
              url: pageRes.process_image_url || servicesData.process.image.url,
              roiLabel: pageRes.process_roi_label,
              roiValue: pageRes.process_roi_value,
            }
          },
          pricing: {
            label: pageRes.pricing_label,
            title: pageRes.pricing_title,
            packages: Array.isArray(pageRes.pricing_packages) ? pageRes.pricing_packages : servicesData.pricing.packages,
          },
          cta: {
            title: pageRes.cta_title,
            description: pageRes.cta_description,
            btnText: pageRes.cta_btn_text,
          }
        });
        
        // Setup expertise header values
        setExpertise(prev => ({
          ...prev,
          label: pageRes.expertise_label,
          title: pageRes.expertise_title
        }));
      }

      // 2. Fetch Catalog items
      const { data: rawSvList } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
      const svList = formatDataNewlines(rawSvList);
      if (svList && svList.length > 0) {
        setExpertise(prev => ({
          ...prev,
          cards: svList.map((sv: any) => ({
            id: sv.id,
            icon: getServiceIcon(sv.icon_name),
            title: sv.title,
            desc: sv.desc_short
          }))
        }));
      }
    } catch (err) {
      console.warn('Supabase services data load failed. Falling back to static values.', err);
    }
  };

  const { hero, process, pricing, cta } = copy;

  return (
    <div className="page">
      <SEO 
        title="Our Services - Web Design, Branding & SaaS UX" 
        description="Explore Orbitecks's services: brand identity, full-stack website engineering, high-converting product UI/UX design, and search engine optimization." 
        keywords="branding design, website engineering, UX research, search engine optimization pricing, web development services"
      />
      {/* ─── PAGE HERO ─── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            {hero.tag}
          </div>
          <h1 className="page-hero-title">
            {hero.titleMain}<br /><em>{hero.titleAccent}</em>
          </h1>
          <p className="page-hero-desc">
            {hero.description}
          </p>
        </div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>{expertise.label}</p>
            <h2 className="heading-lg" style={{ whiteSpace: 'pre-line' }}>{expertise.title}</h2>
          </div>
          <div className="services-page-grid">
            {expertise.cards.map((s, i) => (
              <Link key={i} to={`/services/${s.id}`} className="service-feature-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="service-feature-icon">{s.icon}</div>
                <div className="service-feature-title">{s.title}</div>
                <div className="service-feature-desc">{s.desc}</div>
                <div style={{ marginTop: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--purple)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'center' }}>
            <div>
              <p className="section-label">{process.label}</p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--dark)', marginBottom: 20, whiteSpace: 'pre-line' }}>
                {process.title}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.75, marginBottom: 32 }}>
                {process.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {process.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 38, height: 38, flexShrink: 0,
                      background: 'var(--purple-faint2)', borderRadius: 'var(--radius-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, color: 'var(--purple)'
                    }}>{step.n}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--dark2)', marginBottom: 4 }}>{step.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.6 }}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process image */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <img
                src={process.image.url}
                alt="Agency team at work"
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)'
              }} />
              <div style={{
                position: 'absolute', bottom: 24, left: 24, right: 24,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius)', padding: 16,
                border: '1px solid rgba(255,255,255,0.12)'
              }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{process.image.roiLabel}</p>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{process.image.roiValue} <span style={{ fontSize: 14, color: '#10B981' }}>↑</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>{pricing.label}</p>
            <h2 className="heading-lg">{pricing.title}</h2>
          </div>
          <div className="grid-3" style={{ gap: 24 }}>
            {pricing.packages.map((pkg, i) => (
              <div key={i} style={{
                border: pkg.highlight ? '2px solid var(--purple)' : '1px solid var(--gray-100)',
                borderRadius: 'var(--radius-lg)',
                padding: 32,
                background: pkg.highlight ? 'var(--purple-faint)' : 'var(--white)',
                position: 'relative',
                transition: 'var(--transition)'
              }}>
                {pkg.highlight && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--purple)', color: 'white', padding: '4px 16px',
                    borderRadius: 'var(--radius-pill)', fontSize: 12, fontWeight: 700
                  }}>Most Popular</div>
                )}
                <div style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark)', marginBottom: 6 }}>{pkg.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                    <span style={{ fontSize: 36, fontWeight: 900, color: pkg.highlight ? 'var(--purple)' : 'var(--dark)', letterSpacing: '-0.03em' }}>{pkg.price}</span>
                    <span style={{ fontSize: 14, color: 'var(--gray-400)' }}>{pkg.period}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.6 }}>{pkg.desc}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 20, marginBottom: 24 }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--dark2)' }}>
                        <span style={{ width: 18, height: 18, background: 'var(--purple-faint2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--purple)', flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/consultation"
                  className={`btn ${pkg.highlight ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {pkg.price === 'Custom' ? 'Contact Us' : 'Get Started →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--dark)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', marginBottom: 16 }}>
            {cta.title}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
            {cta.description}
          </p>
          <Link to="/consultation" className="btn btn-primary btn-lg">
            {cta.btnText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
