import localFont from "next/font/local"; 
import { Unbounded, Space_Grotesk } from "next/font/google"; 
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

// 1. Your Local Funky Font (For Brand Name)
const superFunky = localFont({
  src: "./fonts/super-funky.ttf",
  variable: "--font-funky",
  display: "swap",
});

// 2. Unbounded (For Hero Text)
const unbounded = Unbounded({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

// 3. Clean Font (For Sticker/UI)
const space = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

// --- NEW SEO & METADATA CONFIGURATION ---
export const metadata = {
  // Basic SEO
  title: {
    default: "ParaPixel | Brutalist Digital Agency",
    template: "%s | ParaPixel"
  },
  description: "We build immersive 3D websites, high-performance mobile apps, and scalable SaaS platforms. A brutalist digital agency based in Bangalore, crafting digital chaos.",
  keywords: ["Web Design", "App Development", "SaaS", "3D Website", "Bangalore Agency", "Next.js", "React Native", "Brutalist Design"],
  authors: [{ name: "Amogha Rao", url: "https://parapixel.net" }],
  creator: "ParaPixel Team",
  
  // 2. FAVICON / ICONS (This changes the logo in the tab)
  icons: {
    icon: "/logo.svg",        // Standard favicon
    shortcut: "/logo.svg",    // Shortcut icon
    apple: "/logo.svg",       // Apple touch icon
  },

  // 3. SOCIAL MEDIA PREVIEWS (Open Graph)
  openGraph: {
    title: "ParaPixel | We Build Chaos",
    description: "High-end digital experiences. WebGL, 3D, and Brutalist Design.",
    url: "https://parapixel.net",
    siteName: "ParaPixel Digi Services",
    images: [
      {
        url: "/og-image.png", // Add a 1200x630px image to public/ folder
        width: 1200,
        height: 630,
        alt: "ParaPixel Digital Agency Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 4. TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "ParaPixel | Digital Agency",
    description: "Immersive 3D Web & Mobile Apps.",
    images: ["/og-image.png"],
  },

  // 5. ROBOTS (Indexing)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${superFunky.variable} ${unbounded.variable} ${space.variable}`}>
      <body className="antialiased font-unbounded bg-[#fdfbf7] selection:bg-[#ccff00] selection:text-black">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}