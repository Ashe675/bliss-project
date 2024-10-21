'use client';
// src/app/components/Logo.tsx
import Image from 'next/image';

const Logo = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
