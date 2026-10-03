# Prompts de narration IA — Français (12 prompts)

> Collez d'abord le BLOC DE RÈGLES (de `00-how-to-use.md`) et remplacez chaque `[COLLER: …]`
> par vos données réelles. Le résultat est un brouillon : à relire avant tout envoi au client.

```
Tu rédiges pour un rapport mensuel client. Règles non négociables :
1. Utilise UNIQUEMENT les chiffres que je fournis. N'invente, n'estime et n'extrapole rien.
   S'il manque une donnée, écris [DONNÉE MANQUANTE : laquelle] au lieu de deviner.
2. Langage clair pour un dirigeant d'entreprise, jargon expliqué en quelques mots.
3. Ton professionnel, calme et précis. Aucune exagération.
4. Voix active. Nomme la page, la requête, le canal ou la campagne concernés.
5. Sépare observation et hypothèse : les hypothèses commencent par « nous pensons » ou
   « probablement ».
6. Évolutions signées (+12,4 % / -3,1 %), une décimale. Position moyenne : plus bas =
   mieux — dis-le explicitement.
7. Respecte la longueur exacte demandée.
```

**1 — Synthèse exécutive.** `[COLLER : tableau KPI du mois vs mois précédent + travail livré]`

```
Rédige le paragraphe de synthèse exécutive du rapport mensuel. Client : [NOM], [SECTEUR].
Mois : [MOIS ANNÉE]. [COLLER : tableau KPI] Travail livré : [COLLER : 1 à 3 points]
Écris 3–4 phrases : (1) le chiffre qui définit le mois, avec sa variation exacte ; (2) le
principal moteur, rattaché à une page/requête/campagne précise ; (3) le contrepoint honnête
(ce qui a moins bien fonctionné ou stagné) ; (4) ce que cela prépare pour le mois prochain,
sans promesses. Termine par 3 puces : les trois chiffres à retenir.
```

**2 — Évolution d'un mois sur l'autre.** `[COLLER : sessions par canal + top 5 pages d'entrée]`

```
Explique l'évolution du trafic d'un mois sur l'autre. [COLLER : données]
Écris 4–6 phrases : quel canal explique l'essentiel de la variation (calcule la part depuis mes
données), quelles pages en sont responsables (nommées), distingue le saisonnier du nouveau et,
si une partie a baissé, dis où ces sessions sont allées. N'invente aucune cause : si mes données
ne montrent pas le pourquoi, écris « nous sommes en train d'investiguer ».
```

**3 — Expliquer une chute de trafic.** `[COLLER : sessions par semaine/jour des deux mois, canaux, changements connus]`

```
Le trafic du client a baissé. Rédige la section d'explication. Client : [NOM]. Baisse :
[ex. -18,4 %]. [COLLER : données]
Écris 4–6 phrases : (1) énonce la baisse clairement, avec le chiffre exact ; (2) isole QUAND
elle a eu lieu et si elle fut brutale ou progressive ; (3) avec mes données, sépare les trois
causes possibles — changement de mesure, changement sur le site, demande/saisonnalité — et dis
laquelle les éléments soutiennent ; (4) termine par l'étape de diagnostic déjà en cours.
Ton : calme et maîtrisé.
```

**4 — Expliquer un pic de trafic.** `[COLLER : sessions par semaine/jour, pages top, canaux]`

```
Le trafic a fortement augmenté. Rédige l'explication sans nous attribuer le mérite trop vite.
[COLLER : données]
Écris 4–6 phrases : quantifie le pic (variation exacte + quand), attribue-le précisément
(pages, canal, requête si visible), sépare les causes ponctuelles (mention virale, presse,
saisonnalité) des causes reproductibles (nouveaux positionnements, campagne) et conclus sur la
manière dont nous vérifierons si cela tient. N'avance aucune cause non étayée par mes données.
```

**5 — Narration de la performance search.** `[COLLER : clics, impressions, CTR, position moyenne (deux mois), top 5 requêtes, top 5 pages]`

```
Rédige la section d'interprétation de la page Search Console. Ne répète pas le tableau :
interprète-le. [COLLER : données]
Réponds en 4–6 phrases : (1) les clics ont-ils bougé grâce aux impressions (plus de demande
couverte) ou grâce au CTR (nos titres gagnent) ? Explique le calcul simplement ; (2) quelle
requête ou page explique l'essentiel de la variation ; (3) qu'a fait la position moyenne et que
cela signifie concrètement (rappel : plus bas = mieux) ; (4) une ouverture vers les requêtes de
page 2 si je les ai fournies.
```

**6 — Brief d'opportunités mots-clés.** `[COLLER : 5–10 requêtes positions 11–20 avec impressions et page]`

```
Rédige un court brief « victoires rapides » à partir de ces positionnements en page 2.
[COLLER : données]
Pour chaque requête (max 5), 2 phrases : pourquoi elle est prenable (position actuelle +
impressions) et l'amélioration précise envisagée (ajouter une FAQ, retravailler le title pour
le CTR, liens internes depuis [page liée], développer la section qui répond à l'intention).
Conclus : ce sont des hypothèses ; les positions bougent en semaines, pas en jours.
Trie par impressions.
```

**7 — L'histoire des conversions.** `[COLLER : tableau des événements clés, conversions par canal, taux de conversion des deux mois]`

```
Rédige la section « histoire des conversions ». Client : [NOM], [TYPE D'ACTIVITÉ]. [COLLER : données]
Écris 5–7 phrases : (1) le titre : conversions totales avec variation exacte, et le taux a-t-il
suivi (plus de trafic ou meilleur trafic ?) ; (2) quel type de conversion a tiré la croissance,
sur quelles pages ; (3) le canal le plus fort et le plus faible en taux de conversion, nommés
sans détour ; (4) une phrase-pont vers le plan du mois prochain. Si les conversions ont baissé :
dis-le dès la première phrase, donne la cause la plus probable appuyée sur les données et la
contre-mesure déjà prévue. Aucun maquillage.
```

**8 — Recommandations du mois prochain.** `[COLLER : KPI, requêtes page 2, notes conversions, ressources disponibles]`

```
Propose le plan d'action du mois prochain (3 à 5 points, pas plus) pour [CLIENT]. Contraintes :
[ex. ~20 heures, pas de développement]. [COLLER : données]
Pour chaque point, exactement : ACTION (un livrable concret), POURQUOI (le chiffre qu'il
adresse), ATTENDU (fourchette honnête + hypothèse dont il dépend), PREMIER PAS (ce qui se passe
jour 1). Trie par impact attendu. Retire tout ce qui ne cite pas un chiffre de mon collage.
```

**9 — Réécriture en langage simple.** `[COLLER : le paragraphe trop technique]`

```
Réécris ce paragraphe pour un dirigeant sans bagage marketing. Garde chaque chiffre à
l'identique, mêmes faits et même ordre. Remplace le jargon par des mots simples (une courte
explication par terme au maximum). Phrases de moins de 22 mots en moyenne. N'ajoute aucune
nouvelle affirmation. [COLLER : paragraphe]
```

**10 — Réussites & points de vigilance.** `[COLLER : KPI + 3–5 mouvements notables de pages/requêtes]`

```
Rédige (a) trois réussites et (b) trois points de vigilance pour la synthèse exécutive.
[COLLER : données]
Réussites : résultat chiffré + une phrase sur la cause, uniquement ce que mes données montrent.
Vigilance : le risque avec son chiffre + l'action déjà engagée (jamais d'inquiétude sans plan).
20 mots max par point.
```

**11 — Préparer le point client.** `[COLLER : le rapport complété ou ses tableaux + questions en suspens]`

```
Prépare-moi pour l'échange mensuel avec [CLIENT]. [COLLER : données]
Produis : (1) les 3 questions qu'il posera probablement, formulées comme un non-spécialiste
les poserait ; (2) une réponse de 2 phrases pour chacune, appuyée uniquement sur mes données ;
(3) le point faible du mois qu'il pourrait pointer, avec un cadrage honnête (l'assumer +
montrer le plan) ; (4) une question que JE devrais lui poser pour comprendre le contexte
métier que les données ne montrent pas.
```

**12 — E-mail de livraison.** `[COLLER : les 3 réussites + nom du rapport + focus du mois prochain]`

```
Rédige un court e-mail de livraison du rapport mensuel. Destinataire : [NOM], [RÔLE].
De : [VOTRE NOM].
1) Objet : le chiffre le plus important du mois (jamais « Votre rapport mensuel »).
2) Salutation + une ligne sur le résultat phare. 3) Deux puces avec les réussites qui
l'intéressent le plus. 4) Une ligne : rapport en pièce jointe, « trois minutes de lecture ».
5) Une ligne : notre focus du mois prochain. 6) Formule de politesse proposant 15 minutes
d'échange. Moins de 120 mots. Pas d'emojis, pas de points d'exclamation.
```
