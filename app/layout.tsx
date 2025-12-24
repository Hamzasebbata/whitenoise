import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { Analytics } from "@vercel/analytics/react";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lullaway - Sons apaisants pour bébés",
  description: "Aidez votre bébé à s'endormir paisiblement avec des bruits blancs et sons apaisants",
  verification: {
    google: "6DKDRhL2mMw0U1chXijrRpbctnbBWCssWAUPbPF4g88",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${nunito.variable} ${quicksand.variable} antialiased font-sans`}
      >
        <AudioProvider>
          {children}
        </AudioProvider>
        <Analytics />
      </body>
    </html>
  );
}
