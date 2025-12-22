import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhiteNoise Baby - Sons apaisants pour bébés",
  description: "Aidez votre bébé à s'endormir paisiblement avec des bruits blancs et sons apaisants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <AudioProvider>
          {children}
          <BottomNav />
        </AudioProvider>
      </body>
    </html>
  );
}
