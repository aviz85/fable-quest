# DESIGN — anthropic_garden · גן המדיטציה

Act: anthropic · Music: anthropic · Score total: **10**
Exits (manifest, law): left→`anthropic_court`. No other exits.
Items here: none · Items needed: `smartut`, `tofes_3b` · Flags set here: `chatima_bruria`

---

## 1. Layout — 320x200 composition plan

Open zen garden. Soft pastel sky, low clay wall, stylized sakura tree shedding pink petals, big rounded boulders, raked sand in alternating arcs, small wooden bridge over a cyan stream, stone lantern — and in the center-right: the nun Bruria in lotus, facing THE STAIN, next to a three-year tower of risk-assessment reports. Floor band: **y=145–200** (floor.y1=150, y2=192). Hero 10x28.

| Element | Coords (x,y,w,h) | Notes for artist |
|---|---|---|
| Sky | 0,0,320,54 | P[11] base, soft horizontal bands P[3]; one thin drifting cloud rect P[15] `(frame/5)%320` |
| Low clay wall (rear) | 0,54,320,36 | P[6] body, P[8] seam lines every ~28px; P[15] cap strip at 0,54,320,3 |
| **Sakura tree** | trunk 44,62,10,84; canopy 16,34,72,40 | Trunk P[4] with P[8] bark notches; canopy blobs P[13] with P[15] highlights; branch rect 54,70,26,5 (P[4]) |
| **Falling petals (anim)** | 3-4 px rects P[13] | Spawn under canopy (x 20–90), fall: `y = 74 + (frame*1.5 + offset) % 100` — mandatory animation |
| **Stream** | 244,90,26,110 diagonal-ish: stepped rects narrowing down to 252,150,40,50 | Water P[3] with P[11] ripple stripes scrolling `(frame*2)%40`; banks P[8] |
| **Wooden bridge** | 240,132,52,10 + rails 240,124,4,8 / 288,124,4,8 | P[6] planks, P[4] gaps; crosses the stream; leads NOWHERE (decorative — this is a garden of contemplation, not of destinations) |
| **Stone lantern** | 200,96,16,44 | Base P[8] 202,128,12,12; pillar P[7] 206,108,6,20; lamp head P[8] 200,96,16,12 with warm glow window P[14] 205,100,6,6 that flickers `frame%14<7` |
| **Boulders** | 8,150,30,20 and 288,166,26,18 | Rounded via stepped rects, P[7] body, P[8] shadow underside, P[15] top glint |
| **Raked sand field** | 66,148,168,52 | P[14] base; rake arcs = alternating stripes P[6], stepped curves every 8px; DO NOT let the hero path cross it visually — stone path goes around |
| **Stone path** | 0,172,70,14 horizontal from left edge; then 66,166,20,34 curving down around the sand | P[7] slabs, P[8] gaps — the only "approved" walking surface (gag; engine floor band still applies) |
| **THE STAIN (סטיין-לי)** | 148,168,14,8 | Dark blotch P[8] with P[0] core 152,170,6,4 — sits ON stone tiles patch 140,164,32,16 (P[7]) inside the sand field |
| **Bruria (lotus)** | 168,148,14,22 | Facing the stain (left); robe P[6], head P[7], closed-eyes dash P[0]; breathing anim: shoulders ±1px `frame%20<10` |
| **Report tower** | 190,112,18,58 | P[15] paper stack with P[8] separator lines every 6px — taller than sitting Bruria; topmost page flaps 1px `frame%16<8` |
| Meditation bell (small) | 118,160,10,8 | P[14] bowl on P[4] cushion 116,166,14,4 |
| Floor base | 0,145,320,55 | P[7] earth/stone base under everything, P[8] speckle rects |

Animations: falling petals (signature), stream ripples, lantern flicker, Bruria breathing, flapping report page.

---

## 2. Hotspots table (9)

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | ברוריה | נזירה, הנזירה ברוריה, נזירה ברוריה | 164,144,22,28 | «הנזירה ברוריה. שלוש שנים בתנוחת לוטוס מול כתם. היא כבר לא מודטת על הכתם — היא מודטת עם הכתם. יש להם מערכת יחסים. היא מסובכת.» | דבר → dialogue A. תן (סמרטוט) → **THE PUZZLE**. תן (אחר) → «היא פוקחת עין אחת: "זה עבר הערכת סיכונים?" סוגרת אותה. לא עבר.» |
| 2 | כתם | הכתם, סטיין-לי, לכלוך, כתם על הרצפה | 144,164,24,14 | «הכתם. עבר שלוש ועדות, שני ערעורים, וקיבל שם רשמי: "סטיין-לי". יש לו תיק אישיות עבה משלך. אתה מרגיש את המגב רוטט בגעגוע — אבל זה הכתם שלה. יש כללים.» | נקה/השתמש (מגב/סמרטוט על הכתם) → redirect: «היד שלך נעצרת סנטימטר מהכתם. ברוריה משמיעה צליל שנזירות לא אמורות לדעת להשמיע. זה הכתם שלה. תן לה את הכלים — היא תעשה את הצעד.» קח → «לקחת... כתם? הוא ספוג ברצפה ובפסיקה משפטית. עזוב.» |
| 3 | ערימת דוחות | דוחות, ניירת, ערימת ניירות, הערכות סיכונים | 190,110,20,60 | «מגדל הערכות הסיכונים של הכתם. כרך א': "האם ניגוב הוא אלימות?". כרך ל"ז: "הכתם — ישות או אירוע?". הכרך האחרון פתוח בעמוד שכתוב בו רק: "אולי".» | קח → «משכת דוח אחד מהתחתית. המגדל נשען. ברוריה פקחה עין. החזרת. כולם נשמו. לאט.» קרא → «"מסקנת ביניים (שנה ג'): נדרשת ועדה נוספת." אתה מרגיש את תוחלת החיים שלך מתקצרת מהקריאה.» |
| 4 | חול מגורף | חול, גן חול, קשתות, חול זן | 66,148,168,52 | «חול מגורף בקשתות מושלמות. כל קשת אושרה בנפרד. שלט קטן נעוץ בקצה: "נא לא לדרוך. החול זוכר."» | לך/דרוך/היכנס → **DEATH A**. גע → «נגעת בגרגר אחד. הוא זז. אתה מחזיר אותו למקום בזיעה קרה. אף אחד לא ראה. כנראה.» |
| 5 | עץ סאקורה | עץ, סאקורה, עץ פריחה | 16,34,72,112 | «עץ סאקורה שמשיר עלי כותרת בקצב מאושר של עלה לשנייה. יותר מזה הוגדר "ראוותנות", פחות מזה — "דיכאון נופי". האיזון עדין.» | טפס → «טיפסת ענף אחד. הענף חרק חריקת-אזהרה. ירדת. העץ רשם דוח אירוע.» קח (עלה) → «תפסת עלה כותרת באוויר. הוא ורוד, רך, ולגמרי לא שימושי. כמו רוב ההנהלה.» |
| 6 | פנס אבן | פנס, מנורה, פנס גן | 198,94,20,48 | «פנס אבן עתיק. האש בפנים הוחלפה בנורת לד "בטיחותית" שמהבהבת בדיוק כמו אש, רק בלי החום, האור או הטעם. קידמה.» | קח → «הוא שוקל יותר ממך ומהפיקדון שלך ביחד.» כבה → «אין מתג. יש טופס בקשת-כיבוי. זמן טיפול: שני חורפים.» |
| 7 | גשר | גשרון, גשר עץ | 236,122,58,22 | «גשרון עץ מקסים מעל הפלג. הוא לא מוביל לשום מקום — בצד השני יש קיר. במנזר מסבירים שגשר שמוביל למקום כלשהו הוא "התחייבות".» | עבור/לך → «חצית את הגשר. הגעת לקיר. חצית חזרה. חוויה זן שלמה. אפס תכלית, אפס נזק.» |
| 8 | פלג מים | פלג, נחל, מים, זרם | 244,132,48,66 | «פלג מים צלולים. הזרימה שלו אושרה בוועדת תנועת-נוזלים, בכפוף למהירות מרבית של ליטר לדקה. הוא בקושי עומד בזה.» | שתה → near-death gag (סעיף 5). קפוץ → «עומק: קרסול. אפילו למות פה אי אפשר בלי אישור.» |
| 9 | פעמון מדיטציה | פעמון, קערה, קערת פעמון | 114,156,18,16 | «קערת פעמון למדיטציה. שלט: "צליל אחד ביום. המכסה נוצלה ב-06:00." עכשיו 06:04 של הנשמה.» | הכה/השתמש/לחץ → «נגעת בקערה. היא השמיעה "טינג" זעיר. ברוריה, בלי לפקוח עיניים: "זה ייכנס לדוח." אתה מאמין לה.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = **10**, manifest quota):
- `anthropic_garden_bruria` = **10**

```
onCommand(verb, noun, api, extra):

# --- THE PUZZLE: תן סמרטוט לברוריה (10 נק') ---
# תבניות: verb=='תן' && (noun מכיל 'ברוריה'/'נזירה' או extra.raw מכיל 'סמרטוט')
#          וגם: 'השתמש' + 'סמרטוט' כשברוריה/כתם הם target
if (verb=='תן' && noun in ['ברוריה','נזירה','סמרטוט']) or
   (verb=='השתמש' && extra.raw matches /סמרטוט.*(ברוריה|נזירה)/):

    if api.getFlag('chatima_bruria'):
        api.say('ברוריה כבר חתמה. היא עכשיו בוהה בנקודה נקייה על הרצפה,\nומחייכת. אל תהרוס לה. יש לה שלוש שנים להשלים.')
        return true

    if !api.hasItem('smartut'):
        api.say('לתת לה מה בדיוק? ידיים טובות? היא צריכה כלי ניקוי.\nמשהו רך. משהו סופג. משהו שמריח כמו המרתף של שוקי.')
        return true

    if !api.hasItem('tofes_3b'):
        api.say('רגע, מקצוען. יש לך סמרטוט אבל אין לך על מה להחתים אותה.\nקודם טופס אי-מזיקות 3ב מהחצר — אחר כך גאולה. סדר פעולות, יענקל\'ה.')
        return true

    # SUCCESS
    api.say('אתה מושיט לברוריה את הסמרטוט.\nהיא בוהה בו. ואז בכתם. ואז בך. "אתה אומר ש... אפשר פשוט... לנגב?!"')
    api.removeItem('smartut')
    api.say('היא מתרוממת לראשונה מזה שלוש שנים (הברכיים שלה משמיעות\nאת הצליל של דלת השער). ביד רועדת, בתנועה אחת — היא מנגבת.\nהכתם איננו. סטיין-לי הלך למקום שכתמים הולכים אליו.\nברוריה בוכה. מגדל הדוחות מרכין ראש. גם אתה קצת, אל תכחיש.')
    api.say('בין דמעה לדמעה היא חוטפת ממך את טופס 3ב וחותמת בתנופה\nשל אישה חופשייה: "ברוריה. בלי אולי."\nחתימה שנייה — הושגה.')
    api.setFlag('chatima_bruria')
    api.score(10, 'anthropic_garden_bruria')
    return true

# --- הסתכל על כתם (הקריין מספר; רמז) ---
if verb=='הסתכל' && noun in ['כתם','סטיין-לי']:
    if api.getFlag('chatima_bruria'):
        api.say('הרצפה נקייה. איפה שהיה סטיין-לי יש עכשיו רק ברק קל,\nוזיכרון של שלוש ועדות שאף אחד לא יתגעגע אליהן.')
        return true
    api.say('הכתם. עבר שלוש ועדות, שני ערעורים, וקיבל שם רשמי: "סטיין-לי".\nיש לו תיק אישיות עבה משלך. אתה מרגיש את המגב רוטט בגעגוע —\nאבל זה הכתם שלה. יש כללים.')
    return true

# --- דבר עם ברוריה (dialogue A + רמז) ---
if verb=='דבר' && noun in ['ברוריה','נזירה']:
    if api.getFlag('chatima_bruria'):
        api.say('"כל בוקר אני באה לבהות בו... והוא לא שם. אתה יודע כמה זה\nמשחרר, לבהות בכלום?" אתה יודע. אתה עובד בענף.')
        return true
    api.say('"הכתם הזה ואני... עברנו ביחד שלוש ועדות," היא לוחשת.\n"ניגוב הוא פעולה בלתי הפיכה. מה אם הכתם מקיים מערכת אקולוגית?\nמה אם הוא בעל משמעות? מה אם ארגיש... ריקנות?"\nהיא נשמעת כמו מישהי שצריכה סמרטוט יותר משהיא צריכה תרפיה.\nולמזלה, אתה מכיר בן אדם עם גישה למרתף.')
    return true

# --- ניסיון לנגב בעצמך (מגב/סמרטוט על הכתם) — redirect ---
if verb in ['נקה','השתמש'] && noun in ['כתם','סטיין-לי']:
    if api.getFlag('chatima_bruria'):
        api.say('אין כתם. יש רק ניצחון. תתקדם.')
        return true
    api.say('היד שלך נעצרת סנטימטר מהכתם. ברוריה משמיעה צליל\nשנזירות לא אמורות לדעת להשמיע.\nזה הכתם שלה. שלוש שנים שלה. תן לה את הכלים — היא תעשה את הצעד.')
    return true

# --- חול מגורף = מוות (סעיף 5) ---
if verb in ['לך','דרוך','היכנס','קפוץ'] && noun in ['חול מגורף','חול','גן חול']:
    api.die(<DEATH A text>)
    return true

# --- פלג: שתייה = near-death gag (סעיף 5) ---
if verb=='שתה' && noun in ['פלג מים','פלג','מים','נחל']:
    → near-death gag
    return true

# --- יציאה (סעיף 6) ---
if verb=='לך' && noun in ['חצר','שמאלה']: api.goto('anthropic_court'); return true
```

Cross-room contract: `chatima_bruria` is one of the three signature flags checked by the `anthropic_court` enter-gate to `anthropic_hall` (together with `chatima_sofer` from the library and `chatima_safek` from the court). `smartut` comes from `cafe_basement`; `tofes_3b` from `anthropic_court`. This room consumes `smartut` (removeItem) and never consumes `tofes_3b`.

---

## 4. Dialogue & first-entry

**onEnter (first visit, flag `visited_anthropic_garden`):**
> «גן המדיטציה. חול מגורף בקשתות שאושרו פה-אחד, עץ סאקורה עם מכסת עלים יומית,\nופלג שזורם במהירות החוקית. במרכז: נזירה יושבת מול כתם.\nלפי שכבת האבק עליה — זה לא דייט ראשון.»

**onEnter (after `chatima_bruria`, returning visit):**
> «הגן שקט. ברוריה בוהה באושר בנקודה הנקייה. אפילו החול נראה רגוע יותר.\nעשית פה דבר טוב. אל תיתן לזה לעלות לך לראש — יש עוד רצפות בעולם.»

**Dialogue A — ברוריה (talk):** ראה puzzle. לפני פתרון → מונולוג הכתם + רמז לסמרטוט. אחרי → «לבהות בכלום» (למעלה).

**Room description (status):**
> «גן זן מוקפד להחריד: חול מגורף, סאקורה נושרת, גשר לשום מקום —\nונזירה אחת שכלואה בקרב מבטים עם כתם. הכתם מוביל, שלוש שנים רצוף.»

---

## 5. Death(s)

**DEATH A — החול המגורף (avoidable, main):** trigger: לך/דרוך/היכנס/קפוץ על החול.
> «דרכת על החול המגורף. קשת אחת נמחצה תחת הסוליה שלך.\nדממה. ואז — הגן מפעיל את "פרוטוקול שיקום הרמוניה":\nמגרפות אוטומטיות מגיחות מהשיחים ומגרפות את האזור הפגוע. כולל אותך.\nאתה עכשיו קשת מספר 47 בקומפוזיציה. סימטרי, שליו, ומת.\n☠ טיפ מהקריין: סוף סוף אתה שייך למשהו. לנצח. מזל טוב?»

**Near-death gag — שתיית מהפלג:**
> «התכופפת לשתות מהפלג. שנייה לפני שהשפתיים נגעו במים, צפה מולם\nתווית: "נוזל לא מסווג. שתייה = הסכמה לתנאי השימוש (40,000 עמ')".\nנרתעת אחורה. ניצלת. לא מהמים — מהחוזה.»

**Bonus snark (לא מוות) — טיפוס על הסאקורה:** ראה hotspot 5.

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| left → `anthropic_court` | walking edge | `exits.left` — hero walks off x<0. Also verb: לך + "חצר"/"שמאלה" → `api.goto('anthropic_court')`. |
| right / up / down | none | Right edge: «מעבר לפלג יש קיר. הקיר עבר הערכת סיכונים ונמצא בטוח. גם משעמם.» Bridge leads to a wall (hotspot 7 gag). No scripted exits. |

Engine note: `floor: { y1: 150, y2: 192 }`. The raked-sand death fires on the PARSER command (verbs on hotspot 4), not on free walking — the floor band is shared, so don't punish pathfinding; punish intent.
