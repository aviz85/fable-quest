# DESIGN — xai_meme_engine ("אולם מנוע הממים")

Act: xai · Music: xai · Score total: **15** (xai_meme_engine_choke 15)
Exits: left → `xai_junkyard` (walk) · right → `xai_hangar` (walk, **gated by `memes_down`**)
Flags owned: `memes_down` (+ room-internal `visited_xai_meme_engine`, `engine_talked`) · Items needed: `mapit_bdiha` (consumed) · Items given: none
NPC: מנוע הממים (מפלצת מכנית). Death: reading a wall-meme aloud (terminal cringe). Bonus death: hand in the feed port.

---

## 1. Layout — 320x200 composition plan

An industrial hall inside the fake-Mars dome. A monstrous meme turbine mid-room, its feed port gaping like a mouth, spraying 144p memes toward the sealed hangar gate on the right. Floor band y=145–200 (hero 10x28: turbine dwarfs him — its mouth is at his head height. Correct: this thing eats content bigger than him). Light: red warning strobes + neon sign; everything has a hellish-industrial P[4]/P[8] cast.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Ceiling + trusses | 0,0 → 320x24 | P[8] slab, two P[0] truss beams (y=8–12, y=18–22) with 1px P[7] rivet dots every 16px. |
| 2 | Neon sign "MEME ENGINE v4.20" | x=96–224, y=4–18 | P[0] board, P[12] latin block-letters. Flicker: the "v4.20" segment (right third) drops to P[4] on `frame % 23 < 3` — even the sign is shitposting. |
| 3 | Back wall | 0,24 → 320x121 (down to y=145) | P[8] base with P[0] panel seams every 48px; P[7] baseboard strip y=140–145. Rust patches: P[6] 2x2 dither blobs near floor. |
| 4 | Server racks + wall memes (left) | x=4–62, y=52–145 | Two P[0] racks (26px wide) with P[10] LED columns (blink `frame % 10 < 5`, alternating rows). Stuck ON the racks: 5–6 small white meme cards (P[15], 10x8) at crooked 1–2px offsets, each with 2–3 P[0] pixel-rows faking text and one P[6] blob faking a face. One card half-peeled (bottom edge 1px shifted). |
| 5 | THE TURBINE | x=110–214, y=38–145 | The monster. Outer casing P[8] with P[7] top highlight band and P[0] outline; huge round-ish intake faked as stepped rects. Inside the intake (x=130–194, y=56–108): P[0] void with **rotating blades** — 4 P[4] bars (6px thick) that cycle position on `Math.floor(frame/2) % 4` (fast, angry). Center hub P[6] with one P[14] bolt pixel. |
| 6 | Feed port ("הפה") | x=146–178, y=112–138 | Front-bottom of turbine: P[0] slot opening with P[14]/P[0] hazard-striped lip (2px stripes) and a P[7] funnel tray sticking out to y=142. Above it a tiny P[15] label plate (x=150–174, y=104–110) with P[0] pixel-text. It genuinely reads as a mouth. That's the point. |
| 7 | Exhaust pipes + flying memes | pipes x=118–206, y=24–38; memes spawn at pipe tips | Two P[7] pipes rising from turbine top, elbowed toward the right. **Meme spray animation:** 3 small P[15] rects (8x6) with a 1px colored stripe (P[12]/P[10]/P[14]) travel right-and-down along a fixed diagonal, position = `(frame*4) % 140` offset from pipe tip toward the gate, vanish at x≈300. The room's signature animation. |
| 8 | Hermetic gate (right → hangar) | x=272–318, y=58–145 | P[7] slab door with P[8] X-brace (two diagonal stepped bars), P[0] frame, central P[4] locked-indicator lamp (swaps to P[10] green when `memes_down` — see implementer note). Above: P[15] plate (x=276–314, y=48–56) with P[0] pixel-text. Meme splats stuck ON the door: 3 white 8x6 cards at crooked angles — the spray's victims. |
| 9 | Warning beacons | x=84, y=30 and x=238, y=30 (10x8 each) | P[8] housing; P[4] dome that "rotates": bright P[12] half swaps left/right on `frame % 6 < 3`. Faint P[4] light wedge (2 stepped 1px rects) cast on the wall below each. |
| 10 | Pressure gauges + compressor | x=228–266, y=86–145 | P[7] compressor box (y=112–145) with P[8] vents (1px slats); above it two round-ish gauges (P[15] faces 12x12, P[0] rim, P[4] needle 1px). Left gauge needle pinned hard right; right gauge needle twitches 1px on `frame % 8 < 4`. A P[14] "MAX LOLZ" mini-plate between them. |
| 11 | Steel floor | y=145–200 | P[8] base, P[0] plate seams every 40px (horizontal) with perspective spread; hazard lane: P[14]/P[0] diagonal-striped band (y=150–158) running full width — the meme-spray corridor. Oil stain P[0] dither at x=190–210, y=170–178. |
| 12 | Floor debris | x=70–100, y=160–170 | A dead meme on the floor: P[15] card 12x8, face-down (just P[7] back + P[0] corner curl). Near it 3 loose P[14] pixel "confetti" bits — pixels the engine coughed once. |

Animations (≥1 required, we have 6): sign flicker, rack LEDs, rotating blades, meme spray, beacon strobes, gauge twitch. **When `memes_down` is set** (implementer: read the flag inside `draw` via a module-level import is NOT possible — instead the scene passes state by drawing a second variant; simplest: keep art static-on and let the scene's look/say text carry the "off" state, OR export a module-level `let engineOn` toggled from the scene file. Prefer the latter: `<id>.art.js` exports `setEngineOn(b)`; scene calls it in onEnter/onCommand. When off: blades frozen at frame 0, no meme spray, gate lamp P[10]).

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| מנוע הממים | מנוע, טורבינה, מכונה, ממים | 110,38,104,107 | "טורבינת ממים מדגם v4.20. היא בולעת תוכן מקצה אחד ויורקת אותו מהקצה השני ב-144p, בלי מקורות, עם כיתוב צהוב. היא צוחקת מהבדיחות של עצמה. אתה מזהה את הטיפוס — היה לך שכן כזה." | דבר → onCommand (סעיף 3). תן → onCommand (הפאזל). דחוף → "דחפת טורבינה של שמונה טון. היא אפילו לא שמה לב. אתה כן — הכתף שלך תשים לב עד יום רביעי." סגור → "אין לה כפתור כיבוי. יש לה רק כפתור 'עוד'. מישהו הדביק עליו מדבקה של אמוג'י בוכה-צוחק." |
| פתח ההזנה | פה, פתח, מגש, הזנה, חריץ | 146,104,32,38 | "פתח ההזנה. שלט קטן: 'הכנס תוכן. התוכן יעובד. אל תכניס איברים. שוב.' המילה 'שוב' עושה את כל העבודה במשפט הזה." | תן / השתמש → onCommand (הפאזל). לחץ / דחוף (יד) → **מוות בונוס** (סעיף 5ב). |
| ממים על הקיר | ממים, מם, מדבקות, כרזות | 4,52,58,60 | "ממים מודבקים על מסדי השרתים. הרולד מסתיר כאב. חתול זועם. איש מסתכל על בחורה אחרת. שכבות ארכיאולוגיות של הומור — כל שכבה מיושנת יותר ופצועה יותר. הקריין ממליץ בחום: לקרוא רק בלב. יש סיבה." | קרא → **מוות** (סעיף 5א). קח → "משכת מם אחד. מתחתיו מם ישן יותר. מתחתיו — עוד אחד. זה ממים עד למטה. עזבת לפני שהגעת לציורי מערות." |
| מסדי שרתים | שרתים, שרת, ראקים, מחשבים | 4,52,58,93 | "שרתים שמריצים את מחלקת ההומור של xAI. הנורות מהבהבות בקצב לא סדיר — כמו צחוק מנומס בישיבה. אחד מהם חם מספיק לטגן עליו ביצה, ומישהו, לפי הכתם, ניסה." | קח → "השרת מחובר ב-14 כבלים ובחוזה עננים. גם ככה יש לך שרת בבית. במרתף. הוא... עזוב, לא משנה." (רמז לטוויסט) |
| השער להאנגר | שער, דלת, מעבר, האנגר | 272,48,46,97 | לפני: "שער הרמטי אל ההאנגר. עליו שלושה ממים מרוחים כמו חרקים על שמשה. הנורה אדומה. השלט: 'המעבר ייפתח כשהתוכן ייגמר'. התוכן אף פעם לא נגמר." · אחרי (`memes_down`): "הנורה ירוקה. השער נושם לרווחה. גם אתה. גם הקריין, וזה נדיר." | פתח / לך → onCommand (סעיף 3+6). |
| שלט ניאון | שלט, ניאון, כתובת | 96,4,128,14 | "'MEME ENGINE v4.20'. מספר הגרסה הוא לא מספר גרסה — הוא בדיחה. גם התוכנה יודעת את זה. חצי מהשלט מהבהב בייאוש של איש תחזוקה שהתפטר." | קח → "זה שלט ניאון בגובה שישה מטר. יש לך מגב, לא סולם. וגם עם סולם — לא." |
| מדי לחץ | מדים, מד לחץ, שעונים, מחוגים | 228,86,38,26 | "שני מדי לחץ. השמאלי תקוע על 'MAX LOLZ' כבר שנתיים. הימני רועד. מתחתיהם מדבקה: 'אם המחוג רועד — הכול תקין. אם הוא נעצר — תתפלל'. אתה בודק שוב את השמאלי. הא." | לחץ → "טפחת על הזכוכית כמו מקצוען. המחוג רעד, נאנח, וחזר לרעוד. גם הוא רק עובד פה." |
| מנורות אזהרה | מנורות, נורות, אזהרה, אורות | 84,30,164,10 *(פס עליון שמכסה את שתיהן)* | "מנורות אזהרה אדומות מסתובבות. הן לא מזהירות מפני משהו ספציפי — הן מזהירות באופן כללי. כמו סעיף אחריות בתקנון." | קח → "לגעת בנורת אזהרה חמה בגובה קומה שנייה. הקריין רשם את הרעיון ביומן, תחת 'מועמדים לפרק הבא'." |
| רצפת פלדה | רצפה, פסים, פס אזהרה, כתם | 0,145,320,55 | "רצפת פלדה עם נתיב מסומן בפסי אזהרה — מסלול ההמראה של הממים. יש כתם שמן ליד המדחס. אתה מעריך אותו מקצועית: זה לא כתם, זה דייר. צריך צו פינוי, לא סמרטוט." | נקה → "התחלת לנגב את כתם השמן. הוא זז מטר שמאלה, שלם ובריא. אתה מרגיש כבוד מקצועי כלפיו. תיקו." |

---

## 3. Puzzle script — onCommand logic

Score keys: `xai_meme_engine_choke` = 15. **Sum = 15.** ✔

```
STATE: flag engine_talked (room-internal staging)
MANIFEST-LAW: flag memes_down (owned here), item mapit_bdiha (consumed here)

onCommand(verb, noun, api, extra):

// --- דבר עם המנוע ---
if verb=='דבר' && (noun=='מנוע' || noun=='מנוע הממים' || noun=='טורבינה' || noun=='מכונה'):
    if getFlag('memes_down'):
        say('המנוע שקט. מדי פעם הוא פולט "למה...?" חלוש מהצינור. אל תרחם עליו. הוא היה עושה לך אותו דבר.')
    elif !getFlag('engine_talked'):
        setFlag('engine_talked')
        say(M1)      // ראו דיאלוג — המנוע "מדבר" בממים
    else:
        say('המנוע יורק לעברך מם של כלב עם כובע. "THIS IS FINE," הוא רועם. שום דבר פה לא fine, אבל תתווכח עם טורבינה.')
    return true

// --- הפאזל: תן מפית למנוע ---
if (verb=='תן' || verb=='השתמש') &&
   (noun includes 'מפית' || noun includes 'בדיחה' ||
    ((noun=='מנוע' || noun=='פה' || noun=='פתח') && extra.raw includes 'מפית')):
    if getFlag('memes_down'):
        say('המנוע כבוי. להאכיל אותו עכשיו זה כמו לספר בדיחה בהלוויה. שלו.')
        return true
    if !hasItem('mapit_bdiha'):
        say('אין לך את המפית. הבדיחה הכי גרועה ביקום נמצאת אצל שלמה מהשווארמה, ברחוב אלנבי. כן, תצטרך להקשיב לסיפור. כולנו הקרבנו קורבנות.')
        return true
    removeItem('mapit_bdiha')
    setFlag('memes_down')
    score(15, 'xai_meme_engine_choke')
    say(M2a); say(M2b); say(M2c)      // סצנת החנק — ראו דיאלוג
    // implementer: art.setEngineOn(false); this.exits.right = 'xai_hangar'
    return true

// --- להאכיל דברים אחרים ---
if (verb=='תן' || verb=='השתמש') && (noun includes 'לאפה') && hasItem('laffa') && !getFlag('memes_down'):
    say('קירבת את הלאפה לפתח. המנוע רחרח, ופלט מם של שף איטלקי נעלב.\n"CONTENT ONLY," הוא רועם. "NO FOOD. FOOD IS CRINGE."\nמכונה שמסרבת ללאפה של שלמה. עכשיו ראית הכול. שמור את הלאפה — מישהו רעב באמת יעריך אותה.')
    return true
if (verb=='תן' || verb=='השתמש') && (noun includes 'מגב') && !getFlag('memes_down'):
    say('הצעת למנוע את המגב. הוא סרק אותו, חיפש בו פאנץ\', לא מצא, והחזיר לך אותו בבוז.\nטעות שלו. המגב הוא הפאנץ\' של כל המשחק הזה. אבל את זה הוא יגלה מאוחר מדי. כולם מגלים מאוחר מדי.')
    return true

// --- קרא מפית (רמז) ---
if verb=='קרא' && noun includes 'מפית' && hasItem('mapit_bdiha'):
    say('פתחת את המפית. הקריין מתעקש שלא להקריא את הבדיחה בקול — יש לו רישיון קריינות לשמור עליו.\nאבל שים לב: היצור היחיד פה שמעכל הומור בכמויות תעשייתיות עומד באמצע החדר, עם פה פתוח. רק אומר.')
    return true

// --- מוות: קרא ממים ---
if verb=='קרא' && (noun=='ממים' || noun=='מם' || noun=='מדבקות' || noun=='כרזות'):
    die(DEATH1)     // סעיף 5א
    return true

// --- מוות בונוס: יד בפתח ---
if (verb=='לחץ' || verb=='דחוף' || verb=='משוך') && (noun=='פה' || noun=='פתח' || noun=='מגש' || noun=='הזנה'):
    die(DEATH2)     // סעיף 5ב
    return true

// --- ניסיון לעבור ימינה לפני הניצחון ---
if verb=='לך' && (noun includes 'ימינה' || noun=='שער' || noun=='האנגר' || noun=='מעבר') && !getFlag('memes_down'):
    say(NEARDEATH)  // גאג כמעט-מוות — ראו סעיף 5ג
    return true
if (verb=='פתח') && (noun=='שער' || noun=='דלת'):
    if getFlag('memes_down'):
        say('השער נפתח בנשיפה הידראולית מרוצה. ההאנגר מחכה. גם מתמחה רעב אחד, אבל על זה בהמשך.')
        goto('xai_hangar', 14)
    else:
        say(NEARDEATH)
    return true

return false
```

Notes for the implementer:
- **Gated walking exit:** static scene `exits: { left: 'xai_junkyard' }`. In `onEnter`: `if (api.getFlag('memes_down')) this.exits.right = 'xai_hangar';` and set it again right after the choke scene. Never register `exits.right` while the engine is on — the engine's `checkEdges` has no conditions, so the gate must simply not exist until earned. Walking to the right edge while blocked just stops the hero at the wall (the NEARDEATH text is reachable via parser: `לך ימינה` / `פתח שער`).
- Art toggle: `xai_meme_engine.art.js` exports `setEngineOn(b)` (module-level boolean). Scene calls `setEngineOn(!api.getFlag('memes_down'))` in `onEnter` and `setEngineOn(false)` after the choke. Off-state: frozen blades, no meme spray, gate lamp P[10].
- `mapit_bdiha` is consumed here and nowhere else — hard-require `hasItem` before removing.
- Accept `תן מפית למנוע` / `תן למנוע מפית` / `האכל את המנוע במפית` via `extra.raw` matching ('האכל' is not a canonical verb — it will arrive as raw; match `raw includes 'מפית'` generously when target is the engine).
- `engine_talked` is room-internal staging; only `memes_down` is manifest-law.

---

## 4. Dialogue

**First entry (onEnter, once — sets room-internal `visited_xai_meme_engine`; if `memes_down` already set, skip to the short version):**
> אולם מנוע הממים. טורבינה בגודל של דירת שלושה חדרים בולעת את האינטרנט מצד אחד ויורקת אותו מהצד השני, דחוס ל-144p ועם כיתוב צהוב.
> הממים מתעופפים ימינה ונמרחים על השער להאנגר בקצב של תופעת לוואי. לעבור שם עכשיו זה לא מוות מיידי — זה גרוע יותר. זה קרינג'.
> יענקל'ה מסתכל על הרצפה, מעריך את כמות השמן, ומוסיף בראש עוד יום עבודה לחשבון של מישהו.

**First entry — short version (if `memes_down`):**
> אולם מנוע הממים. שקט. הטורבינה עומדת דוממת, נחנקת בכבוד על הבדיחה של שלמה. השער להאנגר פתוח. עבודה טובה. אל תיתן לזה לעלות לך לראש — זה היה בעיקר בזכות המפית.

**M1 — דבר עם המנוע (פעם ראשונה):**
> ניסית לפתוח בשיחה. המנוע עונה בשפה היחידה שהוא מכיר: הוא יורק לעברך רצף ממים —
> חתול במשקפי שמש. "ONE DOES NOT SIMPLY." תינוק עם אגרוף מונף. משהו עם מינִיוֹנים שגרם לך לאבד נקודת אחוז של אמון באנושות.
> "HAHA CLASSIC," הוא רועם בקול של עשרה מיליון סאבים, וצוחק מהבדיחה של עצמו. אף אחד לא צחק איתו. אף פעם אף אחד לא צוחק איתו.

**M2a — ההאכלה (חלק א'):**
> הנחת את המפית של שלמה על מגש ההזנה, בזהירות של איש שמפרק מטען חבלה. המנוע שאב אותה פנימה בהתלהבות של אלגוריתם שמזהה תוכן טרי.
> "HAHA CLAS—"

**M2b — ההאכלה (חלק ב'):**
> עצירה. הלהבים מקרטעים. מדי הלחץ קופצים מ-MAX LOLZ לאזור שאין לו שם, כי אף אחד לא האמין שיגיעו אליו.
> המנוע מנסה לעבד את הבדיחה של שלמה. שכבה ראשונה: לא מצחיק. שכבה שנייה: עדיין לא מצחיק. שכבה שלישית: למה. שכבה רביעית: "למה?... למה?... למה?..."
> הוא נתקע בלופ. מהצינורות נפלט שיעול של פיקסלים — אחד, שניים, מטח שלם — כמו קונפטי בהלוויה של ההומור.

**M2c — ההאכלה (סיום):**
> חריקה ארוכה. הלהבים נעצרים. הנורה על השער מתחלפת לירוק, וההידראוליקה נאנחת אנחת רווחה של פועל בסוף משמרת.
> המנוע גמור. הבדיחה של שלמה עשתה למכונת ההומור הגדולה בעולם את מה שהיא עשתה לשני נישואים של אותה אישה.
> [+15 נקודות]

**דבר עם השער (בונוס, אם השחקן מנסה):**
> דיברת אל שער הרמטי. הוא לא ענה — הוא שער. אבל בסולם היצורים שדיברת איתם היום, הוא עדיין בשליש העליון.

---

## 5. Deaths

### 5א — מוות ראשי: לקרוא מם בקול (avoidable — ה-look מזהיר: "לקרוא רק בלב. יש סיבה")

**Trigger:** `קרא ממים` / `קרא מם` / `קרא מדבקות`.

**Death text (api.die):**
> קראת את המם העליון בקול. ואז את זה שמתחתיו. ואז, מסיבה שאף חוקר לא יצליח לשחזר, גם את זה עם המיניונים.
> הקרינג' נכנס דרך העיניים, מצא את מרכז הבושה, והתיישב שם עם רגליים על השולחן. עדים דיווחו שמלמלת "הרולד מסתיר כאב" שלוש פעמים לפני שהתמוטטת.
> גרוק צחק. רק גרוק.
> ☠ הקריין ביקש לקרוא רק בלב. ללב יש חומת אש. לפה אין.

### 5ב — מוות בונוס: יד בפתח ההזנה (avoidable — השלט: "אל תכניס איברים. שוב.")

**Trigger:** `לחץ`/`דחוף`/`משוך` על הפה/הפתח/המגש.

**Death text (api.die):**
> דחפת יד לפתח ההזנה. המנוע זיהה תוכן אורגני, סיווג אותו כ"אותנטי", ועיבד אותך בשלמותך.
> יצאת מהצד השני כמם ב-144p: אב בית מצביע על רצפה, כיתוב צהוב: "CLEANING GUY DISCOVERS ONE WEIRD TRICK". צברת שמונה מיליון צפיות תוך דקה.
> אף אחת מהן לא שילמה לך תמלוגים.
> ☠ השלט אמר "שוב". עכשיו הם יצטרכו להוסיף "שוב שוב".

### 5ג — גאג כמעט-מוות: לעבור ימינה כשהמנוע פועל (NEARDEATH)

**Trigger:** `לך ימינה` / `פתח שער` לפני `memes_down`.

**Text (api.say — לא מוות, השחקן "נהדף"):**
> צעדת לתוך מסלול הריסוס. מם ראשון פגע לך בכתף. שני — בצוואר. את השלישי — צפרדע על חד-אופן — כמעט קראת.
> נסוגת אחורה בשארית כוחותיך, נשען על המדחס, נושם. עוד שלושה צעדים שם וזה היה קרינג' סופני. הקריין בדק: אין מזה החלמה. יש רק פודקאסט.
> אולי במקום ללכת דרך הבדיחות — תאכיל את המכונה באחת. משהו כבד. משהו של שלמה.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| left (walk off x≤4) | `xai_junkyard` | walking exit (engine `exits.left`) | No condition. |
| right (walk off x≥316) | `xai_hangar` | walking exit, **flag-gated** | Registered dynamically: `onEnter` (and the choke handler) set `this.exits.right = 'xai_hangar'` only when `memes_down`. While the engine runs, the exit does not exist — the hero stops at the wall; the parser routes (`לך ימינה` / `פתח שער`) return the NEARDEATH gag (5ג). After the flag: `פתח שער` also works as a scripted shortcut → `api.goto('xai_hangar', 14)`. |
| up / down / enter | — | none | No stairs, no basement. Just a turbine, memes, and a man with a mop who's seen worse. |

Engine block: `floor: { y1: 150, y2: 192 }`, `hero: true`, `music: 'xai'`, `exits: { left: 'xai_junkyard' }` (right added at runtime per the gate rule above).
