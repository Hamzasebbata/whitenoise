# 🚀 Quick Start - WhiteNoise Baby

## En 3 minutes, votre app est prête !

---

## ✅ Étape 1 : Vérifier que tout est installé

```bash
# Vous êtes ici : /Users/hamza/Dailytoolsempire/whitenoise

# Vérifiez que les dépendances sont installées
ls node_modules | wc -l
# Devrait afficher un nombre > 300
```

**✅ C'est bon !** Les packages sont déjà installés.

---

## 🎵 Étape 2 : Ajouter les fichiers audio

### Option A : Télécharger des sons gratuits (5 minutes)

1. Allez sur [Freesound.org](https://freesound.org/)
2. Cherchez "white noise" et "rain"
3. Téléchargez 2 fichiers MP3
4. Renommez-les :
   - `white-noise.mp3`
   - `rain.mp3`
5. Placez-les dans `public/sounds/`

### Option B : Utiliser des sons de test (1 minute)

Si vous voulez juste tester l'interface sans audio :

```bash
# Créez des fichiers vides (juste pour tester)
touch public/sounds/white-noise.mp3
touch public/sounds/rain.mp3
```

⚠️ **Note :** Avec des fichiers vides, l'audio ne jouera pas, mais l'interface fonctionnera.

---

## 🚀 Étape 3 : Lancer l'application

```bash
npm run dev
```

**Résultat attendu :**
```
> whitenoise@0.1.0 dev
> next dev

⚠ Port 3000 is in use, using port 3001 instead.
✓ Ready in 2.5s
○ Local:   http://localhost:3001
```

---

## 🌐 Étape 4 : Ouvrir dans le navigateur

Ouvrez **http://localhost:3001**

Vous devriez voir :
- 🏠 **Écran Player** avec un cercle qui respire
- 🎵 **Bottom Nav** avec 3 onglets
- 🌧️ **Emoji** du son actuel

---

## 🧪 Étape 5 : Tester les fonctionnalités

### Test 1 : Player
1. Cliquez sur le bouton Play ▶️
2. Le cercle doit s'animer
3. L'icône doit changer en Pause ⏸️

### Test 2 : Minuteur
1. Cliquez sur "Minuteur"
2. Une modal doit s'ouvrir
3. Sélectionnez "15 minutes"
4. Le bouton doit afficher "15 min"

### Test 3 : Bibliothèque
1. Cliquez sur "Sons" (Bottom Nav)
2. Vous devez voir 7 cartes de sons
3. Les 2 premiers sont gratuits (pas de cadenas)
4. Les 5 autres ont un cadenas 🔒

### Test 4 : Sons gratuits
1. Cliquez sur "Bruit Blanc" ou "Pluie"
2. Vous devez revenir au Player
3. Le son doit se lancer (si vous avez les MP3)

### Test 5 : Sons premium
1. Cliquez sur "Sèche-cheveux" (avec cadenas)
2. Une modal Premium doit s'ouvrir
3. Fermez avec le bouton X

### Test 6 : Écran Premium
1. Cliquez sur "Premium" (Bottom Nav)
2. Vous devez voir la page avec la Crown 👑
3. Scrollez pour voir les features et les plans

---

## ✅ Tout fonctionne ?

### 🎉 OUI → Félicitations !

Votre MVP est prêt ! Prochaines étapes :

1. **Ajoutez de vrais sons MP3** (si pas encore fait)
2. **Testez sur mobile** (voir ci-dessous)
3. **Déployez sur Vercel** (voir SETUP.md)

### ❌ NON → Dépannage

#### Problème : Le serveur ne démarre pas
```bash
# Supprimez le cache et relancez
rm -rf .next
npm run dev
```

#### Problème : Erreur TypeScript
```bash
# Vérifiez les erreurs
npx tsc --noEmit
```

#### Problème : Les sons ne jouent pas
- Vérifiez que les MP3 sont dans `public/sounds/`
- Vérifiez les noms de fichiers (sensibles à la casse)
- Ouvrez la console (F12) pour voir les erreurs

#### Problème : L'animation ne fonctionne pas
- Vérifiez que le son est en lecture (isPlaying = true)
- Rechargez la page (Cmd+R ou Ctrl+R)

---

## 📱 Test sur Mobile

### Méthode 1 : Même réseau WiFi

1. Trouvez votre IP locale :
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Sur votre téléphone, ouvrez :
```
http://[votre-ip]:3001
```

Exemple : `http://192.168.1.100:3001`

### Méthode 2 : Tunnel ngrok

```bash
npx ngrok http 3001
```

Utilisez l'URL fournie (ex: `https://abc123.ngrok.io`)

---

## 🎨 Personnalisation Rapide

### Changer le nom du son par défaut

Éditez `lib/sounds-data.ts` :
```typescript
{
  id: 'white-noise',
  name: 'Mon Super Bruit Blanc', // ← Changez ici
  icon: '🌫️',
  audioUrl: '/sounds/white-noise.mp3',
  isPremium: false,
}
```

### Ajouter un nouveau son

Éditez `lib/sounds-data.ts` :
```typescript
{
  id: 'ocean',
  name: 'Océan',
  icon: '🌊',
  audioUrl: '/sounds/ocean.mp3',
  isPremium: true, // ou false
}
```

### Changer les couleurs

Éditez `app/globals.css` ou utilisez les classes Tailwind :
- `bg-slate-950` → `bg-gray-950`
- `text-blue-500` → `text-purple-500`

---

## 📚 Documentation Complète

Pour aller plus loin :

- **[README.md](./README.md)** - Vue d'ensemble
- **[SETUP.md](./SETUP.md)** - Configuration détaillée
- **[MVP_COMPLETE.md](./MVP_COMPLETE.md)** - Documentation complète
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture technique
- **[SCREENS_GUIDE.md](./SCREENS_GUIDE.md)** - Guide visuel
- **[CHECKLIST.md](./CHECKLIST.md)** - Checklist de lancement

---

## 🆘 Besoin d'aide ?

### Commandes utiles

```bash
# Voir les logs du serveur
npm run dev

# Build production
npm run build

# Lancer en production
npm run start

# Vérifier les erreurs
npm run lint

# Nettoyer le cache
rm -rf .next node_modules
npm install
```

### Fichiers importants

- `app/page.tsx` - Écran Player
- `app/sounds/page.tsx` - Bibliothèque
- `lib/sounds-data.ts` - Données des sons
- `contexts/AudioContext.tsx` - État global

---

## 🎯 Checklist Rapide

Avant de partager votre app :

- [ ] ✅ Les sons MP3 sont ajoutés
- [ ] ✅ L'audio fonctionne
- [ ] ✅ Testé sur Chrome
- [ ] ✅ Testé sur Safari
- [ ] ✅ Testé sur mobile
- [ ] ✅ Toutes les animations fonctionnent
- [ ] ✅ Les modales s'ouvrent/ferment
- [ ] ✅ La navigation fonctionne
- [ ] ✅ Le minuteur fonctionne
- [ ] ✅ Pas d'erreurs dans la console

---

## 🚀 Déploiement Express (5 minutes)

### Vercel (Recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI :
```bash
npm i -g vercel
```

3. Déployez :
```bash
vercel --prod
```

4. Suivez les instructions
5. Votre app est en ligne ! 🎉

---

## 🎉 Vous êtes prêt !

Votre application **WhiteNoise Baby** est maintenant fonctionnelle.

**Prochaines étapes :**
1. Ajoutez de vrais sons de qualité
2. Testez avec de vrais parents
3. Collectez les retours
4. Itérez et améliorez
5. Monétisez ! 💰

**Bon lancement ! 🚀👶💤**

---

*Temps total estimé : 3-10 minutes (selon si vous avez les MP3)*

