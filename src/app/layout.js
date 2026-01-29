import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
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
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}