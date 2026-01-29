'use client';
import { useRef, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const phases = [
  { id: "01", title: "THE LAB", subtitle: "DISCOVERY & STRATEGY", color: "bg-black text-[#ccff00]", desc: "We break down your idea into raw atoms. We research, we stalk your competitors, we drink too much coffee. We find the 'Why'." },
  { id: "02", title: "THE BLUEPRINT", subtitle: "UI/UX & PROTOTYPING", color: "bg-[#ccff00] text-black", desc: "We architect the chaos. Wireframes, user flows, visual identity. No pixel is left unsupervised. This is where it starts to look sexy." },
  { id: "03", title: "THE FORGE", subtitle: "DEVELOPMENT & WEBGL", color: "bg-[#111] text-white", desc: "The heavy lifting. React, Next.js, Three.js. We write clean code that does dirty things to the browser. Performance is our religion." },
  { id: "04", title: "THE LAUNCH", subtitle: "QA & DEPLOYMENT", color: "bg-white text-black", desc: "Systems check. SEO check. Analytics check. We push the big red button and watch the internet break. Champagne time." },
];

export default function Process() {
  const container = useRef();

  // Reveal Animations on Scroll
  useGSAP(() => {
    const sections = gsap.utils.toArray('.phase-section');
    sections.forEach((section) => {
        gsap.from(section.querySelector('.phase-content'), {
            y: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });
    });
  }, { scope: container });

  return (
    <main ref={container} className="bg-black min-h-screen">
      
      {/* NAV */}
      <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
         <Link href="/" className="font-funky text-3xl hover:scale-110 transition-transform">ParaPixel</Link>
         <Link href="/" className="font-mono text-sm border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition-colors">BACK HOME</Link>
      </header>

      {/* INTRO */}
      <section className="h-screen flex flex-col justify-center px-4 md:px-20 border-b-2 border-[#ccff00]">
        <h1 className="text-[15vw] font-black text-white leading-none">HOW WE<br/><span className="text-[#ccff00]">COOK</span></h1>
        <div className="flex justify-between items-end mt-8">
            <p className="text-white font-mono max-w-md text-xl">The secret sauce isn't a secret. It's a rigorous, chaotic, beautiful process of elimination.</p>
            <div className="animate-spin text-6xl">✺</div>
        </div>
      </section>

      {/* THE PHASES (STICKY STACK) */}
      <div className="relative">
          {phases.map((phase, i) => (
              <section key={i} className={`phase-section sticky top-0 h-screen w-full flex flex-col justify-center px-4 md:px-20 border-t-2 border-black ${phase.color}`}>
                  
                  {/* Background Detail */}
                  <div className="absolute top-10 right-10 font-black text-[20vw] opacity-10 pointer-events-none leading-none select-none">
                      {phase.id}
                  </div>

                  <div className="phase-content relative z-10 max-w-4xl">
                      <span className="font-mono text-xl border border-current px-4 py-1 rounded-full mb-6 inline-block">{phase.subtitle}</span>
                      <h2 className="text-[8vw] font-black leading-none mb-8">{phase.title}</h2>
                      <p className="text-2xl md:text-4xl font-bold leading-tight">{phase.desc}</p>
                      
                      {/* Decorative Elements */}
                      <div className="mt-12 w-full h-1 bg-current relative overflow-hidden">
                          <div className="absolute inset-0 bg-current w-1/2 animate-slide"></div>
                      </div>
                  </div>

              </section>
          ))}
      </div>

      {/* FOOTER */}
      <section className="h-[50vh] bg-black text-[#ccff00] flex flex-col items-center justify-center">
         <h2 className="text-[10vw] font-black">READY?</h2>
         <Link href="/contact" className="text-4xl border-b-4 border-[#ccff00] hover:text-white hover:border-white transition-colors">START THE FIRE</Link>
      </section>

    </main>
  );
}