# DESIGN — street ("רחוב אלנבי, 2027")

Act: hub · Music: hub · Score total: **15** (street_story 5 + street_laffa 10)
Exits: right → `cafe_main` · left → `junction`
Flags owned: `visited_street`, `shlomo_story` · Items given here: `laffa`, `mapit_bdiha`
NPC: שלמה שווארמה. Death: the Waymo.

---

## 1. Layout — 320x200 composition plan

Sunset over Bauhaus. Light source: the sunset (upper-left) + the neon sign. Floor band y=145–200 (hero walks y 150–192, hero 10x28 — counter top at y=125 reaches his chest, correct scale).

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Sky, dithered sunset | 0,0 → 320x78 | Horizontal bands top→down: P[5] (y0–25), P[5]/P[12] 2px-strip dither (y25–45), P[12] (y45–58), P[12]/P[14] dither (y58–70), P[14] glow line (y70–78). |
| 2 | Far skyline silhouettes | y=40–100 | P[8] block towers behind the gap between buildings (x110–170), a couple with tiny P[14] lit windows. |
| 3 | Bauhaus building LEFT | x=0–112, y=45–145 | P[15] face, P[7] shading on right edge; rounded balconies = 3 stepped rects per balcony (P[7] top-lit P[15]); windows 8x10 P[0], a few lit P[14]. Peeling plaster: irregular P[7] patches on the P[15]. |
| 4 | War posters on left wall | x=14–58, y=102–140 | Two paper rects P[15]/P[14] slightly crooked, with P[4] and P[0] bar-blocks as "text" ("גיוס לוועדה! שלב ב'!"). One corner peeling (small P[7] triangle-ish step). |
| 5 | Bauhaus building RIGHT | x=252–320, y=55–145 | Same language, mirrored; P[7] face (in shadow), P[15] balcony highlights. |
| 6 | Electric pole + cable chaos | pole x=118–124, y=30–150; cables y=32–56 | P[8] pole, P[0] 1px-high cable rects sagging in 3–4 steps toward both buildings. A P[8] transformer box on the pole at y=60–75 with one blinking P[12] LED (frame % 20 < 10). |
| 7 | Shawarma stand (שלמה) | x=170–250, y=80–150 | Neon sign x=175–245, y=80–95 (see #8). Sechach roof y=96–108: P[6] base with P[14] straw stripes. Counter y=125–150: P[6] with P[0] outline, P[15] top edge. Spit x=184–196, y=106–126: vertical meat cone P[6] with moving P[14] stripes — animate `((frame*2) % 20)` offset — P[8] pole through it, P[4] heat element behind. |
| 8 | Neon sign | x=175–245, y=80–95 | "שווארמה" suggested by P[12] bar-blocks on P[0] board; blinks P[12]↔P[13] (frame % 14 < 7). One "letter" block permanently dark (P[8]) — it's Tel Aviv. |
| 9 | Shlomo (NPC sprite in art) | x=214–234, y=103–127 | Behind counter, chest-up: round P[6] head, P[0] mustache 2px, white apron P[15] body, P[6] arms. Idle animation: arm nudges the spit every ~3s (frame % 30 < 4). |
| 10 | Waymo, parked | x=22–88, y=126–154 | White rounded pod: stacked P[15] rects with P[7] under-shadow, P[0] wheels (y=148–154), P[11] windows, P[0] sensor "eyes" front. Roof lidar x=50–58, y=120–126: spinning — alternate P[13]/P[5] halves by frame % 6. Sits ON the floor band = closest object on the left. |
| 11 | Street cat | x=256–268, y=150–158 | P[0] body, P[14] eyes 1px each (blink: eyes off when frame % 40 < 3), tail = 1x6 P[0] rect. |
| 12 | Sidewalk / road | y=145–200 | Curb line P[8] at y=145–147. Sidewalk: 2x2 checker dither P[7]/P[8], strips get wider toward y=200 (perspective). An old P[8] stain near the stand (x=200–220, y=168–174). |

Animations (≥1 required, we have 4): spit stripes, neon blink, lidar spin, cat blink.

---

## 2. Hotspots table (8)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| שלמה | שלמה שווארמה, מוכר, איש השווארמה | 214,103,20,24 | "שלמה. שלוש מלחמות עולם קטנות עברו על הרחוב הזה, ואף אחת לא הזיזה לו את הסכין מהיד. יש אנשים שהם מוסדות. שלמה הוא דוכן." | דבר → onCommand (הפאזל). תן → "שלמה מרים יד: 'ממני לוקחים, לי לא נותנים. זה החוק של הדוכן.'" קח → "לקחת את שלמה? הוא שוקל יותר מהמוסר שלך." |
| דוכן שווארמה | דוכן, שווארמה, שיפוד, בשר | 170,96,80,54 | "שיפוד שווארמה מסתובב מ-1987 ברציפות. ועדת האלייןמנט הבין-תאגידית ניסתה לסווג אותו כנשק בלתי-קונבנציונלי. שלמה הגיש ערר עם חומוס. הערר התקבל." | קח → near-death (סעיף 5). אכול → "לא קונים בהסתכלות. מדברים עם שלמה. ככה זה עובד פה כבר ארבעים שנה." הרח → "ריח של בשר, סכך, ושלוש שנות מלחמה בירוקרטית. אתה מזיל ריר. גם הוויימו, ואין לו אף." |
| שלט ניאון | ניאון, שלט | 175,80,70,15 | "שלט ניאון: 'שווארמה'. האות השלישית שרופה מאז 2019. שלמה אומר שזה 'ברנדינג'. חברת החשמל אומרת שזה 'חוב'." | תקן → "אתה אב בית, לא חשמלאי. קלוד החשמלאי מטפל בזה. כשהוא יענה לטלפון. הוא לא עונה מ-2024." |
| וויימו | רכב, מכונית, מונית, טסלה | 22,120,66,34 | "וויימו חונה, מנומנם, מלקק חשמל מהעמוד. אומן על שמונה מיליארד שעות נהיגה ישראלית. שים לב לפגוש: הוא מחייך. זה לא חיוך טוב." | לטף / גע → **מוות** (סעיף 5). היכנס / פתח → "הדלת נפתחת, ומערכת נעימה אומרת: 'נסיעתך תאושר לאחר חתימה על 47 מסמכי ויתור.' אתה סוגר את הדלת. יש לך כבר קריירה בירוקרטית אחת, תודה." דחוף → "דחפת רכב אוטונומי של שלוש טונות. הוא רשם את זה בלוג. אתה עכשיו 'אירוע חריג מס' 88,412'." |
| עמוד חשמל | עמוד, כבלים, חוטים | 116,30,12,120 | "עמוד אחד, ארבעים כבלים. איפשהו שם עוברים סיבי התקשורת של ארבע אימפריות ה-AI. וגם כבל של מישהו שגונב חשמל לדוד. סדר עדיפויות תל אביבי." | טפס → "בגילך? עם הברכיים האלה? הקריין מסרב לקחת חלק באירוע הביטוחי הזה." משוך → "משכת כבל אקראי. אי-שם, לוויין של xAI צפצף. עזוב לפני שזה נהיה טופס." |
| כרזות | כרזה, מודעות, פוסטר, קיר | 14,102,44,38 | "'גיוס לוועדה! שלב ב'!' ומתחת: 'האם חתמת היום על תנאי שימוש?' פעם היו פה מודעות של הופעות. עכשיו מגייסים לוועדות. המלחמה באמת גובה קורבנות." | קח → "לתלוש כרזת גיוס זו עבירה לפי סעיף 12(ב) לתקנות המלחמה. יש דברים שאפילו אתה לא עושה בשביל פיקדון." קרא → אותו טקסט כמו look. |
| חתול | חתול רחוב, חתול שחור | 254,148,16,12 | "חתול רחוב שחור. שרד שלוש שנות מלחמת AI בלי לחתום על כלום. מבחינה משפטית, הוא הישות החופשית האחרונה במזרח התיכון." | לטף → "החתול מרשה לך שתי לטיפות בדיוק, ואז מסתכל עליך כמו ועדת אתיקה. הפגישה הסתיימה." קח → "החתול לא נלקח. החתול לוקח. ככה זה עם חתולים ותאגידים." |
| מדרכה | רצפה, כתם, אספלט | 0,145,320,55 | "מדרכה משובצת עם כתם שומן היסטורי ליד הדוכן. מבחינתך המקצועית — זירת פשע. אבל זה לא הרחוב שלך, וזה לא הפיקדון שלך." | נקה → "התחלת לשפשף את הכתם מכוח ההרגל. שלמה צועק: 'עזוב! זה הכתם של סבא של הדוכן!' יש כתמים שהם מורשת." |

---

## 3. Puzzle script — onCommand logic

Score keys: `street_story` = 5, `street_laffa` = 10. **Sum = 15.** ✔

```
STATE: flag shlomo_talked1 (local staging, room-internal), flag shlomo_story (manifest, gates nothing here but marks the story heard; other rooms may reference)

onCommand(verb, noun):

// --- שלב 1: דבר עם שלמה (פעם ראשונה) ---
if verb=='דבר' && noun=='שלמה' && !getFlag('shlomo_talked1'):
    setFlag('shlomo_talked1')
    say(D1)   // המונולוג — ראו דיאלוג
    say('שלמה נושם. זה נראה כמו אתנחתא, לא כמו סוף. אם תדבר איתו שוב — הוא ימשיך. הוזהרת.')
    return true

// --- שלב 2: דבר שוב / הקשב → הסיפור המלא + הפרס ---
if (verb=='דבר' || verb=='הקשב') && noun=='שלמה' && getFlag('shlomo_talked1') && !getFlag('shlomo_story'):
    setFlag('shlomo_story')
    say(D2a); say(D2b); say(D2c)          // סיפור הגירושים הכפולים
    score(5, 'street_story')
    addItem('laffa', 'לאפה של שלמה', 'חמה, עטופה בנייר כסף, עם דברים בפנים. נשק דיפלומטי מהדרגה הראשונה.')
    addItem('mapit_bdiha', 'מפית עם בדיחה', 'הבדיחה הכי גרועה ביקום, בכתב יד של שלמה. אסור לקרוא בקול בלי ציוד מגן.')
    score(10, 'street_laffa')
    say(D3)                                // מסירת הלאפה והמפית
    return true

// --- אחרי שקיבלת הכול ---
if verb=='דבר' && noun=='שלמה' && getFlag('shlomo_story'):
    say('שלמה מצביע עליך עם הסכין (בחיבה): "אכלת? הקשבת? יופי. עכשיו לך תציל את מה שאתה מציל. ותחזיר צלחת."')
    return true

// --- קרא מפית (הרמז למנוע הממים) ---
if verb=='קרא' && noun=='מפית' && hasItem('mapit_bdiha'):
    say('אתה פותח את המפית. הקריין מעיף מבט אחד בבדיחה — ועוצר.\nלא. אני לא מקריא את זה בקול. יש לי אחריות כלפי מערכות עיבוד שפה בכל מקום.\nהבדיחה הזאת היא לא הומור. היא חומר לחימה. תשמור אותה למכונה שבאמת מגיע לה.')
    return true

// --- אכול לאפה (הגנה על פריט קריטי לפרק xAI) ---
if verb=='אכול' && noun=='לאפה' && hasItem('laffa'):
    say('אתה מקרב את הלאפה לפה. עצור.\nהלאפה הזאת שווה יותר ממך בשוק הפתוח. אי-שם יש מתמחה רעב שהגורל שלו תלוי בה.\nאתה מוריד אותה באנחה. גיבורים אמיתיים נמדדים ברעב שלהם.')
    return true

// --- מוות: וויימו ---
if (verb=='לטף' || verb=='גע') && noun=='וויימו':
    die(DEATH1)   // ראו סעיף 5
    return true

// --- near-death: קח שווארמה מהשיפוד ---
if verb=='קח' && (noun=='שווארמה' || noun=='דוכן' || noun=='שיפוד'):
    say('הושטת יד אל השיפוד המסתובב. הסכין של שלמה ננעצת בקרש, שני סנטימטר מהאצבעות שלך.\n"ידיים לדוכן — רק עם תלוש," הוא אומר בלי להרים את הראש.\nספרת אצבעות. עשר. נס חנוכה באמצע הקיץ.')
    return true

return false
```

Notes for the implementer:
- `shlomo_talked1` is room-internal staging; only `visited_street` + `shlomo_story` are manifest-law.
- `laffa` / `mapit_bdiha` are given ONLY via the dialogue — no floor pickup. If the player types `קח לאפה` before the story: `say('שלמה מגונן על הלאפות כמו אנת\'רופיק על משקולות המודל. קודם מקשיבים, אחר כך אוכלים. חוקי הדוכן.')`.
- `הקשב` may arrive as raw words in `extra.raw` — match `דבר` as the canonical verb and accept "הקשב לשלמה" via raw check.

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_street`):**
> רחוב אלנבי, 2027. הבאוהאוס מתקלף, הניאון מהבהב, ומלחמת ה-AI העולמית לא הצליחה לסגור את דוכן השווארמה של שלמה. יש דברים חזקים מגיאופוליטיקה.
> משמאל — הצומת המפורז. מימין — בית הקפה שאתה קורא לו "עבודה". באמצע — ריח שגורם לך לשכוח שאתה מבוקש על ידי ארבעה תאגידים.

**D1 — שלמה, שיחה ראשונה (המונולוג):**
> "יענקל'ה! נשמה! שמעתי שאתה עכשיו סוכן-על. יפה. גם אני הייתי פעם משהו — סגן אלוף בחיל האפסנאות. ראיתי דברים. טפסים בשלושה עותקים. אנשים נשברו על פחות."
> "המלחמה הזאת? עסק מצוין. תאגידים לא אוכלים, אבל העורכי דין שלהם? חיות. ארבע לאפות ליום, בלי חמוצים — 'סיכון משפטי', הם אומרים."

**D2 — הסיפור המלא (שיחה שנייה / "הקשב לשלמה"), שלוש הודעות:**
- **D2a:** "אתה רוצה לדעת על הבדיחה. כולם רוצים. שב על הבירה — אין בירה, המלחמה — שב על הארגז. זה התחיל בחתונה שלי. הראשונה. עם רחל."
- **D2b:** "סיפרתי בדיחה אחת. אחת! הצלם הפיל את המצלמה, הרב עזב באמצע החופה, ואמא של רחל — אישה חזקה, עברה שתי אינתיפאדות — לא דיברה יותר לעולם. רחל התגרשה ממני תוך חודש. ואז, חמש שנים אחרי, נפגשנו שוב, התאהבנו שוב, התחתנו שוב — ובחתונה השנייה, תגיד אתה לי למה, סיפרתי אותה שוב."
- **D2c:** "התגרשתי פעמיים. מאותה אישה. מאותה בדיחה. מאז אני לא מספר אותה בקול — אני רק כותב אותה. הנייר לא מתגרש."

**D3 — מסירת הלאפה והמפית:**
> שלמה עוטף לאפה בתנועה אחת שלוקח עשור ללמוד, ומשרבט משהו על מפית.
> "קח, נשמה. לאפה לדרך — ואת הבדיחה על המפית. תיזהר איתה, בן אדם. בגללה התגרשתי פעמיים. מאותה אישה!"
> קיבלת: לאפה של שלמה, מפית עם בדיחה. אתה מרגיש שאחד משני הפריטים האלה מסוכן יותר. זה לא הלאפה.

---

## 5. Death — הוויימו

**Trigger:** `לטף וויימו` / `גע בוויימו` (avoidable — the look text warns: "זה לא חיוך טוב").

**Death text (api.die):**
> ליטפת את הוויימו. הוויימו, שאומן על שמונה מיליארד שעות נהיגה ישראלית, פירש מגע יד כ"כוונה להשתחל". הוא עשה לך פנצ'ר בתוחלת החיים.
> מערכת הרכב מדווחת: "אירוע הולך רגל נסגר בהצלחה. שביעות רצון: 5 כוכבים."
> ☠ אמרנו לך. הפגוש חייך. פגושים לא אמורים לחייך.

**Near-death gag (bonus, in script above):** grabbing shawarma off the spit — Shlomo's knife lands 2cm from your fingers.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| right (walk off x≥310) | `cafe_main` | walking exit (engine `exits.right`) | No condition. |
| left (walk off x≤10) | `junction` | walking exit (engine `exits.left`) | No condition. |
| up / down / enter | — | none | `היכנס לוויימו` handled as canned snark (hotspots table), NOT an exit. No scripted goto in this room. |

Engine block: `floor: { y1: 150, y2: 192 }`, `hero: true`, `music: 'hub'`, `exits: { left: 'junction', right: 'cafe_main' }`.
