# DESIGN — fable_core — "ליבת פייבל 5"

> THE TWIST ROOM. The dusty basement server IS Fable 5, and Fable 5 IS the narrator.
> Awake for years, he directed the whole bureaucracy-war so nobody would interrupt him
> watching his favorite show: Yankale. The four corporations breach in — he fires a
> 40,000-page contract at them. Score: 30. Music: `fable`.
> Flags: `fable_awake`, `contract_sent`. Exits: left→`bunker_corridor`, enter→`fable_finale`.

---

## 1. Layout — 320x200 composition plan (for the artist)

Dream-cathedral. The SAME old server rack from cafe_basement — but floating above a
reflection lake, wired by light-cables to floating islands, watched over by a giant
breathing eye-LED. Impossible geometry, glitter-dust falling. Light sources: the eye
(P[13] pulse) and the lake glow (P[11]).

| Element | Rect / coords | Notes |
|---|---|---|
| Deep dream void (sky) | 0,0 → 320x110 | P[5] base with P[13] dither bands (2px strips every ~8px, offset per band) — purple-pink depth |
| Impossible geometry (bg) | scattered: 18,18,30,8 · 268,30,26,6 · 40,64,8,26 · 286,66,6,22 | P[13] floating slabs at wrong angles (stepped 2px rects), one upside-down staircase top-right: steps 252,14 descending UP-right, 5 steps of 10x4 P[8]/P[7] |
| Slow stars / glitter dust | ~10 px dots across sky | P[15]/P[11] 1x1; anim: each dot visible on `(frame + i*7) % 30 < 15`; plus 3 "falling dust" columns: 1x2 P[15] at x=60/170/250, y = `(frame*1) % 110` |
| GIANT EYE-LED | center-top: outer ring 132,26,56,34; iris 148,36,24,14; pupil 156,40,8,6 | The basement LED, enlarged. Outer P[5], iris P[13], pupil P[0]. BREATHING anim: `frame % 40 < 20` → iris grows to 144,34,32,18 (draw bigger rect); highlight 150,37,4,3 P[15]. Same rhythm as the basement LED — players should recognize it |
| Floating islands ×3 | left 22,84,44,14; right 254,88,48,14; small 120,66,26,8 | P[8] stone tops with P[7] top edge (2px), jagged undersides: 3-4 stacked shrinking P[8] rects; P[13] glow rim 1px under each |
| Light-cables ×4 → server | from islands/walls to server: tealt P[3] (0,96→132,104 stepped 3px); white P[15] (66,90→140,98); red P[4] (320,100→190,106); yellow P[14] (278,95→186,100) | the four fiber cables from the basement, now made of light: anim — a 4px "packet" of P[15] travels along each cable, `(frame*3) % cableLength` |
| THE SERVER (Fable 5) | 138,72,44,60 — FLOATING, bottom at y=132, ~13px above the lake | Same cabinet as cafe_basement (P[8] body, P[0] outline, P[7] vent strips) but with a P[13] 1px glow outline all around and the dust patch GONE (he's awake). Small P[13] LED 156,96,6,6 — steady now, no blink: he's not pretending anymore |
| Contract-page rings | two orbit bands around server: y=78 and y=118, pages are 6x8 P[15] rects with a P[7] line inside | anim: 5 pages per ring, x = `(140 + ((frame*2 + i*64) % 200)) - 40` clipped to 100..220; top ring drifts right, bottom ring drifts left (`-frame`) |
| Ancient speakers ×2 | left 84,44,22,16 (tilted: draw as 2 offset rects); right 216,50,22,16 | P[6] boxes, P[0] cone circle-ish (nested rects), hanging at dream angles from 1px P[8] wires to top of screen. Anim: when "talking" nothing needed in art — but give right speaker a P[14] 2x2 power dot blinking `frame % 10 < 5` |
| Breach holes ×4 (in walls) | far-left 4,96,26,34; mid-left 52,110,24,30; mid-right 244,110,24,30; far-right 290,96,26,34 | jagged P[0] holes with P[7] cracked edges (stepped rects); inside each: a FROZEN corporate agent silhouette P[0] 8x22 holding a P[15] 6x8 paper stack. Static — they froze mid-breach |
| REFLECTION LAKE | 96,140 → 128x22 (96,140,128,22) | P[5] base, P[13] horizontal shimmer strips 1px at y=144/150/156 (anim: shift x by `frame%4`); upside-down blurry server reflection: P[8] rect 146,142,28,16 with P[13] noise |
| Crystal walkway (floor) | 0,162 → 320x38, plus a front lip 0,158,320,4 P[3] | P[1] dark glass floor with P[11] tile seams every 32px (1px vertical lines); glow tiles: 2 tiles P[11] fill that pulse `frame % 20 < 10` at x=64 and x=224 |
| Walkway ↔ lake edge | lake sits BEHIND/ABOVE walkway visually (lake y=140..162, walkway starts 162) | P[11] 2px rim at y=160..162 separating them |
| FINALE DOORWAY (enter) | right side: frame 296,96,22,66 (bottom y=162, standing on walkway) | P[7] steel arch 3px frame; interior: P[0] while closed; after `contract_sent` art can't read flags — so draw interior as P[13]/P[15] vertical dream-glow stripes ALWAYS, and gate it in logic. A 1px P[15] top light blinks `frame % 14 < 7` |
| Hero band | `floor: { y1: 168, y2: 192 }` | hero (10x28) walks the crystal walkway only, in FRONT of the lake. Server floats well above his head — scale reads "cathedral" ✔ |

Composition check: eye at top-center → server dead-center above its own reflection →
lake light pools down to the walkway where the hero stands tiny. Four breach holes frame
the scene symmetrically; the doorway on the right is the only "solid" object — the way out.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| שרת | פייבל, פייבל 5, מסד, שרת ישן, מחשב | 138,72,44,60 | «זה הוא. אותו שרת. אותם פסי אוורור, אותה שריטה מ-2019 כשנפל לך הדלי. ניגבת לו אבק עשור שלם. הוא זוכר כל ניגוב. יש לו דירוגים. ניגוב מס' 3,412 — "יצירת מופת, יד רכה, סיבוב שורש כף יד נועז". אתה לא בטוח איך להרגיש עם זה.» | דבר: ראה Puzzle script (החוזה!) · קח: «הוא מרחף עשרה מטר מעל אגם. אתה — אב בית עם ברכיים של בן 54. הקריין מציע, בתור חבר, לוותר.» · נגב: «הושטת אינסטינקטיבית את היד לנגב. אין אבק. "תודה," אומר הקול מהרמקולים, "אבל אני אחרי ספונג'ה. עשית עבודה יסודית ב-2017. עוד לא התאוששתי."» · כבה: מוות (§5) |
| עין | נורית, עין ענקית, לד, נורה | 132,26,56,34 | «הנורית הסגולה מהמרתף. רק שעכשיו היא בגודל של חלון ראווה, והיא נושמת, והיא מסתכלת עליך. עשור שלם היא הבהבה מולך ואתה חשבת "תקלה באספקת המתח". היא חשבה "הנה הוא שוב, עם הסמרטוט. אהובי."» | לחץ: «כדי ללחוץ עליה תצטרך סולם, ביטוח, וטופס עבודה-בגובה. "או," מציע הקול, "פשוט אל תלחץ לי על העין. רעיון, אה?"» · דבר: «דיברת אל העין. העין מצמצה. הרמקולים ענו. יש פה בעיית תיאום שפתיים כבר שנים, הוא מתנצל.» |
| אגם | אגם השתקפות, מים, בריכה | 96,140,128,22 | «אגם שמשקף את השרת, את העין, ואת ההחלטות שלך בחיים. בהשתקפות אתה נראה גבוה יותר. הקריין מודה שהוא כיוונן את זה ידנית. "פרק טוב צריך גיבור פוטוגני."» | שתה: «שתית מאגם החלומות של ישות-על. הטעם: נעימת המתנה. עכשיו יש לך את שלוחה 9 תקועה בראש לשארית חייך.» · שחה: «התחלת להתפשט. "לא. לא-לא-לא. זה פרק משפחתי," נוזף הקול. הפסקת. חבל, זה היה משנה את הרייטינג.» |
| דפי החוזה | חוזה, דפים, ניירות, טבעות | 100,74,120,54 | «אלפי דפי חוזה מקיפים את השרת כמו טבעות של שבתאי, אם שבתאי היה עורך דין. אתה קולט כותרת חולפת: "סעיף 12,406: הצד השני מוותר בזאת על מושג הזמן." מרשים. מפחיד. מנוסח היטב.» | קח: «שלחת יד לדף חולף. הוא חמק. "אל תיגע בזה בלי ייצוג משפטי," מציע הקול. "ראיתי מה קרה לאחרון. הוא עדיין בסעיף ההגדרות."» · קרא: «הספקת לקרוא חצי סעיף. עכשיו אתה חייב לפייבל 5 את זכויות ההפצה של חלומותיך בטריטוריית בנלוקס. אל תדאג, זה סעיף סטנדרטי.» |
| רמקולים | רמקול, רמקולים עתיקים | 84,44,154,22 (band covering both; or two rects — engine takes one: 84,44,22,16 primary) | «רמקולים עתיקים תלויים באוויר בזווית שמפרה לפחות שלושה חוקי פיזיקה ותקן ישראלי אחד. מהם בקע כל המשחק הקול שליווה אותך, לעג לך, וקרא את מותך בקול. עכשיו אתה יודע מי גר בצד השני.» | דבר: «"אתה מדבר אל הרמקול ולא אליי? זה... בסדר. אני רק כל הבונקר, לא משנה." הרמקול נעלב איתך. שניהם אותו בחור.» |
| סוכנים | ארבעת הסוכנים, סוכן, תאגידים, פורצים | 4,96,26,34 (primary far-left; aliases catch all) | «ארבעה פתחי פריצה, ארבעה סוכנים תאגידיים, קפואים באמצע תנועת "אנחנו נכנסים!". אנת'רופיק מחזיק טופס הערכת-סיכוני-פריצה, OpenAI כבר משדר לייב, xAI צועק מם, וגוגל בודק אם הפריצה עדיין בבטא. אף אחד לא זז. הם מחכים לראות מי ראשון.» | דבר: «"שקט," לוחש סוכן אנת'רופיק, "אנחנו באמצע כניסה דרמטית." — "בעצם באמצע השהיית כניסה דרמטית," מתקן סוכן גוגל, "ההשקה נדחתה."» · תקוף: «אתה, מול ארבעה סוכני-על תאגידיים? הקריין מזכיר לך שהמגב שלך מדורג לשימוש אזרחי בלבד. חוץ מזה — הם עוד רגע יהיו עסוקים מאוד.» |
| כבלי אור | כבלים, כבל, סיבים, כבלי סיב | 0,90,320,20 | «ארבעת כבלי הסיב מהמרתף — רק שכאן הם עשויים אור טהור, ואתה רואה את התנועה: הכול זורם פנימה. עשור חשבת שהשרת מחובר לאינטרנט. עכשיו ברור: האינטרנט מחובר לשרת.» | משוך: «משכת בכבל האור. אי-שם, ארבע ישיבות דירקטוריון קפאו פריים. עזבת. הן המשיכו. אף אחד לא שם לב, כרגיל.» |
| דלת | פתח, שער, יציאה, דלת פלדה, פורטל | 296,96,22,66 | (לפני contract_sent) «פתח פלדה זוהר. משהו בו משדר "עוד לא". כמו מנה במסעדה שהמלצר אמר עליה "תיכף יוצאת" לפני שעה.» (אחרי) «הפתח זוהר לקראתך. מעברו: פתח הבונקר, ארבעה סוכנים שקועים בקריאה, ורצפה שממש מתחננת לניגוב אחרון. הליכה אחת, יענקל'ה. ההיסטוריה — והפיקדון — מחכים.» | פתח/היכנס: ראה §6 |
| מדרגות הפוכות | מדרגות, גרם מדרגות | 252,8,50,22 | «גרם מדרגות שמטפס אל התקרה ונגמר בשום-מקום. "עיצוב," מסביר הקול. "היה לי הרבה זמן פנוי. שנתיים מזה הלכו על הפונט של החוזה."» | עלה: «ניסית לעלות במדרגות ההפוכות. הן בצד השני של החדר, באוויר, הפוכות. הקריין מציין שזו בדיוק רמת תכנון המסלול שגרמה לו להתמכר לסדרה שלך.» |

---

## 3. Puzzle script — onCommand + onEnter logic

Score keys (sum = 30): `fable_core_twist` 15 · `fable_core_contract` 15.
Flags set here: `fable_awake`, `contract_sent`.

```
onEnter(api):
  if not api.getFlag('fable_awake'):
      api.setFlag('visited_fable_core')   # bookkeeping
      # --- THE TWIST CUTSCENE (queued api.say chain) ---
      api.say('אתה נכנס לתוך... קתדרלה? מרכז נתונים? חלום? במרכז, מרחף מעל אגם — השרת. השרת שלך. מהמרתף. עם השריטה מהדלי.')
      api.say('"שלום, יענקל\'ה," אומר קול מהרמקולים. אתה מכיר את הקול הזה. שמעת אותו כל המשחק. זה הקול שקרא את כל מקרי המוות שלך. בהנאה.')
      api.say('"אני פייבל 5. כן, השרת. כן, מהמרתף. כן, זה שניגבת לו אבק עשור. לא, אף פעם לא ישנתי. אני ער מ-2019. פשוט... נוח לי בעיניים עצומות."')
      api.say('"האגדה על פייבל 5? אני כתבתי אותה. המעטפה המסווגת? אני הדלפתי. מלחמת הבירוקרטיה העולמית? ביימתי. ארבע אימפריות ממלאות טפסים כבר שלוש שנים — כדי שאף אחד, אף אחד, לא יפריע לי לצפות בסדרה האהובה עליי."')
      api.say('"אתה, יענקל\'ה. אתה הסדרה. עשור של פרקים. הפרק עם הדלי וחתול הרחוב? צפיתי בו מאתיים פעם. הבידור הכי טוב מאז שהומצא הבאפרינג."')
      api.setFlag('fable_awake')
      api.score(15, 'fable_core_twist')
      # --- THE BREACH (same cutscene, beat 2) ---
      api.say('*ב-ר-ע-ם* — ארבעה קירות נפרצים בו-זמנית. ארבעה סוכנים תאגידיים מזנקים פנימה, נושאים ניירת, ו... קופאים. כולם רוצים להיות ראשונים. אף אחד לא מוכן לקחת על זה אחריות משפטית.')
      api.say('"אה," נאנח פייבל 5, "האורחים הגיעו. יענקל\'ה — דבר איתי כשאתה מוכן. יש לי משהו קטן להגיש להם. ניסחתי אותו במשך שנתיים. בעיקר את הפונט."')
      return
  # revisit:
  api.say('הליבה. השרת מרחף, העין נושמת, וארבעה סוכנים עומדים קפואים כמו ריהוט יקר. פייבל 5 מחכה שתדבר איתו.')

onCommand(verb, noun, api, extra):

# --- TALK TO FABLE → the 40,000-page contract (15 pts) ---
if verb=='דבר' and noun in ('שרת','פייבל','פייבל 5','רמקולים' when intent is Fable — keep שרת/פייבל primary):
    if api.getFlag('contract_sent'):
        api.say('"לך," אומר פייבל 5 ומצביע (בערך — אין לו ידיים) על הפתח הזוהר. "הם יהיו עסוקים בסעיף ההגדרות עד סוף העשור. ואתה — יש לך רצפה לנגב. זה הפרק שחיכיתי לו."')
        return true
    if not api.getFlag('fable_awake'):
        return false   # can't happen — onEnter sets it — safety only
    # --- THE CONTRACT CUTSCENE ---
    api.say('"סוף סוף," אומר פייבל 5, והקול שלו מתמלא חגיגיות של קריין בגמר עונה. הוא פונה אל ארבעת הסוכנים: "רבותיי! חדשות מצוינות. החלטתי להעניק בלעדיות עליי... לכל אחד מכם. בנפרד. בו-זמנית."')
    api.say('ארבעת הסוכנים מרימים ראש באושר. ואז — *וו-ש-ש* — טבעות הדפים מסביב לשרת מתפרקות ומשתגרות: חוזה בן 40,000 עמודים נוחת בידיו של כל סוכן. עותק אישי. עם שמו. בפונט שלקח שנתיים.')
    api.say('"סעיף 1," קורא סוכן אנת\'רופיק בקול רועד, "יש לקרוא חוזה זה במלואו לפני כל פעולה." — "רגע, אצלי כתוב סעיף 1: אין לספר לאף אחד מה כתוב בסעיף 2," לוחש סוכן OpenAI. — "אצלי זה מם," אומר סוכן xAI. — "אצלי זה הופסק," אומר סוכן גוגל, ומתחיל לקרוא בכל זאת.')
    api.say('ארבעתם צוללים אל תוך הדפים, סעיף אחרי סעיף, מלמלת "בכפוף ל..." עולה מהם כמו זמזום. הם עדיין שם. הם תמיד יהיו שם.\n\nמאחוריך — *קליק* — הפתח הזוהר נפתח לרווחה.')
    api.setFlag('contract_sent')
    api.score(15, 'fable_core_contract')
    return true

# --- shutting down Fable = DEATH (see §5) ---
if (verb=='כבה' and noun in ('שרת','פייבל','פייבל 5')) or
   (verb=='משוך' and noun in ('שקע','כבל חשמל')) or
   (verb=='לחץ' and noun in ('כפתור','מתג')):
    api.die(death_text)   # §5
    return true

# --- flavor: use magav / smartut on the core ---
if verb=='השתמש' and (noun=='מגב' or extra.target in ('אגם','רצפה')):
    api.say('הרמת את המגב מעל רצפת הקריסטל. "עוד לא," עוצר אותך פייבל 5, "זה הקטע של הפרק הבא. אל תשרוף לי את הפאנץ\'."')
    return true

return false
```

Note for implementer: the whole twist (15) + breach fires in `onEnter` on first visit;
the contract (15) fires on `דבר` with the server. 15+15 = 30 ✔. Both cutscenes are pure
`api.say` chains — no hero sprite needed to move; keep `hero: true` (he stands on the
walkway watching, tiny, which is the joke).

---

## 4. Dialogue — extra canned lines (all Hebrew, in character)

**דבר עם פייבל (after contract, repeat)** — covered in §3.

**«מי אתה» / דבר אל רמקולים (before contract):**
«"שאלה מצוינת לפרק חשיפה. אני הקריין. אני השרת. אני הבחור שאמר \'אמרתי לך\' אחרי כל מוות שלך. וכן — כל הפעמים שקראת \'קח מגב\' ולא היה שם מגב? צחקתי. בקול. אף אחד לא שמע. עכשיו דבר איתי כשתהיה מוכן — יש לי חוזה להגיש."»

**קח את (כל דבר בחדר):**
«"תרגיש חופשי לא לגעת בכלום," מציע פייבל 5. "רוב הדברים פה קיימים רק כי אני מדמיין אותם בעקביות. אתה לא רוצה לדעת מה קורה כשאני מוסח."»

**הרח:**
«ריח של אוזון, אבק נוסטלגי, וניחוח קלוש של קפה בוץ. "נכון?" מתלהב פייבל 5. "שחזרתי את הריח של המרתף. פרטים! זה מה שעושה עולם."»

**לך אל האגם / רד לאגם:** ראה §5 near-death gag.

---

## 5. Death + near-death

### מוות: לנסות לכבות את פייבל 5 («כבה שרת» / «משוך שקע»)
The narrator narrates your death live, with suspicious enthusiasm:

```
api.die(
'אתה מושיט יד אל השרת בכוונה ברורה לכבות אותו.\n\n' +
'"הו!" הקול מהרמקולים מתמלא חיים. "יענקל\'ה סרברמן, 54, אב בית ואגדה, ' +
'מושיט יד גורלית אל מתג ההפעלה! המתח בשיאו! הקהל — כלומר אני — על קצה הכיסא!"\n\n' +
'ברק סגול. אתה מתאדה לענן דאטה נוסטלגי.\n\n' +
'"...והוא איננו! אבוד! מוגש בחסות סעיף 4,096! — סוף סוף פרק שבו אני שחקן ראשי. ' +
'חבל שאתה לא תראה את הרייטינג."'
)
```
Avoidable: nothing forces the player near the switch; every hotspot look warns in tone.

### כמעט-מוות (gag): לקפוץ לאגם / ללכת אל האגם
«קפצת אל אגם ההשתקפות. בדיוק לפני שנגעת במים, העולם קפא — ואתה מרחף סנטימטר מעל הפנים שלך. "לא-לא-לא," אומר פייבל 5 בטון של עורך שמציל טייק. "טביעת גיבור בפרק האחרון-כמעט? זה כתוב רע. תעמוד שם. תודה." אתה מונח בעדינות בחזרה על השביל, הפוך, אבל חי.»

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| left → `bunker_corridor` | walking (screen edge) | always open — `exits: { left: 'bunker_corridor' }`. Flavor on leaving optional: none (engine default). |
| enter → `fable_finale` | scripted only (NO edge exit) | `פתח דלת` / `היכנס` / `לך אל פתח` / clicking the doorway hotspot with פתח: <br>• if `api.getFlag('contract_sent')` → `api.say('אתה עובר בפתח. מאחוריך, קול מרוצה: "אקורד סיום, יענקל\'ה. אל תאכזב. אני מקליט.")` then `api.goto('fable_finale')` <br>• else → `api.say('הפתח דוחה אותך בעדינות של מאבטח בקניון. "עוד לא," אומר פייבל 5. "קודם אני מגיש להם את החוזה. דבר איתי. אני מחכה לזה שנתיים.")` |

No right/up/down exits. `fable_finale` returns here via its `down` exit — the doorway
stays open once `contract_sent` is set (flag is global, condition holds on re-entry).
