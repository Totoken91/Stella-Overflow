# Prompt Claude Code — Update GDD Stella ★ Overflow

Applique les modifications suivantes au GDD HTML (`index (6).html` ou le fichier HTML du GDD dans ce repo). Conserve intégralement le style HTML/CSS/JS existant (mesh gradient, animations, accordéons, ending cards, palette, etc.). Fais les modifications par passes pour rester qualitatif.

---

## PASS 1 — REFONTE CONCEPT (section 01)

Après le premier highlight-box existant, ajouter un DEUXIÈME highlight-box :

```html
<div class="highlight-box">
  <p style="margin:0;font-weight:600;color:var(--pink-dark);">Il n'y a pas de monstres. Pas d'entités. Pas de menaces surnaturelles. Étoile a des pouvoirs magiques — point. Ce qui se passe autour d'elle, c'est <strong>la vraie vie</strong> : des accidents, des agressions, des situations de crise. Des gens qu'elle peut sauver. L'escalade est le moteur du jeu.</p>
</div>
```

---

## PASS 2 — REFONTE HISTOIRE (section 03)

Remplacer le contenu de la section Histoire par :

- Supprimer TOUTE mention de "Distorsions" dans tout le document.
- Nouveau texte :
  - "La ville n'est pas menacée par des forces surnaturelles. C'est juste une ville normale où des trucs arrivent — accidents, agressions, incendies, crises. Et Étoile est la seule qui peut intervenir."
  - Escalade progressive : Acte 1 = simple et gratifiant. Acte 2 = moralement gris, pression. Acte 3 = si score bas, elle dérape, blesse ou tue quelqu'un par excès de puissance.
  - Question centrale : "à quel prix elle sauve les gens autour d'elle ?"
- Thèmes : Identité · Pression de la performance · Burn-out · Bienveillance vs contrôle · Séduction & manipulation · **Complexe du sauveur · Culpabilité · Violence involontaire · Responsabilité du pouvoir**

---

## PASS 3 — REFONTE PERSONNAGES (section 02)

### Étoile
Garder tel quel mais mettre à jour les CG : "6 CG romantiques en 2 variantes (score haut/bas)" au lieu de "8-10 CG ecchi".

### Manager
Remplacer par : "Ami d'enfance d'Étoile — mais **Lunae l'a choisi spécifiquement**. Sa présence n'est pas un hasard. Indices plantés dès la scène 1 : Lunae le reconnaît, le regarde avec une intensité anormale. La Secret Ending révèle qu'il était, comme elle, un pion de Lunae depuis le début."

### Lunae
Changer le label de "Antagoniste / Mentor" à "Parasite / Mentor". Nouveau texte : "Se présente comme guide spirituel d'Étoile. En réalité, **Lunae se nourrit d'Étoile — mais sans elle, Étoile mourrait de ses propres pouvoirs**. Parasite ET nécessaire. Pas 'méchante' : elle a besoin qu'Étoile utilise ses pouvoirs pour survivre, donc elle la pousse à intervenir partout. Ses conseils sonnent bien mais sont intéressés. Le choix de la scène 6 n'a **pas de réponse correcte**."

---

## PASS 4 — RÉÉCRIRE LES 8 SCÈNES (section 05, accordéon)

Réécrire entièrement les 8 scènes dans l'accordéon :

**Scène 1 — La rencontre (Acte 1, CHOIX)** : Toit du lycée. Pouvoirs d'Étoile. Lunae apparaît, reconnaît le Manager ("Oh~ C'est donc *toi*"). Flash : regard d'Étoile se vide un instant. Murmure de Lunae : "Parfait... celle-ci tiendra plus longtemps~". Moment dating : elle frissonne, se rapproche. Choix : Rester calme (+5) · Prendre la main (+3) · "Tu es extraordinaire" (+3) · "Personne n'est normal" (+5). Assets : BG toit lycée, sprites etoile (neutre/surprise/soulagée/gênée/vide), sprites lunae, SFX.

**Scène 2 — Premier sauvetage (Acte 1, CHOIX)** : Incident au lycée (chute, accident). Première intervention simple. Première transformation suggestive. CG dating 1 : score haut = cuisine ratée ensemble, score bas = trop tactile. Choix : Encourager avec mesure (+5) · Envoyer directement (+0) · Pousser à en faire plus (−3).

**Scène 3 — Deuxième intervention (Acte 1, CHOIX)** : Plus sérieux (incendie, bagarre). Première utilisation excessive de puissance. CG dating 2 : score haut = selfie maladroit, score bas = photos en nuisette à 1h du mat. Choix : Freiner (+5) · Prudent (+2) · Valider l'escalade (−4).

**Scène 4 — La célébrité (Acte 2, CHOIX CLÉ)** : Vidéos, fans, notoriété. CG dating 3 : score haut = casque audio partagé, score bas = séance photo malaise. Choix : Protéger vie privée (+8) · Accepter modérément (+2) · Exposition totale (−6).

**Scène 5 — La crise (Acte 2, CHOIX CLÉ)** : Burn-out, elle craque. CG dating 4 : score haut = s'endort contre toi, score bas = s'accroche par dépendance. Choix : La laisser se reposer (+10) · Compromis (+3) · Rappeler responsabilités (−8).

**Scène 6 — Révélation de Lunae (Acte 2, CHOIX CLÉ)** : Lunae = parasite + nécessaire. Pas de bonne réponse. Choix : Révéler (+6, mais souffrance physique) · Garder secret (−2) · Confronter seul (−5).

**Scène 7 — L'incident (Acte 3, CHOIX CLÉ)** : Situation critique. Score bas = quelqu'un gravement blessé/tué par excès de puissance. Score haut = de justesse. CG dating 5 : score haut = front contre front, score bas = baiser désespéré. Choix : Honnête et soutenir (+12) · Mentir (+0) · Pousser (−10).

**Scène 8 — L'épilogue (Acte 3)** : Pas de choix. PTSD/dissociation pour Weapon. CG dating 6 : Good = authentique, Weapon = yeux vides, Secret = vrai baiser. Seuils : 0-30 Bad / 31-65 Neutral / 66-100 Good.

---

## PASS 5 — AJOUTER SYSTÈME DATING (section 04, après Rejouabilité)

Ajouter une ligne `mech-row` "Système Dating" dans la card existante :
"Pas de jauge séparée — même score moral unique. Moments tendre malsain = baisse score. Intime sain = monte score. Le piège : le désir romantique du joueur est ce que Lunae exploite."

Puis ajouter une NOUVELLE card "Dating par acte — 6 CG romantiques" avec :
- Intro : "Chaque CG existe en deux variantes selon le score moral. Score bas = va trop vite, saute des étapes. Score haut = doucement, naturellement."
- 6 lignes `mech-row` (CG 1 · Scène 2 → CG 6 · Scène 8) avec description score haut ET score bas pour chacune.

Mettre aussi à jour "Rejouabilité" : la rejouabilité méta (dialogues qui changent selon historique) est prévue post-V1.

---

## PASS 6 — REFONTE FINS (section 06)

### Weapon Ending
Remplacer par : "Étoile a tué quelqu'un. Elle ne peut pas vivre avec. PTSD, dissociation. Froide, distante. 'Tu es qui, déjà ?' Ce n'est pas un robot — c'est une dissociation."

### Secret Ending
Remplacer par : "Elle confronte le joueur : 'Tu crois que j'ai pas vu ce que tu faisais ?' Elle réalise que le Manager aussi était manipulé par Lunae. La seule fin où le moment romantique est authentique."

---

## PASS 7 — DIRECTION ECCHI (section 07)

Remplacer la sous-section "Direction Ecchi" :
- **Principe** : ecchi lié aux moments de vie, pas aux combats. Repos après sauvetage, dating, transformations.
- **Règle narrative** : mauvais choix = plus de fan-service mais contexte dérangeant. Bons choix = plus intime mais sain.
- **CG** : 6 CG romantiques × 2 variantes = 12 illustrations. Collectionnables en galerie.
- **Progression** : Acte 1 suggestif → Acte 2 intense+malaise → Acte 3 différencié.

Mettre à jour "Backgrounds" : 4 BG principaux + variations couleur/filtre. Personnages secondaires = silhouettes.

---

## VÉRIFICATION FINALE
- Rechercher "Distorsion" ou "distorsion" dans tout le document → doit retourner 0 résultats.
- Vérifier que le style HTML/CSS/JS est intact (accordéons, animations, mesh gradient, ending cards).
- Vérifier que chaque scène dans l'accordéon a les 4 blocs : Résumé, Dialogues clés, Choix & Score, Assets nécessaires.
