import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines, renderPolicyContent } from '../utils/textHelper';

const staticPrivacyContent = `1. Information We Collect
We collect personal information that you provide voluntarily when booking consultations, sending queries, or signing contracts. This includes your name, email, corporate domain, billing coordinates, and project specifications. We also track anonymous usage metrics (IP, device parameters) via browser cookies.

2. How We Use Information
We utilize your personal information to schedule consultation events, perform customized client discovery, draft Statements of Work, process payment invoices, and deliver project status updates. We also send periodical digital insights and promotions (which you can opt-out of at any time).

3. Data Security & Storage
We implement industry-standard encryption, SSL protocols, and access management profiles to keep your intellectual logs and customer databases secure. However, no digital storage mechanism is 100% impenetrable. We cannot guarantee absolute transmission security.

4. Third-Party Disclosures
We do not sell, rent, or trade your corporate information to external advertising brokers. We only share essential metadata with trusted third-party service providers (like payment processors, domain hosts, and project trackers) required to deliver our core services.

5. Your Rights (GDPR & CCPA)
Depending on your location, you have rights to access, update, export, or delete your personal records stored in our servers. You may contact us at hello@orbitecks.agency to request record clearance.`;

const PrivacyPolicy = () => {
  const [copy, setCopy] = useState({
    title: 'Privacy Policy',
    description: 'Learn how Orbitecks collects, stores, and protects client files, emails, cookies, and project data under global privacy laws.',
    lastUpdated: 'July 4, 2026',
    content: staticPrivacyContent
  });

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*')
          .eq('id', 'privacy')
          .maybeSingle();

        if (error) throw error;
        if (data) {
          const formatted = formatDataNewlines(data);
          setCopy({
            title: formatted.title,
            description: formatted.description || copy.description,
            lastUpdated: formatted.last_updated,
            content: formatted.content
          });
        }
      } catch (err) {
        console.warn('Failed to load privacy from Supabase, using static fallback.', err);
      }
    };
    fetchPrivacy();
  }, []);

  return (
    <div className="page">
      <SEO 
        title={copy.title} 
        description={copy.description} 
        keywords="privacy policy, data protection, privacy statement, gdpr agency compliance"
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Legal Documentation
          </div>
          <h1 className="page-hero-title">{copy.title}</h1>
          <p className="page-hero-desc">
            Last Updated: {copy.lastUpdated}. Your privacy is paramount. Learn how we handle your digital logs and information.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {renderPolicyContent(copy.content)}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
