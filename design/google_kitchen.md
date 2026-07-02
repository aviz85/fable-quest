# DESIGN — google_kitchen ("המטבחון האחרון")

Act: google · Music: google · Score total: **15** (google_kitchen_snack 5 + google_kitchen_invite 10)
Exits: left → `google_corridors` (walk). No scripted exits.
Flags owned: `visited_google_kitchen` (+ room-internal `gk_laptop_seen`) · Items given here: `chatif`, `zimun` · Items needed: none.
NPC: none (הלפטופ והמכונה מדברים במקומם). Death: שתיית "Google Juice — beta".

---

## 1. Layout — 320x200 composition plan

The last functioning micro-kitchen on campus. Aggressively cheerful primary colors over creeping decay. Floor band y=145–200 (hero 10x28: counter top at y≈110 hits his waist — kitchen scale, correct). Light: flat fluorescent, one warm candle glow.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Ceiling | 0,0 → 320x24 | P[15] slab, P[7] shadow seam y=22–24. Two fluorescent fixtures (P[7] housings 40x4 at x=60, x=210) with P[15] light strips. The right fixture flickers: `frame % 23 < 2` → P[7] (facilities ticket open since 2022). |
| 2 | Back wall | 0,24 → 320x121 (to y=145) | Bold Google-yellow P[14]. P[6] baseboard strip y=140–145. A horizontal white accent stripe P[15] y=26–30 running the full width, interrupted by objects. |
| 3 | Whiteboard (dead product) | x=104–180, y=28–56 | P[15] board, P[7] frame 2px, P[8] marker tray at bottom. On it: a P[1] flowchart of 4 boxes (6x5) connected by P[8] 1px lines — and a huge P[4] X over the whole diagram (2px crossed rects). Bottom-right corner: tiny P[2] block-scribble ("RIP"). |
| 4 | Snack shelves | x=108–176, y=60–106 | Two P[15] shelves (y=78, y=104, 3px thick, P[7] underside shadow). Top shelf: three bowls — P[4], P[2], P[1] hemispheres faked as stacked rects, ALL EMPTY (P[8] interior showing). Bottom shelf: one P[14] bowl at x=132–156 with a SINGLE snack: a 5x4 P[6] blob with a P[15] glint pixel that blinks `frame % 14 < 7`. The last snack in history glitters. |
| 5 | Counter + coffee machine | counter x=8–100, top y=110–116, body y=116–145 | Counter: P[15] slab, P[7] front shading, P[0] thin top edge. Coffee machine x=20–56, y=68–110: P[7] body, P[0] top vent, P[11] chrome drip zone, P[0] screen x=26–50, y=76–88 with P[10] block-text row and below it a P[8] progress-bar groove x=27–49, y=84–87 with a P[10] fill that is FROZEN at 12px wide. Once every ~4s (`frame % 40 == 0`) the fill flashes 13px for one frame, then back to 12. It is lying. |
| 6 | Memorial sign + candle | sign x=62–96, y=76–100 (wall); candle on counter x=76–84, y=98–110 | Sign: P[15] plaque, P[0] frame 1px, three rows of P[0] block-text ("שורד מ-2019"). Candle: P[15] wax cylinder 4x10 on the counter, flame = 2x3 that alternates P[14]/P[12] every `frame % 6 < 3`. A tiny P[8] wax puddle at its base. |
| 7 | Bar table + laptop | table top x=182–242, y=110–114; single leg P[8] x=209–215, y=114–145 | Round-ish high table faked with a P[6] top slab + P[7] rim. Laptop x=196–230: base P[7] y=106–110, screen P[0] frame x=198–228, y=84–106 with P[9] glow interior and a 3x4 grid of P[15] calendar blocks (6x4 each), one block blinking P[12] `frame % 10 < 5` — a meeting reminder for a person who left in 2023. |
| 8 | Spinning chair | x=164–184, y=112–145 | Bar stool: P[0] seat slab 16x4 at y=112, P[8] stem, P[0] star base at y=141–145. The seat "spins" alone: a P[7] highlight pixel-pair orbits the seat edge, position = `Math.floor(frame/5) % 4` (left/front/right/back). Nobody is sitting on it. It doesn't care. |
| 9 | Glass fridge | x=248–300, y=58–145 | P[7] frame 3px, P[11] glass panels with P[15] highlight streaks (1px diagonals faked as stepped rects). Inside, 3 shelves (P[7] 2px): rows of bottles — P[2], P[1], P[4] 4x10 rects. Center shelf: ONE P[10] bottle with a P[15] halo pixel that pulses `frame % 8 < 4` and a P[0] tag below it (the "beta" label). Door handle P[8] vertical bar x=294–297. |
| 10 | Recycling bins (foreground) | x=6–66, y=152–190 | Four bins, 13x30 each with 2px gaps: P[1], P[2], P[14], P[4]. Each has a P[15] label block. From ALL FOUR the exact same trash overflows: identical P[8] crumpled blobs + one P[15] paper corner each. Four streams, one truck. |
| 11 | Floor | y=145–200 | P[15] tile base, P[7] grout lines every 32px vertical + at y=162, y=180 (perspective widening). A playful P[2] accent tile at x=128–144, y=168–176 (some designer's last stand). P[7] scuff trail from the left exit to the snack shelves — the pilgrimage route. |
| 12 | Left exit | x=0–6, y=60–145 | Open doorway sliver: P[8] dark gap with a P[7] jamb — into the infinite corridors. |

Animations (≥1 required, we have 6): flickering fixture, frozen-then-lying progress bar, glinting last snack, candle flame, orbiting chair highlight, pulsing beta bottle.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| חטיף | חטיפים, קערה, קערת חטיפים, קערות | 108,60,68,46 | "שלוש קערות ריקות ואחת עם חטיף בודד. החטיף האחרון בקערה. כלומר במטבחון. כלומר בקמפוס. כלומר, סטטיסטית, בהיסטוריה. הוא נוצץ. חטיפים לא אמורים לנצוץ, אבל נדירות עושה דברים מוזרים לפחמימות." | קח → onCommand (סעיף 3). אכול → "לאכול אותו?! כאן?! בלי טופס טעימה, בלי ועדת אלרגנים, בלי עדים?! קח אותו קודם. תחליט אחר כך. ככה עושים אחריות." |
| לפטופ | מחשב, מחשב נייד, יומן, מסך | 196,84,34,26 | "לפטופ פתוח ודולק, מחובר לחשבון של עובד בשם 'אריאל ל.' שעזב ב-2023. אף אחד לא כיבה אותו כי כיבוי דורש טיקט. על המסך: יומן גוגל, פתוח, חשוף, מהבהב. שער לממלכה." | השתמש / פתח / קרא / לחץ → onCommand (הפאזל, סעיף 3). קח → "לקחת לפטופ של גוגל מקמפוס גוגל? יש לזה שם משפטי, ושמו לא 'פיקדון'." |
| מכונת קפה | קפה, מכונה, מכונת אספרסו | 20,68,36,42 | "מכונת קפה בשווי של רכב משפחתי. על המסך: 'עדכון גרסה 4 מתוך 512'. פס ההתקדמות לא זז מאז שנכנסת. פעם בכמה שניות הוא מזייף פיקסל של תקווה וחוזר בו. אתה מזהה את הטכניקה — גם אתה עושה את זה עם הרצפה כשהבוס מסתכל." | השתמש / לחץ → "לחצת על 'קפה'. המכונה השיבה: 'הפעולה תתאפשר לאחר סיום העדכון.' 508 גרסאות נותרו. יש לך קפה בוץ בעולם שבו הדברים עוד עובדים — שם, בבית." קח → "היא מוברגת לדלפק ומחוברת לענן. אם תזיז אותה, שלושה דשבורדים בקליפורניה יצבעו באדום ואף אחד לא יסתכל עליהם." |
| מקרר | מקרר זכוכית, משקאות, בקבוקים | 248,58,52,87 | "מקרר זכוכית מלא משקאות בצבעי יסוד. במרכז, על כן תצוגה, זוהר בקבוק ירקרק: 'Google Juice — beta'. תווית קטנה: 'הפידבק שלך חשוב לנו. שורד? ספר לנו איך.'" | פתח → "פתחת את דלת הזכוכית. נשבה צינה, והבקבוק הירקרק זהר קצת יותר חזק. כאילו שמח לראות אותך. משקאות לא אמורים לשמוח לראות אותך." קח → "לקחת בקבוק ביד. הוא חמים מבפנים וקר מבחוץ, מה שמפר לפחות שני חוקי תרמודינמיקה. החזרת אותו. יפה. עכשיו רק אל תשתה ממנו." |
| מיץ | Google Juice, ג'וס, משקה, משקה ניסיוני, בקבוק | 264,88,14,20 | "'Google Juice — beta'. גרסה 0.3. רשימת רכיבים: מים, סוכר, ו'טעם (בפיתוח)'. תוקף: 'יוגדר בהמשך'. הבטן שלך שולחת לך התראת לוח שנה: 'לא'." | שתה / אכול / טעם → **מוות** (סעיף 5). הרח → "הרחת. זה מריח כמו סטארטאפ ברבעון השלישי שלו: מתקתק, מבטיח, ועם תחתית חמוצה." |
| כיסא | כיסא מסתובב, שרפרף, כיסא בר | 164,112,20,33 | "כיסא בר שמסתובב לאט, לבד, כבר שנים. או שיש רוח, או שהוא מריץ תהליך ברקע. אתה עובד עם רהיטים ארבעים שנה. זה לא רוח." | שב → כמעט-מוות (סעיף 5, הגאג). דחוף → "נתת לו סיבוב. הוא הודה לך בחריקה קטנה והמשיך בקצב שלו. יש לו קצב שלו. תכבד." |
| לוח מחיק | לוח, דיאגרמה, תרשים | 104,28,76,28 | "דיאגרמת ארכיטקטורה של מוצר שלם — מחוקה בעצלנות ומעליה איקס אדום ענק. בפינה מישהו כתב בקטן 'נ.ב. זה היה עובד'. מתחת, בכתב אחר: 'כולם אומרים את זה'." | קרא → אותו look. נקה / מחק → "הרמת יד למחוק — ועצרת. זו לא דיאגרמה. זו מצבה. אב בית לא מנקה מצבות, אב בית מנקה סביבן." |
| פחי מיחזור | פח, פחים, מיחזור, זבל, אשפה | 6,152,60,38 | "ארבעה פחי מיחזור: כחול לנייר, ירוק לזכוכית, צהוב לאריזות, אדום ל'אחר'. בכל הארבעה — בדיוק אותו זבל. בסוף כולם נפגשים באותה משאית, כמו ארבעה תאגידים באותה מלחמה." | חפש / פתח → "פשפשת. עשרים עטיפות של אותו חטיף, שלושה תגי עובד שפג תוקפם, ופרוסת מצגת מודפסת: 'Q3: momentum'. אין מומנטום בפחים. בדקת." קח → "לקחת זבל? יענקל'ה, אתה מוציא זבל, לא מכניס. יש לך סטנדרטים ותלוש שמעליב אותם מספיק." |
| שלט ונר | שלט, נר, אנדרטה, פלאק | 62,76,36,34 | "שלט ממוסגר: 'המטבחון הזה שורד מ-2019', ולידו נר דולק. מישהו מחליף את הנר כל בוקר. אף אחד לא יודע מי. בקמפוס מתים מוצרים, מתות מחלקות — והנר הזה דולק. יש דברים שגם גוגל לא מעזה להפסיק." | קח → "לקחת את נר הזיכרון של המטבחון האחרון? יש גבול גם לחוצפה של אב בית, והוא עובר בדיוק כאן." כבה → "התקרבת לנשוף — והלהבה נטתה לעברך כמו גבה מורמת. נסוגת. חכם. לא מתעסקים עם דברים ששרדו כאן משנת 2019." |

---

## 3. Puzzle script — onCommand logic

Score keys: `google_kitchen_snack` = 5, `google_kitchen_invite` = 10. **Sum = 15.** ✔

```
STATE: flag gk_laptop_seen (room-internal staging)
MANIFEST-LAW: visited_google_kitchen (onEnter) · items given: chatif, zimun · exits: left→google_corridors only

onCommand(verb, noun, api, extra):

// --- קח חטיף ---
if verb=='קח' && (noun=='חטיף' || noun=='חטיפים' || noun=='קערה' || noun=='קערת חטיפים'):
    if hasItem('chatif'):
        say('כבר לקחת את החטיף. הקערות ריקות עכשיו לחלוטין. איפשהו בקמפוס, דשבורד של רווחת עובדים בדיוק ירד לאפס ואף אחד לא שם לב.')
        return true
    addItem('chatif', 'חטיף', 'החטיף האחרון בקמפוס. שווה יותר ממניה. ועדות שלמות היו הורגות בשבילו. אל תבדוק את זה.')
    score(5, 'google_kitchen_snack')
    say('הרמת את החטיף האחרון. בקערה. במטבחון. בקמפוס. יש סיכוי לא מבוטל — בהיסטוריה.\nהמטבחון נהיה שקט. אפילו הכיסא הפסיק להסתובב לרגע, מתוך כבוד.\nשמור עליו. מישהי בוועדה כלשהי עוד תרצה אותו יותר משהיא רוצה שלום עולמי.')
    return true

// --- אכול חטיף (אחרי שנלקח — כמעט-חורבן) ---
if verb=='אכול' && noun=='חטיף' && hasItem('chatif'):
    say('פתחת חצי סנטימטר של עטיפה — והקריין נחלץ להציל אותך: עצור!\nהחטיף הזה הוא מטבע, לא ארוחה. תאכל אותו עכשיו ותגלה בהמשך שוועדות מסוימות דנות רק על בטן מלאה — של עצמן.\nסגרת את העטיפה. שנינו יודעים שזה היה קרוב.')
    return true

// --- לפטופ: מבט ראשון (staging) ---
if (verb=='השתמש' || verb=='פתח' || verb=='קרא' || verb=='לחץ') && (noun=='לפטופ' || noun=='מחשב' || noun=='מחשב נייד' || noun=='יומן' || noun=='מסך'):
    if hasItem('zimun'):
        say('המסך כבה. הודעה אחרונה מרחפת עליו: "החשבון הושעה. תודה שהיית חלק מהמסע."\nהלפטופ סיים את תפקידו ההיסטורי. תן לו לנוח. הוא שירת אותך יותר מרוב מחלקות ה-IT.')
        return true
    if !getFlag('gk_laptop_seen'):
        setFlag('gk_laptop_seen')
        say(L1a); say(L1b)          // סצנת היומן — ראו דיאלוג, סעיף 4
        return true
    // ביקור שני: יצירת הזימון
    addItem('zimun', 'זימון לישיבה', "'ישיבה על תיאום ישיבות', חדר אינסוף-3, משתתפים: אתה. סוף סוף ישיבה שכולם מגיעים אליה.")
    score(10, 'google_kitchen_invite')
    say(L2a); say(L2b); say(L2c)    // סצנת הזימון + ההשעיה — ראו דיאלוג, סעיף 4
    return true

// --- מוות: לשתות את הבטא ---
if (verb=='שתה' || verb=='אכול' || verb=='טעם') && (noun=='מיץ' || noun=='משקה' || noun=='בקבוק' || noun=='ג\'וס' || extra.raw includes 'juice' || extra.raw includes 'ג׳וס'):
    die(DEATH1)   // ראו סעיף 5
    return true

// --- כמעט-מוות: לשבת על הכיסא המסתובב ---
if verb=='שב' && (noun=='כיסא' || noun=='שרפרף' || noun=='כיסא בר'):
    say(CHAIR1)   // ראו סעיף 5 — הגאג
    return true

// --- קפה ---
if (verb=='השתמש' || verb=='לחץ') && (noun=='מכונת קפה' || noun=='קפה' || noun=='מכונה'):
    say('לחצת. המכונה ענתה בנימוס אינסופי: "בקשתך חשובה לנו. עדכון גרסה 4 מתוך 512 בעיצומו."\nפס ההתקדמות זז פיקסל אחד קדימה, הסתכל עליך, וחזר אחורה.\nזו לא מכונת קפה. זו מטאפורה עם דוד קיטור.')
    return true

return false
```

Notes for the implementer:
- `gk_laptop_seen` is room-internal staging only; the ONLY manifest flag is `visited_google_kitchen` (set in onEnter). Do not invent cross-room flags here.
- The laptop is a two-beat puzzle: first interaction reveals the calendar (staging), second interaction creates the meeting and grants `zimun`. Any of the four verbs advances the beat — players will type 'קרא יומן' and 'השתמש במחשב' interchangeably.
- `zimun` gates entry to `google_meeting` — but that gate lives in `google_corridors`/`google_meeting`, NOT here. This room only grants the item.
- `chatif` is consumed later by ועדת שינוי-השם (see CHARACTERS.md) — never consume it here, and block eating it (see אכול handler).
- Exact ids: `chatif`, `zimun`, `visited_google_kitchen`, score keys `google_kitchen_snack`(5) + `google_kitchen_invite`(10) = 15.

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_google_kitchen`):**
> "המטבחון האחרון. פעם היו 340 כאלה בקמפוס; היום נשאר אחד, עם נר.\nחטיפים חינם, קפה שמתעדכן, ולפטופ שמישהו שכח לכבות ב-2023 — כלומר, לפי הסטנדרטים המקומיים, התשתית הכי יציבה בגוגל.\nאתה מרגיש בבית. זה מדאיג אותך."

**L1a — מבט ראשון בלפטופ:**
> "היומן של אריאל ל., שעזב ב-2023 ושכח להתנתק. או שלא שכח — אולי זו הייתה נקמה.\nהיומן עדיין חי: 12 ישיבות היום. אריאל לא בא לאף אחת כבר שלוש שנים, ואף אחד לא הבחין. יש אומרים שזו הקריירה המושלמת."

**L1b — המשך, הרמז:**
> "רגע. היומן פתוח. ההרשאות פתוחות. כפתור 'ישיבה חדשה' זוהר מולך כמו שער בירוקרטי אל חדר הישיבות אינסוף-3.\nבקמפוס הזה אף דלת לא נפתחת בלי זימון — אבל מי בודק מי יצר את הזימון? אף אחד. אף אחד אף פעם לא בדק."

**L2a — יצירת הזימון (ביקור שני בלפטופ):**
> "אתה מקליד באצבע אחת, כמו שצריך: כותרת — 'ישיבה על תיאום ישיבות'. חדר — אינסוף-3. משתתפים — אתה.\nהיומן בולע את זה בלי למצמץ. כמובן שהוא בולע. זו הישיבה הכי לגיטימית שנקבעה כאן העשור."

**L2b — הזימון נשלח:**
> "'הזימון נשלח.' דינג. קיבלת אותו. אתה גם המזמין וגם המוזמן — לראשונה בהיסטוריית התאגיד, נוכחות של 100% מובטחת.\n(קיבלת: זימון לישיבה.)"

**L2c — הפאנץ':**
> "שנייה אחרי, הלפטופ מצייץ שוב: 'חשבון זה הושעה עקב פעילות חריגה: קביעת ישיבה שמישהו מתכוון להגיע אליה.'\nהמסך כבה. אריאל, איפה שלא תהיה — זה היה מפעל חיים. הזימון כבר אצלך, וזימונים, כידוע, שורדים גם את מות המזמין. במיוחד כאן."

**מכונת הקפה (talk / דבר עם מכונה):**
> "'שלום! אני מכינת-הקפה שלך!' — כן, מכינת. באג בלוקליזציה משנת 2021, פתוח, בעדיפות P4.\n'הקפה שלך יהיה מוכן בעוד: [שגיאת חישוב]'. אתה מהנהן. גם לך יש ימים כאלה."

---

## 5. Death(s)

**DEATH1 — לשתות את ה-Google Juice (מוות זמין, נמנע לחלוטין):**
> "פתחת. שתית. לרגע — טעם של עתיד: מתקתק, חדשני, מלא הבטחה.\nואז הבטן שלך מקבלת נוטיפיקציה. אתה מרגיש אותה מגיעה: 'הקיבה שלך קיבלה sunset notice — אנחנו מתמקדים באיברי ליבה.'\nהכבד מנסה להגיש ערר. אין למי. שאר הגוף מצטרף מסולידריות, איבר אחרי איבר, לפי סדר אלפביתי.\nהדבר האחרון שאתה שומע: 'תודה שהיית חלק מהבטא.'\n☠ [שחזר] — היה כתוב beta על הבקבוק. על הבקבוק, יענקל'ה."

**CHAIR1 — כמעט-מוות: לשבת על הכיסא המסתובב (הגאג):**
> "התיישבת. הכיסא, שצבר מומנטום זוויתי מאז 2019, קיבל סוף סוף מסה לעבוד איתה.\nסיבוב. שני סיבובים. המטבחון נהיה מריחה צהובה. אתה רואה את הנר, את המקרר, את הנר, את המקרר, את החיים שלך, את המקרר—\nהכיסא פולט אותך בדיוק על עגלת סטנדרט של מרחק בטיחות מהדלפק. אתה שוכב על הרצפה. הרצפה נקייה. לפחות זה.\nהכיסא ממשיך להסתובב, מעט מהר יותר. הוא לקח ממך משהו. אל תיתן לו עוד."

---

## 6. Exits behavior

| Exit | Type | Target | Condition / text |
|---|---|---|---|
| left (edge walk) | walking, per manifest | `google_corridors` | Always open. On walk-off, no gate. Optional flavor if the player types 'לך שמאלה' explicitly: "אתה חוזר אל המסדרונות. המטבחון נשאר מאחור, נוצץ ואמיץ, אחרון מבני מינו." |
| right / up / down / enter | none | — | No scripted exits. 'צא' → generic engine fallback pointing left. Attempting 'היכנס למקרר' → "להיכנס למקרר? אתה אב בית, לא מוצר של גוגל. עוד לא הגיע הזמן שלך להתקרר במחסן." |

Implementer checklist: floor `{ y1: 150, y2: 192 }` · `exits: { left: 'google_corridors' }` · `music: 'google'` · onEnter sets `visited_google_kitchen` once and plays the first-entry text.
