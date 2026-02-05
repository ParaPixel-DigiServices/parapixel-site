'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);   
  const followerRef = useRef(null); 
  const [cursorText, setCursorText] = useState(""); // State for text

  useEffect(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    // Standard Hover
    const onHover = () => {
      gsap.to(followerRef.current, { scale: 3, backgroundColor: '#ff6b6b', opacity: 0.3, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', opacity: 1, duration: 0.3, width: 40, height: 40, borderRadius: '50%' });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      setCursorText(""); // Reset text
    };

    // Project "VIEW" Hover
    const onProjectHover = () => {
        setCursorText("VIEW");
        gsap.to(followerRef.current, { scale: 3, backgroundColor: '#ccff00', opacity: 1, duration: 0.3, mixBlendMode: 'difference' });
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Standard clickables
    const clickables = document.querySelectorAll('a, button, input, .hover-trigger');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    // Project Cards (Add class 'project-hover' to your project images)
    const projects = document.querySelectorAll('.project-hover');
    projects.forEach((el) => {
        el.addEventListener('mouseenter', onProjectHover);
        el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
      projects.forEach((el) => {
        el.removeEventListener('mouseenter', onProjectHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999]" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border-2 border-black rounded-full pointer-events-none z-[9998] transition-colors flex items-center justify-center overflow-hidden">
        {/* Dynamic Text inside Cursor */}
        <span className="text-[3px] font-black text-black">{cursorText}</span>
      </div>
    </>
  );
}