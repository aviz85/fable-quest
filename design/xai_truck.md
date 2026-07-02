# DESIGN — xai_truck ("רחבת הטנדר החשמלי")

Act: xai · Music: xai · Score total: **25** (xai_truck_window 10 + xai_truck_key 15)
Exits: left → `xai_hangar` (walk). No other exits.
Flags owned: `visited_xai_truck` (onEnter) + **`window_broken`** (manifest-law) · Items given here: `mafteach_3` · Items needed: `yadit_delet` (consumed), `lehavior` (used, NOT consumed)
NPC: בובות ראווה של מעריצים (props with opinions). Death: להביור על הטנדר/הסוללה.

The room is the climax of the xAI act: a museum-plaza under a fake Mars dome, one triangular
electric truck on a podium, calibration key #3 welded to the dashboard behind an "unbreakable"
windshield. History's greatest QA moment, re-enacted by the player: the only thing that breaks
the glass is the truck's own door handle (found in `xai_junkyard`), then the weld melts with the
flamethrower (from `xai_hangar`).

---

## 1. Layout — 320x200 composition plan

Fake-Mars showroom under a dome. Red dirt, red spotlights, a crowd of frozen mannequin fans
worshipping a triangle on wheels. Floor band y=145–200 (hero 10x28; truck roof at y≈85 towers
over him — showroom scale, correct). Light: two red display spots from above.

| # | Element | Rect / coords | Notes for artist |
|---|---------|---------------|------------------|
| 1 | Dome sky | 0,0 → 320x80 | P[0] deep space base. Fake painted star-trail: diagonal band of P[15]/P[7] 1px "stars" from (20,10) to (300,55) — too evenly spaced, obviously painted on. Two stars swap P[15]↔P[8] on `frame % 14 < 7` (the dome projector stutters). One "star" is clearly a P[7] screw head (4x4 at 250,20). |
| 2 | Dome ribs | arcs faked as steps | 3 horizontal P[8] 2px strips at y=18, 42, 66 with slight stepping down at edges (x<30, x>290 drop 4px) — the dome curvature, budget edition. |
| 3 | Mars horizon / back wall | 0,80 → 320x65 (to y=145) | P[4] dark-red base with P[8] shadow band y=80–86. Distant junk silhouettes: 3–4 rocket-skeleton shapes in P[8] (thin verticals 4x24 + nose blobs) at x=8, 40, 285. One leans at a Pisa angle. |
| 4 | Red display spots | housings at x=100,y=2 and x=210,y=2 (14x5 P[8]) | From each: a red light column on the back wall — vertical P[4]-lighter strips (use P[12] 2px core + P[4] fringe), aimed at the truck. The right spot blinks off `frame % 23 < 2` (unpaid electricity, Mars rates). |
| 5 | Podium | x=96–240, y=132–150 | Low display podium: P[7] top slab (y=132–138), P[8] front face (y=138–150), P[0] top edge line. On the front face, P[15] block-letters area (24x6 at x=150) suggesting "MVP". Hero can walk up to it, not on it. |
| 6 | THE TRUCK | body x=104–232, y=88–132, on podium | All flat planes and knife angles, P[7] main body, P[8] under-shadow facets, P[0] seam lines (1px) marking the fold lines. Roofline: single diagonal faked with 3 stepped rects from (104,104) up to (168,88) then down to (232,108). Wheels: P[0] blocks 20x14 at x=112,y=124 and x=204,y=124 with P[8] hub pixel. NO door handles: two P[0] 6x3 empty holes in the side at (140,112) and (196,112) — conspicuous absences. |
| 7 | Windshield | x=150–192, y=92–110 | P[11] cyan glass slab, P[15] glint: a 2px diagonal highlight that sweeps across, `x = 150 + (frame*2) % 42` (the famous glint of invincibility). **After `window_broken`:** replace with P[0] hole + P[11] shard triangles (stepped rects) around the rim + 3–4 P[11] shard pixels on the podium top. Implementer: gate on flag in draw via a module-level check is NOT possible — instead draw shards in a second art state; simplest legal trick: the scene's draw can't read flags, so keep glass INTACT in art and let text carry the state (Sierra did worse). Optional: draw a permanent tiny P[8] chip at (152,94) — the "old crack" from the original demo. |
| 8 | The key on the dash | x=166–176, y=100–106 (seen through glass) | P[14] yellow key blob (10x6, with 2 teeth pixels at bottom) glowing: swap P[14]↔P[15] on `frame % 10 < 5`. A P[8] weld bead line (1px) under it — it is WELDED to the dashboard. Visible through the windshield, taunting. |
| 9 | "UNBREAKABLE" sign | x=8–86, y=44–92 | Display sign: P[0] frame (2px), P[15] board, P[4] latin block letters suggesting "UNBREAKABLE GLASS" (two rows of red blocks), P[8] smaller row = "TRUST US". A diagonal P[8] crack line (stepped 1px) from top-right corner, covered by a P[14] strip of tape (3x18 diagonal) — they taped the crack ON THE SIGN. |
| 10 | Mannequin fans | group A x=30–72, feet y=150; group B x=248–276, feet y=150 | 4 mannequins (10x26 each): P[6] heads, P[1] bodies, P[15] eye pixels. All frozen mid-worship, arms up: 2px P[6] verticals above shoulders. One holds a P[15] fan-sign (8x6) with a P[4] heart pixel. One mannequin's head is on backwards (face pixels on the wrong side). Group B: one has fallen over — horizontal at x=252,y=144 (12x6), nobody picked him up since the last demo. |
| 11 | Crane | x=282–318, y=56–150 | Small service crane: P[8] mast (4px wide, y=56–150), P[8] arm to x=250 at y=60, P[6] cable 1px down to a P[6] hook at (252,78). Hook sways: x offset ±1px on `frame % 16 < 8`. A P[14] "DO NOT" sign block (8x8) on the mast, bottom half missing — do not what? Exactly. |
| 12 | Mars dirt floor | y=145–200 | P[4] base with P[8] 2x2 dither clumps widening toward y=200 (perspective). Tire tracks: two P[8] parallel 2px lines curving from bottom-center to the podium (the truck was DRIVEN up there, warranty voided). A P[8] scorch mark at x=90–104, y=168–174 (previous flamethrower enthusiast). |

Animations (≥1 required, we have 5): stuttering dome stars, blinking red spot, windshield glint sweep, glowing key pulse, swaying crane hook.

---

## 2. Hotspots table (9)

| name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|
| טנדר | טנדר חשמלי, רכב, משאית, מכונית, אוטו | 104,88,128,44 | "הטנדר החשמלי. משולש נירוסטה על גלגלים, מעוצב על ידי מישהו שראה פעם אחת ציור של ילד ואמר 'שיפו את זה'. אין ידיות. אין עיגולים. אין חרטות. על הדשבורד, מבעד לשמשה, זוהר מפתח כיול מס' 3 — מרותך, כמובן. למה מרותך? כי ברגים זה לחלשים." | דבר → "אמרת שלום לטנדר. מערכת הקול שלו מתעוררת: 'LOL.' היא נכבית. זו הייתה כל השיחה, והיא עוד תופיע בקינוט כפיצ'ר." · בעט → "בעטת בטנדר. הטנדר לא שם לב. הבוהן שלך שמה לב מאוד. הנירוסטה מנצחת בשלוש שניות בנוק-אאוט." · קח → "לקחת טנדר שלם? יש לך מגב, לא עגורן. וגם העגורן פה לא היה מרים את האגו של הרכב הזה." |
| שמשה | שמשה קדמית, חלון, זכוכית, זגוגית | 150,92,42,18 | לפני שבירה: "השמשה ה'בלתי שבירה'. יש עליה צ'יפ קטן ועתיק בפינה, מכוסה בהכחשה. הברק שחולף עליה כל שנייה הוא לא אפקט — זה ביטחון עצמי. שלט התצוגה נשבע שהיא עמידה בפני הכול. 'הכול' — מונח משפטי גמיש." · אחרי `window_broken`: "חור בצורת ידית-דלת, מוקף רסיסי 'בלתי שביר'. אתה מרגיש שסגרת חוב היסטורי בשם כל מחלקות ה-QA בעולם." | זרוק → onCommand (הפאזל, סעיף 3) · שבור/הכה → onCommand (מפנה לפתרון) · נגע → "ליטפת את השמשה. היא קרירה, חלקה, ובטוחה בעצמה בצורה שמעצבנת אותך אישית." |
| מפתח | מפתח כיול, מפתח 3, מפתח כיול מס' 3, ריתוך | 162,96,20,14 | לפני שבירה: "מפתח כיול מס' 3, זוהר על הדשבורד כמו פרס בלונה-פארק. בינך לבינו: סנטימטר של זכוכית עם תסביך גדלות." · אחרי שבירה, לפני לקיחה: "המפתח קורץ אליך מבעד לחור. נשאר רק הריתוך — פס מתכת שאומר 'ניצחת בקרב, לא במלחמה'." | קח → onCommand (סעיף 3) · השתמש/שרוף/התך (עם להביור) → onCommand (סעיף 3) |
| דלת | דלת הטנדר, דלתות, ידית | 132,104,72,26 | "דלת ללא ידית. בחור שבו אמורה להיות ידית יש... חור. מהנדס כתב פעם בתיעוד: 'אין ידית = אין נקודת כשל של ידית.' קידמו אותו." | פתח → onCommand (שלב 1 — פילוסופיית האין-ידית) · משוך → "משכת בקצה הדלת. הדלת, בהתאם למפרט, לא סיפקה שום דבר לאחוז בו. המפרט מנצח 1:0." · דחוף → "דחפת את הדלת. היא ננעלה חזק יותר. יש לה מדיניות: כל מגע אנושי = ניסיון פריצה." |
| שלט | שלט תצוגה, שלט זכוכית, unbreakable | 8,44,78,48 | "'UNBREAKABLE GLASS — TRUST US'. על השלט עצמו יש סדק, מודבק בנייר דבק. תן לזה שנייה לשקוע: הזכוכית בלתי שבירה. השלט — לא." | קרא → אותו look · קח → "השלט מוברג לקיר של כיפה מזויפת על מאדים מזויף. זה הדבר הכי אמיתי פה, ואתה לא לוקח אותו." |
| בובות ראווה | בובות, מעריצים, קהל, בובה | 30,124,42,26 | "קהל מעריצים מבובות ראווה, קפוא באמצע תרועה. לאחת הראש הפוך ואף אחד לא תיקן, כי מהזווית של המצלמה זה נראה מדהים. הם המעריצים המושלמים: לא שואלים על לוחות זמנים." | דבר → "פנית אל הקהל. שקט. בובת ראווה אחת נוטה קדימה בסקרנות — לא, רגע, זה החוק השני של ניוטון. היא נופלת. הקהל לא מגיב גם לזה." · קח → "רצית מעריץ אישי? תשיג קודם הישג. או טנדר. פה זה אותו דבר." |
| בובה שנפלה | בובה נופלת, בובת ראווה שנפלה | 248,140,30,12 | "בובת ראווה שנפלה בהשקה הקודמת ונשארה על הרצפה. אף אחד לא הרים אותה — היא סומנה בג'ירה כ-known issue, חומרה: קוסמטית." | הרם → "הרמת את הבובה והשענת אותה על חברותיה. אתה היחיד בתאגיד הזה שסגר אי פעם טיקט. אל תצפה לקרדיט — התכונה הזאת לא נמדדת." |
| עגורן | מנוף, עגורן שירות, וו | 282,56,36,94 | "עגורן שירות קטן עם וו מתנדנד. עליו שלט 'DO NOT' שהחצי התחתון שלו נשבר. אל תעשה... מה? זו בדיוק רמת התיעוד שציפית לה." | טפס → "טיפסת חצי מטר על העגורן. הוו הסתובב אליך כמו ראש של ינשוף. ירדת. יש גבולות גם לסקרנות של אב בית." · השתמש → "העגורן דורש רישיון מפעיל, קורס בטיחות, וחתימה של מישהו שפוטר בטוויטר לפני שנתיים. עזוב." |
| אדמת מאדים | רצפה, אדמה, חול, עפר | 0,145,320,55 | "אדמת מאדים מיובאת. כלומר — חול מאשדוד עם צבע מאכל אדום. יש סימני צמיגים שמובילים אל הפודיום וכתם חריכה אחד ישן. מישהו כאן כבר ניסה משהו עם להביור. אתה מרגיש קרבה אליו, ומעט חרדה." | נקה → "העברת מגב אינסטינקטיבי על החול. עכשיו יש קו נקי אחד באמצע מאדים. איפשהו, מעצב חוויית-חלל מקבל התקף." · קח → "לקחת חופן 'אדמת מאדים'. היא מכתימה לך את היד באדום. אתה מחזיר. הפיקדון על החלון — כן. פיקדון על כביסה — לא." |

---

## 3. Puzzle script — onCommand logic

Score keys: `xai_truck_window` = 10, `xai_truck_key` = 15. **Sum = 25.** ✔
Manifest-law: flag `window_broken`; items `yadit_delet` (consumed), `lehavior` (used, kept); item given `mafteach_3`.
Room-internal: `visited_xai_truck` (onEnter only). Nothing else.

```
onCommand(verb, noun, api, extra):

// ---------- שלב 1: פתח דלת → אין ידית ----------
if verb=='פתח' && (noun=='דלת' || noun=='טנדר'):
    if hasItem('yadit_delet'):
        say('ניסית להצמיד את הידית מהמגרש לחור שבדלת. היא מתאימה בול — ונופלת שוב.\nהחור הוא דקורטיבי. הידית הזאת לא נועדה לפתוח דלתות. היא נועדה למשהו גדול יותר.\nאתה מסתכל על הידית. אתה מסתכל על השמשה ה"בלתי שבירה". רעיון רע ומצוין מתגבש.')
    else:
        say('אין ידית. אין ידית — אין דלת. זו לא תקלה, זו פילוסופיה: "כל פתח הוא הודאה בחולשה."\nמישהו כתב את זה בתיעוד וקיבל על זה בונוס.\nמעניין אם מסתובבת פה ידית כזאת איפשהו בין הגרוטאות...')
    return true

// ---------- שלב 2: זרוק ידית על השמשה ----------
if (verb=='זרוק' || verb=='השתמש') &&
   ( noun=='ידית' || noun=='ידית דלת' ||
     ((noun=='שמשה' || noun=='חלון' || noun=='זכוכית') && extra.raw includes 'ידית') ):
    if getFlag('window_broken'):
        say('השמשה כבר שבורה. גם הניצחונות הגדולים ביותר קורים רק פעם אחת. תתאפס.')
        return true
    if !hasItem('yadit_delet'):
        say('לזרוק ידית צריך קודם ידית. הידיים שלך ריקות והשמשה יודעת את זה. היא בורקת בזלזול.')
        return true
    removeItem('yadit_delet')
    setFlag('window_broken')
    score(10, 'xai_truck_window')
    say(W1)   // סצנת השבירה — סעיף 4
    say(W2)   // דקת הדומייה של הקריין — סעיף 4
    return true

// ---------- זריקת כל דבר אחר על השמשה ----------
if (verb=='זרוק' || verb=='שבור' || verb=='הכה') &&
   (noun=='שמשה' || noun=='חלון' || noun=='זכוכית') && !getFlag('window_broken'):
    // (זריקת חפץ ספציפי אחר נופלת גם היא לכאן דרך extra.raw)
    say('החפץ ניתר מהשמשה כאילו לא קרה כלום. "בלתי שבירה לכל דבר — חוץ מהידית של עצמה."\nזה כתוב בתיעוד. בעמוד האחרון. בפונט 4. תחת "ידוע ומקובל".')
    return true

// ---------- ניסיון לקחת את המפתח ----------
if verb=='קח' && (noun=='מפתח' || noun=='מפתח כיול'):
    if hasItem('mafteach_3'):
        say('המפתח כבר בכיס שלך, חם ומרוצה. לא לוקחים פעמיים. זה נקרא גניבה, וגם חמדנות.')
        return true
    if !getFlag('window_broken'):
        say('הושטת יד אל השמשה. השמשה נשארה שמשה. המפתח זוהר לך בפרצוף ממרחק סנטימטר.\nזה כמו חלון ראווה של מאפייה בצום. קודם תפתור את עניין הזכוכית.')
        return true
    // השמשה שבורה, הריתוך נשאר:
    say('הכנסת יד דרך החור ומשכת. המפתח לא זז. הריתוך מחזיק אותו כמו תאגיד שמחזיק בטאלנט.\nמשכת שוב. הריתוך אפילו לא התאמץ. צריך כאן משהו חם. חם מאוד. חם באופן לא אחראי.')
    return true

// ---------- שלב 3: להביור על המפתח/הריתוך ----------
if (verb=='השתמש' || verb=='שרוף' || verb=='התך') &&
   ( noun=='מפתח' || noun=='ריתוך' ||
     (noun=='להביור' && (extra.raw includes 'מפתח' || extra.raw includes 'ריתוך')) ):
    if hasItem('mafteach_3'):
        say('כבר התכת, כבר לקחת, כבר ניצחת. להדליק להביור בשביל הנוסטלגיה זה איך שנשרפים האנגרים.')
        return true
    if !hasItem('lehavior'):
        say('עם מה בדיוק תתיך? עם המבט? המבט שלך מפחיד עובדי קבלן, לא ריתוכים. חסר לך כלי בטמפרטורת עבודה.')
        return true
    if !getFlag('window_broken'):
        say('כיוונת את הלהביור אל השמשה. עצור. הזכוכית הזאת מחזירה חום כמו שהיא מחזירה ביקורת — ישר עליך.\nקודם פותחים חור. אחר כך מבשלים.')
        return true
    // lehavior נשאר במלאי — לא נצרך
    addItem('mafteach_3', "מפתח כיול מס' 3", 'טיטניום שרוף בקצוות, חם למגע, מריח כמו הישג הנדסי ותביעה ייצוגית.')
    score(15, 'xai_truck_key')
    say(K1)   // סצנת ההתכה — סעיף 4
    return true

// ---------- מוות: להביור על הטנדר / הסוללה ----------
if (verb=='השתמש' || verb=='שרוף') &&
   (noun=='טנדר' || noun=='רכב' || noun=='סוללה' ||
    (noun=='להביור' && extra.raw includes 'טנדר')):
    if !hasItem('lehavior'):
        say('היית שורף את הטנדר, אבל אין לך להביור. הטנדר לא יודע כמה התמזל מזלו. גם אתה לא — עוד רגע תבין.')
        return true
    die(DEATH1)   // סעיף 5
    return true

// ---------- אזהרת סף למוות (near-death gag) ----------
if verb=='פתח' && noun=='סוללה':
    say('התכופפת אל מכסה הסוללה. מדבקה עליו: "12,000 תאי ליתיום. אל." שוב תיעוד שנקטע באמצע. הפעם דווקא הבנת את הכוונה.')
    return true

return false
```

Notes for the implementer:
- `lehavior` is NOT consumed — melting a weld doesn't empty a flamethrower, and nothing downstream needs it, but Sierra never confiscated a flamethrower without a reason.
- `yadit_delet` IS consumed (it flies through the windshield and stays inside the truck. Canon).
- Accept `זרוק ידית על שמשה` / `זרוק ידית` / `השתמש בידית על השמשה` via the `extra.raw` matching above — the parser is a friend that bites.
- `window_broken` is manifest-law and readable by other rooms; set it ONLY here, only via the handle throw.
- After `mafteach_3` is taken the room is solved; all puzzle verbs fall through to the "כבר עשית" responses above.

---

## 4. Dialogue

**First entry (onEnter, once — sets `visited_xai_truck`):**
> רחבת התצוגה של הטנדר החשמלי. כיפת חלל מזויפת, כוכבים מצוירים במרווחים שווים מדי, וקהל מעריצים מבובות ראווה שקפא באמצע תרועה — הקהל היחיד שמעולם לא שאל "מתי זה יוצא".
> במרכז, על פודיום: הטנדר. משולש. נוצץ. בלי ידיות. מאחורי השמשה ה"בלתי שבירה" זוהר מפתח כיול מס' 3, מרותך לדשבורד.
> אתה מרגיש שהחדר הזה מחכה למשהו. משהו היסטורי. משהו עם קשת תעופה.

**W1 — סצנת שבירת השמשה:**
> זרקת את ידית הדלת של הטנדר על השמשה של הטנדר.
> רגע של דממה. ואז — קְרַאק. עוד קראק. והשמשה ה"בלתי שבירה" מתקפלת פנימה במפל של רסיסים נוצצים, מנוצחת על ידי החלק הכי קטן של עצמה.
> בובת ראווה אחת נופלת אפיים ארצה. נראה לך שמרצון.

**W2 — דקת הדומייה:**
> נבקש דקת דומייה לזכר צוות השיווק, שנשבע על הבמה, מול מיליוני צופים, שזה בלתי אפשרי.
> ...
> תודה. אגב, זה תועד. הכול פה מתועד. זה יהיה מם תוך ארבע דקות, ואתה תופיע בו בתור "אב בית אלמוני, אגדה".
> [+10 נקודות]

**K1 — סצנת ההתכה:**
> הצתת את הלהביור. הלהבה יוצאת בגוון כתום שאין לו אישור תקן, ואתה מכוון אותה בעדינות של מנקה חלונות אל פס הריתוך.
> הריתוך מהבהב, מתרכך, נכנע. המפתח משתחרר אל כף ידך — חם, מהביל, ומריח כמו ניצחון וכמו ביטול אחריות יצרן.
> קיבלת: מפתח כיול מס' 3. נשארו: אחד. הפיקדון מתקרב. אתה כמעט מרגיש את הריח שלו. זה אולי הריתוך.
> [+15 נקודות]

**בובות ראווה — talk (canned, מהטבלה):** ראו hotspot. אין NPC חי בחדר — זו הפואנטה: זה האולם היחיד בכל המשחק שבו אף אחד לא מדבר אליך, וזה החדר עם הקהל הכי גדול.

---

## 5. Death — הלהביור והסוללה (avoidable)

**Trigger:** `השתמש בלהביור על הטנדר` / `שרוף טנדר` / `שרוף סוללה` (requires `lehavior`).
**Warnings first:** the floor look mentions an old scorch mark ("מישהו כאן כבר ניסה"), and `פתח סוללה` gives the "12,000 תאי ליתיום. אל." near-death gag. Whoever burns anyway — earned it.

**Death text (api.die):**
> כיוונת את הלהביור אל הטנדר עצמו. למה? כי הוא שם. הבנו. גם הוא הבין.
> 12,000 תאי ליתיום מגיבים להזמנה בהתלהבות של סטארטאפ בסבב גיוס. הטנדר לא נשרף — הטנדר *משתתף*. הפיצוץ נראה מהחלל, איפה שהכיפה מעמידה פנים שאתם נמצאים.
> נורית ה-check engine נדלקה. גם אתה.
> ☠ הכתם החרוך על הרצפה? עכשיו יש שניים. הבא בתור ילמד ממך בדיוק כמו שאתה למדת מהקודם.

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| left (walk off x≤10) | `xai_hangar` | walking exit (engine `exits.left`) | No condition. Back to the hangar. |
| right / up / down / enter | — | none | Walking right hits the crane. `היכנס לטנדר` → canned: "להיכנס איך בדיוק? אין ידית, והחור בשמשה בגודל של ידית. זה רכב שנועד להסתכל עליו, לא להיות בו. כמו רוב ההבטחות פה." |

Engine block: `floor: { y1: 150, y2: 192 }`, `hero: true`, `music: 'xai'`, `exits: { left: 'xai_hangar' }`.
