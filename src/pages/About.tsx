import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aboutData } from '../data/aboutData';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';
import SocialIcon from '../components/SocialIcon';
import SEO from '../components/SEO';

const getInitials = (name?: string) => {
  if (!name || name === 'Anonymous') return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0] ? parts[0][0].toUpperCase() : '?';
};

const About = () => {
  const [copy, setCopy] = useState(aboutData);

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const { data: rawData, error } = await supabase.from('about_page_settings').select('*').eq('id', 1).maybeSingle();
        if (error) throw error;
        const data = formatDataNewlines(rawData);

        // Fetch display-on-website team members from admin_profiles
        const { data: rawAdmins, error: adminErr } = await supabase
          .from('admin_profiles')
          .select('id, name, title, avatar_url, linkedin_url')
          .eq('show_on_website', true)
          .order('created_at', { ascending: true });

        if (data) {
          let membersList = aboutData.team.members;
          if (!adminErr && rawAdmins && rawAdmins.length > 0) {
            membersList = rawAdmins.map(admin => {
              let imgUrl = admin.avatar_url || '';
              if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('data:')) {
                const vaultUrl = supabase.storage.from('team-vault').getPublicUrl(imgUrl).data.publicUrl;
                const imagesUrl = supabase.storage.from('images').getPublicUrl(imgUrl).data.publicUrl;
                imgUrl = vaultUrl || imagesUrl;
              }
              return {
                name: admin.name || 'Anonymous',
                role: admin.title || 'Teammate',
                img: imgUrl,
                linkedin: admin.linkedin_url || ''
              };
            });
          }

          setCopy({
            hero: {
              tag: data.hero_tag,
              titleMain: data.hero_title_main,
              titleAccent: data.hero_title_accent,
              titleEnd: data.hero_title_end,
              description: data.hero_description,
            },
            stats: Array.isArray(data.stats) ? data.stats : aboutData.stats,
            mission: {
              label: data.mission_label,
              title: data.mission_title,
              description1: data.mission_description1,
              description2: data.mission_description2,
              btnStart: aboutData.mission.btnStart,
              btnWork: aboutData.mission.btnWork,
              image: {
                url: data.mission_image_url || aboutData.mission.image.url,
                label: data.mission_image_label,
                subtext: data.mission_image_subtext,
              }
            },
            team: {
              label: data.team_label,
              title: data.team_title,
              members: membersList,
            },
            values: {
              label: data.values_label,
              title: data.values_title,
              list: Array.isArray(data.values_list) ? data.values_list : aboutData.values.list,
            },
            cta: {
              label: data.cta_label,
              title: data.cta_title,
              description: data.cta_description,
              btnPrimary: aboutData.cta.btnPrimary,
              btnSecondary: aboutData.cta.btnSecondary,
            }
          });
        }
      } catch (err) {
        console.warn('Failed to load about settings from Supabase, using static fallback.', err);
      }
    };
    fetchRes();
  }, []);

  const { hero, stats, mission, team, values, cta } = copy;

  return (
    <div className="page">
      <SEO 
        title="About Us - Meet the Team" 
        description="Learn more about Orbitecks, our mission to build game-changing digital products, our values, and the expert team driving creative success." 
        keywords="about digital agency, team members, design agency history, mission statement"
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

      {/* ─── STATS ROW ─── */}
      <section className="section-sm" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="stats-row">
            {stats.map((s, i) => (
              <div key={i} className="stat-cell">
                <div className="stat-value">{s.val}<span>{s.unit}</span></div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'center' }}>
            <div>
              <p className="section-label">{mission.label}</p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--dark)', marginBottom: 20, whiteSpace: 'pre-line' }}>
                {mission.title}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.75, marginBottom: 24 }}>
                {mission.description1}
              </p>
              <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.75, marginBottom: 32 }}>
                {mission.description2}
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link to={mission.btnStart.to} className="btn btn-primary">{mission.btnStart.text}</Link>
                <Link to={mission.btnWork.to} className="btn btn-outline">{mission.btnWork.text}</Link>
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <img
                src={mission.image.url}
                alt="Orbitecks team collaboration"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)'
              }} />
              <div style={{
                position: 'absolute', bottom: 24, left: 24, right: 24,
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius)', padding: '16px',
                border: '1px solid rgba(255,255,255,0.18)'
              }}>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                  {mission.image.label}
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                  {mission.image.subtext}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      {team.members && team.members.length > 0 && (
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p className="section-label" style={{ justifyContent: 'center' }}>{team.label}</p>
              <h2 className="heading-lg" style={{ whiteSpace: 'pre-line' }}>{team.title}</h2>
            </div>
            <div className="team-grid">
              {team.members.map((m, i) => (
                <div key={i} className="team-card">
                  <div className="team-img" style={{ position: 'relative' }}>
                    {m.img ? (
                      <img src={m.img} alt={m.name} />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, var(--purple-faint) 0%, var(--purple-light) 100%)',
                        color: 'var(--purple)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 48,
                        fontWeight: 800,
                        userSelect: 'none',
                        fontFamily: 'Inter, system-ui, sans-serif'
                      }}>
                        {getInitials(m.name)}
                      </div>
                    )}
                  </div>
                  <div className="team-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div className="team-name">{m.name}</div>
                      <div className="team-role">{m.role}</div>
                    </div>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-social-btn"
                        aria-label={`${m.name}'s LinkedIn`}
                      >
                        <SocialIcon platform="linkedin" size={15} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── VALUES ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>{values.label}</p>
            <h2 className="heading-lg">{values.title}</h2>
          </div>
          <div className="values-grid">
            {values.list.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--dark)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container">
          <p className="section-label" style={{ justifyContent: 'center', color: 'rgba(167,139,250,0.8)', marginBottom: 20 }}>
            {cta.label}
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', marginBottom: 20 }}>
            {cta.title}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            {cta.description}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={cta.btnPrimary.to} className="btn btn-primary btn-lg">{cta.btnPrimary.text}</Link>
            <Link to={cta.btnSecondary.to} className="btn btn-outline-white btn-lg">{cta.btnSecondary.text}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
