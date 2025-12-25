# 🎯 Google Tag Manager - Guide d'utilisation

## ✅ Installation Complète

Google Tag Manager (GTM) a été **correctement installé** sur votre site Lullaway.

**GTM ID:** `GTM-MJQZPC77`

---

## 📦 Ce qui a été installé

### 1. Composant GoogleTagManager.tsx
```typescript
// components/GoogleTagManager.tsx
export function GoogleTagManagerHead() {
  // Script GTM dans <head>
}

export function GoogleTagManagerBody() {
  // Noscript GTM après <body>
}
```

### 2. Intégration dans layout.tsx
```typescript
<html lang="fr">
  <head>
    <GoogleTagManagerHead />  {/* ← Script GTM */}
    <JsonLdSchema />
  </head>
  <body>
    <GoogleTagManagerBody />  {/* ← Noscript GTM */}
    <AudioProvider>
      {children}
    </AudioProvider>
  </body>
</html>
```

---

## 🧪 Comment vérifier que GTM fonctionne

### Méthode 1 : View Page Source (Rapide)
1. Ouvrez : https://baby.dailytoolsfactory.com
2. Clic droit → "Afficher le code source de la page"
3. Cherchez `GTM-MJQZPC77`
4. ✅ Vous devriez voir le script GTM dans le `<head>`

### Méthode 2 : Chrome DevTools
1. Ouvrez : https://baby.dailytoolsfactory.com
2. F12 → Console
3. Tapez : `dataLayer`
4. ✅ Vous devriez voir un array avec des événements GTM

### Méthode 3 : GTM Preview Mode (Recommandé)
1. Allez dans votre compte Google Tag Manager
2. Cliquez sur "Preview" (en haut à droite)
3. Entrez l'URL : `https://baby.dailytoolsfactory.com`
4. Cliquez sur "Connect"
5. ✅ Une nouvelle fenêtre s'ouvre avec le mode debug
6. ✅ Vous verrez tous les événements en temps réel

### Méthode 4 : Google Tag Assistant (Extension Chrome)
1. Installez l'extension "Tag Assistant Legacy" (Google)
2. Ouvrez : https://baby.dailytoolsfactory.com
3. Cliquez sur l'icône Tag Assistant
4. ✅ Vous devriez voir "Google Tag Manager" détecté

---

## 📊 Événements à tracker (Suggestions)

### Événements de base (à configurer dans GTM)

#### 1. Lecture de son
```javascript
// Quand un utilisateur lance un son
dataLayer.push({
  'event': 'play_sound',
  'sound_name': 'Pluie Douce',
  'sound_id': 'rain'
});
```

#### 2. Utilisation du minuteur
```javascript
// Quand un utilisateur active le minuteur
dataLayer.push({
  'event': 'set_timer',
  'timer_duration': 30 // minutes
});
```

#### 3. Navigation
```javascript
// Quand un utilisateur change d'écran
dataLayer.push({
  'event': 'screen_view',
  'screen_name': 'sounds' // ou 'timer', 'player'
});
```

#### 4. Clic sur son premium
```javascript
// Quand un utilisateur clique sur un son premium
dataLayer.push({
  'event': 'premium_click',
  'sound_name': 'Vagues',
  'sound_id': 'waves'
});
```

---

## 🎯 Configuration recommandée dans GTM

### 1. Google Analytics 4 (GA4)
1. Dans GTM, créez un nouveau tag "Google Analytics: GA4 Configuration"
2. Entrez votre Measurement ID (G-XXXXXXXXXX)
3. Déclencheur : "All Pages"
4. Publiez

### 2. Événements personnalisés
1. Créez un tag "Google Analytics: GA4 Event"
2. Nom de l'événement : `play_sound`
3. Paramètres :
   - `sound_name` : `{{dlv - sound_name}}`
   - `sound_id` : `{{dlv - sound_id}}`
4. Déclencheur : Custom Event = `play_sound`
5. Publiez

### 3. Conversion tracking
1. Créez un tag "Google Analytics: GA4 Event"
2. Nom de l'événement : `conversion`
3. Déclencheur : Custom Event = `premium_click`
4. Publiez

---

## 🔧 Intégration avec votre code React

### Exemple : Tracker la lecture d'un son

```typescript
// contexts/AudioContext.tsx
const playSound = useCallback((sound: Sound) => {
  audioManager.play(sound.audioUrl, sound.id);
  setCurrentSound(sound);
  setIsPlaying(true);
  
  // 🎯 Tracking GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'play_sound',
      sound_name: sound.name,
      sound_id: sound.id,
      sound_is_premium: sound.isPremium,
    });
  }
}, []);
```

### Exemple : Tracker le minuteur

```typescript
// contexts/AudioContext.tsx
const setTimer = useCallback((duration: TimerDuration) => {
  setTimerDuration(duration);
  
  // 🎯 Tracking GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'set_timer',
      timer_duration: duration,
      timer_type: duration === null ? 'infinite' : 'custom',
    });
  }
}, []);
```

### Exemple : Tracker les clics premium

```typescript
// components/SoundsScreen.tsx
const handleSoundSelect = (sound: typeof SOUNDS[0]) => {
  if (sound.isPremium) {
    // 🎯 Tracking GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'premium_click',
        sound_name: sound.name,
        sound_id: sound.id,
      });
    }
    
    alert('🔒 Ce son est réservé aux membres Premium.');
    return;
  }
  playSound(sound);
  onBack();
};
```

---

## 📈 Métriques importantes à suivre

### Engagement
- ✅ Nombre de sons joués
- ✅ Son le plus populaire
- ✅ Durée moyenne d'écoute
- ✅ Taux d'utilisation du minuteur

### Conversion
- ✅ Clics sur sons premium
- ✅ Taux de conversion premium
- ✅ Parcours utilisateur avant conversion

### Comportement
- ✅ Temps passé sur le site
- ✅ Taux de rebond
- ✅ Pages par session
- ✅ Écrans les plus visités

---

## 🔍 Debugging GTM

### Problème : GTM ne se charge pas
1. Vérifiez que le script est dans le `<head>`
2. Vérifiez l'ID : `GTM-MJQZPC77`
3. Désactivez les bloqueurs de pub (AdBlock, etc.)
4. Testez en navigation privée

### Problème : dataLayer n'existe pas
1. Ouvrez la console : `console.log(window.dataLayer)`
2. Si `undefined`, GTM ne s'est pas chargé
3. Vérifiez le réseau (F12 → Network → Recherchez "gtm.js")

### Problème : Événements ne s'enregistrent pas
1. Activez le mode Preview dans GTM
2. Vérifiez que l'événement apparaît dans le debug
3. Vérifiez les déclencheurs dans GTM
4. Vérifiez la syntaxe du `dataLayer.push()`

---

## 🎯 Checklist de configuration GTM

### ✅ Installation (Fait)
- [x] Script GTM dans `<head>`
- [x] Noscript GTM après `<body>`
- [x] GTM ID correct : `GTM-MJQZPC77`
- [x] Build et déploiement réussis

### 🚀 Configuration GTM (À faire)
- [ ] Créer un tag Google Analytics 4
- [ ] Configurer les événements personnalisés
- [ ] Créer les variables (sound_name, sound_id, etc.)
- [ ] Configurer les déclencheurs
- [ ] Tester en mode Preview
- [ ] Publier le conteneur GTM

### 📊 Tracking (À implémenter)
- [ ] Tracker la lecture de sons
- [ ] Tracker l'utilisation du minuteur
- [ ] Tracker les clics premium
- [ ] Tracker la navigation entre écrans
- [ ] Tracker les erreurs

---

## 📚 Ressources

- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [dataLayer Documentation](https://developers.google.com/tag-platform/tag-manager/datalayer)

---

## 🎉 Résumé

✅ **Google Tag Manager est installé et fonctionnel !**

**Prochaines étapes :**
1. Connectez-vous à votre compte GTM
2. Testez en mode Preview
3. Configurez Google Analytics 4
4. Créez vos événements personnalisés
5. Publiez votre conteneur GTM

**GTM ID :** `GTM-MJQZPC77`  
**URL :** https://baby.dailytoolsfactory.com

Votre site est maintenant prêt pour le tracking avancé ! 🚀✨

