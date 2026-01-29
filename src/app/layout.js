import localFont from "next/font/local"; // <--- New Import
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// 1. Configure Your Custom "Super Funky" Font
const superFunky = localFont({
  src: "./fonts/super-funky.ttf", // Make sure this extension matches your file (.ttf, .otf, .woff2)
  variable: "--font-funky",       // We name the CSS variable here
  display: "swap",
});

// 2. The Tech Font (Stays the same)
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
    // Inject both variables into the HTML tag
    <html lang="en" className={`${superFunky.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}