import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface NotFoundProps {
  title?: string;
  message?: string;
  code?: string;
}

const NotFound = ({
  title = "Page Not Found",
  message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  code = "404"
}: NotFoundProps) => {
  return (
    <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <SEO 
        title={`${code} - ${title} | Orbitecks`} 
        description={message}
      />
      <div className="container" style={{ maxWidth: 680, textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          fontSize: 'clamp(90px, 12vw, 160px)',
          fontWeight: 900,
          color: 'var(--purple-faint2)',
          lineHeight: 1,
          marginBottom: 16,
          letterSpacing: '-0.05em',
          userSelect: 'none',
          position: 'relative'
        }}>
          {code}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(14px, 2vw, 20px)',
            fontWeight: 800,
            color: 'var(--purple)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            whiteSpace: 'nowrap',
            background: 'var(--white)',
            padding: '4px 16px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            Oops! Page Error
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.025em' }}>
          {title}
        </h1>
        
        <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline btn-lg">
            Contact Support
          </Link>
        </div>

        {/* Quick Navigation Suggestions Grid */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left' }}>
          <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Popular Pages & Destinations:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
            <Link to="/services" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 600, fontSize: 14, padding: '10px 14px', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid #E2E8F0', transition: 'all 0.2s ease' }}>
              ⚡ Our Services →
            </Link>
            <Link to="/portfolio" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 600, fontSize: 14, padding: '10px 14px', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid #E2E8F0', transition: 'all 0.2s ease' }}>
              💼 Portfolio Studies →
            </Link>
            <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 600, fontSize: 14, padding: '10px 14px', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid #E2E8F0', transition: 'all 0.2s ease' }}>
              📰 Insights & Articles →
            </Link>
            <Link to="/consultation" style={{ textDecoration: 'none', color: 'var(--dark)', fontWeight: 600, fontSize: 14, padding: '10px 14px', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid #E2E8F0', transition: 'all 0.2s ease' }}>
              📅 Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
