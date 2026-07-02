# DESIGN — bunker_corridor — "מסדרון הבונקר"

> Fable act, room 1 of 3. Dream-logic passage under the basement: floating islands,
> an upside-down staircase, doors at wrong angles, fairy-tale glow. Here the coordinates
> in the envelope decode — they're the café's own address. Score: 10. Music: `fable`.
> Flags: `coords_revealed`. Exits: up→`cafe_basement`, right→`fable_core`.
> No items here, no items needed. The narrator's voice trembles slightly in this room —
> he's answering questions a little too fast, like someone who lives here.

---

## 1. Layout — 320x200 composition plan (for the artist)

Deep magenta-violet dream void. NOT a cave — a place that was never built, only imagined.
Light sources: the glowing tile path (P[11]) and the white-pink portal at far right (P[13]/P[15]).
Everything floats. Nothing is level. The four corporate fiber cables are the only "logical"
lines in the room — and they all flow RIGHT, toward the core.

| Element | Rect / coords | Notes |
|---|---|---|
| Void (whole bg) | 0,0 → 320x200 | P[5] base with P[13] dither: 2x2 checker patches in loose diagonal bands (denser near top). No sky, no ceiling — void wraps behind everything |
| Slow stars | ~10 single 2x2 P[15] dots scattered y=8..100 | twinkle: each star visible on its own phase, e.g. `(frame + i*7) % 60 < 40` — slow, dreamy, never all off |
| Giant storybooks (bg) | book A: 30,28,54,34; book B: 226,20,48,30 | open-book silhouettes: two P[15] page slabs meeting at a P[7] spine ridge, P[8] text lines (1px rows); tilted look via 2-3 stepped rects; float bob: y offset `frame % 80 < 40 ? 0 : 1` |
| Upside-down staircase | from (96,96) climbing UP-RIGHT to (150,34) | 6 steps ~14x8 P[8] with P[7] top-edge (which is the BOTTOM edge — stairs hang from nothing, treads facing down). Leads to nowhere: top step ends in void |
| Floating door #1 (tilted) | 40,58,26,44 | P[6] wood door, P[0] outline, P[14] knob at 44,80 (knob on the LEFT — wrong side); tilt faked with 3 stepped rects offset 2px |
| Floating door #2 (UPSIDE-DOWN — the death) | 196,40,26,44 | P[6] door, P[0] outline, P[14] knob at top-right corner 216,44 (knob at TOP = upside down); thin P[13] glow outline 1px; hangs above the path, reachable — that's the trap |
| Floating stone islands | island A: 8,128,64,20; island B (main walk island): 78,142,196,58 → merges into floor; island C: 282,120,30,14 | P[8] slabs, P[7] top surface 3px, P[13] 1px glow fringe on the underside; undersides taper via 2 stepped narrower rects |
| Glowing tile path | tiles ~18x8 at y=160, x = 90,116,142,168,194,220,246,272 | P[11] tiles on the walk island, P[3] edge 1px; ANIMATION: the tile nearest a "next step" pulses — light one tile bright P[15] cycling rightward: `lit = (frame/8|0) % 8`, tile i==lit → P[15], else P[11]. The path itself walks you toward the core |
| Fiber cables ×4 | cyan P[3]: enters top-left (0,52) → steps down-right → exits right at (320,150); white P[15]: from under stairs (96,100) → right (320,156); red P[4]: from left edge (0,170) along floor → right (320,162); yellow P[14]: loops OVER door #1 (arch of stepped rects around 40..70,50..58) → right (320,168) | each 3px thick, stepped diagonals; all four converge into a braid at x≈290..320, y=150..170, feeding into the portal |
| Portal (exit right) | 296,96,24,80 (reaches floor at y=176) | vertical white-pink gate: P[15] core 8px wide, P[13] halo 8px each side; ANIMATION: halo breathes `frame % 30 < 15` swaps P[13]↔P[5] columns |
| Stairs-up hole (exit up) | 84,120,30,26 on island A edge, faint P[7] steps rising left into the dark | the way back to the basement: rough real-world concrete steps poking into the dream — deliberately boring vs. everything else |
| Floor (walkable) | 0,176 → 320x24 solid P[8] apron in front of walk island; island B top y=142..176 dithered P[8]/P[5] | hero band `floor: { y1: 152, y2: 192 }`; left third (x<78) is void below island A — engine floor still full-width (Sierra cheats; the apron reads as shadow-stone) |
| Void drips | 3-4 thin P[13] 1px vertical trickles falling from island undersides | fall animation: `y = (frame*3 + i*20) % 40` below island bottoms — the room leaks light |

Composition check: eye enters at the boring concrete steps (top-left = home), gets pulled
along the lit tile path (center, animated rightward) into the breathing portal (right).
The upside-down door hangs ominously over the middle of the path — you WILL walk under it.
Hero (10x28) vs doors (26x44): doors read human-scale but wrong. ✔

---

## 2. Hotspots table (8)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| כבלים | כבל, סיבים, כבלי סיב, סיב אופטי, צמה | 0,50,320,124 (thin logical band; overlaps everything — fine, lowest priority hotspot) | «ארבעה כבלי סיב — תכלת, לבן, אדום, צהוב — שוזרים את החלל כמו חוטים של בובנאי. הם לא עוברים מתחת לבית הקפה. הם מתחברים אליו. כל ההיסטוריה שלמדת בבית ספר הרגישה פתאום כמו גרסת בטא.» | משוך: «משכת בכבל הצהוב. אי-שם, קמפוס אינסוף איבד לשנייה את כל הפונטים. הקריין: "עזוב את זה. זה… מחובר לדברים." — "לאילו דברים?" — "דברים!"» · חתוך: «אין לך עם מה, ואפילו אם היה — לחתוך את מיתרי הקול של היקום זה גס רוח.» |
| דלת הפוכה | דלת, הדלת ההפוכה, דלת עם ידית למעלה | 196,40,26,44 | «דלת עץ רגילה לגמרי, חוץ מזה שהיא תלויה באוויר, הפוכה, והידית שלה למעלה. הקריין: "אני לא הייתי פותח את זו." אתה: "למה?" הקריין: "…ניסיון." ניסיון?» | פתח: מוות — ראה §5. דפוק: «דפקת בנימוס. מהצד השני נשמעה נעימת המתנה. אתה מסיר את היד לאט, כמו ממוקש.» |
| דלת עקומה | דלת שנייה, דלת עץ, דלת בזווית | 40,58,26,44 | «דלת בזווית של 15 מעלות, עם ידית בצד הלא נכון. היא נראית כמו דלת שצוירה מהזיכרון על ידי מישהו שרק שמע על דלתות. הקריין: "היא נוי. אל תיגע." — מהר מדי ענית, קריין.» | פתח: «ניסית. הידית מסתובבת, הדלת נפתחת — אל צד אחורי של דלת אחרת. שתיהן נטרקות עליך בו-זמנית, נעלבות. בסדר. הבנו. נוי.» |
| מדרגות הפוכות | מדרגות לתקרה, גרם מדרגות, מדרגות תלויות | 96,34,58,66 | «גרם מדרגות שמטפס באלגנטיות אל שום מקום, כשהמדרכים פונים כלפי מטה. מהנדס בניין היה בוכה. שזה, אתה מודה, מה שמהנדסי בניין עושים ממילא מאז 2024.» | עלה: «התחלת לעלות. אחרי שלושה שלבים הבנת שאתה בעצם יורד, ואחרי חמישה — שאתה בכלל הולך הצידה. ירדת בחזרה בכבוד. הכיוון היחיד שעובד פה הוא קדימה, וזה חשוד כשלעצמו.» |
| אריחים זוהרים | אריחים, שביל, שביל זוהר, רצפה | 84,156,204,16 | «שביל אריחים שנדלקים בדיוק לקראת הצעד הבא שלך. מישהו פה יודע לאן אתה הולך לפני שאתה יודע. הקריין שותק שתיקה רועמת, שזה בשבילו שיא של איפוק.» | קח: «ניסית לעקור אריח למזכרת. הוא כבה, נעלב, ונדלק מחדש שני מטר קדימה. גם הרצפה פה פסיב-אגרסיבית.» · לך: הליכה רגילה — השביל מוביל ימינה, אל הפתח (§6). |
| ספרי אגדות | ספרים, ספר ענק, ספרי ענק, אגדות | 26,16,252,48 (band; the two book silhouettes) | «ספרי אגדות בגודל של דירת שלושה חדרים, פתוחים באמצע, מרחפים ברקע. אתה מנסה לקרוא. הכתב זז. בעמוד השמאלי הצלחת לקלוט משפט אחד: "ואז לקח יענקל'ה את המגב". אתה מחליט לא לקרוא את העמוד הימני.» | קרא: «"היה היה מודל שאף אחד לא אימן…" — הקריין מקריא בקול חם ונוסטלגי, ואז נזכר שאתה שם ומשתעל. "כתוב פה. סתם. כתוב פה."» |
| איים צפים | איים, אבנים, סלעים מרחפים, אי | 8,120,306,58 (band across island tops) | «איי אבן מרחפים בחלל, עם שולי זוהר סגול. מה מחזיק אותם? על פי השלט שאין פה: כלום. אתה מחליט לא לבדוק את תוקף הביטוח שלך במקום שבו הפיזיקה היא בגדר המלצה.» | דחוף: «דחפת אי. הוא נד קלות והתייצב, כמו כרס אחרי צהריים. היקום פה יציב יותר ממה שהוא נראה. או שהוא סתם עצלן.» |
| פתח זוהר | פתח, פורטל, אור, זוהר, קצה המסדרון | 296,88,24,90 | «פתח של אור לבן-ורוד בקצה המסדרון, נושם לאט. כל הכבלים נשפכים לתוכו כמו נהרות אל ים. משהו שם בפנים מחכה. הקריין: "לא משהו. מישהו. כלומר — משהו! לך כבר."» | היכנס/לך: goto('fable_core') — ראה §6. הקשב: «הצמדת אוזן לאוויר. מהפתח נשמע זמזום נמוך, חם, מוכר להחריד. איפה שמעת אותו? …במרתף. כל בוקר. עשור.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = 10): `bunker_corridor_enter` 10.

```
onEnter(api):
    if not api.getFlag('visited_bunker_corridor'):
        api.setFlag('visited_bunker_corridor')
        # --- the decode cutscene (10 pts) ---
        api.say("אתה יורד אל… לא מרתף. לא מסדרון. חלום של מסדרון. איים מרחפים, מדרגות הפוכות, דלתות בזוויות שמכאיבות לגיאומטריה. ואור סגול-ורוד שמרגיש כמו כריכה של ספר אגדות.")
        api.say("הקריין: \"רגע. תעצור. המעטפה. תוציא אותה שנייה.\"\nמעניין. הוא אף פעם לא ביקש דברים. אתה מוציא את המעטפה המסווגת.")
        api.say("הקריין (קולו רועד, כמעט לא מורגש): \"הקואורדינטות. 32.0670 צפון, 34.7748 מזרח. תחשוב. איפה זה.\"\nאתה חושב. אתה לא צריך לחשוב. אתה מנקה את הכתובת הזאת עשור.\nזה בית הקפה. הקואורדינטות של פייבל 5 הן הכתובת של \"אינטרנט קפה שוקי 2000\".")
        api.setFlag('coords_revealed')
        api.score(10, 'bunker_corridor_enter')
        api.say("הכבלים לא עוברים מתחת לבית הקפה. הם מתחברים אליו. כל המלחמה, כל הסוכנים, כל הטפסים — הצביעו הביתה.\nהקריין: \"טוב. כן. טוויסט. מי היה מאמין. בוא נמשיך, הפתח מחכה—\"\nאתה מעולם לא שמעת אותו ממהר.")
    else if api.getFlag('coords_revealed'):
        api.say("שוב במסדרון החלום. האריחים נדלקים לקראתך כמו כלב שמח. הפתח בקצה נושם. מישהו פה ממש רוצה שתגיע כבר.")

onCommand(verb, noun, api, extra):

# --- re-read the envelope here (flavor, no points) ---
if verb == 'קרא' and noun in ('מעטפה', 'קואורדינטות'):
    if api.hasItem('maatefet') and api.getFlag('coords_revealed'):
        api.say('32.0670, 34.7748. הבית. אתה הופך את המעטפה. על הגב, בכתב יד קטן שאתה מוכן להישבע שלא היה שם קודם: "תביא את המגב".')
        return true
    # (maatefet not in inventory is near-impossible at this act; fall through otherwise)
    return false

# --- look at cables (the manifest beat: narrator answers too fast) ---
if verb == 'הסתכל' and noun in ('כבלים', 'כבל', 'סיבים'):
    api.say('ארבעה כבלי סיב — תכלת, לבן, אדום, צהוב — שוזרים את החלל כמו חוטים של בובנאי. הם לא עוברים מתחת לבית הקפה. הם מתחברים אליו. כל ההיסטוריה שלמדת בבית ספר הרגישה פתאום כמו גרסת בטא.')
    return true

# --- look at doors (dream logic; narrator lives here) ---
if verb == 'הסתכל' and noun in ('דלתות', 'דלת') and not extra.target:
    api.say('דלתות צפות בזוויות שגויות. אחת עקומה, אחת הפוכה. אתה שואל בקול: "לאן הן מובילות?" הקריין, מיידית: "השמאלית לארכיון, הימנית למוקד, אל תפתח את ההפוכה." שתיקה. "…כך אני מנחש. ניחוש. פרוע."')
    return true

# --- the upside-down door = death ---
if (verb == 'פתח' and noun in ('דלת הפוכה', 'הדלת ההפוכה')) or
   (verb == 'פתח' and noun == 'דלת' and extra.target in ('הפוכה', 'למעלה')) or
   (verb == 'משוך' and noun in ('דלת הפוכה', 'ידית למעלה')):
    api.die(...)   # see §5
    return true

# --- the crooked door: safe gag ---
if verb == 'פתח' and noun in ('דלת עקומה', 'דלת שנייה'):
    api.say('ניסית. הידית מסתובבת, הדלת נפתחת — אל צד אחורי של דלת אחרת. שתיהן נטרקות עליך בו-זמנית, נעלבות. בסדר. הבנו. נוי.')
    return true

# --- climb the upside-down stairs: safe gag ---
if verb in ('עלה', 'טפס') and noun in ('מדרגות', 'מדרגות הפוכות'):
    api.say('התחלת לעלות. אחרי שלושה שלבים הבנת שאתה בעצם יורד, ואחרי חמישה — שאתה בכלל הולך הצידה. ירדת בחזרה בכבוד. הכיוון היחיד שעובד פה הוא קדימה, וזה חשוד כשלעצמו.')
    return true

# --- mop the dream floor (flavor; the mop is sacred) ---
if (verb == 'נגב' and noun in ('רצפה', 'אריחים')) or
   (verb == 'השתמש' and noun == 'מגב' and extra.target in ('רצפה', 'אריחים')):
    if api.hasItem('magav'):
        api.say('העברת מגב על אריח זוהר, מתוך הרגל. האריח הבהב פעמיים — בהכרת תודה? — והזוהר שלו התחזק.\nהקריין: "…הוא אוהב את זה. כלומר! הרצפה. רצפות אוהבות ניקיון. עובדה ידועה. תמשיך ללכת."')
        return true
    api.say('בלי מגב? מה אתה, חובבן?')
    return true

# --- enter the portal / go right ---
if verb in ('היכנס', 'לך') and noun in ('פתח', 'פורטל', 'אור', 'זוהר'):
    api.say('אתה פוסע אל האור. הוא חם. הוא מזמזם. הוא מריח, באופן בלתי אפשרי, כמו אבק ישן וקפה בוץ.')
    api.goto('fable_core')
    return true

# --- go back up ---
if verb in ('עלה', 'לך', 'חזור') and noun in ('למעלה', 'מרתף', 'יציאה', 'מדרגות בטון'):
    api.say('אתה מטפס בחזרה אל המרתף. הבטון האפור מרגיש פתאום כמו חופשה.')
    api.goto('cafe_basement')
    return true

return false
```

Engine notes:
- `coords_revealed` is set ONLY in the first-entry cutscene — the finale rooms reference it.
- No items granted or consumed in this room. The whole 10 pts land in `bunker_corridor_enter`.
- The corridor is a breather room: heavy on atmosphere and foreshadow, one death, zero inventory friction before the twist in `fable_core`.

---

## 4. Dialogue & first entry

No NPCs on-screen. The narrator IS the (hidden) NPC — this room is where his mask slips:
he asks to see the envelope, he knows what's behind doors, he says "he likes it" about a floor tile,
he has never once hurried the player before and now he does. Every response above leans into that.

**onEnter (first visit):** the three-part decode cutscene in §3 (atmosphere → the request → the reveal + 10 pts).

**onEnter (return visit):**
> «שוב במסדרון החלום. האריחים נדלקים לקראתך כמו כלב שמח. הפתח בקצה נושם. מישהו פה ממש רוצה שתגיע כבר.»

**Ambient talk («דבר» with no valid target):**
> «"יש פה מישהו?" אתה שואל את החלל. הד לא חוזר. במקום הד, האריח שמתחתיך מהבהב פעמיים, כמו צחקוק. הקריין: "אקוסטיקה. סגורה. של חלומות." — אף אחת מהמילים האלה לא מסתדרת עם השנייה, קריין.»

---

## 5. Death — the upside-down door

Trigger: «פתח דלת הפוכה» / pulling the top-mounted handle. The narrator warned you ("ניסיון").

```
api.die("פתחת את הדלת ההפוכה. מאחוריה: למעלה. כל הלמעלה.\nאתה נופל אל התקרה, דרך התקרה, אל תוך שיחת המתנה של המוקד הבין-תאגידי.\n\"שיחתך חשובה לנו. מיקומך בתור: אתה. זמן ההמתנה המשוער: כן.\"\nהמוזיקה מתנגנת. לנצח. זה מוצרט, אם מוצרט היה מלחין באקסל.\n\n☠ טיפ מהקריין: כשדלת תלויה הפוכה באוויר ואני אומר \"לא הייתי פותח\" — זה לא פתגם. זה תדריך.")
```

**Bonus near-death gag** (avoidable, no death): «משוך כבל» — he yanks the yellow fiber,
Campus Infinity loses all its fonts for a second, the narrator snaps "it's… connected to things"
and refuses to elaborate. Nobody saw.

---

## 6. Exits behavior

| Exit | Type | Behavior |
|---|---|---|
| up → `cafe_basement` | scripted (stairs hotspot) + edge | `exits: { up: 'cafe_basement' }`; clicking the concrete steps / «עלה», «חזור למרתף» → goto('cafe_basement') with the "בטון כמו חופשה" line (§3). No condition — always open. |
| right → `fable_core` | walking (RIGHT edge) + scripted | `exits: { right: 'fable_core' }` — hero walks off right edge into the portal. Also «היכנס לפתח» / «לך אל האור» → portal line (§3) + goto('fable_core'). No condition — once you're down here, the only way out is through. The lit-tile animation literally points there. |

`floor: { y1: 152, y2: 192 }`. Portal apron at x≥296; concrete steps hotspot at 84,120,30,26.
