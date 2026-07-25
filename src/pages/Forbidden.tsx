import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IconShieldAlert } from '../components/Icons';

const Forbidden = () => {
  return (
    <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <SEO 
        title="403 - Access Restricted | Orbitecks" 
        description="Access to this requested page or resource is restricted or forbidden."
      />
      <div className="container" style={{ maxWidth: 640, textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#FEF2F2',
          color: '#EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid #FEE2E2',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)'
        }}>
          <IconShieldAlert size={40} color="#EF4444" />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: '#FEF2F2',
          color: '#EF4444',
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 16,
          border: '1px solid #FEE2E2'
        }}>
          Error Code: 403 Forbidden
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.025em' }}>
          Access Restricted
        </h1>
        
        <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 36 }}>
          You do not have authorization or permissions to access this page. If you believe this is an error, please reach out to our team or navigate back to the main site.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline btn-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
