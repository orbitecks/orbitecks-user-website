import { SkeletonLine, SkeletonRect, SkeletonCircle } from './Skeleton';

interface PageSkeletonProps {
  path: string;
}

export const PageSkeleton = ({ path }: PageSkeletonProps) => {
  const isHome = path === '/';
  const isServices = path === '/services';
  const isPortfolio = path === '/portfolio';
  const isBlog = path === '/blog';
  const isDetail = path.includes('/services/') || path.includes('/portfolio/');

  if (isHome) {
    return (
      <div className="container" style={{ padding: '120px 24px', minHeight: '80vh' }}>
        {/* Hero Section */}
        <div className="grid-2" style={{ gap: 60, marginBottom: 80, alignItems: 'center' }}>
          <div>
            <SkeletonLine width="120px" height="24px" marginBottom="20px" borderRadius="100px" />
            <SkeletonLine width="90%" height="56px" marginBottom="16px" />
            <SkeletonLine width="75%" height="56px" marginBottom="24px" />
            <SkeletonLine width="80%" height="20px" marginBottom="10px" />
            <SkeletonLine width="60%" height="20px" marginBottom="36px" />
            <div style={{ display: 'flex', gap: 16 }}>
              <SkeletonLine width="150px" height="48px" borderRadius="8px" />
              <SkeletonLine width="130px" height="48px" borderRadius="8px" />
            </div>
          </div>
          <div>
            <SkeletonRect height="460px" borderRadius="16px" />
          </div>
        </div>
        {/* Card Grid */}
        <div className="grid-3" style={{ gap: 24 }}>
          {[1, 2, 3].map(i => (
            <div key={i}>
              <SkeletonRect height="220px" borderRadius="12px" marginBottom="16px" />
              <SkeletonLine width="100px" height="14px" marginBottom="8px" />
              <SkeletonLine width="80%" height="20px" marginBottom="10px" />
              <SkeletonLine width="100%" height="14px" marginBottom="6px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isPortfolio || isServices || isBlog) {
    return (
      <div>
        {/* Page Hero */}
        <section className="page-hero" style={{ marginBottom: 60 }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SkeletonLine width="100px" height="20px" marginBottom="16px" borderRadius="100px" dark={true} />
            <SkeletonLine width="320px" height="42px" marginBottom="16px" dark={true} />
            <SkeletonLine width="480px" height="16px" marginBottom="6px" dark={true} />
            <SkeletonLine width="380px" height="16px" dark={true} />
          </div>
        </section>
        {/* Grid List */}
        <div className="container">
          <div className="grid-3" style={{ gap: 30, marginBottom: 80 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i}>
                <SkeletonRect height="240px" borderRadius="12px" marginBottom="18px" />
                <SkeletonLine width="80px" height="12px" marginBottom="8px" />
                <SkeletonLine width="90%" height="20px" marginBottom="12px" />
                <SkeletonLine width="100%" height="14px" marginBottom="6px" />
                <SkeletonLine width="85%" height="14px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isDetail) {
    return (
      <div>
        {/* Page Hero */}
        <section className="page-hero" style={{ marginBottom: 60 }}>
          <div className="container">
            <SkeletonLine width="120px" height="20px" marginBottom="16px" borderRadius="100px" dark={true} />
            <SkeletonLine width="420px" height="48px" marginBottom="16px" dark={true} />
            <SkeletonLine width="640px" height="18px" dark={true} />
          </div>
        </section>
        {/* Columns */}
        <div className="container projectdetail-layout" style={{ marginBottom: 80 }}>
          <div>
            <SkeletonLine width="150px" height="24px" marginBottom="20px" />
            <SkeletonLine width="100%" height="16px" marginBottom="12px" />
            <SkeletonLine width="95%" height="16px" marginBottom="12px" />
            <SkeletonLine width="100%" height="16px" marginBottom="36px" />
            <SkeletonRect height="300px" borderRadius="12px" marginBottom="40px" />
            <SkeletonLine width="200px" height="24px" marginBottom="20px" />
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <SkeletonCircle size="24px" />
                <SkeletonLine width="80%" height="16px" />
              </div>
            ))}
          </div>
          <div>
            <SkeletonRect height="450px" borderRadius="16px" />
          </div>
        </div>
      </div>
    );
  }

  // Fallback (About, Contact, Consultation, Legal pages)
  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero" style={{ marginBottom: 60 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SkeletonLine width="120px" height="20px" marginBottom="16px" borderRadius="100px" dark={true} />
          <SkeletonLine width="380px" height="44px" marginBottom="16px" dark={true} />
          <SkeletonLine width="500px" height="16px" dark={true} />
        </div>
      </section>
      {/* Body Content */}
      <div className="container" style={{ maxWidth: 700, paddingBottom: 80 }}>
        <SkeletonLine width="100%" height="16px" marginBottom="12px" />
        <SkeletonLine width="95%" height="16px" marginBottom="12px" />
        <SkeletonLine width="100%" height="16px" marginBottom="12px" />
        <SkeletonLine width="90%" height="16px" marginBottom="32px" />
        <SkeletonRect height="280px" borderRadius="12px" marginBottom="32px" />
        <SkeletonLine width="98%" height="16px" marginBottom="12px" />
        <SkeletonLine width="80%" height="16px" />
      </div>
    </div>
  );
};
