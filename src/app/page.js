'use client';
import { useRef, useState, useEffect } from 'react';
import SceneContainer from "@/components/canvas/SceneContainer"; // Uses your dynamic loader
import CustomCursor from "@/components/CustomCursor";
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONFIG ---
const CONTACT_EMAIL = "hello@parapixel.in.net";

// --- DATA ---
const menuItems = [
  { label: "SERVICES", img: "/services.png", href: "#services" },
  { label: "WORK", img: "/works.png", href: "#work" },
  { label: "PROCESS", img: "/process.png", href: "#process" },
  { label: "CONTACT", img: "/contact.png", href: "#contact" }
];

const services = [
  { id: "01", title: "WEB DESIGN", desc: "IMMERSIVE 3D", tags: "WEBGL /// THREE.JS /// REACT ///", img: "/webdev.png", color: "text-[#ccff00]", rotate: "md:rotate-2" },
  { id: "02", title: "MOBILE APPS", desc: "NATIVE SYSTEMS", tags: "IOS /// ANDROID /// FLUTTER ///", img: "/appdev.png", color: "text-[#ff0055]", rotate: "md:-rotate-1" },
  { id: "03", title: "SEO GROWTH", desc: "DOMINANCE", tags: "ANALYTICS /// ADS /// RANKING ///", img: "/seo.png", color: "text-[#00ffff]", rotate: "md:rotate-3" },
  { id: "04", title: "SAAS BUILD", desc: "CLOUD SYSTEMS", tags: "AWS /// DOCKER /// NEXT.JS ///", img: "/saas.png", color: "text-[#ffffff]", rotate: "md:-rotate-2" },
  { id: "05", title: "MARKETING", desc: "VISUAL VIOLENCE", tags: "STRATEGY /// VIRAL /// CONTENT ///", img: "/marketing.png", color: "text-[#ffaa00]", rotate: "md:rotate-1" }
];

const projects = [
  { id: "01", name: "TOURVISTO", client: "INHOUSE", type: "ADMIN DASHBOARD", img: "/admindb.png", url: "#" },
  { id: "02", name: "CONVERSO", client: "ALLEN", type: "SAAS", img: "/converso.png", url: "#" },
  { id: "03", name: "NIMBUS", client: "MOCKUP", type: "ECOMMERCE", img: "/nimbus.png", url: "#" },
  { id: "04", name: "ZENTRI", client: "CLONE", type: "GAMING", img: "/zentri.png", url: "#" },
  { id: "05", name: "VELVET POUR", client: "MOCKUP", type: "GSAP", img: "/velvet.png", url: "#" }
];

const phases = [
  { id: "01", title: "ESTIMATION", desc: "We audit your requirements, defining timeline, resources, and budget. No surprises.", color: "bg-[#111] text-[#ccff00]" },
  { id: "02", title: "BLUEPRINT", desc: "Complete wireframing and architecture. We get your approval on the skeleton before adding the muscle.", color: "bg-[#ccff00] text-black" },
  { id: "03", title: "DEVELOPMENT", desc: "Phase-wise coding sprints. You see progress every week. Continuous integration, rigorous testing.", color: "bg-[#ff0055] text-white" },
  { id: "04", title: "DEPLOYMENT", desc: "Final QA, SEO audit, and launch. We ensure 99.9% uptime and hand over the keys.", color: "bg-white text-black" },
];

const stickers = [
    { text: "★ AWWWARDS", color: "bg-[#00ffff]", rot: "-rotate-12", top: "15%", left: "5%" },
    { text: "100% FRESH", color: "bg-[#ccff00]", rot: "rotate-6", top: "18%", right: "5%" },
    { text: "NO TEMPLATES", color: "bg-white", rot: "rotate-12", bottom: "35%", left: "8%" },
    { text: "COOKED", color: "bg-[#ff0055]", rot: "-rotate-6", bottom: "32%", right: "8%" },
    { text: "PURE CHAOS", color: "bg-[#ffaa00]", rot: "rotate-3", bottom: "18%", left: "50%", transform: "translateX(-50%)" },
];

export default function Home() {
  const container = useRef();
  
  // Refs
  const menuRef = useRef();
  const menuBgRef = useRef();   
  const menuCursorRef = useRef(); 
  const menuImageRef = useRef();  
  const menuTextRef = useRef();   
  
  const stuffTextRef = useRef();
  const lastStuffHover = useRef(0);
  
  // Scroll Refs
  const workRef = useRef();
  const workSliderRef = useRef();
  const processRef = useRef(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuImg, setActiveMenuImg] = useState(null);

  // GSAP QuickTo for Menu Cursor
  const xTo = useRef();
  const yTo = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- SCROLL LOCK FIX ---
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isMenuOpen]);
  
  // --- MOUSE SETUP FOR MENU PREVIEW ---
  useGSAP(() => {
    xTo.current = gsap.quickTo(menuCursorRef.current, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(menuCursorRef.current, "y", { duration: 0.4, ease: "power3" });
    gsap.set(menuCursorRef.current, { xPercent: -50, yPercent: -50 });
  }, { scope: container });

  const handleMouseMove = (e) => {
    // Menu Cursor Logic
    if (isMenuOpen && xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
        if(menuImageRef.current) gsap.to(menuImageRef.current, { rotation: (e.movementX * 0.5), duration: 0.5 });
    }
    // Hero Text Skew Logic
    const heroLine = container.current?.querySelector(".hero-line");
    if (heroLine && !isMenuOpen) {
        gsap.to(heroLine, { skewX: -e.movementX * 0.05, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  const handleStuffHover = () => {
    const now = Date.now();
    if (now - lastStuffHover.current < 500) return;
    lastStuffHover.current = now;

    if(stuffTextRef.current) {
        gsap.fromTo(stuffTextRef.current, 
            { x: -5, y: -5, color: "#ff0055" },
            { x: 5, y: 5, color: "#00ffff", duration: 0.05, repeat: 10, yoyo: true, ease: "rough", onComplete: () => {
                gsap.to(stuffTextRef.current, { x: 0, y: 0, color: "#ff0055", duration: 0.2 });
            }}
        );
    }
  };

  // --- ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // HERO REVEAL
    gsap.set([".nav-item", ".hero-reveal", ".stuff-wrapper", ".caution-strip"], { autoAlpha: 0 });
    tl.to(".nav-item", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1, ease: "power4.out" })
      .fromTo(".hero-reveal", { y: 150, rotateX: 45, autoAlpha: 0 }, { y: 0, rotateX: 0, autoAlpha: 1, stagger: 0.1, duration: 1.2, ease: "power3.out" }, "-=0.8")
      .to(".stuff-wrapper", { scale: 1, autoAlpha: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }, "-=0.5")
      .from(".sticker", { scale: 0, rotation: 180, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
      .to(".caution-strip", { y: 0, autoAlpha: 1, duration: 1, ease: "power4.out" }, "-=0.8");

    // MENU OPEN/CLOSE ANIMATION
    if (isMenuOpen) {
        // 1. Expand Background
        gsap.to(menuBgRef.current, { clipPath: "circle(150% at 100% 0%)", duration: 1, ease: "power4.inOut" });
        // 2. Show Container (Delayed)
        gsap.to(menuTextRef.current, { autoAlpha: 1, duration: 0.1, delay: 0.1 });
        // 3. Slide Up Items
        gsap.fromTo(".menu-link-item", 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.3 }
        );
    } else {
        // Close
        gsap.to(menuBgRef.current, { clipPath: "circle(0% at 100% 0%)", duration: 0.8, ease: "power4.inOut" });
        gsap.to(menuTextRef.current, { autoAlpha: 0, duration: 0.3 });
    }

    // --- GLOBAL FADE UP ---
    ScrollTrigger.refresh();
    gsap.utils.toArray('.fade-up').forEach((elem) => {
        gsap.fromTo(elem, 
            { y: 60, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });

    // --- WORK SECTION (ROBUST HORIZONTAL SCROLL) ---
    // Width Calculation: 1 Intro Panel + N Projects + 1 Outro Panel
    const totalPanels = projects.length + 2; 
    
    gsap.to(workSliderRef.current, {
        xPercent: -100 * (totalPanels - 1), 
        ease: "none",
        scrollTrigger: {
            trigger: workRef.current,
            pin: true,
            scrub: 1,
            // Pin for exactly the width of the content
            end: () => "+=" + workSliderRef.current.offsetWidth, 
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    // --- PROCESS SECTION (PINNED STACK) ---
    const stackCards = gsap.utils.toArray(".process-card");
    const processTl = gsap.timeline({
        scrollTrigger: {
            trigger: processRef.current,
            start: "top top",
            end: "+=3000", // Drag out the scroll distance for effect
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    stackCards.forEach((card, i) => {
        if(i === 0) return; // Skip first card (it's the base)
        processTl.fromTo(card, { yPercent: 100 }, { yPercent: 0, ease: "none" });
    });

    // MARQUEES
    document.querySelectorAll('.marquee-inner').forEach((marquee, i) => {
        gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 10 + i, ease: "linear" });
    });

  }, { scope: container, dependencies: [isMenuOpen] });

  // --- SERVICE CARD HOVER EFFECTS ---
  const handleServiceEnter = (e) => {
    gsap.to(e.currentTarget, { rotation: 0, scale: 1.05, zIndex: 10, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-bg'), { autoAlpha: 0.4, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-marquee'), { height: 'auto', autoAlpha: 1, marginTop: '1.5rem', duration: 0.4 });
  };
  const handleServiceLeave = (e, rot) => {
    let r = 0; if(rot.includes('rotate-2')) r=2; if(rot.includes('-rotate-1')) r=-1; if(rot.includes('rotate-3')) r=3; if(rot.includes('-rotate-2')) r=-2; if(rot.includes('rotate-1')) r=1;
    gsap.to(e.currentTarget, { rotation: r, scale: 1, zIndex: 1, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-bg'), { autoAlpha: 0, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-marquee'), { height: 0, autoAlpha: 0, marginTop: 0, duration: 0.3 });
  };

  return (
    <main ref={container} onMouseMove={handleMouseMove} className="relative w-full bg-transparent text-black overflow-x-hidden selection:bg-[#ccff00] selection:text-black cursor-none">
      
      <CustomCursor />

      {/* 3D SCENE BACKGROUND */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#fdfbf7]">
        <SceneContainer />
      </div>
      <div className="noise-overlay fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"></div>

      {/* --- MENU OVERLAY --- */}
      {/* 1. Yellow Background Layer */}
      <div ref={menuBgRef} className="fixed inset-0 z-[9990] bg-[#ccff00] pointer-events-none" style={{ clipPath: "circle(0% at 100% 0%)" }} />
      
      {/* 2. Menu Content (Links) */}
      <div ref={menuTextRef} className="fixed inset-0 z-[9991] flex flex-col items-center justify-center pointer-events-none opacity-0">
         <div className="flex flex-col gap-2 md:gap-4 text-center w-full pointer-events-auto">
           {menuItems.map((item, i) => (
             <div key={i} className="menu-link-item overflow-hidden relative h-[15vw] md:h-[10vw] flex items-center justify-center w-full">
                <Link href={item.href} onClick={toggleMenu} className="group relative block w-full h-full cursor-pointer" onMouseEnter={() => setActiveMenuImg(item.img)} onMouseLeave={() => setActiveMenuImg(null)}>
                    {/* Primary Text (Black) - Slides Up */}
                    <div className="absolute top-0 left-0 w-full flex justify-center transition-transform duration-500 ease-expo group-hover:-translate-y-full">
                         <h2 className="text-[15vw] md:text-[10vw] font-funky leading-[0.85] tracking-tighter text-black">
                            {item.label}
                        </h2>
                    </div>
                    {/* Secondary Text (White with Stroke) - Slides In */}
                    <div className="absolute top-0 left-0 w-full flex justify-center transition-transform duration-500 ease-expo translate-y-full group-hover:translate-y-0">
                        <h2 className="text-[15vw] md:text-[10vw] font-funky leading-[0.85] tracking-tighter text-white [-webkit-text-stroke:2px_black]">
                            {item.label}
                        </h2>
                    </div>
                </Link>
             </div>
           ))}
         </div>
      </div>
      
      {/* 3. Menu Image Preview Cursor */}
      <div ref={menuCursorRef} className="fixed top-0 left-0 w-[60vw] md:w-[500px] aspect-video pointer-events-none z-[9995] rounded-2xl overflow-hidden border-4 border-black shadow-[20px_20px_0px_black]" style={{ opacity: isMenuOpen && activeMenuImg ? 1 : 0, transition: 'opacity 0.2s ease-out' }}>
        <img ref={menuImageRef} src={activeMenuImg || null} alt="Preview" className="w-full h-full object-cover" />
      </div>

      {/* --- HEADER / NAV --- */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-center z-[9980] mix-blend-difference text-white pointer-events-none">
        
        {/* LOGO */}
        <div className="nav-item flex items-center gap-4 cursor-pointer pointer-events-auto group hover-trigger">
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-500 group-hover:rotate-180">
             <Image src="/logo.svg" alt="Logo" fill className="object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col leading-[0.85]">
            <span className="font-funky text-xl md:text-3xl">Para</span>
            <span className="font-funky text-xl md:text-3xl">Pixel</span>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="nav-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-auto">
            <Link href="#contact" className="px-8 py-3 bg-white text-black rounded-full font-mono font-bold text-lg hover:bg-[#ccff00] hover:scale-110 hover:-rotate-2 transition-all duration-300 shadow-[0px_0px_20px_rgba(255,255,255,0.2)] hover-trigger">
                START PROJECT
            </Link>
        </div>

        {/* BURGER BUTTON */}
        <button onClick={toggleMenu} className="nav-item pointer-events-auto group w-12 h-12 md:w-14 md:h-14 flex flex-col gap-1.5 items-center justify-center bg-white rounded-full hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)] hover-trigger">
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none pb-20">
        <div className="hero-reveal hero-line font-funky text-[15vw] md:text-[12vw] leading-none z-10 mix-blend-overlay opacity-50 text-stroke-black text-transparent md:text-black">WE BUILD</div>
        {stickers.map((s, i) => (
            <div key={i} className={`sticker absolute ${s.rot} ${s.color} px-4 py-2 font-mono font-bold text-black border-2 border-black shadow-[4px_4px_0px_black] z-40 pointer-events-auto hover:scale-110 transition-transform cursor-pointer block hover-trigger`} style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, transform: s.transform }}>{s.text}</div>
        ))}
        <div className="hero-reveal stuff-wrapper relative z-20 mt-2 md:mt-4 cursor-pointer group pointer-events-auto" onMouseEnter={handleStuffHover}>
          <div ref={stuffTextRef} className="stuff-text relative inline-block text-[25vw] md:text-[22vw] leading-[0.8] font-funky tracking-tighter text-[#ff0055] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">STUFF</div>
        </div>
        
        {/* Mobile CTA */}
        <div className="md:hidden absolute bottom-60 z-30 pointer-events-auto hero-reveal">
            <Link href="#contact" className="px-10 py-4 bg-black text-[#ccff00] rounded-full font-black text-xl hover:scale-110 hover:-rotate-2 transition-transform shadow-[5px_5px_0px_#ccff00] hover-trigger">START PROJECT</Link>
        </div>

        <div className="caution-strip absolute bottom-24 w-full bg-[#ccff00] border-y-4 border-black py-3 md:py-4 rotate-[-2deg] scale-110 z-30 overflow-hidden shadow-2xl pointer-events-auto">
          <div className="flex whitespace-nowrap animate-marquee">{[...Array(10)].map((_, i) => (<span key={i} className="text-xl md:text-3xl font-black mx-4 tracking-widest text-black font-mono">/// CREATIVITY OVERLOAD ///</span>))}</div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="relative w-full bg-black z-20 py-20 md:py-40 overflow-hidden rounded-t-[3rem] border-t-4 border-[#ccff00]">
        <div className="text-center mb-20 md:mb-32 px-4 fade-up"><h2 className="font-funky text-[15vw] md:text-[12vw] leading-none"><span className="text-[#ccff00]">THE</span><br className="md:hidden" /><span className="text-transparent [-webkit-text-stroke:1px_#ccff00] md:[-webkit-text-stroke:2px_#ccff00] ml-0 md:ml-4">MENU</span></h2></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10">
            {services.map((service, i) => (
                <div key={i} className="fade-up">
                    <Link href="#contact" className={`group relative w-full border-4 border-white/20 bg-[#111] p-8 md:p-12 cursor-pointer transition-all duration-500 ease-out transform ${service.rotate} hover:rotate-0 hover:z-20 hover:border-white block hover-trigger`} onMouseEnter={handleServiceEnter} onMouseLeave={(e) => handleServiceLeave(e, service.rotate)}>
                        <div className="service-bg absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0"><img src={service.img} className="w-full h-full object-cover grayscale opacity-30" alt="BG" /></div>
                        <div className="relative z-10 w-full flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
                                <div className="flex items-center gap-4 md:gap-16 w-full md:w-auto relative"><span className={`font-mono text-lg md:text-xl opacity-50 ${service.color}`}>0{i+1}</span><h2 className={`text-[10vw] md:text-[6vw] font-funky leading-none text-white`}>{service.title}</h2></div>
                                <div className="flex w-full md:w-auto justify-between md:flex-col items-end"><span className="font-funky text-xl md:text-3xl text-white">{service.desc}</span><span className="text-3xl md:text-4xl text-white group-hover:translate-x-4 transition-transform mt-2">→</span></div>
                            </div>
                            <div className="service-marquee h-0 overflow-hidden opacity-0 relative"><div className="pt-4 md:pt-8 w-full border-t border-white/10 mt-4"><div className="marquee-inner flex whitespace-nowrap w-fit"><span className={`text-2xl md:text-4xl font-mono font-bold mx-4 ${service.color}`}>{service.tags} {service.tags} {service.tags}</span><span className={`text-2xl md:text-4xl font-mono font-bold mx-4 ${service.color}`}>{service.tags} {service.tags} {service.tags}</span></div></div></div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        <div className="text-center mt-20 fade-up">
            <Link href="#contact" className="inline-block border-b-2 border-[#ccff00] text-[#ccff00] font-mono text-xl hover:text-white hover:border-white transition-colors hover-trigger">GET A CUSTOM QUOTE →</Link>
        </div>
      </section>

      {/* --- WORK SECTION (ROBUST HORIZONTAL) --- */}
      <section id="work" ref={workRef} className="relative z-30 bg-[#050505] overflow-hidden h-screen">
         {/* Container Width = 100vw * Number of Panels */}
         <div ref={workSliderRef} className="flex flex-nowrap h-full" style={{ width: `${(projects.length + 2) * 100}vw` }}>
            {/* 1. Intro Panel */}
            <div className="work-panel w-[100vw] h-screen flex flex-col justify-center items-center border-r border-[#222] bg-black shrink-0">
                <h2 className="text-[15vw] font-funky text-white leading-none fade-up">THE<br/><span className="text-stroke-white text-transparent">WORK</span></h2>
                <div className="animate-bounce text-6xl mt-10 text-white fade-up">→</div>
            </div>
            {/* 2. Project Panels */}
            {projects.map((project, i) => (
                <div key={i} className="work-panel w-[100vw] h-screen flex flex-col justify-center items-center border-r border-[#222] relative bg-[#0a0a0a] shrink-0">
                    <Link href={project.url} target="_blank" className="relative w-[90vw] md:w-[60vw] h-[40vh] md:h-[60vh] overflow-hidden cursor-none group bg-[#111] flex items-center justify-center project-hover fade-up">
                        <img src={project.img} alt={project.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 ease-expo" />
                        <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 font-mono text-sm md:text-xl border border-white/20">{project.type}</div>
                    </Link>
                    <div className="mt-8 text-center z-20 fade-up">
                        <h2 className="text-[10vw] md:text-[8vw] font-funky leading-none text-white mix-blend-difference">{project.name}</h2>
                        <p className="font-mono text-[#ccff00] text-xl">{project.client}</p>
                    </div>
                </div>
            ))}
            {/* 3. Outro Panel */}
            <div className="work-panel w-[100vw] h-screen flex flex-col justify-center items-center border-r border-[#222] bg-[#ccff00] shrink-0">
                <h2 className="text-[10vw] font-black leading-none text-black mb-10 text-center fade-up">WANT<br/>MORE?</h2>
                <Link href="#contact" className="px-10 py-5 bg-black text-white rounded-full font-mono text-xl hover:scale-110 transition-transform hover-trigger fade-up">CONTACT US</Link>
            </div>
         </div>
      </section>

      {/* --- PROCESS SECTION (PINNED) --- */}
      <section id="process" ref={processRef} className="relative z-40 bg-black h-screen overflow-hidden">
         <div className="w-full h-full relative">
            <div className="process-card absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black z-0">
                 <h2 className="text-[10vw] font-funky text-white fade-up">THE <span className="text-[#ccff00]">COOK</span></h2>
                 <p className="text-white font-mono mt-4 fade-up">SCROLL TO UNLOCK</p>
                 <div className="mt-10 animate-bounce fade-up">
                    <span className="text-[#ccff00] text-2xl">↓</span>
                 </div>
            </div>
            {phases.map((phase, i) => (
                <div key={i} className={`process-card absolute inset-0 w-full h-full flex flex-col justify-center px-4 md:px-20 border-t-2 border-black ${phase.color}`} style={{ zIndex: i + 1 }}>
                    <div className="max-w-6xl relative z-10 px-8">
                        <span className="font-mono text-xl border border-current px-4 py-1 rounded-full mb-6 inline-block">PHASE 0{i+1}: {phase.title}</span>
                        <p className="text-2xl md:text-5xl font-bold leading-tight max-w-4xl mt-6">{phase.desc}</p>
                        {i === phases.length - 1 && (
                            <Link href="#contact" className="inline-block mt-10 px-8 py-4 bg-black text-white font-mono text-lg rounded-full hover:scale-105 transition-transform hover-trigger">BUILD WITH US</Link>
                        )}
                    </div>
                    <div className="absolute bottom-10 right-10 text-[20vw] font-funky opacity-10 leading-none pointer-events-none select-none">0{i+1}</div>
                </div>
            ))}
         </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="relative z-50 bg-[#ccff00] text-black py-40 px-4 md:px-20 min-h-screen flex flex-col justify-center">
         <h2 className="text-[12vw] font-funky leading-none mb-10 fade-up">HOLLER<br/>AT US</h2>
         <div className="w-full max-w-5xl flex flex-col gap-10">
             <div className="font-mono text-2xl mb-10 fade-up">
                DROP A MAIL AT: <br/>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-4xl md:text-6xl font-black underline hover:text-white transition-colors hover-trigger break-all">{CONTACT_EMAIL}</a>
             </div>
             <div className="flex flex-col md:flex-row gap-6 fade-up">
                 <a href={`mailto:${CONTACT_EMAIL}`} className="px-12 py-6 bg-black text-[#ccff00] text-2xl font-black rounded-full hover:scale-105 hover:-rotate-2 transition-transform shadow-[10px_10px_0px_white] text-center hover-trigger">START PROJECT</a>
                 <a href="https://calendly.com" target="_blank" className="px-12 py-6 border-4 border-black text-black text-2xl font-black rounded-full hover:bg-black hover:text-white transition-colors text-center hover-trigger">SCHEDULE CALL</a>
             </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-50 bg-black text-white py-20 text-center border-t-8 border-white overflow-hidden">
          <h2 className="text-[10vw] font-funky leading-none mb-8 text-[#ccff00] mix-blend-difference fade-up">PARAPIXEL</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 font-mono text-xl text-white fade-up">
              <a href="#" className="hover:text-[#ccff00] hover:underline hover-trigger">INSTAGRAM</a>
              <a href="https://linkedin.com/company/parapixel" target="_blank" className="hover:text-[#ccff00] hover:underline hover-trigger">LINKEDIN</a>
              <a href="#" className="hover:text-[#ccff00] hover:underline hover-trigger">TWITTER</a>
          </div>
          <p className="mt-12 text-white/30 font-mono text-sm fade-up">© 2026 PARAPIXEL.</p>
      </footer>

    </main>
  );
}