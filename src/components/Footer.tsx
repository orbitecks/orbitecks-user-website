import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navigationData } from '../data/navigationData';
import SocialIcon from './SocialIcon';
import { supabase } from '../utils/supabaseClient';

const Footer = () => {
  const year = new Date().getFullYear();
  const { logo, footer: staticFooter } = navigationData;

  const [email, setEmail] = useState('hello@orbitecks.agency');
  const [phone, setPhone] = useState('+1 (234) 567-890');
  const [socials, setSocials] = useState([
    { label: 'GitHub', icon: 'git', href: 'https://github.com/orbitecks' },
    { label: 'Instagram', icon: 'ig', href: 'https://instagram.com/orbitecks' },
    { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com/company/orbitecks' },
  ]);

  useEffect(() => {
    fetchFooterSettings();
  }, []);

  const fetchFooterSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();
      if (data && !error) {
        if (data.contact_email) setEmail(data.contact_email);
        if (data.contact_phone) setPhone(data.contact_phone);
        setSocials([
          { label: 'GitHub', icon: 'git', href: data.social_github || 'https://github.com/orbitecks' },
          { label: 'Instagram', icon: 'ig', href: data.social_instagram || 'https://instagram.com/orbitecks' },
          { label: 'LinkedIn', icon: 'in', href: data.social_linkedin || 'https://linkedin.com/company/orbitecks' },
        ]);
      }
    } catch (err) {
      console.warn('Failed to load footer settings from Supabase. Using fallbacks.', err);
    }
  };

  // Override static sections with dynamic contact details
  const sections = staticFooter.sections.map(section => {
    if (section.label === 'Contact') {
      return {
        ...section,
        links: [
          { href: `mailto:${email}`, label: email },
          { href: `tel:${phone.replace(/[^+\d]/g, '')}`, label: phone }
        ]
      };
    }
    return section;
  });

  return (
    <footer className="footer-cta">
      <div className="container">
        {/* Top CTA */}
        <div className="footer-cta-inner">
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
              {staticFooter.cta.subtitle}
            </p>
            <h2 className="footer-cta-title">
              {staticFooter.cta.titleFirst}<br />Since <span>2020</span>
            </h2>
          </div>
          <div className="footer-cta-right">
            <p className="footer-cta-desc">
              {staticFooter.cta.description}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/consultation" className="btn btn-primary btn-lg">
                {staticFooter.cta.btnStart}
              </Link>
              <Link to="/portfolio" className="btn btn-outline-white btn-lg">
                {staticFooter.cta.btnWork}
              </Link>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          {sections.map((section, idx) => (
            <div key={idx} className="footer-links-group">
              <p className="footer-links-label">{section.label}</p>
              <ul className="footer-links-list">
                {section.links.map((link, linkIdx) => {
                  if ('to' in link) {
                    return (
                      <li key={linkIdx}>
                        <Link to={link.to!}>{link.label}</Link>
                      </li>
                    );
                  } else {
                    return (
                      <li key={linkIdx}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <Link to="/" className="footer-logo">
            {logo.textFirst}<span>{logo.textSecond}</span>
          </Link>
          <p className="footer-copy">
            © {year} {staticFooter.bottom.copyright}
          </p>
          <div className="footer-socials">
            {socials.map((social, socialIdx) => (
              <a 
                key={socialIdx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn" 
                aria-label={social.label} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <SocialIcon platform={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
