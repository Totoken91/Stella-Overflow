// ─── VN UI demo reel ──────────────────────────────
// Dialogue simple → choix → disturbance → emphasis →
// choix 3 → démo transitions BG → fin.
// ──────────────────────────────────────────────────

# BG: couloir-univ
# MOOD: calm

Le couloir est vide. La lumière du soir cogne contre les vitres.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Tu es là depuis longtemps ?

# SPEAKER:

Elle dit ça sans te regarder vraiment.

* [Rester sans répondre.]
    # EMPHASIS: thought
    Tu n'as pas de réponse.
    -> disturbance_beat

* ["Non. Je viens d'arriver."]
    # SPEAKER: stella
    STELLA : D'accord.
    -> disturbance_beat

=== disturbance_beat ===

# MOOD: calm
# SPEAKER:

La lumière change. Tu ne saurais pas dire comment.

# DISTURB
Il y a quelque chose qui cloche.

# SPEAKER: stella
STELLA : Tu l'as senti aussi.

# MOOD: intimate
# SPEAKER:

# EMPHASIS: whisper
Elle s'approche d'un pas.

-> trois_choix

=== trois_choix ===

# SPEAKER: stella

STELLA : Qu'est-ce qu'on fait.

* [Partir maintenant.]
    -> transitions_reel
* [Attendre de voir.]
    -> transitions_reel
* ["Je ne sais pas."]
    # MOOD: dissociation
    # SPEAKER: stella
    STELLA : Moi non plus.
    -> transitions_reel

=== transitions_reel ===

// ─── Démo transitions BG ──────────────────────────

# BG: couloir-univ
# TRANSITION: crossfade
# MOOD: calm
# SPEAKER:

On part du couloir.

# BG: exterieur-soir
# TRANSITION: crossfade

Crossfade vers l'extérieur.

# BG: rue-nuit
# TRANSITION: fade-black

Fade-black. Ellipse temporelle.

# BG: rue-manifestation
# TRANSITION: fade-crimson

Fade-crimson. Bascule dissociation.

# BG: toit-univ
# TRANSITION: fade-white

Fade-white. Flashback.

# BG: couloir-univ
# TRANSITION: cut

Cut sec, retour brutal.

-> fin

=== fin ===

# MOOD: calm
# SPEAKER:

Fin de la démo.

-> END
