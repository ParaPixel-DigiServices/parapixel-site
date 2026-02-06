'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);   
  const followerRef = useRef(null); 
  const [cursorText, setCursorText] = useState(""); 

  useEffect(() => {
    // Safety check: If elements don't exist (unlikely but good practice), stop.
    if (!cursorRef.current || !followerRef.current) return;

    // 1. Initial Position (Hide until mouse moves)
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, scale: 0 });

    // 2. Movement Logic
    const moveCursor = (e) => {
      // Reveal on first move
      gsap.to([cursorRef.current, followerRef.current], { scale: 1, duration: 0.2, overwrite: 'auto' });
      
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' });
    };

    // 3. Hover Logic (Event Delegation - Works on EVERYTHING)
    const onMouseOver = (e) => {
        const target = e.target;

        // Check for "hover-trigger" (Links, Buttons)
        if (target.closest('.hover-trigger') || target.tagName === 'A' || target.tagName === 'BUTTON') {
            gsap.to(followerRef.current, { 
                scale: 3, 
                backgroundColor: '#ff6b6b', 
                opacity: 0.5, 
                mixBlendMode: 'difference',
                duration: 0.3 
            });
            gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        }
        
        // Check for "project-hover" (Work Cards)
        else if (target.closest('.project-hover')) {
            setCursorText("VIEW");
            gsap.to(followerRef.current, { 
                scale: 4, // Bigger for text
                backgroundColor: '#ccff00', 
                opacity: 1,
                mixBlendMode: 'normal', // Solid color for text readability
                duration: 0.3 
            });
            gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        }
    };

    const onMouseOut = (e) => {
        const target = e.target;
        
        // Reset if leaving a trigger
        if (target.closest('.hover-trigger') || target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.project-hover')) {
            gsap.to(followerRef.current, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                opacity: 1, 
                mixBlendMode: 'normal',
                duration: 0.3 
            });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
            setCursorText(""); 
        }
    };

    // Attach to Window (Catches all hover events everywhere)
    // Only run on non-touch devices ideally, but 'hidden' class handles visuals
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* DOT - Hidden on Mobile (hidden), Visible on Desktop (md:block) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#ccff00] rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block" 
      />
      
      {/* FOLLOWER - Hidden on Mobile (hidden), Visible on Desktop (md:block) */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#ccff00] rounded-full pointer-events-none z-[99998] flex items-center justify-center overflow-hidden mix-blend-difference hidden md:block"
      >
        <span className="text-[10px] font-black text-black">{cursorText}</span>
      </div>
    </>
  );
}