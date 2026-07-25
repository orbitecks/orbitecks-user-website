import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageSkeleton } from './PageSkeleton';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // 450ms loading shimmer transition
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <PageSkeleton path={location.pathname} />;
  }

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      {children}
    </div>
  );
};

export default PageContainer;
