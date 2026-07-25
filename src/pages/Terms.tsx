import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines, renderPolicyContent } from '../utils/textHelper';

const staticTermsContent = `1. Acceptance of Terms
By accessing, browsing, or utilizing the services provided by Orbitecks Creative Agency ("Agency", "We", "Us"), you agree to comply with and be bound by these Terms of Service. If you do not agree, please cease all usage of our service offerings immediately.

2. Scope of Services
Orbitecks provides digital consultation, branding, website design & development, search engine optimization (SEO), and conversion rate marketing retainer partnerships. Each engagement is governed by a mutually executed Statement of Work (SOW) specifying deliverables, timelines, and budgets.

3. Fees, Payments & Subscriptions
All client project fees are invoiced in accordance with agreed milestones inside the project SOW. Invoices must be settled within fourteen (14) business days of issuance. Late payments are subject to a standard 1.5% compounding monthly surcharge. Monthly subscription services are billed upfront and automatically renew.

4. Intellectual Property
Upon complete final receipt of payments, intellectual property rights, transfer logs, source codes, vectors, and finalized design systems migrate to the client. The Agency retains perpetual, royalty-free rights to display completed designs inside online portfolios and marketing case study compilations.

5. Client Responsibilities
To maintain production schedules, clients must provide source resources, content feedback, guidelines, and requested copies within the timeframe specified in the SOW. Project delays resulting from client responsiveness will not constitute breaches of timeline guarantees.

6. Limitation of Liability
In no circumstances will Orbitecks be liable for indirect, incidental, special, or consequential damages, including loss of profit or business reputation, arising from site deployments, marketing campaigns, or design updates. Our maximum collective liability is capped at the total amount received from the client for the specific project segment.`;

const Terms = () => {
  const [copy, setCopy] = useState({
    title: 'Terms of Service',
    description: 'Read Orbitecks\'s terms of service. Understand the guidelines, payment cycles, service scopes, and engagement requirements for our agency.',
    lastUpdated: 'July 4, 2026',
    content: staticTermsContent
  });

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*')
          .eq('id', 'terms')
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
        console.warn('Failed to load terms from Supabase, using static fallback.', err);
      }
    };
    fetchTerms();
  }, []);

  return (
    <div className="page">
      <SEO 
        title={copy.title} 
        description={copy.description} 
        keywords="terms of service, legal documentation, agency agreements"
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Legal Documentation
          </div>
          <h1 className="page-hero-title">{copy.title}</h1>
          <p className="page-hero-desc">
            Last Updated: {copy.lastUpdated}. Please read these terms carefully before engaging with Orbitecks Agency.
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

export default Terms;
