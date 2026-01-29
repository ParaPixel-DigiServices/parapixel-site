import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const superFunky = localFont({
  src: "./fonts/super-funky.ttf", 
  variable: "--font-funky",       
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "ParaPixel | Digital Realities",
  description: "A cinematic web experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${superFunky.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {/* 1. ACTIVATING THE CURSOR */}
        <CustomCursor />
        <SmoothScroll>
          <main className="relative z-10">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}