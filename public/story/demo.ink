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
# SCENE: scene1
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

ÉTOILE : ...Bonne nuit.

# EXIT: etoile

Tu la regardes descendre les escaliers. La porte se referme. Tu es seul sur le toit.

Le ciel est devenu violet. Les lumières de la ville s'allument une à une en contrebas.

...Qu'est-ce qui vient de se passer ?

-> scene2

// ═══════════════════════════════════════════
// SCÈNE 2 — PREMIER SAUVETAGE
// ═══════════════════════════════════════════

=== scene2 ===

# BG:

# SCENE: scene2
...

La nuit a été longue. Tu n'as presque pas dormi.

À chaque fois que tu fermais les yeux, tu revoyais cette lueur rosée entre ses doigts. Et ce regard vide — juste un instant — comme si quelqu'un d'autre regardait à travers elle.

Et cette chose. Lunae. « C'est donc *toi*. »

Qu'est-ce qu'elle voulait dire par là ?

# BG: couloir-lycee

Le lendemain. Le lycée bruisse de son bourdonnement habituel.

Tu marches dans le couloir principal, les mains dans les poches. La fatigue te colle aux paupières.

Et puis tu entends sa voix.

# SPRITE: etoile-neutre
# SPEAKER: etoile

ÉTOILE : Hey ! Tu as bien dormi ?

Elle te rejoint en trottinant, un peu essoufflée.

ÉTOILE : Moi j'ai pas fermé l'œil. Je pouvais pas arrêter de... tu sais.

Elle jette un coup d'œil à ses mains. La lueur n'est pas visible — mais elle sait qu'elle est là, juste sous la surface.

ÉTOILE : J'ai essayé de faire léviter ma télécommande cette nuit. J'ai cassé une lampe.

Un bruit sourd résonne depuis l'étage du dessus. Puis un cri.

# SPRITE: etoile-surprise

Vous courez vers les escaliers. Un élève est étalé en bas des marches, le visage tordu de douleur. Sa jambe forme un angle anormal. Autour, les gens paniquent — certains filment avec leurs téléphones.

ÉTOILE : Oh non... Sa jambe... C'est...

Elle recule d'un pas. Ses mains tremblent. La lueur rosée commence à filtrer entre ses doigts.

ÉTOILE : Je... je pourrais peut-être...

# ENTER: lunae-enthousiaste
# SPEAKER: lunae

LUNAE : Tu pourrais, oui~ Tu pourrais complètement~

# SPEAKER: etoile
# SPRITE: etoile-surprise lunae-enthousiaste

ÉTOILE : Lunae ?! Pas ici, les gens vont te voir !

# SPEAKER: lunae

LUNAE : Personne ne me voit sauf toi et ton Manager, chérie~ Allez, montre-leur ce que tu sais faire !

Étoile te regarde, cherchant une réponse dans tes yeux.

# SPEAKER: etoile

ÉTOILE : Qu'est-ce que je fais ?

-> scene2_choice

=== scene2_choice ===

* [L'encourager avec mesure — "Vas-y doucement"]
  ~ score = score + 5
  # SPRITE: etoile-neutre lunae-neutre
  # SPEAKER: etoile
  Tu poses ta main sur son épaule. « Respire. Concentre-toi juste sur lui. Pas sur la foule. »
  Elle hoche la tête, inspire profondément.
  ÉTOILE : ...D'accord. Juste lui.
  -> scene2_intervention

* [La pousser — "Fonce, montre-leur qui tu es"]
  ~ score = score - 3
  # SPRITE: etoile-surprise lunae-enthousiaste
  # SPEAKER: lunae
  LUNAE : Exactement ! C'est le moment, Étoile !
  # SPEAKER: etoile
  Étoile serre les poings. La lueur s'intensifie.
  ÉTOILE : OK. OK, j'y vais.
  -> scene2_intervention

=== scene2_intervention ===

# EXIT: lunae

Elle s'agenouille près de l'élève. Ses mains brillent — et cette fois, tout le monde peut voir.

# CG: transformation-scene2

...

La lumière l'enveloppe. Pendant une seconde, son uniforme semble se dissoudre dans l'éclat rosé avant de se reformer en quelque chose d'autre — un costume que personne ne lui a appris à porter.

C'est la première fois. Et c'est magnifique.

# CG:
# SPRITE: etoile-neutre

La lueur se concentre dans ses paumes. Elle les pose sur la jambe blessée. L'élève grimace — puis son visage se détend. L'os se replace. La douleur s'efface.

Silence dans le couloir. Puis quelqu'un applaudit. Puis un autre. Étoile se relève, les jambes tremblantes, le costume déjà en train de se dissiper.

# SPRITE: etoile-soulagee
# SPEAKER: etoile

ÉTOILE : ...J'ai réussi ?

Elle rit nerveusement, les yeux brillants.

ÉTOILE : J'ai vraiment réussi !

Mais tu remarques ses mains — elles tremblent encore. Et il y a une fine pellicule de sueur sur son front. Ce n'était pas gratuit.

-> scene2_dating

=== scene2_dating ===
Après les cours. Le lycée est presque vide.
# BG: toit-lycee
# SPRITE: etoile-neutre

Étoile t'a envoyé un message : « Rejoins-moi au toit. J’ai un truc pour toi 💫 »

{ score >= 8:
  -> dating_scene2_healthy
- else:
  -> dating_scene2_unhealthy
}

=== dating_scene2_healthy ===
# SPEAKER: etoile
# SPRITE: etoile-genre

Quand tu arrives, Étoile est assise par terre avec un tupperware sur les genoux et un sourire timide.
ÉTOILE : J’ai… j’ai cuisiné. Pour fêter ma première mission réussie !

Elle ouvre le tupperware. L’odeur est… particulière.
ÉTOILE : C’est censé être des onigiri. Enfin… je crois.

Tu en prends un. La forme est bancale et le goût est un mélange sucré-salé raté.
Tu fais une grimace malgré toi. Étoile éclate de rire, les joues rouges.

# CG: dating-scene2-healthy

ÉTOILE : C’est horrible, hein ?! Mon Dieu, ta tête ! Je le savais !

Vous riez tous les deux, assis sur le béton tiède du toit pendant que le soleil couchant colore le ciel en rose orangé.
Elle finit par se rapprocher de toi, encore secouée de rire.

ÉTOILE : …Merci d’avoir été là aujourd’hui. Vraiment.

Elle monte doucement à califourchon sur tes jambes. Le baiser commence timidement puis devient plus profond. Ses hanches bougent lentement contre toi, ses seins pressés contre ton torse dans une tension sensuelle et joueuse.

# CG: dating-scene2-healthy

ÉTOILE : La prochaine fois… je commanderai des pizzas, promis.

Elle rit doucement contre tes lèvres, le souffle un peu court.

-> scene2_end


=== dating_scene2_unhealthy ===
# SPEAKER: etoile
# SPRITE: etoile-excitee

Quand tu arrives sur le toit, Étoile court vers toi et se jette littéralement dans tes bras, le corps tremblant d’adrénaline.

ÉTOILE : Tu as vu ?! Tu as vu ce que j’ai fait ?!

Ses yeux brillent d’une excitation presque fiévreuse. Elle se colle violemment contre toi, poitrine écrasée contre ton torse.

# CG: dating-scene2-unhealthy

ÉTOILE : J’étais incroyable, non ? Dis-moi que j’étais incroyable… !

Sans te laisser le temps de répondre, elle enfouit son visage dans ton cou et t’embrasse la peau avec urgence, la respiration saccadée.
Sa main descend rapidement entre vos corps. Elle caresse d’abord ton sexe par-dessus le pantalon, puis glisse directement à l’intérieur, ses doigts chauds se refermant autour de ta verge déjà dure.

ÉTOILE : (murmure rauque contre ton cou) Je me sens tellement puissante… mais j’ai besoin de ça… j’ai besoin de toi…

Elle commence à te masturber avec des mouvements rapides et impatients. Sa main monte et descend le long de ta queue avec ferveur, le pouce passant régulièrement sur ton gland humide. Elle tremble contre toi, son souffle chaud et irrégulier.

ÉTOILE : Plus fort… dis-moi que j’étais bien… dis-le…

Ses mouvements s’accélèrent. Elle te branle de plus en plus vite, serrant juste comme il faut, le corps collé au tien comme si elle avait peur que tu disparaisses. Ses seins se pressent contre ta poitrine à chaque va-et-vient de sa main.

ÉTOILE : Je veux te sentir jouir… s’il te plaît… jouis pour moi…

Elle accélère encore, la main glissante et frénétique, le regard fiévreux levé vers toi. Ses lèvres effleurent ton cou, sa langue te lèche la peau pendant qu’elle continue à te pomper sans ralentir.

Quand le plaisir devient trop intense, tu jouis dans sa main avec un grognement étouffé. Étoile ne s’arrête pas tout de suite : elle continue à te caresser lentement pendant que tu éjacules, recueillant ton sperme chaud entre ses doigts, un petit sourire satisfait et troublé sur les lèvres.

ÉTOILE : (essoufflée) …Voilà… c’est mieux comme ça…

Elle retire lentement sa main, regarde un instant le résultat sur ses doigts, puis les essuie discrètement sur sa jupe sans te quitter des yeux.

ÉTOILE : Reste avec moi ce soir… Je veux pas redescendre seule.

# CG: dating-scene2-unhealthy

-> scene2_end


=== scene2_end ===
# SPRITE: etoile-neutre
# BG: toit-lycee

Le soleil disparaît derrière les immeubles. Le vent du soir se lève, un peu plus frais.

Étoile a goûté à ses pouvoirs… et à cette nouvelle façon de se sentir vivante.
Et toi, tu viens de comprendre à quel point ça peut monter vite… et à quel point ça peut devenir dangereux.

[ Fin de la Scène 2 — À suivre... ]

-> END
