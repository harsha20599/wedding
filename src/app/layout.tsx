import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/* ═══ Typography Loading ═══
   Playfair Display — Cinematic serif for headings.
   Tall, romantic, with high stroke contrast.
   
   Cormorant Garamond — Elegant body serif.
   Light, airy, feels poetic at reading sizes. */

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hiro & Elena — A Celebration of Love",
  description:
    "Join us in celebrating our wedding. An intimate gathering of the people we love most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
