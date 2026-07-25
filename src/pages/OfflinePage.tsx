import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { IconWifiOff, IconRefresh, IconCheck } from '../components/Icons';

const OfflinePage = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCheckConnection = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsOnline(navigator.onLine);
      setIsChecking(false);
      if (navigator.onLine) {
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--white)' }}>
      <SEO 
        title="No Internet Connection | Orbitecks" 
        description="You are currently offline. Please check your internet connection."
      />
      <div className="container" style={{ maxWidth: 640, textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: isOnline ? '#F0FDF4' : '#FEF2F2',
          color: isOnline ? '#16A34A' : '#EF4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: isOnline ? '1px solid #DCFCE7' : '1px solid #FEE2E2',
          boxShadow: isOnline ? '0 8px 24px rgba(22, 163, 74, 0.15)' : '0 8px 24px rgba(239, 68, 68, 0.15)'
        }}>
          {isOnline ? <IconCheck size={40} color="#16A34A" /> : <IconWifiOff size={40} color="#EF4444" />}
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 'var(--radius-pill)',
          background: isOnline ? '#F0FDF4' : '#FEF2F2',
          color: isOnline ? '#16A34A' : '#EF4444',
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 16,
          border: isOnline ? '1px solid #DCFCE7' : '1px solid #FEE2E2'
        }}>
          {isOnline ? '● Back Online!' : '● Network Offline'}
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: 'var(--dark)', marginBottom: 16, letterSpacing: '-0.025em' }}>
          {isOnline ? 'Connection Restored' : 'No Internet Connection'}
        </h1>
        
        <p style={{ fontSize: 16, color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: 32 }}>
          {isOnline 
            ? 'Great news! Your device is connected to the internet again.'
            : 'It looks like your internet connection is unavailable. Please check your Wi-Fi, mobile data, or router and try again.'}
        </p>

        {/* Troubleshooting Tips */}
        {!isOnline && (
          <div style={{
            background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-lg)',
            padding: '20px 24px', textAlign: 'left', marginBottom: 36
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              Quick Troubleshooting:
            </h4>
            <ul style={{ paddingLeft: 18, color: 'var(--gray-600)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <li>Ensure Wi-Fi or mobile data is turned on.</li>
              <li>Check your network router or modem lights.</li>
              <li>Toggle Airplane Mode off and on.</li>
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleCheckConnection} 
            disabled={isChecking}
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <IconRefresh size={18} color="white" />
            <span>{isChecking ? 'Checking Connection...' : 'Check Connection'}</span>
          </button>
          
          <Link to="/" className="btn btn-outline btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
