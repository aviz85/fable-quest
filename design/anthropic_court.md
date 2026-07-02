# DESIGN — anthropic_court · חצר המנזר

Act: anthropic · Music: anthropic · Score total: **20** (5+15)
Exits (manifest, law): left→`anthropic_gate` · up→`anthropic_library` · right→`anthropic_garden` · enter→`anthropic_hall`
Items here: `tofes_3b` · Flags set here: `chatima_safek`

---

## 1. Layout — 320x200 composition plan

Serene zen inner court. Soft cyan sky, clay-brick walls with arches, light stone floor, rectangular reflection pool. Floor band: **y=145–200** (floor.y1=150, y2=192). Hero 10x28.

| Element | Coords (x,y,w,h) | Notes for artist |
|---|---|---|
| Sky | 0,0,320,50 | P[3] base, horizontal soft bands P[9]; one slow cloud rect drifting `(frame/4)%320` |
| Rear clay wall | 0,50,320,95 | P[6] body, P[7]/P[8] brick seam lines; top edge trim P[15] |
| **Hall gate (enter→anthropic_hall)** | 140,58,42,86 | Grand double door, dark wood P[4] with P[14] copper bands; small "אולי" plaque above (P[15] strip 146,52,30,5) |
| **Library stairs+door (up→anthropic_library)** | 34,74,30,70 | 4 ascending steps P[7]/P[8] (34,124→ up), arched doorway P[0] opening in wall at 38,74,22,50, P[10] scroll-glow inside |
| Arch columns | 96,58,10,86 and 214,58,10,86 | Clay columns P[6], caps P[7]; matching arch curves suggested with stepped rects |
| **Gong** | 236,66,34,34 | Copper disc P[14] on dark wood frame 232,58,42,50 (P[4]); mallet leaning at 274,120,4,26 (P[6]) |
| **Clerk desk (נזיר-פקיד)** | 250,120,52,26 | Wood P[6]/P[4]; stack of white forms P[15] at 256,114,14,8; tiny bell P[14] at 286,114,6,6 |
| Clerk monk (behind desk) | 262,96,12,26 | Brown robe P[6], head P[7]; head bobs 1px `frame%20<10` |
| **Reflection pool** | 108,152,104,30 | Border stones P[8]; water P[3] with P[11] ripple stripes scrolling `(frame*2)%104` |
| **Three chanting monks** | 116,120 / 138,120 / 160,120 (each 10x26) | Sitting row in front of pool's far edge (on ledge y=120-146); brown robes P[6], heads sway alternately ±1px |
| **Monk Safek (הנזיר סַפֵק)** | 216,116,12,30 | Standing, slightly grayer robe P[8], head P[7], wrings hands (2px arm flicker) |
| Bamboo pots | 12,128,16,22 and 296,148,16,22 | Pot P[4], stalks P[2], leaves P[10] |
| Stone path | 150,145,24,55 vertical + 0,168,320,14 horizontal | P[7] slabs with P[8] gaps — leads left↔right and up to gate |
| Floor | 0,145,320,55 | P[7] base, P[8] slab lines every ~24px |
| Famous stain (gag) | 60,176,10,6 | P[8] blotch — "בהערכת סיכונים מאז 2024" |

Animations: pool ripples (mandatory), monks' chanting sway, clerk head-bob, drifting cloud.

---

## 2. Hotspots table (9)

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | נזיר-פקיד | פקיד, נזיר פקיד, דלפק, דוכן | 250,96,52,50 | «נזיר שתפקידו להנפיק טפסים על הסיכונים שבהנפקת טפסים. יש לו נייר-כריתה על שם עצמו, ליתר ביטחון.» | דבר → dialogue A (מנפיק טופס). קח → ראה puzzle. |
| 2 | טפסים | טופס, ערימת טפסים, טופס 3ב, ניירת | 256,110,20,14 | «ערימת 'טופס אי-מזיקות 3ב'. מהדורה מעודכנת: עכשיו עם 47 סעיפי פטור, במקום 46. ההתקדמות מסחררת.» | קח → puzzle (addItem tofes_3b). |
| 3 | הנזיר ספק | ספק, נזיר ספק, הספקן | 216,110,14,38 | «הנזיר סַפֵק. הוא לא בטוח שהוא עומד כאן. הוא לא בטוח שאתה מסתכל עליו. בדבר אחד הוא בטוח: שהוא לא בטוח.» | דבר → dialogue B. תן → «הוא לא מוכן לקבל חפצים. קבלה היא התחייבות.» |
| 4 | נזירים | נזירים משננים, שלושה נזירים, מקהלה | 112,118,62,30 | «שלושה נזירים משננים את החוקה בלופ. הם באות ה'. מתוך ארבעה מיליון סעיפים. תחזור בעוד עשור.» | דבר → «"...ובלבד שלא ייגרם נזק..." הם לא עוצרים. אתה לא קיים בסילבוס.» |
| 5 | בריכה | בריכת השתקפות, מים, בריכת מים | 108,152,104,30 | «בריכת השתקפות. אתה מסתכל פנימה ורואה אדם עייף עם מגב. המים מתנצלים על הדיוק.» | שתה → death-adjacent gag (ראה 5). היכנס/קפוץ → death B. |
| 6 | גונג | פעמון גדול, גונג נחושת | 232,58,42,50 | «גונג נחושת עתיק. שלט קטן: 'אין להקיש. הקשה = אירוע אקוסטי בלתי הפיך'. המקוש מונח לידו, מפתה להחריד.» | הכה/השתמש/לחץ/דחוף → **DEATH A**. קח (מקוש) → «נגעת במקוש. שלושה נזירים פקחו עין אחת. הנחת אותו. חכם.» |
| 7 | שער ההיכל | דלת, שער, היכל, דלת ההיכל | 140,58,42,86 | «שער היכל אב המנזר. עליו שלט: 'היכנסו. או לא. אנחנו לא רוצים ללחוץ'.» | פתח/היכנס → exit-enter logic (ראה 6). |
| 8 | מדרגות | דלת הספרייה, ספרייה, פתח, מעלה | 34,74,34,70 | «מדרגות אל ספריית המגילות. כל מדרגה מסומנת: 'זהירות, מדרגה'. גם הרצפה מסומנת: 'זהירות, רצפה'. הכל תחת שליטה.» | עלה/היכנס/לך → goto anthropic_library. |
| 9 | כתם | כתם על הרצפה, לכלוך | 58,174,14,10 | «כתם על אבן החצר. תיק הערכת הסיכונים שלו עבה יותר מהחוקה. אתה מרגיש דגדוג מקצועי באצבעות המגב.» | נקה/השתמש (מגב) → «ניגבת חצי תנועה — ושלושה נזירים התעלפו מרוב אומץ. עזוב. יש כתם אחר שמחכה לך בגן, עם נזירה שבאמת צריכה אותך.» |
| — | במבוק (בונוס) | עציץ, צמח | 12,128,16,22 | «במבוק. הצמח היחיד שאושר לגידול: הוא צומח לאט, בשקט, ולא מפתיע אף אחד.» | אכול → «לא. אתה אב בית, לא פנדה.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = 20, manifest quota; keys use room prefix — canonical for the whole game):
- `anthropic_court_form` = **5**
- `anthropic_court_safek` = **15**

```
onCommand(verb, noun, api):

# --- קבלת הטופס (5 נק') ---
if (verb=='קח' && noun in ['טפסים','טופס','טופס 3ב']) or
   (verb=='דבר' && noun in ['נזיר-פקיד','פקיד'] && !api.hasItem('tofes_3b') && !api.getFlag('tofes_taken')):
    if api.hasItem('tofes_3b') or api.getFlag('tofes_taken'):
        api.say('כבר יש לך טופס. הפקיד מזכיר שכפול טפסים הוא סיכון סביבתי, מוסרי, ולוגיסטי.')
        return true
    api.say('הנזיר-פקיד שולף טופס, מחתים אותו בחותמת "אין בחתימה זו משום חתימה",\nומגיש לך אותו בשתי ידיים רועדות: "טופס אי-מזיקות 3ב. שלוש חתימות.\nבהצלחה. או לא. אני לא רוצה ללחוץ."')
    api.addItem('tofes_3b', 'טופס אי-מזיקות 3ב',
        'שלוש שורות חתימה ריקות ו-47 סעיפי פטור מאחריות. נייר ממוחזר, כמובן.')
    api.setFlag('tofes_taken')
    api.score(5, 'anthropic_court_form')
    return true

# --- דבר עם ספק (סירוב — רמז לפתרון) ---
if verb=='דבר' && noun in ['הנזיר ספק','ספק']:
    if api.getFlag('chatima_safek'):
        api.say('"חתמתי... אולי... אני צריך לשבת. או לעמוד. אחד מהם."')
        return true
    if !api.hasItem('tofes_3b'):
        api.say('"אתה רוצה משהו ממני? אולי. קשה לדעת. גם לך, כנראה."\nאולי כדאי קודם להשיג את הטופס מהפקיד.')
        return true
    api.say('אתה מגיש את הטופס. סַפֵק מחוויר:\n"לחתום? חתימה היא התחייבות. התחייבות היא סיכון. סיכון הוא... לא!\nכלומר — אולי לא! כלומר — אל תבקש ממני לחתום!"\nהממ. הוא ממש מתעקש שלא תבקש ממנו. מעניין.')
    return true

# --- הפתרון: לבקש ממנו לא לחתום (15 נק') ---
# תבניות פרסר: "אמור לספק לא לחתום" / "בקש מספק לא לחתום" /
# (verb=='אמור'||'בקש'||'דבר') && raw מכיל 'ספק' && raw מכיל 'לא לחתום' או 'אל תחתום'
if extra.raw matches /(ספק).*(לא לחתום|אל תחתום)/ :
    if api.getFlag('chatima_safek'):
        api.say('הוא כבר חתם "אולי". לבקש שוב זה לבקש צרות. ואתה כבר בצרות.')
        return true
    if !api.hasItem('tofes_3b'):
        api.say('אין לך טופס. לבקש ממישהו לא לחתום על כלום — זה כבר רמת זן שאתה לא מוכן אליה.')
        return true
    api.say('"סַפֵק," אתה אומר, "אל תחתום. חד-משמעית. בשום פנים ואופן."\nעיניו נפערות. "חד... משמעית? בלי סייג?! אני... אני לא יכול להתחייב\nלא-לחתום! זו התחייבות!" — היד שלו נשלחת אל העט כמו נגד רצונה,\nוהוא חותם: "אוּלַי". ואז מתמוטט על ספסל, מרוקן ומאושר.')
    api.setFlag('chatima_safek')
    api.score(15, 'anthropic_court_safek')
    api.say('חתימה שלישית — הושגה. הקריין מציין ביובש שזו הפעם הראשונה בהיסטוריה\nשפסיכולוגיה הפוכה נחשבת מסמך משפטי מחייב. אולי.')
    return true

# --- גונג = מוות (ראה סעיף 5) ---
if verb in ['הכה','השתמש','לחץ','דחוף','משוך'] && noun=='גונג':
    api.die(<DEATH A text>)
    return true

# --- בריכה ---
if verb=='שתה' && noun=='בריכה':
    api.say('התכופפת לשתות. שלושה נזירים זינקו לעצור אותך: "מים לא מסוננים!\nלא מאושרים! לא מהוססים מספיק!" ניצלת. מהמים. לא מהנאום.')
    return true
if verb in ['היכנס','קפוץ'] && noun=='בריכה':
    api.die(<DEATH B text>)
    return true

# --- כניסות סקריפטואליות (ראה סעיף 6) ---
if verb in ['פתח','היכנס'] && noun in ['שער ההיכל','דלת','שער']:  → enter logic
if verb in ['עלה','היכנס','לך'] && noun in ['מדרגות','ספרייה']:   → api.goto('anthropic_library')
```

Cross-room contract: `tofes_3b` gets signed in `anthropic_library` (סופר), `anthropic_garden` (ברוריה), and here (`chatima_safek`). `anthropic_hall` gate-keeps on all three signature flags.

---

## 4. Dialogue & first-entry

**onEnter (first visit, flag `visited_anthropic_court`):**
> «חצר המנזר. שלושה נזירים משננים את החוקה בקול אחיד — הם באות ה', סעיף 892,\nוההערכה היא שיסיימו עד 2094. בריכת ההשתקפות משקפת. הגונג שותק.\nהכל כאן כל כך רגוע, שאתה חושד שמישהו עשה לזה הערכת סיכונים.»

**Dialogue A — נזיר-פקיד (talk, before form):** ראה puzzle. אחרי לקיחת הטופס, talk →
> «"יש לך שאלות על הטופס? מצוין. אי אפשר לענות עליהן. סעיף 12: תשובות עלולות להטעות."»

**Dialogue B — הנזיר סַפֵק:** ראה puzzle (סירוב → רמז → פתרון → אפילוג "אולי").

**Dialogue C — נזירים משננים (talk):**
> «"...ובלבד שלא ייגרם נזק, ובכפוף לאמור לעיל, ומבלי לגרוע מהאמור להלן..."\nניסית להתפרץ. הם עברו לשנן חזק יותר. במנזר הזה, גם התעלמות היא בקונצנזוס.»

**Room description (status):**
> «חצר פנימית שלווה להחשיד: בריכת השתקפות, שלושה נזירים בלופ, גונג שאסור להקיש בו,\nודוכן טפסים. בצד עומד נזיר אחד שנראה כאילו הוא מתלבט אם לעמוד.»

---

## 5. Deaths

**DEATH A — הגונג (avoidable, main):** trigger: הכה/השתמש/לחץ/דחוף/משוך על הגונג.
> «הקשת בגונג. הצליל מתגלגל בחצר... ואז — דממה. ארבעים נזירים מגיחים מכל פתח\nופותחים בהערכת סיכונים קולקטיבית. עליך. אתה נקבר תחת 60,000 עמודי חוות דעת\nמודפסות בעותק כפול. הגונג סווג כטריגר. אתה סווגת כמטרד. שניכם הושתקתם.\n☠ טיפ מהקריין: כשכתוב "אין להקיש" — במנזר הזה, הם דווקא מתכוונים לזה.»

**DEATH B — הבריכה (avoidable, secondary):** trigger: קפוץ/היכנס לבריכה.
> «קפצת לבריכת ההשתקפות. עומק המים: 20 ס"מ. עומק הבירוקרטיה: אינסופי.\nלפני שהספקת לקום, צוות תגובה-לאירועי-רטיבות עטף אותך ב-14 שכבות ניילון בטיחות,\nכולל הראש. ליתר ביטחון.\n☠ מת מהגנת-יתר. יש גרועים מזה, אבל לא הרבה.»

**Near-death gag:** שתה מהבריכה (ראה puzzle) — הצלה ברגע האחרון + נאום.

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| left → `anthropic_gate` | walking edge | `exits.left` — hero walks off x<0. |
| right → `anthropic_garden` | walking edge | `exits.right` — hero walks off x>319. |
| up → `anthropic_library` | scripted | Verb עלה/היכנס/לך על "מדרגות"/"ספרייה", or walking onto stairs rect (34,124,34,20): `api.goto('anthropic_library')`. Flavor: «אתה עולה. כל מדרגה חורקת חריקת אזהרה מאושרת מראש.» |
| enter → `anthropic_hall` | scripted, gated | פתח/היכנס על השער: if `chatima_safek && chatima_sofer && chatima_bruria` (library/garden flags) → `api.say('השער נאנח: "שלוש חתימות. אין לי יותר תירוצים. בבקשה. כנראה."')` + `api.goto('anthropic_hall')`. Else → `api.say('השער מתנצל: "אב המנזר מקבל רק טפסים שלמים. שלוש חתימות. יש לך ' + N + '. אני מצטער. באמת. זו האישיות שלי."')` — counts current signatures. If no `tofes_3b` at all → «"טופס? אין טופס? אולי תתחיל מהדוכן. זו לא עצה, זו הרהור בקול."» |

Note for hall/gate rooms: this room assumes signature flags `chatima_sofer` (library) and `chatima_bruria` (garden); if their design docs name them differently, the hall gate check is the single source of truth — align there.
