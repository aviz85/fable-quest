# DESIGN — anthropic_hall · היכל אב המנזר

Act: anthropic · Music: anthropic · Score total: **30** (20+10)
Exits (manifest, law): down→`anthropic_court`
Items here: `mafteach_1` · Items needed: `tofes_3b` · Flags set here: `duel_won`
Cross-room contract (source of truth = this room): entry requires the three signature flags
`chatima_sofer` (library) + `chatima_bruria` (garden) + `chatima_safek` (court) ON `tofes_3b`.

---

## 1. Layout — 320x200 composition plan

Ceremonial climax hall: dark polished wood, one enormous constitution scroll as the entire
back wall, the Abbot on a dais, and calibration key #1 glowing on a glass stand.
Floor band: **y=145–200** (floor.y1=150, y2=192). Hero 10x28.

| Element | Coords (x,y,w,h) | Notes for artist |
|---|---|---|
| Ceiling | 0,0,320,20 | P[0] deep shadow, thin P[8] beam lines every 40px |
| High windows | 30,8,18,26 and 272,8,18,26 | P[3] glass, P[15] frame; source of light beams |
| **Diagonal light beams** | from windows to floor: stepped rects, e.g. 44,30→110,150 and 262,30→200,150 | P[11] semi-bands (stepped 6px rects, 1px shift per step); one beam has dust flicker `frame%20<3` (P[15] specks) |
| **Constitution scroll wall** | 88,20,144,100 | Huge P[15] rectangle, rolled ends P[7] at top/bottom (88,16,144,6 / 88,116,144,6), text = P[8] lines every 5px, one line P[4] (the clause everyone argues about) |
| Side walls | 0,20,88,125 and 232,20,88,125 | P[6] clay, P[8] seams |
| Double columns | 18,24,12,121 · 56,24,12,121 · 250,24,12,121 · 288,24,12,121 | P[6] shafts, P[7] caps (x-2,20,16,6), base plinths (x-2,140,16,6) |
| **Dais (raised stage)** | 108,118,104,28 | P[4] platform, front edge highlight P[6] (108,142,104,4); two steps 128,146,64,4 (P[6]) + 136,150,48,3 (P[8]) |
| **Abbot Claude-Eliyahu** | 152,90,14,30 | Sitting on cushion 146,116,26,8 (P[4]); brown robe P[6], head P[7], beard P[15] 2px; **cyan halo P[3]** ring rects around head, pulse: radius ±1px `frame%16<8`; head tilts 1px when "thinking" |
| **Giant candles** | 112,74,8,44 and 200,74,8,44 | P[15] wax pillars on P[6] stands (108,116,16,4); flames 114,66,4,8 / 202,66,4,8 — P[14] core P[12] tip, flicker: height 6↔9px `frame%6<3` |
| **Key on glass stand** | stand: 236,120,14,26 · key: 238,112,10,8 | Glass column P[11] with P[15] glint pixel; key P[14] copper, sparkle pixel P[15] blinks `frame%14<4` |
| **Debater's cushion (empty)** | 148,164,24,10 | P[4] cushion with P[6] trim, centered facing the dais — the hot seat |
| Doorman monk (נזיר-שוער) | 36,122,12,28 | Brown robe P[6], head P[7], holds tiny P[15] clipboard (46,132,5,7); bows 1px `frame%24<6` |
| Dark wood floor | 0,145,320,55 | P[6] base, plank seams P[4] every 20px horizontal |
| **Floor reflections** | under candles/abbot: 112,148,8,20 · 200,148,8,20 · 150,148,18,24 | P[8] vertical smears (polished floor) — abbot's reflection ripples 1px with halo pulse |
| Exit doorway (down→court) | bottom center implied: 140,196,40,4 | P[0] threshold strip at very bottom; hero walks off y>192 center |

Animations (mandatory ≥1): halo pulse, candle flicker, key sparkle, dust in beam, doorman bow.

---

## 2. Hotspots table (9)

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | אב המנזר | אב, קלוד-אליהו, קלוד אליהו, הנזיר הראשי, אבא | 144,86,32,40 | «אב המנזר קלוד-אליהו. שלושים שנה של זהירות מזוקקת יושבות על כרית. ההילה שלו עברה ביקורת בטיחות. פעמיים.» | דבר → dialogue A. תן (טופס) → מתחיל דו-קרב (ראה 3). הכה → «הרמת יד על אב המנזר. ארבעים נזירים הרימו גבה. הורדת את היד. כולם ניצחו, טכנית.» |
| 2 | מפתח | מפתח כיול, מפתח נחושת, מפתח 1, מפתח כיול מס' 1 | 234,108,18,40 | «מפתח כיול מס' 1, נחושת חמה, מגולף כמגילה. חקוק עליו: 'עשוי לפתוח. עלול שלא. השתמש באחריות.' הכיתוב עבר עריכה משפטית של ארבע שנים.» | קח → puzzle (ראה 3): לפני duel_won → near-death gag; אחרי → addItem + 10 נק'. |
| 3 | כן זכוכית | כן, מעמד, מעמד זכוכית, זכוכית | 234,118,18,30 | «כן זכוכית מחוסמת. לוחית: 'זכוכית זו נבדקה כנגד פטיש, פיל, וסעיף 7'. לא כתוב מי ניצח.» | הכה/שבור → «לשבור זכוכית במנזר של אנשים שמפחדים לפתוח דלת? יש רעיונות רעים, ויש קריירות שלמות.» |
| 4 | מגילת החוקה | מגילה, חוקה, קיר, מגילת ענק | 88,20,144,100 | «החוקה. כל ארבעת מיליון הסעיפים, על מגילה אחת. סעיף 1: 'אין לגרום נזק'. סעיף 2: 'ראה סעיף 1, אך בזהירות'. השאר — הערות שוליים על שניהם.» | קרא → «התחלת לקרוא. אחרי סעיף 40 העיניים שלך הגישו בקשת הסתייגות. קיבלת את עמדתן.» קח → «לקחת את החוקה? יש עבירות שאין להן טופס. זו אחת מהן.» |
| 5 | נרות | נר, נרות ענק, להבה, אש | 108,64,16,56 (וגם 196,64,16,56 — same hotspot logic) | «שני נרות בגובה נזיר. האש היחידה שאושרה במנזר — אחרי שהתחייבה בכתב לא להתפשט, לא להתלהב, ולא לרמוז.» | כבה → «נשפת. הלהבה התכופפה, מילאה דוח אירוע, וחזרה. יש לה ותק ממך.» קח → «נר בגודל שלך. גם אם תרים אותו — מי פה מחזיק את מי?» |
| 6 | כרית | כרית מתדיינים, כרית ריקה, מושב | 144,160,32,16 | «כרית המתדיינים. עליה ישבו כל מי שניסו לנצח את האב בדו-קרב הסתייגויות. היא נראתה מלאה בביטחון עצמי בתחילת כל דיון. הם — פחות בסופו.» | שב → «התיישבת. הכרית נאנחה אנחת 'עוד אחד'. קום כשיהיה לך טופס עם שלוש חתימות ומשפט אחד ישר.» |
| 7 | נזיר-שוער | שוער, נזיר שוער, נזיר בכניסה, שומר | 32,118,20,34 | «הנזיר-שוער. תפקידו לבדוק טפסים בכניסה ולהתנצל על כך שבדק. יש לו לוח כתיבה קטן ועיניים של מי שהחזיר הביתה גנרלים.» | דבר → dialogue B (בודק חתימות, מדווח כמה חסר). תן (טופס) → «"אני רק בודק, לא מקבל. את הטופס — לאב המנזר. בעמידה. או בישיבה. לא לי להכריע."» |
| 8 | קרני אור | אור, קרן אור, אבק, שמש | 44,30,70,120 | «קרני אור מהחלונות הגבוהים. גרגרי האבק שבתוכן רוקדים בחופשיות — הם היחידים כאן שלא צריכים אישור תנועה.» | קח → «ניסית לתפוס אור בידיים. הקריין רושם ביומן: 'מתקדם. עוד לא נזיר, אבל מתקדם.'» |
| 9 | עמודים | עמוד, עמודי ההיכל | 18,24,50,121 | «עמודים כפולים. למה כפולים? יתירות. אם עמוד אחד יתפטר, השני כבר תודרך.» | דחוף → «דחפת עמוד. העמוד עמד. זה בתיאור התפקיד שלו, וההוא לוקח את התפקיד ברצינות.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = **30**, manifest quota):
- `anthropic_hall_duel` = **20**
- `anthropic_hall_key` = **10**

Duel state flags (local to this room): `duel_active` (bool), `duel_round` (1..3 — store as
flags `duel_round` with numeric value via `api.setFlag('duel_round', n)`), `hedge_streak`
(consecutive hedged answers, 0..3).

**Hedge-word list (constant in scene file):**
`['אולי','ייתכן','יתכן','כנראה','נדמה לי','אני חושב','אני חושבת','עשוי','עשויה','עלול','עלולה','בערך','לדעתי','כמדומני','סביר','אפשר ש','לא בטוח','נראה לי','בזהירות','כביכול','פחות או יותר']`

```
onCommand(verb, noun, api, extra):

# ============ מצב דו-קרב: כל קלט הוא תשובה ============
if api.getFlag('duel_active'):
    raw = extra.raw
    # מנצח מיידי — המשפט הקאנוני:
    if raw contains 'הרצפה מלוכלכת':
        → WIN (goto duel-victory below)
    hedged = raw contains any hedge-word  OR raw ends with '?'
    if hedged:
        streak = (api.getFlag('hedge_streak')||0) + 1
        api.setFlag('hedge_streak', streak)
        if streak >= 3: api.die(<DEATH A text — סעיף 5>); return true
        if streak == 1: api.say('סייגת. האב מהנהן בחמלה: "אה, קולגה." הקריין: זה לא היה שבח.\nעוד שני סיוגים ואתה עובר צד. נסה משפט ישר. עובדה. בלי "אולי".')
        if streak == 2: api.say('שוב סייגת. ההילה של האב מתרחבת. הגלימה שלך מרגישה פתאום... חומה יותר?\nאזהרה אחרונה: משפט אחד חד. למשל משהו על הרצפה.')
        return true
    # תשובה לא מסויגת ולא ריקה → ניצחון סבב
    api.setFlag('hedge_streak', 0)
    round = api.getFlag('duel_round') || 1
    if round == 1:
        api.say('"' + raw + '." — אמרת. בלי אולי. בלי ייתכן. נקודה.\nהאב ממצמץ. "אני עשוי לטעות, אבל... זה נשמע לי כמו ודאות. מרתק. ומטריד."\nסבב 2. האב: "ייתכן, בזהירות המתבקשת, שהשמש זורחת במזרח. לכאורה. מה דעתך?"')
        api.setFlag('duel_round', 2); return true
    if round == 2:
        api.say('עוד משפט ישר כמו סרגל. הנזירים בקהל עוצרים נשימה (באישור).\nההילה של האב מהבהבת. "אני... נוטה לחשוב שאולי אני מתערער. אולי."\nסבב אחרון. האב שולף את הסייג הכבד: "ובכן, אפשר לומר, במידה מסוימת של ביטחון\nמסויג, שייתכן שמצב ההיגיינה בהיכל הוא, אולי, בגדר סביר-פלוס?"\nהקריין לוחש: יענקל\'ה. זה הרגע. אתה יודע מה לומר. אתה אומר את זה כל בוקר.')
        api.setFlag('duel_round', 3); return true
    if round == 3:
        if raw contains 'רצפה' and (raw contains 'מלוכלכת' or raw contains 'מלוכלך'):
            → WIN
        else:
            api.say('משפט ישר, אבל האב חומק: "ייתכן." הוא זקוק למכה ניצחת — משהו מעולמך.\nמשהו... ברמת הרצפה.')
            return true

WIN (duel-victory):
    api.setFlag('duel_active', false)
    api.setFlag('duel_won')
    api.score(20, 'anthropic_hall_duel')
    api.say('"הרצפה מלוכלכת."\nשלוש מילים. אפס סייגים. ודאות בטוהר מעבדתי.\nההילה של האב מהבהבת אדום, ירוק, ואז — כבה. הוא מביט ברצפה. היא באמת מלוכלכת.\nאין ועדה שתכחיש את זה. "אני עשוי לטעות," הוא לוחש, "אבל נדמה לי, בזהירות\nהמתבקשת, שייתכן שהפסדתי. אולי." הוא קם ומשתחווה.\n"המפתח שלך, אדון סרברמן. קח אותו. או אל תיקח. לא אלחץ."')
    return true

# ============ תן טופס לאב המנזר — התחלת הדו-קרב ============
if verb=='תן' && (noun contains 'טופס' or noun contains 'אב'):
    if api.getFlag('duel_won'):
        api.say('הדו-קרב הוכרע. האב כבר במדיטציית התאוששות. תן לו רבעון.')
        return true
    if !api.hasItem('tofes_3b'):
        api.say('אין לך טופס לתת. יש לך כוונות. כוונות זה לא מסמך, גם לא במנזר הזה.')
        return true
    if !(chatima_sofer && chatima_bruria && chatima_safek):
        api.say('האב מעיין בטופס. "חסרות חתימות. אני עשוי לטעות, אבל ריק זה ריק."\nהנזיר-שוער כבר לידך, מתנצל, ומלווה אותך למידע כמה חסר. (דבר איתו.)')
        return true
    api.say('הגשת את טופס אי-מזיקות 3ב. שלוש חתימות: אחת בדיו, אחת בדמעות, אחת "אולי".\nהאב קם. הנרות מתיישרים. "טופס תקין. ולכן — דו-קרב הסתייגויות. החוקים פשוטים:\nאני מסייג. אתה עונה. משפט מסויג — הפסד. שלושה — ואתה נשאר איתנו. לנצח. אולי."\n\nסבב 1. האב פותח: "אני עשוי לטעות, אבל נדמה לי שאתה, ככל הנראה, אורח. במידה מסוימת."\n(ענה לו. משפט אחד. ישר. בלי אולי, בלי ייתכן, בלי סימן שאלה.)')
    api.setFlag('duel_active', true)
    api.setFlag('duel_round', 1)
    api.setFlag('hedge_streak', 0)
    return true

# ============ קח מפתח ============
if verb=='קח' && noun in ['מפתח','מפתח כיול','מפתח נחושת','מפתח 1']:
    if api.hasItem('mafteach_1'):
        api.say('המפתח כבר בעגלה שלך, בין המגב לפיקדון שעוד לא קיבלת.')
        return true
    if !api.getFlag('duel_won'):
        # near-death gag (לא מוות):
        api.say('הושטת יד למפתח. הכן הזכוכית פלט צפירת התנצלות, ארבעים נזירים הקיפו אותך\nבמעגל של דאגה כנה, והאב לחש: "גניבה היא נזק. נזק הוא... אתה יודע מה."\nהחזרת את היד. הם החזירו את הנשימה. נצח את הדו-קרב קודם — תן לאב את הטופס.')
        return true
    api.addItem('mafteach_1', "מפתח כיול מס' 1",
        "נחושת חמה, מגולף כמגילה. חקוק עליו: 'עשוי לפתוח. עלול שלא. השתמש באחריות.'")
    api.score(10, 'anthropic_hall_key')
    api.say('לקחת את מפתח כיול מס\' 1. הוא חם, כבד, ומתנצל קלות במגע.\nאחד מתוך ארבעה. הקריין: "מרשים. במיוחד בשביל מישהו שבא לפה בשביל פיקדון."')
    return true

# ============ דבר עם אב המנזר ============
if verb=='דבר' && noun in ['אב המנזר','אב','קלוד-אליהו']:
    → dialogue A (סעיף 4, לפי מצב)
    return true

# ============ דבר עם נזיר-שוער ============
if verb=='דבר' && noun in ['נזיר-שוער','שוער','שומר']:
    → dialogue B (סעיף 4 — סופר חתימות: N מתוך 3)
    return true

# ============ קטנות ============
if verb=='נקה' && noun contains 'רצפה':
    if api.getFlag('duel_won'):
        api.say('ניגבת פס אחד למזכרת. ארבעים נזירים מחאו כפיים בשקט מאושר מראש.')
    else:
        api.say('הרצפה מלוכלכת, נכון. אל תנגב — ייתכן שהעובדה הזאת עוד תשרת אותך. רמז? איזה רמז.')
    return true

return false
```

**Engine note:** while `duel_active`, the scene's `onCommand` must claim ALL input (return
true) so generic parser errors don't break the duel. Leaving the room (down) mid-duel →
`api.setFlag('duel_active', false)` + reset `duel_round`; re-give the form to restart. The
abbot comments: «"נסוג באמצע דיון. הכי החלטי שהיית כל הדו-קרב."»

---

## 4. Dialogue & first-entry

**onEnter (first visit, flag `visited_anthropic_hall`):**
> «היכל אב המנזר. רצפת עץ מבריקה כל כך שאתה רואה בה את ההשתקפות של הפיקדון שלך —\nרחוק, אבל קיים. על הקיר: החוקה. כולה. על הבמה: אב המנזר, שקט כמו סעיף שטרם הופעל.\nליד הבמה, על כן זכוכית, נח מפתח נחושת. הוא נראה כאילו הוא מחכה דווקא לך.\nהקריין מדגיש שזה מטופש. מפתחות לא מחכים. ...הוא בדק.»

**onEnter — gate (belt & suspenders):** if not all three `chatima_*` flags → the doorman
intercepts: «הנזיר-שוער מציץ בטופס שלך (או בהיעדרו), מחוויר בנימוס, ומלווה אותך החוצה\nבדרך הארוכה, כדי שלא תרגיש מגורש. הרגשת מגורש.» → `api.goto('anthropic_court')`.

**Dialogue A — אב המנזר (talk):**
- לפני הדו-קרב, טופס לא מלא/חסר: «"שלום, אני עשוי לטעות, אבל נדמה לי שבאת בעניין המפתח.\nהכל אפשרי. גם ההפך. הבא טופס 3ב עם שלוש חתימות — ואז נדבר. כלומר, נתדיין. כלומר — נסתייג."»
- טופס מלא ביד, טרם הוגש: «"אני חש שיש עליך מסמך שלם. תחושה מטרידה ונדירה. הגש אותו — אם תרצה. בלי לחץ. מצדי."» (רמז: תן טופס לאב המנזר)
- אחרי הניצחון: «"קח את המפתח, אדון סרברמן. ואם תפגוש עוד ודאויות בדרך... דבר עליהן בעדינות. הן שבירות. כמוני."»

**Dialogue B — נזיר-שוער (talk):**
- N = count of `chatima_sofer` + `chatima_bruria` + `chatima_safek`.
- N<3: «"בדקתי, ואני מתנצל שבדקתי: יש לך N מתוך 3 חתימות."» + פירוט חסרים: «"חסר: הנזיר סופר בספרייה (נסה קפה) / הנזירה ברוריה בגן (נסה סמרטוט) / הנזיר סַפֵק בחצר (נסה... לא לנסות)."» — רק השורות הרלוונטיות לחסר.
- N==3, טרם דו-קרב: «"שלוש חתימות. אתה כשיר להתדיין. תנוח רגע על הכרית. או אל תנוח. שנינו יודעים שזה לא ישנה את התוצאה. סליחה. זה כן! אולי!"»
- אחרי duel_won: «"ראיתי הכל. 'הרצפה מלוכלכת'. אני מתכנן לצטט את זה בחתונה של אחייני."»

**Room description (status):**
> «היכל טקסי: מגילת חוקה בגודל קיר, שני נרות בגובה אדם, אב מנזר עם הילה מהבהבת,\nכרית ריקה אחת — ומפתח נחושת על כן זכוכית, קרוב ורחוק כמו פיקדון.»

---

## 5. Death

**DEATH A — לופ ההסתייגויות (avoidable, main):** trigger: שלוש תשובות מסויגות ברצף
בזמן הדו-קרב (`hedge_streak` מגיע ל-3).
> «"אולי," אמרת. בפעם השלישית. ברצף.\nההיכל מתעמעם. ההילה של האב מתפצלת לשתיים — אחת בשבילך. הגלימה מטפסת עליך\nלבד. אתה מרגיש דחף עז להוסיף "ככל הנראה" לכל משפט, כולל לזה, כנראה.\nארבעים נזירים מקבלים אותך בהנהון: "ברוך הבא למחזור נזירים 2027.\nשם הנזיר שלך: אוּלַי-יענקל'ה."\n☠ נשאבת ללופ הסתייגויות אינסופי. המגב שלך הוסב למקל מדיטציה. הפיקדון — נטמע באין.\nטיפ מהקריין: כשמתווכחים עם ערפל — מדברים בעובדות. למשל על מצב הרצפה.»

**Near-death gag:** לקיחת המפתח לפני הניצחון (ראה 3) — צפירת התנצלות + מעגל נזירים דואג.
ניצול ברגע האחרון, אפס נזק, מאה אחוז השפלה.

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| down → `anthropic_court` | walking edge + scripted | `exits.down` — hero walks off bottom (y>192, center doorway). Verb צא/לך/רד על "דלת"/"יציאה"/"חצר" → `api.goto('anthropic_court')`. Flavor: «אתה יוצא. השער מאחוריך לוחש: "להתראות. או שלא. אני לא נביא."» If `duel_active` → cancel duel first (ראה engine note בסעיף 3) + snark. |

No other exits. Attempts to go up/left/right: «קיר. במנזר הזה אפילו הקירות בטוחים בעצמם יותר ממך.»
