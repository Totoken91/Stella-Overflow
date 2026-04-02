# Prompt Claude Code — Stella ★ Overflow — État du projet

## Contexte général

Tu travailles sur **Stella ★ Overflow**, un visual novel ecchi/dark à choix multiples. Le projet est un site Next.js 14 (app router) déployé sur Vercel. Le GDD est dans `index (6).html` à la racine du repo.

---

## Direction narrative (DÉJÀ APPLIQUÉE dans le GDD)

Ces points sont déjà dans le GDD actuel. Ne pas les re-modifier, mais les respecter pour tout travail futur :

### Concept central
- **PAS de Distorsions, PAS de monstres, PAS de menaces surnaturelles.** Étoile a des pouvoirs magiques, point. Les crises sont réelles : accidents, agressions, incendies.
- **L'escalade est le moteur du jeu.** Acte 1 = simple et gratifiant. Acte 2 = moralement gris, pression. Acte 3 = si score bas, elle dérape et blesse/tue quelqu'un.
- Le **Weapon Ending** = PTSD et dissociation, pas de la magie. "Tu es qui, déjà ?" = elle s'est coupée d'elle-même.

### Personnages
- **Étoile** : 19 ans, pouvoirs magiques, influençable. Arc : émerveillement → transformation selon les choix.
- **Manager (joueur)** : choisi par Lunae spécifiquement, pas un hasard. Secret Ending révèle qu'il était aussi un pion.
- **Lunae** : parasite ET nécessaire. Se nourrit d'Étoile, mais sans elle Étoile meurt de ses propres pouvoirs. Pas de "bonne réponse" pour la scène 6.

### Système de score
- Score invisible unique. Score haut = protégée, freinée. Score bas = poussée à bout → catastrophe.
- 5-7 choix clés + choix "couleur" sans impact score.
- Seuils : 0-30 Bad / 31-65 Neutral / 66-100 Good. Secret = mauvais choix Acte 1 puis bons Acte 2+.

### Système Dating
- **Pas de jauge séparée** — même score moral unique.
- **6 CG romantiques**, chacune en **2 variantes** (score haut = sain, score bas = malsain). Total = 12 illustrations.
- Distribution : CG 1 (Scène 2) → CG 6 (Scène 8/épilogue).
- Le piège narratif : le désir romantique du joueur est ce que Lunae exploite.

### Direction ecchi
- Lié aux moments de vie, pas aux combats. Repos après sauvetage, dating, transformations.
- Règle : mauvais choix = plus de fan-service mais contexte dérangeant. Bons choix = plus intime mais sain.
- Progression : suggestif (Acte 1) → intense+malaise (Acte 2) → différencié (Acte 3).

### Les 8 scènes
1. La rencontre (toit lycée, pouvoirs, Lunae, indices Manager)
2. Premier sauvetage (incident simple, première transformation)
3. Deuxième intervention (plus sérieux, excès de puissance)
4. La célébrité (vidéos, notoriété, pression sociale)
5. La crise (burn-out, choix le plus dur)
6. Révélation de Lunae (parasite+nécessaire, pas de bonne réponse)
7. L'incident (climax, quelqu'un blessé/tué si score bas)
8. L'épilogue (4 fins, PTSD, confrontation Secret)

### 4 Fins
- **Love (Good)** : connexion sincère, elle reste elle-même.
- **Magical (Neutral)** : elle gère seule, distant.
- **Weapon (Bad)** : PTSD, dissociation, "Tu es qui, déjà ?"
- **Secret** : elle confronte le joueur, seul moment authentique.

---

## Stack technique

| Tech | Usage |
|------|-------|
| Next.js 14 (app router) | Frontend |
| TypeScript + Tailwind | Langage + style |
| inkjs | Moteur narratif (compile .ink → JSON) |
| framer-motion | Animations sprites (enter/exit/bounce/flip) |
| zustand + persist | State management + localStorage |
| howler | Audio (installé, pas encore utilisé) |
| Vercel | Déploiement auto sur push main |

---

## Architecture des fichiers

```
app/
  game/page.tsx       → page principale du jeu (boot → game)
  layout.tsx          → Google Fonts (Playfair Display + DM Mono)
  globals.css         → CSS vars, keyframes, animations
  page.tsx            → redirect vers /game

components/game/
  BootScreen.tsx      → séquence boot (blobs, titre lettre par lettre, progress bar)
  MeshBackground.tsx  → fond animé (3 blobs pink/lavender/teal sur gradient violet)
  Background.tsx      → background image (z-10)
  SpriteWindow.tsx    → sprites framer-motion (enter spring, exit slide, bounce expression, flip scaleX, idle CSS)
  DialogueBox.tsx     → typewriter 20ms, skip/next, speaker pill, glassmorphism
  ChoiceList.tsx      → boutons choix glassmorphism + tilt 3D

lib/
  engine.ts           → wrapper inkjs (tags: SPRITE, SPEAKER, ENTER, EXIT, BG, MUSIC)
  gameState.ts        → zustand store (visibleSprites, currentExpression, currentSpeaker, score...)

scripts/
  compile-ink.js      → compile .ink → .json (usage: node scripts/compile-ink.js)

public/
  story/scene1.ink    → script Ink des scènes 1 et 2 (source)
  story/scene1.json   → JSON compilé (généré)
  sprites/            → PNG sprites ({perso}-{expression}.png ou {perso}-placeholder.png)
  backgrounds/        → PNG backgrounds
  audio/              → (vide pour l'instant)
```

---

## Système de sprites

### Tags Ink reconnus
```
# SPRITE: etoile-neutre                    → visibleSprites = ["etoile"], expression = "neutre"
# SPRITE: etoile-neutre lunae-enthousiaste → 2 persos simultanés
# SPEAKER: etoile                          → currentSpeaker = "etoile"
# ENTER: lunae-surprise                    → ajoute lunae avec animation entrée
# EXIT: lunae                              → retire lunae avec animation sortie
# BG: toit-lycee                           → change le background
# MUSIC: theme-doux                        → (pas encore implémenté)
```

### Fallback images
1. Cherche `/sprites/{perso}-{expression}.png` (exact)
2. Sinon utilise `/sprites/{perso}-placeholder.png`
3. Sinon bloc glassmorphism

### Règles de présence sprite — OBLIGATOIRES dans le .ink

Ces règles s'appliquent à CHAQUE scène, sans exception. Les violer crée des personnages fantômes à l'écran.

**Apparition**
- Un personnage n'est jamais visible avant d'entrer physiquement dans la scène.
- Première apparition dans une scène → `# SPRITE: {perso}-{expression}` ou `# ENTER: {perso}-{expression}`
- `SPRITE` : apparition directe (personnage déjà présent dans le lieu)
- `ENTER` : apparition avec animation d'entrée (personnage qui arrive)

**Disparition — TOUJOURS explicite**
- Dès qu'un personnage quitte le lieu (part, sort, disparaît) → `# EXIT: {perso}` immédiatement, avant le texte narratif qui suit.
- Ne pas supposer qu'un personnage disparaît "naturellement" entre deux scènes — le EXIT doit être dans le .ink.
- Changement de lieu (nouveau `# BG:`) → vérifier que tous les personnages présents ont reçu `# EXIT` avant ou juste après le tag BG.

**Narration sans personnage**
- Monologue intérieur du joueur, texte de transition, ellipse temporelle → aucun sprite visible.
- Si un personnage était visible, il doit avoir reçu `# EXIT` avant ce bloc.

**Checklist par scène**
Avant de valider une scène .ink, vérifier :
- [ ] Chaque personnage a un `# SPRITE` ou `# ENTER` au moment où il apparaît
- [ ] Chaque personnage a un `# EXIT` au moment où il part
- [ ] Les blocs de narration pure (monologue, transition) ne contiennent aucun sprite actif
- [ ] Les changements de `# BG:` sont précédés d'un `# EXIT` pour chaque personnage visible

**Personnages du projet**
- `stella` : apparaît/disparaît selon les scènes, jamais pendant les monologues du joueur
- `lunae` : apparaît toujours avec `# ENTER`, disparaît toujours avec `# EXIT` (jamais de `# SPRITE` direct)
- Le joueur (Y/N) : **aucun sprite, jamais**

### Animations framer-motion
- **Entrée** : spring y:80→0, scale:0.8→1, opacity:0→1 (stiffness 180, damping 16)
- **Sortie** : x→120, opacity→0 (0.3s easeIn)
- **Bounce expression** : scale [1, 0.93, 1.06, 1] (0.35s)
- **Flip scaleX** : spring animation UNIQUEMENT quand la direction change (solo↔gauche)
- **Idle** : CSS keyframe spriteIdle ±4px vertical, 4s boucle

### Positionnement
- 1 perso : centré, scaleX(1)
- 2 persos : gauche scaleX(-1) regarde droite, droite scaleX(1) regarde gauche
- Speaker actif : opacity 1, scale 1, saturate(1)
- Speaker inactif : opacity 0.6, scale 0.92, saturate(0.5)

---

## UX implémentée

- `user-select: none` + no image drag dans `.game-container`
- Click **partout sur l'écran** avance le dialogue
- Click sur la **DialogueBox** skip le typewriter d'abord (stopPropagation)
- **Typewriter** : 20ms/lettre, generation counter pour éviter les glitches, debounce 80ms
- **Boot screen** : fond #1A0A1E, blobs visibles, titre lettre par lettre avec glow, ✦ teal qui tourne, progress bar shimmer, fade-out 1.2s
- Game render **derrière** le boot screen pour preloader les assets
- Store **reset** au mount de la page (onRehydrateStorage + reset())

---

## Branche de dev
`claude/setup-stella-overflow-nextjs-rtmcs` — merge vers `main` pour déployer sur Vercel.

---

## TODO / pas encore fait
- [ ] Audio (howler.js installé mais pas de musique/SFX intégrés)
- [ ] Vrais sprites par expression (actuellement placeholder PNG unique par perso — stella + lunae)
- [ ] Vrais backgrounds (actuellement mesh gradient seulement — dossier public/backgrounds/ à créer)
- [x] Menu principal (MainMenu.tsx — particles, boutons animés, curseur custom)
- [x] Système de sauvegarde (saveStore.ts — slots localStorage + autosave)
- [ ] Galerie CG
- [ ] Scènes 3-8 en Ink (scènes 1 et 2 complètes)
- [ ] Les 12 CG dating (6 × 2 variantes score haut/bas)
- [ ] Écran de fin / crédits
- [ ] Transitions entre scènes
