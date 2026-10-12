import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { BagProvider } from "./components/bag-provider";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: "VELUM — Made for the elements.",
  description: "Essential skincare for the conditions of contemporary life. Explore CLEANSE, FORTIFY, and SEAL. A fictional premium skincare portfolio concept.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${instrument.variable}`}><BagProvider>{children}</BagProvider></body></html>;
}
