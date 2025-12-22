# 📱 Guide Visuel des Écrans

## Vue d'ensemble des 3 écrans principaux

---

## 🏠 Écran 1 : PLAYER (Accueil)
**Route:** `/` (http://localhost:3001)

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         🌧️ Pluie                   │
│      Bruit blanc apaisant           │
│                                     │
│                                     │
│          ╭───────────╮              │
│        ╱             ╲              │
│       │    ╭─────╮    │             │
│       │   │  🌧️  │   │             │  ← Animation qui respire
│       │    ╰─────╯    │             │    (cercles concentriques)
│        ╲             ╱              │
│          ╰───────────╯              │
│                                     │
│                                     │
│              ⏸️                     │  ← Bouton GÉANT Play/Pause
│         (120px × 120px)             │    (change selon l'état)
│                                     │
│                                     │
│        ┌─────────────────┐          │
│        │  ⏰  Minuteur    │          │  ← Bouton Minuteur
│        └─────────────────┘          │
│                                     │
│                                     │
├─────────────────────────────────────┤
│   🎵       🎵       👑              │  ← Bottom Navigation
│  Player   Sons   Premium            │    (toujours visible)
└─────────────────────────────────────┘
```

### Éléments interactifs :
- **Nom du son** : Affiche le son en cours
- **Animation centrale** : Pulse quand la musique joue
- **Bouton Play/Pause** : Toggle la lecture
- **Bouton Minuteur** : Ouvre la modal de sélection

### États :
- **isPlaying = true** : Animation active, icône Pause
- **isPlaying = false** : Animation arrêtée, icône Play
- **Timer actif** : Affiche "15 min" au lieu de "Minuteur"

---

## 🎵 Écran 2 : SONS (Bibliothèque)
**Route:** `/sounds`

```
┌─────────────────────────────────────┐
│  Bibliothèque de Sons               │
│  Choisissez un son pour apaiser...  │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │          │  │          │        │
│  │   🌫️    │  │   🌧️    │        │  ← Sons GRATUITS
│  │          │  │          │        │    (pas de cadenas)
│  │  Bruit   │  │  Pluie   │        │
│  │  Blanc   │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │    🔒   │  │    🔒   │        │
│  │   💨    │  │   🌊    │        │  ← Sons PREMIUM
│  │          │  │          │        │    (avec cadenas)
│  │  Sèche-  │  │  Vagues  │        │
│  │  cheveux │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │    🔒   │  │    🔒   │        │
│  │   💗    │  │   🍃    │        │
│  │          │  │          │        │
│  │ Battements│  │   Vent   │        │
│  │ de cœur  │  │          │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐                       │
│  │    🔒   │                       │
│  │   🚂    │                       │
│  │          │                       │
│  │  Train   │                       │
│  └──────────┘                       │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🔒  Débloquez tous les sons│   │  ← CTA Premium
│  │                              │   │
│  │  Accédez à 5 sons premium...│   │
│  │                              │   │
│  │  [Voir Premium]              │   │
│  └─────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│   🎵       🎵       👑              │
│  Player   Sons   Premium            │
└─────────────────────────────────────┘
```

### Éléments interactifs :
- **Cartes de sons** : Grille 2 colonnes
- **Badge cadenas** : Top-right sur les sons premium
- **Clic sur gratuit** : Lance le son + retour au Player
- **Clic sur premium** : Ouvre la PremiumModal
- **CTA Premium** : En bas, ouvre aussi la modal

### Logique :
```typescript
if (sound.isPremium) {
  setShowPremiumModal(true);  // Paywall
} else {
  playSound(sound);           // Lance directement
  router.push('/');           // Retour au Player
}
```

---

## 👑 Écran 3 : PREMIUM (Paywall)
**Route:** `/premium`

```
┌─────────────────────────────────────┐
│                                     │
│            ╭─────╮                  │
│           │  👑  │                  │  ← Icône Crown animée
│            ╰─────╯                  │    (pulse-slow)
│                                     │
│     WhiteNoise Premium              │
│  L'expérience ultime pour des...   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 🎵          │ │ 🚫          │   │
│  │ Tous les    │ │ Sans        │   │  ← Features Grid
│  │ sons premium│ │ publicité   │   │    (6 features)
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ ⏰          │ │ 📱          │   │
│  │ Minuteur    │ │ Mode hors   │   │
│  │ avancé      │ │ ligne       │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 🎚️          │ │ 🌙          │   │
│  │ Contrôle du │ │ Mode nuit   │   │
│  │ volume      │ │ optimisé    │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Mensuel                     │   │
│  │  4,99€/mois                  │   │  ← Plans tarifaires
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ✨ PLUS POPULAIRE           │   │
│  │  Annuel    Économisez 33%    │   │
│  │  39,99€/an                   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Commencer l'essai gratuit   │   │  ← CTA principal
│  └─────────────────────────────┘   │
│                                     │
│  7 jours gratuits, puis 4,99€/mois │
│                                     │
│  ✓ Sans engagement                 │  ← Trust badges
│  ✓ Paiement sécurisé               │
│                                     │
├─────────────────────────────────────┤
│   🎵       🎵       👑              │
│  Player   Sons   Premium            │
└─────────────────────────────────────┘
```

### Éléments interactifs :
- **Icône Crown** : Animation pulse-slow
- **Features** : 6 cartes avec icônes
- **Plans** : 2 options (mensuel/annuel)
- **Badge "Plus Populaire"** : Sur le plan annuel
- **Bouton CTA** : "Commencer l'essai gratuit"

### Design :
- Dégradé bleu-violet sur le plan populaire
- Icône Crown avec dégradé jaune-orange
- Trust badges en bas

---

## 🎭 Modales

### Modal 1 : TIMER
**Déclenchée par :** Bouton "Minuteur" sur le Player

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│  ╭─────────────────────────────╮   │
│  │  ⏰  Minuteur            ✕  │   │  ← Header
│  │                             │   │
│  │  ┌───────────────────────┐ │   │
│  │  │    15 minutes         │ │   │  ← Options
│  │  └───────────────────────┘ │   │
│  │                             │   │
│  │  ┌───────────────────────┐ │   │
│  │  │    30 minutes         │ │   │
│  │  └───────────────────────┘ │   │
│  │                             │   │
│  │  ┌───────────────────────┐ │   │
│  │  │    60 minutes         │ │   │
│  │  └───────────────────────┘ │   │
│  │                             │   │
│  │  ┌───────────────────────┐ │   │
│  │  │    Infini             │ │   │
│  │  └───────────────────────┘ │   │
│  ╰─────────────────────────────╯   │
│                                     │
│  [Bottom Nav reste visible]         │
└─────────────────────────────────────┘
```

### Modal 2 : PREMIUM
**Déclenchée par :** Clic sur son premium ou CTA

```
┌─────────────────────────────────────┐
│                                     │
│  ╭─────────────────────────────╮   │
│  │                        ✕    │   │  ← Bouton fermer
│  │         ╭─────╮             │   │
│  │        │  👑  │             │   │  ← Crown icon
│  │         ╰─────╯             │   │
│  │                             │   │
│  │  WhiteNoise Premium         │   │
│  │  Débloquez tous les sons... │   │
│  │                             │   │
│  │  ✓ Accès à tous les sons    │   │
│  │  ✓ Pas de publicités        │   │  ← Features
│  │  ✓ Minuteur personnalisé    │   │
│  │  ✓ Mode hors ligne          │   │
│  │  ✓ Sons haute qualité       │   │
│  │                             │   │
│  │  ┌───────────────────────┐ │   │
│  │  │ Essai gratuit 7 jours │ │   │  ← CTA
│  │  └───────────────────────┘ │   │
│  │                             │   │
│  │  Puis 4,99€/mois.           │   │
│  │  Annulez à tout moment.     │   │
│  ╰─────────────────────────────╯   │
└─────────────────────────────────────┘
```

---

## 🎨 Palette de Couleurs

### Fond
- **Écran principal** : `bg-slate-950` (#020617)
- **Cartes/Surfaces** : `bg-slate-900` (#0f172a)
- **Hover** : `bg-slate-800` (#1e293b)

### Textes
- **Titres** : `text-slate-100` (#f1f5f9)
- **Corps** : `text-slate-300` (#cbd5e1)
- **Secondaire** : `text-slate-400` (#94a3b8)
- **Tertiaire** : `text-slate-500` (#64748b)

### Accents
- **Primaire** : `text-blue-400/500` (#60a5fa / #3b82f6)
- **Premium** : Dégradé `from-yellow-400 to-orange-500`
- **Succès** : `text-green-400` (#4ade80)

### Bordures
- **Subtile** : `border-slate-800` (#1e293b)
- **Active** : `border-blue-500` (#3b82f6)

---

## 📐 Espacements & Tailles

### Boutons
- **Géant (Play/Pause)** : 120px × 120px
- **Gros (Timer)** : padding 16px (py-4 px-8)
- **Normal** : padding 12px (py-3 px-6)

### Coins arrondis
- **Cartes** : `rounded-3xl` (24px)
- **Boutons** : `rounded-2xl` (16px)
- **Badges** : `rounded-full`

### Grille de sons
- **Colonnes** : 2 (grid-cols-2)
- **Gap** : 16px (gap-4)
- **Aspect ratio** : 1:1 (carrés)

---

## 🎬 Animations

### 1. Breathe (Cercle central)
```
Durée : 4s
Effet : Scale 1 → 1.15 → 1
Opacité : 0.3 → 0.5 → 0.3
Timing : ease-in-out
Loop : infinite
```

### 2. Ping Slow (Onde externe)
```
Durée : 3s
Effet : Scale 1 → 1.3
Opacité : 0.3 → 0
Timing : cubic-bezier
Loop : infinite
```

### 3. Pulse Slow (Crown)
```
Durée : 3s
Effet : Opacité 1 → 0.7 → 1
Timing : ease-in-out
Loop : infinite
```

### 4. Slide Up (Modales)
```
Durée : 0.3s
Effet : translateY(100%) → 0
Opacité : 0 → 1
Timing : ease-out
Loop : once
```

---

## 🔄 États Visuels

### Player
| État | Animation | Bouton | Timer |
|------|-----------|--------|-------|
| Idle | Arrêtée | Play ▶️ | "Minuteur" |
| Playing | Active | Pause ⏸️ | "Minuteur" |
| Playing + Timer | Active | Pause ⏸️ | "15 min" |
| Paused + Timer | Arrêtée | Play ▶️ | "15 min" |

### Sons
| Type | Badge | Action |
|------|-------|--------|
| Gratuit | Aucun | Lance + Navigate |
| Premium | 🔒 | Ouvre modal |

### Bottom Nav
| Onglet | Actif | Inactif |
|--------|-------|---------|
| Player | `text-blue-400` | `text-slate-400` |
| Sons | `text-blue-400` | `text-slate-400` |
| Premium | `text-blue-400` | `text-slate-400` |

---

## 📱 Responsive Design

### Mobile First (< 768px)
- Grille 2 colonnes pour les sons
- Bottom Nav fixe en bas
- Modales plein écran
- Touch targets > 44px

### Tablet (768px - 1024px)
- Grille 3 colonnes pour les sons
- Max-width 2xl (672px) centré
- Même layout que mobile

### Desktop (> 1024px)
- Grille 4 colonnes pour les sons
- Max-width 2xl (672px) centré
- Hover states visibles

---

## 🎯 Points d'Attention UX

### 1. Feedback Immédiat
- ✓ Clic sur son → Lance immédiatement
- ✓ Play/Pause → Changement instantané
- ✓ Navigation → Pas de loading

### 2. État Persistant
- ✓ Audio continue entre les écrans
- ✓ Timer reste actif
- ✓ Sélection conservée

### 3. Accessibilité
- ✓ Contraste élevé (WCAG AA)
- ✓ Boutons sémantiques
- ✓ Touch targets adaptés
- ✓ Focus visible

### 4. Performance
- ✓ Animations 60fps (GPU)
- ✓ Pas de layout shift
- ✓ Chargement audio optimisé

---

## 🔍 Détails Techniques

### Icônes (Lucide React)
- **PlayCircle** : 120px sur Player
- **PauseCircle** : 120px sur Player
- **Clock** : 24px sur bouton Timer
- **Music** : 28px sur Bottom Nav
- **Crown** : 28px sur Bottom Nav, 40px sur Premium
- **Lock** : 16px sur badges, 24px sur CTA
- **Check** : 16px sur features

### Emojis
- **Bruit Blanc** : 🌫️
- **Pluie** : 🌧️
- **Sèche-cheveux** : 💨
- **Vagues** : 🌊
- **Battements** : 💗
- **Vent** : 🍃
- **Train** : 🚂

---

Cette documentation visuelle vous permet de comprendre exactement à quoi ressemble chaque écran ! 🎨

