export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-navy">
      {/* bg-navy works because we defined --color-navy in @theme 
         font-display works because we defined --font-display in @theme
      */}
      <h1 className="font-display text-6xl md:text-9xl font-extrabold text-white tracking-tighter">
        PARA<span className="text-lime">PIXEL</span>
      </h1>
    </div>
  );
}