export default function SplitText({ text, className }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block will-change-transform" // 'char' class is for GSAP
          style={{ opacity: 0 }} // Start invisible
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}