import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconWifiOff, IconCheck } from './Icons';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showToast) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      transition: 'all 0.3s ease'
    }}>
      {!isOnline && (
        <div style={{
          background: '#EF4444',
          color: '#FFFFFF',
          padding: '10px 16px',
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
        }}>
          <IconWifiOff size={16} color="white" />
          <span>You are currently offline. Please check your internet connection.</span>
          <Link 
            to="/offline" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline', 
              fontWeight: 700, 
              marginLeft: 8 
            }}
          >
            Troubleshoot
          </Link>
        </div>
      )}

      {isOnline && showToast && (
        <div style={{
          background: '#16A34A',
          color: '#FFFFFF',
          padding: '10px 16px',
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
        }}>
          <IconCheck size={16} color="white" />
          <span>Your internet connection has been restored!</span>
        </div>
      )}
    </div>
  );
};

export default OfflineBanner;
