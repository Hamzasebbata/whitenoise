# 🔍 Debug GA4 - Guide de dépannage

## ❓ Problème : Je ne vois pas les événements dans GA4

### Étape 1 : Vérifier que gtag est chargé

1. **Ouvrez votre site** : https://baby.dailytoolsfactory.com
2. **Ouvrez la console** : F12 → Console
3. **Tapez** : `gtag`
4. **Résultat attendu** : `function gtag(){dataLayer.push(arguments);}`

✅ Si vous voyez la fonction → gtag est chargé  
❌ Si `undefined` → Le script GA4 ne s'est pas chargé

---

### Étape 2 : Vérifier le dataLayer

1. **Dans la console, tapez** : `dataLayer`
2. **Résultat attendu** : Un array avec des objets
3. **Cliquez sur un son** (ex: Pluie Douce)
4. **Tapez à nouveau** : `dataLayer`
5. **Vérifiez** : Vous devriez voir un nouvel objet avec `event: "play_sound"`

Exemple de ce que vous devriez voir :
```javascript
[
  {0: "js", 1: Date},
  {0: "config", 1: "G-XZLZZ6LGYL"},
  {
    event: "play_sound",
    sound_name: "Pluie Douce",
    sound_id: "rain",
    sound_is_premium: false,
    event_category: "engagement",
    event_label: "Play: Pluie Douce"
  }
]
```

---

### Étape 3 : Vérifier le Network (Réseau)

1. **F12 → Network (Réseau)**
2. **Filtrez par** : `collect`
3. **Cliquez sur un son**
4. **Vérifiez** : Vous devriez voir une requête vers `google-analytics.com/g/collect`

✅ Si vous voyez la requête → L'événement est envoyé à GA4  
❌ Si aucune requête → Problème avec gtag

---

### Étape 4 : Activer le mode Debug

Pour voir les événements en temps réel avec plus de détails :

1. **Dans la console, tapez** :
```javascript
gtag('config', 'G-XZLZZ6LGYL', { debug_mode: true });
```

2. **Rechargez la page**

3. **Allez dans GA4** : Admin → DebugView

4. **Cliquez sur un son**

5. **Vérifiez dans DebugView** : Vous devriez voir l'événement `play_sound` en temps réel

---

### Étape 5 : Vérifier dans GA4 Realtime

⚠️ **IMPORTANT** : Il peut y avoir un délai de 15-30 secondes

1. **Allez sur** : https://analytics.google.com/
2. **Sélectionnez votre propriété**
3. **Cliquez sur** : Rapports → Temps réel (Realtime)
4. **Ouvrez votre site** dans un autre onglet
5. **Cliquez sur un son**
6. **Attendez 15-30 secondes**
7. **Actualisez le rapport Temps réel**

✅ Vous devriez voir :
- 1 utilisateur actif
- Événement : `play_sound`
- Paramètre : `sound_name` = "Pluie Douce"

---

## 🚫 Problèmes courants et solutions

### Problème 1 : gtag is undefined

**Cause** : Le script GA4 ne s'est pas chargé

**Solutions** :
1. Désactivez les bloqueurs de pub (AdBlock, uBlock Origin)
2. Testez en navigation privée
3. Vérifiez que le script est bien dans le `<head>` :
   - Clic droit → Afficher le code source
   - Cherchez : `G-XZLZZ6LGYL`
   - Vérifiez qu'il est en premier dans `<head>`

### Problème 2 : dataLayer est vide

**Cause** : Les événements ne sont pas envoyés

**Solutions** :
1. Vérifiez la console pour des erreurs JavaScript
2. Vérifiez que `typeof window.gtag !== 'undefined'` est true
3. Testez manuellement dans la console :
```javascript
gtag('event', 'test_event', { test_param: 'test_value' });
console.log(dataLayer);
```

### Problème 3 : Événements dans dataLayer mais pas dans GA4

**Cause** : Mauvais Measurement ID ou propriété GA4

**Solutions** :
1. Vérifiez le Measurement ID : `G-XZLZZ6LGYL`
2. Vérifiez que vous êtes dans la bonne propriété GA4
3. Attendez 24-48 heures (délai de traitement pour les rapports standards)
4. Utilisez DebugView pour voir en temps réel

### Problème 4 : Bloqueurs de pub

**Cause** : AdBlock, uBlock Origin, Brave Shield bloquent GA4

**Solutions** :
1. Désactivez temporairement les bloqueurs
2. Testez en navigation privée
3. Testez sur un autre navigateur (Safari, Edge)
4. Ajoutez votre site en liste blanche

---

## ✅ Checklist de vérification

Cochez au fur et à mesure :

- [ ] Le script GA4 est dans le `<head>` (vérifier code source)
- [ ] `gtag` existe dans la console (taper `gtag`)
- [ ] `dataLayer` existe dans la console (taper `dataLayer`)
- [ ] Pas de bloqueur de pub actif
- [ ] Navigation privée testée
- [ ] Network montre des requêtes vers `google-analytics.com`
- [ ] DebugView activé (mode debug)
- [ ] Événement visible dans DebugView
- [ ] Événement visible dans Realtime (attendre 30 sec)

---

## 🎯 Test manuel dans la console

Pour tester si gtag fonctionne, tapez ceci dans la console :

```javascript
// Test 1 : Vérifier gtag
console.log('gtag exists:', typeof gtag !== 'undefined');

// Test 2 : Envoyer un événement test
gtag('event', 'test_play_sound', {
  sound_name: 'Test Pluie',
  sound_id: 'test',
  test: true
});

// Test 3 : Vérifier dataLayer
console.log('dataLayer:', dataLayer);

// Test 4 : Vérifier le dernier événement
console.log('Last event:', dataLayer[dataLayer.length - 1]);
```

**Résultat attendu** :
```
gtag exists: true
dataLayer: Array(5) [...]
Last event: {event: "test_play_sound", sound_name: "Test Pluie", ...}
```

---

## 📊 Vérifier dans GA4 après 24h

Si les événements sont dans dataLayer mais pas dans GA4 Realtime :

1. **Attendez 24-48 heures** (délai de traitement)
2. **Allez dans** : Rapports → Engagement → Événements
3. **Cherchez** : `play_sound`, `premium_click`, etc.

⚠️ Les rapports standards ont un délai de 24-48h  
✅ Realtime et DebugView sont instantanés (15-30 sec)

---

## 🆘 Si rien ne fonctionne

1. **Vérifiez que vous êtes sur la bonne propriété GA4**
   - Admin → Informations sur la propriété
   - Vérifiez l'ID : G-XZLZZ6LGYL

2. **Vérifiez que la collecte de données est activée**
   - Admin → Flux de données
   - Vérifiez que le flux est actif

3. **Testez avec Google Tag Assistant**
   - Installez l'extension Chrome "Tag Assistant Legacy"
   - Ouvrez votre site
   - Vérifiez que GA4 est détecté

4. **Contactez-moi avec ces informations** :
   - Screenshot de la console (avec `gtag` et `dataLayer`)
   - Screenshot du Network (requêtes `collect`)
   - Screenshot de GA4 Realtime
   - Navigateur et version
   - Bloqueurs de pub actifs

---

## 🎉 Quand ça fonctionne

Vous devriez voir dans GA4 Realtime :

```
Utilisateurs actifs : 1
Événements (dernières 30 minutes) :
  ├─ play_sound (3)
  ├─ pause_sound (1)
  ├─ set_timer (1)
  └─ page_view (1)

Événement : play_sound
  ├─ sound_name: "Pluie Douce"
  ├─ sound_id: "rain"
  ├─ sound_is_premium: false
  └─ event_category: "engagement"
```

✅ Si vous voyez ça, tout fonctionne parfaitement ! 🎉

