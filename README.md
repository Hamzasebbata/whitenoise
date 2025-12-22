# 🌙 WhiteNoise Baby

> Application mobile-first pour aider les bébés à dormir avec des bruits blancs et sons apaisants.

![Status](https://img.shields.io/badge/Status-MVP%20Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

---

## 🚀 Démarrage Rapide

### 1. Installation (déjà faite)
```bash
npm install
```

### 2. Ajouter les fichiers audio
Placez vos fichiers MP3 dans `public/sounds/` :

**Sons gratuits (obligatoires) :**
- `white-noise.mp3` - Bruit blanc
- `rain.mp3` - Pluie

**Sons premium (optionnels) :**
- `hairdryer.mp3` - Sèche-cheveux
- `waves.mp3` - Vagues
- `heartbeat.mp3` - Battements de cœur
- `wind.mp3` - Vent
- `train.mp3` - Train

### 3. Lancer l'application
```bash
npm run dev
```

Ouvrez **http://localhost:3001** dans votre navigateur.

---

## ✨ Fonctionnalités

### 🎵 Player Audio
- Lecture en boucle parfaite (Howler.js)
- Animation de respiration apaisante
- Bouton Play/Pause géant (facile à toucher)
- Minuteur (15, 30, 60 min, Infini)

### 📚 Bibliothèque de Sons
- 2 sons gratuits : Bruit Blanc, Pluie
- 5 sons premium : Sèche-cheveux, Vagues, Cœur, Vent, Train
- Grille visuelle avec icônes emoji
- Système de paywall pour les sons premium

### 👑 Écran Premium
- Présentation des fonctionnalités
- Plans tarifaires (mensuel/annuel)
- Design attractif avec animations

### 🎨 Design "Sleep-First"
- **Dark mode profond** : Pas de blanc éblouissant
- **Textes doux** : Gris clair pour les yeux fatigués
- **Gros boutons** : Utilisable avec une main (tenant un bébé)
- **Animations subtiles** : Apaisantes et fluides

---

## 📱 Écrans

| Écran | Route | Description |
|-------|-------|-------------|
| **Player** | `/` | Lecteur audio avec animation |
| **Sons** | `/sounds` | Bibliothèque de sons |
| **Premium** | `/premium` | Offre premium |

---

## 🛠️ Technologies

- **[Next.js 14](https://nextjs.org/)** - Framework React avec App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling utilitaire
- **[Howler.js](https://howlerjs.com/)** - Gestion audio professionnelle
- **[Lucide React](https://lucide.dev/)** - Icônes modernes

---

## 📂 Structure du Projet

```
whitenoise/
├── app/
│   ├── page.tsx              # 🏠 Player (Accueil)
│   ├── sounds/page.tsx       # 🎵 Bibliothèque
│   ├── premium/page.tsx      # 👑 Premium
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Styles globaux
├── components/
│   ├── BottomNav.tsx         # Navigation inférieure
│   ├── TimerModal.tsx        # Modal du minuteur
│   └── PremiumModal.tsx      # Modal premium
├── contexts/
│   └── AudioContext.tsx      # État global de l'audio
├── lib/
│   ├── audio-manager.ts      # Gestionnaire Howler.js
│   └── sounds-data.ts        # Données des sons
├── types/
│   ├── sound.ts              # Types TypeScript
│   └── howler.d.ts           # Déclarations Howler
└── public/
    └── sounds/               # 🎵 Fichiers MP3 (à ajouter)
```

---

## 🎯 Commandes

```bash
# Développement
npm run dev          # Lance le serveur de dev (port 3001)

# Production
npm run build        # Build optimisé
npm run start        # Serveur production

# Qualité
npm run lint         # Linter ESLint
```

---

## 🎨 Palette de Couleurs

| Usage | Couleur | Classe Tailwind |
|-------|---------|-----------------|
| Fond principal | `#020617` | `bg-slate-950` |
| Surfaces | `#0f172a` | `bg-slate-900` |
| Textes | `#cbd5e1` | `text-slate-300` |
| Accents | `#3b82f6` | `text-blue-500` |
| Premium | Dégradé | `from-yellow-400 to-orange-500` |

---

## 🎬 Animations

- **Breathe** : Cercle central qui respire (4s)
- **Ping Slow** : Onde externe qui pulse (3s)
- **Pulse Slow** : Icône Crown qui pulse (3s)
- **Slide Up** : Modales qui glissent (0.3s)

Toutes les animations sont définies dans `app/globals.css`.

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Guide de configuration détaillé
- **[MVP_COMPLETE.md](./MVP_COMPLETE.md)** - Documentation complète du MVP
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture technique
- **[SCREENS_GUIDE.md](./SCREENS_GUIDE.md)** - Guide visuel des écrans

---

## 🔥 Prochaines Étapes

### Phase 2 : Monétisation
- [ ] Intégration Stripe
- [ ] Système d'authentification
- [ ] Gestion des abonnements

### Phase 3 : Fonctionnalités
- [ ] Mix de sons (2 sons simultanés)
- [ ] Fade in/out
- [ ] Favoris
- [ ] Historique

### Phase 4 : Mobile
- [ ] PWA (Progressive Web App)
- [ ] Mode hors ligne
- [ ] Notifications
- [ ] Widget iOS/Android

---

## 🐛 Dépannage

### Les sons ne jouent pas ?
1. Vérifiez que les MP3 sont dans `public/sounds/`
2. Vérifiez les noms de fichiers (sensibles à la casse)
3. Ouvrez la console (F12) pour voir les erreurs

### Le serveur ne démarre pas ?
1. Supprimez `.next/` : `rm -rf .next`
2. Réinstallez : `npm install`
3. Relancez : `npm run dev`

### Erreur de build ?
1. Vérifiez TypeScript : `npx tsc --noEmit`
2. Vérifiez le linter : `npm run lint`
3. Nettoyez et rebuilder

---

## 📱 Test Mobile

### Sur votre téléphone (même réseau WiFi) :
1. Trouvez votre IP : `ifconfig | grep inet`
2. Accédez à `http://[votre-ip]:3001`

### Avec ngrok (tunnel public) :
```bash
npx ngrok http 3001
```

---

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installez Vercel CLI
npm i -g vercel

# Déployez
vercel --prod
```

### Autres options
- Netlify
- Railway
- AWS Amplify
- Cloudflare Pages

---

## 📄 Licence

Ce projet est un MVP. Ajoutez votre propre licence selon vos besoins.

---

## 🙏 Crédits

**Technologies :**
- [Next.js](https://nextjs.org/) - Framework
- [Howler.js](https://howlerjs.com/) - Audio
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icônes

**Sons (à ajouter) :**
- [Freesound.org](https://freesound.org/) - Sons gratuits
- [Zapsplat.com](https://www.zapsplat.com/) - Effets sonores

---

## 💬 Support

Pour toute question ou problème :
1. Consultez la [documentation](./SETUP.md)
2. Vérifiez les [issues GitHub](../../issues)
3. Ouvrez une nouvelle issue

---

## ⭐ Remerciements

Merci d'utiliser **WhiteNoise Baby** ! Si ce projet vous aide, n'hésitez pas à le partager avec d'autres parents. 👶💤

---

**Fait avec ❤️ pour les parents épuisés et leurs bébés**
