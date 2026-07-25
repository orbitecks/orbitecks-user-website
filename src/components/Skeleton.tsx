export const SkeletonLine = ({ 
  width = '100%', 
  height = '16px', 
  marginBottom = '12px', 
  borderRadius = '4px',
  dark = false
}: { 
  width?: string; 
  height?: string; 
  marginBottom?: string; 
  borderRadius?: string; 
  dark?: boolean;
}) => (
  <div 
    className={dark ? "skeleton-dark-shimmer" : "skeleton-shimmer"} 
    style={{ 
      width, 
      height, 
      marginBottom, 
      borderRadius,
      display: 'block' 
    }} 
  />
);

export const SkeletonRect = ({ 
  width = '100%', 
  height = '200px', 
  marginBottom = '16px', 
  borderRadius = '8px',
  dark = false
}: { 
  width?: string; 
  height?: string; 
  marginBottom?: string; 
  borderRadius?: string; 
  dark?: boolean;
}) => (
  <div 
    className={dark ? "skeleton-dark-shimmer" : "skeleton-shimmer"} 
    style={{ 
      width, 
      height, 
      marginBottom, 
      borderRadius,
      display: 'block' 
    }} 
  />
);

export const SkeletonCircle = ({ 
  size = '48px', 
  marginBottom = '16px',
  dark = false
}: { 
  size?: string; 
  marginBottom?: string; 
  dark?: boolean;
}) => (
  <div 
    className={dark ? "skeleton-dark-shimmer" : "skeleton-shimmer"} 
    style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      marginBottom,
      display: 'block' 
    }} 
  />
);
