// === TAG FORMAT ===
// # BG: nom-du-background
// # SPRITE: nom-personnage-expression [nom2-expression2]
// # SPEAKER: nom-personnage
// # ENTER: nom-personnage-expression
// # EXIT: nom-personnage
// # SFX: nom-effet
// # MUSIC: nom-piste
// ==================

VAR score = 0

# BG: toit-lycee

Tu montes les escaliers deux par deux. Le métal résonne sous tes pas.

Elle t'a envoyé un message il y a vingt minutes. Juste trois mots : "Viens. Le toit."

Pas de contexte. Pas d'explication. Typique.

Tu pousses la porte. L'air du soir te frappe — frais, teinté de rose.

Le vent souffle doucement sur le toit du lycée. Le ciel est teinté de rose, comme toujours à cette heure.

Et elle est là.

# SPRITE: etoile-neutre
# SPEAKER: etoile

ÉTOILE : ...Tu es vraiment venu.

ÉTOILE : Je pensais que tu allais encore te défiler, comme d'habitude.

Elle te regarde avec un mélange de reproche et de soulagement.

ÉTOILE : Bon... j'ai quelque chose à te montrer. Mais promets-moi de ne pas flipper.

Elle tend sa main devant elle. Une lueur rosée apparaît entre ses doigts, pulsant doucement comme un battement de cœur.

# SPRITE: etoile-surprise

ÉTOILE : Ça a commencé hier soir. Je ne sais pas ce que c'est... mais ça ne s'arrête pas.

Pendant un instant — si bref que tu doutes de l'avoir vu — son regard se vide complètement. Comme si quelqu'un avait éteint la lumière derrière ses yeux.

# SPRITE: etoile-vide

...

# SPRITE: etoile-surprise

Puis elle cligne des yeux et c'est fini. Elle ne semble pas s'en être rendu compte.

* [Rester calme et l'écouter]
  ~ score = score + 5
  Tu gardes ton sang-froid. C'est ce dont elle a besoin maintenant.
  # SPRITE: etoile-soulagee
  # SPEAKER: etoile
  ÉTOILE : ...Merci de ne pas paniquer. Ça me rassure un peu.
  ÉTOILE : Tu sais, t'es la seule personne à qui j'oserais montrer ça.
  -> suite

* [Lui prendre la main pour examiner]
  ~ score = score + 3
  Tu t'approches et prends délicatement sa main. La lumière est chaude au toucher.
  # SPRITE: etoile-genee
  # SPEAKER: etoile
  ÉTOILE : H-hey ! Qu'est-ce que tu fais ?!
  Elle rougit mais ne retire pas sa main.
  ÉTOILE : ...C'est bizarre. Quand tu la touches, elle brille plus fort.
  -> suite

=== suite ===

# SPRITE: etoile-neutre

Un silence s'installe entre vous deux. La lueur continue de pulser.

Soudain, une petite forme lumineuse descend du ciel et se pose sur la rambarde.

# ENTER: lunae-neutre
# SPEAKER: lunae

LUNAE : ★ Bonsoir, bonsoir~ ! C'est donc toi, la nouvelle étoile ?

# SPEAKER: etoile
# SPRITE: etoile-surprise lunae-neutre
ÉTOILE : Q-qu'est-ce que... ?! C'est quoi ce truc ?!

# SPEAKER: lunae
# SPRITE: etoile-surprise lunae-enthousiaste
LUNAE : "Truc" ? Comme c'est impoli~ ! Je suis Lunae, ton guide cosmique !

# SPEAKER: etoile
ÉTOILE : Mon... guide cosmique ?

# SPEAKER: lunae
# SPRITE: etoile-neutre lunae-enthousiaste
LUNAE : Exactement ! Et toi, tu es spéciale. Très, très spéciale~

LUNAE : Mais on reparlera de tout ça. Pour l'instant...

# SPRITE: etoile-neutre lunae-neutre

Lunae se tourne vers toi. Son regard te traverse — pas comme celui d'une petite créature mignonne. Comme celui de quelqu'un qui te reconnaît.

# SPEAKER: lunae
LUNAE : Oh~ C'est donc *toi*. Oui, oui... tu feras très bien l'affaire~

Étoile ne relève pas. Mais toi, tu as senti quelque chose. Cette chose te connaît.

# SPEAKER: etoile
ÉTOILE : Est-ce que... est-ce que tu crois que je suis normale ?

* [Tu es extraordinaire.]
  ~ score = score + 3
  # SPEAKER: etoile
  # SPRITE: etoile-soulagee lunae-enthousiaste
  ÉTOILE : ...Extraordinaire, hein ?
  Elle sourit, mais ses yeux brillent d'une lueur différente.
  # SPEAKER: lunae
  LUNAE : Oh, je l'aime bien celui-là~
  ÉTOILE : J'espère que tu le penseras encore quand tu sauras tout.
  -> murmure

* [Personne n'est normal.]
  ~ score = score + 5
  # SPEAKER: etoile
  # SPRITE: etoile-neutre lunae-neutre
  ÉTOILE : Pfff... Typique de toi, ça.
  Elle rit doucement.
  ÉTOILE : Mais ouais... t'as peut-être raison.
  # SPEAKER: lunae
  # SPRITE: etoile-neutre lunae-enthousiaste
  LUNAE : Hmm~ Intéressant comme réponse...
  -> murmure

=== murmure ===

Lunae s'élève doucement dans l'air, s'éloignant vers le ciel rosé.

# SPRITE: etoile-neutre lunae-neutre

Tu crois entendre un murmure — à peine audible, comme porté par le vent.

"Parfait... celle-ci tiendra plus longtemps~"

Mais c'est peut-être ton imagination.

-> fin

=== fin ===

# EXIT: lunae

Le soleil disparaît derrière les buildings. La lueur dans sa main s'estompe lentement.

# SPEAKER: etoile
# SPRITE: etoile-neutre

Le vent du soir se lève. Tu la vois frissonner légèrement — un frisson qui parcourt ses épaules nues.

Sans réfléchir, elle se rapproche de toi. Pas beaucoup. Juste assez pour que ton bras frôle le sien.

ÉTOILE : ...Désolée. J'ai un peu froid.

Elle ne s'écarte pas.

ÉTOILE : On devrait y aller. Mais... on se revoit demain ?

Elle te regarde avec une intensité que tu ne lui connaissais pas.

ÉTOILE : Promets-le moi.

[ Fin de la démo - À suivre... ]

-> END
