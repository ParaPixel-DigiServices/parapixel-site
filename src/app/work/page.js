'use client';
import { useRef, useState, useEffect } from 'react';
import Scene from "@/components/canvas/Scene"; // Using your existing scene
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { id: "01", name: "NEON FLUX", client: "NIKE LABS", type: "WEBGL EXP", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" },
  { id: "02", name: "VOID MARKET", client: "BINANCE", type: "WEB3 DASHBOARD", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" },
  { id: "03", name: "CYBER DUST", client: "TESLA", type: "MOBILE APP", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200" },
  { id: "04", name: "HYPER LOOP", client: "STRIPE", type: "FINTECH SAAS", img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1200" },
  { id: "05", name: "SYNTH WAVE", client: "SPOTIFY", type: "CAMPAIGN", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200" },
];

export default function Work() {
  const container = useRef();
  const sliderRef = useRef();
  const cursorRef = useRef();

  // Mouse Follower
  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  // Horizontal Scroll Logic
  useGSAP(() => {
    let panels = gsap.utils.toArray(".project-panel");
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sliderRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + sliderRef.current.offsetWidth
      }
    });

    // Velocity Skew on Scroll
    ScrollTrigger.create({
        trigger: sliderRef.current,
        onUpdate: (self) => {
            const skew = self.getVelocity() / 500;
            gsap.to(panels, { skewX: skew, duration: 0.1 });
        }
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-black text-white min-h-screen overflow-x-hidden cursor-none">
      
      {/* GLOBAL CURSOR */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-[#ccff00] rounded-full z-[9999] pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>

      {/* NAV (Simple Version for internal pages) */}
      <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
         <Link href="/" className="font-funky text-3xl hover:scale-110 transition-transform">ParaPixel</Link>
         <Link href="/" className="font-mono text-sm border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition-colors">BACK HOME</Link>
      </header>

      {/* TITLE SECTION */}
      <section className="h-[50vh] flex items-end pb-10 px-4 md:px-20 border-b border-[#333]">
         <div>
            <span className="font-mono text-[#ccff00]">/// OUR ARCHIVE</span>
            <h1 className="text-[12vw] font-black leading-[0.85] mt-4">THINGS<br/>WE <span className="text-stroke-white text-transparent">COOKED</span></h1>
         </div>
      </section>

      {/* HORIZONTAL SCROLL GALLERY */}
      <section ref={sliderRef} className="h-screen w-[500%] flex flex-nowrap overflow-hidden">
        
        {projects.map((project, i) => (
            <div key={i} className="project-panel w-screen h-screen flex items-center justify-center relative border-r border-[#222] bg-[#050505]">
                
                {/* Background Noise for Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_texture.png')]"></div>

                <div className="relative w-[80vw] h-[60vh] md:w-[50vw] md:h-[70vh] group">
                    
                    {/* The Image */}
                    <div className="w-full h-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-expo">
                        <img src={project.img} alt={project.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[#ccff00] mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>

                    {/* The Floating Info */}
                    <div className="absolute -bottom-10 -left-4 md:-left-12 z-20 mix-blend-difference">
                        <h2 className="text-[8vw] font-black leading-none text-white">{project.name}</h2>
                        <div className="flex gap-4 mt-2 font-mono text-sm md:text-xl text-[#ccff00]">
                            <span>{project.id} ///</span>
                            <span>{project.client}</span>
                            <span className="border border-[#ccff00] px-2 rounded-full">{project.type}</span>
                        </div>
                    </div>

                    {/* Hover Reveal Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none z-30">
                        <span className="text-black font-black">VIEW</span>
                    </div>

                </div>
            </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section className="h-[50vh] flex flex-col items-center justify-center border-t-8 border-[#ccff00] bg-[#ccff00] text-black">
         <h2 className="text-[10vw] font-black">NEXT PROJECT?</h2>
         <p className="font-mono text-xl">YOURS.</p>
      </section>

    </main>
  );
}