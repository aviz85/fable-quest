# DESIGN — openai_expo ("קומת התצוגה")

Act: openai · Music: openai · Score total: **15** (openai_expo_badge 15)
Exits: right → `openai_corridor` (walk) · up → `openai_boardroom` (scripted, stairs) · enter → `openai_stage` (scripted, gated by `bama_access`)
Flags owned: `visited_openai_expo` (+ room-internal `gadi_traded`) · Items given here: `tag_tzevet` · Items needed: `kartis_hagrala`
NPC: גדי איש ההפקה. Death: lifting a glass bell (feature leak).

---

## 1. Layout — 320x200 composition plan

A museum of products that never shipped. Sterile white, spotlights, everything behind glass. Floor band y=145–200 (hero 10x28: podium tops at y≈118 reach his chest — museum scale, correct). Light source: recessed ceiling spots.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Ceiling + recessed spots | 0,0 → 320x28 | P[7] ceiling slab, P[8] shadow line at y=26–28. Four recessed spot housings (P[8] 12x4) at x=42, 120, 198, 276; each with a P[15] light pixel-row. One spot flickers: `frame % 17 < 2` → P[7] (hype budget cuts). |
| 2 | Light cones | from each spot down to podiums | Narrow trapezoid faked with 3 stacked P[15]-on-white… skip on white wall; instead: P[15] vertical soft columns only where they cross the back wall (2px lighter strips), and a bright P[15] ellipse-ish patch (stacked rects) on each podium top. |
| 3 | Back wall | 0,28 → 320x117 (down to y=145) | P[15] main, P[7] baseboard strip y=140–145. Subtle vertical panel seams P[7] 1px every 64px. |
| 4 | Launch-schedule board | x=8–96, y=38–92 | P[0] frame, P[15] board. 4 rows x 3 cols of P[9] "milestone" blocks (10x6); over EVERY block a red X: two crossed P[4] rects (2px). Header bar P[9] with P[15] block-text. One block has TWO X's — it was cancelled twice. |
| 5 | KEYNOTE double door | x=196–248, y=52–145 | Gold-ish grandeur: P[14] frame (4px), P[6] doors, P[0] center seam, P[14] handles. Above: P[0] sign board x=200–244, y=40–50 with P[14] latin block-letters "KEYNOTE". Red velvet rope in front: two P[8] posts (x=198, x=244; y=126–145) with sagging P[4] rope (3 stepped 1px rects). |
| 6 | Service stairs (up) | x=272–318, y=60–145 | Open stairwell in wall: P[8] dark opening, 6 ascending steps (P[7] treads, P[8] risers) going up-right, P[15] "EXIT"-style sign block P[10] above (y=52–58). Leads to the boardroom. |
| 7 | Podium A + glass bell | podium x=36–72, y=118–145; bell x=40–68, y=88–118 | Podium: P[15] face, P[7] right shade, P[0] thin outline. Glass bell: P[11] outline (1–2px) with P[15] highlight pixels; inside — a blurry product: P[9]/P[11] dithered blob (unrecognizable ON PURPOSE). Front plaque: P[14] "COMING SOON" bar x=42–66, y=124–130 with P[0] block-text. |
| 8 | Podium B + glass bell | podium x=118–154, y=118–145; bell x=122–150, y=86–118 | Same language; inside-blob P[13]/P[15] dither (different vaporware). Plaque P[14] bar. Under this bell the blob **pulses**: swap 2 dither pixels every `frame % 12 < 6` — the product is "almost ready". |
| 9 | Podium C (empty!) | x=160–188, y=118–145 | Podium + plaque only, NO bell, nothing on top except a P[7] dust ring. Plaque still says COMING SOON. The most honest exhibit. |
| 10 | גדי (NPC sprite in art) | 16x26, feet y=145 | Black shirt P[0], jeans P[1], skin P[6] head, P[0] headset arc + mic pixel P[8], sweat: 1px P[11] on forehead `frame % 8 < 4`. **Animated position**: teleports between x=96 (near podium A), x=160 (podium C), x=190 (near door) on `Math.floor(frame/25) % 3` — a man in three places at once. |
| 11 | Deflated balloons | x=2–26, y=120–148 | Corner pile: 4–5 sagging half-ellipses faked as stacked rects P[4], P[9], P[14], each with a P[8] wrinkle line and a 1px P[8] string to the floor. A P[15] banner scrap "GPT-7" (block letters) half under them. |
| 12 | Carpet floor | y=145–200 | P[7] base with P[8] 2x2 checker dither rows widening toward y=200 (perspective). A P[8] coffee stain at x=210–226, y=170–176 (someone waited here a long time). Spot pools: lighter P[15]-dithered patches under podiums' fronts. |

Animations (≥1 required, we have 4): flickering ceiling spot, pulsing product blob, Gadi teleporting, sweat drop.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| גדי | איש הפקה, איש ההפקה, מפיק, איש | 96,119,96,26 *(wide band covering his 3 spots)* | "גדי. אוזנייה אחת, שלושה אירועים, אפס דופק תקין. הוא מזיע בקצב של השקה שנדחית בזמן אמת. על הצוואר שלו תלויים אחד-עשר תגים. אחד מהם בטוח מיותר." | דבר → onCommand (הפאזל). תן → onCommand. קח → "לקחת את גדי? הוא כבר שייך לשלושה אירועים במקביל. אין לך זכויות הפצה." |
| פעמון זכוכית | פעמון, זכוכית, מוצר, מוצרים, תצוגה | 40,86,112,34 *(covers bells A+B)* | "מתחת לזכוכית: מוצר מטושטש. הוא מטושטש גם מקרוב. הטשטוש הוא לא באג — הוא המוצר. שלט קטן מזהיר: 'חשיפה לציפיות אמיתיות עלולה לגרום לאידוי.'" | קח / הרם / פתח → **מוות** (סעיף 5). נגע → "הזכוכית חמימה ורוטטת קלות. כמו הייפ. או כמו מיקרוגל. עדיף לא לבדוק איזה מהשניים." |
| פודיום ריק | פודיום, כן, דוכן ריק | 160,118,28,27 | "פודיום בלי פעמון, בלי מוצר, עם טבעת אבק עגולה. השלט עדיין אומר 'COMING SOON'. זה המוצג הכי מדויק בקומה: הנה, סוף סוף, שקיפות מלאה." | קח → "לקחת כלום? יש לך כבר מספיק כלום בעו\"ש." נקה → "העברת אצבע מקצועית על טבעת האבק. עשור של ניקיון אומר לך: את האבק הזה משמרים בכוונה. זה 'אבק מורשת'." |
| לוח השקות | לוח, לוח זמנים, לוח ההשקות, קיר | 8,38,88,54 | "לוח הזמנים של ההשקות. כל אבן דרך מסומנת ב-X אדום. אחת מסומנת בשני X-ים — דחו את הדחייה שלה. בתחתית, בקטן: 'הלו\"ז סופי*. *כפוף להגדרת המילה סופי.'" | קרא → אותו look. קח → "הלוח מוברג לקיר בשמונה ברגים ובחוזה. אתה מזהה עבודה של עורך דין, לא של נגר." |
| דלת הקינוט | דלת, דלתות, כניסה לבמה, במה, קינוט | 196,40,52,105 | "דלת כפולה מוזהבת עם שלט 'KEYNOTE'. מבעד לחריץ נשמעות מחיאות כפיים שמתחילות ונגמרות בדיוק מצמרר. חבל קטיפה אדום שומר עליה. החבל נראה קשוח יותר מהאבטחה בנתב\"ג." | היכנס / פתח → onCommand (סעיף 3+6). דחוף → "דחפת. הדלת לא זזה, אבל איפשהו נרשם לך אירוע אבטחה. מספר 4,097." |
| חבל קטיפה | חבל, קטיפה, מחסום | 196,124,52,21 | "חבל קטיפה אדום. הטכנולוגיה היחידה בבניין ששוחררה לפרודקשן, עובדת בלי באגים, ומחזיקה מעמד עשור. כמובן שאף אחד לא גאה בה." | קח → "משכת בחבל. שני העמודים נטו אליך כמו שני מאבטחים משועממים. החזרת. חכם." |
| מדרגות שירות | מדרגות, גרם מדרגות, למעלה | 272,52,46,93 | "מדרגות שירות אל חדר הישיבות. שלט: 'לשימוש צוות בלבד. גם המנכ\"ל הוא צוות. תלוי בשעה.'" | עלה / טפס / היכנס → goto `openai_boardroom` (סעיף 6). |
| בלונים | בלון, בלוני השקה, באנר | 2,118,26,32 | "בלוני השקה של GPT-7, מרוקנים למחצה. הם מסרבים למות לגמרי — כמו ההבטחות שהם ליוו. באנר קרוע מציץ מתחתיהם: 'העתיד כבר כמעט כמעט כאן'." | קח → "נגעת בבלון. הוא השמיע אנחה ארוכה של אוויר עומד משנת 2025. שניכם עצובים עכשיו." בעט → "בעטת בבלון. הוא התרומם עשרה סנטימטר, נזכר בלוח הזמנים, וצנח בחזרה. מזדהה." |
| שטיח | רצפה, כתם קפה, כתם | 0,145,320,55 | "שטיח אפור תאגידי עם כתם קפה ליד דלת הקינוט. מישהו חיכה כאן להשקה כל כך הרבה זמן שהקפה שלו התאדה מבפנים. אתה מעריך את הכתם מקצועית: שלוש ספונג'ות, מינימום." | נקה → "התכופפת עם רפלקס של ארבעים שנה. גדי צווח מרחוק: 'לא! זה סטיילינג! שילמנו למעצב על הכתם הזה!' אתה מתיישר לאט. העולם הזה חולה." |

---

## 3. Puzzle script — onCommand logic

Score keys: `openai_expo_badge` = 15. **Sum = 15.** ✔

```
STATE: flag gadi_talked (room-internal staging), flag gadi_traded (room-internal, trade done)
MANIFEST-LAW: visited_openai_expo (onEnter), item tag_tzevet (given here), item kartis_hagrala (consumed here)

onCommand(verb, noun, api, extra):

// --- דבר עם גדי (לפני העסקה) ---
if verb=='דבר' && noun=='גדי' && !getFlag('gadi_traded'):
    if !getFlag('gadi_talked'):
        setFlag('gadi_talked')
        say(G1a); say(G1b)          // מונולוג — ראו דיאלוג. רמז: הגרלות.
    else:
        say('גדי (לתוך האוזנייה): "שנייה, יש פה אזרח—" (אליך:) "אחי, אין לי תקציב, אין לי זמן, אין לי חיים. יש לך משהו עם מזל? על מזל אני תמיד מדבר."')
    return true

// --- העסקה: תן כרטיס הגרלה לגדי ---
if verb=='תן' && (noun=='כרטיס' || noun=='כרטיס הגרלה' || (noun=='גדי' && extra.raw includes 'כרטיס')):
    if getFlag('gadi_traded'):
        say('גדי כבר קיבל את הכרטיס. הוא מלטף אותו בין שיחות. אל תהרוס לו את הרגע היחיד של שקט.')
        return true
    if !hasItem('kartis_hagrala'):
        say('אין לך כרטיס הגרלה. יש לך רק חלומות, ועל חלומות גדי לא נותן תגים — יש לו מחסן מלא כאלה משלו.')
        return true
    removeItem('kartis_hagrala')
    addItem('tag_tzevet', "תג 'צוות אירוע'", 'שרוך כתום ותמונה של מישהו שהוא בערך אתה. בעולם האירועים — דרכון, ויזה ותעודת יושר.')
    setFlag('gadi_traded')
    score(15, 'openai_expo_badge')
    say(G2a); say(G2b)              // סצנת העסקה — ראו דיאלוג
    return true

// --- דבר עם גדי (אחרי העסקה) ---
if verb=='דבר' && noun=='גדי' && getFlag('gadi_traded'):
    say('גדי מצביע על התג שלך בלי להפסיק לדבר לאוזנייה: "צוות! אתה צוות! תעלה, תסתובב, תנקה, תהיה. רק אל תיגע בפעמונים. הפעמונים זה משפטית, לא הפקה."')
    return true

// --- קח תג (לפני העסקה) ---
if verb=='קח' && (noun=='תג' || noun=='תג צוות') && !getFlag('gadi_traded'):
    say('הושטת יד לערימת התגים של גדי. הוא תפס את פרק כף היד שלך בלי להסתכל, באמצע שיחה.\n"אחי. תגים זה לא בחינם. תגים זה כלכלה. יש לך משהו בשבילי?"\nרמז: לאיש הזה יש בעיית הימורים והוא גאה בה.')
    return true

// --- מוות: להרים פעמון זכוכית ---
if (verb=='קח' || verb=='הרם' || verb=='פתח') && (noun=='פעמון' || noun=='זכוכית' || noun=='מוצר'):
    die(DEATH1)   // ראו סעיף 5
    return true

// --- דלת הקינוט ---
if (verb=='היכנס' || verb=='פתח') && (noun=='דלת' || noun=='במה' || noun=='קינוט'):
    if getFlag('bama_access'):
        say('אתה מרים את חבל הקטיפה בתנועת "אני צוות". החבל, שמזהה סמכות, מרשה. הדלת נפתחת אל חושך, זרקורים, ומחיאות כפיים של אנשים שעוד לא ראו כלום.')
        goto('openai_stage')
    else:
        say('סדרן בחליפה לבנה מתייצב מולך כאילו שוכפל מהקיר.\n"הכניסה לצוות אירוע מתועדף בלבד." הוא מצביע על החזה שלך. אין שם תג. יש שם רק חולצה של אב בית.\n"שיבוץ מתקבל בחדר הישיבות למעלה. בהצלחה עם... התזמון."')
    return true

// --- מדרגות למעלה ---
if (verb=='עלה' || verb=='טפס' || (verb=='היכנס' && noun=='מדרגות')) :
    say('אתה עולה במדרגות השירות. מלמעלה נשמע קול של דלת מסתובבת ומחיאות כפיים מכניות. סימן טוב זה לא.')
    goto('openai_boardroom')
    return true

return false
```

Notes for the implementer:
- `gadi_talked` / `gadi_traded` are room-internal staging; only `visited_openai_expo` is manifest-law here. `bama_access` is READ here (owned by `openai_boardroom`) to gate the `enter` exit — never set it in this room.
- `tag_tzevet` is given ONLY via the trade. It is NOT consumed here — the boardroom and stage check possession.
- The `up` exit is scripted (goto), not an edge-walk. The `enter` exit is scripted and gated. Only `right` is a plain walking exit.
- Accept `תן גדי כרטיס` / `תן כרטיס לגדי` via `extra.raw` matching — parsers are cruel, players crueler.

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_openai_expo`):**
> קומת התצוגה. מוזיאון שלם של מוצרים שמעולם לא שוחררו, כל אחד מטושטש בקפידה מתחת לפעמון זכוכית, כולם "COMING SOON" מאז ממשלת בנט.
> בין הפודיומים מרחף גדי, איש הפקה שמנהל שלושה אירועים במקביל ואפס מהם בשליטה. מימין — מסדרון הבטיחות. למעלה — חדר הישיבות. ומאחורי דלת הזהב: הבמה. אתה שומע מחיאות כפיים. הן מתוזמנות. כמו הכול פה.

**G1a — גדי, שיחה ראשונה:**
> "אחי! זוז מהספוט— לא אתה, דובר על— כן, המיקרופון של המנכ\"ל שוב— רגע." (הוא לוחץ על האוזנייה ומסתכל עליך בפעם הראשונה.)
> "שלושה אירועים יש לי היום. קינוט, פרה-קינוט, ופוסט-מורטם לקינוט שעוד לא קרה. אתה מבין מה זה לחץ? לחץ זה כשמכינים מחיאות כפיים לפיצ'ר שאין."

**G1b — גדי, ההתוודות:**
> "אתה יודע מה מחזיק אותי? הגרלות. כרטיסי הגרלה. הדבר היחיד בעולם שבו 'coming soon' זה באמת מרגש. פרס שאולי יגיע — אבל באמת אולי! לא אולי של רבעונים!" (העיניים שלו בורקות בטירוף קטן ויפה.)
> "אין לך במקרה משהו כזה, אה? משהו עם מזל?"

**G2a — העסקה, חלק א':**
> אתה שולף את כרטיס ההגרלה של המכולת. גדי משתתק. באוזנייה צועקים עליו שלושה אנשים והוא לא שומע אף אחד מהם.
> "רגע. רגע רגע רגע. הגרלה של מכולת? אמיתית? שכונתית? מה הפרס הראשון?"
> "מגהץ אדים," אתה אומר. זו הפעם הראשונה היום שאתה אומר משהו, וזה המשפט הנכון.

**G2b — העסקה, חלק ב':**
> "מגהץ אדים?! אחי. אחי. עשינו עסק." הוא מנתק שרוך כתום מהצוואר ותוקע לך אותו ביד. "קח תג. קח שניים. אל תספר לאף אחד. במיוחד לא ל-HR. פיטרו אותם, אבל ליתר ביטחון."
> קיבלת: תג 'צוות אירוע'. התמונה עליו היא של מישהו אחר לגמרי. גדי מבטיח שזה "בסדר גמור, אף אחד פה לא מסתכל על מציאות".
> [+15 נקודות]

---

## 5. Death — הפעמון (דליפת פיצ'ר)

**Trigger:** `קח פעמון` / `הרם פעמון` / `פתח זכוכית` / `קח מוצר` (avoidable — the look text warns: "חשיפה לציפיות אמיתיות עלולה לגרום לאידוי").

**Death text (api.die):**
> הרמת את פעמון הזכוכית. המוצר, שנחשף לראשונה לציפיות של בן אדם אמיתי, מהבהב, מצטמרר — ומתאדה בענן קטן של roadmap.
> אזעקה נעימה: "אירוע דליפת פיצ'ר. הצוות המשפטי של ההייפ בדרך אליך." הם מגיעים תוך שנייה וחצי. על דליפות הם כן עומדים בלו"ז.
> אתה מפורק לפוטנציאל, נארז מחדש, ומתויג 'coming soon'. שחרורך נדחה לרבעון שאחרי הבא. וגם הוא יידחה.
> ☠ אמרנו לך. הטשטוש היה שם בשבילך, לא בשבילו.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| right (walk off x≥310) | `openai_corridor` | walking exit (engine `exits.right`) | No condition. |
| up | `openai_boardroom` | scripted (`עלה`/`טפס` on מדרגות → `api.goto`) | No condition — flavor line, then goto. |
| enter | `openai_stage` | scripted (`היכנס`/`פתח` דלת → `api.goto`) | Requires `getFlag('bama_access')` (set in `openai_boardroom`). Without it — the usher blocks with a hint pointing upstairs. |
| left / down | — | none | Walking left just hits the balloon corner. No exit. |

Engine block: `floor: { y1: 150, y2: 192 }`, `hero: true`, `music: 'openai'`, `exits: { right: 'openai_corridor' }` (up/enter handled in onCommand via goto).
