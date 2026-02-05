'use client';
import { useRef, useState, useEffect } from 'react';
import Scene from "@/components/canvas/Scene";
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



// =====================================================================
// 2. DATA (REPLACE 'publicIds' WITH YOUR IMAGE NAMES)
// =====================================================================

const menuItems = [
  { label: "SERVICES", img: "/services.png", href: "#services" },
  { label: "WORK", img: "/works.png", href: "#work" },
  { label: "PROCESS", img: "/process.png", href: "#process" },
  { label: "CONTACT", img: "/contact.png", href: "#contact" }
];

const services = [
  { id: "01", title: "WEB DESIGN & DEV", desc: "IMMERSIVE 3D", tags: "WEBGL /// THREE.JS /// REACT /// NEXT.JS ///", img: "/webdev.png", color: "text-[#ccff00]", rotate: "md:rotate-2" },
  { id: "02", title: "MOBILE APPS", desc: "NATIVE SYSTEMS", tags: "IOS /// ANDROID /// FLUTTER /// REACT NATIVE ///", img: "/appdev.png", color: "text-[#ff0055]", rotate: "md:-rotate-1" },
  { id: "03", title: "SEO GROWTH", desc: "DOMINANCE", tags: "ANALYTICS /// ADS /// RANKING /// STRATEGY ///", img: "/seo.png", color: "text-[#00ffff]", rotate: "md:rotate-3" },
  { id: "04", title: "SAAS BUILD", desc: "CLOUD SYSTEMS", tags: "AWS /// DOCKER /// NEXT.JS /// SUPABASE ///", img: "/saas.png", color: "text-[#ffffff]", rotate: "md:-rotate-2" },
  { id: "05", title: "MARKETING", desc: "VISUAL VIOLENCE", tags: "STRATEGY /// VIRAL /// CONTENT /// CAMPAIGNS ///", img: "/marketing.png", color: "text-[#ffaa00]", rotate: "md:rotate-1" }
];

const projects = [
  { id: "01", name: "TOURVISTO", client: "INHOUSE", type: "ADMIN DASHBOARD", img: "/admindb.png" },
  { id: "02", name: "CONVERSO", client: "ALLEN", type: "SAAS", img: "/converso.png" },
  { id: "03", name: "NIMBUS", client: "MOCKUP", type: "ECOMMERCE", img: "/nimbus.png" },
  { id: "04", name: "ZENTRI", client: "CLONE", type: "GAMING", img: "/zentri.png" },
  { id: "05", name: "VELVET POUR", client: "MOCKUP", type: "GSAP", img: "/velvet.png" }
];

const phases = [
  { id: "01", title: "DISCOVERY", desc: "We rip the idea apart to find the soul.", color: "bg-[#111] text-[#ccff00]" },
  { id: "02", title: "BLUEPRINT", desc: "We architect the chaos into a plan.", color: "bg-[#ccff00] text-black" },
  { id: "03", title: "THE FORGE", desc: "We build the monster. Clean code.", color: "bg-[#ff0055] text-white" },
  { id: "04", title: "LAUNCH", desc: "We break the internet. Champagne time.", color: "bg-white text-black" },
];

// --- STICKER PLACEMENT (SAFE ZONES) ---
const stickers = [
    // Top Left (Safe)
    { text: "★ AWWWARDS", color: "bg-[#00ffff]", rot: "-rotate-12", top: "15%", left: "5%" },
    // Top Right (Safe)
    { text: "100% FRESH", color: "bg-[#ccff00]", rot: "rotate-6", top: "18%", right: "5%" },
    // Mid Left (Above Bottom)
    { text: "NO TEMPLATES", color: "bg-white", rot: "rotate-12", bottom: "35%", left: "8%" },
    // Mid Right (Above Bottom)
    { text: "COOKED", color: "bg-[#ff0055]", rot: "-rotate-6", bottom: "32%", right: "8%" },
    // Bottom Center (Below Text, Above Marquee)
    { text: "PURE CHAOS", color: "bg-[#ffaa00]", rot: "rotate-3", bottom: "18%", left: "50%", transform: "translateX(-50%)" },
];

export default function Home() {
  const container = useRef();
  
  // Refs
  const menuRef = useRef();
  const menuBgRef = useRef();   // Layer 1
  const menuCursorRef = useRef(); // Layer 3 (Image - ON TOP)
  const menuImageRef = useRef();  
  const menuTextRef = useRef();   // Layer 2 (Text - BELOW IMAGE)
  
  const cursorRef = useRef();
  const stuffTextRef = useRef();
  
  // Scroll Refs
  const workRef = useRef();
  const workSliderRef = useRef();
  const processRef = useRef(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuImg, setActiveMenuImg] = useState(null);

  // GSAP QuickTo
  const xTo = useRef();
  const yTo = useRef();
  const cursorX = useRef();
  const cursorY = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // --- MOUSE SETUP ---
  useGSAP(() => {
    // Menu Image Follower
    xTo.current = gsap.quickTo(menuCursorRef.current, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(menuCursorRef.current, "y", { duration: 0.4, ease: "power3" });
    
    // Global Cursor
    cursorX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    cursorY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    
    // Center Menu Preview Origin
    gsap.set(menuCursorRef.current, { xPercent: -50, yPercent: -50 });
  }, { scope: container });

  const handleMouseMove = (e) => {
    if(cursorX.current) cursorX.current(e.clientX);
    if(cursorY.current) cursorY.current(e.clientY);
    
    if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
        // Tilt internal image
        if(menuImageRef.current) gsap.to(menuImageRef.current, { rotation: (e.movementX * 0.5), duration: 0.5 });
    }

    const heroLine = container.current?.querySelector(".hero-line");
    if (heroLine && !isMenuOpen) {
        gsap.to(heroLine, { skewX: -e.movementX * 0.05, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  const cursorGrow = () => gsap.to(cursorRef.current, { scale: 3, backgroundColor: 'white', mixBlendMode: 'difference' });
  const cursorShrink = () => gsap.to(cursorRef.current, { scale: 1, backgroundColor: '#ccff00', mixBlendMode: 'normal' });

  // --- STUFF TEXT HOVER ---
  const handleStuffHover = () => {
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
    
    // 1. HERO ENTRANCE
    gsap.set([".nav-item", ".hero-reveal", ".stuff-wrapper", ".caution-strip"], { autoAlpha: 0 });
    tl.to(".nav-item", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1, ease: "power4.out" })
      .fromTo(".hero-reveal", { y: 150, rotateX: 45, autoAlpha: 0 }, { y: 0, rotateX: 0, autoAlpha: 1, stagger: 0.1, duration: 1.2, ease: "power3.out" }, "-=0.8")
      .to(".stuff-wrapper", { scale: 1, autoAlpha: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }, "-=0.5")
      .from(".sticker", { scale: 0, rotation: 180, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
      .to(".caution-strip", { y: 0, autoAlpha: 1, duration: 1, ease: "power4.out" }, "-=0.8");

    // 2. MENU LOGIC (Z-Index fix: Image > Text)
    if (isMenuOpen) {
        // Background
        gsap.to(menuBgRef.current, { clipPath: "circle(150% at 100% 0%)", duration: 1, ease: "power4.inOut" });
        // Text
        gsap.to(menuTextRef.current, { autoAlpha: 1, duration: 0.1 });
        gsap.fromTo(".menu-item-text", { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 });
    } else {
        // Close
        gsap.to(menuBgRef.current, { clipPath: "circle(0% at 100% 0%)", duration: 0.8, ease: "power4.inOut" });
        gsap.to(menuTextRef.current, { autoAlpha: 0, duration: 0.3 });
    }

    // 3. WORK SECTION (Horizontal Scroll)
    let workPanels = gsap.utils.toArray(".work-panel");
    gsap.to(workPanels, {
        xPercent: -100 * (workPanels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: workRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (workRef.current.offsetWidth * (workPanels.length - 1)), 
        }
    });

    // 4. PROCESS SECTION (PINNED STACK)
    const processTl = gsap.timeline({
        scrollTrigger: {
            trigger: processRef.current,
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: true,
            anticipatePin: 1
        }
    });

    const stackCards = gsap.utils.toArray(".process-card");
    stackCards.forEach((card, i) => {
        if(i === 0) return;
        processTl.fromTo(card, { yPercent: 100 }, { yPercent: 0, ease: "none" });
    });

    // 5. MARQUEES
    document.querySelectorAll('.marquee-inner').forEach((marquee, i) => {
        gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 10 + i, ease: "linear" });
    });

  }, { scope: container, dependencies: [isMenuOpen] });

  // --- SERVICE HOVER ---
  const handleServiceEnter = (e) => {
    gsap.to(e.currentTarget, { rotation: 0, scale: 1.05, zIndex: 10, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-bg'), { autoAlpha: 0.4, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-marquee'), { height: 'auto', autoAlpha: 1, marginTop: '1.5rem', duration: 0.4 });
    cursorGrow();
  };
  const handleServiceLeave = (e, rot) => {
    let r = 0; if(rot.includes('rotate-2')) r=2; if(rot.includes('-rotate-1')) r=-1; if(rot.includes('rotate-3')) r=3; if(rot.includes('-rotate-2')) r=-2; if(rot.includes('rotate-1')) r=1;
    gsap.to(e.currentTarget, { rotation: r, scale: 1, zIndex: 1, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-bg'), { autoAlpha: 0, duration: 0.4 });
    gsap.to(e.currentTarget.querySelector('.service-marquee'), { height: 0, autoAlpha: 0, marginTop: 0, duration: 0.3 });
    cursorShrink();
  };

  return (
    <main ref={container} onMouseMove={handleMouseMove} className="relative w-full bg-transparent text-black overflow-x-hidden selection:bg-[#ccff00] selection:text-black cursor-none">
      
      {/* 0. UTILS */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 bg-[#ccff00] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference" />
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#fdfbf7]"><Scene /></div>
      <div className="noise-overlay fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay"></div>

      {/* --- MENU LAYERS --- */}
      
      {/* 1. Yellow BG (z-9990) */}
      <div ref={menuBgRef} className="fixed inset-0 z-[9990] bg-[#ccff00] pointer-events-none" style={{ clipPath: "circle(0% at 100% 0%)" }} />

      {/* 2. Text Links (z-9991) - LOWER Z-INDEX */}
      <div ref={menuTextRef} className="fixed inset-0 z-[9991] flex flex-col items-center justify-center pointer-events-none opacity-0">
         <div className="flex flex-col gap-2 md:gap-4 text-center mix-blend-difference text-white md:mix-blend-normal md:text-black pointer-events-auto">
           {menuItems.map((item, i) => (
             <div key={i} className="overflow-hidden">
                <Link href={item.href} onClick={toggleMenu}>
                    <h2 
                        className="menu-item-text text-[15vw] md:text-[10vw] font-funky hover:text-stroke-black hover:text-transparent transition-colors cursor-pointer leading-[0.85] tracking-tighter" 
                        onMouseEnter={() => setActiveMenuImg(item.img)} 
                        onMouseLeave={() => setActiveMenuImg(null)}
                    >
                        {item.label}
                    </h2>
                </Link>
             </div>
           ))}
         </div>
      </div>

      {/* 3. Image Container (z-9992 - ON TOP) */}
      <div 
        ref={menuCursorRef} 
        className="fixed top-0 left-0 w-[60vw] md:w-[500px] aspect-video pointer-events-none z-[9992] rounded-2xl overflow-hidden border-4 border-black shadow-[20px_20px_0px_black]"
        style={{ opacity: isMenuOpen && activeMenuImg ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <img ref={menuImageRef} src={activeMenuImg || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} alt="Preview" className="w-full h-full object-cover" />
      </div>

      {/* 2. NAV */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 flex justify-between items-start z-[9999] mix-blend-difference text-white pointer-events-none">
        <div className="nav-item flex items-center gap-4 cursor-pointer pointer-events-auto group" onMouseEnter={cursorGrow} onMouseLeave={cursorShrink}>
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-500 group-hover:rotate-180">
             <Image src="/logo.svg" alt="Logo" fill className="object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col leading-[0.85]">
            <span className="font-funky text-xl md:text-3xl">Para</span>
            <span className="font-funky text-xl md:text-3xl">Pixel</span>
          </div>
        </div>
        <button onClick={toggleMenu} className="nav-item pointer-events-auto group w-12 h-12 md:w-14 md:h-14 mt-2 flex flex-col gap-1.5 items-center justify-center bg-white rounded-full hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]" onMouseEnter={() => gsap.to(cursorRef.current, {scale: 0})} onMouseLeave={() => gsap.to(cursorRef.current, {scale: 1})}>
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 md:w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* 4. HERO SECTION */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-10 pointer-events-none pb-20">
        <div className="hero-reveal hero-line font-funky text-[15vw] md:text-[12vw] leading-none z-10 mix-blend-overlay opacity-50 text-stroke-black text-transparent md:text-black">WE BUILD</div>
        
        {/* STICKERS - FIXED & ROTATED */}
        {stickers.map((s, i) => (
            <div 
                key={i} 
                className={`sticker absolute ${s.rot} ${s.color} px-4 py-2 font-mono font-bold text-black border-2 border-black shadow-[4px_4px_0px_black] z-20 pointer-events-auto hover:scale-110 transition-transform cursor-pointer hidden md:block`}
                // Use 'transform' here to handle the translateX(-50%) for the centered sticker
                style={{ top: s.top, left: s.left, right: s.right, bottom: s.bottom, transform: s.transform }}
            >
                {s.text}
            </div>
        ))}

        <div className="hero-reveal stuff-wrapper relative z-20 mt-2 md:mt-4 cursor-pointer group pointer-events-auto" onMouseEnter={handleStuffHover}>
          <div ref={stuffTextRef} className="stuff-text relative inline-block text-[25vw] md:text-[22vw] leading-[0.8] font-funky tracking-tighter text-[#ff0055] drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            STUFF
          </div>
        </div>
        <div className="caution-strip absolute bottom-24 w-full bg-[#ccff00] border-y-4 border-black py-3 md:py-4 rotate-[-2deg] scale-110 z-30 overflow-hidden shadow-2xl pointer-events-auto">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(10)].map((_, i) => (<span key={i} className="text-xl md:text-3xl font-black mx-4 tracking-widest text-black font-mono">/// CREATIVITY OVERLOAD ///</span>))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES (TILTED LIST) */}
      <section id="services" className="relative w-full bg-black z-20 py-20 md:py-40 overflow-hidden rounded-t-[3rem] border-t-4 border-[#ccff00]">
        <div className="text-center mb-20 md:mb-32 px-4"><h2 className="font-funky text-[15vw] md:text-[12vw] leading-none"><span className="text-[#ccff00]">THE</span><br className="md:hidden" /><span className="text-transparent [-webkit-text-stroke:1px_#ccff00] md:[-webkit-text-stroke:2px_#ccff00] ml-0 md:ml-4">MENU</span></h2></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10">
            {services.map((service, i) => (
                <div key={i} className={`group relative w-full border-4 border-white/20 bg-[#111] p-8 md:p-12 cursor-pointer transition-all duration-500 ease-out transform ${service.rotate} hover:rotate-0 hover:z-20 hover:border-white`} onMouseEnter={handleServiceEnter} onMouseLeave={(e) => handleServiceLeave(e, service.rotate)}>
                    <div className="service-bg absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0"><img src={service.img} className="w-full h-full object-cover grayscale opacity-30" alt="BG" /></div>
                    <div className="relative z-10 w-full flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6 md:gap-0">
                            <div className="flex items-center gap-4 md:gap-16 w-full md:w-auto relative"><span className={`font-mono text-lg md:text-xl opacity-50 ${service.color}`}>0{i+1}</span><h2 className={`text-[10vw] md:text-[6vw] font-funky leading-none text-white`}>{service.title}</h2></div>
                            <div className="flex w-full md:w-auto justify-between md:flex-col items-end"><span className="font-funky text-xl md:text-3xl text-white">{service.desc}</span><span className="text-3xl md:text-4xl text-white group-hover:translate-x-4 transition-transform mt-2">→</span></div>
                        </div>
                        <div className="service-marquee h-0 overflow-hidden opacity-0 relative">
                            <div className="pt-4 md:pt-8 w-full border-t border-white/10 mt-4">
                                <div className="marquee-inner flex whitespace-nowrap w-fit">
                                    <span className={`text-2xl md:text-4xl font-mono font-bold mx-4 ${service.color}`}>{service.tags} {service.tags} {service.tags}</span>
                                    <span className={`text-2xl md:text-4xl font-mono font-bold mx-4 ${service.color}`}>{service.tags} {service.tags} {service.tags}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 6. WORK (HORIZONTAL SCROLL) */}
      <section id="work" ref={workRef} className="relative z-30 bg-[#050505] overflow-hidden">
         <div ref={workSliderRef} className="flex flex-nowrap h-screen">
            <div className="work-panel w-screen h-screen flex flex-col justify-center items-center border-r border-[#222] bg-black">
                <h2 className="text-[15vw] font-funky text-white leading-none">THE<br/><span className="text-stroke-white text-transparent">WORK</span></h2>
                <div className="animate-bounce text-6xl mt-10 text-white">→</div>
            </div>
            {projects.map((project, i) => (
                <div key={i} className="work-panel w-screen h-screen flex flex-col justify-center items-center border-r border-[#222] relative bg-[#0a0a0a]">
                    <div className="relative w-[80vw] h-[50vh] md:w-[50vw] md:h-[60vh] overflow-hidden cursor-none group" onMouseEnter={cursorGrow} onMouseLeave={cursorShrink}>
                        <img src={project.img} alt={project.name} className="w-full h-full object-contains transition-transform duration-700 ease-expo" />
                        <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 font-mono text-sm md:text-xl border border-white/20">{project.type}</div>
                    </div>
                    <div className="mt-8 text-center z-20">
                        <h2 className="text-[8vw] font-funky leading-none text-white mix-blend-difference">{project.name}</h2>
                        <p className="font-mono text-[#ccff00] text-xl">{project.client}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* 7. PROCESS (PINNED STACK) */}
      <section id="process" ref={processRef} className="relative z-40 bg-black h-screen overflow-hidden">
         <div className="w-full h-full relative">
            
            {/* Title Slide */}
            <div className="process-card absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-black z-0">
                 <h2 className="text-[10vw] font-funky text-white">THE <span className="text-[#ccff00]">COOK</span></h2>
                 <p className="text-white font-mono mt-4">SCROLL TO UNLOCK</p>
            </div>

            {/* Stacking Cards */}
            {phases.map((phase, i) => (
                <div key={i} className={`process-card absolute inset-0 w-full h-full flex flex-col justify-center px-4 md:px-20 border-t-2 border-black ${phase.color}`} style={{ zIndex: i + 1 }}>
                    <div className="max-w-6xl relative z-10 px-8">
                        <span className="font-mono text-xl border border-current px-4 py-1 rounded-full mb-6 inline-block">PHASE 0{i+1}</span>
                        <h2 className="text-[8vw] font-funky leading-none mb-8">{phase.title}</h2>
                        <p className="text-2xl md:text-5xl font-bold leading-tight max-w-4xl">{phase.desc}</p>
                    </div>
                    <div className="absolute bottom-10 right-10 text-[20vw] font-funky opacity-10 leading-none pointer-events-none select-none">0{i+1}</div>
                </div>
            ))}
         </div>
      </section>

      {/* 8. CONTACT (TERMINAL) */}
      <section id="contact" className="relative z-50 bg-[#ccff00] text-black py-40 px-4 md:px-20 min-h-screen flex flex-col justify-center">
         <h2 className="text-[12vw] font-funky leading-none mb-20">HOLLER<br/>AT US</h2>
         <form className="w-full max-w-5xl flex flex-col gap-10">
             <div className="group relative"><input type="text" placeholder="WHO ARE YOU?" className="w-full bg-transparent border-b-4 border-black text-3xl md:text-5xl font-bold py-4 placeholder:text-black/30 focus:outline-none focus:border-white transition-colors" /></div>
             <div className="group relative"><input type="email" placeholder="YOUR EMAIL?" className="w-full bg-transparent border-b-4 border-black text-3xl md:text-5xl font-bold py-4 placeholder:text-black/30 focus:outline-none focus:border-white transition-colors" /></div>
             <button type="button" className="self-start mt-10 px-12 py-6 bg-black text-[#ccff00] text-2xl font-black rounded-full hover:scale-110 hover:rotate-3 transition-transform shadow-[10px_10px_0px_white]" onMouseEnter={cursorGrow} onMouseLeave={cursorShrink}>SEND IT</button>
         </form>
      </section>

      {/* 9. COMPACT FOOTER */}
      <footer className="relative z-50 bg-black text-white py-20 text-center border-t-8 border-white overflow-hidden">
          <h2 className="text-[10vw] font-funky leading-none mb-8 text-[#ccff00] mix-blend-difference">PARAPIXEL</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 font-mono text-xl text-white">
              <a href="#" className="hover:text-[#ccff00] hover:underline">INSTAGRAM</a>
              <a href="#" className="hover:text-[#ccff00] hover:underline">LINKEDIN</a>
              <a href="#" className="hover:text-[#ccff00] hover:underline">TWITTER</a>
          </div>
          <p className="mt-12 text-white/30 font-mono text-sm">© 2026 PARAPIXEL.</p>
      </footer>

    </main>
  );
}