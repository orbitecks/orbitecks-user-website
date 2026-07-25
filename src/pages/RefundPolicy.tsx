import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines, renderPolicyContent } from '../utils/textHelper';

const staticRefundContent = `1. Deposit Fees & Onboarding
Upon signing a Statement of Work, a non-refundable upfront deposit (typically 50% of the total project value unless stated otherwise) is required to secure our production schedule and initiate user research. This deposit covers early administrative expenses and cannot be refunded once work begins.

2. Milestone-Based Refund Assessments
For multi-phase campaigns, refunds can only be evaluated for upcoming phases that have NOT yet commenced. Once a design milestone (e.g. visual layout approval, frontend coding launch) is approved by the client, the corresponding billing segment is fully locked and non-refundable.

3. Monthly Retainer Services
Monthly agency retainers (for SEO, marketing support, and ongoing code maintenance) are billed upfront on a recurring schedule. You may cancel your retainer subscription by providing a written notice at least fifteen (15) business days prior to the next billing cycle. Retrospective refunds are not provided for active months.

4. Project Cancellations & Terminations
Either party may terminate an active project engagement by providing 10 days written notice to the other. Upon cancellation, the client will be invoiced for all accumulated billable hours, completed deliverables, and mockups produced up to the effective termination date.`;

const RefundPolicy = () => {
  const [copy, setCopy] = useState({
    title: 'Refund & Cancellation Policy',
    description: 'Review Orbitecks\'s refund policies. Get information about upfront project milestones, installment policies, and cancellation procedures.',
    lastUpdated: 'July 4, 2026',
    content: staticRefundContent
  });

  useEffect(() => {
    const fetchRefund = async () => {
      try {
        const { data, error } = await supabase
          .from('policies')
          .select('*')
          .eq('id', 'refund')
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
        console.warn('Failed to load refund from Supabase, using static fallback.', err);
      }
    };
    fetchRefund();
  }, []);

  return (
    <div className="page">
      <SEO 
        title={copy.title} 
        description={copy.description} 
        keywords="refund policy, cancellation policy, billing terms, project cancellation"
      />
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-tag">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
            Legal Documentation
          </div>
          <h1 className="page-hero-title">{copy.title}</h1>
          <p className="page-hero-desc">
            Last Updated: {copy.lastUpdated}. Review our standard terms regarding billing deposits and project terminations.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {renderPolicyContent(copy.content)}

            <div style={{
              background: 'var(--purple-faint)', borderRadius: 'var(--radius-lg)',
              padding: 24, border: '1px solid var(--purple-faint2)',
              marginTop: 20
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark2)', marginBottom: 10 }}>Have questions or disputes?</h3>
              <p style={{ color: 'var(--gray-450)', fontSize: 14, marginBottom: 16 }}>
                Our financial relations team is always here to align and ensure a mutually beneficial partnership. Reach out for assistance.
              </p>
              <Link to="/contact" className="btn btn-primary btn-sm">Contact Billing Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
