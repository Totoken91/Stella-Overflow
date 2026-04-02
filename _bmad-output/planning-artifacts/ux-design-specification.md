---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments: ["CLAUDE.md"]
project: stella-overflow
---

# UX Design Specification — Stella ★ Overflow

**Auteur :** Kenny
**Date :** 2026-04-02

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Vision Projet

Visual novel ecchi/dark à choix multiples. Le joueur incarne le Manager d'une lycéenne aux pouvoirs magiques (Stella). Ses décisions façonnent l'arc moral de Stella — de l'innocence à la transformation. Score invisible unique bifurquant vers 4 fins distinctes. Le désir romantique du joueur est le mécanisme que Lunae exploite : l'UX doit le faire *ressentir* sans le dire.

### Joueurs Cibles

Fans de visual novels japonais (VN web/PC), sensibles au dark romance, à la progression narrative morale et au contenu ecchi progressif. Jouent sur desktop/browser, probablement le soir, en sessions de 20-45 min.

### Défis UX Clés

1. **Score invisible** — les choix doivent sembler importants sans que l'UI trahisse le système.
2. **Transition menu → jeu** — boot screen crée l'ambiance mais ajoute de la friction ; équilibre immersion/fluidité.
3. **Surcharge DialogueBox** — glassmorphism + typewriter + contrôles (◁, >>, MENU) = risque de surcharge visuelle.
4. **CG + dialogue simultanés** — l'eye toggle (👁) existe mais sa discovery est faible.
5. **Poids moral des choix** — aucun signal visuel ne différencie un choix neutre d'un choix à impact.

### Opportunités UX Validées

1. **Score invisible → ambiance visuelle** — effets subtils (couleur des blobs, intensité du glow) reflètent l'état moral sans l'afficher explicitement.
2. **Contrôles in-game mieux intégrés** — retour arrière `◁` et fast-forward `>>` existent mais peu mis en avant ; meilleure affordance réduit la frustration.
3. **Transitions scènes signature** — palette rose → violet → noir propre au jeu renforçant l'identité visuelle à chaque changement de scène.

---

## Core Player Experience

### Action Principale

Lire et choisir. La boucle fondamentale : absorber la narration → faire un choix moral → observer la conséquence sur Stella. Si cette boucle est fluide et immersive, tout le reste suit.

**Interaction critique :** le moment du choix. C'est là que tout le poids narratif se concentre.

### Plateforme

Desktop/browser exclusivement. Souris ou trackpad. Écran 16:9, résolution variable. Pas de touch, pas de controller.

### Interactions Sans Friction

| Action | Objectif |
|---|---|
| Avancer le dialogue | Click n'importe où — garder |
| Skip typewriter | Click sur DialogueBox |
| Faire un choix | Boutons centrés, libellés courts |
| Sauvegarder | Toast autosave discret après chaque choix clé |
| Retour arrière | Bouton `◁` — améliorer la discovery |

### Moments Critiques de Succès

1. **Premier dialogue** — le joueur comprend immédiatement comment avancer, sans tutoriel.
2. **Premier choix** — le joueur *sent* que ce choix compte, sans voir de score.
3. **Première CG** — transition dialogue → CG fluide, immersion préservée.
4. **Fin de démo** — "À suivre..." donne envie de revenir.

### Principes d'Expérience

1. **Invisibilité de l'interface** — l'UI s'efface devant la narration, s'impose uniquement quand nécessaire.
2. **Poids sans explication** — les choix moraux se ressentent visuellement/musicalement, jamais nommés.
3. **Zéro friction de lecture** — avancer, reculer, accélérer : tout à portée d'un clic naturel.
4. **L'ambiance comme feedback** — l'état moral du jeu se traduit en atmosphère, pas en chiffres.
5. **Choix courts et ambigus** — les libellés sont des intentions brèves (*"Doucement"*, *"Pousser"*), pas des descriptions. L'ambiguïté crée la tension morale.

---

## Réponse Émotionnelle Désirée

### Objectifs Émotionnels Principaux

| Moment | Émotion cible |
|---|---|
| Menu / découverte | Curiosité envoûtante — "c'est beau et il y a quelque chose d'inquiétant" |
| Lecture dialogue | Immersion tranquille — on oublie qu'on joue |
| Moment d'un choix | Tension morale — "je sais pas si c'est bien ce que je vais faire" |
| Après un bon choix | Soulagement teinté d'attachement pour Stella |
| Après un mauvais choix | Inconfort léger qui reste — pas de punition explicite |
| Fin de session | Manque — l'envie de revenir |

### Parcours Émotionnel

```
Menu        → Envoûtement (esthétique, musique, particules)
Scène 1     → Curiosité + tendresse naissante (qui est Stella ?)
Premier choix → Tension + responsabilité (elle compte sur toi)
Lunae       → Malaise subtil (quelque chose ne va pas)
Dating      → Désir + culpabilité latente
Fin scène 2 → "...qu'est-ce qui vient de se passer ?"
```

### Micro-Émotions Critiques

- **Confiance** dans l'interface — le joueur ne se demande jamais comment avancer
- **Attachement** à Stella — elle existe comme personne, pas comme personnage de jeu
- **Complicité inconfortable** avec Lunae — on l'aime un peu même si elle est troublante
- **Responsabilité diffuse** — le score invisible crée une responsabilité sans tribunal

**Émotions à éviter**
- Frustration technique (lag, bug, UI confuse)
- Détachement ironique — le ton reste sincère, jamais auto-parodique
- Culpabilité explicite — le jeu ne juge pas, il montre

### Implications UX

- **Confiance** → interface invisible, transitions douces, zéro message d'erreur visible
- **Attachement à Stella** → expressions lisibles et distinctes, sprite réactif aux émotions
- **Responsabilité diffuse** → choix courts et ambigus (principe 5)
- **Manque post-session** → écran "À suivre..." à travailler (musique, image fixe de Stella)

---

## UX Pattern Analysis & Inspiration

### Références Analysées

| Référence | Pertinence |
|---|---|
| Doki Doki Literature Club | UI comme outil narratif, glitch intentionnel |
| VA-11 Hall-A | Cohérence son/image/texte, économie visuelle |
| Disco Elysium | Choix comme identité, poids moral sans jauge |
| Nier: Automata | Confiance UI puis subversion narrative |
| Butterfly Soup | VN web minimaliste, expression sprite > effets UI |

### Patterns Transférables

**UI comme narration (DDLC → Stella)**
- `stella-vide` peut durer *légèrement plus longtemps* selon le score bas — glitch narratif subtil
- MeshBackground peut désaturer/changer de teinte selon l'état moral, sans explication au joueur

**Choix comme identité (Disco Elysium → Principe 5)**
- Libellés courts confirmés : *"Doucement"* / *"Pousser"* — le choix révèle le Manager, pas son action
- Aucune indication de conséquence visible avant ou après le choix

**Confiance puis subversion (Nier → Actes 2-3)**
- Acte 1 : UI fiable, prévisible, rassurante
- Acte 2-3 : possibilité de perturbations UI subtiles si score très bas (Weapon Ending)

**Économie visuelle (Butterfly Soup → DialogueBox)**
- Priorité aux vrais sprites par expression plutôt qu'aux effets UI
- Chaque élément affiché simultanément doit justifier sa présence

**Cohérence totale (VA-11 Hall-A → Chaque scène)**
- BG + expression + musique = un seul mood par scène
- Zéro élément décoratif sans fonction narrative

### Anti-Patterns à Éviter

- Jauge de score ou indicateur bon/mauvais choix visible
- Tutoriels explicites — le VN s'apprend en jouant
- Transition musicale brutale sans fondu
- Effets de glitch trop évidents (le malaise doit rester dans le doute)
- Surcharge d'éléments UI simultanés

### Stratégie d'Inspiration

**Adopter :** choix courts (Disco Elysium), économie visuelle (Butterfly Soup), cohérence mood (VA-11)
**Adapter :** UI narrative (DDLC) → version subtile, dans le doute plutôt que le choc
**Réserver :** subversion UI (Nier) → uniquement Actes 2-3 si score critique

---

## Design System Foundation

### Choix : Custom sur Tailwind

Système custom maintenu — aucun framework UI externe. Tailwind pour l'utilitaire, tokens CSS pour la cohérence, glassmorphism comme signature visuelle.

### Tokens Existants

| Token | Usage |
|---|---|
| `--pink-soft` | Texte principal, titres, Stella |
| `--pink-dark` | Accents, boutons actifs |
| `--teal` | Étoile, fast-forward, Lunae |
| `--teal-dark` | États actifs teal |
| Glassmorphism `rgba + blur` | DialogueBox, ChoiceList, contrôles |
| Fond `#1A0A1E` | Base sombre |
| Playfair Display | Titres, dialogues personnages |
| DM Mono | UI, contrôles, narration joueur |

### Extension Proposée

```css
/* États moraux */
--moral-high: rgba(127, 216, 216, 0.15)   /* teal — score haut, sain */
--moral-low:  rgba(224, 92, 138, 0.25)    /* rose intense — score bas, trouble */

/* Transitions standard */
--transition-soft:  0.4s cubic-bezier(0.22, 1, 0.36, 1)
--transition-scene: 1.5s ease-in-out

/* Tokens speaker — pill par personnage (SCAMPER: Adapter) */
--speaker-stella:    var(--pink-soft)
--speaker-lunae:     var(--teal)
--speaker-narration: transparent
```

### Pattern Tension (SCAMPER: Renverser)

Pour les moments de tension maximale (entrée de Lunae, choix critiques, score bas) : le background reçoit un shake CSS subtil, les sprites restent immobiles. L'instabilité de l'environnement face à la fixité du personnage crée la tension sans changer d'expression.

```css
/* globals.css */
@keyframes bgTension {
  0%, 100% { transform: translate(0, 0); }
  25%       { transform: translate(-1px, 0.5px); }
  75%       { transform: translate(1px, -0.5px); }
}
/* Déclenché via tag # TENSION dans le .ink → setTension(true) dans engine.ts */
```

### Rationale

- Glassmorphism = "lire" → solid opaque réservé aux moments de "décider" (choix)
- Typo double : Playfair pour les personnages, DM Mono pour la voix intérieure du joueur
- Tokens moraux progressifs : imperceptibles en temps réel, visibles en comparant scène 1 et scène 7

### Règles de Zones (Expert Panel)

**Zone sprite :** 60% haut de l'écran
**Zone dialogue :** 40% bas de l'écran
Zones mortes définies pour éviter tout débordement sprite sur le texte.
Token `--speaker-narration: transparent` — la narration sans pill distingue "quelqu'un parle" de "le monde existe".

### Performance Animations (Expert Panel)

```css
/* bgTension — forcer GPU, éviter repaint */
.background-layer {
  will-change: transform;
}
@keyframes bgTension {
  0%, 100% { transform: translate3d(0, 0, 0); }
  25%       { transform: translate3d(-1px, 0.5px, 0); }
  75%       { transform: translate3d(1px, -0.5px, 0); }
}

/* Idle amplitude variable — JS-contrôlée selon score */
:root { --idle-amplitude: 4px; }
@keyframes spriteIdle {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(calc(-1 * var(--idle-amplitude))); }
}
/* Score bas → document.documentElement.style.setProperty('--idle-amplitude', '7px') */
```

### Tokens Sémantiques de Scène (Expert Panel)

Couche sémantique au-dessus des tokens visuels. Le tag `# MOOD:` dans le .ink contrôle l'ambiance globale via `gameState.ts`.

```ts
// gameState.ts — sceneMode
type SceneMode = 'calm' | 'tension' | 'intimate'

// engine.ts — tag MOOD
case "MOOD":
  store.setSceneMode(value as SceneMode)
  break
```

| Mode | Blobs | Idle | Transition | Usage |
|---|---|---|---|---|
| `calm` | teal dominant | lent 4px | soft | Scènes normales, Acte 1 |
| `tension` | rose dominant | rapide 7px | bgTension | Lunae, choix critiques |
| `intimate` | équilibré | minimal 2px | doux | Dating scenes |

---

## Expérience Définissante

### Définition

> *"Lire la vie de Stella, choisir comment y interférer, et découvrir ce qu'on a fait d'elle à la fin."*

Le score invisible crée une dissonance entre ce que le joueur croit faire (aider Stella) et ce qu'il fait vraiment (la modeler selon ses désirs). Cette confusion est intentionnelle — l'UX ne la corrige pas.

### Modèle Mental du Joueur

Modèle attendu : cliquer = avancer, choix = branchement. Ce que le joueur VN déteste et qu'on évite :
- Signal visuel indiquant le "bon" choix
- Sauvegardes lourdes cassant le rythme
- UI qui clignote sur les moments importants
- Relecture forcée après mauvais choix

### Critères de Succès

| Critère | Signal concret |
|---|---|
| Jamais perdu | Aucune pause > 3s pour comprendre comment avancer |
| Choix semblent importants | Hésitation > 2s avant de choisir |
| Immersion préservée | Le joueur voit Stella, pas l'UI |
| Score invisible | Aucun joueur ne devine son score exact |
| Manque post-session | Retour dans les 24h après "À suivre..." |

### Patterns Établis vs Novel

| Pattern | Type | Approche |
|---|---|---|
| Click pour avancer | Établi | Adopter tel quel |
| Skip typewriter | Établi | Adopter, améliorer discovery |
| Retour arrière | Établi rare | Conserver, rendre plus visible |
| Score invisible → ambiance | Novel | Construire progressivement |
| `# MOOD:` → cascade visuelle | Novel | Doc technique uniquement |
| Choix courts ambigus | Mi-établi | Adapter depuis Disco Elysium |

### Mécanique du Flux

```
INITIATION  → Texte apparaît (typewriter 20ms/lettre)
INTERACTION → Click partout → ligne suivante
             Choix présents → ChoiceList remplace click global
             Choix sélectionné → score silencieux → retour lecture
FEEDBACK    → Expression Stella change (sprite)
             Ambiance change (MOOD tag)
             Réplique suivante reflète le choix
COMPLETION  → "À suivre..." → retour menu au click
             Autosave silencieux après chaque choix
```

---

## Visual Foundation

### Système de Couleurs

#### Palette de Base

| Token | Valeur | Rôle |
|---|---|---|
| `--pink-soft` | `rgba(255, 214, 224, 1)` | Texte principal, Stella, titres |
| `--pink-deep` | `rgba(224, 92, 138, 1)` | Accents, boutons actifs, shimmer |
| `--teal` | `rgba(127, 216, 216, 1)` | Lunae, étoile logo, fast-forward |
| `--teal-dark` | `rgba(80, 160, 160, 1)` | États hover teal |
| `--bg-base` | `#1A0A1E` | Fond sombre universel |
| `--lavender` | `rgba(196, 184, 232, 1)` | Particules menu, ambiance neutre |

#### Tokens États Moraux

```css
--moral-high: rgba(127, 216, 216, 0.15)   /* teal — score ≥ 66, sain */
--moral-low:  rgba(224, 92, 138, 0.25)    /* rose — score ≤ 30, trouble */
--moral-neutral: rgba(196, 184, 232, 0.10) /* lavande — zone 31–65 */
```

Imperceptibles en temps réel. Visibles en comparant scène 1 vs scène 7.

#### Glassmorphism — Règle Sémantique

- **Fond translucide** (`rgba + blur`) → état "lire" (dialogue, narration)
- **Fond opaque solide** → état "décider" (ChoiceList uniquement)

Cette distinction renforce l'intention : la narration se fond dans l'univers, le choix exige l'attention.

---

### Système Typographique

#### Double Police — Stratégie

| Police | Variable CSS | Usage | Émotion |
|---|---|---|---|
| Playfair Display | `var(--font-playfair)` | Titres, dialogues personnages | Littéraire, romantique |
| DM Mono | `var(--font-dm-mono)` | UI, contrôles, narration joueur | Mécanique, intérieur |

**Règle implicite :** quand le texte est en DM Mono, c'est la voix intérieure du Manager. Quand c'est Playfair, c'est un personnage qui existe dans l'univers. Le joueur ne l'apprend jamais explicitement — il le ressent.

#### Hiérarchie Tailles

```css
/* Titres — menu principal */
font-size: clamp(3rem, 8vw, 6.5rem);   /* h1 — Stella ★ Overflow */

/* Dialogue — lecture principale */
font-size: clamp(0.9rem, 1.5vw, 1.1rem);  /* DialogueBox — confort lecture */

/* Speaker pill */
font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;

/* Contrôles UI */
font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase;
```

---

### Espacement & Layout

#### Zones Écran (16:9)

```
┌─────────────────────────────────────┐
│                                     │
│          ZONE SPRITE                │  60% haut
│          (background + persos)      │
│                                     │
├─────────────────────────────────────┤
│  ZONE DIALOGUE                      │  40% bas
│  Speaker pill / Texte / Contrôles   │
└─────────────────────────────────────┘
```

**Zone morte absolue :** aucun sprite ne dépasse la frontière vers la zone dialogue. Aucun élément UI ne remonte dans la zone sprite hors CG.

#### Contraintes DialogueBox

- Padding interne : `1.5rem 2rem`
- Largeur max : `min(720px, 90vw)`
- Hauteur fixe pour éviter le layout shift pendant le typewriter
- Contrôles (◁, >>, MENU) : alignés droite, opacity 0.4 au repos → 0.9 au hover

---

### Accessibilité

#### Priorités Validées

1. **Contraste texte/fond** — pink-soft sur glassmorphism doit passer AA (4.5:1 minimum)
2. **Taille clickable** — toute zone interactive ≥ 44×44px (critère touch-safety même en desktop)
3. **Pas de clignotement** — aucune animation > 3 flashs/seconde (WCAG 2.3.1)
4. **Focus visible** — outline `:focus-visible` sur tous les boutons (tab navigation)

#### Non-Priorités Assumées

- Screen readers : VN non conçu pour lecteurs d'écran dans cette version
- Daltonisme : tokens moraux (teal vs rose) ont des valeurs de luminosité différentes — distinguables en monochrome

---

## Design Direction Decision

### Design Directions Explorées

6 directions visuelles testées. Toutes construites sur les tokens existants (glassmorphism, rose/teal, biton moral).

| Direction | Concept | Statut |
|---|---|---|
| A — Spectral | UI invisible, blobs animés, DialogueBox glassmorphism | **Base** |
| B — Cinématique | Letterbox 2.39:1, dialogue en surimpression film | **Contextuel** |
| C — Stage | 2 sprites gauche/droite, lighting speaker actif | **Scènes duo** |
| D — Terminal | Fond noir, sprite fantôme, texte nu centré | **Weapon Ending** |
| E — Diptyque | Split vertical sprite/dialogue | Rejeté |
| F — Palimpseste | Texte overlayé sur sprite | Rejeté |

Showcase interactif : `_bmad-output/planning-artifacts/ux-design-directions.html`

### Direction Choisie

**Système hybride contextuel — A comme base, B/C/D comme variations narratives.**

| `sceneMode` | Direction | Contexte |
|---|---|---|
| `calm` | A — Spectral | Acte 1, scènes standard |
| `tension` | B — Cinématique / C — Stage | Lunae, choix critiques, confrontations |
| `intimate` | A — Spectral (atténué) | Dating scenes |
| `dissociation` | D — Terminal | Weapon Ending uniquement |

### Rationale

Le VN est structuré pour que l'UI raconte la progression morale. Un système à 4 modes visuels permet cette progression sans rupture brutale : Acte 1 = toujours Spectral (rassurant), Acte 2 = Stage pour les confrontations, Acte 3 low score = Terminal (l'interface se décompose).

### Approche d'Implémentation

```ts
// gameState.ts — extension SceneMode
type SceneMode = 'calm' | 'tension' | 'intimate' | 'dissociation'

// globals.css — classe .scene-cinematic pour letterbox CSS
// SpriteWindow.tsx — déjà prêt pour 2 sprites gauche/droite (Stage)
// engine.ts — tag # MOOD: dissociation déclenche D — Terminal
```

---

## Player Journey Flows

### Parcours 1 — Première Session

```
Ouverture URL → MainMenu (fade-in 1.8s)
  → Nouvelle partie : setPendingLoad(null) → /game
  → Continuer : autosave ? setPendingLoad(0) : setPendingLoad(null) → /game
  → Charger : SaveLoadMenu → setPendingLoad(slotId) → /game
BootScreen (3s) → Fade-out (1.2s) → Première ligne typewriter
Stella visible — sprite centré — click pour avancer
```

**Point de friction :** joueur VN novice ne sait pas qu'il faut cliquer. Mitigation : pulsation douce de la DialogueBox sur la ligne 1 uniquement.

### Parcours 2 — Boucle Dialogue

```
Typewriter en cours
  → Click DialogueBox : skip → texte complet → idle
  → Typewriter terminé : idle

Ligne complète
  → Click écran → contenu suivant
      Ligne → nouveau typewriter
      Choix → ChoiceList (click global désactivé)
      Tag EXIT/ENTER → animation sprite
      Tag BG → changement background
      Tag MOOD → sceneMode change
      Fin → écran "À suivre..."
  → Click ◁ : retour ligne précédente
  → Click >> : fast-forward jusqu'à prochain choix ou fin
```

### Parcours 3 — Moment de Choix

```
ChoiceList fade-in (choix courts centrés, max 6 mots)
  → Hover : tilt 3D léger, opacity 1
  → Click : flash → fade-out

Score ajusté [invisible] → Autosave [invisible]
Expression Stella change → sceneMode réévalué
Réplique suivante reflète le choix → retour boucle
```

Principe : le seul feedback perçu du choix est l'expression sprite + ambiance. Jamais de confirmation textuelle.

### Parcours 4 — Fin de Session

```
Tag # END → écran "À suivre..." (image Stella + musique, min 2s avant click actif)
  → Click → fade-out → reset store → MainMenu
  → Continuer actif si autosave existant
```

### Parcours 5 — Reprise de Partie

```
MainMenu → Continuer → pendingLoad(0) → BootScreen → restore ink state + score + sprites
MainMenu → Charger → SaveLoadMenu → pendingLoad(n) → BootScreen → restore slot n
```

### Patterns Identifiés

| Pattern | Type | Règle |
|---|---|---|
| Click universel | Navigation | Click partout = avancer, sauf ChoiceList active |
| Skip typewriter | Navigation | Click DialogueBox uniquement (stopPropagation) |
| Score silencieux | Décision | Zéro retour visuel sur le score — jamais |
| Expression comme feedback | Décision | Seul signal du choix = sprite de Stella |
| Autosave contextuel | Feedback | Après chaque choix, toast 1s en bas gauche |
| sceneMode progressif | Feedback | Ambiance change par paliers, jamais brutalement |
| Retour arrière | Récupération | ◁ corrige les clics accidentels |

### Optimisations de Flux

| Flux | Optimisation |
|---|---|
| Premier dialogue | Pulsation douce DialogueBox ligne 1 pour induire le click |
| Choix | Max 6 mots par libellé |
| Retour arrière | Tooltip "Revenir" au premier survol uniquement |
| Autosave toast | 1s, bas gauche, disparaît seul — jamais bloquant |
| Écran fin | Min 2s avant que le click soit actif (évite skip accidentel) |

---

## Component Strategy

### Composants Existants

| Composant | Fichier | État |
|---|---|---|
| `BootScreen` | `components/game/BootScreen.tsx` | Complet |
| `MeshBackground` | `components/game/MeshBackground.tsx` | Complet |
| `Background` | `components/game/Background.tsx` | Complet |
| `SpriteWindow` | `components/game/SpriteWindow.tsx` | Complet |
| `DialogueBox` | `components/game/DialogueBox.tsx` | Complet |
| `ChoiceList` | `components/game/ChoiceList.tsx` | Complet |
| `MainMenu` | `components/menu/MainMenu.tsx` | Complet |
| `SaveLoadMenu` | `components/menu/SaveLoadMenu.tsx` | Complet |

### Custom Components

#### `SceneModeWrapper`
Wrapper page `/game` — injecte la classe CSS du mode visuel actif selon `sceneMode` du store.

| sceneMode | Classe | Effet |
|---|---|---|
| `calm` | `scene-calm` | Style A — Spectral (défaut) |
| `tension` | `scene-tension` | bgTension keyframe, blobs rose |
| `intimate` | `scene-intimate` | Blobs atténués, idle 2px |
| `dissociation` | `scene-dissociation` | Fond noir, DialogueBox → texte centré |

#### `AutosaveToast`
Coin bas gauche, fixe. Icône ✦ teal + "Sauvegardé" DM Mono. Glassmorphism léger. Visible 1200ms puis auto-hide. Déclenché via `gameState.showAutosaveToast()`.

#### `EndScreen`
Remplace le jeu après tag `# END`. Image fixe Stella + "À suivre..." Playfair italic. Click actif après 2s. Variants : `act-end` / `game-over` (Terminal).

```tsx
interface EndScreenProps {
  variant: 'act-end' | 'game-over'
  stellaImageSrc?: string
  onExit: () => void
}
```

#### `FirstClickPulse`
Ring CSS pulsant autour de la DialogueBox sur la ligne 1 uniquement. Disparaît définitivement au premier click (`store.firstClickDone`). Jamais revu.

### Roadmap d'Implémentation

**Phase 1 — Critique**
- `SceneModeWrapper` — active les modes visuels B/C/D
- `AutosaveToast` — feedback choix manquant
- `EndScreen` — fin de démo sans cet écran = expérience cassée

**Phase 2 — Qualité**
- `FirstClickPulse` — onboarding
- Tooltip ◁ au premier survol

**Phase 3 — Complétude**
- `CGViewer` — galerie CG (attend les vrais assets)

---

## UX Consistency Patterns

### Hiérarchie des Boutons

| Niveau | Usage | Style |
|---|---|---|
| Primaire | Action principale (Nouvelle partie, sélectionner un choix) | `rgba(224,92,138,0.08)` + border rose 0.2 |
| Secondaire | Actions disponibles (Continuer, Charger) | `rgba(255,255,255,0.06)` + border blanc 0.08 |
| Fantôme | Contrôles in-game (◁, >>, MENU) | Opacity 0.35 repos → 0.9 hover, sans fond |

Règles cross-boutons : DM Mono `0.72rem` `0.25em` uppercase — `0.4s cubic-bezier(0.22,1,0.36,1)` — focus-visible `outline: 2px solid rgba(127,216,216,0.5)` — hauteur min 44px.

### Feedback Patterns

| Type | Règle |
|---|---|
| Score moral | Aucune représentation UI. Feedback exclusif : expression sprite + sceneMode + réplique suivante |
| Autosave | `AutosaveToast` 1200ms bas gauche, opacity 0.7, jamais bloquant |
| Ambiance | Transitions sceneMode 1.5s ease-in-out. Jamais brusques. Jamais nommées |
| Erreur technique | Console uniquement. Fallback glassmorphism si asset manquant. Jamais visible joueur |

### Patterns Overlay

Seul overlay : `SaveLoadMenu`. Règles : fond `rgba(0,0,0,0.6) + blur(8px)` — fermeture click dehors ou bouton — animation entrée `opacity+scale 0.96→1` 0.25s. Pas de confirm dialog (autosave actif = pas de perte de données).

### États de Chargement

BootScreen = seul état de chargement visible. Jamais de spinner mid-game. Assets manquants → fallback silencieux (fond sombre + sprite glassmorphism). Le jeu ne se bloque jamais.

### Navigation Entre Écrans

| Transition | Durée | Style |
|---|---|---|
| Menu → Jeu | 0.4s | `opacity + scale(0.98)` MainMenu |
| Jeu → Menu | 0s explicite | Reset store + router push |
| Écran fin → Menu | 0.6s | Fade-out EndScreen → MainMenu |

Back navigateur : mène hors du jeu — comportement attendu, non géré.

### Patterns Texte

| Contexte | Police | Taille | Couleur |
|---|---|---|---|
| Dialogue personnage | Playfair italic | `clamp(0.9rem, 1.5vw, 1.1rem)` | `--pink-soft` |
| Narration joueur | DM Mono | identique | `rgba(255,214,224,0.75)` |
| Speaker pill | DM Mono | `0.65rem` | par personnage |
| Boutons | DM Mono | `0.72rem` | `--pink-soft` ou 0.7 |

Règle : jamais de texte coloré sur fond de même teinte. Les backgrounds assombrissent sous la DialogueBox.

**Ordre de priorité si conflit :** 1. Règles narratives (score invisible) 2. Lisibilité 3. Cohérence visuelle 4. Effets décoratifs.

---

## Responsive Design & Accessibilité

### Stratégie Responsive

**Plateforme cible unique : Desktop browser, 16:9, résolution variable. Pas de mobile, pas de tablet.**

| Résolution | Comportement |
|---|---|
| 1280×720 | Taille de référence |
| 1920×1080 | `clamp()` sur les textes, blobs et sprites en % |
| 1440×900 | Aucun problème — zones en % |
| < 900px hauteur | DialogueBox comprimée — à surveiller |
| > 2560px | `max-width: min(720px, 90vw)` sur DialogueBox |

### Stratégie Breakpoints

Un seul breakpoint pertinent : `max-width: 1023px`. En dessous, dégradation graceful sans layout alternatif. Unités : `rem` typo, `%` et `vw/vh` layouts, `clamp()` tailles fluides. Pas de `px` fixes sur les éléments critiques.

### Stratégie Accessibilité

**Cible : WCAG AA sur les points critiques. Exceptions documentées et assumées.**

**Conformités à respecter**

| Critère | Implémentation |
|---|---|
| Contraste texte (4.5:1) | pink-soft sur glassmorphism — à valider avec axe DevTools |
| Touch targets ≥ 44px | Hauteur boutons menu et choix |
| Focus visible | `outline: 2px solid rgba(127,216,216,0.5)` sur `:focus-visible` |
| Pas de clignotement 3Hz+ | Aucune animation n'atteint ce seuil |
| Alt text images | Sprites et backgrounds |

**Exceptions assumées**

| Critère | Décision |
|---|---|
| Screen readers | VN non conçu pour lecture vocale dans cette version |
| Navigation clavier complète | Tab sur boutons fonctionne. Enter = avancer dialogue |
| Sous-titres audio | À prévoir quand howler sera intégré |

### Stratégie de Test

**Responsive :** Chrome DevTools → 1280×720, 1920×1080, 1440×900, hauteur réduite 768px. Browsers : Chrome (cible), Firefox, Edge.

**Accessibilité :** axe DevTools sur `/` et `/game` — Tab sur tous les boutons — vérification contraste CSS overview.

**Performance animation :** DevTools Performance → vérifier `bgTension` et `spriteIdle` sur GPU (translate3d). Pas de layout thrashing pendant typewriter.

### Guidelines d'Implémentation

```css
button:focus-visible {
  outline: 2px solid rgba(127, 216, 216, 0.5);
  outline-offset: 2px;
}

/* Fluide — pattern à respecter */
font-size: clamp(min, preferred, max);
width: min(720px, 90vw);
```

```tsx
<Image alt="Stella — expression neutre" />  {/* sprite */}
<Image alt="" role="presentation" />         {/* background décoratif */}
```
