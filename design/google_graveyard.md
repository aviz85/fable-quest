# DESIGN — google_graveyard · בית הקברות של המוצרים

Act: google · Music: google · Score total: **25** (20+5)
Exits (manifest, law): down→`google_corridors`
Items here: `mafteach_4` · Items needed: `tofes_bitul` · Flags set here: `ggrave_ritual_done`
Cross-room contract (inputs from other rooms): the resurrection ritual requires `tofes_bitul`
(google_lobby) carrying BOTH `vaada_ishur` (google_meeting) AND `chatima_tzachi`
(google_corridors). Without both flags the ghost rejects the paperwork.

---

## 1. Layout — 320x200 composition plan

Night-time inner courtyard: rows of white product tombstones under a dark sky, a grand
"GOOGLE KEYS" tombstone at center with a carved keyhole, the translucent ghost of Google
Reader hovering above it, low fog drifting between the graves.
Floor band: **y=145–200** (floor.y1=150, y2=192). Hero 10x28.

| Element | Coords (x,y,w,h) | Notes for artist |
|---|---|---|
| Night sky | 0,0,320,72 | P[0] base, P[1] band at 0,52,320,20 (city glow); 6-8 star pixels P[15], two blink `frame%20<4` / `frame%26<5` |
| Moon | 284,10,14,14 | P[15] block with P[7] crater pixel (288,14,3,3) — small, in the corner, embarrassed |
| Campus back wall (silhouette) | 0,58,320,34 | P[8] dark mass, window pixels P[0] every 14px; ONE window lit P[14] (208,66,6,8) that flickers `frame%30<6` — someone still works late on a product that will die |
| Weeping willow tree | 14,44,58,100 | Trunk P[8] (36,96,8,48); canopy stepped P[2] rects drooping down (14,44,58,30 then narrowing strands 18,74,4,50 / 30,78,4,58 / 46,74,4,54 / 60,78,4,48); one strand sways 1px `frame%16<8` |
| Garden lamps | 88,96,6,50 and 246,96,6,50 | P[8] posts, lamp heads 86,90,10,8; left lamp P[14] steady-dim, right lamp DEAD except a sad blink `frame%40<3` (P[6]) |
| **Back tombstone row** | y=112, h=14: 96,112,12,14 · 120,112,12,14 · 200,112,12,14 · 226,112,12,14 · 254,112,12,14 | P[7] stones, P[15] top highlight 1px; tiny logo-block pixel on each (P[4]/P[1]/P[14]/P[2] alternating) |
| **Mid tombstone row** | y=124, h=20: 78,124,16,20 · 110,124,16,20 · 212,124,16,20 · 246,124,16,20 | P[7]/P[15] stones; logo blocks 2x2; the 110 stone leans 1px (drawn offset) — even the graves are deprecated |
| **GOOGLE KEYS grand tombstone** | 138,90,44,56 | P[15] slab, P[7] shading right edge (176,90,6,56); arched top: 142,86,36,4 + 148,82,24,4; carved keyhole P[0] at 156,108,8,10 + 158,118,4,6; inscription lines P[8] (142,96,36,2 / 142,100,28,2); base plinth 134,142,52,6 P[7] |
| **Ghost of Google Reader** | 148,54,24,28 | P[11] body with P[15] core (154,58,12,16), wavy hem (3 teeth of 6x4 at y=78); hollow P[1] eyes 2x2; floats: whole sprite shifts ±2px vertically `frame%24` cycle; carries a tiny P[15] RSS pixel-icon (168,60,4,4) |
| **Key rises after ritual** | 158,100,8,12 (drawn only if flag `ggrave_ritual_done` and not taken) | P[14] key glowing, P[15] halo pixel blinks `frame%8<4`, hovering in the crack |
| **Google+ grave (front-left, DANGER)** | stone: 52,146,20,26 at 52,146; grave mound: 48,172,30,12 | P[7] stone with big P[4]+P[1] plus-sign blocks (58,152,8,2 + 61,149,2,8); mound P[8] with P[0] cracks — the dirt looks... hungry. Faint P[1] glow pixel pulses `frame%18<4` |
| **Front-right tombstone (Stadia)** | 250,150,22,30 | P[7] stone, P[4]/P[15] gamepad-ish blocks; plastic wreath at base 252,178,16,6 — P[2] faded ring with P[4] flower pixels, one petal pixel missing |
| **Fog layer** | strips at 138,140/152/164, each 320 wide, h=4-6 | P[7] semi-strips with gaps; scroll: `x=(frame*1)%320` offset, wrap around. Second strip scrolls opposite direction at half speed |
| Ground | 0,145,320,55 | P[2] dark lawn base, P[8] patches (mowed by a robot that was discontinued) |
| **Gravel path** | 150,145,20,55 widening to 138,180,44,20 | P[7] with P[8] speckle pixels; leads from the grand tombstone down to the bottom exit |
| Exit doorway (down→corridors) | 140,196,40,4 | P[0] threshold strip at very bottom of the path; hero walks off y>192 center |

Animations (mandatory ≥1): ghost bob, fog scroll (two directions), star blink, dead lamp
sad-blink, lit office window flicker, Google+ grave pulse, key halo (post-ritual).

---

## 2. Hotspots table (9)

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | רוח | רוח רפאים, רוח הרפאים, רידר, גוגל רידר, ריידר | 144,50,32,36 | «רוח הרפאים של גוגל רידר. שקופה, אצילית, ועדיין מסונכרנת. מיליוני משתמשים אהבו אותה, אז ברור שהיא מתה. ככה זה עובד פה.» | דבר ← dialogue A (סעיף 4). תן (טופס) ← טקס ההחייאה (סעיף 3). קח ← «לקחת רוח רפאים? יש לה כבר בעלים: הנוסטלגיה של האינטרנט כולו.» הכה ← «העברת יד דרך אקטופלזמה. עכשיו היד שלך קוראת RSS. אין תרופה.» |
| 2 | מצבת המפתחות | מצבה גדולה, גוגל קיז, מצבת גוגל קיז, Google Keys, מצבת המפתח | 134,82,52,66 | «'GOOGLE KEYS · 2017–2019 · פתח דלתות. נסגר.' מוצר שכל תפקידו היה לפתוח דברים — ננעל לנצח. מישהו חקק בתחתית: 'עבד מצוין. לכן.'» | פתח ← «דחפת אצבע לחור המנעול החקוק. המצבה לא נפתחה, אבל האצבע שלך קיבלה עדכון תנאי שימוש.» השתמש ← «חור מנעול בלי מפתח. מפתח בלי מוצר. מוצר בלי חיים. ברוך הבא לגוגל.» |
| 3 | מפתח | מפתח כיול, מפתח 4, מפתח כיול מס' 4, המפתח | 154,96,16,20 | לפני הטקס: «אתה מסתכל על חור המנעול. אין שם מפתח. יש שם הבטחה למפתח, וזה הכי גוגל שיש.» אחרי: «מפתח כיול מס' 4 מרחף בסדק, זוהר באור חיוור של פיצ'ר שקם מהמתים. על הידית: 'Deprecated'.» | קח ← puzzle (סעיף 3): לפני `ggrave_ritual_done` ← אין מה לקחת + רמז; אחרי ← addItem + 5 נק'. |
| 4 | מצבות | מצבה, קברים, קבר, בית קברות, שורות | 76,110,60,36 (וגם 196,110,80,36 — same logic) | «סיור בין המפורסמים: רידר. גוגל+. סטדיה. אינבוקס. וייב. פיקאסה. אלו. המשותף לכולם: משתמשים שאהבו אותם, ומצגת רבעונית שלא. על אחת המצבות חקוק רק: 'הוא היה בבטא'. כולן היו בבטא.» | קרא ← «'כאן נח INBOX. הוא סידר לך את המייל. סידרו אותו.' אתה מפסיק לקרוא. יש גבול כמה עצב נכנס במשמרת אחת.» קח ← «לסחוב מצבה? הגב שלך הגיש התנגדות, והפעם אתה מקבל אותה.» |
| 5 | קבר גוגל+ | גוגל פלוס, גוגל+, פלוס, הקבר הזוהר | 46,144,34,42 | «קבר גוגל+. האדמה עליו זזה קלות, כאילו משהו שם עדיין מנסה להוסיף אותך למעגלים. הקריין ממליץ, לשם שינוי ברצינות: אל תדרוך.» | לך/דרוך/גע ← ☠ DEATH A (סעיף 5). דחוף ← «דחפת את המצבה. היא שלחה לך בקשת חברות. סירבת. היא נעלבה. עדיף ככה.» |
| 6 | ערפל | ערפילים, אד, עשן | 0,138,320,30 | «ערפל קרקעי בגובה ברך. זה לא מזג אוויר — זה הענן. ה-cloud המקורי. גם הוא הופסק, אבל לא סיפרו לו, אז הוא ממשיך להגיע לעבודה.» | קח ← «ניסית לאסוף ערפל לדלי. קיבלת דלי של כלום עם רישיון שימוש. תיעדת: הרכישה הכי גוגלית שעשית.» |
| 7 | עץ ערבה | ערבה, עץ, עץ בוכה | 14,44,58,100 | «ערבה בוכייה. העץ היחיד בקמפוס שההבעה שלו תואמת את המצב. פעם ניסו להפוך אותו לפיצ'ר — 'Google Tree'. הוא שרד רק כי אף אחד לא זכר להרוג אותו.» | טפס ← «התחלת לטפס. הענף נאנח 'גם אתה?'. ירדת. יש לעץ הזה מספיק על הראש.» |
| 8 | זר פרחים | זר, פרחים, פרחי פלסטיק, זר פלסטיק | 250,176,20,10 | «זר פלסטיק דהוי על קבר סטדיה. הפרחים מזויפים, הצער אמיתי. פתק: 'תנוח בשלום. המשכתי לפלייסטיישן. סליחה.'» | קח ← «עזוב. זה הדבר היחיד פה שמישהו הביא מרצון. גם לקריין יש קווים אדומים. אחד. זה הוא.» הרח ← «פלסטיק, אבק, ושרידי תקציב שיווק. ניחוח שנקרא 'רבעון רביעי'.» |
| 9 | ירח | הירח, שמיים, כוכבים | 270,4,44,30 | «הירח מציץ מעל הקמפוס. קטן, חיוור, ושומר מרחק. חכם. גוגל כבר ניסתה לקנות אותו פעמיים. הוא בכל פעם עבר לבטא פרטית.» | דבר ← «דיברת אל הירח. הוא לא ענה. זה השירות הכי יציב שפגשת היום.» |

---

## 3. Puzzle script — onCommand logic

Score keys (sum = **25**, manifest quota):
- `google_graveyard_ritual` = **20** — the resurrection ceremony
- `google_graveyard_key` = **5** — taking the key

```
onCommand(verb, noun, api, extra):

# ============ תן טופס לרוח — טקס ההחייאה ============
if verb=='תן' && (noun contains 'טופס' || noun contains 'רוח' || noun contains 'רידר'):
    if api.getFlag('ggrave_ritual_done'):
        api.say('הטקס נערך. המצבה סדוקה, הרוח מרוצה, והביורוקרטיה — לראשונה בתולדותיה —\nעשתה משהו טוב. אל תדחוף את מזלך, זה חד-פעמי.')
        return true
    if !api.hasItem('tofes_bitul'):
        api.say('הרוח מרחפת אליך בציפייה, סורקת את הידיים שלך, ומוצאת... כלום.\n"טופס ביטול-הפסקה," היא לוחשת. "בלי טופס אין תחייה. עם כל הכבוד למגב."\n(קיוסק הטפסים בלובי. אם הוא עוד חי.)')
        return true
    missing_vaada  = !api.getFlag('vaada_ishur')
    missing_tzachi = !api.getFlag('chatima_tzachi')
    if missing_vaada || missing_tzachi:
        # דמעת אקטופלזמה על הנוהל:
        lines = 'הרוח מעיינת בטופס בקפדנות של מי שמתה בגלל ניירת.\n'
        if missing_vaada:  lines += '"חסר אישור ועדה. איזו ועדה? זו ששינתה את שמה ארבע פעמים. חדר אינסוף-3."\n'
        if missing_tzachi: lines += '"חסרה חתימת עובד. כל עובד. אפילו אחד בלי צוות. אולי דווקא אחד בלי צוות."\n'
        lines += 'דמעת אקטופלזמה נושרת על הטופס ולא מכתימה אותו. אפילו הדמעות שלה תקניות.'
        api.say(lines)
        return true
    # ====== הטקס עצמו ======
    api.removeItem('tofes_bitul')
    api.setFlag('ggrave_ritual_done')
    api.score(20, 'google_graveyard_ritual')
    api.say('הרוח אוחזת בטופס. אישור ועדה: יש. חתימת "צוות תחזוקת בינה, קומה 3-": יש.\nהיא מרימה את שתי ידיה השקופות. הערפל נעצר. הכוכבים מפסיקים להבהב —\nמישהו סוף סוף מילא את הניירת עד הסוף, והיקום צריך רגע.\n\n"בשם ה-RSS, הבטא, ורוח המוצר הקדוש — אני מבטלת את ההפסקה!"\n\nמצבת GOOGLE KEYS נסדקת בקול של שרת ישן שמופעל מחדש. מתוך הסדק עולה,\nבאור חיוור וזוהר, מפתח כיול מס\' 4 — הפיצ\'ר הראשון בהיסטוריה שקם מהמתים.\nהרוח מביטה בך: "זכור אותי, איש המגב. מיליוני משתמשים. אפס באגים.\nוהם הרגו אותי בשביל גוגל פלוס. גוגל. פלוס."')
    return true

# ============ קח מפתח ============
if verb=='קח' && (noun contains 'מפתח'):
    if api.hasItem('mafteach_4'):
        api.say('המפתח כבר בעגלה, ליד שלושת אחיו. רביעייה שלמה. כמעט חבל לפתוח איתם דלת.')
        return true
    if !api.getFlag('ggrave_ritual_done'):
        api.say('הושטת יד לחור המנעול החקוק. אין שם מפתח — יש שם היעדר-מפתח מתועד היטב.\nהרוח מכחכחת: "טקס קודם. ניירת קודם. תמיד ניירת קודם. ככה מתּי, ככה אחיה."\n(תן לה את טופס ביטול-ההפסקה — מאושר וחתום.)')
        return true
    api.addItem('mafteach_4', "מפתח כיול מס' 4",
        "זוהר באור חיוור של פיצ'ר שקם מהמתים. על הידית: 'Deprecated'. הוא עובד. כנראה. עד ספטמבר.")
    api.score(5, 'google_graveyard_key')
    api.say('לקחת את מפתח כיול מס\' 4. הוא חמים, זוהר, ומרגיש אסיר תודה — תחושה מוזרה במפתח.\nארבעה מתוך ארבעה. הקריין שקט לרגע. "כל הארבעה. באמת. אני... צריך לשבת."\nהוא לא יושב. הוא קריין. אבל משהו בקול שלו נשמע כאילו הוא יודע מה קורה עכשיו.')
    return true

# ============ דבר עם הרוח ============
if verb=='דבר' && (noun contains 'רוח' || noun contains 'רידר'):
    → dialogue A (סעיף 4, לפי מצב)
    return true

# ============ שימוש במגב — קשקוש חובה ============
if (verb=='נקה' || verb=='השתמש') && (noun contains 'מצבה' || noun contains 'מצבות' || noun contains 'מגב'):
    api.say('ניגבת אבק ממצבה של פיקאסה. הרוח עוקבת אחריך בעיניים חלולות ולחות.\n"עשור לא ניקה פה איש," היא לוחשת. "אתה אדם טוב, איש המגב."\nאתה לא אדם טוב. אתה אדם עם לו"ז. אבל אתה נותן לה את הרגע.')
    return true

# ============ דריכה/נגיעה בקבר גוגל+ ============
if (verb=='לך' || verb=='דרוך' || verb=='גע' || verb=='פתח' || verb=='חפור') && (noun contains 'פלוס' || noun contains 'גוגל+'):
    → ☠ DEATH A (סעיף 5)
    return true

return false
```

**Engine note:** the key hotspot (#3) is drawn only when `ggrave_ritual_done` is set and
`mafteach_4` is not yet in inventory (art file checks a global the scene sets, or simply
always draws the crack and adds the glowing key conditionally via a flag the engine exposes
to draw — if the engine can't, draw the key always dim P[8] and bright P[14] post-flag).

---

## 4. Dialogue & first-entry

**onEnter (first visit, flag `visited_google_graveyard`):**
> «בית הקברות של המוצרים. שורות של מצבות לבנות תחת שמי לילה, ערפל בגובה ברך,\nודממה שמופרת רק על ידי מוצר כלשהו שמופסק אי-שם ברקע.\nמעל המצבה הגדולה — 'GOOGLE KEYS 2017–2019' — מרחפת דמות שקופה וקוראת\nמשהו שאף אחד לא מפרסם בו יותר.\nהקריין מנמיך את הקול, לשם שינוי: "תתנהג יפה. פה קבורים חלומות של אנשי מוצר.\nוגם, טכנית, אנשי מוצר אחד. אל תשאל."»

**Dialogue A — רוח גוגל רידר (talk), by state:**
- לפני הכול (אין טופס ביד): «"ברוך הבא לגן העדן של ה-sunset, איש המגב. אני הייתי רידר. מיליוני משתמשים.\nאפס באגים. והם הרגו אותי בשביל גוגל פלוס. גוגל. פלוס.\nהמפתח שאתה מחפש היה פיצ'ר שלי-כמעט — Google Keys, ילד מתוק, מת צעיר.\nרוצה להחיות אותו? טופס ביטול-הפסקה. מאושר. חתום. אני לא ממציאה את הכללים —\nאני רק מתה בגללם."»
- טופס ביד אבל חסרים אישורים: «"אני מריחה ניירת לא גמורה ממרחק של שני עולמות. תשלים אישור ועדה וחתימת עובד.\nהמתים סלחנים, הנוהל — לא."»
- טופס מלא ביד, טרם הוגש: «"יש עליך טופס שלם. מאושר. חתום. אתה יודע כמה רוחות פה היו קמות בשביל טופס כזה?\nכולן. תן לי אותו. בעדינות. הוא העותק האחרון ביקום."» (רמז: תן טופס לרוח)
- אחרי הטקס, לפני לקיחת המפתח: «"קח אותו. הוא שלך. הוא חיכה שבע שנים בסדק — עוד דקה הוא יפתח סטארטאפ."»
- אחרי הכול: «"לך, איש המגב. ואם תפגוש שם למטה מישהו שמחליט על הפסקות מוצרים —\nתגיד לו שהפיד שלי עוד מתעדכן. לנצח."»

**Room description (status):**
> «חצר לילית: שורות מצבות של מוצרים מתים, ערפל זוחל, רוח רפאים מעל מצבת ענק\nעם חור מנעול — ועץ ערבה אחד שבוכה בשביל כולם.»

---

## 5. Death

**DEATH A — הקבר הרעב (avoidable, main):** trigger: הליכה/דריכה/נגיעה/חפירה בקבר גוגל+.
ה-look של ההוטספוט מזהיר במפורש ("אל תדרוך") — מי שדורך, נדרך.
> «דרכת על קבר גוגל+.\nהאדמה נפערת בשקט של פיצ'ר שאף אחד לא בדק, ואתה נשאב פנימה — לתוך הפיד.\nלבן. ריק. אינסופי. מונה המשתמשים הפעילים מתעדכן: 1.\nאתה כעת המשתמש הפעיל היחיד בגוגל+. לנצח. יש לך חבר אחד: הבוט של עצמך.\nהוא הרגע עשה לייק לגופה שלך.\n☠ הצטרפת למעגלים. לכל המעגלים. טיפ מהקריין: כשהקבר זוהר והקריין אומר\n'אל תדרוך' — זה לא היה חידון.»

**Near-death gag:** קריאה מוגזמת של המצבות («קרא מצבות» שלוש פעמים ברצף — ספירה בדגל
זמני `ggrave_read_count`):
> «קראת עוד מצבה. ועוד אחת. הערפל מתחיל להתלפף לך על הקרסוליים בחיבה מדאיגה,\nומצבה ריקה בקצה השורה מתחילה לחקוק משהו שמתחיל ב-'יענק—'.\nעזבת את האזור בצעד זריז. החקיקה נעצרה. בינתיים.»

---

## 6. Exits behavior

| Exit | Type | Logic |
|---|---|---|
| down → `google_corridors` | walking edge + scripted | `exits.down` — hero walks off bottom (y>192, on the gravel path). Verb צא/לך/רד על "יציאה"/"מסדרון"/"שביל" ← `api.goto('google_corridors')`. Flavor: «אתה יורד חזרה למסדרונות. הרוח מנופפת לשלום ב-RSS. הערפל לא זז — הוא בבטא של פרידות.» |

No other exits. Attempts up/left/right: «גדר חיה מסביב. גם היא הופסקה, אבל אף אחד לא עדכן\nאת השורשים, אז היא ממשיכה לגדול. אין מעבר.»
