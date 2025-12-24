import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/contexts/AudioContext";
import { Analytics } from "@vercel/analytics/react";
import JsonLdSchema from "@/components/JsonLdSchema";

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
  title: "Bruit Blanc Bébé Gratuit & Sons Apaisants (Pluie, Nature) - Lullaway",
  description: "Aidez bébé à dormir avec des bruits blancs gratuits. Sans téléchargement, avec minuteur. Pluie, battements de cœur, sons nature.",
  keywords: ["bruit blanc bébé", "son pour dormir bébé", "bruit blanc gratuit", "pluie bébé", "sons apaisants bébé", "endormir bébé", "white noise baby"],
  authors: [{ name: "Lullaway" }],
  creator: "Digital Tools Factory",
  publisher: "Lullaway",
  verification: {
    google: "6DKDRhL2mMw0U1chXijrRpbctnbBWCssWAUPbPF4g88",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://baby.dailytoolsfactory.com",
    siteName: "Lullaway",
    title: "Bruit Blanc Bébé Gratuit & Sons Apaisants - Lullaway",
    description: "Aidez bébé à dormir avec des bruits blancs gratuits. Sans téléchargement, avec minuteur. Pluie, battements de cœur, sons nature.",
    images: [
      {
        url: "https://baby.dailytoolsfactory.com/Lullaway-2.png",
        width: 1200,
        height: 630,
        alt: "Lullaway - Bruit Blanc pour Bébé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruit Blanc Bébé Gratuit & Sons Apaisants - Lullaway",
    description: "Aidez bébé à dormir avec des bruits blancs gratuits. Sans téléchargement, avec minuteur.",
    images: ["https://baby.dailytoolsfactory.com/Lullaway-2.png"],
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <JsonLdSchema />
      </head>
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
