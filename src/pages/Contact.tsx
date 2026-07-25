import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { contactData } from '../data/contactData';
import SocialIcon from '../components/SocialIcon';
import { IconLightning, IconLock, IconGlobe, IconStar, IconCheck, IconMail, IconPhone, IconPin, IconClock } from '../components/Icons';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines } from '../utils/textHelper';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [budgets, setBudgets] = useState<string[]>(['Under ₹15,000', '₹15,000 – ₹30,000', '₹30,000 – ₹60,000', '₹60,000 – ₹1,00,000', '₹1,00,000+']);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    service: '', budget: '', message: ''
  });

  const [copy, setCopy] = useState(contactData);
  const [info, setInfo] = useState(contactData.info);
  const { hero, form: formLabels, faq, trustStrip } = copy;

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      // 1. Fetch Contact Page copy settings
      const { data: rawPageRes } = await supabase.from('contact_page_settings').select('*').eq('id', 1).maybeSingle();
      const pageRes = formatDataNewlines(rawPageRes);
      if (pageRes) {
        setCopy({
          ...contactData,
          hero: {
            tag: pageRes.hero_tag,
            titleMain: pageRes.hero_title_main,
            titleAccent: pageRes.hero_title_accent,
            description: pageRes.hero_description,
          },
          info: {
            ...contactData.info,
            label: pageRes.info_label,
            title: pageRes.info_title,
            description: pageRes.info_description,
            details: info.details
          },
          faq: {
            ...contactData.faq,
            items: Array.isArray(pageRes.faq_items) && pageRes.faq_items.length > 0 ? pageRes.faq_items : contactData.faq.items
          },
          trustStrip: Array.isArray(pageRes.trust_strip) && pageRes.trust_strip.length > 0 ? pageRes.trust_strip : contactData.trustStrip
        });
        setInfo(prev => ({
          ...prev,
          label: pageRes.info_label,
          title: pageRes.info_title,
          description: pageRes.info_description
        }));
      }

      // 2. Fetch site settings details
      const { data: rawSData } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();
      const sData = formatDataNewlines(rawSData);
      if (sData) {
        setInfo(prev => ({
          ...prev,
          details: prev.details.map(item => {
            if (item.label.toLowerCase().includes('email')) {
              return { ...item, value: sData.contact_email };
            }
            if (item.label.toLowerCase().includes('phone') || item.label.toLowerCase().includes('call')) {
              return { ...item, value: sData.contact_phone };
            }
            if (item.label.toLowerCase().includes('office') || item.label.toLowerCase().includes('visit')) {
              return { ...item, value: sData.contact_location };
            }
            if (item.label.toLowerCase().includes('hours') || item.label.toLowerCase().includes('time')) {
              return { ...item, value: sData.contact_hours };
            }
            return item;
          })
        }));
      }

      // 3. Fetch budgets from consultation settings
      try {
        const { data: rawConsultRes } = await supabase.from('consultation_page_settings').select('budgets').eq('id', 1).maybeSingle();
        const consultRes = formatDataNewlines(rawConsultRes);
        if (consultRes && Array.isArray(consultRes.budgets)) {
          setBudgets(consultRes.budgets);
        }
      } catch (e) {
        console.warn('Failed to load dynamic budgets', e);
      }
    } catch (err) {
      console.warn('Supabase contact data load failed. Falling back to static values.', err);
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const payload = {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || null,
        service: form.service || null,
        budget: form.budget || null,
        message: form.message.trim(),
        status: 'new'
      };

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([payload]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitError(err?.message || 'Failed to send message. Please check your network connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderTrustIcon = (iconKey: string) => {
    const size = 18;
    const color = 'var(--purple)';
    switch (iconKey) {
      case 'lightning': return <IconLightning size={size} color={color} />;
      case 'lock': return <IconLock size={size} color={color} />;
      case 'globe': return <IconGlobe size={size} color={color} />;
      case 'star': return <IconStar size={size} color={color} />;
      case 'check': return <IconCheck size={size} color={color} />;
      default: return null;
    }
  };

  return (
    <div className="page">
      <SEO 
        title="Contact Orbitecks - Get a Project Estimate" 
        description="Get in touch with our design and development experts. Tell us about your project needs, business goals, and budget to receive a custom proposal." 
        keywords="contact agency, request quote, project estimate, hire web developers, hire designers"
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

      {/* ─── CONTACT BODY ─── */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="contact-layout">
            {/* Left: Info */}
            <div className="contact-info">
              <p className="section-label">{info.label}</p>
              <h2 className="contact-info-title" style={{ whiteSpace: 'pre-line' }}>
                {info.title}
              </h2>
              <p className="contact-info-desc">
                {info.description}
              </p>

              <div className="contact-details">
                {info.details.map((detail, idx) => (
                  <div key={idx} className="contact-detail-item">
                    <div className="contact-detail-icon">
                      {detail.icon === '✉' && <IconMail size={20} color="var(--purple)" />}
                      {detail.icon === '☎' && <IconPhone size={20} color="var(--purple)" />}
                      {detail.icon === '⌖' && <IconPin size={20} color="var(--purple)" />}
                      {detail.icon === '◷' && <IconClock size={20} color="var(--purple)" />}
                    </div>
                    <div>
                      <div className="contact-detail-label">{detail.label}</div>
                      {detail.label === 'Email Us' ? (
                        <a href={`mailto:${detail.value}`} className="contact-detail-value" style={{ textDecoration: 'none', color: 'var(--purple)' }}>
                          {detail.value}
                        </a>
                      ) : detail.label === 'Call Us' ? (
                        <a href={`tel:${detail.value.replace(/[^+\d]/g, '')}`} className="contact-detail-value" style={{ textDecoration: 'none', color: 'var(--purple)' }}>
                          {detail.value}
                        </a>
                      ) : (
                        <div className="contact-detail-value">{detail.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ marginTop: 40 }}>
                <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 14 }}>{info.socialsLabel}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {info.socials.map((s, i) => (
                    <button key={i} className="social-btn" style={{
                      background: 'var(--purple-faint2)', color: 'var(--purple)',
                      fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <SocialIcon platform={s} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--purple-faint)',
                    border: '1.5px solid rgba(124, 58, 237, 0.15)',
                    color: 'var(--purple)',
                    marginBottom: 24,
                    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.08)'
                  }}>
                    <IconCheck size={36} color="var(--purple)" />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)', marginBottom: 12 }}>{formLabels.successTitle}</h3>
                  <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 24 }}>
                    {formLabels.successDesc}
                  </p>
                  <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ firstName: '', lastName: '', email: '', phone: '', service: '', budget: '', message: '' }); }}>
                    {formLabels.btnReset}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="form-title">{formLabels.title}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="firstName">First Name *</label>
                        <input
                          id="firstName" name="firstName" type="text" required
                          className="form-input" placeholder="John"
                          value={form.firstName} onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="lastName">Last Name *</label>
                        <input
                          id="lastName" name="lastName" type="text" required
                          className="form-input" placeholder="Doe"
                          value={form.lastName} onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address *</label>
                        <input
                          id="email" name="email" type="email" required
                          className="form-input" placeholder="john@company.com"
                          value={form.email} onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <input
                          id="phone" name="phone" type="tel"
                          className="form-input" placeholder="+1 (234) 567-890"
                          value={form.phone} onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="service">Service Interested In</label>
                        <select id="service" name="service" className={`form-select ${form.service === '' ? 'is-placeholder' : ''}`} value={form.service} onChange={handleChange}>
                          <option value="">Select a service...</option>
                          <option value="brand">Brand Identity</option>
                          <option value="web">Web Design & Dev</option>
                          <option value="seo">SEO & Growth</option>
                          <option value="ecom">Shopify & E-Commerce</option>
                          <option value="ux">UI/UX Design</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="budget">Project Budget</label>
                        <select id="budget" name="budget" className={`form-select ${form.budget === '' ? 'is-placeholder' : ''}`} value={form.budget} onChange={handleChange}>
                          <option value="">Select budget range...</option>
                          {budgets.map((bOpt: string) => (
                            <option key={bOpt} value={bOpt}>{bOpt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Tell Us About Your Project *</label>
                      <textarea
                        id="message" name="message" required rows={5}
                        className="form-textarea" placeholder="Describe your project, goals, timeline, and anything else we should know..."
                        value={form.message} onChange={handleChange}
                      />
                    </div>
                    {submitError && (
                      <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 'var(--radius)', color: '#EF4444', fontSize: 13, marginBottom: 16 }}>
                        ⚠️ {submitError}
                      </div>
                    )}
                    <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      {submitting ? 'Sending Request...' : formLabels.btnSubmit}
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginTop: 14 }}>
                      We'll respond within 24 hours. Your information is kept private.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>{faq.label}</p>
            <h2 className="heading-lg" style={{ whiteSpace: 'pre-line' }}>{faq.title}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.items.map((item, i) => (
              <div key={i} style={{
                border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)',
                overflow: 'hidden', background: 'var(--white)'
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 24px', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    background: openFaq === i ? 'var(--purple-faint)' : 'none',
                    border: 'none', cursor: 'pointer', fontFamily: 'var(--font)',
                    textAlign: 'left', transition: 'var(--transition)'
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark2)' }}>{item.q}</span>
                  <span style={{ color: 'var(--purple)', fontSize: 18, flexShrink: 0, marginLeft: 16 }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 18px', fontSize: 14, color: 'var(--gray-400)', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section style={{ background: 'var(--white)', padding: '48px 0', borderTop: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {trustStrip.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, color: 'var(--gray-600)' }}>
                <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {renderTrustIcon(item.icon)}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
