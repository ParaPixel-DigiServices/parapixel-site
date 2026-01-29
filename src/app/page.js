export default function Home() {
  return (
    // 1. Force the page to be tall (300vh) so we can scroll
    <div className="relative w-full min-h-[300vh] bg-navy flex flex-col items-center">
      
      {/* SECTION 1: TOP */}
      <div className="h-screen flex items-center justify-center sticky top-0">
        <h1 className="font-display text-7xl md:text-[10rem] text-white tracking-widest uppercase leading-none mix-blend-difference z-20">
          Para<span className="text-lime">Pixel</span>
        </h1>
      </div>

      {/* SECTION 2: THE SCROLL INDICATOR (Way down) */}
      <div className="absolute top-[150vh] text-center">
        <p className="font-sans text-lilac text-xl tracking-[0.5em] uppercase">
          Keep Scrolling
        </p>
        <div className="w-[1px] h-32 bg-lime mx-auto mt-8"></div>
      </div>

      {/* SECTION 3: BOTTOM */}
      <div className="absolute bottom-20 text-center">
         <h2 className="font-display text-6xl text-white">
           END OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-lime">VOID</span>
         </h2>
      </div>

    </div>
  );
}