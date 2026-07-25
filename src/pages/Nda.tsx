import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines, renderPolicyContent } from '../utils/textHelper';

const staticNdaContent = `"We hold ourselves to the highest ethical and professional standards. Prior to entering deep project scopes, we provide standard pre-executed mutual NDA paperwork to safeguard your data."

1. Definition of Confidential Information
Confidential information refers to all proprietary data, product roadmaps, source codes, pricing configurations, operational structures, client listings, and strategic plans disclosed by either party during project discovery or delivery cycles.

2. Non-Disclosure Obligations
Both parties agree to hold confidential information in strict confidence and protect it from unauthorized dissemination using the same standard of care used for their own proprietary records (but no less than a reasonable standard of care). Information shall not be shared with external contractors without explicit mutual written consent.

3. Excluded Information
Obligations under this agreement do not apply to information that is: (a) publicly available prior to disclosure, (b) already known to the receiving party, (c) developed independently without referencing confidential files, or (d) legally ordered for disclosure by judicial authorities.

4. Term of Agreement
Confidentiality restrictions remain actively binding for a period of three (3) years from the initial date of disclosure or for as long as information qualifies as trade secrets under applicable laws.`;

const Nda = () => {
  const [copy, setCopy] = useState({
    title: 'Non-Disclosure Agreement (NDA)',
    description: 'Review Orbitecks\'s mutual Non-Disclosure Agreement. Learn how we safeguard proprietary records, client assets, and intellectual property.',
    lastUpdated: 'July 4, 2026',
    content: staticNdaContent
  });

  useEffect(() => {
    const fetchNda = async () => {
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*')
          .eq('id', 'nda')
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
        console.warn('Failed to load NDA from Supabase, using static fallback.', err);
      }
    };
    fetchNda();
  }, []);

  return (
    <div className="page">
      <SEO 
        title={copy.title} 
        description={copy.description} 
        keywords="NDA, non disclosure agreement, confidentiality terms, client protection"
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Legal Documentation
          </div>
          <h1 className="page-hero-title">{copy.title}</h1>
          <p className="page-hero-desc">
            Last Updated: {copy.lastUpdated}. Standard Mutual Confidentiality Terms. We protect your corporate intelligence and proprietary information.
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

export default Nda;
