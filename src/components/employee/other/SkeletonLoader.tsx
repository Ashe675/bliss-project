// components/SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader = ({ width, height }: { width: string, height: string }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-300 opacity-25 rounded`} 
      style={{ width, height }}>
    </div>
  );
};

export default SkeletonLoader;
