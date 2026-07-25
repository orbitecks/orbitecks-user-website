import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [copy, setCopy] = useState(portfolioData);
  const [projects, setProjects] = useState<any[]>(portfolioData.projects);
  const [featuredCaseStudy, setFeaturedCaseStudy] = useState<any>(portfolioData.featuredCaseStudy);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // 1. Fetch Page Copy settings
      const { data: rawPageRes } = await supabase.from('portfolio_page_settings').select('*').eq('id', 1).maybeSingle();
      const pageRes = formatDataNewlines(rawPageRes);
      if (pageRes) {
        setCopy({
          hero: {
            tag: pageRes.hero_tag,
            titleMain: pageRes.hero_title_main,
            titleAccent: pageRes.hero_title_accent,
            titleEnd: '',
            description: pageRes.hero_description,
          },
          stats: Array.isArray(pageRes.stats) ? pageRes.stats : portfolioData.stats,
          categories: Array.isArray(pageRes.categories) ? pageRes.categories : portfolioData.categories,
          cta: {
            ...portfolioData.cta,
            title: pageRes.cta_title,
            description: pageRes.cta_description,
          },
          projects: portfolioData.projects,
          featuredCaseStudy: portfolioData.featuredCaseStudy
        });
      }

      // 2. Fetch Projects catalog list
      const { data: rawPjList } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
      const pjList = formatDataNewlines(rawPjList);
      if (pjList && Array.isArray(pjList)) {
        const mappedProjects = pjList.map((pj: any) => ({
          id: pj.id,
          year: pj.year,
          client: pj.client,
          cat: pj.cat,
          title: pj.title,
          description: pj.description,
          btnText: 'View Case Study →',
          img: pj.img_url
        }));

        setProjects(mappedProjects);

        const featured = pjList.find((pj: any) => pj.is_featured) || pjList[0];
        if (featured) {
          setFeaturedCaseStudy({
            badge: 'Featured Case Study',
            title: featured.title,
            description: featured.description,
            stats: featured.stats || [
              { val: '2X', label: 'Conversion rate' }
            ],
            btnText: 'View Case Study',
            image: {
              url: featured.img_url,
              label: featured.client
            }
          });
        } else {
          setFeaturedCaseStudy(null);
        }
      }
    } catch (err) {
      console.warn('Supabase projects data load failed. Falling back to static values.', err);
    }
  };

  const { hero, stats, categories, cta } = copy;

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.cat === activeFilter);

  return (
    <div className="page">
      <SEO 
        title="Case Studies & Client Work Portfolio" 
        description="Browse our recent design and development success stories. We craft custom brand designs, marketing websites, and digital SaaS products that generate sales." 
        keywords="agency portfolio, case studies, corporate client projects, UI/UX portfolio"
      />
      {/* ─── PAGE HERO ─── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            {hero.tag}
          </div>
          <h1 className="page-hero-title">
            {hero.titleMain} <em>{hero.titleAccent}</em><br />{hero.titleEnd}
          </h1>
          <p className="page-hero-desc">
            {hero.description}
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: 'var(--white)', padding: '40px 0', borderBottom: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--dark)', letterSpacing: '-0.03em', marginBottom: 4 }}>
                  {(() => {
                    const valStr = String(s?.val || '');
                    const match = valStr.match(/^([\d.]+)([^\d.]+)$/);
                    if (match) {
                      return (
                        <>
                          {match[1]}
                          <span style={{ color: 'var(--purple)' }}>{match[2]}</span>
                        </>
                      );
                    }
                    return valStr;
                  })()}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO GRID ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          {/* Filters */}
          <div className="portfolio-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="portfolio-page-grid">
            {filtered.map((p, i) => (
              <Link key={i} to={`/portfolio/${p.id}`} className="portfolio-page-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="portfolio-page-img">
                  <img src={p.img} alt={p.title} />
                  <div className="portfolio-page-img-overlay">
                    <div className="view-icon">→</div>
                  </div>
                </div>
                <div className="portfolio-page-body">
                  <div className="portfolio-page-cat">{p.cat} · {p.year}</div>
                  <div className="portfolio-page-title">{p.title}</div>
                  <div className="portfolio-page-desc">{p.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ─── CASE STUDY HIGHLIGHT ─── */}
      {featuredCaseStudy && (
        <section className="section" style={{ background: 'var(--dark)', color: 'var(--white)' }}>
          <div className="container">
            <div className="grid-2" style={{ gap: 80, alignItems: 'center' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(124, 58, 237, 0.15)', color: 'var(--purple-light)',
                  borderRadius: 'var(--radius-pill)', padding: '5px 14px', fontSize: 12, fontWeight: 600, marginBottom: 20
                }}>{featuredCaseStudy?.badge}</div>
                <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 20, whiteSpace: 'pre-line' }}>
                  {featuredCaseStudy?.title}
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 32 }}>
                  {featuredCaseStudy?.description}
                </p>
                <div style={{ display: 'flex', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
                  {featuredCaseStudy?.stats?.map((stat: any, i: number) => (
                    <div key={i}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--purple-light)', letterSpacing: '-0.03em' }}>{stat.val || stat.value}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Link to="/consultation" className="btn btn-primary btn-lg">
                  {featuredCaseStudy?.btnText || 'View Case Study'}
                </Link>
              </div>
              {featuredCaseStudy?.image?.url && (
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={featuredCaseStudy.image.url}
                    alt={featuredCaseStudy.title}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--white)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>{cta.label}</p>
          <h2 className="heading-lg" style={{ marginBottom: 16, whiteSpace: 'pre-line' }}>
            {cta.title}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--gray-400)', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
            {cta.description}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={cta.btnPrimary.to} className="btn btn-primary btn-lg">{cta.btnPrimary.text}</Link>
            <Link to={cta.btnSecondary.to} className="btn btn-outline btn-lg">{cta.btnSecondary.text}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
