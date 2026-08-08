/* Cardiff Community Meals — recipient story content, in English and Cymraeg.
   These three profiles correspond to the seeded demo requests (Margaret,
   David, Iris) so the "people behind the numbers" feature ties directly to
   the live data elsewhere on the site. Names are first-name only by design
   — see the safeguarding notes on the How It Works page.
   Welsh text here is AI-assisted and, like the rest of the site's Cymraeg
   content, should be reviewed by a professional Welsh translator before
   any real-world use — this content in particular carries emotional
   weight and deserves a native speaker's eye. */

const STORIES = [
  {
    id: "margaret",
    name: "Margaret",
    area: "Cathays",
    business: "Cathays Kitchen",
    initial: "M",
    color: "#006e33",
    en: {
      situation: "Recently discharged from hospital",
      teaser: "After a fall and a week in hospital, Margaret came home to find the hardest part wasn't the recovery — it was not having the energy to cook. Five hot dinners later, that's one less thing to worry about.",
      need: "Margaret, 78, spent a week in the University Hospital of Wales after a fall at home led to hip surgery. Coming home was a relief, but standing at the cooker long enough to make a proper dinner was still out of the question, and her physiotherapy exercises took most of the energy she had left. Her daughter lives in Bristol and could only get down at weekends.",
      help: "A referral from her physiotherapist meant Margaret's request was live within a day. A donor funded five dinners, and Cathays Kitchen — five minutes from her front door — delivered a hot meal every evening for her first week home, timed around her rest periods.",
      quote: "I've lived on my own for years and I'm used to managing. But that first week, just not having to think about dinner meant I actually had the energy to do my exercises properly. And it wasn't just the food — someone I'll never meet took the time to arrange it for me. That matters more than they probably realise."
    },
    cy: {
      situation: "Newydd ei ryddhau o'r ysbyty",
      teaser: "Ar ôl cwympo a threulio wythnos yn yr ysbyty, daeth Margaret adref i ddarganfod mai'r rhan anoddaf oedd peidio â chael digon o egni i goginio. Bum swper poeth yn ddiweddarach, dyna un peth llai i boeni amdano.",
      need: "Treuliodd Margaret, 78, wythnos yn Ysbyty Athrofaol Cymru ar ôl i gwymp gartref arwain at lawdriniaeth ar ei chlun. Roedd dod adref yn rhyddhad, ond roedd sefyll wrth y stof yn ddigon hir i goginio swper priodol yn dal yn amhosib, ac roedd ei hymarferion ffisiotherapi yn cymryd y rhan fwyaf o'r egni oedd ganddi ar ôl. Mae ei merch yn byw ym Mryste ac ond yn gallu dod i lawr ar benwythnosau.",
      help: "Diolch i gyfeiriad gan ei ffisiotherapydd, roedd cais Margaret yn fyw o fewn diwrnod. Ariannodd rhoddwr bum swper, a danfonodd Cathays Kitchen — bum munud o'i drws ffrynt — bryd poeth bob min nos yn ystod ei hwythnos gyntaf adref, wedi'i amseru o gwmpas ei chyfnodau gorffwys.",
      quote: "Rwyf wedi byw ar fy mhen fy hun ers blynyddoedd ac rwy'n gyfarwydd ag ymdopi. Ond y wythnos gyntaf honno, roedd peidio â gorfod meddwl am swper yn golygu bod gen i wir egni i wneud fy ymarferion yn iawn. Ac nid y bwyd yn unig oedd e — cymerodd rhywun na fyddaf byth yn ei gyfarfod yr amser i'w drefnu i mi. Mae hynny'n golygu mwy nag y maen nhw'n sylweddoli, siŵr o fod."
    }
  },
  {
    id: "david",
    name: "David",
    area: "Grangetown",
    business: "Taste of Grangetown",
    initial: "D",
    color: "#e31b3d",
    en: {
      situation: "Living with a disability",
      teaser: "David's mobility means a weekly shop and a full evening of cooking can wipe out the energy he needs for everything else. A standing order of halal meals from Taste of Grangetown gives some of that back.",
      need: "David, 34, has a condition that limits his mobility and leaves him with a fairly small, unpredictable amount of energy each day. He works part-time from home, and by the time he's done, there's often not much left for a supermarket trip and cooking from scratch — let alone doing both in the same week.",
      help: "David refers himself every few weeks rather than waiting for a crisis point. Regular donors fund a rolling order of halal meals from Taste of Grangetown, delivered on the days he chooses, so his energy goes toward work and the parts of life that matter to him rather than being spent entirely on logistics.",
      quote: "The hardest part of being disabled isn't always the big things — it's the constant small maths of what you have energy for today. Having meals just... arrive, cooked properly, halal, on time, means I get to spend a Tuesday evening how I want to, not recovering from Tesco."
    },
    cy: {
      situation: "Byw gydag anabledd",
      teaser: "Mae symudedd David yn golygu y gall siopa wythnosol a noson gyfan o goginio ddefnyddio'r holl egni sydd ei angen arno ar gyfer popeth arall. Mae archeb reolaidd o brydau halal gan Taste of Grangetown yn rhoi peth o hynny yn ôl.",
      need: "Mae gan David, 34, gyflwr sy'n cyfyngu ar ei symudedd ac sy'n ei adael â swm eithaf bach, anrhagweladwy o egni bob dydd. Mae'n gweithio'n rhan-amser gartref, ac erbyn iddo orffen, yn aml nid oes llawer ar ôl ar gyfer trip i'r archfarchnad a choginio o'r dechrau — heb sôn am wneud y ddau yn yr un wythnos.",
      help: "Mae David yn cyfeirio ei hun bob ychydig wythnosau yn hytrach na disgwyl am bwynt argyfwng. Mae rhoddwyr rheolaidd yn ariannu archeb barhaus o brydau halal gan Taste of Grangetown, wedi'u danfon ar y dyddiau mae'n eu dewis, fel bod ei egni'n mynd tuag at waith a'r rhannau o fywyd sy'n bwysig iddo, yn hytrach na chael ei dreulio'n gyfan gwbl ar logisteg.",
      quote: "Nid y pethau mawr yw'r rhan anoddaf o fod yn anabl bob amser — y fathemateg fach gyson o beth sydd gennych chi egni ar ei gyfer heddiw yw hi. Mae cael prydau'n... cyrraedd, wedi'u coginio'n iawn, yn halal, mewn pryd, yn golygu fy mod i'n cael treulio nos Fawrth fel rwyf eisiau, nid yn gwella o Tesco."
    }
  },
  {
    id: "iris",
    name: "Iris",
    area: "Roath",
    business: "Roath Bakes",
    initial: "I",
    color: "#8a6300",
    en: {
      situation: "Recovering from illness",
      teaser: "Partway through chemotherapy, Iris found her appetite came and went without warning. Roath Bakes learned to cook around it — and the messages that came with each meal meant almost as much as the food.",
      need: "Iris, 71, is partway through a course of chemotherapy. Some days she has an appetite; on others, food is the last thing she wants to think about, and when she can eat, it needs to be soft and low in salt. She's lived alone since her husband passed away three years ago, and cooking for one, on top of everything else, had stopped feeling worth the effort.",
      help: "A neighbour referred Iris after noticing she'd stopped answering the door some evenings. Roath Bakes adjusted each meal to what she could manage that week, and several donors left short messages of encouragement with their bookings — small notes Iris says she's kept.",
      quote: "You expect the treatment. You don't expect a stranger to write 'thinking of you, get well soon' on a card with your dinner. I've had some very low weeks this year, and those little notes, more than once, were the thing that got me through the evening. Cardiff hadn't forgotten me."
    },
    cy: {
      situation: "Gwella ar ôl salwch",
      teaser: "Hanner ffordd trwy gemotherapi, canfu Iris fod ei harchwaeth yn dod ac yn mynd heb rybudd. Dysgodd Roath Bakes goginio o'i chwmpas — ac roedd y negeseuon a ddaeth gyda phob pryd yn golygu bron cymaint â'r bwyd.",
      need: "Mae Iris, 71, hanner ffordd trwy gwrs o gemotherapi. Ar rai dyddiau mae ganddi archwaeth; ar eraill, bwyd yw'r peth olaf mae hi eisiau meddwl amdano, a phan gall hi fwyta, mae angen iddo fod yn feddal ac yn isel mewn halen. Mae hi wedi byw ar ei phen ei hun ers i'w gŵr farw dair blynedd yn ôl, ac roedd coginio i un, ar ben popeth arall, wedi peidio â theimlo'n werth yr ymdrech.",
      help: "Cyfeiriodd cymydog Iris ar ôl sylwi ei bod wedi stopio ateb y drws rhai nosweithiau. Addasodd Roath Bakes bob pryd i'r hyn y gallai ei reoli'r wythnos honno, a gadawodd sawl rhoddwr negeseuon byr o anogaeth gyda'u harchebion — nodiadau bach mae Iris yn dweud ei bod wedi'u cadw.",
      quote: "Rydych chi'n disgwyl y driniaeth. Dydych chi ddim yn disgwyl i ddieithryn ysgrifennu 'meddwl amdanoch chi, gwellhad buan' ar gerdyn gyda'ch swper. Rwyf wedi cael rhai wythnosau isel iawn eleni, ac roedd y nodiadau bach hynny, fwy nag unwaith, y peth wnaeth fy nghael i drwy'r noson. Doedd Caerdydd ddim wedi fy anghofio."
    }
  }
];

function ccmStory(s) {
  return s[I18N.currentLang()] || s.en;
}
