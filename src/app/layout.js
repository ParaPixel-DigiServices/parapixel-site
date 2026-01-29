import localFont from "next/font/local"; // <--- FOR YOUR LOCAL FONT
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

export const metadata = {
  title: "ParaPixel | WE BUILD STUFF",
  description: "Digital Alchemy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${superFunky.variable} ${unbounded.variable} ${space.variable}`}>
      <body className="antialiased font-unbounded">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}