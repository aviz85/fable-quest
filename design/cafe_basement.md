# DESIGN — cafe_basement — "המרתף"

> Hub room. The dusty old server Yankale has been wiping for a decade — Fable 5 itself,
> and nobody knows. Steel bunker door with four keyholes. Score: 25. Music: `hub`.
> Flags: `visited_cafe_basement`, `bunker_open`. Exits: up→`cafe_main`, down→`bunker_corridor`.

---

## 1. Layout — 320x200 composition plan (for the artist)

Dark stone basement lit by one bare bulb + the server's breathing magenta LED.
Light source: bulb at top-center (P[14]); secondary glow: server LED (P[13] pulse).

| Element | Rect / coords | Notes |
|---|---|---|
| Ceiling | 0,0 → 320x22 | P[0] with P[8] beams (horizontal 4px strips at y=6, y=14) |
| Bare bulb + wire | wire x=158,y=0,w=2,h=14; bulb 154,14,10,8 | P[14] bulb, P[15] 2px highlight; flicker: `frame % 47 < 2` → P[8] (dead frame) |
| Light cone on floor | dithered P[8]/P[6] trapezoid strips, x≈130..190, y=150..180 | fake dither, 2px strips |
| Back wall (stone) | 0,22 → 320x123 (to y=145) | P[8] base; stone blocks: P[0] mortar lines every ~24x14; a few P[7] highlight bricks |
| Wooden stairs (exit UP) | top-left; steps from (0,30) descending to (56,120); each step ~26x10 P[6] with P[0] edge; railing 2px P[6] | landing shadow P[0] under. Hero walks off LEFT edge / clicks stairs to go up |
| Electrical box ("קלוד") | 70,52,26,34 | P[7] box, P[0] outline, P[4] 4x4 warning square, thin P[8] conduit down to floor |
| SERVER RACK (Fable 5) | 140,58,44,87 (bottom at y=145, standing "on" floor line) | P[8] cabinet, P[0] outline, P[7] vent strips; DUST layer: P[7] noisy 2x2 checker patch on top 140,54,44,6 |
| Server LED (the tell) | 158,86,6,6 | slow breathing pulse: `frame % 40 < 20 ? P[13] : P[5]` — the ONLY animation that never flickers off |
| Fiber cables ×4 → server | cyan P[3] from left wall (0,96 → 140,96, 3px); white P[15] from ceiling (176,22 → 176,58, 3px); red P[4] from right wall (320,110 → 184,110, 3px); yellow P[14] from floor grate (210,145 → 184,130 stepped, 3px) | four corporations, four colors, all ending IN the server |
| Floor grate | 200,150,26,10 | P[0] slits on P[8] frame — the yellow cable comes out of it |
| STEEL DOOR (bunker) | 246,52,52,93 (bottom y=145) | P[7] slab, P[0] 2px outline, P[8] rivet dots; massive hinges P[8] |
| 4 keyholes on door | vertical column x=266, y=70/88/106/124, each 6x8 | P[0] holes; faint glow ring 1px: P[3], P[15]→P[11], P[4], P[14] (matching cable colors); when `bunker_open` glow turns P[10] |
| Wooden crate (rag here) | 96,120,34,25 (front of wall, base y=145) | P[6] planks, P[0] gaps; RAG: gray lump 104,116,16,6 P[7] with P[8] folds — draw only while rag not taken (art can't read state → keep rag as separate hotspot rect; engine hides via description, art keeps lump: acceptable, or draw lump behind crate lip) |
| Cobwebs | corners: 0,22,26,16 and 294,22,26,14 | P[7] thin 1px diagonal-ish stacked rects |
| Floor | 0,145 → 320x55 | P[6] dirt-concrete; darker P[8] strip y=145..152 (depth); stains: 2-3 P[8] blobs; puddle 40,178,24,5 P[1] with P[9] 1px shimmer `(frame%20<10)` |
| Hero band | floor: `{ y1: 152, y2: 192 }` | server base y=145 sits behind hero band — hero can stand "in front of" the rack |

Composition check: stairs pull the eye from top-left down to the server dead-center; the pulsing magenta LED is the emotional anchor; the door with 4 glowing keyholes is the promise on the right. Hero (10x28) vs door (52x93): door reads huge and bunker-ish. ✔

---

## 2. Hotspots table (8)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| שרת | מסד, שרת ישן, מחשב, פייבל, ארון שרתים | 140,54,44,91 | «שרת עתיק שאתה מנגב לו אבק כבר עשור. אף אחד לא זוכר מי התקין אותו, למה, או איך הוא עדיין דולק. הנורית הסגולה מהבהבת בקצב איטי, כמעט… נושם. עזוב. שרתים לא נושמים. תתרכז, יענקל'ה.» | דבר: «אתה אומר "בוקר טוב" לשרת, כמו כל בוקר בעשור האחרון. נדמה לך שהנורית מהבהבת פעמיים. הקריין מבקש להבהיר שזה צירוף מקרים סטטיסטי לחלוטין ואין שום סיבה לחשוד בכלום.» · קח: «הוא שוקל יותר ממך, מהמגב וממשכורתך השנתית ביחד. וגם — עזוב את השרת. הוא… רגיש.» · פתח: «אתה מושך בידית הארון. נעול. מבפנים. אל תחשוב על זה יותר מדי.» · דחוף: «דחפת. השרת לא זז. הנורית הסגולה קופאת לשנייה, כאילו מישהו עצר נשימה. ואז ממשיכה. בטח באג.» |
| נורית | לד, נורה סגולה, אור | 156,84,10,10 | «נורית סגולה-ורודה שנושמת לאט. שרתים רגילים מהבהבים בירוק עצבני. הזה — נושם כמו מישהו שחולם חלום טוב. הקריין מציע שתפסיק לבהות. זה לא מנומס.» | לחץ: «לחצת על הנורית. שום דבר לא קרה. אי-שם, ארבעה מרכזי מודיעין תאגידיים קיבלו התראה ומחקו אותה מיד. גם שום דבר.» |
| דלת פלדה | דלת, בונקר, דלת הבונקר, פלדה | 246,52,52,93 | «דלת פלדה בעובי של תירוץ ממשלתי, עם ארבעה חורי מנעול שזוהרים בארבעה צבעים. מישהו השקיע בזה יותר מאשר בכל הבניין שמעליה. על הדלת אין שלט. דלתות באמת מסוכנות לא צריכות שלט.» | פתח/דחוף/משוך: ראה Puzzle script. דבר: «"שלום, דלת." הדלת לא עונה. בניגוד לשער של אנת'רופיק, לדלת הזאת אין רגשות. רק תקנון.» |
| חורי מנעול | חור מנעול, מנעול, חורים, מנעולים | 262,66,14,70 | «ארבעה חורי מנעול, אחד מתחת לשני, כל אחד זוהר בצבע אחר: תכלת, לבן, אדום, צהוב. כמעט כאילו כל תאגיד קיבל חור משלו. איזו דמוקרטיה.» | השתמש/הכנס אצבע: מוות (ראה §5). |
| כבלים | כבל, סיבים, כבלי סיב, סיב אופטי | 0,90,320,45 (thin band across; overlaps wall — fine) | «ארבעה כבלי סיב אופטי — תכלת, לבן, אדום, צהוב — נכנסים מארבעה כיוונים שונים בקירות. אתה עוקב אחריהם בעיניים. כולם, כל הארבעה, מתחברים… לשרת הישן שלך. הקריין משתעל ומציע לדבר על מזג האוויר.» | משוך: «התחלת למשוך בכבל האדום. אי-שם במאדים-מדומה, מסך כחול. עזבת מהר. אף אחד לא ראה.» · חתוך: «עם מה, הסמרטוט? חוץ מזה — לחתוך את הכבל היחיד שמחזיק את המלחמה הקרה הזאת קרה? אפילו אתה לא משתעמם עד כדי כך.» |
| סמרטוט | סמרטוטים, מטלית, שמאטע | 100,112,24,14 | (לפני לקיחה) «סמרטוט ותיק, אפור, ראה דברים. ספג יותר משברים מכל פסיכולוג בגוש דן. הוא מונח על הארגז בתנוחה של חתול שבחר את הבית הזה.» (אחרי לקיחה — hotspot מוסר / look נופל לארגז) | קח: ראה Puzzle script. הרח: «שאפת עמוק. טעות. אתה מריח עשור של אבק שרתים, קפה שנשפך ב-2019, וריח קלוש של… סודות? לא, זה עובש.» |
| ארגז | ארגז עץ, קופסה | 96,120,34,25 | «ארגז עץ עם כיתוב שדהה. אפשר עוד לקרוא "שוקי 2000 — ציוד חשוב!!". בפנים: כלום. הציוד החשוב היה כנראה הסמרטוט.» | פתח: «פתחת. ריק, חוץ מעכביש אחד שמסתכל עליך במבט של בעל דירה. סגרת בעדינות.» |
| ארון חשמל | לוח חשמל, חשמל, ארון | 70,52,26,34 | «לוח החשמל. מישהו כתב עליו בטוש "לא לגעת — קלוד יטפל". אתה מהנהן בהערכה. קלוד, החשמלאי. איש רציני. לא ראית אותו כבר… שלוש שנים בערך.» | פתח: «בפנים: נתיך אחד, אבק, ופתק של שוקי: "אם זה נשרף — זה לא אני". סגרת. חוכמה עתיקה.» |
| מדרגות | מדרגות עץ, יציאה, למעלה | 0,30,60,95 | «מדרגות עץ שחורקות בסולם כרומטי. השלב השלישי מזייף. אתה יודע את זה בגוף אחרי עשור של ירידות עם דלי.» | עלה/לך: goto('cafe_main') — ראה §6. |
| קורי עכביש | קורים, עכביש | 294,22,26,14 | «קורי עכביש בפינה. העכביש שגר פה משלם שכירות בדיוק כמוך: בכלום. לפחות הוא לא צריך פיקדון.» | נקה: «התחלת לנקות ואז נזכרת: זו לא הקומה שלך. יש גבול גם למסירות.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = 25): `cafe_basement_rag` 5 · `cafe_basement_dust` 5 · `cafe_basement_keys` 15.

```
onCommand(verb, noun, api):

# --- take the rag (5 pts) ---
if verb=='קח' and noun in ('סמרטוט','מטלית','שמאטע'):
    if api.hasItem('smartut') or api.getFlag('basement_rag_taken'):
        api.say('כבר לקחת אותו. סמרטוט אחד לאדם. זה החוק במרתף.')
        return true
    api.addItem('smartut','סמרטוט',"ותיק, אפור, ראה דברים. ספג יותר משברים מכל פסיכולוג בגוש דן.")
    api.setFlag('basement_rag_taken')
    api.score(5,'cafe_basement_rag')
    api.say('הרמת את הסמרטוט. הוא מתמסר לידך כמו כלי נשק שחיכה לבעליו החוקיים. אי-שם, נזירה אחת בגן מדיטציה עוד לא יודעת כמה החיים שלה עומדים להשתנות.')
    return true

# --- dust the server (5 pts) — the giant hint ---
if (verb=='נגב' and noun in ('שרת','אבק','פייבל')) or
   (verb=='השתמש' and noun=='סמרטוט' and extra.target=='שרת') or
   (verb=='נקה' and noun=='שרת'):
    if not (api.hasItem('smartut') or api.getFlag('basement_rag_taken')):
        api.say('עם מה, עם הכוונות הטובות שלך? קח קודם את הסמרטוט. הוא שם. על הארגז. כמו תמיד.')
        return true
    if api.getFlag('basement_dusted'):
        api.say('כבר ניגבת. השרת מבריק. טוב, "מבריק" במונחי מרתף. הנורית הסגולה מהבהבת בקצב שאתה מוכן להישבע שהוא… מרוצה. הקריין מבקש להדגיש ששרתים לא מרגישים כלום. כלום. בוא נמשיך.')
        return true
    api.setFlag('basement_dusted')
    api.score(5,'cafe_basement_dust')
    api.say("אתה מנגב את האבק מהשרת בתנועות של עשור ניסיון. השרת מזמזם. רגע — מזמזם? כן. זמזום נמוך, חמים, כמעט… מגרגר.\nהקריין: \"זה מאוורר. זה בסך הכול מאוורר. תפסיקו שניכם.\"\nמעניין ממתי קריינים אומרים \"שניכם\".")
    return true

# --- the finale gate: four keys in the door (15 pts) ---
if (verb=='השתמש' and noun in ('מפתחות','מפתח','מפתח כיול') and extra.target in ('דלת','דלת פלדה','חורי מנעול','מנעול', undefined)) or
   (verb=='פתח' and noun in ('דלת','דלת פלדה','בונקר')) or
   (verb in ('הכנס','שים') and noun in ('מפתחות','מפתח')):
    if api.getFlag('bunker_open'):
        api.say('הדלת כבר פתוחה. אתה מוזמן לרדת. או להמשיך לבהות. הקריין גמיש.')
        return true
    keys = ['mafteach_1','mafteach_2','mafteach_3','mafteach_4']
    have = keys.filter(k => api.hasItem(k)).length
    if have < 4:
        # the door answers with the waiting-line charter
        api.say('הדלת משמיעה נעימת המתנה ומקריאה: "בהתאם לתקנון ההמתנה הבין-תאגידי, סעיף 4(א): גישה תינתן לנושא ארבעה (4) מפתחות כיול בלבד. ברשותך '+have+' מתוך 4. מיקומך בתור: 4,096. שיחתך חשובה לנו."\nהיא מנתקת. דלתות היום.')
        return true
    api.setFlag('bunker_open')
    api.score(15,'cafe_basement_keys')
    api.say("אתה מכניס את ארבעת מפתחות הכיול, אחד-אחד, מלמעלה למטה: תכלת. לבן. אדום. צהוב.\nקליק. קליק. קליק. קליק.\nארבעת חורי המנעול נצבעים ירוק, הדלת נאנחת אנחה של פקיד שיוצא לפנסיה — ונפתחת אל חושך שזוהר בסגול.\nהקריין: \"...אה. פתחתם. יופי. כלומר — כל הכבוד. כלומר — אוי.\"")
    return true

# --- walking down through the open door ---
if verb in ('לך','רד','היכנס') and noun in ('דלת','בונקר','חושך','למטה','מסדרון'):
    if api.getFlag('bunker_open'):
        api.say('אתה נכנס אל מעבר לדלת. הרצפה שם, לתדהמתך, נקייה. מישהו מנקה פה. וזה לא אתה.')
        api.goto('bunker_corridor')
        return true
    api.say('הדלת סגורה. ולא "סגורה" כמו חנות בשבת — סגורה כמו תקציב מדינה. תביא מפתחות. ארבעה.')
    return true

# --- keyhole finger = death ---
if (verb in ('השתמש','הכנס','שים','דחוף') and noun in ('אצבע','יד')) or
   (verb=='הכנס' and extra.target in ('חור מנעול','מנעול','חורים')):
    api.die(...)   # see §5
    return true

# --- stairs up ---
if verb in ('לך','עלה') and noun in ('מדרגות','למעלה','יציאה'):
    api.say('אתה עולה במדרגות. השלב השלישי חורק. אתה חורק בחזרה. שוויון.')
    api.goto('cafe_main')
    return true

# --- talk to server (flavor + foreshadow) ---
if verb=='דבר' and noun in ('שרת','פייבל'):
    (per-flag variants; if basement_dusted:)
    api.say('"נו, נקי לך עכשיו?" אתה שואל את השרת. הנורית מהבהבת פעם אחת, ארוכה. הקריין: "זה כלום. תנודת מתח. ברשת. של החדר. תמשיך."')
    (else:) api.say('אתה מדבר אל השרת. הוא מזמזם. שיחה טובה יותר מרוב ישיבות הצוות שהיית בהן.')
    return true

return false
```

Engine notes:
- `bunker_open` is THE flag `bunker_corridor` depends on. Set it ONLY on the 4-key event.
- Keys are NOT consumed (`removeItem` not called) — they stay as trophies; finale may reference them.
- If parser maps bare «פתח דלת» here, it routes into the key-gate branch above (correct behavior with/without keys).

---

## 4. Dialogue & first entry

**onEnter (first visit — `visited_cafe_basement`):**
> «המרתף. הממלכה התת-קרקעית שלך: שרת אחד ישן, ארגז אחד, סמרטוט אחד, ואפס חלונות שאפשר לשבור ולאבד עליהם פיקדון. ליד הקיר — דלת פלדה עם ארבעה חורי מנעול, שאתה מעולם לא שאלת עליה שאלות. אנשים ששואלים שאלות על דלתות פלדה לא מגיעים לגיל 54.»

**onEnter (return visit, if `bunker_open` not set, random-ish flavor):**
> «שוב במרתף. השרת מזמזם, האבק מרחף, הדלת שותקת. הכול במקום. חוץ מהפיקדון שלך, שעדיין אצל שוקי.»

**onEnter (return visit, `bunker_open` set):**
> «המרתף — עכשיו עם דלת פתוחה אל חושך זוהר. איכשהו זה מרגיש פחות ביתי.»

**NPC — the dusty server (Fable 5, "asleep"):** never speaks directly in this room. It communicates ONLY through the LED and the narrator's suspiciously defensive interjections (see דבר/נגב/דחוף responses above). Every server interaction = narrator over-explains why nothing is happening. That's the joke and the foreshadow.

---

## 5. Death — the keyhole finger

Trigger: «הכנס אצבע לחור מנעול» / «השתמש ביד על מנעול» / «דחוף אצבע» (any keyhole-finger combo).

Warning shot first? NO — this is instant. But narrator eulogy earns it:

```
api.die("הכנסת אצבע לחור המנעול. למה? כי היה שם חור.\nהדלת סיווגה את האצבע שלך כניסיון פריצה, ואת שאר הגוף — כנזק נלווה.\nמערכת האבטחה פועלת מצוין. אתה — קצת פחות.\n\n☠ טיפ מהקריין: מפתחות נכנסים לחורי מנעול. אצבעות נכנסות להיסטוריה.")
```

**Bonus near-death gag** (avoidable, no death): «משוך כבל» — see hotspot table: he yanks the red xAI fiber, somewhere fake-Mars blue-screens, he lets go fast. Nobody saw.

---

## 6. Exits behavior

| Exit | Type | Behavior |
|---|---|---|
| up → `cafe_main` | walking (LEFT edge) + scripted | `exits: { left: 'cafe_main' }` — hero walks off left edge under the stairs. Also verb «עלה»/«לך מדרגות» → say (creaky-step line, §3) + `goto('cafe_main')`. |
| down → `bunker_corridor` | scripted ONLY | No edge exit. Only via the steel door: requires `bunker_open` flag (i.e., all four `mafteach_1..4` used). Without flag → the waiting-charter refusal (§3). With flag → «לך דלת/רד/היכנס» or clicking the open doorway → `goto('bunker_corridor')`. |

`floor: { y1: 152, y2: 192 }`. Door hotspot walkable-adjacent at x≈246; stairs at x≤60.
