# 🏗️ Architecture WhiteNoise Baby

## Vue d'ensemble du flux de données

```
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              AudioProvider (Context)                  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │         AudioManager (Howler.js)               │  │   │
│  │  │  • currentSound                                 │  │   │
│  │  │  • isPlaying                                    │  │   │
│  │  │  • timerDuration                                │  │   │
│  │  │  • playSound()                                  │  │   │
│  │  │  • togglePlayPause()                            │  │   │
│  │  │  • setTimer()                                   │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │   Player     │  │   Sounds     │  │  Premium  │  │   │
│  │  │   (Home)     │  │  (Library)   │  │  (Paywall)│  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  │                                                        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │           BottomNav (Navigation)               │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Flux de Navigation

```
┌──────────────┐
│   Player     │ ◄──── Écran par défaut (/)
│   (Home)     │
└──────┬───────┘
       │
       │ Clic sur "Sons" (Bottom Nav)
       ▼
┌──────────────┐
│   Sounds     │
│  (Library)   │
└──────┬───────┘
       │
       ├─── Clic sur son gratuit ───► Retour au Player + Lance le son
       │
       └─── Clic sur son premium ───► Ouvre PremiumModal
                                       │
                                       ▼
                              ┌────────────────┐
                              │ PremiumModal   │
                              │ (Paywall)      │
                              └────────────────┘
```

---

## Flux Audio

```
User Action                 AudioContext              AudioManager (Howler)
─────────────────────────────────────────────────────────────────────────

Clic sur son gratuit
    │
    ├──► playSound(sound)
    │       │
    │       ├──► audioManager.play(url, id)
    │       │       │
    │       │       ├──► Stop current sound
    │       │       ├──► Create new Howl instance
    │       │       │       • loop: true
    │       │       │       • volume: 0.7
    │       │       │       • html5: true
    │       │       └──► howl.play()
    │       │
    │       ├──► setCurrentSound(sound)
    │       └──► setIsPlaying(true)
    │
    └──► router.push('/')


Clic Play/Pause
    │
    ├──► togglePlayPause()
    │       │
    │       ├──── isPlaying = true ?
    │       │       │
    │       │       ├─── YES ──► audioManager.pause()
    │       │       │              setIsPlaying(false)
    │       │       │
    │       │       └─── NO ───► audioManager.resume()
    │       │                     setIsPlaying(true)
    │       │
    │       └──► UI updates (icon changes)


Minuteur activé
    │
    ├──► setTimer(duration)
    │       │
    │       ├──► Clear existing timer
    │       ├──► setTimerDuration(duration)
    │       │
    │       └──► setTimeout(() => {
    │               audioManager.pause()
    │               setIsPlaying(false)
    │            }, duration * 60 * 1000)
    │
    └──► UI shows timer duration
```

---

## Structure des Composants

### 1. Layout (Root)
```typescript
RootLayout
├── <html>
│   └── <body>
│       ├── AudioProvider (Context)
│       │   ├── {children} (Pages)
│       │   └── BottomNav
│       └── </body>
└── </html>
```

### 2. Page Player (/)
```typescript
PlayerPage (Client Component)
├── Sound Name Display
│   ├── <h1>{currentSound.name}</h1>
│   └── <p>Bruit blanc apaisant</p>
│
├── Breathing Animation
│   ├── Outer ring (ping-slow)
│   ├── Middle ring (breathe)
│   └── Center circle (emoji)
│
├── Play/Pause Button
│   └── {isPlaying ? <PauseCircle> : <PlayCircle>}
│
├── Timer Button
│   └── onClick → setShowTimerModal(true)
│
└── TimerModal
    └── {showTimerModal && <TimerModal />}
```

### 3. Page Sounds (/sounds)
```typescript
SoundsPage (Client Component)
├── Header
│   ├── <h1>Bibliothèque de Sons</h1>
│   └── <p>Description</p>
│
├── Sounds Grid
│   └── SOUNDS.map(sound =>
│       <SoundCard>
│           ├── {sound.isPremium && <Lock badge>}
│           ├── <emoji>{sound.icon}</emoji>
│           ├── <h3>{sound.name}</h3>
│           └── onClick → handleSoundClick(sound)
│       </SoundCard>
│   )
│
├── Premium CTA Card
│   └── onClick → setShowPremiumModal(true)
│
└── PremiumModal
    └── {showPremiumModal && <PremiumModal />}
```

### 4. Page Premium (/premium)
```typescript
PremiumPage (Client Component)
├── Header
│   ├── <Crown icon (animated)>
│   ├── <h1>WhiteNoise Premium</h1>
│   └── <p>Description</p>
│
├── Features Grid
│   └── features.map(feature =>
│       <FeatureCard>
│           ├── <emoji>{feature.icon}</emoji>
│           ├── <h3>{feature.title}</h3>
│           └── <p>{feature.description}</p>
│       </FeatureCard>
│   )
│
├── Pricing Plans
│   └── plans.map(plan =>
│       <PlanCard>
│           ├── {plan.popular && <Badge>}
│           ├── <h3>{plan.name}</h3>
│           ├── <price>{plan.price}</price>
│           └── {plan.savings && <p>}
│       </PlanCard>
│   )
│
├── CTA Button
│   └── "Commencer l'essai gratuit"
│
└── Trust Badges
    ├── Sans engagement
    └── Paiement sécurisé
```

---

## Gestion de l'État

### Global State (AudioContext)
```typescript
interface AudioContextType {
  // État
  currentSound: Sound | null;        // Son actuellement sélectionné
  isPlaying: boolean;                // État de lecture
  timerDuration: TimerDuration;      // Durée du minuteur actif
  
  // Actions
  playSound: (sound: Sound) => void;
  togglePlayPause: () => void;
  setTimer: (duration: TimerDuration) => void;
}
```

### Local State (Composants)
```typescript
// PlayerPage
const [showTimerModal, setShowTimerModal] = useState(false);

// SoundsPage
const [showPremiumModal, setShowPremiumModal] = useState(false);

// Modals
const [isOpen, setIsOpen] = useState(false);
```

---

## Modèles de Données

### Sound
```typescript
interface Sound {
  id: string;           // 'white-noise', 'rain', etc.
  name: string;         // 'Bruit Blanc', 'Pluie'
  icon: string;         // '🌫️', '🌧️'
  audioUrl: string;     // '/sounds/white-noise.mp3'
  isPremium: boolean;   // true/false
}
```

### TimerDuration
```typescript
type TimerDuration = 15 | 30 | 60 | null;
// null = Infini
```

---

## Cycle de Vie Audio

```
1. Initialisation
   ├── AudioProvider monte
   ├── currentSound = SOUNDS[0] (premier son gratuit)
   └── isPlaying = false

2. Sélection d'un son
   ├── User clique sur un son
   ├── playSound(sound) appelé
   ├── AudioManager.play(url, id)
   │   ├── Stop current Howl
   │   ├── Create new Howl
   │   └── Start playback
   ├── setCurrentSound(sound)
   └── setIsPlaying(true)

3. Lecture en cours
   ├── Howl joue en boucle (loop: true)
   ├── Animation respire
   └── Timer compte (si activé)

4. Pause
   ├── User clique Play/Pause
   ├── togglePlayPause()
   ├── AudioManager.pause()
   ├── setIsPlaying(false)
   └── Animation s'arrête

5. Changement d'écran
   ├── User navigue (Bottom Nav)
   ├── AudioContext persiste
   ├── Audio continue de jouer
   └── État conservé

6. Timer expire
   ├── setTimeout déclenché
   ├── AudioManager.pause()
   ├── setIsPlaying(false)
   └── setTimerDuration(null)

7. Nettoyage
   ├── Composant démonte
   ├── AudioManager.stop()
   └── Howl.unload()
```

---

## Patterns de Design

### 1. Singleton Pattern
```typescript
// audio-manager.ts
class AudioManager { /* ... */ }
export const audioManager = new AudioManager(); // Instance unique
```

### 2. Context Pattern
```typescript
// AudioContext.tsx
const AudioContext = createContext<AudioContextType>();
export function AudioProvider({ children }) { /* ... */ }
export function useAudio() { return useContext(AudioContext); }
```

### 3. Composition Pattern
```typescript
// Modals réutilisables
<TimerModal isOpen={show} onClose={() => setShow(false)} />
<PremiumModal isOpen={show} onClose={() => setShow(false)} />
```

### 4. Custom Hook Pattern
```typescript
// Dans n'importe quel composant
const { currentSound, isPlaying, togglePlayPause } = useAudio();
```

---

## Optimisations

### Performance
- ✓ Server Components par défaut
- ✓ Client Components uniquement si nécessaire
- ✓ Lazy loading des modales (conditional rendering)
- ✓ Howler.js avec html5: true (streaming)
- ✓ Animations CSS (GPU accelerated)

### UX
- ✓ Feedback immédiat (pas de loading)
- ✓ Transitions fluides (300ms)
- ✓ État persistant (Context)
- ✓ Navigation intuitive

### Accessibilité
- ✓ Boutons sémantiques
- ✓ Contraste élevé (WCAG AA)
- ✓ Touch targets > 44px
- ✓ Focus visible

---

## Dépendances Critiques

```json
{
  "next": "16.1.0",           // Framework
  "react": "19.0.0",          // UI Library
  "howler": "^2.2.4",         // Audio Engine
  "lucide-react": "^0.468.0", // Icons
  "tailwindcss": "^4.0.0"     // Styling
}
```

---

## Points d'Extension Futurs

### 1. Mix de Sons
```typescript
// Permettre 2 sons simultanés
const [primarySound, setPrimarySound] = useState<Sound | null>(null);
const [secondarySound, setSecondarySound] = useState<Sound | null>(null);
```

### 2. Fade In/Out
```typescript
// Transition douce
howl.fade(0, 0.7, 2000); // 0 → 0.7 en 2 secondes
```

### 3. Playlists
```typescript
interface Playlist {
  id: string;
  name: string;
  sounds: Sound[];
  shuffle: boolean;
}
```

### 4. Favoris
```typescript
// LocalStorage ou DB
const [favorites, setFavorites] = useState<string[]>([]);
```

### 5. Analytics
```typescript
// Track usage
trackEvent('sound_played', { soundId, duration });
trackEvent('premium_modal_opened', { source });
```

---

## Sécurité

### Audio Files
- ✓ Fichiers statiques dans `public/`
- ✓ Pas d'upload utilisateur (pour le MVP)
- ✓ Validation côté serveur (future)

### Premium Content
- ✓ Vérification côté client (UI)
- ✓ Vérification côté serveur (future avec auth)
- ✓ Tokens JWT (future)

---

## Déploiement

### Vercel (Recommandé)
```bash
# Connectez votre repo GitHub
vercel --prod

# Variables d'environnement (future)
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

### Build Local
```bash
npm run build    # Production build
npm run start    # Serveur production
```

---

## Monitoring (Future)

### Métriques à suivre
- Temps de chargement audio
- Taux de conversion (free → premium)
- Sons les plus populaires
- Durée moyenne d'écoute
- Taux de rétention

### Outils suggérés
- Vercel Analytics
- Mixpanel / Amplitude
- Sentry (error tracking)
- Stripe Dashboard

---

Cette architecture est conçue pour être **simple**, **maintenable** et **scalable**. 🚀

