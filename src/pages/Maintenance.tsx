import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IconWrench } from '../components/Icons';

const Maintenance = () => {
  return (
    <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <SEO 
        title="Scheduled Maintenance | Orbitecks" 
        description="Our platform is currently undergoing scheduled maintenance and upgrades."
      />
      <div className="container" style={{ maxWidth: 640, textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#FEF3C7',
          color: '#D97706',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid #FDE68A',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.15)'
        }}>
          <IconWrench size={40} color="#D97706" />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: '#FEF3C7',
          color: '#D97706',
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 16,
          border: '1px solid #FDE68A'
        }}>
          Status: 503 Scheduled Maintenance
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.025em' }}>
          We'll Be Back Shortly
        </h1>
        
        <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 32 }}>
          We are currently performing scheduled maintenance and performance upgrades to improve your experience. We expect to be fully back online shortly.
        </p>

        <div style={{
          background: 'var(--purple-faint)', border: '1px solid rgba(124, 58, 237, 0.15)',
          borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 36, display: 'inline-block'
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Estimated Downtime
          </span>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--dark)', marginTop: 4 }}>
            Under 30 Minutes
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary btn-lg"
          >
            Check Status
          </button>
          
          <Link to="/contact" className="btn btn-outline btn-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
