'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05,         // The "Weight" (0.1 is standard, 0.05 is heavy/cinematic)
        duration: 1.5,      // How long the glide lasts
        smoothWheel: true,
        wheelMultiplier: 1.2, // Speed up the scroll slightly
      }}
    >
      {children}
    </ReactLenis>
  );
}