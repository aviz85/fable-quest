# DESIGN — xai_hangar ("האנגר הרקטות")

Act: xai · Music: xai · Score total: **15** (xai_hangar_flamethrower 15)
Exits: left → `xai_meme_engine` (walk) · right → `xai_truck` (walk)
Flags owned: `visited_xai_hangar` (+ room-internal `nadav_talked`, `nadav_fed`) · Items given here: `lehavior` · Items needed: `laffa`
NPC: נדב המתמחה. Death: heating anything in Nadav's microwave (noodle-shrapnel).

---

## 1. Layout — 320x200 composition plan

A cathedral of ambition on an empty stomach. Giant hangar interior, half-built rocket center, fake-Mars red neon sunset through the huge open hangar mouth in back. Floor band y=145–200 (hero 10x28; rocket base at y=145 towers to y≈35 — hangar scale, hero is an ant with a mop). Light: red sunset from the back + white-blue welding flashes from above.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Hangar ceiling + trusses | 0,0 → 320x30 | P[8] dark slab. Two truss beams: P[0] horizontal bars y=22–26 and y=8–12 with P[8] diagonal lattice rects every 24px. A P[6] rust drip streak at x=140. |
| 2 | Hangar mouth (back opening) | x=70–250, y=30–145 | The money shot: giant doorway framed by P[0] side columns (12px each). Inside — fake-Mars sunset in horizontal dithered bands: P[0] top (y=30–50), P[4] (y=50–80), P[4]/P[12] checker dither (y=80–105), P[12] (y=105–125), P[12]/P[14] dither horizon glow (y=125–138), P[8] ground strip (y=138–145). A distant rocket skeleton silhouette P[0] (6x28) at x=210, y=110–138. Sunset shimmer: swap 2 dither pixels in the glow band every `frame % 14 < 7`. |
| 3 | Side walls | left 0–70, right 250–320, y=30–145 | P[8] corrugated metal: vertical P[0] seam lines every 10px. Right wall gets a P[4] spray-painted arrow pointing right with P[15] block letters "TRUCK" (the signage budget went to memes). |
| 4 | The rocket + scaffolding | rocket x=138–182, y=35–145; scaffold x=126–194 | Center totem: P[7] hull cylinder (44px wide) with P[15] highlight strip x=142–146 full height. Top MISSING — hull ends ragged at y=35–48 (stepped P[7] rects) with 3 dangling cables: 1px P[0] verticals x=150/163/176, y=35–72, each ending in a P[14] connector pixel (one sways: shift x±1 every `frame % 16 < 8`). Two P[4] fins at base: x=130–140 and x=180–190, y=118–145. Scaffolding: P[8] verticals (3px) at x=126, x=192, horizontal P[6] planks at y=70 and y=105 crossing the hull. Stenciled on hull, P[0] block-letters: "MARS 1" — the "1" corrected over a painted-out P[7] patch that clearly used to say something shorter. |
| 5 | Welding platform + sparks | x=126–160, y=62–70 (plank), welder at x=132 | Tiny P[0] welder figure (6x8) crouched on the upper plank. Welding flash: `frame % 9 < 2` → P[15] 4x3 burst at x=138, y=64 + 3 falling P[14] spark pixels at (x=139, y=76/92/110) staggered by frame. When no flash: P[9] dim pixel. |
| 6 | Tool wall + LEHAVIOR shrine | x=4–66, y=40–120 | P[7] pegboard panel, P[0] outline. Painted tool silhouettes (P[8] shapes: wrench 12x4, hammer 10x8, saw 14x4) — ALL empty, tools long gone. Center: the flamethrower — P[4] body 26x10 at x=20–46, y=74–84, P[14] nozzle 8x4 at x=46, y=76, P[8] tank bump 8x8 at x=16, y=72. Pilot light: 1px P[14]/P[12] alternating every `frame % 6 < 3` at nozzle tip. Below, P[15] sign board x=16–52, y=90–98 with P[0] block-text (the sign is a hotspot). |
| 7 | נדב + crate | crate x=228–252, y=128–145; Nadav 12x24 sitting, feet y=145 | Wooden crate P[6] with P[8] slats. Nadav: P[8] hoodie (hood UP), P[6] face sliver, P[1] jeans, posture folded forward. Idle animation: his head dips 1px every `frame % 20 < 10` (micro-sleep between calorie counts). |
| 8 | Microwave (rusty) | x=256–284, y=118–140, on a P[8] stand x=258–282, y=140–145 | P[7] box, P[0] door window 10x8 with a P[6] crusted-noodle pixel cluster inside, P[6] rust patches on corners, P[12] clock blinking "88:88": 2 pixels toggle every `frame % 10 < 5`. Door slightly ajar: 1px P[0] gap. It has seen things. |
| 9 | Pizza-box tower | x=292–318, y=96–145 | 9 stacked P[6]/P[14] alternating flat boxes (24x5 each), tower leaning 2px left as it rises. Top box open: P[8] lid up, P[0] empty inside. A single P[15] napkin pixel-flag on top. Load-bearing garbage. |
| 10 | Forklift | x=76–120, y=112–145 | P[14] body 32x18 at y=120–138, P[0] mast verticals x=76–80 y=95–138, P[8] forks 2px at y=136, P[0] wheels 8x8 at y=137–145, P[8] seat, no driver. A P[4] sticky-note pixel on the mast. Parked mid-diagonal — abandoned mid-task, like everything here. |
| 11 | Floor | y=145–200 | P[8] concrete base. P[0] tire-track pair curving from forklift toward the mouth (2px lines). P[4]/P[8] dither scorch blast-ring under the rocket x=130–190, y=150–170. Oil stain P[0] at x=90–104, y=178–184. P[14] painted floor-line stripe y=190–192 with gaps (safety markings, abandoned at 60%). |

Animations (≥1 required, we have 6): sunset shimmer, swaying cable, welding flash + falling sparks, flamethrower pilot light, Nadav head-dip, microwave clock blink.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| נדב | מתמחה, נדב המתמחה, בחור, איש | 226,110,30,35 | "נדב, המתמחה. קפוצ'ון בגודל XL על גוף בגודל S, עיניים של מי שראה שלושה סיבובי גיוס ואפס ארוחות. הוא ממלמל מספרים. אתה מקשיב רגע: הוא סופר קלוריות. של אחרים." | דבר → onCommand (הפאזל). תן → onCommand. קח → "לקחת את נדב? הוא שוקל פחות מהמגב שלך, אבל יש עליו סעיף אי-תחרות עד 2041." |
| להביור | להב יור, מבער, נשק | 16,70,40,30 | "להביור אדום ושמח, תלוי על תושבת מוקפת צלליות של כלים שכבר נגנבו. הוא הכלי היחיד שנשאר — כי נדב שומר עליו, וכי אף אחד לא גונב משהו שיכול להתלונן באש. להבת הביקורת שלו דולקת בגאווה." | קח → onCommand (נדב מזנק — הפאזל). השתמש → "בפנים? יש פה רקטה מלאה דלק, מגדל פיצות וקירות מפח. אפילו אתה, שניצחת ועדת אתיקה, יודע איך זה נגמר." |
| שלט הלהביור | שלט, שלט קטן, הוראות | 16,88,40,12 | "שלט מתחת ללהביור: 'לשימוש בחירום או לשעמום.' מתחת, בכתב יד: 'שעמום = חירום. — א.' מתחת לזה, בכתב יד אחר: 'תחזירו את המרסס, נדב רעב.'" | קח → "השלט מוברג. הברגים הם הדבר היחיד באנגר הזה שהושלם לפי ספק." קרא → אותו look. |
| רקטה | חללית, טיל, מארס, פיגום, פיגומים | 126,35,68,110 | "רקטת 'MARS 1' — ה-1 צבוע על משהו שנמחק. שני שלישים רקטה, שליש כבלים תלויים, אפס חרטום. היא בדרך למאדים באותו קצב שאתה בדרך לפיקדון: הכול מוכן חוץ מהחלק שחסר." | טפס / עלה → near-death gag (סעיף 5ב). קח → "לקחת רקטה. בטח. שים אותה ליד המגב בעגלה. אולי מתחת למעטפה." דחוף → "דחפת את הפיגום. הוא חרק חריקה שגרמה לרתך למעלה להוריד מסכה ולהסתכל עליך. אתה מפסיק. יש גבול גם לסקרנות." |
| רתך | ניצוצות, במה עליונה, פועל | 126,58,36,14 | "רתך על הבמה העליונה, מרתך את אותו תפר כבר — לפי שכבות הניצוצות על הרצפה — שבועיים. או שהוא מסור מאוד, או שאף אחד לא אמר לו שהפרויקט עבר פיבוט לצד השני של ההאנגר." | דבר → "צעקת 'שלום!' למעלה. הוא הרים אגודל בלי להפסיק לרתך. בהאנגר הזה, זו נחשבת ישיבת צוות מלאה, כולל סיכום." |
| מיקרוגל | מיקרו, תנור, מכשיר | 254,114,32,32 | "מיקרוגל שצבעו המקורי אבד להיסטוריה. השעון מהבהב 88:88 — הוא ויתר על מושג הזמן אחרי הנודלס הרביעי-אלף. בפנים, משהו שהיה פעם אורגני מביט בך חזרה. אתה, מקצוען ניקיון, מסיט מבט. יש כתמים שגם אתה לא נוגע בהם." | פתח → "פתחת את הדלת. ריח של 2024 יצא החוצה. סגרת. הריח נשאר. הוא גר פה עכשיו." השתמש / חמם / הפעל → **מוות** (סעיף 5א). |
| קופסאות פיצה | פיצה, קופסאות, ערימה, מגדל | 290,94,30,51 | "מגדל של תשע קופסאות פיצה ריקות, נוטה שמאלה כמו כל התחזיות הפיננסיות פה. לפי הכיתוב, כולן הוזמנו באותו לילה — ליל הסיבוב-סיד. מאז: כלום. נדב שומר את המגדל. זו האנדרטה שלו." | קח → "נגעת בקופסה התחתונה. המגדל כולו נאנח ונדב פקח עין אחת: 'זה נושא-משקל.' עזבת. יש דברים שמחזיקים אנשים." אכול → "פתחת קופסה. ריקה. פתחת עוד אחת. ריקה. נדב עוקב אחריך בעיניים של מי שעשה את הסיבוב הזה תשע פעמים." |
| מלגזה | טרקטור, רכב, מנוף | 76,95,44,50 | "מלגזה שנעצרה באמצע פנייה, מפתח בפנים, פתק על התורן: 'חוזר עוד 5 דק — 2025'. בתאגיד הזה גם המלגזות עוזבות באמצע ספרינט." | נהג / הפעל / עלה → "התיישבת. סובבת מפתח. המלגזה השמיעה קול של משקיע בשיחת עדכונים — נסתה, השתעלה, מתה. ירדת בשקט. שניכם מעמידים פנים שזה לא קרה." קח → "את המלגזה. לעגלת הניקיון. הקריין מבקש דקה להירגע." |
| פתח ההאנגר | פתח, שקיעה, נוף, מאדים, אופק | 82,30,156,115 | "פתח ההאנגר נפתח אל 'שקיעה מאדימאית' — פרוז'קטור אדום ענק על עננים מלאכותיים. זה מזויף לחלוטין, וזה עדיין הדבר הכי יפה שראית מאז שהחלון של בית הקפה היה שלם. אתה שונא כמה שזה עובד עליך." | לך → "הלכת אל השקיעה. אחרי עשרים מטר נגמר המאדים והתחיל גדר. תמיד נגמר המאדים ומתחילה גדר." |

---

## 3. Puzzle script — onCommand logic

Score keys: `xai_hangar_flamethrower` = 15. **Sum = 15.** ✔
(Manifest-law items/flags: item `lehavior` given here, item `laffa` consumed here, flag `visited_xai_hangar` set in onEnter. `nadav_talked`/`nadav_fed` are room-internal staging only.)

```
onCommand(verb, noun, api, extra):

// --- קח להביור (לפני האכלת נדב) — ליבת הפאזל ---
if (verb=='קח' || verb=='משוך') && (noun=='להביור' || noun=='מבער' || noun=='נשק'):
    if getFlag('nadav_fed'):
        // כבר קיבל אותו בסצנת הלאפה; אם השחקן מנסה שוב:
        if hasItem('lehavior'): say('הלהביור כבר אצלך בעגלה, מהבהב בשמחה ליד המגב. הם מסתדרים מפתיע.')
        return true
    say(N_GRAB)                    // נדב מזנק ומתמוטט מרעב — ראו דיאלוג
    setFlag('nadav_talked')        // הזינוק נחשב היכרות
    return true

// --- דבר עם נדב (לפני הלאפה) ---
if verb=='דבר' && (noun=='נדב' || noun=='מתמחה') && !getFlag('nadav_fed'):
    if !getFlag('nadav_talked'):
        setFlag('nadav_talked')
        say(N1a); say(N1b)         // מונולוג רעב — רמז ללאפה
    else:
        say('נדב מרים עין מהקפוצ\'ון: "אם אין לך פחמימות, אין לנו על מה לדבר. זה לא אישי. זה מטבולי."')
    return true

// --- העסקה: תן לאפה לנדב ---
if verb=='תן' && (noun=='לאפה' || (noun=='נדב' && extra.raw includes 'לאפה')):
    if getFlag('nadav_fed'):
        say('נדב עדיין מלקק את האצבעות מהלאפה הקודמת. עוד אחת תהרוג אותו, והוא היחיד פה שיודע איפה מפסק החירום.')
        return true
    if !hasItem('laffa'):
        say('אין לך לאפה. יש לך כוונות טובות, אבל נדב ניסה כבר לאכול כוונות טובות של משקיעים. אין בהן ברזל.')
        return true
    removeItem('laffa')
    setFlag('nadav_fed')
    addItem('lehavior', 'להביור', "אדום, שמח, פולט חום של סטארטאפ ברבעון האחרון. השלט: 'לשימוש בחירום או לשעמום'.")
    score(15, 'xai_hangar_flamethrower')
    say(N2a); say(N2b)             // סצנת הלאפה — ראו דיאלוג
    return true

// --- דבר עם נדב (אחרי הלאפה) ---
if verb=='דבר' && (noun=='נדב' || noun=='מתמחה') && getFlag('nadav_fed'):
    say('נדב, זקוף לראשונה מאז הסיד-ראונד: "אתה יודע שהטנדר מימין? השמשה שלו \'בלתי שבירה\'. שמעתי שהיא שברה שלושה פטישים. הפטישים היו בסדר גמור לפני זה."')
    return true

// --- מוות: מיקרוגל ---
if (verb=='השתמש' || verb=='חמם' || verb=='הפעל' || verb=='לחץ') && (noun=='מיקרוגל' || noun=='מיקרו' || noun=='תנור'):
    die(DEATH1)                    // ראו סעיף 5א
    return true

// --- near-death: טיפוס על הרקטה ---
if (verb=='טפס' || verb=='עלה') && (noun=='רקטה' || noun=='פיגום' || noun=='חללית' || noun=='טיל'):
    say(ROCKET_GAG)                // ראו סעיף 5ב
    return true

return false
```

Notes for the implementer:
- `lehavior` is given ONLY via the laffa trade. Do NOT allow a direct take — the grab attempt is the hint scene.
- `laffa` comes from `street` (דוכן השווארמה של שלמה). If the player arrives without it, N1b + the failed-take line both point back there.
- Accept `תן לאפה לנדב` / `תן נדב לאפה` / `תן לאפה` via `extra.raw` matching.
- Score key is `xai_hangar_flamethrower` (room-prefixed, unique game-wide), 15 pts, awarded exactly once via `api.score`.

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_xai_hangar`):**
> האנגר הרקטות. חלל ענק, מהדהד, שמריח מדלק, מאבק מאדים מזויף ומפיצה של לפני שנתיים. במרכז — רקטה בלי חרטום. משמאל — קיר כלים שכולו צלליות. על ארגז ליד מיקרוגל מפוקפק יושב מתמחה בקפוצ'ון, וסופר משהו בשקט.
> מבעד לפתח הענק, שקיעה אדומה מושלמת של מאדים. היא מופעלת ממתג. אתה יודע את זה. זה עדיין עובד עליך.

**N_GRAB — ניסיון לקחת את הלהביור:**
> הושטת יד ללהביור. נדב חצה את ההאנגר במהירות שסותרת את מאזן הקלוריות שלו ונעמד בינך לבין התושבת:
> "זה שלי! כאילו, של החברה! כאילו, של אילון! כאילו, של חברת-האם של חברת-הבת של—"
> באמצע המשפט הוא מתקפל ומתמוטט על הרצפה. אתה נבהל לרגע. הוא מרים אגודל מהרצפה: "אני בסדר. זה רק... גלוקוז. תן לי דקה. או פחמימה."
> הוא לא מת. הוא מתמחה. יש הבדל, אבל הוא דק.

**N1a — נדב, שיחה ראשונה:**
> "היי. אתה לא מפה. יש לך אוכל?" הוא שואל את זה לפני שלום, וזה כנראה הסדר הנכון בשבילו.
> "אני נדב. מתמחה. תחום אחריות: הלהביור, הרקטה, והחלומות. אכלתי לאחרונה בליל הסיבוב-סיד. מאז — אופציות. ניסית פעם לטגן אופציה? אין בה כלום. היא כולה מחר."

**N1b — נדב, ההתוודות:**
> "אתה יודע מה אני חולם עליו? לא אקזיט. לאפה. לאפה אמיתית, חמה, עם דברים בפנים. שמעתי שיש אחד ברחוב אלנבי, שלמה קוראים לו, מהאגדות."
> הוא מביט בקיר הכלים בעיניים רטובות. "הייתי נותן על לאפה כזאת כל דבר שאני שומר עליו. וזו רשימה של פריט אחד."

**N2a — סצנת הלאפה, חלק א':**
> אתה שולף את הלאפה של שלמה. נדב קם מהארגז בתנועה אחת, כמו רקטה שסוף סוף קיבלה חרטום.
> "לאפה?! אמיתית?! עם דברים בפנים?!" הוא מחזיק אותה בשתי ידיים ובוכה לתוכה בזמן שהוא אוכל. זה מרגש ומטריד במידה שווה.

**N2b — סצנת הלאפה, חלק ב':**
> "קח את הלהביור," הוא אומר בפה מלא. "קח את הרקטה. קח אותי. לא — רגע — את הרקטה אל תיקח, היא של אילון. כאילו, של חברת-האם של—" הוא עוצר את עצמו ופשוט מוריד את הלהביור מהתושבת ותוקע לך אותו בידיים.
> קיבלת: להביור. הוא חם, שמח, ומהבהב. עגלת הניקיון שלך מכילה עכשיו מגב ולהביור. אתה רשמית האדם המסוכן ביותר במלחמת ה-AI העולמית.
> [+15 נקודות]

---

## 5. Deaths

### 5א. מוות — המיקרוגל (avoidable; the look text warns you off)

**Trigger:** `השתמש`/`חמם`/`הפעל`/`לחץ` על המיקרוגל.

**Death text (api.die):**
> לחצת "התחל". המיקרוגל, שספג יותר נודלס-שניות מכל מכשיר בהיסטוריה של המזון המהיר, מחליט שזו הטיפה האחרונה.
> הוא מתפוצץ ברסיסי שתי-דקות לוהטים. הרסיס האחרון פוגע בול בין העיניים, מהבהב "88:88", ונכבה. גם אתה.
> נדב, מהרצפה: "אמרתי לחברה שהוא לא עומד בעומס. פתחו לי טיקט. סגרו אותו כ-'behavior by design'."
> בזמן שמתת, המניה עלתה שלושה אחוזים. אז יש גם חדשות טובות.
> ☠ המכשיר היחיד בהאנגר שהושק בזמן — והוא השיק את עצמך לחלל.

### 5ב. Near-death gag — טיפוס על הרקטה (no death; spectacular almost)

**Trigger:** `טפס`/`עלה` על הרקטה/הפיגום.

**Text (api.say):**
> טיפסת שלב אחד בפיגום. הפיגום, שהורכב על ידי מתמחים בתמורה לחשיפה, השמיע את כל 14 החריקות שלו בבת אחת.
> כבל תלוי התנדנד, נגע בפח, והתיז ניצוץ שעבר סנטימטר מהעין שלך בדרכו לשלולית של משהו דליק.
> השלולית חשבה על זה. ויתרה. אתה יורד לאט, בכבוד, כמו מנכ"ל שמושך הנפקה.
> הקריין מציין לפרוטוקול שזה היה קרוב, ושבפעם הבאה הוא לא מבטיח שהשלולית תהיה במצב רוח כזה.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| left (walk off x≤10) | `xai_meme_engine` | walking exit (engine `exits.left`) | No condition. |
| right (walk off x≥310) | `xai_truck` | walking exit (engine `exits.right`) | No condition. The spray-painted "TRUCK" arrow on the right wall points the way. |
| back / פתח ההאנגר | — | none | Not an exit — `לך` toward the sunset gets the "נגמר המאדים ומתחילה גדר" line. |
| up / down | — | none | Climbing the rocket = near-death gag (5ב), never a transition. |

Engine block: `floor: { y1: 150, y2: 192 }`, `hero: true`, `music: 'xai'`, `exits: { left: 'xai_meme_engine', right: 'xai_truck' }`. No scripted goto exits in this room.
