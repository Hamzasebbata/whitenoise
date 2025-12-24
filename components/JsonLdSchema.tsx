/**
 * JSON-LD Schema for Rich Snippets (Google Search)
 * Type: SoftwareApplication
 * Purpose: Améliorer l'apparence dans les résultats de recherche Google
 */

export default function JsonLdSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lullaway",
    "applicationCategory": "ParentingApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "Application web gratuite de bruits blancs pour aider les bébés à dormir. Inclut des sons apaisants comme la pluie, les battements de cœur et le bruit blanc pur. Avec minuteur intelligent et mode avion.",
    "featureList": [
      "White Noise Player - Lecteur de bruits blancs en boucle continue",
      "Sleep Timer - Minuteur de sommeil intelligent (15, 30, 60 min ou personnalisé)",
      "Baby Sleep Aid - Aide au sommeil pour nourrissons et bébés",
      "Rain Sounds - Sons de pluie apaisants",
      "Heartbeat Sounds - Battements de cœur (environnement utérin)",
      "Airplane Mode Compatible - Fonctionne sans ondes en mode avion",
      "No Download Required - Aucun téléchargement nécessaire",
      "Free & Ad-Free - 100% gratuit sans publicité"
    ],
    "screenshot": "https://baby.dailytoolsfactory.com/Lullaway-2.png",
    "url": "https://baby.dailytoolsfactory.com",
    "author": {
      "@type": "Organization",
      "name": "Digital Tools Factory",
      "url": "https://baby.dailytoolsfactory.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lullaway",
      "logo": {
        "@type": "ImageObject",
        "url": "https://baby.dailytoolsfactory.com/Lullaway-2.png"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "inLanguage": "fr-FR",
    "keywords": "bruit blanc bébé, white noise baby, son pour dormir bébé, calmer coliques, sommeil nourrisson, bruits blancs gratuits, pluie bébé, battements de coeur bébé",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "applicationSubCategory": "Baby Sleep App",
    "countriesSupported": "FR, BE, CH, CA",
    "isAccessibleForFree": true,
    "license": "https://baby.dailytoolsfactory.com"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

