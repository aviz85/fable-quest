# DESIGN — google_corridors ("מסדרונות האינסוף")

Act: google · Music: google · Score total: **20** (google_corridors_tzachi 20)
Exits: left → `google_lobby` (walk) · right → `google_kitchen` (walk) · enter → `google_meeting` (scripted, gated by `zimun`) · up → `google_graveyard` (scripted, the two-way slide)
Flags owned: `chatima_tzachi` (manifest-law) + room-internal `visited_google_corridors`, `tzachi_talked`, `tzachi_team`, `couch_warned`
Items needed: `tofes_bitul` (signed here, NOT consumed), `zimun` (gate for enter, NOT consumed)
NPC: צחי — העובד חסר הצוות. Death: sitting on the orange couch (engagement-based deprecation).

---

## 1. Layout — 320x200 composition plan

An infinite Google corridor: identical kitchenette doorways shrinking to a vanishing point, primary colors on white, everything half-deprecated. Vanishing point at ~(160,98). Floor band y=145–200 (hero 10x28; front doorways ~66px tall — hero fits with corporate headroom). Light: dead-even fluorescent, except the one flickering panel (of course).

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Ceiling panels | 0,0 → 320x44 | P[15] base. Perspective panel seams: P[7] 1px lines converging from top corners toward (160,98) — draw 4–5 stepped horizontal seam rows (y=6, 16, 26, 36) shortening toward center. Fluorescent strips: P[11] 24x3 bars at x=60, 148, 236 on y=8; the middle one flickers `frame % 13 < 2` → P[8]. |
| 2 | Back wall / vanishing point | x=140–180, y=84–120 | The corridor "ends" in a tiny far wall: P[7] rect with a 4x8 P[8] doorway that clearly leads to another identical corridor. Above it a microscopic P[4]/P[14]/P[1]/P[2] four-pixel color strip (branding never dies). |
| 3 | Left wall + kitchenette doorways | wall 0,44 → ~140x101 | P[15] wall. Three receding doorways: A x=6–40, y=78–145 (frame P[1] 3px, interior P[8] with a P[11] counter strip); B x=58–82, y=88–138; C x=104–120, y=94–130. Above EACH lintel a different color bar (4px): P[1], P[4], P[14] — identical kitchens, different "identities". Baseboard P[7] y=140–145. |
| 4 | Right wall + kitchenette doorways | wall 180,44 → 320x101 | Mirror language: doorway D x=286–318, y=78–145 (lintel bar P[2]), E x=246–268, y=88–138 (lintel bar P[14]). Perspective wall seam lines P[7] 1px converging to (160,98). |
| 5 | Meeting-room double door ("אינסוף-3") | x=196–240, y=70–145 | The only serious door: P[15] double door with P[7] frame (3px), P[0] center seam, two P[8] handles at y=110. Above it y=58–68: P[0] sign board with P[15] block-text. Red "בשימוש" LED: 4x4 P[4] at x=216, y=52 — blinks `frame % 20 < 10` (the meeting has been "in use" since 2023). |
| 6 | The two-way slide (up → graveyard) | x=48–96, y=48–145 | A primary-color tube slide entering through the ceiling: P[4] outer tube arc faked with stepped rects (x=48–96 descending from y=48 to a P[0] mouth opening x=60–88, y=110–145). P[14] safety rim (2px) around the mouth. Small sign P[15] on P[0] board at x=52, y=100: block-glyphs. It goes UP. Nobody knows why it goes up. It's in beta. |
| 7 | Contradictory direction signs | hanging y=46–58 | Two P[15] signs on P[8] 1px stems from ceiling: sign1 x=110–150, sign2 x=170–210. Each carries a P[0] arrow glyph (block pixels) — pointing at EACH OTHER. Both say (conceptually) "חדר ישיבות". Art: just opposing arrow blocks. |
| 8 | Orange couch (never sat on) | x=118–166, y=124–148 | P[6]... no — Google orange: P[14] body won't read as orange; use P[6] frame with P[14] cushions: base x=118–166, y=132–148 P[6], two cushion rects P[14] y=124–134, armrests P[6] 6px. Plastic wrap glint: 2 P[15] pixels that move `frame % 16` across cushions — it's STILL wrapped. |
| 9 | Plastic plant | x=172–186, y=112–148 | P[2] leaf blobs (3 stacked rects, one leaf P[10] — the "fresh" firmware update), P[6] pot y=136–148, P[8] dust pixel row on top leaf. |
| 10 | צחי (NPC sprite in art) | 12x26, feet y=150, at x=182–194 (in front of the plant/door gap) | P[15] shirt, P[1] jeans, P[6] head, P[7] hair. Lanyard: 1px P[4] V to a P[15] badge block (6x4) on chest — badge is BLANK. Coffee cup P[15] 3x4 in hand. **Animation:** head pixel-pair shifts left/right every `Math.floor(frame/12) % 2` — eternally checking both directions, choosing neither. |
| 11 | Carpet + guide line | y=145–200 | P[7] carpet, P[8] 2x2 dither rows widening toward y=200. THE LINE: a P[1] 3px guide stripe that enters from the left edge at y=170, runs right, loops back at x=250 (stepped rects), and exits left again at y=182 — a navigation line that navigates to itself. Worn P[8] patch under צחי (x=178–198, y=150–158): he's been standing there through eight reorgs. |
| 12 | Dusty "בטא" tag | on slide, x=88, y=60 | Tiny P[15] tag block (8x5) with P[8] dust pixels, 1px P[8] string to the tube. Everything here is beta. Including the dust. |

Animations (≥1 required, we have 5): flickering fluorescent, blinking "בשימוש" LED, צחי's two-way head, plastic-wrap glint on the couch, (optional) guide-line "run": shift one P[9] pixel along the stripe by `(frame*2) % 200`.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| צחי | עובד, איש, בחור, tzachi | 178,120,22,32 | "צחי. עובד גוגל ותיק. הוא מסתכל שמאלה, אז ימינה, אז שמאלה — כמו ילד שמחכה לחצות כביש שלא קיים. על הצוואר שלו תג עובד ריק לחלוטין. שמונה רה-ארגונים עבר הבן אדם. בשמיני מחקו לו את הצוות, בשביעי את הכיסא, ובשישי — את הזיכרון של מי שמחק." | דבר → onCommand (הפאזל). תן → onCommand. קח → "לקחת את צחי? אי אפשר. הוא לא משויך לאף מלאי. זו בדיוק הבעיה שלו." |
| תג של צחי | תג, באדג, תג עובד, badge | 184,132,8,8 | "התג של צחי. שם: צחי. צוות: ¯\\_(ツ)_/¯. תפקיד: TBD. תוקף: כן. זה התג הכי כן שראית בחיים — הוא פשוט מודה שאין לו מושג." | קרא → אותו look. קח → "משכת בתג. צחי זז איתו, בציות מוחלט. הוא כל כך רגיל שמזיזים אותו שהוא כבר לא שואל לאן. עזבת. זה נהיה עצוב." |
| דלת חדר הישיבות | דלת, חדר ישיבות, אינסוף-3, ישיבות, דלת כפולה | 196,58,44,87 | "דלת כפולה לחדר ישיבות 'אינסוף-3'. נורית 'בשימוש' אדומה מהבהבת מעליה. לפי לוח השיבוצים, הישיבה הנוכחית התחילה ב-2023 ותסתיים 'בהמשך'. מבפנים נשמע מישהו אומר 'נקודה מצוינת, בוא נקבע פגישת המשך'." | היכנס / פתח → onCommand (שער ה-zimun, סעיף 3+6). דפוק → "דפקת בדלת. מבפנים: 'תודה על הפידבק! נוסיף אותו לבקלוג.' הדפיקה שלך תטופל ברבעון Q3 2031." |
| מגלשה | מגלשת, צינור, מגלשה כפולה, למעלה | 48,48,48,97 | "מגלשה אדומה שיוצאת מהתקרה ומגיעה לרצפה. שלט: 'מגלשה דו-כיוונית (בטא) — קומת בית הקברות'. מגלשה שעולה למעלה. שאלת איך. השלט עונה: 'בטא'. זו התשובה של הקמפוס הזה להכול." | עלה / טפס / היכנס → goto `google_graveyard` (סעיף 6). דחוף → "דחפת את המגלשה. היא פלטה צליל 'טא-דם!' עליז ולא זזה. לפחות למישהו פה יש ביטחון עצמי." |
| שלטי כיוון | שלט, שלטים, חצים, כיוונים | 110,44,100,16 | "שני שלטי 'חדר ישיבות' תלויים מהתקרה. החצים שלהם מצביעים אחד על השני. הלכת לפי הראשון, הגעת לשני. הלכת לפי השני, חזרת לראשון. זו לא טעות שילוט — זו פילוסופיה ארגונית." | קח → "קפצת לתפוס שלט. פספסת. השלט המשיך להצביע על השלט השני, שהמשיך להצביע עליו. הם מסודרים. אתה — פחות." |
| ספה כתומה | ספה, ספת ישיבה, פינת ישיבה, כורסה | 118,122,50,26 | "ספה כתומה בפינת ישיבה מעוצבת. היא עדיין עטופה בניילון מהיצרן. אף אחד לא ישב עליה מעולם — כי בקמפוס הזה, מי שנראה לא בשימוש... מופסק. שים לב לזה. באמת." | שב → onCommand (**המוות**, סעיף 5). נקה → "העברת סמרטוט מנטלי על הניילון. אין אבק. הניילון עושה את העבודה שלך כבר עשור. פעם ראשונה שאתה מקנא בחפץ." |
| צמח פלסטיק | צמח, עציץ, פיקוס, צמח מלאכותי | 170,110,18,38 | "צמח פלסטיק. עלה אחד ירוק-בוהק יותר מהאחרים — הוחלף ב-2024 במסגרת 'רענון חוויית הצמח'. שאר הפרויקט בוטל. העלה נשאר. הוא הפיצ'ר האחרון ששרד." | קח → "משכת בעלה הבוהק. הוא מחובר בברגים, בדבק, ובחוזה תחזוקה. מישהו השקיע בעלה הזה יותר מאשר בכל גוגל+‏." השקה → "השקית צמח פלסטיק. איפשהו, אנליסט מסמן: 'מעורבות משתמש עם המוצר — עלייה של 100%'. קיבלת קידום. הצמח, לא אתה." |
| מטבחונים | מטבחון, מטבח, פתחים, דלתות מטבחון | 6,78,114,67 | "פתחי מטבחונים זהים עד האופק, לכל אחד פס צבע אחר מעל המשקוף — כחול, אדום, צהוב. אותו מטבחון בדיוק. הצבע הוא כל הזהות שנשארה להם אחרי המיזוג של המיזוג. מהאחרון עוד עולה ריח קפה. הקרוב יותר — רק ריח של נוסטלגיה." | היכנס → "נכנסת למטבחון הקרוב. ריק. המכונה מציגה: 'שירות הקפה אוחד עם המטבחון הבא'. גם במטבחון הבא כתוב ככה. זה שרשור של אכזבה עד האופק. המטבחון האמיתי — מימין, בקצה." הרח → "ריח של קפה רחוק, מהכיוון של ימין. כמו כל דבר טוב פה — הוא במטבחון אחר." |
| שטיח | רצפה, קו, פס כחול, קו כחול | 0,145,320,55 | "שטיח אפור עם קו ניווט כחול: 'עקוב אחריי אל היעד שלך!' עקבת. הקו מסתובב בקצה המסדרון וחוזר לנקודת ההתחלה. היעד שלך, מסתבר, הוא אתה. יש בזה עומק. אין בזה חדר ישיבות." | עקוב → "הלכת לאורך הקו הכחול. שלוש דקות. חזרת בדיוק לאותה נקודה, מאחורי צחי. עכשיו אתם שניים שלא יודעים לאן ללכת. הוא נראה שמח בחברה." נקה → "רפלקס של ארבעים שנה: התכופפת לקרצף את הקו. עצרת. הקו הזה הוא הדבר היחיד פה עם כיוון. גם אם הכיוון הוא מעגל." |

---

## 3. Puzzle script — onCommand logic

Score keys: `google_corridors_tzachi` = 20. **Sum = 20.** ✔

```
STATE (room-internal): tzachi_talked, tzachi_team, couch_warned
MANIFEST-LAW: flag chatima_tzachi (set here, ONLY here) · items tofes_bitul, zimun (checked, NEVER removed)

onCommand(verb, noun, api, extra):

// --- דבר עם צחי — שלב א' (הסיפור) ---
if verb=='דבר' && noun=='צחי':
    if getFlag('chatima_tzachi'):
        say('צחי מלטף את התג שלו, שעליו כתוב עכשיו בעט: "צוות תחזוקת בינה, קומה 3-".\n"בישיבת הצוות הבאה שלנו — אני אביא במבה. יש לנו ישיבות, נכון? צוות אמיתי עושה ישיבות!"\nאתה מהנהן. אין לך לב להגיד לו שהצוות כולו זה הוא.')
        return true
    if getFlag('tzachi_team'):
        say('צחי מחזיק את העט באוויר כמו לפיד אולימפי.\n"טופס! תביא טופס! יש לי צוות, יש לי עט, יש לי מוטיבציה לא מוסברת — חסר רק נייר!"\n(טופס ביטול-הפסקה מדפיסים בקיוסק שבלובי. משמאל. לא שאתה צריך אותי. אתה לגמרי צריך אותי.)')
        return true
    if !getFlag('tzachi_talked'):
        setFlag('tzachi_talked')
        say(T1a); say(T1b); say(T1c)      // ראו דיאלוג — סיפור שמונה הרה-ארגונים + הרמז
    else:
        say('צחי מסתכל שמאלה, ימינה, ואז עליך.\n"אולי אתה יודע? לאיזה צוות אני שייך? תגיד משהו. כל דבר. אני אאמין לך. אין לי ברירה — אין לי צוות שיגיד לי אחרת."\n(רמז: הוא ממש, ממש מבקש שתמציא לו צוות. תהיה בן אדם. תמציא.)')
    return true

// --- הפתרון: להמציא לצחי צוות ---
// מתקבל: 'אמור צוות' / 'אמור לצחי צוות' / 'תן לצחי צוות' / 'המצא צוות' / 'דבר צוות'
if (verb=='אמור' || verb=='תן' || verb=='המצא' || verb=='דבר') &&
   (noun=='צוות' || (noun=='צחי' && extra.raw includes 'צוות')):
    if getFlag('tzachi_team') || getFlag('chatima_tzachi'):
        say('לצחי כבר יש צוות — צוות תחזוקת בינה, קומה 3-. אל תתחיל לו רה-ארגון תשיעי. הבן אדם בקושי התאושש מהשמיני.')
        return true
    if !getFlag('tzachi_talked'):
        say('צחי ממצמץ. "צוות? של מה? של מי? אנחנו מכירים?" אולי כדאי קודם לדבר איתו כמו בן אדם. הוא לא ראה כזה מ-2024.')
        return true
    setFlag('tzachi_team')
    say(T2a); say(T2b)                    // סצנת ההמצאה — ראו דיאלוג
    if hasItem('tofes_bitul'):
        say('יש לך במקרה טופס ביטול-הפסקה ביד. איזה צירוף מקרים נוח מבחינה תסריטאית. אולי תיתן לו אותו לפני שהוא חותם על הקיר.')
    return true

// --- החתימה: תן טופס לצחי ---
if verb=='תן' && (noun=='טופס' || noun=='טופס ביטול' || noun=='טופס ביטול-הפסקה' ||
   (noun=='צחי' && extra.raw includes 'טופס')):
    if getFlag('chatima_tzachi'):
        say('צחי כבר חתם. פעמיים. פעם על הטופס ופעם על הקבלה מהשווארמה, "ליתר ביטחון". שמור על הטופס — הוועדה בחדר הישיבות תרצה לראות אותו, כנראה שלוש פעמים.')
        return true
    if !hasItem('tofes_bitul'):
        say('אין לך טופס ביטול-הפסקה. יש לך כוונות טובות, וכוונות טובות זה נחמד, אבל בגוגל לא מחתימים על כוונות — רק מפסיקים אותן. הקיוסק בלובי מדפיס. משמאל.')
        return true
    if !getFlag('tzachi_team'):
        say('הושטת לצחי את הטופס. הוא קרא, החוויר, והחזיר.\n"אני... לא יכול לחתום. חתימה זה בשם צוות. אין לי צוות. אני אפילו לא בטוח שאני בשם עצמי."\nהוא צריך שיוך ארגוני. תמציא לו אחד. כן, ככה זה עובד פה. ככה זה עבד פה תמיד.')
        return true
    // הכול מוכן: יש טופס + יש צוות
    setFlag('chatima_tzachi')
    score(20, 'google_corridors_tzachi')
    say(T3a); say(T3b)                    // סצנת החתימה — ראו דיאלוג
    return true                            // tofes_bitul נשאר במלאי — חתום. לא מסירים!

// --- הסתכל על תג של צחי לפני הפתרון: כבר מכוסה ב-hotspot look ---

// --- המוות: הספה הכתומה ---
if verb=='שב' && (noun=='ספה' || noun=='כורסה' || noun=='ספת ישיבה' || noun=='פינת ישיבה'):
    if !getFlag('couch_warned'):
        setFlag('couch_warned')
        say(NEARDEATH)                    // אזהרה — ראו סעיף 5
    else:
        die(DEATH1)                       // ראו סעיף 5
    return true

// גם 'חכה' על יד הספה נחשב חוסר-מעורבות:
if verb=='חכה' && getFlag('couch_warned'):
    die(DEATH1)
    return true
if verb=='חכה':
    setFlag('couch_warned')
    say(NEARDEATH)
    return true

// --- דלת חדר הישיבות (enter) ---
if (verb=='היכנס' || verb=='פתח') && (noun=='דלת' || noun=='חדר ישיבות' || noun=='ישיבות' || noun=='אינסוף-3'):
    if hasItem('zimun'):
        say('שלפת את הזימון לישיבה. הנורית האדומה מעל הדלת הבהבה, סרקה אותו, ונהייתה ירוקה לשנייה — כנראה הרגע הכי אופטימי בתולדות הקומה. הדלת נפתחת. מבפנים: שלושה ראשים במסך אחד.')
        goto('google_meeting')
    else:
        say('משכת בידית. הדלת לא זזה. הנורית האדומה הבהבה עליך בנזיפה.\nקול נעים מהאינטרקום: "כניסה לישיבה מחייבת זימון בתוקף. אין לך זימון? מצוין — גם לישיבה אין נושא. אבל נהלים זה נהלים."\n(זימונים, אם תשאל את האף שלך, נמצאים איפה שיש קפה. מימין.)')
    return true

// --- המגלשה (up) ---
if (verb=='עלה' || verb=='טפס' || (verb=='היכנס' && (noun=='מגלשה' || noun=='צינור'))):
    say('נכנסת למגלשה. היא, בניגוד לכל חוק פיזיקלי מוכר, מושכת אותך למעלה. שלט חולף על פניך: "תודה שבחרת בבטא!" לא בחרת. אף אחד לא בוחר בבטא. הבטא בוחרת בך.')
    goto('google_graveyard')
    return true

return false
```

Notes for the implementer:
- `chatima_tzachi` is set ONLY at the signature (form + team). `google_meeting` / `google_graveyard` read it — never touch it there.
- `tofes_bitul` and `zimun` are NEVER removed here. The form becomes "signed" narratively via the flag.
- Accept loose phrasings via `extra.raw`: `תן לצחי טופס`, `אמור לצחי צוות תחזוקת בינה`, `המצא לצחי צוות`.
- `left`/`right` are plain walking exits (`exits: { left: 'google_lobby', right: 'google_kitchen' }`); `enter` and `up` are scripted goto only.
- The kitchenette hotspot `היכנס` is flavor only — it does NOT goto (the real kitchen is the right walking exit).

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_google_corridors`):**
> מסדרונות האינסוף. פתחי מטבחונים זהים נמתחים עד נקודת המגוז, כל אחד עם פס צבע אחר — כי מיתוג זה מה שנשאר כשמורידים את התקציב, את הצוות ואת הקפה.
> באמצע המסדרון עומד עובד עם תג ריק, מסתכל שמאלה וימינה כבר — לפי השעון שלך — נצח. משמאל הלובי, מימין ריח חלוש של קפה, ולמעלה, מסיבה שאף אחד לא תיעד, מובילה מגלשה.

**T1a — צחי, שיחה ראשונה:**
> "אה! בן אדם!" צחי כמעט מפיל את הקפה. "סליחה, אני... אתה יודע אולי לאיזה כיוון זה צוות שלי?"
> אתה שואל איזה צוות. שאלה מצוינת. הפנים שלו עושות מסך כחול.

**T1b — צחי, ההיסטוריה:**
> "הייתי ב-Assistant, שאוחד עם Bard, ששונה ל-Gemini, שפוצל ל-Gemini ול-Gemini Enterprise, שמוזגו חזרה, שהועברו ל-Platforms, שפורקה, ואז... רה-ארגון שמיני. במייל היה כתוב 'תעדכן אותך המנהלת הישירה'. זה היה לפני שנתיים. אני עדיין מחכה. אני כבר לא בטוח שיש לי מנהלת. או כיוון. או קומה."

**T1c — צחי, הבקשה (הרמז):**
> הוא מרים אליך עיניים של גולדן רטריבר בורוקרטי. "אתה נראה כמו מישהו שיודע דברים. אתה יודע איפה אני עובד? תגיד לי לאיזה צוות אני שייך. אני אאמין לכל דבר. כל. דבר."
> (הוא רציני. תמציא לו צוות. משהו אמין. משהו עם קומה.)

**T2a — ההמצאה, חלק א':**
> אתה מניח יד על הכתף שלו, בסמכות של אדם שארבעים שנה חותם על טפסי משלוח בלי לקרוא.
> "צוות תחזוקת בינה. קומה מינוס שלוש." אתה אפילו לא ממצמץ. מינוס שלוש. תחזוקה. בינה. שלוש מילים שאף ועדה לא תעז לבדוק.

**T2b — ההמצאה, חלק ב':**
> צחי קופא. משהו בעיניים שלו מתחבר לרשת אחרי שנתיים אופליין.
> "תחזוקת... בינה... קומה מינוס שלוש. יש לי צוות. יש לי *צוות*!" הוא כותב את זה על התג הריק בעט רועד, ומצמיד אותו לחזה כמו מדליה. "איפה חותמים?! על מה חותמים?! אני חותם על הכול!"

**T3a — החתימה, חלק א':**
> הושטת את טופס ביטול-ההפסקה. צחי חתם עליו בתנופה של אדם שנולד מחדש: "צחי, צוות תחזוקת בינה, קומה 3-". החתימה יפהפייה. שנתיים הוא התאמן עליה בלי שיהיה לו על מה.
> ואז, לפני שהספקת להגיד תודה, הוא שלף לך מהכיס את הקבלה מהשווארמה וחתם גם עליה. "ליתר ביטחון. שלא יגידו שצוות תחזוקת בינה לא מגבה."

**T3b — החתימה, חלק ב':**
> קיבלת: חתימת צחי על טופס ביטול-ההפסקה. הטופס עכשיו רשמי ב-33%. הוועדה בחדר הישיבות תשמח להסביר לך למה 33% זה לא 100%, בשלושה קולות שונים, מאותו מסך.
> [+20 נקודות]

---

## 5. Death — הספה הכתומה (הפסקת פיצ'ר עקב מעורבות נמוכה)

**Trigger:** `שב על ספה` (or `חכה`). Avoidable twice over — the couch `look` warns ("מי שנראה לא בשימוש... מופסק"), and the FIRST sit only fires a near-death warning. The SECOND sit (or waiting after the warning) kills.

**NEARDEATH — אזהרה (api.say, first sit / first חכה):**
> התיישבת על הניילון. הוא חורק חריקה שלא נשמעה פה מעולם. איפשהו במעמקי הקמפוס, דשבורד מתעורר.
> על הקיר מולך נדלקת הקרנה עדינה: "שלום, 'יענקל'ה'! שמנו לב שהמעורבות שלך ירדה. נשמח לפידבק קצר: האם אתה עדיין בשימוש?" יש כפתור אחד. כתוב עליו "לא". היית קם עכשיו. מהר.

**DEATH1 — המוות (api.die, second sit / חכה after warning):**
> נשארת לשבת. הדשבורד הפנימי סימן אותך: פיצ'ר ותיק, אפס אינטראקציות, עלות תחזוקה — כוס קפה ליום.
> ההקרנה מתעדכנת: "לאחר בחינה מעמיקה של דפוסי השימוש, 'יענקל'ה' יופסק ב-30 בספטמבר. הדאטה שלך יועבר למוצר חלופי. אנו מודים לך על ההשתתפות בבטא של החיים."
> אתה מרגיש את עצמך מועבר לארכיון. הספה, אגב, נשארת. היא עטופה בניילון — הם חושבים שהיא עוד לא הושקה.
> ☠ אמרנו לך. בקמפוס הזה לא יושבים. בקמפוס הזה נראים עסוקים — או נקברים בקומה של המגלשה.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| left (walk off x≤10) | `google_lobby` | walking exit (engine `exits.left`) | No condition. |
| right (walk off x≥310) | `google_kitchen` | walking exit (engine `exits.right`) | No condition. |
| enter | `google_meeting` | scripted (`היכנס`/`פתח` דלת → `api.goto`) | Requires `hasItem('zimun')`. Without it — the intercom blocks and hints right (the kitchen). `zimun` is NOT consumed. |
| up | `google_graveyard` | scripted (`עלה`/`טפס`/`היכנס מגלשה` → `api.goto`) | No condition. The beta slide that goes up. Flavor line, then goto. |
| down | — | none | There is no down. Officially. קומה מינוס שלוש קיימת רק על התג של צחי. |

Engine block: `floor: { y1: 145, y2: 192 }`, `hero: true`, `music: 'google'`, `exits: { left: 'google_lobby', right: 'google_kitchen' }` (enter/up handled in onCommand via goto).
