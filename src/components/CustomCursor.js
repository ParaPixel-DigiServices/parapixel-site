'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  // We create an array of 12 refs for the snake tail
  const trailRefs = useRef([]); 

  useEffect(() => {
    // 1. SETUP: Hide default cursor
    document.body.style.cursor = 'none';

    // 2. MOVEMENT LOGIC
    const moveCursor = (e) => {
      // Loop through every "pixel" in the tail
      trailRefs.current.forEach((el, index) => {
        if (!el) return;

        // Calculate delay based on index (0 = fast, 11 = slow)
        const delay = index * 0.02; 

        gsap.to(el, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1 + delay, // The "Snake" effect
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      {/* THE LIQUID FILTER (Hidden SVG) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* THE CURSOR CONTAINER */}
      <div className="cursor-wrapper">
        {/* Render 12 trailing pixels */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="cursor-trail"
            style={{
              width: `${25 - i * 1.5}px`, // Gets smaller towards the tail
              height: `${25 - i * 1.5}px`,
              opacity: 1 - i * 0.05, // Slight fade at the end
              zIndex: 100 - i, // Head is on top
            }}
          />
        ))}
      </div>
    </>
  );
}