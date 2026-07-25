import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IconServerCrash, IconRefresh } from '../components/Icons';

const ServerError = () => {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <SEO 
        title="500 - Server Error | Orbitecks" 
        description="An unexpected server error occurred on Orbitecks servers."
      />
      <div className="container" style={{ maxWidth: 640, textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'var(--purple-faint)',
          color: 'var(--purple)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          boxShadow: 'var(--shadow-purple)'
        }}>
          <IconServerCrash size={40} color="var(--purple)" />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--purple-faint)',
          color: 'var(--purple)',
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 16,
          border: '1px solid rgba(124, 58, 237, 0.2)'
        }}>
          Error Code: 500 Internal Error
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.025em' }}>
          Something Went Wrong
        </h1>
        
        <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 36 }}>
          We encountered an unexpected error on our server. Our engineering team has been notified automatically. You can try refreshing the page or check back shortly.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleRetry} 
            disabled={retrying}
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <IconRefresh size={18} color="white" />
            <span>{retrying ? 'Refreshing...' : 'Try Again'}</span>
          </button>
          
          <Link to="/" className="btn btn-outline btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
