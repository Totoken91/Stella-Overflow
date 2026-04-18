# Audit anti-IA — Synthèse globale

**Périmètre :** 1 fichier script (`scene1.ink`, 1748 lignes). Autres scénarios non encore écrits.
**Livrables :** `scene1.review.md` (review line-by-line), ce document (synthèse).

---

## Les 5 tics les plus récurrents

### 1. Le tiret cadratin narratif (—) — 111 occurrences

**Le problème :** signature IA numéro un. Le tiret cadratin est utilisé en incise narrative partout où un point, une virgule, un deux-points, ou une restructuration ferait mieux. Sur 111 occurrences, environ **80 sont du tiret narratif purement décoratif** (les 30 restantes sont des hésitations de dialogue, tolérées).

**Exemples types :**
- `Tu la vois en premier. Ou plutôt — tu vois la lumière en premier.` → `Ou plutôt, tu vois la lumière en premier.`
- `Elle se lève aussi — et elle passe devant toi.` → deux phrases.
- `Il est juste là — lavande pastel, réel, lourd — pendant deux secondes.` → DEUX tirets dans la même phrase, le cas le plus flagrant.

**Cure :** passe de substitution globale, ligne par ligne, virgule ou point selon le cas. Ne jamais remplacer mécaniquement par une virgule partout, ça écrase le rythme — varier.

### 2. La construction en phrases nominales courtes équilibrées

**Le problème :** tic IA qui produit des triptyques "poétiques" du type `Petite. Lumineuse. Suspendue dans l'air du soir.` ou `Pas un son. Une vibration. Comme une corde pincée.` Trois beats toujours propres, rythme toujours identique.

**Distinction importante :** le script utilise aussi ce pattern **volontairement et efficacement** quand il décrit une action concrète (`La poubelle se renverse. Les vitres tremblent. Une alarme se déclenche.`) ou une élimination logique (`Ce n'est pas Lunae. Ce n'est pas Stella.`). Dans ces cas, on garde.

**Le tic IA = le triptyque SYMBOLIQUE ou ADJECTIVAL** (trois adjectifs, trois qualités abstraites, trois images). Le triptyque CONCRET (trois objets distincts, trois actions distinctes) est sain.

**Exemples à corriger :**
- `Le Glock est là. Lavande pastel. Réel. Lourd.` (quadruplet adjectival, un de trop)
- `Petite. Lumineuse. Suspendue...` (triptyque d'ouverture)

### 3. Le tiret rhétorique "Pas X — Y" / "Juste — Y"

**Le problème :** variante spécifique du tiret cadratin où l'IA introduit une précision ou une nuance avec un tiret pour faire "pause dramatique". Tic IA identifiable à l'œil nu.

**Exemples :**
- `Pas de permission — juste un signal.` → `Pas de permission, juste un signal.`
- `Juste — elle attend.` → `Elle attend, c'est tout.`
- `Pas comme sur le toit — douce, pulsante...` → `Pas comme sur le toit. Là elle était douce...`

**Cure :** le plus souvent, une virgule ou un point. Parfois, restructurer.

### 4. La clôture par constat court pompeux

**Le problème :** terminer un paragraphe ou une scène par une phrase-sentence lapidaire pour faire "résonner". L'IA ferme en boucle ses paragraphes comme ça.

**Cas FLAGRANTS (à corriger) :**
- `Ça, c'est de la rage. Et elle sait exactement où elle va.` (ligne 1027) — sonne bande-annonce.
- `[ Fin de l'Acte 1 — À suivre... ]` — tic télé, déjà identifié.

**Cas OK (à garder) :** les closures factuelles non-emphatiques (`Elle te lâche dès que tu es debout. Mais pas tout de suite.`, `Tu sais pas si c'est vrai.`, `Ou peut-être que si.`) — ce sont des constats ambigus, pas des clôtures dramatiques.

**La distinction :** la closure devient tic IA quand elle **souligne** ce qui vient d'être dit. Elle reste saine quand elle **ouvre une ambiguïté**.

### 5. La structure d'incise "Y — précision, précision"

**Le problème :** construction type `adjectif — [liste de qualificatifs]` qui dilue au lieu de préciser. Chaque incise entre tirets rajoute une couche adjectivale sans nécessité.

**Exemples :**
- `Son ton change — plus doux, presque attentionné.`
- `Vraiment bien — détendu, presque serein.`
- `Elle attend quelque chose — pas de la stupéfaction.`

**Cure :** casser l'incise. Soit en phrases courtes (`Son ton change. Plus doux. Presque attentionné.`), soit en enlevant la béquille et en gardant une seule précision.

---

## Fichiers les plus atteints

Un seul fichier script existe pour l'instant. Distribution interne :

| Zone | Lignes | Tirets narratifs | Notes |
|------|--------|---------------------|-------|
| Scène 1 (toit, Lunae) | 14-317 | ~22 | Problèmes concentrés sur les descriptions de Lunae (L186, L193, L211, L238, L270). |
| Scène 2 (éveil, cafétéria, transformation) | 319-930 | ~45 | **Zone la plus atteinte.** Toute la séquence transformation (L460-515) cumule tirets + triptyques + constructions "Pas X — Y" + nominal clauses. |
| Scène 3 (rue, choix moral, cliffhanger) | 932-1747 | ~44 | Mieux côté dialogue, mais la séquence manifestation (L1019-1034) et la cliffhanger (L1700-1745) contiennent les tirets les plus flagrants. |

**Hotspot :** lignes **1256** (`La rage résiste — une fraction de seconde... — puis ça cède`) et **1507** (`Il est juste là — lavande pastel, réel, lourd — pendant deux secondes`). Deux cas de tirets encadrants dans une même phrase. Corriger en priorité.

---

## Ce qui fonctionne déjà

**Pour éviter de tout réécrire par réflexe :**

1. **Les voix de Stella et Lunae sont bien différenciées.** Stella = parle cassé, `jsp`, interruptions, pudeur adolescente. Lunae = phrases complètes, presque trop propres, pauses calculées. Différence tenue sur toute la scène.
2. **Le lexique est propre.** Aucun des mots-marqueurs IA dark/psy (palpable, éthéré, crépusculaire, transcender, etc.) n'apparaît. L'écriture reste concrète.
3. **L'imagerie est grounded.** Highlighter ouvert, cartable, fiches de révision, poubelle renversée, alarme de vélo, dashi dans l'izakaya, vending machine. Pas de cœurs lacérés, pas de miroirs brisés, pas de silences assourdissants. Le dark fonctionne par le réel.
4. **Les dialogues ne collent pas le prénom à chaque réplique.** Vérifié : Stella et Lunae ne finissent presque jamais une phrase par "Y/N" ou l'autre prénom. Naturel.
5. **Les moments de silence narratif fonctionnent.** Beaucoup de "Un temps.", "Un silence.", "Elle ne répond pas." — utilisés avec parcimonie, ne tournent pas au tic.

---

## Stratégie de correction recommandée

**Étape 1 — Typographie (1 heure, mécanique) :**
Passe dédiée aux 80 tirets cadratins narratifs. Chaque substitution doit être jugée cas par cas (virgule, point, deux-points, restructuration). Ne PAS substituer globalement.

**Étape 2 — Rythmique (2 heures, éditoriale) :**
Reprendre les 5-6 séquences identifiées dans le review où s'accumulent triptyques, clôtures pompeuses et incises. Les plus urgentes : transformation cafétéria (L460-515), manifestation rue (L1019-1034), cliffhanger (L1700-1745).

**Étape 3 — Relecture globale (1 heure) :**
Lecture à voix haute. Chaque fois qu'une phrase sonne "propre", la casser ou la rendre rugueuse. L'objectif est que ça respire comme un humain fatigué, pas comme un modèle qui optimise le rythme.

**Étape 4 — Re-compilation ink :**
`node scripts/compile-ink.js` après chaque passe pour vérifier que les modifications ne cassent rien côté syntaxe inkjs.

---

## Notes finales

- **Ne pas toucher :** tags `#`, variables `VAR`, conditions `{ }`, diverts `->`, noms de knots `===`. Uniquement le texte visible.
- **Conserver la casse :** `STELLA :` avec espace insécable, `LUNAE :`, `VOIX :` sont le format convention. Pas les changer.
- **Éviter auto-correction aveugle :** plusieurs des items listés comme `à VÉRIFIER MANUELLEMENT` sont des cas limites où le tic apparent sert en fait une fonction narrative. Juger au cas par cas.
- **Priorité absolue :** le tiret cadratin. C'est lui qui donne 80% de l'odeur IA. Une fois qu'il est maîtrisé, le reste est de la finition.

Les modifications ne sont PAS appliquées au fichier source. Validation à faire avant tout écrasement.
