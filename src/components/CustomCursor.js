'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);   // The small dot
  const followerRef = useRef(null); // The big circle

  useEffect(() => {
    // 1. Initial Position Setup to prevent jumping
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      // Dot moves instantly
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      // Follower has a fun, bouncy lag
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    const onHover = () => {
      // Expand and turn Pink
      gsap.to(followerRef.current, { scale: 3, backgroundColor: '#ff6b6b', opacity: 0.3, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.3 }); // Hide dot
    };

    const onLeave = () => {
      // Reset
      gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', opacity: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Auto-detect clickable items
    const clickables = document.querySelectorAll('a, button, input, .hover-trigger');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small Dot (Black Ink) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999]"
      />
      {/* Big Ring (Black Outline) */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border-2 border-black rounded-full pointer-events-none z-[9998] transition-colors"
      />
    </>
  );
}