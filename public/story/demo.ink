# BG: toit-lycee

Tu montes les escaliers deux par deux. Le métal résonne sous tes pas.
Elle t'a envoyé un message il y a vingt minutes. Juste trois mots : "Viens. Le toit."
Pas de contexte. Pas d'explication. Typique.
Tu t'arrêtes un instant devant la porte métallique.
Ça fait combien de temps que vous ne vous étiez pas vraiment parlé ?
Trois semaines. Peut-être quatre.
Tu pousses la porte. L'air du soir te frappe — frais, teinté de rose.
Le ciel se teinte d'orangé au-dessus des buildings. En bas, la ville commence à s'allumer.
Et elle est là.
Dos appuyé contre la rambarde. Les bras croisés. Les yeux fixés sur ses propres mains.

# SPRITE: etoile-neutre
# SPEAKER: etoile

ÉTOILE : ...Tu es vraiment venu.
ÉTOILE : Je pensais que tu allais encore te défiler, comme d'habitude.

Elle te regarde avec un mélange de reproche et de soulagement.
Tu remarques qu'elle a les mains légèrement crispées.
Quelque chose ne va pas.

ÉTOILE : Ça fait un moment que j'essaie de t'appeler, tu sais.
ÉTOILE : Bon... laisse tomber. T'es là, c'est l'essentiel.

Un silence. Elle hésite.

ÉTOILE : J'ai quelque chose à te montrer. Mais promets-moi de ne pas flipper.

* [Promettre sans hésiter]
    Ouais. Promis.
    # SPRITE: etoile-soulagee
    ÉTOILE : ...D'accord. D'accord.
    Elle expire lentement. Comme si elle retenait son souffle depuis des heures.
    -> montrer_pouvoir

* [Demander ce qui se passe d'abord]
    Attends — t'es sûre que ça va ? T'as l'air...
    # SPRITE: etoile-genee
    ÉTOILE : Non. Enfin, oui. Enfin...
    Elle secoue la tête.
    ÉTOILE : C'est pour ça que je t'ai appelé. Juste... regarde.
    -> montrer_pouvoir

=== montrer_pouvoir ===

Elle tend sa main devant elle, paume vers le haut.
Rien ne se passe pendant deux secondes.
Puis — une lueur. Rosée. Pulsant doucement entre ses doigts, comme un battement de cœur.

# SPRITE: etoile-surprise

ÉTOILE : Ça a commencé hier soir. Je faisais mes devoirs, et puis...
ÉTOILE : J'ai pensé à quelque chose de triste, et ma main s'est mise à briller.
ÉTOILE : J'ai cru que je devenais folle.

La lumière s'intensifie légèrement, puis se stabilise.

ÉTOILE : Ça ne s'arrête pas. Même quand je dors — enfin, si j'arrive à dormir.
ÉTOILE : Et ce matin au lycée j'ai failli... peu importe. C'est pas grave.

Elle détourne le regard.
Mais c'est grave. Tu le vois dans ses yeux.

* [Rester calme et l'écouter]
    Tu gardes ton sang-froid.
    Tu t'assieds sur le rebord du toit, à côté d'elle.
    Comme si c'était normal. Comme si les gens avaient des mains lumineuses tous les jours.
    # SPRITE: etoile-soulagee
    # SCORE: +10
    ÉTOILE : ...Tu ne dis rien ?
    ÉTOILE : Merci. Vraiment. J'avais besoin que quelqu'un ne panique pas.
    ÉTOILE : T'es la seule personne à qui j'oserais montrer ça, tu sais.
    -> reaction_lunae

* [Lui prendre la main pour examiner]
    Tu t'approches et prends délicatement sa main.
    La lumière est chaude au toucher. Pas brûlante — chaude. Comme tenir une tasse de thé.
    # SPRITE: etoile-genee
    # SCORE: +5
    ÉTOILE : H-hey ! Qu'est-ce que tu fais ?!
    Elle rougit mais ne retire pas sa main.
    ÉTOILE : ...C'est bizarre. Quand tu la touches, elle brille plus fort.
    Elle observe le phénomène avec toi, presque curieuse malgré elle.
    ÉTOILE : Pourquoi ça fait ça ?
    Tu n'as pas de réponse. Mais tu lâches pas sa main.
    -> reaction_lunae

* [Reculer d'un pas malgré toi]
    C'est sorti tout seul. Un réflexe.
    Tu as fait un pas en arrière.
    # SPRITE: etoile-brisee
    # SCORE: -10
    Elle a vu.
    Un voile passe sur son visage. Elle referme sa main.
    ÉTOILE : ...Je comprends.
    ÉTOILE : C'est normal. C'est la bonne réaction, même.
    Mais sa voix a changé. Quelque chose s'est fermé.
    -> reaction_lunae

=== reaction_lunae ===

# SPRITE: etoile-neutre

Un silence s'installe. La lueur continue de pulser, douce et régulière.
Le vent souffle. Quelque part en bas, une voiture klaxonne.

Tu allais dire quelque chose — quoi exactement, tu sais pas —
quand une petite forme lumineuse descend du ciel
et se pose sur la rambarde avec la légèreté d'un flocon.

# ENTER: lunae-neutre
# SPEAKER: lunae
# SPRITE: etoile-surprise lunae-neutre

LUNAE : ★ Bonsoir, bonsoir~ ! C'est donc toi, la nouvelle étoile ?

# SPEAKER: etoile

ÉTOILE : Q-qu'est-ce que... ?!
ÉTOILE : C'est quoi ce truc ?!

# SPEAKER: lunae
# SPRITE: etoile-surprise lunae-enthousiaste

LUNAE : "Truc" ? Comme c'est impoli~ !
LUNAE : Je m'appelle Lunae. Guide cosmique, confidente des étoiles, et officiellement...
LUNAE : ...ta nouvelle meilleure amie.

# SPEAKER: etoile
# SPRITE: etoile-neutre lunae-enthousiaste

ÉTOILE : Ma... meilleure amie ?

# SPEAKER: lunae

LUNAE : Ton guide, plutôt. Les détails sont ennuyeux, on verra ça plus tard.
LUNAE : Ce qui compte c'est que tu es spéciale, Étoile.
LUNAE : Très, très spéciale~

# SPEAKER: etoile
# SPRITE: etoile-neutre lunae-neutre

ÉTOILE : Tu dis ça comme si c'était une bonne nouvelle.

# SPEAKER: lunae

LUNAE : C'en est une ! Enfin... ça dépend des choix qu'on fait.

Elle tourne la tête vers toi.
Ses yeux sont trop brillants. Trop sûrs d'eux.

# SPEAKER: lunae
# SPRITE: etoile-neutre lunae-neutre

LUNAE : Et toi. L'ami. Tu seras son manager.
LUNAE : Je crois que tu feras parfaitement l'affaire.

# SPEAKER: etoile

ÉTOILE : Attends — son manager ? Il est pas au courant de—

# SPEAKER: lunae

LUNAE : Il l'est maintenant~ !

Un silence pesant.
Étoile te regarde. Elle a l'air aussi perdue que toi.

# SPEAKER: etoile

ÉTOILE : Est-ce que... est-ce que tu crois que je suis normale ?

Elle pose la question à mi-voix.
Comme si elle avait peur de la réponse.
Comme si elle te la posait à toi, pas à la créature lumineuse.

* [Tu es extraordinaire.]
    # SCORE: +5
    # SPRITE: etoile-soulagee lunae-enthousiaste
    # SPEAKER: etoile
    ÉTOILE : ...Extraordinaire.
    Elle répète le mot doucement. Le goûte.
    ÉTOILE : J'espère que tu le penseras encore quand tu sauras tout.
    # SPEAKER: lunae
    LUNAE : Oh, je l'aime bien, celui-là~
    -> fin_scene

* [Personne n'est normal.]
    # SCORE: +10
    # SPRITE: etoile-neutre lunae-neutre
    # SPEAKER: etoile
    ÉTOILE : Pfff. Typique de toi, ça.
    Elle rit. Un vrai rire, court mais sincère.
    ÉTOILE : Mais ouais... t'as peut-être raison.
    # SPEAKER: lunae
    # SPRITE: etoile-neutre lunae-enthousiaste
    LUNAE : Hmm~ Intéressant comme réponse...
    -> fin_scene

* [Tu ne réponds pas.]
    # SCORE: -5
    # SPRITE: etoile-neutre lunae-neutre
    Le silence dure trop longtemps.
    # SPEAKER: etoile
    ÉTOILE : ...Ok.
    Un seul mot. Elle détourne les yeux.
    # SPEAKER: lunae
    LUNAE : Bon. On aura le temps de travailler ça.
    -> fin_scene

=== fin_scene ===

# EXIT: lunae

Le soleil disparaît derrière les buildings.
La lueur dans sa main s'estompe lentement, comme une bougie qu'on souffle.
Le toit redevient juste un toit.

# SPRITE: etoile-neutre
# SPEAKER: etoile

ÉTOILE : On devrait y aller.

Elle ramasse son sac. Hésite une seconde.

ÉTOILE : Mais... on se revoit demain ?

Elle te regarde avec une intensité que tu ne lui connaissais pas.
Pas de reproche cette fois. Juste — une vraie question.

ÉTOILE : Promets-le moi.

-> END
