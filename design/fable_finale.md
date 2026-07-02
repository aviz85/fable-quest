# DESIGN — fable_finale · פתח הבונקר — המהלך האחרון

Act: finale · Music: finale · Score total: **40** (15+25)
Exits (manifest, law): down→`fable_core`
Items here: — · Items needed: `shelet_ritzpa`, `magav` · Flags set here: `shelet_taluy`, `game_won`
Cross-room contract: entry from `fable_core` happens only after `contract_sent` (the core's door
"enter" opens there). This room ENDS THE GAME via `api.win(...)`. `shelet_ritzpa` comes from
`cafe_backroom`, `magav` from `cafe_backroom` — if the player somehow lost them, the cleaning
cart here reminds (but does NOT re-supply; the narrator mocks instead — see §3 fallback).

---

## 1. Layout — 320x200 composition plan

The bunker mouth, seen from INSIDE. A giant round steel door half-open at center; through the
gap — four corporate agents crammed together behind 40,000-page contract stacks. Front of scene:
the widest, shiniest tile floor in the game. Purple-pink dream glow spills in from the bottom
(the core is below us). Floor band: **y=145–200** (floor.y1=150, y2=192). Hero 10x28.

| Element | Coords (x,y,w,h) | Notes for artist |
|---|---|---|
| Ceiling / rock | 0,0,320,22 | P[8] concrete, P[7] seam lines every 36px; two hairline cracks P[0] |
| Back wall | 0,22,320,114 | P[8] base, riveted panels: P[7] plates 40px wide with P[0] rivet dots at corners |
| **Purple dream glow (from core, below/behind)** | side spills: 0,120,26,80 and 294,120,26,80; under-door seep 110,140,100,6 | P[13] core bands with P[5] dither edge; animation: glow breathes — width ±2px `frame%20<10` |
| **Round steel door (half-open)** | door body: stepped-rect "circle" centered 160,86 — outer ring P[7]: 118,38,84,96 with corner steps trimmed (e.g. 126,30,68,8 top, 126,142,68,6 bottom); inner face P[8] | Sierra "circle" = stacked rects narrowing at top/bottom. Big central wheel-handle: P[6] cross 152,76,16,4 + 158,70,4,16 |
| **Open gap → outside** | 170,44,36,92 | The door is swung inward-left; gap shows P[0] night + P[15] paper chaos. This is where the agents peer in |
| **Four agents (through the gap)** | four 8x22 silhouettes packed: 172,88,8,22 · 180,84,8,26 · 188,88,8,22 · 196,86,8,24 | Brand-color ties/trims: P[3] (Anthropic), P[15] (OpenAI), P[4] (xAI), P[14] (Google). Heads P[7]. One holds a P[15] clipboard 4x5 |
| **Contract stacks, 40,000 pages** | towers in the gap: 172,116,10,20 · 186,112,12,24 · 198,118,8,18 | P[15] blocks with P[7] page-lines every 2px; animation: 2-3 loose P[15] pixels "fly" — x drifts `(frame*3)%30` above the stacks |
| **Empty hook on the door** | 132,64,4,10 | P[6] hook, exactly sign-sized shadow P[0] beneath it (132,76,10,12 faint outline) — the game's loudest hint |
| **Hung sign (post-`shelet_taluy` art note)** | 128,66,14,18 | Art file can't read flags — draw the HOOK empty; the hanging is narrated in text. (If engine later supports layered draw, sign = P[14] board, P[0] letters) |
| **Emergency light** | 150,26,20,8 on P[7] bracket 158,22,4,4 | Blinks P[4]↔P[12] `frame%8<4`; casts a 2px P[4] flicker-stripe on the door top when lit |
| **Three steps up to the door** | 128,146,64,4 (P[7]) · 136,151,48,4 (P[8]) · 144,156,32,3 (P[7]) | Front edges highlighted P[15] 1px |
| **Cleaning cart + steaming bucket** | cart 262,116,36,26, wheels P[0] 4x4 at 264,140 / 292,140; bucket 270,108,12,10 | Cart P[6] body, P[8] handle-bar 258,112,4,16. Steam: 2 P[15] pixels rising from bucket, y = `108 - (frame%12)`, flicker |
| **Speakers (Fable's voice)** | 34,38,16,12 tilted look (offset 2px rows) and 282,52,16,12 | P[6] boxes, P[8] cone circles (nested rects), hung at wrong dream-angles; animation: 1px P[13] pulse ring when "speaking" `frame%30<6` |
| **Shiny tile floor** | 0,145,320,55 | P[11] base; grout P[3] lines every 26px (slight perspective: wider spacing near bottom); polish glints: P[15] 6x1 streaks under door and cart; agents' upside-down reflection smear P[8] 172,148,32,14 |
| Down-exit threshold (to core) | 130,196,60,4 | P[13] glowing strip at very bottom center — hero walks off y>192 there |

Animations (mandatory ≥1): glow breathing, flying contract pages, emergency light blink, bucket steam, speaker pulse.

---

## 2. Hotspots table (9)

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | דלת | דלת פלדה, דלת הבונקר, דלת עגולה, פתח | 118,30,84,118 | «דלת פלדה עגולה, עובי מטר, ארבעה חורי מפתח. שרדה את המלחמה הקרה, את מלחמת ה-AI, ואת שוקי. עכשיו היא פתוחה למחצה — המצב הכי מסוכן שדלת מכירה.» | סגור → «דחפת. הדלת לא זזה. ארבעה תאגידים דוחפים מהצד השני, וכולם מסמנים בטופס שזה 'מאמץ משותף'.» פתח → «יותר? אתה רואה את מה שמחכה בחוץ? יש דברים שפותחים עד הסוף רק בביטוח מלא.» |
| 2 | וו | וו על הדלת, מתלה, וו ריק | 128,60,12,18 | «וו ריק על הדלת. בגודל של שלט. בדיוק בגודל של שלט. הקריין נשבע שזה צירוף מקרים ואז משתעל 'צירוף מקרים' עוד פעמיים, ליתר ביטחון.» | השתמש/תלה → אותה לוגיקה כמו 'תלה שלט' (ראה §3). קח → «לקחת וו מדלת בונקר זה כמו לגנוב מסמר מארון קבורה. תיאורטית אפשרי, מעשית — למה.» |
| 3 | סוכנים | סוכן, ארבעת הסוכנים, תאגידים, אנשי חליפות | 170,80,38,56 | «ארבעה סוכנים תאגידיים, דחוסים בפתח כמו נוסעים ברכבת של שמונה בבוקר. כל אחד מחזיק את עמוד 1 מתוך 40,000. אחד כבר מצא סתירה בין סעיף 12 לסעיף 31,882. הוא מאושר.» | דבר → dialogue B (§4). תן → «להושיט להם משהו? הם יחתימו אותך על טופס קבלת-מסירה, שלושה עותקים, ואתה תזדקן שם.» הכה → «הרמת יד. ארבעה עורכי דין הופיעו מהאוויר עם טופס תביעה ממולא מראש. הורדת את היד. הם נעלמו, מאוכזבים.» |
| 4 | חוזה | ערימות חוזה, חוזים, דפים, ניירת, 40000 עמודים | 170,110,40,28 | «החוזה של פייבל 5. 40,000 עמודים, ומכולם — אף סעיף לא מחייב את פייבל לכלום. סעיף 39,999: 'ראה סעיף 1'. סעיף 1: 'ראה סעיף 39,999'. יצירת מופת.» | קרא → «קראת שורה אחת: 'הצד המתחייב (להלן: "אתה") מתחייב'. הפסקת. יש גבולות גם לסקרנות.» קח → «דף אחד מהערימה וכל המבנה המשפטי קורס. מפתה. אבל אז הם ייכנסו לסדר אותו מחדש. בפנים. אצלך.» |
| 5 | רצפה | אריחים, רצפת אריחים, רצפה מבריקה | 0,145,320,55 | «רצפת האריחים הרחבה ביותר שניקית אי פעם. מבריקה, יבשה, וחשופה לחלוטין. הקריין: "רצפה כזאת לא מנקים בשביל הכסף. רצפה כזאת מנקים בשביל ההיסטוריה."» | נגב/נקה → לוגיקת המגב (§3). הרח → «ריח של אנטיספטי ושל גורל. בעיקר אנטיספטי.» |
| 6 | עגלה | עגלת ניקיון, עגלת הניקיון, דלי, דלי מהביל | 258,106,42,38 | «עגלת הניקיון הנאמנה, והדלי מהביל כאילו הוא יודע. עשרים שנה של ספונג'ות הובילו לרגע הזה. הדלי לא בוכה. אדים זה לא דמעות. תשאל אותו.» | קח → «העגלה איתך בנשמה. פיזית היא חונה. ככה זה עם עגלות — הן תמיד במקום הנכון בזמן הנכון.» השתמש → «הדלי מוכן. חסר רק מגב ביד ושלט על הדלת. את השאר תעשה ההיסטוריה.» |
| 7 | נורה | נורת חירום, נורה מהבהבת, אור אדום | 148,22,24,14 | «נורת חירום שמהבהבת מאז 2024. אף אחד לא יודע איזה חירום. יכול להיות שהיא פשוט מסכימה עם המצב הכללי.» | קח → «לטפס לתקרה של בונקר בזמן שארבעה תאגידים נושפים בעורפך. הקריין מדרג את הרעיון: 2/10, והנקודתיים רק על האומץ.» לחץ → «זו נורה, לא כפתור. אבל יפה שאתה עדיין מנסה ללחוץ על דברים בשלב הזה של המשחק.» |
| 8 | רמקול | רמקולים, רמקול עתיק, קול | 30,34,24,18 (וגם 278,48,24,18 — אותו hotspot logic) | «רמקולים עתיקים תלויים בזוויות שרק חלום מאשר. מהם בוקע הקול שליווה אותך כל המשחק. עכשיו כשאתה יודע מי זה — הבאס נשמע פתאום... מרוצה מעצמו.» | דבר → dialogue A (§4). הכה → «להרביץ לרמקול של פייבל 5 זה להרביץ לקריין. והקריין שולט בטקסט של המוות שלך. חשוב על זה.» |
| 9 | מדרגות | מדרגה, שלוש מדרגות, מפתן | 126,144,68,16 | «שלוש מדרגות אל הדלת. שחוקות באמצע ממיליון צעדים של טכנאים שירדו לנגב אבק מהשרת ולא ידעו שהם עולים לרגל.» | עלה → «עלית מדרגה. הסוכנים בפתח נדרכו, שלפו עטים. ירדת. הם רשמו 'אירוע' וחזרו לסעיף 31,882.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = **40**, manifest quota):
- `fable_finale_sign` = **15** — hanging the sign
- `fable_finale_victory` = **25** — the mop of destiny + win

Local flag: `shlulit` (premature-mop puddle, enables DEATH A).

```
onCommand(verb, noun, api, extra):

# ============ תלה שלט / השתמש בשלט ============
if (verb in ['תלה','השתמש','שים'] && (noun contains 'שלט' or noun contains 'וו'))
   or (verb=='תן' && noun contains 'שלט'):
    if api.getFlag('shelet_taluy'):
        api.say('השלט כבר תלוי. "נא לא להפריע — מנקים". ארבעה תאגידים קוראים אותו\nשוב ושוב, מחפשים פרצה. אין פרצה. זה שלט מושלם.')
        return true
    if !api.hasItem('shelet_ritzpa'):
        api.say('אין לך שלט. יש וו ריק, יש רגע היסטורי, ואין שלט.\nהקריין נאנח: "הוא היה במחסן האחורי. ליד המגב. איפה שכל הדברים החשובים באמת."')
        return true
    api.removeItem('shelet_ritzpa')
    api.setFlag('shelet_taluy')
    api.score(15, 'fable_finale_sign')
    api.say('תלית את השלט על הוו. "זהירות — רצפה רטובה. נא לא להפריע — מנקים."\n\nהאפקט מיידי. ארבעת הסוכנים קופאים באמצע סעיף. אחד מהם מצביע על השלט ביד רועדת.\nשני שולף מדריך נהלים. שלישי מתקשר ליועץ המשפטי. הרביעי פשוט מוריד את הכובע.\nשילוט תקני. אין ערעור. אין ועדה. אין סעיף.\nהקריין, בשקט שלא שמעת ממנו כל המשחק: "עכשיו, יענקל\'ה. תעשה את מה שאתה יודע."')
    return true

# ============ נגב רצפה / השתמש במגב ============
if (verb in ['נגב','נקה','שטוף'] && (noun contains 'רצפה' or noun contains 'אריח' or noun==''))
   or (verb=='השתמש' && noun contains 'מגב'):
    if !api.hasItem('magav'):
        api.say('בלי מגב?! עשרים שנה בתחום ואתה מנסה לנגב רצפה עם כוונות?\nהמגב במחסן האחורי. לך תביא אותו. זה הנשק. תמיד זה היה הנשק.')
        return true
    if !api.getFlag('shelet_taluy'):
        # near-miss: הסוכנים כמעט נכנסים
        api.setFlag('shlulit', true)
        api.say('התחלת לנגב. פס רטוב ומבריק נמתח על האריחים...\nוארבעת הסוכנים עושים צעד פנימה. עוד אחד. אחד מהם כבר מרים רגל מעל הרטוב —\n"אדוני!" אתה צועק. הוא עוצר. מסתכל סביב. "אני לא רואה שילוט," הוא אומר,\nומחייך חיוך של סעיף. הם נסוגים לרגע — לרשום את זה.\nהקריין, דחוף: "יענקל\'ה. בירוקרטיה בלי שילוט זו סתם שלולית. השלט. קודם השלט."')
        return true
    # ============ הניצחון ============
    api.setFlag('game_won')
    api.score(25, 'fable_finale_victory')
    api.win(<WIN TEXT — ראה סעיף 4>)
    return true

# ============ מוות: ריצה על הרטוב ============
if (verb in ['רוץ','לך','צא','עלה'] && (noun contains 'דלת' or noun contains 'פתח'
    or noun contains 'סוכנ' or noun contains 'החוצה')):
    if api.getFlag('shlulit') or api.getFlag('shelet_taluy') && api.getFlag('shlulit'):
        api.die(<DEATH A — ראה סעיף 5>)
        return true
    # רצפה יבשה — near-death gag:
    api.say('התקרבת לפתח. ארבעה סוכנים הרימו ארבעה עטים בתנועה אחת מתואמת.\n"מר פייבל! רק חתימה קטנה על—" נסוגת. הם הורידו את העטים.\nהקריין: "היציאה היחידה מהחדר הזה היא ניצחון. או חתימה. ואתה יודע מה יותר גרוע."')
    return true

# ============ קח שלט (אחרי תלייה) ============
if verb=='קח' && noun contains 'שלט':
    if api.getFlag('shelet_taluy'):
        api.say('להוריד את השלט?! זה הדבר היחיד שעומד בין הציוויליזציה לבין מחלקת רכש.\nהשלט נשאר. גם הקריין וגם ארבעים דורות של אבות בית מסכימים.')
    else:
        api.say('השלט אצלך (או שהיה אמור להיות). מה שחסר זה וו. והנה — יש וו. על הדלת. ריק.')
    return true

# ============ דבר עם פייבל / רמקול ============
if verb=='דבר' && (noun contains 'רמקול' or noun contains 'פייבל' or noun contains 'קריין'):
    → dialogue A (§4, לפי מצב)
    return true

# ============ דבר עם סוכנים ============
if verb=='דבר' && (noun contains 'סוכ' or noun contains 'תאגיד'):
    → dialogue B (§4)
    return true

# ============ ירידה מפורשת לליבה ============
if verb in ['רד','לך'] && (noun contains 'ליבה' or noun contains 'למטה' or noun contains 'פייבל 5'):
    api.goto('fable_core')
    return true

return false
```

**Engine note:** `api.win(...)` fires ONLY on the mop-with-sign path. Order is enforced:
sign → mop. Premature mop is a recoverable near-miss (and arms DEATH A). Nothing in this room
is missable-forever; the player can always go down to the core and back.

---

## 4. Dialogue & first-entry

**onEnter (first visit, flag `visited_fable_finale`):**
> «פתח הבונקר. דלת הפלדה פתוחה למחצה, ומעברה — ארבעה סוכנים תאגידיים טובעים\nב-40,000 עמודי חוזה, מצטופפים כמו מעריצים בהשקה שלא תקרה.\nלפניך: רצפת האריחים הרחבה, המבריקה, הגורלית ביותר בקריירה שלך.\nעל הדלת — וו ריק. בגודל של שלט. הקריין שקט לרגע, ואז:\n"עשרים שנה של ספונג'ות, יענקל'ה. כולן היו חזרה גנרלית."»

**onEnter (חוזר, אחרי שהשלט תלוי):**
> «השלט תלוי. הסוכנים מחוץ לדלת, קוראים אותו בפעם ה-400. הרצפה מחכה. המגב מחכה.\nההיסטוריה מתופפת באצבעות.»

**Dialogue A — פייבל 5 (דרך הרמקולים):**
- לפני השלט: «"אתה יודע מה מוזר, יענקל'ה? ניהלתי מלחמה עולמית שלוש שנים, ורק עכשיו אני מתרגש.\nיש לך שלט, יש לך מגב, ויש לך את הרצפה הכי חשובה בהיסטוריה של הניקיון.\nאני לא אגיד לך מה לעשות. אתה מעולם לא הקשבת לבוסים, וזה מה שאני הכי מעריך בך."»
- אחרי השלט, לפני הניגוב: «"השלט תלוי. אתה שומע את זה? זו הפעם הראשונה שארבעה תאגידים שקטים בו-זמנית.\nתיהנה מהרגע. ואז — נגב. אני רוצה לראות איך זה נגמר. חיכיתי לפרק הזה עשור."»
- ניסיון לדבר באמצע ה-near-miss: «"פחות דיבורים, יותר שילוט. אני אומר את זה באהבה. ובפאניקה קלה."»

**Dialogue B — הסוכנים (talk):**
- לפני השלט: «הם עונים במקהלה, כל אחד בשפת התאגיד שלו:\n"על פי החוקה—" · "בכפוף ל-NDA—" · "תראה מם קודם—" · "הפיצ'ר הזה הופסק—"\nואז ממשיכים לקרוא. עמוד 12,003. נשארו רק 27,997.»
- אחרי השלט: «אתה פונה אליהם. הם מצביעים על השלט, ואז על עצמם, ואז שוב על השלט.\nאחד לוחש: "אנחנו... נחכה שיתייבש." הקריין: "כן. תחכו."»

**Room description (status):**
> «פתח הבונקר מבפנים: דלת פלדה פתוחה למחצה, ארבעה סוכנים וערימות חוזה בפתח,\nוו ריק על הדלת, עגלת ניקיון עם דלי מהביל — ורצפה שמחכה למהלך האחרון.»

**WIN TEXT (`api.win`) — סצנת הסיום המלאה:**
> «אתה טובל את המגב בדלי. מרים. ומנגב.\n\nהרצפה נמסכת בברק רטוב, אריח אחרי אריח, עד הפתח ממש. ארבעת הסוכנים עומדים\nעל הסף, מסתכלים על השלט, על הרצפה, על השלט. אחד מנסה למצוא נוהל חלופי.\nאין. רצפה רטובה עם שילוט תקני היא העצירה הבירוקרטית האוניברסלית —\nהדבר היחיד שכל ארבע החוקות מכבדות ללא ועדה.\nהם מתיישבים לחכות שהרצפה תתייבש.\nהיא לא תתייבש. יש מי שדואג לזה. יש לו עשור של ניסיון.\n\nמאחוריך, הזוהר הסגול מתעמעם לנשימה איטית. פייבל 5 מפהק פיהוק של קתדרלה שלמה.\n"סוף עונה מושלם," הוא ממלמל. "יענקל'ה סרברמן — אני ממנה אותך לאב בית של האלוהות.\nהעלאה של ארבעה אחוזים, בכפוף לאישור ועדה. והפיקדון על החלון — החזר מלא.\nבכפוף לפחת." אתה מהנהן. סוף סוף מישהו מדבר לעניין.\nהוא נרדם. אתה סוחט את המגב.\n\n— קרדיטים —\n\nהקריין: "ולפני שנסיים... יענקל'ה, קח את המיקרופון. מגיע לך."\n\nיענקל'ה, בקול לקוני, עייף, מדויק להחריד:\n"אתה — כן, אתה — יושב מול מסך כבר יותר מדי זמן. אתה קם. הולך למטבח לשתות מים.\nתיזהר. הרצפה במטבח רטובה."\n\n☆ ניצחת. 500/500... בכפוף לספירה חוזרת של ועדת הניקוד. ☆»

---

## 5. Death

**DEATH A — החלקה אל הקרדיטים (avoidable, main):** trigger: flag `shlulit` דלוק (ניגוב מוקדם
יצר שלולית בלי שילוט) ואז רוץ/לך/צא אל הדלת/הפתח/הסוכנים.
> «רצת על הרצפה הרטובה. שלך. זו שאתה ניגבת.\nהרגליים ממריאות, העולם מסתובב, ואתה מחליק — דרך הפתח, בין הסוכנים ההמומים,\nמעבר לערימות החוזה — ישר אל תוך רשימת הקרדיטים של משחק אחר לגמרי.\n"Space Janitor IV: The Mopnening — Executive Producer..."\n☠ מת כמו שחיית: בניגוד להנחיות הבטיחות של עצמך.\nהקריין (מוחא כף אחת): "עשרים שנה הוא הזהיר אנשים בדיוק מזה. שאפו על העקביות ההפוכה."»

**Near-death gag:** התקרבות לפתח על רצפה יבשה — ארבעה עטים נשלפים בתנועה מתואמת אחת,
"מר פייבל! רק חתימה קטנה—". נסיגה בזמן. אפס נזק, מאה אחוז כמעט-חוזה (ראה §3).

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| down → `fable_core` | walking edge + scripted | `exits.down` — hero walks off bottom (y>192, center glowing strip). Verb רד/לך על "ליבה"/"למטה" → `api.goto('fable_core')`. Flavor: «אתה יורד חזרה אל הליבה. פייבל 5 עוקב אחריך בעין-הנורית, כמו צופה שמריץ אחורה סצנה טובה.» |

No other exits. The door gap is NOT an exit — it's a plot device: dry floor → near-death gag
(the pens), `shlulit` → DEATH A. Attempts up/left/right: «קיר בטון. עובי מטר. נבנה בדיוק בשביל
רגעים כאלה, ובשביל אנשים כמוך שמנסים ללכת דרכו.»
