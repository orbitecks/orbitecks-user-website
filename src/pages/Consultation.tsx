import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { consultationData } from '../data/consultationData';
import { IconTarget, IconBulb, IconMap, IconCheck } from '../components/Icons';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { formatDataNewlines, generateDynamicSlots } from '../utils/textHelper';

const Consultation = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [copy, setCopy] = useState(consultationData);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    service: '', budget: '', timeline: '', desc: '',
    date: '', time: '', notes: ''
  });

  useEffect(() => {
    fetchConsultationData();
  }, []);

  const fetchConsultationData = async () => {
    try {
      const { data: rawPageRes } = await supabase.from('consultation_page_settings').select('*').eq('id', 1).maybeSingle();
      const pageRes = formatDataNewlines(rawPageRes);
      if (pageRes) {
        setCopy({
          hero: {
            badge: pageRes.hero_badge,
            title: pageRes.hero_title,
            description: pageRes.hero_description,
          },
          steps: Array.isArray(pageRes.steps) ? pageRes.steps : consultationData.steps,
          form: {
            ...consultationData.form,
            success: {
              title: pageRes.success_title,
              desc: pageRes.success_desc,
              btnHome: pageRes.success_btn_home,
              btnWork: pageRes.success_btn_work,
            },
            slots: Array.isArray(pageRes.slots) ? pageRes.slots : consultationData.form.slots,
          },
          expect: {
            title: pageRes.expect_title,
            subtitle: pageRes.expect_subtitle,
            list: Array.isArray(pageRes.expect_list) ? pageRes.expect_list : consultationData.expect.list,
          },
          trustBadges: Array.isArray(pageRes.trust_badges) ? pageRes.trust_badges : consultationData.trustBadges,
          budgets: Array.isArray(pageRes.budgets) ? pageRes.budgets : consultationData.budgets,
        });
      }
    } catch (err) {
      console.warn('Supabase consultation data load failed. Falling back to static values.', err);
    }
  };

  const { hero, steps, form: formLabels, expect, trustBadges } = copy;

  const renderExpectIcon = (iconKey: string) => {
    const size = 24;
    const color = 'var(--purple-light)';
    switch (iconKey) {
      case 'target': return <IconTarget size={size} color={color} />;
      case 'bulb': return <IconBulb size={size} color={color} />;
      case 'map': return <IconMap size={size} color={color} />;
      default: return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // If picking a custom date, clear the pre-defined slot highlight
      if (name === 'date' && value !== '') {
        if (formLabels.slots.includes(prev.time)) {
          updated.time = '';
        }
      }
      // If inputting a custom time that doesn't match any predefined slot, clear the custom date
      if (name === 'time' && value !== '') {
        if (!formLabels.slots.includes(value)) {
          updated.date = '';
        }
      }
      return updated;
    });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const next = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (step < 2) {
      setStep(s => s + 1);
    } else {
      setSubmitting(true);
      try {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          company: form.company.trim() || null,
          phone: form.phone.trim() || null,
          service: form.service || null,
          budget: form.budget || null,
          timeline: form.timeline || null,
          description: form.desc.trim() || null,
          date: form.date || null,
          time: form.time || null,
          notes: form.notes.trim() || null,
          status: 'new'
        };

        const { error } = await supabase
          .from('consultation_bookings')
          .insert([payload]);

        if (error) throw error;
        setDone(true);
      } catch (err: any) {
        console.error('Consultation booking submission error:', err);
        setSubmitError(err?.message || 'Failed to submit consultation request. Please check your connection and try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="page">
      <SEO 
        title="Book a Free Consultation" 
        description="Schedule a free 30-minute consultation slot. Align on goals, map out strategy, and receive a professional project roadmap with our lead strategy team." 
        keywords="book consultation, free consulting session, project roadmap, agency consulting"
      />
      {/* ─── HERO ─── */}
      <section className="consultation-hero">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 'var(--radius-pill)', padding: '5px 14px', fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
            {hero.badge}
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 58px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'white', marginBottom: 16, whiteSpace: 'pre-line' }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            {hero.description}
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {done ? (
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)', padding: '60px 48px',
              textAlign: 'center', border: '1px solid var(--gray-100)'
            }}>
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
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--dark)', marginBottom: 12 }}>{formLabels.success.title}</h2>
              <p style={{ fontSize: 15, color: 'var(--gray-400)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 32px' }}>
                {formLabels.success.desc}
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/" className="btn btn-primary btn-lg">{formLabels.success.btnHome}</Link>
                <Link to="/portfolio" className="btn btn-outline btn-lg">{formLabels.success.btnWork}</Link>
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-100)', overflow: 'hidden' }}>
              {/* Step indicator */}
              <div style={{ padding: '28px 40px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                {/* Background Line */}
                <div style={{
                  position: 'absolute',
                  top: '46px',
                  left: '70px',
                  right: '70px',
                  height: '2px',
                  background: 'var(--gray-100)',
                  zIndex: 0
                }} />
                
                {steps.map((s, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 6, 
                    flex: 1,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: i <= step ? 'var(--purple)' : 'var(--gray-100)',
                      color: i <= step ? 'white' : 'var(--gray-400)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, transition: 'var(--transition)',
                      boxShadow: '0 0 0 6px white'
                    }}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: i <= step ? 'var(--purple)' : 'var(--gray-400)', textAlign: 'center' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={next} style={{ padding: '36px 40px' }}>
                {/* Step 0: Your Details */}
                {step === 0 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{formLabels.step0.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 28 }}>{formLabels.step0.desc}</p>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">{formLabels.step0.labelName}</label>
                        <input id="name" name="name" type="text" required className="form-input" placeholder="John Doe" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">{formLabels.step0.labelEmail}</label>
                        <input id="email" name="email" type="email" required className="form-input" placeholder="john@company.com" value={form.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="company">{formLabels.step0.labelCompany}</label>
                        <input id="company" name="company" type="text" className="form-input" placeholder="Acme Inc." value={form.company} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="phone">{formLabels.step0.labelPhone}</label>
                        <input id="phone" name="phone" type="tel" className="form-input" placeholder="+1 (234) 567-890" value={form.phone} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Project Info */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{formLabels.step1.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 28 }}>{formLabels.step1.desc}</p>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="service">{formLabels.step1.labelService}</label>
                        <select id="service" name="service" required className={`form-select ${form.service === '' ? 'is-placeholder' : ''}`} value={form.service} onChange={handleChange}>
                          <option value="">Select a service...</option>
                          <option value="brand">Brand Identity</option>
                          <option value="web">Web Design & Dev</option>
                          <option value="seo">SEO & Growth</option>
                          <option value="ecom">Shopify & E-Commerce</option>
                          <option value="ux">UI/UX Design</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="full">Full Digital Package</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="budget">{formLabels.step1.labelBudget}</label>
                        <select id="budget" name="budget" className={`form-select ${form.budget === '' ? 'is-placeholder' : ''}`} value={form.budget} onChange={handleChange}>
                          <option value="">Select budget...</option>
                          {copy.budgets?.map((bOpt: string) => (
                            <option key={bOpt} value={bOpt}>{bOpt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="timeline">{formLabels.step1.labelTimeline}</label>
                      <select id="timeline" name="timeline" className={`form-select ${form.timeline === '' ? 'is-placeholder' : ''}`} value={form.timeline} onChange={handleChange}>
                        <option value="">When do you need this?</option>
                        <option value="asap">ASAP (within 2 weeks)</option>
                        <option value="1month">1 Month</option>
                        <option value="3months">1–3 Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="desc">{formLabels.step1.labelDesc}</label>
                      <textarea id="desc" name="desc" rows={4} className="form-textarea" placeholder="Briefly describe your project, goals, and any specific challenges you're facing..." value={form.desc} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {/* Step 2: Schedule */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{formLabels.step2.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 28 }}>{formLabels.step2.desc}</p>

                    {/* Quick time slots (Dynamic real-time generation) */}
                    <div style={{ marginBottom: 24 }}>
                      <p className="form-label" style={{ marginBottom: 12 }}>{formLabels.step2.labelAvailable}</p>
                      <div className="consultation-slots" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {generateDynamicSlots().map((slot, i) => (
                          <button
                            type="button" key={i}
                            onClick={() => setForm(f => ({ ...f, time: slot, date: '' }))}
                            style={{
                              padding: '10px 12px', borderRadius: 'var(--radius)',
                              border: form.time === slot ? '2px solid var(--purple)' : '1.5px solid var(--gray-200)',
                              background: form.time === slot ? 'var(--purple-faint)' : 'transparent',
                              fontSize: 13, fontWeight: 500,
                              color: form.time === slot ? 'var(--purple)' : 'var(--dark2)',
                              cursor: 'pointer', transition: 'var(--transition)',
                              fontFamily: 'var(--font)'
                            }}
                          >{slot}</button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">{formLabels.step2.labelCustomDate}</label>
                        <input id="date" name="date" type="date" className="form-input" value={form.date} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="time">{formLabels.step2.labelCustomTime}</label>
                        <input 
                          id="time" name="time" type="text" className="form-input" 
                          placeholder="e.g. 2:30 PM IST" value={form.time} onChange={handleChange} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="notes">{formLabels.step2.labelNotes}</label>
                      <textarea id="notes" name="notes" rows={3} className="form-textarea" placeholder="Any specific topics or questions you'd like to cover in the session..." value={form.notes} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {submitError && (
                  <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 'var(--radius)', color: '#EF4444', fontSize: 13, marginTop: 16 }}>
                    ⚠️ {submitError}
                  </div>
                )}

                {/* Navigation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--gray-100)' }}>
                  {step > 0 ? (
                    <button type="button" disabled={submitting} className="btn btn-outline" onClick={() => setStep(s => s - 1)}>
                      {formLabels.btnBack}
                    </button>
                  ) : <div />}
                  <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ marginLeft: 'auto' }}>
                    {submitting ? 'Submitting Request...' : (step < 2 ? formLabels.btnContinue : formLabels.btnBook)}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Trust indicators */}
          {!done && (
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
              {trustBadges.map((t, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── WHY CONSULT ─── */}
      {!done && (
        <section style={{ background: 'var(--dark)', padding: '72px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', marginBottom: 12 }}>
                {expect.title}
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
                {expect.subtitle}
              </p>
            </div>
            <div className="grid-3" style={{ gap: 24 }}>
              {expect.list.map((item, i) => (
                <div key={i} style={{
                  background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 'var(--radius-lg)', padding: 28, transition: 'var(--transition)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(167,139,250,0.1)',
                    color: 'var(--purple-light)',
                    marginBottom: 18
                  }}>
                    {renderExpectIcon(item.icon)}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Consultation;
