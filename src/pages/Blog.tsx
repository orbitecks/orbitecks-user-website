import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import SocialIcon from '../components/SocialIcon';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';

const staticBlogArticles: any[] = [];

const Blog = () => {
  const [blogArticles, setBlogArticles] = useState(staticBlogArticles);

  useEffect(() => {
    fetchBlogArticles();
  }, []);

  const fetchBlogArticles = async () => {
    try {
      const { data: rawArtList } = await supabase
        .from('articles')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      const artList = formatDataNewlines(rawArtList);
      if (artList && Array.isArray(artList)) {
        setBlogArticles(artList.map((art: any) => ({
          cat: art.cat,
          date: art.publish_date,
          title: art.title,
          excerpt: art.excerpt,
          img: art.img_url,
          authorName: art.author_name,
          authorLinkedin: art.author_linkedin || '',
        })));
      }
    } catch (err) {
      console.warn('Supabase blog data load failed.', err);
    }
  };

  return (
    <div className="page">
      <SEO 
        title="Our Blog - Insights & Design Trends" 
        description="Explore the latest articles, strategies, and industry guides on branding, web design, UI/UX, SEO, and B2B growth from Orbitecks." 
        keywords="agency blog, web design tips, branding guidelines, SEO strategy, SaaS UX guide"
      />
      
      {/* ─── PAGE HERO ─── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Latest Insights
          </div>
          <h1 className="page-hero-title">
            Thoughts, Stories & <br /><em>Tech Trends</em>
          </h1>
          <p className="page-hero-desc">
            Explore the latest visual guidelines, development checklists, and conversion rate optimizations curated by our team.
          </p>
        </div>
      </section>

      {/* ─── ARTICLES LIST ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          {blogArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--gray-400)' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark2)', marginBottom: 8 }}>No blog articles published yet</p>
              <p style={{ fontSize: 14 }}>Articles created in the Management Portal will appear here automatically.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogArticles.map((a, i) => (
                <div key={i} className="blog-card" style={{ cursor: 'pointer' }}>
                  <div className="blog-img">
                    <img src={a.img} alt={a.title} />
                  </div>
                  <div className="blog-body">
                    <div style={{ display: 'flex', gap: 10, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--purple)', marginBottom: 12 }}>
                      <span>{a.cat}</span>
                      <span style={{ color: 'var(--gray-200)' }}>•</span>
                      <span style={{ color: 'var(--gray-400)' }}>{a.date}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--dark2)', marginBottom: 10, lineHeight: 1.4 }}>{a.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-400)', lineHeight: 1.6, marginBottom: 16 }}>{a.excerpt}</p>
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

      {/* ─── INSTAGRAM FOLLOW ─── */}
      <section className="section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple)', marginBottom: 12 }}>Follow Us</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--dark)', marginBottom: 12 }}>Join Us On Instagram</h2>
            <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
              Follow @orbitecks to see our latest projects, design explorations, behind-the-scenes stories, and daily creative updates.
            </p>
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn" 
              style={{ 
                background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', 
                color: 'white', 
                border: 'none', 
                padding: '14px 36px', 
                borderRadius: 'var(--radius-pill)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 10, 
                fontSize: 15, 
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(253, 29, 29, 0.25)',
                transition: 'var(--transition)'
              }}
            >
              <SocialIcon platform="instagram" size={18} />
              Follow @orbitecks
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
