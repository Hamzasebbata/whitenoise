# WhiteNoise Baby - Guide de Configuration

## 🎵 Ajouter les fichiers audio

L'application est prête à fonctionner, mais vous devez ajouter les fichiers MP3 dans le dossier `public/sounds/`.

### Fichiers requis :

**Sons gratuits (obligatoires) :**
- `public/sounds/white-noise.mp3` - Bruit blanc
- `public/sounds/rain.mp3` - Pluie

**Sons premium (optionnels) :**
- `public/sounds/hairdryer.mp3` - Sèche-cheveux
- `public/sounds/waves.mp3` - Vagues
- `public/sounds/heartbeat.mp3` - Battements de cœur
- `public/sounds/wind.mp3` - Vent
- `public/sounds/train.mp3` - Train

### Où trouver des sons ?

1. **Freesound.org** (gratuit, licence Creative Commons)
2. **Zapsplat.com** (gratuit avec attribution)
3. **Epidemic Sound** (payant, haute qualité)
4. **Enregistrez vos propres sons**

### Format recommandé :
- Format : MP3 (128-192 kbps)
- Durée : Au moins 30 secondes (pour une boucle fluide)
- Assurez-vous que le début et la fin se connectent bien pour une boucle parfaite

## 🚀 Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📱 Fonctionnalités implémentées

### ✅ Écran Player (Accueil)
- Affichage du son en cours
- Animation de respiration (cercle qui pulse)
- Bouton Play/Pause géant
- Minuteur (15 min, 30 min, 60 min, Infini)

### ✅ Écran Bibliothèque
- Grille de sons avec icônes
- Sons gratuits vs premium (avec cadenas 🔒)
- Navigation automatique vers le player après sélection
- Modale premium pour les sons verrouillés

### ✅ Écran Premium
- Présentation des fonctionnalités premium
- Plans tarifaires (mensuel/annuel)
- Design attractif avec badges

### ✅ Fonctionnalités audio
- Lecture en boucle parfaite (Howler.js)
- État global persistant entre les écrans
- Gestion du volume
- Minuteur automatique

## 🎨 Design "Sleep-First"

- **Dark mode profond** : `bg-slate-950` (pas de blanc qui éblouit)
- **Textes doux** : `text-slate-300` (facile à lire la nuit)
- **Gros boutons** : Faciles à toucher avec une main
- **Coins arrondis** : `rounded-3xl` pour une ambiance apaisante
- **Animations subtiles** : Respiration, pulse, transitions douces

## 🛠️ Technologies utilisées

- **Next.js 14** (App Router)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icônes)
- **Howler.js** (Gestion audio)
- **TypeScript** (Type safety)

## 📂 Structure du projet

```
whitenoise/
├── app/
│   ├── page.tsx              # Écran Player (Accueil)
│   ├── sounds/page.tsx       # Bibliothèque de sons
│   ├── premium/page.tsx      # Écran Premium
│   ├── layout.tsx            # Layout avec AudioProvider
│   └── globals.css           # Styles globaux + animations
├── components/
│   ├── BottomNav.tsx         # Navigation inférieure
│   ├── TimerModal.tsx        # Modale du minuteur
│   └── PremiumModal.tsx      # Modale premium
├── contexts/
│   └── AudioContext.tsx      # État global de l'audio
├── lib/
│   ├── audio-manager.ts      # Gestionnaire Howler.js
│   └── sounds-data.ts        # Données des sons
├── types/
│   ├── sound.ts              # Types TypeScript
│   └── howler.d.ts           # Déclarations Howler
└── public/
    └── sounds/               # Fichiers MP3 (à ajouter)
```

## 🔥 Prochaines étapes suggérées

1. **Ajouter les fichiers MP3** dans `public/sounds/`
2. **Tester sur mobile** (design responsive)
3. **Optimiser les boucles audio** (fade in/out)
4. **Ajouter des analytics** (Vercel Analytics)
5. **Implémenter le paiement** (Stripe)
6. **Mode hors ligne** (PWA avec service worker)
7. **Notifications** (rappel de routine de sommeil)

## 📱 Test mobile

Pour tester sur votre téléphone :

```bash
npm run dev -- -H 0.0.0.0
```

Puis accédez à `http://[votre-ip-local]:3000` depuis votre mobile.

## 🐛 Dépannage

**Les sons ne jouent pas ?**
- Vérifiez que les fichiers MP3 sont bien dans `public/sounds/`
- Vérifiez les noms de fichiers (sensibles à la casse)
- Ouvrez la console du navigateur pour voir les erreurs

**L'animation ne fonctionne pas ?**
- Vérifiez que Tailwind CSS est bien configuré
- Les animations personnalisées sont dans `globals.css`

**Le minuteur ne s'arrête pas ?**
- C'est normal si vous avez sélectionné "Infini"
- Changez le minuteur ou mettez en pause manuellement

## 📄 Licence

Ce projet est un MVP. Ajoutez votre propre licence selon vos besoins.

---

**Bon codage ! 🚀 Et bonnes nuits paisibles pour les bébés 👶💤**

