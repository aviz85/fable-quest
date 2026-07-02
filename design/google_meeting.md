# DESIGN — google_meeting ("חדר הישיבות אינסוף-3")

Act: google · Music: google · Score total: **20** (google_meeting_tofes 5 + google_meeting_pnia 5 + google_meeting_ishur 10)
Exits: down → `google_corridors` (walk off bottom edge). Entry is scripted FROM `google_corridors` (gated there by `zimun`); this room keeps a defensive bounce.
Flags owned: `vaada_ishur` (+ `visited_google_meeting`, room-internal `gm_tofes_given`, `gm_pnia_shown`) · Items given here: none · Items needed: `zimun` (gate, NOT consumed), `tofes_bitul` (checked, NOT consumed — graveyard needs it), `mispar_pnia` (checked, NOT consumed), `chatif` (**consumed**).
NPC: ועדת שינוי-השם — שלושה ראשים במסך אחד. Death: לשבת בראש השולחן.

---

## 1. Layout — 320x200 composition plan

Corporate conference room, aggressively white with primary-color accents, hosting a meeting that entered its sixth hour sometime in 2023. Floor band y=145–200 (hero 10x28; table top at y≈124 hits his chest — conference scale, correct). Light: flat white, one guilty red blink.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Ceiling | 0,0 → 320x22 | P[15] slab, P[7] shadow seam y=20–22. Two recessed light strips (P[7] housings 50x3 at x=70, x=200 with inner P[15] rows). |
| 2 | Recording light | x=294–302, y=6–12 | P[0] housing 8x6, inner 4x3 lamp: P[4] when `frame % 12 < 6`, else P[8]. Recording since 2023. Nobody has read permissions. |
| 3 | Back wall | 0,22 → 320x123 (to y=145) | P[15] with a full-width primary stripe: P[1] band y=24–28, then P[4] 1px, P[14] 1px (Google trim). P[7] baseboard y=140–145. |
| 4 | Giant videocall screen | x=96–224, y=30–92 | P[0] frame 3px, P[8] interior. Three video squares 36x28 at y=48–76, x=102 / x=142 / x=182, 4px gaps. Each square: P[9] background, head = P[6] face blob 12x10 + P[0] hair slab 12x3 + P[7] shoulders 20x6. Middle square FREEZES: when `frame % 50 < 22` overlay it with 4–5 scattered P[8]/P[7] pixelation blocks (6x4) and a P[15] spinner pixel that orbits a 4px square; then it "wakes". Above the squares, y=36–44: a P[10] block-text strip (call title) with a blinking P[4] dot (live). |
| 5 | Committee name plaque | x=112–208, y=96–114 | P[14] board, P[0] frame 1px, mounted under the screen. Inside: two rows of P[0] block-text — and the TOP ROW CHANGES: 4 different block-patterns cycled by `Math.floor(frame/35) % 4` (the committee renaming itself in realtime). Bottom row constant (the word "ועדת" never changes; only what follows). A tiny P[8] pile of discarded plaque-slats leans below at x=200–210, y=114–140. |
| 6 | Glass board | x=14–86, y=38–104 | P[11] glass with P[15] highlight streak (stepped 1px diagonal), P[7] frame 3px. On it: a P[8] flowchart of 5 boxes half-erased — two boxes solid, three boxes only 1px ghost outlines, one P[4] arrow pointing off the board into nothing. Marker tray P[7] at bottom with one dead P[4] marker. |
| 7 | Window to courtyard | x=238–306, y=36–104 | P[7] frame 3px, cross mullion. View: P[9] sky (top half), P[3] lawn (bottom), and an abandoned P[12] slide — stepped diagonal rects from y=60 down to the lawn — ending in a P[7] puddle of dust. A single P[15] "wheee" ghost pixel slides down it once every ~6s: `frame % 60` maps to position; otherwise invisible. |
| 8 | Side table + sandwich tray | x=252–306, y=118–145 | P[6] table slab y=118–124, P[7] legs to y=145. On it: P[7] tray 36x5 at y=113–118 containing NOTHING except 5–6 P[6] crumb pixels and one P[15] crumpled napkin blob. The saddest still life in the campus. |
| 9 | Elliptical conference table | core x=84–236, y=124–152 | Fake ellipse with stepped rects: y=124–128 x=104–216, y=128–132 x=92–228, y=132–146 x=84–236, y=146–150 x=92–228, y=150–152 x=104–216. Surface P[15], P[7] rim 1px on the lower steps, P[8] shadow band y=152–156. |
| 10 | Spider phone | x=150–170, y=132–142 | P[0] triangular body faked: center slab 12x5 + three 3x2 leg nubs. A P[10] LED blinks `frame % 8 < 4` — it is ON A CALL. It has been on a call longer than some employees' tenures. |
| 11 | Head chair (LEFT end of table) | x=60–82, y=112–156 | The Chair. Taller back: P[0] slab 18x28 y=112–140, P[8] arm nubs, P[0] star base y=152–156. Positioned at the table's head. Ominously clean. Nobody has survived it. |
| 12 | Regular chairs | backs at x=110/140/196/226, y=110–124 (behind table, 12x14 P[8] slabs); two front chairs x=118–134 / x=188–204, y=150–172 (P[8] back + seat + P[0] base) | All empty. The attendees are all on the screen. The chairs are for the org chart's self-esteem. |
| 13 | Floor | y=145–200 | P[7] carpet, P[8] seam lines at y=162, y=182 (perspective) + verticals every 40px below y=162. A P[1] accent carpet-tile x=40–56, y=170–178. P[8] scuff arc around the table — the pacing route of presenters past. |
| 14 | Bottom exit (down) | x=120–200, y=196–200 | P[8] threshold strip at the very bottom edge — the double door back to the corridors is "behind the camera". Hero walks off the bottom. |

Animations (≥1 required, we have 6): recording light, freezing/waking video square, cycling committee name, live-call dot, sliding ghost on the courtyard slide, spider-phone LED.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| ועדה | הוועדה, מסך, ראשים, שלושה ראשים, ועדת שינוי השם, חברי הוועדה | 96,30,128,62 | "שלושה ראשים בשיחת וידאו אחת, בשעה השישית של ישיבה שהתחילה ב-2023. הראש האמצעי קופא כל כמה שניות — אף אחד לא בטוח אם זה החיבור או מנגנון הגנה נפשי. שלושתם מדברים בשם הוועדה, כל אחד בשם אחר שלה." | דבר → onCommand (סעיף 3, לפי שלב). תן → onCommand (הפאזל). |
| שלט הוועדה | שלט, שם הוועדה, לוח שם, פלאק | 112,96,96,18 | "שלט השם של הוועדה. הוא מתחלף מולך בזמן אמת: 'ועדת ההמתה' — 'ועדת מחזור החדשנות' — 'צוות Sunset Excellence' — 'המחלקה לאופטימיזציית מסעות משתמש'. מתחת לשלט, ערימת שלטים קודמים. הם לא נזרקים. הם מופסקים." | קח → "לקחת את השלט? עד שתגיע לדלת הוא כבר יהיה שלט של ועדה אחרת. אי אפשר לגנוב דבר שלא מסכים להיות עצמו." |
| טלפון | טלפון עכביש, עכביש, טלפון ועידה | 150,132,20,10 | "טלפון ועידה בצורת עכביש שחור, בשיחה פעילה מאז לפני שהגעת לקמפוס. הנורית הירוקה מהבהבת בקצב של לב שוויתר. בקצה השני — המוקד הבין-תאגידי, כנראה. הם עדיין בהמתנה. גם הטלפון." | לחץ / השתמש → כמעט-מוות (סעיף 5, הגאג). קח → "ניתקת אותו — כאילו. היד עצרה לבד. לנתק שיחה שממתינה מ-2023 זה לא ניקיון, זה רצח בירוקרטי, ואתה עם מגב, לא עם מניע." |
| מגש כריכים | מגש, כריכים, פירורים, אוכל | 252,110,54,14 | "מגש הכיבוד. ריק. נשארו שישה פירורים ומפית מקומטת שמישהו סחט עד הסוף. הישיבה בשעה השישית שלה, והראשים שעל המסך מסתכלים על המגש הזה כמו שאתה מסתכל על הפיקדון שלך: בגעגוע ובלי סיכוי." | קח → "אספת פירור. הראש השמאלי על המסך עקב אחרי היד שלך בעיניים. הנחת את הפירור בחזרה. לאט." אכול → "לאכול את הפירורים של ועדה רעבה, מול המצלמה, בזמן הקלטה? יש דרכים פשוטות יותר להפסיק להתקיים בקמפוס הזה." |
| לוח זכוכית | לוח, לוח מחיק, דיאגרמה, תרשים, זכוכית | 14,38,72,66 | "לוח זכוכית עם תרשים זרימה שנמחק באמצע. שתי משבצות שרדו: 'שלב 1: התנעה' ו'שלב 4: סיום מוצלח'. שלבים 2 ו-3 נמחקו, וחץ אדום בודד מצביע אל מחוץ ללוח, אל הקיר. זו התוכנית העסקית הכי כנה שראית בחיים." | קרא → אותו look. נקה / מחק → "העברת אצבע על הזכוכית. הראש הימני על המסך אמר 'רגע, מי עורך את המסמך?'. קפאת. הם רואים הכול. אל תיגע בתרשים של אנשים שיש להם ועדה." |
| חלון | מגלשה, חצר, נוף | 238,36,68,68 | "חלון אל חצר פנימית: דשא מושלם, שמש נעימה, ומגלשה צהובה נטושה שמובילה מקומה 2 אל ערימת אבק. פעם גלשו בה עובדים צוהלים בין ישיבות. עכשיו רק הרוח, ופעם בכמה זמן — משהו שאתה מעדיף להאמין שהוא שקית." | פתח → "החלון נעול מטעמי 'רווחת עובדים'. הלוגיקה: עובד שלא יכול לצאת הוא עובד שנשאר. אין על מה לערער — הוועדה שאישרה את זה כבר החליפה שם פעמיים." |
| כיסא היושב-ראש | ראש השולחן, כיסא גדול, כס, כיסא מנהלים | 60,112,22,44 | "הכיסא שבראש השולחן. גבוה, שחור, נקי להפליא — נקי כמו מקום שאף אחד לא יצא ממנו בחיים. על המשענת תווית קטנה: 'שמור ליו\"ר'. אין יו\"ר. הישיבה מחכה שמישהו יטעה." | שב → **מוות** (סעיף 5). קח → "לקחת את כס היושב-ראש? הוא לוקח אנשים, לא להפך. תשאיר אותו רעב." |
| כיסאות | כיסא, כיסא רגיל, מושבים | 108,110,124,62 | "כיסאות ריקים סביב שולחן מלא. כל המשתתפים על המסך. הכיסאות כאן בשביל התקן — לכל ראש בוועדה יש כיסא פיזי שמור, למקרה שיחליט להתגשם. זה לא קרה מאז הרבעון שבו ביטלו את המשרדים." | שב → "התיישבת על כיסא צדדי. שלושת הראשים הביטו בך בו-זמנית ורשמו משהו. קמת. יש דברים שעדיף לעשות בעמידה, וישיבה בישיבה היא אחד מהם." |
| נורית הקלטה | נורית, אור אדום, הקלטה, מצלמה | 294,6,8,6 | "נורית הקלטה אדומה. הישיבה הזאת מוקלטת ברציפות משנת 2023. ההקלטה שמורה בענן, בתיקייה שאין לאף אחד הרשאות אליה, כולל למי שיצר אותה. איפשהו שם נמצאת גם ההודאה של מי ששבר את המכונה קפה בקומה 4. לנצח." | כבה → "כיבית את ההקלט— לא. לא כיבית. אין כפתור. יש רק נורית, ענן, ותיקייה שתשרוד את כולנו." |

---

## 3. Puzzle script — onCommand logic

Score keys: `google_meeting_tofes` = 5, `google_meeting_pnia` = 5, `google_meeting_ishur` = 10. **Sum = 20.** ✔

```
STATE: flags gm_tofes_given, gm_pnia_shown (room-internal staging)
MANIFEST-LAW: flag vaada_ishur (set here, ONLY here) ·
  zimun/tofes_bitul/mispar_pnia checked NEVER removed · chatif REMOVED here ·
  exits: down→google_corridors only

onEnter(api):
    // defensive gate — normally corridors blocks entry without zimun
    if !hasItem('zimun'):
        say('קול מהרמקולים: "לא נמצא זימון תואם. נקבעה עבורך ישיבה על קבלת זימונים. היא בוטלה. להתראות."\nהדלת פולטת אותך החוצה בנימוס תאגידי.')
        goto('google_corridors'); return
    if !getFlag('visited_google_meeting'):
        setFlag('visited_google_meeting')
        say(ENTER1); say(ENTER2)        // סעיף 4

onCommand(verb, noun, api, extra):

COMMITTEE = noun in ['ועדה','הוועדה','מסך','ראשים','שלושה ראשים','ועדת שינוי השם','חברי הוועדה']

// --- שלב 1: תן טופס לוועדה ---
if verb=='תן' && (noun=='טופס' || noun=='טופס ביטול' || (COMMITTEE && extra.raw includes 'טופס')):
    if !hasItem('tofes_bitul'):
        say('אין לך טופס לתת. הראש השמאלי מציע לקבוע ישיבה על היעדר הטופס. סירבת בנימוס — כלומר ברחת עם העיניים.\n(טופס ביטול-הפסקה מנפיקים בקיוסק שבלובי.)')
        return true
    if getFlag('gm_tofes_given'):
        say('הטופס כבר על השולחן, כלומר מוחזק מול המצלמה. הוועדה מחכה. אתה יודע למה.')
        return true
    setFlag('gm_tofes_given')
    score(5, 'google_meeting_tofes')
    say(TOFES1); say(TOFES2)            // סעיף 4 — הוועדה דורשת מספר פנייה
    return true

// --- שלב 2: הראה / תן מספר פנייה ---
if (verb=='תן' || verb=='הראה' || verb=='הצג') && (noun=='מספר פנייה' || noun=='פתק' || noun=='מספר' || (COMMITTEE && extra.raw includes 'פנייה')):
    if !getFlag('gm_tofes_given'):
        say('שלושת הראשים מביטים בפתק ואז זה בזה. "מספר פנייה... לְמה בדיוק?" אין בקשה על השולחן. קודם טופס, אחר כך מספר. זו בירוקרטיה, לא ג\'אז.')
        return true
    if !hasItem('mispar_pnia'):
        say('אין לך מספר פנייה. הראש האמצעי קופא — הפעם, אתה חושד, בכוונה.\n(מספר פנייה משיגים מהמוקד הבין-תאגידי. הטלפון בבית הקפה. כן, עד שם. כן, שווה.)')
        return true
    if getFlag('gm_pnia_shown'):
        say('הם ראו את המספר. הם רשמו אותו. הם צילמו אותו. אחד מהם מסגר אותו נפשית. השלב הבא הוא לא נייר.')
        return true
    setFlag('gm_pnia_shown')
    score(5, 'google_meeting_pnia')
    say(PNIA1); say(PNIA2)              // סעיף 4 — כבוד, ואז רעב
    return true

// --- שלב 3: תן חטיף → האישור ---
if verb=='תן' && (noun=='חטיף' || (COMMITTEE && extra.raw includes 'חטיף')):
    if !hasItem('chatif'):
        say('אין לך חטיף. הראשים שמעו את המילה "חטיף" ונשענו קדימה בו-זמנית. עכשיו אכזבת ועדה רעבה. יש טעויות שגם רה-ארגון לא מוחק.\n(במטבחון האחרון, אולי, שרד אחד.)')
        return true
    if !getFlag('gm_pnia_shown'):
        say('הושטת חטיף. הראש הימני, בקושי: "אנחנו... בזמן דיון... לא מקבלים... כיבוד... מגורם... ללא מספר פנייה." המשמעת שלהם שוברת אותך יותר מהרעב שלהם.')
        return true
    removeItem('chatif')
    setFlag('vaada_ishur')
    score(10, 'google_meeting_ishur')
    say(ISHUR1); say(ISHUR2); say(ISHUR3)   // סעיף 4 — האישור המשולש
    return true

// --- דבר עם הוועדה (רמזים לפי שלב) ---
if verb=='דבר' && COMMITTEE:
    if getFlag('vaada_ishur'):
        say('"הבקשה אושרה. הישיבה ממשיכה." — "בנושא הבא: שינוי שם הוועדה." — "מתנגדים? אין. נמנעים? כולם."\nהם כבר לא רואים אותך. זו ברכה. לך.')
        return true
    if getFlag('gm_pnia_shown'):
        say('הראש השמאלי, בקול של אדם בשעה השישית: "אנחנו... דנים... בבקשתך..." העיניים שלו על מגש הכריכים הריק. שלושתם. תשעים אחוז מהוועדה חושבת כרגע על פחמימות. עזור להם לחשוב עליך.')
        return true
    if getFlag('gm_tofes_given'):
        say('"הטופס התקבל," אומר הראש הימני, "אך ללא מספר פנייה מהמוקד הבין-תאגידי הוא נייר. נייר יפה. אבל נייר." הראש האמצעי קופא בהנהון, לנצח.')
        return true
    say('"ברוך הבא לישיבה," אומרים שלושתם, כל אחד בשם ועדה אחרת. "יש לך נושא? הנושא דורש טופס. לטופס יש תור. לתור יש ועדה. זה אנחנו. תתחיל."')
    return true

// --- הצג זימון (פלייבור) ---
if (verb=='הראה' || verb=='הצג' || verb=='תן') && noun=='זימון':
    say('הראית את הזימון. הראש השמאלי בדק אותו פעמיים: "זימון... תקין? עם משתתף שבאמת הגיע?!"\nשלושתם רשמו לפניהם לפתוח בחקירה. אל תדאג — היא תוקצה לוועדה שתוקם, תשונה, ותופסק.')
    return true

// --- מוות: לשבת בראש השולחן ---
if verb=='שב' && (noun=='כיסא היושב-ראש' || noun=='ראש השולחן' || noun=='כיסא גדול' || noun=='כס' || noun=='כיסא מנהלים'):
    die(DEATH1)     // סעיף 5
    return true

// --- כמעט-מוות: הטלפון ---
if (verb=='לחץ' || verb=='השתמש') && (noun=='טלפון' || noun=='טלפון עכביש' || noun=='עכביש'):
    say(PHONE1)     // סעיף 5 — הגאג
    return true

// --- יציאה מפורשת ---
if verb=='צא' || (verb=='פתח' && noun=='דלת') || (verb=='לך' && extra.raw includes 'למטה'):
    goto('google_corridors')
    return true

return false
```

Notes for the implementer:
- `vaada_ishur` is set ONLY at the chatif hand-off. `google_graveyard` reads it for the resurrection ritual — never set it early, never anywhere else.
- `tofes_bitul` is NEVER removed here — the graveyard consumes it later (`removeItem` happens THERE). `mispar_pnia` and `zimun` are never removed either. Only `chatif` is consumed, here.
- The three stages are strictly ordered (tofes → pnia → chatif); each out-of-order attempt returns an in-character redirect, so the player is never stuck silent.
- Exact ids: `zimun`, `tofes_bitul`, `mispar_pnia`, `chatif`, `vaada_ishur`, `visited_google_meeting`; score keys `google_meeting_tofes`(5) + `google_meeting_pnia`(5) + `google_meeting_ishur`(10) = 20.

---

## 4. Dialogue

**ENTER1 — first entry (onEnter, once):**
> "חדר הישיבות אינסוף-3. על המסך הענק — שלושה ראשים בשעה השישית של ישיבה שהתחילה, לפי לוח השיבוצים, ב-2023.\nמגש הכריכים ריק. נורית ההקלטה אדומה. התקווה — בסטטוס 'בהמשך'."

**ENTER2 — the committee notices you:**
> "שלושת הראשים מסתובבים אליך בו-זמנית. \"משתתף! פיזי! עם זימון!\" — הראש האמצעי קופא מרוב התרגשות, פשוטו כמשמעו.\nהראש השמאלי מכריז: \"בשם ועדת ההמתה— סליחה, ועדת מחזור החדשנות— סליחה. בשם מי שאנחנו כרגע: שב. כלומר, עמוד. כלומר, דבר.\""

**TOFES1 — the form lands:**
> "הרמת את טופס ביטול-ההפסקה מול המצלמה. שקט. הראש הימני מרכיב משקפיים שלא היו לו קודם.\n\"טופס 704-ב... חתום... על ידי צוות תחזוקת בינה, קומה מינוס שלוש...\" הוא מביט בעמיתיו. \"זה אמיתי. מישהו מילא אותו עד הסוף.\""

**TOFES2 — the catch:**
> "\"אולם,\" — והמילה 'אולם' נאמרת כאן כמו גזר דין — \"החייאת פיצ'ר מדרגת קבורה 2019 דורשת מספר פנייה מהמוקד הבין-תאגידי.\"\nהראש השמאלי מוסיף בלחש: \"אף אחד לא השיג כזה מאז המלחמה. זמן ההמתנה שם נמדד ברבעונים.\" הם מחכים שתוותר. כולם מוותרים בשלב הזה."

**PNIA1 — the pnia number lands:**
> "הנחת את הפתק עם מספר הפנייה מול העדשה. שלושת הראשים רוכנים קדימה עד שהמצח שלהם ממלא את המסך.\n\"מספר... פנייה... אמיתי... מהמוקד...\" הראש הימני מסיר את המשקפיים. \"אדוני. חיכית בתור של המוקד הבין-תאגידי. אנחנו... אנחנו מצדיעים.\""

**PNIA2 — but hunger:**
> "\"הבקשה כשרה לאישור,\" אומר הראש השמאלי, והקול שלו נשבר, \"אבל אנחנו בשעה השישית של הישיבה. המגש ריק משעה שתיים. לפי נוהל רווחה 12-ג, ועדה רעבה אינה כשירה להצביע.\"\nשלושה זוגות עיניים נודדות אל מגש הפירורים, ואז אליך. אתה מכיר את המבט הזה. זה המבט שלך מול תלוש המשכורת."

**ISHUR1 — the chatif:**
> "הוצאת את החטיף האחרון בקמפוס והרמת אותו מול המצלמה. הראש האמצעי, שהיה קפוא, מפשיר בבת אחת.\nהנחת אותו על מגש צד, והמסך התקרב — אל תשאל איך, גם אתה לא שאלת — והחטיף איננו. פירורים נשמעים משלושה מיקרופונים בו-זמנית."

**ISHUR2 — the triple approval:**
> "\"בשם ועדת ההמתה — מאושר.\"\n\"בשם ועדת מחזור החדשנות — מאושר.\"\n\"בשם צוות Sunset Excellence, לשעבר המחלקה לאופטימיזציית מסעות משתמש — מאושר, ותביא עוד חטיף בפעם הבאה.\"\nפה-אחד. שלושה שמות, ועדה אחת, אפס התנגדויות. דברים כאלה לא קורים כאן. לעולם."

**ISHUR3 — the punchline:**
> "חותמת דיגיטלית נוחתת על הטופס שלך בקול 'דינג' חגיגי: 'מאושר ע\"י הוועדה (שם הוועדה נתון לשינוי).'\nהטופס המאושר בידך. עכשיו נשאר רק בית הקברות של המוצרים — כי בגוגל, גם כשמאשרים לך חיים חדשים, קודם עוברים דרך המתים.\n(עודכן: טופס ביטול-הפסקה — מאושר!)"

---

## 5. Death(s)

**DEATH1 — לשבת בראש השולחן (מוות זמין, נמנע לחלוטין):**
> "התיישבת בראש השולחן. שלושת הראשים קמים — כלומר, המצלמות שלהם מתרוממות — ומריעים.\n\"יש לנו יושב-ראש!\" בום. אתה ממונה. פרוטוקול נפתח. סדר היום נטען: 847 סעיפים, כולם 'המשך דיון'.\nאתה מנסה לקום. אי אפשר. יושב-ראש שקם לפני סוף הישיבה — והישיבה, כזכור, לא מסתיימת.\nנמצאת מיובש אחרי שלושה רבעונים, עדיין מסכם נקודות פעולה. הוועדה שלחה זר. הוא בוטל בדרך.\n☠ [שחזר] — התווית אמרה 'שמור ליו\"ר'. שום דבר בקמפוס הזה לא שמור בשבילך, יענקל'ה. חוץ מהמגב."

**PHONE1 — כמעט-מוות: ללחוץ על טלפון העכביש (הגאג):**
> "לחצת על הכפתור הירוק. מהרמקול: \"שיחתך חשובה לנו. מיקומך בתור: 4,095.\"\nהתקדמת מקום אחד בתור של המוקד הבין-תאגידי. מישהו, איפשהו, בדיוק מת מזקנה בעמדה 4,096.\nשלושת הראשים צורחים בו-זמנית: \"אל תיגע! שלוש שנים אנחנו שומרים על המקום הזה בתור!!\"\nהסרת את היד. לאט. יש דברים קדושים גם בגוגל, ותור למוקד הוא הקדוש שבהם."

---

## 6. Exits behavior

| Exit | Type | Target | Condition / text |
|---|---|---|---|
| down (edge walk, bottom of screen) | walking, per manifest | `google_corridors` | Always open. Optional flavor when leaving mid-meeting (before `vaada_ishur`): "יצאת באמצע ישיבה. אף אחד לא שם לב. אף אחד אף פעם לא שם לב. זה הפיצ'ר הכי יציב של ישיבות." |
| צא / פתח דלת / לך למטה | scripted | `google_corridors` | `api.goto('google_corridors')` — same as walking off. |
| entry INTO this room | scripted from corridors | — | Gated by `zimun` in `google_corridors`; this room's onEnter keeps a defensive bounce (see script) so a teleporting debugger without zimun still gets ejected in character. |
| left / right / up / enter | none | — | No exits. 'קפוץ מהחלון' → "החלון נעול, וגם אם לא — למגלשה שבחוץ יש תור המתנה. כן, גם לה. יש קיוסק." |

Implementer checklist: floor `{ y1: 150, y2: 192 }` · `exits: { down: 'google_corridors' }` · `music: 'google'` · onEnter: zimun bounce + `visited_google_meeting` once · `chatif` is the ONLY item removed · `vaada_ishur` set exactly once at stage 3.
