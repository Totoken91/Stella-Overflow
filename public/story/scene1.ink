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

"C'est donc toi."

Tu ne sais pas encore ce que ça veut dire.

Mais tu as envie de le savoir.

-> scene2

// ═══════════════════════════════════════════
// SCÈNE 2 — L'ÉVEIL
// ═══════════════════════════════════════════

=== scene2 ===

# SCENE: scene2
# BG: couloir-univ
# MOOD: calm

Tu as mal dormi.

Pas d'insomnie franche — juste ce genre de nuit où le cerveau tourne à vide sans jamais s'arrêter vraiment. La lueur entre ses doigts. Le regard de Lunae. "C'est donc toi."

Tu ranges tes affaires en automatique. Premier cours dans vingt minutes.

# SPRITE: stella-excitee

Stella est dans le couloir.

Ce qui est différent : elle te cherche.

Pas le regard au sol entre les dalles. Elle scanne les visages, elle avance vite, et quand elle te voit elle bifurque dans ta direction sans hésiter.

# SPEAKER: stella

STELLA : T'as dormi ?

Elle dit ça comme si la réponse l'intéressait vraiment.

STELLA : Moi non. J'ai essayé un truc — attends.

Elle regarde autour d'elle. Couloir plein. Elle baisse la voix.

# SPRITE: stella-genee

STELLA : J'ai déplacé mon bureau. De trente centimètres. Sans le toucher.

Un temps.

STELLA : J'ai passé deux heures à remettre les trucs qui étaient dessus parce que tout était tombé. Mais — j'ai déplacé le bureau.

Elle te regarde. Elle attend quelque chose — pas de la stupéfaction. Plutôt une confirmation que ça compte autant qu'elle pense que ça compte.

* ["C'est énorme."]
    ~ score = score + 2
    # SPRITE: stella-heureuse
    # SPEAKER: stella
    STELLA : Ouais.
    Elle dit ça doucement, comme si elle se l'autorisait pour la première fois.
    STELLA : Ouais, je pense que c'est énorme aussi.
    -> scene2_cours

* ["T'as pas dormi pour ça ?"]
    ~ score = score + 1
    # SPRITE: stella-surprise
    # SPEAKER: stella
    Elle cligne des yeux.
    STELLA : ...Oui ?
    Un temps.
    STELLA : C'était pas le but au départ mais — ouais.
    Elle a l'air de trouver ça raisonnable.
    -> scene2_cours

=== scene2_cours ===

# SPRITE: stella-neutre

Le cours commence. Vous rentrez en classe.

Tu passes l'heure à la regarder de profil — deux rangs devant toi, côté fenêtre. Elle prend des notes. Ou elle fait semblant.

De temps en temps elle regarde ses mains.

// ─────────────────────────────────────────
// LA MANIFESTATION
// ─────────────────────────────────────────

# BG: cafeteria-univ
# MOOD: calm

La pause de midi. La cafétéria est pleine.

Vous vous retrouvez à la même table — par défaut, sans que personne ne le propose vraiment. Elle s'est assise. Tu t'es assis.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : T'as remarqué le gars là-bas ?

Elle fait un micro-mouvement de tête vers une table au fond. Pas un geste. Juste assez pour que tu regardes.

Un étudiant, seul. Des feuilles étalées partout. Un highlighter dans une main, l'autre posée à plat sur la table. Il fixe ses notes.

Il fixe ses notes depuis combien de temps ?

STELLA : Il a pas bougé depuis qu'on est arrivés.

# MOOD: tension

C'est vrai. Il n'a pas mangé. Il n'a pas regardé son téléphone. Il n'a pas levé la tête quand quelqu'un a fait tomber un plateau.

Son highlighter est encore ouvert. L'encre va sécher.

Quelque chose dans la façon dont il est immobile n'est pas normale.

Puis les gens autour de lui commencent à se déplacer.

Pas brusquement. Juste — ils prennent leurs plateaux, ils changent de table, ils trouvent une raison de s'éloigner. Sans se concerter. Sans savoir pourquoi.

La table autour de lui se vide.

# SPRITE: stella-surprise

Et alors tu le vois.

Quelque chose flotte autour de lui. Pas de la fumée. Pas de la lumière. Quelque chose entre les deux — une densité dans l'air, sombre, qui pulse très lentement. Comme une respiration.

Ça n'a pas de forme. Ça n'a pas de bruit.

Mais ça prend de la place.

# MOOD: tension
# STOP_FF

Les étudiants les plus proches ont l'air mal sans savoir pourquoi. Une fille se frotte les bras. Un garçon regarde dans sa direction puis détourne les yeux immédiatement.

L'étudiant ne bouge toujours pas.

# SPEAKER: stella

STELLA : (très bas) Qu'est-ce que c'est.

Ce n'est pas une question.

// ─────────────────────────────────────────
// LA TRANSFORMATION
// ─────────────────────────────────────────

# MOOD: intimate

Les mains de Stella sont posées à plat sur la table.

La lueur revient.

Pas comme sur le toit — douce, pulsante, contrôlée. Là c'est différent. Ça monte trop vite, ça déborde de ses paumes, ça remonte le long de ses bras sans qu'elle fasse rien.

# SPRITE: stella-vide

Ses yeux changent.

Ce regard — tu l'as déjà vu. Sur le toit, une fraction de seconde. La pièce qui se vide d'elle sans qu'elle parte.

Cette fois ça dure.

# STOP_FF

Puis quelque chose se passe.

La lumière explose vers l'extérieur — un battement unique, silencieux, qui fait ciller tout le monde dans la cafétéria sans qu'ils sachent pourquoi.

// ─────────────────────────────────────────
// CG BRIEF POUR MÉLANIE — transformation-scene2
// Stella debout, au centre de la cafétéria, dans son costume de transformation
// Costume : design à définir avec Mélanie — tons lavande et rose, entre
// l'uniforme scolaire et quelque chose d'autre, pas de cape ni d'ailes
// Dans sa main droite : le Glock lavande pastel — bras tendu vers le bas,
// comme si elle venait de réaliser ce qu'elle tient
// Son expression : stupéfaction totale, elle regarde l'arme, pas la menace
// Autour d'elle : les étudiants reculés, téléphones baissés, silence
// Lumière : éclat rosé résiduel qui s'estompe
// ─────────────────────────────────────────

# CG: transformation-scene2
# SPRITE: stella-surprise

Quand la lumière se dissipe, Stella est debout.

Son uniforme a changé.

Elle baisse les yeux sur elle-même — puis sur sa main droite.

Le Glock est là. Lavande pastel. Réel. Lourd.

Elle le tient à bout de bras, bras tendu vers le bas, comme quelqu'un qui ne sait pas s'il faut poser la chose ou la lancer.

# SPEAKER: stella

STELLA : ...C'est quoi.

Personne ne répond. La cafétéria est silencieuse.

STELLA : C'est quoi ça.

Elle parle de l'arme. Pas de la manifestation. Pas du costume. De l'arme.

Autour d'elle, les gens regardent. Certains ont sorti leur téléphone — réflexe. Mais quelque chose dans leurs yeux est étrange. Ils voient. Ils ne *comprennent* pas ce qu'ils voient. Le costume, la lumière, l'arme — ça ne rentre dans aucune case. Leurs cerveaux cherchent une explication et n'en trouvent pas.

Une fille murmure *c'est quoi ce cosplay*.

Un garçon baisse son téléphone sans avoir filmé.

Personne ne dit *c'est Stella*.

# CG:

// ─────────────────────────────────────────
// PASS 4 — LE PREMIER CHOIX
// ─────────────────────────────────────────

Stella relève les yeux.

Elle regarde la densité sombre qui pulse autour de l'étudiant. Puis elle te regarde.

Elle tient encore le Glock bras tendu vers le bas. Elle ne sait pas quoi en faire.

Elle attend. Pas de permission — juste un signal.
# STOP_FF

* [Faire un mouvement vers la table au fond.]
    ~ score = score + 5
    -> choix_raisonner

* [Croiser son regard. Ne rien dire.]
    ~ score = score - 3
    -> choix_supprimer

=== choix_raisonner ===

# MOOD: intimate
# SPEAKER:

Tu te lèves. Un mouvement, pas un plan.

Stella lit ça immédiatement. Elle se lève aussi — et elle passe devant toi.

Elle marche vers la table du fond, toi un pas derrière. C'est elle qui avance. Toi tu la suis.

Elle s'arrête à côté d'Haruto et elle s'accroupit pour être à sa hauteur.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Hé.

L'étudiant ne réagit pas.

STELLA : Hé. Tu peux me dire ton nom ?

Rien. Puis —

STELLA : Je m'appelle Stella. Je suis deux rangs derrière toi en cours de socio. Je sais pas si t'as déjà fait attention à moi mais — moi j'ai fait attention à toi.

# SPEAKER:

C'est une technique bizarre et elle le sait. Son ton est direct, presque maladroit. Pas de pitié. Juste une présence.

La densité change.

Elle pulse différemment — plus vite, comme quelque chose qui essaie de résister. Haruto frémit. Puis quelque chose se casse.

Il parle. Des mots qui sortent trop vite, trop longtemps coincés — l'examen de fin de semestre, son père qui attend les résultats, le dortoir silencieux à 2h du matin avec les fiches de révision qui ne rentrent plus. Il pleure sans s'en rendre compte.

Stella l'écoute. Elle ne dit rien.

# MOOD: tension

La densité se contracte.

Elle ne regarde pas le Glock — mais dans sa main, l'arme émet quelque chose. Pas un son. Une vibration, brève, comme une corde qu'on pince une seule fois.

La densité se contracte encore. Disparaît.

# MOOD: calm
# STOP_FF

Haruto s'arrête de parler.

Il reste là, le visage mouillé, les mains sur ses feuilles. Il respire. Il regarde ses notes.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : ...Je savais pas du tout ce que je faisais.

Elle se relève lentement. Elle regarde sa main.

STELLA : L'arme elle a — ça s'est fait tout seul. J'ai juste écouté et elle a...

Elle cherche ses mots.

STELLA : C'était quoi ce bruit.

-> scene2_aftermath

=== choix_supprimer ===

# MOOD: tension
# SPEAKER:

Tu croises son regard. Tu ne dis rien.

Stella attend encore une seconde. Elle comprend.

# SPRITE: stella-vide

Elle se retourne vers la manifestation. Elle lève le bras.

Elle tire.

# STOP_FF

Claquement sec. Lumière lavande en ligne droite. La densité disparaît.

Proprement. Instantanément.

# MOOD: dissociation

Les gens autour regardent dans la direction d'où venait le bruit — et ne voient rien d'anormal à regarder.

Haruto cligne des yeux.

Il pose le highlighter. Il regarde ses mains. Il range ses feuilles dans son sac, une par une, méthodiquement, sans urgence.

Il se lève. Il part.

# STOP_FF

Il a l'air bien.

Vraiment bien — détendu, presque serein.

Quelque chose qui était dans ses yeux ne l'est plus.

# MOOD: calm
# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : C'est réglé — enfin. Il a l'air... il va bien.

Un temps.

STELLA : Je pense qu'il va bien.

Elle ne rajoute rien. Elle n'est pas sûre.

-> scene2_aftermath

=== scene2_aftermath ===

# MOOD: calm
# BG: cafeteria-univ
# SPRITE: stella-neutre
# SPEAKER:

La cafétéria a repris son bruit normal.

Vous êtes encore debout, tous les deux, au milieu des plateaux et des conversations. Personne ne vous regarde. Ou personne ne *veut* regarder.

Stella range le Glock — il disparaît. Comme il est apparu. Elle baisse les yeux sur sa main vide.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : J'ai besoin de... deux minutes. Enfin plus que deux minutes. Jsp.

Elle ramasse son sac. Elle s'arrête.

STELLA : Merci. Enfin — t'as rien fait vraiment. Mais. Ouais.

Elle repart sans attendre ta réponse.

// ─────────────────────────────────────────
// SIGNAL DE LUNAE
// ─────────────────────────────────────────

# EXIT: stella
# MOOD: dissociation
# STOP_FF
# SPEAKER:

Tu te retournes.

Lunae est là.

Pas comme sur le toit — elle ne flotte pas, elle n'est pas théâtrale. Elle est simplement debout, à deux tables de toi, comme si elle avait été là depuis le début.

# ENTER: lunae
# SPRITE: lunae-neutre
# SPEAKER: lunae

LUNAE : Elle apprend vite.

Elle te regarde.

Pas vers l'endroit où Stella est partie. Vers toi.

Et elle sourit.

# STOP_FF

Ce sourire — tu l'as déjà vu. Il y a cinq minutes. Sur le visage de Stella, quand Haruto a commencé à parler.

Identique.

LUNAE : Prends soin d'elle.

# EXIT: lunae
# MOOD: calm

Elle n'est plus là.

Tu ne sais pas si elle a disparu ou si tu as détourné les yeux une fraction de seconde trop tôt.

// ─────────────────────────────────────────
// PASS 6 — DATING SCENE
// ─────────────────────────────────────────

# BG: couloir-univ
# MOOD: calm
# SPEAKER:

C'est le soir. Les couloirs sont presque vides.

Tu croises Stella devant les casiers. Elle t'a pas cherché cette fois — c'est toi qui passais par là.

Elle a l'air moins épuisée qu'à midi. Pas bien non plus. Entre les deux.

{ score >= 6:
    -> dating_healthy
- else:
    -> dating_unhealthy
}

=== dating_healthy ===

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : T'es encore là.

Pas une question. Plutôt — une observation. Elle range quelque chose dans son sac.

STELLA : Je pensais que t'aurais... jsp. Disparu.

# SPEAKER:

Elle veut dire : après ce matin. Après la cafétéria.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : J'ai réfléchi à ce que t'as fait. Aller vers lui comme ça. Sans savoir ce qui allait se passer.

Un temps.

STELLA : C'était con. Mais — ouais. C'était bien.

Elle ferme son casier.

STELLA : T'as faim ?

# STOP_FF

# SPEAKER:

C'est une invitation. Elle te regarde en attendant.

Pas de sourire. Juste — elle attend.

* [Ouais.]
    -> dating_healthy_suite

* [J'ai un truc à faire.]
    ~ score = score - 1
    -> dating_healthy_refus

=== dating_healthy_suite ===

# MOOD: intimate
# BG: exterieur-soir
# SPRITE: stella-heureuse
# SPEAKER:

Vous mangez dehors. Des trucs du konbini assis sur un muret.

Elle parle peu. Toi aussi. Ce n'est pas gênant.

À un moment elle regarde ses mains — les mêmes mains, la même lumière qui dormait dedans ce matin.

# SPEAKER: stella

STELLA : Je comprends pas encore ce que je fais.

Un temps.

STELLA : Mais j'aime bien que tu sois là quand je le fais.

Elle dit ça en regardant ailleurs. Vite. Comme si elle avait pas dit ça.

# STOP_FF

-> fin_scene2

=== dating_healthy_refus ===

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Ah. Ouais non c'est bon.

Elle repart. Son dos dans le couloir.

Tu sais pas si c'était la bonne réponse.

-> fin_scene2

=== dating_unhealthy ===

# SPRITE: stella-vide
# SPEAKER: stella

STELLA : T'es encore là.

C'est dit différemment. Pas une observation — presque une accusation douce.

STELLA : Après ce matin... t'aurais pu partir. La plupart des gens partent.

# SPEAKER:

Elle s'appuie contre les casiers. Elle te regarde.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : T'as rien dit quand j'ai tiré. T'as pas bougé. C'était... je sais pas. Ça m'a aidée.

Un temps.

STELLA : Peut-être que j'ai besoin de quelqu'un qui bouge pas.

# STOP_FF

# SPEAKER:

Il y a quelque chose dans cette phrase qui devrait te faire hésiter.

Ça ne te fait pas hésiter.

* [Rester sans rien dire.]
    -> dating_unhealthy_suite

* ["C'est pas comme ça que ça marche."]
    ~ score = score + 2
    -> dating_unhealthy_recul

=== dating_unhealthy_suite ===

# MOOD: intimate
# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : T'es bizarre.

Elle dit ça sans que ce soit une insulte.

STELLA : Tout le monde essaie de m'expliquer des trucs ou de partir. Toi tu fais ni l'un ni l'autre.

Elle regarde ses mains.

STELLA : J'aime bien ça. Je pense.

# STOP_FF

# SPEAKER:

Je pense. Elle n'est pas sûre. Et toi tu dis toujours rien.

-> fin_scene2

=== dating_unhealthy_recul ===

# SPRITE: stella-surprise
# SPEAKER: stella

STELLA : ...Qu'est-ce que tu veux dire.

# SPEAKER:

Elle a l'air genuinement déstabilisée. Comme si personne lui avait dit ça avant.

STELLA : Je veux juste — jsp. Quelqu'un qui reste.

Un temps.

STELLA : C'est pas une demande bizarre.

-> fin_scene2

=== fin_scene2 ===

# MOOD: calm
# BG: couloir-univ
# SPEAKER:

Tu ne sais pas encore ce que tu es en train de faire.

Mais Lunae, elle, avait l'air de savoir.

"Prends soin d'elle."

-> scene3

// ═══════════════════════════════════════════
// SCÈNE 3 — LA RUE
// ═══════════════════════════════════════════

=== scene3 ===

# SCENE: scene3
# BG: rue-soir
# MOOD: calm
# SPEAKER:

Vous marchez.

Pas de destination précise — c'est arrivé comme ça. Les cours étaient finis, tu allais quelque part, elle allait quelque part, et à un moment vos quelque part sont devenus le même endroit sans que personne ne le propose vraiment.

Les rues près du campus à cette heure — petits commerces qui ferment, vélos garés en double, une odeur de dashi qui sort d'un izakaya.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : T'as déjà eu l'impression que tes mains t'appartenaient pas ?

# SPEAKER:

Elle marche les bras le long du corps. Elle regarde ses mains.

# SPEAKER: stella

STELLA : Genre — elles font des trucs. Tu les regardes faire. Mais c'est pas toi.

Un temps.

STELLA : Avant c'était métaphorique.

# SPEAKER:

Tu comprends ce qu'elle veut dire.

# MOOD: tension

C'est là que vous l'entendez.

Une voix. Pas fort — mais le genre de ton qui coupe l'air. Quelqu'un qui parle à quelqu'un d'autre avec l'intention que ça fasse mal.

Vous tournez au coin de rue.

# BG: rue-incident
# STOP_FF

Ils sont trois. Enfin — deux qui regardent et un qui se fait détruire.

Le garçon contre le mur a la vingtaine, cartable à l'épaule, les épaules remontées comme s'il essayait de prendre moins de place. En face de lui, une fille. Elle parle pas fort. Elle n'a pas besoin.

VOIX : — t'as même pas su quoi dire. Comme d'habitude. Bébé Cadum.

Le garçon ne répond pas.

VOIX : Regarde-moi quand je te parle. Allez. Regarde-moi.

# SPRITE: stella-surprise
# SPEAKER: stella

STELLA : (très bas) On devrait —

# SPEAKER:

Elle s'arrête. Elle n'a pas fini sa phrase. Elle regarde la scène.

Les deux témoins ont sorti leur téléphone. Quelqu'un filme.

Le garçon regarde toujours le sol.

Tu restes là toi aussi. T'as pas bougé. T'aurais pu — l'impulsion était là. Mais t'as pas bougé.

// ─────────────────────────────────────────
// LA MANIFESTATION
// ─────────────────────────────────────────

# MOOD: tension
# SPEAKER:

Le garçon lève les yeux.

Pas vers la fille. Vers le téléphone.

Il voit qu'on filme.

Un temps. Puis quelque chose se passe dans son visage — pas de l'effondrement. L'inverse.

# STOP_FF

Ça vient de lui.

Pas comme dans la cafétéria — froid, dense, qui s'accumulait depuis des mois sur un garçon qui ne savait plus comment respirer. Ça c'était de la pression. Quelque chose qui cherchait une issue.

Ça, c'est de la rage. Et elle sait exactement où elle va.

# BG: rue-manifestation
# MOOD: dissociation

La température monte.

L'air autour de lui ondule, lourd, chaud. La manifestation ne flotte pas autour de lui comme une aura — elle sort de lui, elle est lui, elle prend la même posture que lui quand il se redresse enfin contre le mur.

Il se redresse.

Les épaules qui étaient remontées depuis le début — elles descendent.

# STOP_FF

Il regarde la fille.

Pas avec des larmes. Pas avec de la peur. Avec quelque chose qu'il n'avait probablement jamais utilisé devant elle.

La poubelle à deux mètres se renverse. Les vitres d'un commerce tremblent. Une alarme de vélo se déclenche seule.

Les témoins reculent. La fille recule.

Lui, il ne bouge pas. Il n'a plus besoin de bouger.

# SPRITE: stella-surprise
# SPEAKER: stella

STELLA : C'est pas la même chose.

# SPEAKER:

Non.

# SPEAKER: stella

STELLA : Lui — il est dedans. Il le sait.

La manifestation pulse une fois, fort. Un éclat de lumière rouge sombre.

STELLA : Faut faire quelque chose.

// ─────────────────────────────────────────
// LA TRANSFORMATION
// ─────────────────────────────────────────

# MOOD: intimate
# SPEAKER:

Stella fait un pas en avant.

Pas involontaire cette fois. Elle choisit de faire ce pas.

Tu la vois décider.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Ok.

Elle dit ça pour elle-même. Pas pour toi.

STELLA : Ok. Je — ok.

# SPEAKER:

Elle lève les mains. La lumière revient — mais différemment. Pas comme hier — débordante, incontrôlable, qui montait sans qu'elle fasse rien. Là elle l'appelle. Elle essaie de l'appeler.

Ça résiste.

# MOOD: tension
# STOP_FF

La lueur commence, s'arrête. Recommence. Ses mains tremblent légèrement — pas de peur. D'effort.

On peut presque voir le moment où elle faillit renoncer.

# SPEAKER: stella

STELLA : (entre ses dents) Allez.

# SPEAKER:

Et ça vient.

Plus lent qu'hier. Plus dur. Comme forcer une porte qui ne veut pas s'ouvrir.

// ─────────────────────────────────────────
// CG BRIEF POUR MÉLANIE — transformation-scene3
// Stella debout dans la rue, en pleine transformation
// Contrairement à S2 — pas de stupéfaction. Les mâchoires serrées.
// La lumière qui monte le long de ses bras de façon irrégulière,
// comme si elle luttait contre quelque chose
// Autour : la manifestation rouge sombre en arrière-plan,
// le garçon debout au centre, les témoins qui filment
// Expression : concentration totale, presque douloureuse
// ─────────────────────────────────────────

# CG: transformation-scene3
# SPRITE: stella-vide

Le costume. Le Glock.

Cette fois elle le regarde à peine. Elle le saisit.

# CG:

Les téléphones des témoins qui filmaient — leurs écrans sont devenus noirs. Pas éteints. Juste noirs.

# STOP_FF

Une fille dans la rue murmure *c'est quoi ce cosplay encore*.

Personne ne dit *c'est Stella*.

# SPEAKER: stella

STELLA : (au garçon, voix posée) Hé.

Il la regarde.

STELLA : Je te vois.

// ─────────────────────────────────────────
// PASS 4 — LE CHOIX MORAL S3
// ─────────────────────────────────────────

# MOOD: tension
# STOP_FF
# SPEAKER:

Le garçon ne répond pas. Mais il ne détourne pas les yeux non plus.

La manifestation tourne autour de lui, plus lente maintenant — comme si elle attendait.

Stella tient le Glock. Elle te cherche du regard.

Il est dedans. Il le sait.

* [Il peut en sortir par lui-même.]
    ~ score = score + 5
    -> s3_raisonner

* [C'est lui le danger maintenant.]
    ~ score = score - 4
    -> s3_supprimer

=== s3_raisonner ===

# MOOD: intimate
# SPEAKER:

Stella comprend.

Elle baisse le Glock. Elle s'avance vers lui — pas vers la manifestation. Vers lui.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : T'as entendu ce qu'elle t'a dit.

Le garçon ne répond pas.

STELLA : Moi j'ai entendu. Et — c'était cruel. C'était vraiment cruel.

# SPEAKER:

La manifestation pulse. Stella ferme les yeux une seconde — elle absorbe quelque chose. On voit que ça coûte.

# SPRITE: stella-vide
# SPEAKER: stella

STELLA : Mais là t'es en train de te noyer dedans. Et si tu te noies dedans ça va pas juste toucher elle.

Un temps.

STELLA : Regarde autour de toi.

# SPEAKER:

Il regarde. La fille qui a reculé. Les témoins. La poubelle renversée. Les vitres fissurées.

Il reste avec ça un moment.

Puis quelque chose dans ses épaules lâche — différemment que la rage. Quelque chose en dessous.

# MOOD: tension

La manifestation hésite. Elle pulse, irrégulière, comme quelque chose qui cherche encore à résister.

Stella lève le Glock — pas vers lui. Vers ce qui reste autour de lui.

Cette fois c'est différent. La lumière sort lentement, presque à contrecœur — comme si l'arme aussi sentait que c'est plus compliqué qu'avant. Puis elle cède.

La manifestation se défait, par fragments.

# MOOD: calm
# STOP_FF

Le garçon s'assoit par terre.

Pas un effondrement — juste ses jambes qui décident d'arrêter. Il regarde ses mains. Il respire.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : (souffle court) C'était — elle résistait. Elle voulait pas partir.

Elle regarde sa main qui tremble légèrement.

STELLA : La prochaine fois ce sera encore plus dur je pense.

-> s3_aftermath

=== s3_supprimer ===

# MOOD: tension
# SPEAKER:

Stella comprend.

Elle lève le Glock. Elle vise la manifestation.

# SPRITE: stella-vide

Elle tire.

# STOP_FF

L'impact est différent de la cafétéria. La rage résiste — une fraction de seconde, la lumière lavande et le rouge sombre se heurtent — puis ça cède.

La manifestation explose vers l'intérieur et disparaît.

# MOOD: dissociation

Le garçon glisse contre le mur jusqu'au trottoir.

Il regarde ses mains. La fille est toujours là. Il lève les yeux vers elle.

Il se relève. Il ramasse son cartable.

Il repart. Seul. Pas avec elle — juste ailleurs.

# STOP_FF

Il marchait différemment qu'avant. Plus droit. Ou peut-être juste — plus rien à porter.

Impossible de dire si c'est bien ou pas.

# MOOD: calm
# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Il est parti.

Un temps.

STELLA : C'est — ouais. C'est réglé.

Elle dit ça comme si elle essayait de savoir si elle y croit.

-> s3_aftermath

=== s3_aftermath ===

// ─────────────────────────────────────────
// PASS 5 — AFTERMATH + SIGNAL DE DOUTE
// ─────────────────────────────────────────

# MOOD: calm
# BG: rue-soir
# SPRITE: stella-neutre
# SPEAKER:

La rue reprend son bruit.

Quelqu'un ramasse la poubelle renversée sans savoir pourquoi elle est tombée. Les écrans de téléphone se rallument. Une dame sort d'un commerce, regarde autour d'elle, rentre.

Stella range le Glock. Il disparaît.

Elle reste là, bras le long du corps, à regarder l'endroit où le garçon était.

# SPEAKER: stella

STELLA : T'as faim ?

# SPEAKER:

Tu la regardes.

# SPEAKER: stella

STELLA : Je sais pas pourquoi j'ai dit ça. Je suis pas — non, j'ai faim en fait. C'est bizarre.

# SPEAKER:

Tu vas dire quelque chose quand tu la vois changer d'expression.

// ─────────────────────────────────────────
// SIGNAL DE DOUTE
// ─────────────────────────────────────────

# MOOD: dissociation
# STOP_FF

# ENTER: lunae
# SPRITE: lunae-neutre
# SPEAKER: lunae

LUNAE : Kenji s'en sortira.

# SPEAKER:

Stella se fige.

# SPEAKER: stella

STELLA : ...Comment tu sais comment il s'appelle.

# STOP_FF

# SPEAKER:

Lunae sourit.

# SPEAKER: lunae

LUNAE : Il s'appelait Kenji dans mon esprit. C'est tout.

# SPEAKER:

C'est une réponse. Elle n'explique rien.

Tu repenses à la cafétéria. Au toit. À chaque fois que Lunae est apparue — où elle était, depuis combien de temps.

Quand est-ce qu'elle est arrivée ce soir ?

# SPEAKER: lunae

LUNAE : Elle progresse.

# STOP_FF

# EXIT: lunae
# MOOD: calm

Elle n'est plus là.

Stella te regarde.

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : Elle était là depuis quand.

// ─────────────────────────────────────────
// PASS 6 — DATING SCENE FINALE + CLÔTURE ACTE 1
// ─────────────────────────────────────────

# MOOD: calm
# BG: rue-soir
# SPEAKER:

Vous restez là quelques secondes sans rien dire.

La rue est normale. Les gens passent. Un scooter double une voiture. Quelqu'un rit dans un izakaya.

Stella range ses mains dans ses poches.

# SPEAKER: stella

STELLA : On marche ?

# SPEAKER:

C'est pas une vraie question. Elle commence déjà à avancer.

{ score >= 13:
    -> s3_dating_healthy
- else:
    -> s3_dating_unhealthy
}

=== s3_dating_healthy ===

# MOOD: intimate
# BG: parc-soir
# SPRITE: stella-neutre
# SPEAKER:

Vous finissez dans un parc. Un banc. Elle s'assoit, tu t'assois.

Il n'y a rien à faire ici. C'est le but.

# SPEAKER: stella

STELLA : Je pense que j'aime ça.

# SPEAKER:

Elle regarde devant elle.

# SPEAKER: stella

STELLA : Pas les pouvoirs en soi. Ce que ça fait quand ça marche. Quand il a regardé autour de lui et qu'il a réalisé.

Un temps.

STELLA : C'est peut-être nul de dire ça.

# SPEAKER:

Elle te regarde.

# SPEAKER: stella

STELLA : T'as envie de recommencer ?

# STOP_FF

* [Ouais.]
    -> s3_healthy_oui

* [Je sais pas encore.]
    -> s3_healthy_jsp

=== s3_healthy_oui ===

# SPRITE: stella-heureuse
# SPEAKER: stella

STELLA : Ouais.

Elle dit ça comme si tu venais de confirmer quelque chose qu'elle pensait déjà.

STELLA : Ok. Bien.

Elle se lève. Elle tend la main — pas pour que tu la prennes. Pour te tirer debout.

# STOP_FF

# SPEAKER:

Ses doigts sont tièdes. La lumière dort dedans quelque part.

Elle te lâche dès que tu es debout. Mais pas tout de suite.

-> s3_healthy_glock

=== s3_healthy_jsp ===

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : Ouais. Moi non plus.

Un temps.

STELLA : Mais t'es là quand même.

# STOP_FF

# SPEAKER:

Elle dit ça sans te regarder. Comme une observation sur la météo.

-> s3_healthy_glock

=== s3_healthy_glock ===

# MOOD: dissociation
# STOP_FF
# SPEAKER:

Vous allez repartir quand ça arrive.

Le Glock est dans la main de Stella.

Pas de transformation. Pas de manifestation. Pas de raison visible.

Il est juste là — lavande pastel, réel, lourd — pendant deux secondes.

Puis il disparaît.

# SPRITE: stella-surprise
# SPEAKER: stella

STELLA : ...C'était pas — j'ai pas fait ça volontairement.

# SPEAKER:

Elle regarde sa main. Vide.

# SPEAKER: stella

STELLA : Je l'ai même pas senti venir.

# STOP_FF

# SPEAKER:

Ni toi ni elle ne savez quoi en faire.

-> fin_s3_healthy

=== fin_s3_healthy ===

# MOOD: calm
# SPEAKER:

Vous rentrez séparément. Elle part dans une direction, toi dans une autre.

À mi-chemin elle se retourne.

# SPRITE: stella-neutre
# SPEAKER: stella

STELLA : Hé.

# SPEAKER:

Tu te retournes.

# SPEAKER: stella

STELLA : Merci d'être venu sur le toit ce soir-là.

# STOP_FF

# SPEAKER:

Elle repart avant que tu puisses répondre.

-> cliffhanger

=== s3_dating_unhealthy ===

# MOOD: intimate
# BG: rue-soir
# SPRITE: stella-neutre
# SPEAKER:

Vous vous arrêtez sous un lampadaire. Elle s'appuie contre le mur.

Elle te regarde.

# SPEAKER: stella

STELLA : T'es là depuis le début.

# SPEAKER:

Ce n'est pas une question.

# SPEAKER: stella

STELLA : Le toit. La cafétéria. Ce soir. T'es toujours là.

Un temps.

STELLA : Pourquoi ?

# STOP_FF

* [Je sais pas.]
    -> s3_unhealthy_jsp

* [Parce que t'as besoin de quelqu'un.]
    -> s3_unhealthy_besoin

=== s3_unhealthy_jsp ===

# SPRITE: stella-genee
# SPEAKER: stella

STELLA : ...Ouais. Moi non plus je sais pas pourquoi je te cherche.

Un temps.

STELLA : C'est peut-être suffisant.

# STOP_FF

# SPEAKER:

Elle dit ça comme une conclusion. Comme si elle avait résolu quelque chose.

Tu sais pas si c'est vrai.

-> s3_unhealthy_glock

=== s3_unhealthy_besoin ===

# SPRITE: stella-vide
# SPEAKER: stella

STELLA : ...Ouais.

Elle le dit trop vite. Comme si elle attendait qu'on lui dise ça.

STELLA : Ouais, probablement.

# STOP_FF

# SPEAKER:

Quelque chose dans cette facilité devrait t'alerter.

Ça ne t'alerte pas.

-> s3_unhealthy_glock

=== s3_unhealthy_glock ===

# MOOD: dissociation
# STOP_FF
# SPEAKER:

Elle reste là, sous le lampadaire. Trop proche peut-être.

Sa main s'approche — pas pour toucher. Juste près. La chaleur qui dort dans ses pouvoirs passe à travers l'air entre vous.

Elle ne sait pas qu'elle fait ça.

Ou peut-être que si.

Le Glock apparaît dans sa main.

Deux secondes. Puis disparaît.

# SPRITE: stella-surprise
# SPEAKER: stella

STELLA : ...Je sais pas ce que ça veut dire.

# STOP_FF

# SPEAKER:

Puis elle dit quelque chose.

Une phrase courte. Le genre de chose qu'on dit en partant.

# SPEAKER: stella

STELLA : Elle sera là si t'as besoin.

# STOP_FF

# SPEAKER:

Tu l'entends.

La cadence. Le choix des mots. Ce n'est pas Stella.

Elle repart avant que tu puisses y mettre un nom.

-> cliffhanger

=== cliffhanger ===

// ─────────────────────────────────────────
// CLIFFHANGER — CLÔTURE ACTE 1
// ─────────────────────────────────────────

# MOOD: calm
# BG: rue-nuit
# SPEAKER:

Tu rentres seul.

Les rues sont plus vides maintenant. Les commerces fermés. Les néons éteints un par un.

Tu penses à Lunae. Pas ce soir — avant.

# MOOD: dissociation
# STOP_FF

Avant le toit.

Avant Stella.

Il y a quelque chose dans ta mémoire qui ressemble à un souvenir de Lunae — mais antérieur. Quelque chose qui ne peut pas être là. Tu essaies de le retrouver. C'est comme essayer de regarder quelque chose en vision périphérique — dès que tu tournes la tête vers ça, ça disparaît.

Mais c'était là.

# MOOD: tension
# STOP_FF

Tu passes devant le bâtiment du campus.

Par habitude tu lèves les yeux vers le toit.

# BG: toit-nuit

Il y a quelqu'un là-haut.

Une silhouette. Debout dans le noir. Immobile.

Qui regarde dans ta direction.

# STOP_FF

Trop loin pour voir un visage. Trop immobile pour être normal.

Ce n'est pas Lunae. Ce n'est pas Stella.

Tu ne sais pas ce que c'est.

La silhouette ne bouge pas.

Tu repars.

# MOOD: calm
# BG: rue-nuit

Derrière toi, sur le toit — tu ne regardes pas si elle est encore là.

[ Fin de l'Acte 1 — À suivre... ]

-> END

