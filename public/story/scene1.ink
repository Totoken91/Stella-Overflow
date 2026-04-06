// === TAG FORMAT ===
// # BG: nom-du-background
// # SPRITE: nom-personnage-expression [nom2-expression2]
// # SPEAKER: nom-personnage
// # ENTER: nom-personnage-expression
// # EXIT: nom-personnage
// # MOOD: calm | tension | intimate | dissociation
// # SFX: nom-effet
// # MUSIC: nom-piste
// ==================

VAR score = 0

// ═══════════════════════════════════════════
// SCÈNE 1 — LA DÉCOUVERTE
// ═══════════════════════════════════════════

# SCENE: scene1
# BG: couloir-univ
# MOOD: calm

La journée tire à sa fin.

Le couloir sent la poussière, le café froid, et ce fond de sac qui colle à tout.

Tu connais cette odeur par cœur. Tu connais ce couloir par cœur. Même trajet depuis septembre. Même sortie à droite, même escalier du fond, même porte métallique au dernier étage qui grince si tu la laisses claquer.

Deuxième année. Les cours ont arrêté d'être nouveaux depuis un moment.

Tu ranges tes affaires sans regarder. Les stylos dans la poche avant, le chargeur en dernier parce que le câble est trop long et prend toujours plus de place que prévu. Tu fais ça dans l'ordre depuis des semaines.

Les étudiants quittent la salle par vagues — les premiers partent avant même que le prof ait fini sa phrase, les derniers traînent sans raison particulière. Tu fais partie de ni l'un ni l'autre.

# SPRITE: stella-neutre

Stella passe dans le couloir.

Elle marche près du mur, sac serré contre elle, les yeux quelque part entre le sol et les dalles. Comme d'habitude.

Tu la connais de vue. Même promo depuis septembre — tu sais qu'elle s'appelle Stella parce qu'elle est sur la liste d'appel, tu sais qu'elle s'assoit côté fenêtre rangée du milieu. Tu sais qu'elle ne lève jamais la main même quand elle connaît la réponse — tu l'as vue hésiter une fois, la main à mi-chemin, et se raviser.

C'est à peu près tout. Elle n'occupe pas l'espace de cette façon-là. Elle est là, elle écoute, elle part.

# EXIT: stella

Elle disparaît au bout du couloir sans se retourner.

Tu finis de ranger tes affaires.

Dehors il fait encore clair. Pas envie de rentrer tout de suite.

Tu prends l'escalier de service, celui du fond. Moins de monde. En haut il y a le toit — accès normalement interdit, serrure cassée depuis des mois, personne n'a jamais réparé. Quelques étudiants le savent. La plupart s'en foutent.

Toi tu y vas parfois. Quand t'as besoin d'air.

// ─────────────────────────────────────────
// TOIT — LA DÉCOUVERTE
// ─────────────────────────────────────────

# BG: toit-univ
# MOOD: calm

Tu pousses la porte.

Elle grince. Elle a toujours grincé.

# SPRITE: stella-vide

Tu la vois en premier.

Ou plutôt — tu vois la lumière en premier.

Une lueur entre ses doigts. Rosée, pulsante. Elle a les mains tendues devant elle, les yeux fermés, les épaules contractées comme quelqu'un qui essaie de soulever quelque chose qu'on ne peut pas toucher.

Elle n'a pas entendu la porte.

...

La lumière vacille. S'intensifie une seconde. Puis elle lâche — les doigts se desserrent, la lueur disparaît, et Stella rouvre les yeux sur ses paumes vides avec quelque chose qui ressemble à de la frustration.

# SPRITE: stella-surprise

Elle te voit.

Un silence.

# SPEAKER: stella

STELLA : C'est rien.

Elle referme les mains.

STELLA : T'as rien vu.

Elle dit ça trop vite pour que ça soit vrai.

# STOP_FF

...

STELLA : OK t'as vu. Mais — dis-le à personne.

Elle te regarde. Elle cherche quelque chose dans ton expression — la peur, peut-être, ou le jugement. Elle ne trouve probablement pas ce qu'elle cherchait.

STELLA : S'il te plaît.

// ─────────────────────────────────────────
// PREMIER CHOIX
// ─────────────────────────────────────────

Elle attend.

Le toit est silencieux sauf pour le bruit de la ville en contrebas — klaxons lointains, un chien quelque part, une fenêtre qui se ferme.

Tu n'as aucune explication rationnelle pour ce que tu viens de voir. Tu en cherches une quand même, par réflexe. La lumière du soleil. Un reflet. Quelque chose dans tes yeux.

Aucune tient.

* [T'asseoir par terre sans rien dire.]
    ~ score = score + 5
    Tu t'assieds contre le mur, les jambes étendues. Comme si t'étais venu là pour ça depuis le début.
    # SPRITE: stella-genee
    # SPEAKER: stella
    STELLA : ...C'est quoi ta réaction.
    Elle dit ça à mi-voix. Pas vraiment une question.
    STELLA : T'aurais pas pu crier ou partir ou jsp.
    -> stella_explique

* ["C'était quoi ?"]
    ~ score = score + 3
    # SPRITE: stella-genee
    # SPEAKER: stella
    Elle baisse les yeux sur ses mains.
    STELLA : Je sais pas.
    Un temps.
    STELLA : Vraiment. Je sais pas ce que c'est.
    -> stella_explique

=== stella_explique ===

# SPRITE: stella-neutre
# SPEAKER: stella

Elle s'assoit aussi — pas près de toi, à deux mètres, dos à la rambarde. Elle regarde ses mains posées à plat sur ses genoux.

STELLA : Ça a commencé il y a trois jours.

Un temps.

STELLA : J'essayais de faire léviter ma télécommande. J'avais vu un truc sur internet, un tour de passe-passe, je voulais comprendre comment c'était fait.

Elle marque une pause.

STELLA : La lampe a explosé.

# SPRITE: stella-surprise

STELLA : Enfin — j'ai pas su si c'était moi ou si c'était la lampe qui avait décidé de mourir ce soir-là. Mais le lendemain j'ai recommencé avec un stylo et le stylo a traversé le mur.

Elle lève les yeux.

STELLA : Le plâtre a un trou. Un petit trou. Mais quand même.

# SPRITE: stella-neutre

STELLA : Depuis je m'entraîne ici. Personne monte.

Elle te regarde.

STELLA : D'habitude.

-> lunae_approche

// ─────────────────────────────────────────
// LUNAE — ENTRÉE
// ─────────────────────────────────────────

=== lunae_approche ===

# MOOD: tension

Un silence s'installe.

Stella a arrêté de parler.

Elle regarde un point derrière toi — et quelque chose dans son expression change. Pas de la peur. Quelque chose qu'on pourrait appeler de la reconnaissance. Comme si elle s'était attendue à ça.

# ENTER: lunae-neutre
# SPRITE: stella-neutre lunae-neutre

Lunae est là.

Petite. Lumineuse. Suspendue dans l'air du soir comme si la gravité avait décidé de faire une exception pour elle.

Elle vous regarde tous les deux — Stella d'abord, longuement.

Puis elle se tourne vers toi.

Son regard dure une seconde de trop.

# SPEAKER: lunae

LUNAE : ...Ah.

Un temps.

LUNAE : C'est donc toi.

Elle dit ça comme si elle confirmait quelque chose qu'elle savait déjà. Comme si elle avait une liste quelque part, et que tu venais d'être coché dessus.

Il y a quelque chose dans ce ton — trop assuré, trop posé. Comme quelqu'un qui connaît la fin de l'histoire avant qu'elle commence.

LUNAE : Je m'appelle Lunae.

Elle laisse ça reposer. Pas de présentation théâtrale. Pas d'explication.

Elle se tourne vers Stella. Son ton change — plus doux, presque attentionné. La différence entre les deux versions d'elle est nette.

LUNAE : Tu as bien fait. Tu vas avoir besoin de lui.

# SPRITE: stella-surprise lunae-neutre
# SPEAKER: stella

STELLA : Comment tu sais qu'il est—

# SPEAKER: lunae

LUNAE : Parce que c'est moi qui t'ai choisie.

Un silence.

LUNAE : Et lui avec toi.

Elle dit ça simplement. Comme un fait établi depuis longtemps.

Tu la regardes. Elle soutient ton regard sans ciller.

Quelque chose cloche — tu ne saurais pas dire quoi exactement. Une sensation vague. Comme quelqu'un qui récite un texte appris et n'a jamais eu à improviser.

* ["Comment tu sais qui je suis ?"]
    ~ score = score + 3
    # SPEAKER: lunae
    LUNAE : Bonne question.
    Elle te regarde avec quelque chose qui ressemble à de la satisfaction.
    LUNAE : Tu poseras les bonnes questions. C'est rassurant.
    Elle ne répond pas pour autant.
    -> fin_scene1

* [L'observer en silence.]
    ~ score = score + 5
    Lunae remarque ton silence. Le coin de ses lèvres remonte, légèrement.
    # SPEAKER: lunae
    LUNAE : ...Encore mieux.
    # SPEAKER: stella
    STELLA : (à voix basse) Elle te fait pas peur ?
    -> fin_scene1

// ─────────────────────────────────────────
// FIN DE SCÈNE
// ─────────────────────────────────────────

=== fin_scene1 ===

# EXIT: lunae
# SPRITE: stella-neutre
# MOOD: intimate

Lunae disparaît.

Pas de sortie théâtrale. Juste une absence là où il y avait une présence — comme si l'air s'était refermé sur elle.

Un long silence.

# SPEAKER: stella

Stella regarde l'endroit où Lunae était. Puis ses mains. Puis toi.

STELLA : ...Elle fait ça tout le temps.

Elle dit ça à mi-voix. Comme si elle s'excusait d'un truc dont elle n'est pas responsable.

STELLA : Apparaître. Disparaître. Dire des trucs et partir avant qu'on puisse répondre.

Elle ramasse son sac.

STELLA : Je sais pas ce qu'elle est. Elle dit des trucs qui—

Elle s'arrête. Secoue légèrement la tête.

STELLA : Enfin.

Elle te regarde une seconde — pas longtemps.

STELLA : Tu vas pas le dire à personne ?

Ce n'est pas vraiment une question sur la réponse. C'est une question sur pourquoi tu es encore là.

STELLA : Bonne nuit.

# EXIT: stella
# MOOD: calm

Elle repart. La porte grince derrière elle.

Tu restes seul sur le toit.

Le ciel est violet maintenant. Les lumières de la ville s'allument une à une en contrebas.

Une fille que tu croisais sans lui parler depuis septembre. Une lueur entre ses doigts. Une entité suspendue dans l'air du soir qui connaît ton nom.

*"C'est donc toi."*

Tu ne sais pas encore ce que ça veut dire.

Mais tu as envie de le savoir.

[ Fin de la Scène 1 — À suivre... ]

-> END

// ═══════════════════════════════════════════
// SCÈNE 2 — À ÉCRIRE
// ═══════════════════════════════════════════
