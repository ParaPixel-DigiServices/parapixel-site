'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,          // Standard smooth scrolling
        duration: 1.2,      // How long the glide lasts
        smoothWheel: true,
        wheelMultiplier: 1, // Standard scroll speed
        syncTouch: true,    // Better mobile experience
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}