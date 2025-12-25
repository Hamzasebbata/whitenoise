# 📊 Configuration GA4 - Guide complet

## 🎯 Objectif

Configurer Google Analytics 4 pour :
1. ✅ Marquer `premium_click` comme conversion
2. ✅ Analyser les sons les plus populaires (dimension `sound_name`)
3. ✅ Créer une audience "Utilisateurs intéressés par Premium"

---

## 1️⃣ Marquer `premium_click` comme CONVERSION

### Pourquoi ?
Les conversions vous permettent de :
- Mesurer le taux de conversion premium
- Optimiser vos campagnes marketing
- Suivre la valeur de votre site

### Étapes :

#### Option A : Depuis les Événements (Recommandé)

1. **Allez sur** : https://analytics.google.com/
2. **Sélectionnez** votre propriété
3. **Cliquez sur** : Admin (roue dentée en bas à gauche)
4. **Dans la colonne "Propriété"**, cliquez sur : **Événements**
5. **Attendez** que `premium_click` apparaisse dans la liste (peut prendre 24h)
6. **Activez** le bouton "Marquer comme conversion" à côté de `premium_click`

✅ C'est fait ! `premium_click` est maintenant une conversion.

#### Option B : Créer une conversion manuellement

Si `premium_click` n'apparaît pas encore :

1. **Admin** → **Conversions**
2. **Cliquez sur** : "Nouvel événement de conversion"
3. **Nom de l'événement** : `premium_click`
4. **Cliquez sur** : "Enregistrer"

✅ La prochaine fois que quelqu'un cliquera sur un son premium, ce sera compté comme conversion !

---

## 2️⃣ Analyser les sons les plus populaires

### Objectif
Savoir quel son est le plus écouté : "Pluie Douce", "Bruit Blanc", etc.

### Méthode 1 : Rapport Événements avec dimension personnalisée

#### Étapes :

1. **Allez dans** : Rapports → Engagement → Événements

2. **Cliquez sur** l'événement `play_sound`

3. **En haut à droite**, cliquez sur l'icône **crayon** (personnaliser le rapport)

4. **Dans "Dimensions"**, cliquez sur **"+"** (Ajouter une dimension)

5. **Cherchez** : `sound_name`

6. **Sélectionnez** : `sound_name` (paramètre d'événement)

7. **Cliquez sur** : "Appliquer"

✅ Vous verrez maintenant un tableau avec :
```
Son                      Nombre de lectures
─────────────────────────────────────────
Pluie Douce              450
Bruit Blanc              320
Salon de Coiffure        180
Battements de Cœur       95
```

### Méthode 2 : Exploration personnalisée (Plus avancé)

1. **Allez dans** : Explorer (menu de gauche)

2. **Cliquez sur** : "Exploration libre"

3. **Dans "Dimensions"**, ajoutez :
   - Nom de l'événement
   - sound_name (paramètre d'événement personnalisé)

4. **Dans "Métriques"**, ajoutez :
   - Nombre d'événements
   - Utilisateurs actifs

5. **Dans "Lignes"**, glissez : `sound_name`

6. **Dans "Valeurs"**, glissez : `Nombre d'événements`

7. **Ajoutez un filtre** : Nom de l'événement = `play_sound`

✅ Vous aurez un rapport détaillé avec graphiques !

### Méthode 3 : Rapport personnalisé (Le plus complet)

1. **Admin** → **Rapports personnalisés**

2. **Créez un nouveau rapport** : "Sons populaires"

3. **Ajoutez une carte** : "Tableau"

4. **Dimensions** :
   - sound_name
   - sound_id
   - sound_is_premium

5. **Métriques** :
   - Nombre d'événements
   - Utilisateurs uniques
   - Taux d'engagement

6. **Filtres** :
   - Nom de l'événement = `play_sound`

✅ Vous aurez un rapport permanent accessible depuis le menu Rapports !

---

## 3️⃣ Créer une audience "Utilisateurs intéressés par Premium"

### Pourquoi ?
Pour :
- Recibler ces utilisateurs avec des pubs
- Leur envoyer des emails promotionnels
- Mesurer leur comportement

### Étapes :

1. **Allez dans** : Admin → Audiences

2. **Cliquez sur** : "Nouvelle audience"

3. **Choisissez** : "Créer une audience personnalisée"

4. **Nom de l'audience** : `Utilisateurs intéressés par Premium`

5. **Description** : `Utilisateurs qui ont cliqué sur un son premium au moins une fois`

6. **Conditions** :
   - Cliquez sur "Ajouter une condition"
   - Sélectionnez : "Événement"
   - Nom de l'événement : `premium_click`
   - Nombre de fois : `au moins 1`

7. **Durée d'appartenance** : `30 jours` (ou plus selon vos besoins)

8. **Cliquez sur** : "Enregistrer"

✅ L'audience est créée ! Vous pourrez maintenant :
- Voir combien d'utilisateurs sont intéressés par Premium
- Les recibler avec Google Ads
- Analyser leur comportement

### Audience avancée : "Utilisateurs très intéressés"

Pour les utilisateurs qui ont cliqué **plusieurs fois** sur des sons premium :

1. **Créez une nouvelle audience** : `Utilisateurs très intéressés par Premium`

2. **Conditions** :
   - Événement : `premium_click`
   - Nombre de fois : `au moins 3`
   - Dans les : `7 derniers jours`

3. **Ajoutez une condition supplémentaire** (ET) :
   - Événement : `play_sound`
   - Nombre de fois : `au moins 5`

✅ Cette audience contiendra vos utilisateurs les plus engagés !

---

## 4️⃣ Créer des rapports personnalisés utiles

### Rapport 1 : "Taux de conversion Premium"

1. **Explorer** → **Exploration libre**

2. **Métriques** :
   - Nombre d'événements `premium_click`
   - Nombre d'utilisateurs uniques
   - Taux de conversion (premium_click / utilisateurs)

3. **Dimensions** :
   - Date
   - Source/support
   - Appareil

✅ Vous verrez quel canal amène le plus de clics premium !

### Rapport 2 : "Parcours utilisateur avant clic premium"

1. **Explorer** → **Exploration de l'entonnoir**

2. **Étapes** :
   - Étape 1 : `page_view`
   - Étape 2 : `play_sound` (son gratuit)
   - Étape 3 : `premium_click`

✅ Vous verrez combien d'utilisateurs testent un son gratuit avant de cliquer sur premium !

### Rapport 3 : "Sons premium les plus demandés"

1. **Rapports** → **Engagement** → **Événements**

2. **Cliquez sur** : `premium_click`

3. **Ajoutez la dimension** : `sound_name`

✅ Vous saurez quel son premium intéresse le plus les utilisateurs !

---

## 5️⃣ Configurer des alertes personnalisées

### Alerte 1 : "Pic de clics premium"

1. **Admin** → **Alertes personnalisées**

2. **Créez une alerte** :
   - Nom : "Pic de clics premium"
   - Condition : Nombre d'événements `premium_click` > 50 par jour
   - Notification : Email

✅ Vous serez alerté si beaucoup d'utilisateurs cliquent sur premium !

### Alerte 2 : "Baisse d'engagement"

1. **Créez une alerte** :
   - Nom : "Baisse d'engagement"
   - Condition : Nombre d'événements `play_sound` < 100 par jour
   - Notification : Email

✅ Vous saurez si l'engagement baisse !

---

## 6️⃣ Intégrer avec Google Ads (Optionnel)

Si vous faites de la publicité :

1. **Admin** → **Liens vers des produits Google**

2. **Cliquez sur** : "Lier Google Ads"

3. **Sélectionnez** votre compte Google Ads

4. **Activez** : "Audiences", "Conversions", "Remarketing"

✅ Vous pourrez maintenant :
- Recibler l'audience "Intéressés par Premium" avec des pubs
- Optimiser vos campagnes sur la conversion `premium_click`
- Voir le ROI de vos pubs

---

## 7️⃣ Tableau de bord recommandé

Créez un tableau de bord avec ces métriques :

### KPIs principaux :
- **Utilisateurs actifs** (aujourd'hui, 7 jours, 30 jours)
- **Nombre de sons joués** (`play_sound`)
- **Taux de conversion premium** (`premium_click` / utilisateurs)
- **Son le plus populaire** (dimension `sound_name`)

### Graphiques :
- **Évolution des clics premium** (ligne temporelle)
- **Répartition des sons** (camembert)
- **Taux de conversion par source** (tableau)
- **Parcours utilisateur** (entonnoir)

---

## 8️⃣ Checklist de configuration

Cochez au fur et à mesure :

- [ ] `premium_click` marqué comme conversion
- [ ] Rapport "Sons populaires" créé avec dimension `sound_name`
- [ ] Audience "Utilisateurs intéressés par Premium" créée
- [ ] Audience "Utilisateurs très intéressés" créée (optionnel)
- [ ] Rapport "Taux de conversion Premium" créé
- [ ] Rapport "Parcours utilisateur" créé
- [ ] Alerte "Pic de clics premium" configurée
- [ ] Google Ads lié (si applicable)
- [ ] Tableau de bord personnalisé créé

---

## 🎯 Résultats attendus après 7 jours

Vous devriez pouvoir répondre à ces questions :

1. **Quel est le son le plus populaire ?**
   → Réponse dans : Rapports → Événements → `play_sound` → dimension `sound_name`

2. **Combien d'utilisateurs ont cliqué sur premium ?**
   → Réponse dans : Rapports → Conversions → `premium_click`

3. **Quel est le taux de conversion premium ?**
   → Réponse dans : Exploration → Rapport personnalisé

4. **Quel son premium est le plus demandé ?**
   → Réponse dans : Événements → `premium_click` → dimension `sound_name`

5. **Combien d'utilisateurs sont "très intéressés" ?**
   → Réponse dans : Admin → Audiences → "Utilisateurs très intéressés"

---

## 🆘 Aide supplémentaire

Si vous avez besoin d'aide pour configurer :

1. **Documentation GA4** : https://support.google.com/analytics/answer/9304153
2. **Vidéos tutoriels** : YouTube "Google Analytics 4 tutorial"
3. **Communauté** : https://support.google.com/analytics/community

---

## 🎉 Félicitations !

Une fois tout configuré, vous aurez :
- ✅ Un tracking complet de tous les événements
- ✅ Des conversions mesurables
- ✅ Des audiences pour le remarketing
- ✅ Des rapports détaillés sur les sons populaires
- ✅ Des alertes automatiques

Votre site est maintenant **parfaitement optimisé pour l'analyse et la conversion** ! 🚀📊

