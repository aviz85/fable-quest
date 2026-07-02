# DESIGN — junction — "צומת המפורז"

act: hub · music: hub · score: 5 (junction_arrive=5) · flags: visited_junction
exits (manifest, law): right=street · up=anthropic_gate · left=openai_lobby · down=xai_gate · enter=google_lobby
items: none here, none needed.

---

## 1. Layout — 320x200 composition plan

Open border plaza at dusk. Four empire gates around a cracked concrete square; the DMZ where four fiber cables (and four egos) meet. Light source: sunset from top + rotating searchlight.

| element | rect (x,y,w,h) | notes for artist |
|---|---|---|
| Sunset sky (dithered) | 0,0,320,55 | P[5]/P[12] 2px vertical strips, P[14] band at y=45-55. Tel Aviv 2027 vibes. |
| Distant skyline | 0,40,320,25 | P[8] blocky towers silhouettes behind the gates, a few P[14] lit windows. |
| **Anthropic gate (up)** | 125,55,70,88 | Clay-brown P[6] zen torii-arch: two thick pillars (125,55,14,88 / 181,55,14,88), curved-ish top beam (120,55,80,12 in stacked rects), P[3]/P[11] cyan scroll banners hanging (135,70,8,40 / 177,70,8,40), P[0] outlines. Dark P[8] doorway opening (145,85,30,58) — hero walks INTO it. Base at y≈143. |
| **OpenAI gate (left)** | 0,50,46,95 | Sterile white P[15] glass frame with P[7] mullions, P[11] glass shine strips; small black monolith P[0] (30,95,10,34) with ONE glowing eye pixel (P[12], blinks). "For Your Safety" barrier stubs P[14]/P[0] stripes at its base (0,138,46,6). Walking off left edge = exit. |
| **Google slide mouth (enter)** | 210,60,54,83 | A giant playground slide-tube descending INTO the ground: colorful rings P[1]/P[4]/P[14]/P[2] (stacked 54x12 bands), dark tube mouth P[0] (222,118,30,25) at floor level. Two wilted balloons on strings (P[4] 6x6 at 208,66; P[14] 6x6 at 262,74 — drooping, one deflates 1px on frame%20). Dusty "BETA" plaque P[7] (218,62,20,8). |
| **Road to street (right)** | 265,120,55,80 | Cracked asphalt P[8] strip narrowing to right edge, P[14] faded lane dashes. Walking off right edge = street. |
| Welcome sign | 276,88,36,30 on pole 292,118,4,30 | P[7] board, P[0] frame, P[12] warning stripe, rows of P[0] "text" bars. The bureaucratic masterpiece (hotspot). |
| Floor (plaza) | 0,143,320,57 | P[7] concrete, perspective strips: y143-158 P[8]-ish darker (dither P[7]/P[8]), y158-200 P[7] with P[8] cracks (thin 2px rects). |
| **Four border lines** | see below | Painted on floor, converging at THE POINT (160,172): cyan P[3] line from Anthropic base (158,143 → down), white P[15] from left edge (0,170 → right), red P[4] from bottom edge (160,200 → up), yellow P[14] from the slide (264,168 → left). Each 3px thick. |
| **THE POINT (death spot)** | 154,168,12,8 | Where all four lines meet. Painted as a tiny 4-color pinwheel (four 6x4 quadrant rects: P[3]/P[15]/P[4]/P[14]) with P[0] outline. Ominously clean. |
| **xAI floor-gate (down)** | 118,182,84,18 | Foreground bottom-center: red/black hazard ramp sinking below screen — alternating P[4]/P[0] diagonal-ish stripes (4px bands), painted flame tips P[12] licking up at y=178, a meme sticker (P[15] 8x6 with P[0] scribble) slapped on the edge. Walking off bottom (within x 118-202) = xai_gate. |
| Guard post | 58,105,42,45 | Abandoned booth: P[8] walls, P[0] outline, P[9] cracked window (64,112,20,14), P[6] door shut, P[14] "notices" taped on (3 small 6x8 rects). Roof 54,101,50,6 P[7]. |
| Broken barrier | 100,132,52,5 | P[12]/P[15] striped arm snapped mid-air: first half attached (100,132,26,5 at slight raise via stacked rects), second half on the floor (150,150,26,5). |
| **Searchlight (ANIMATION)** | on roof: 72,93,10,8 P[7] housing | Beam: a P[14] translucent-ish wedge faked with 3 stacked rects whose x sweeps `((frame*3)%280)+20` across the plaza, plus P[15] hot core 4px. Sweeps left-right forever, guarding nothing. |
| Loose cables | 0,196,320,3 + knots | P[0]/P[8] fat cable rects running along bottom edge toward the point; a P[2] LED on one blinks frame%10. |

Hero (10x28) scale check: Anthropic doorway 30x58 ✓, booth 42x45 ✓, slide mouth 30x25 (crawl-in, that's the joke) ✓. Floor band y=145-192 fully walkable except THE POINT logic.

---

## 2. Hotspots table

| # | name_he | aliases | rect | look | other verbs |
|---|---|---|---|---|---|
| 1 | שער המנזר | שער אנתרופיק, שער חימר, קשת, מנזר | 120,55,80,88 | «שער חימר בסגנון זן, מעוטר במגילות של החוקה. על המשקוף חרוט: 'הכניסה עלולה לגרום נזק. גם אי-הכניסה. בהצלחה.' מרגיעים, הנזירים האלה.» | פתח: «השער נאנח: 'אני שוקל את ההשלכות של פתיחה כבר שלוש שנים. אבל אתה מוזמן פשוט לעבור. זהירות מהסף. ומהחיים.'» · דבר: «השער מתנצל בפניך על עצם קיומו. אתה מהנהן בנימוס. ככה זה עם דלתות של אנתרופיק.» · לך/היכנס → goto anthropic_gate |
| 2 | שער הזכוכית | שער openai, מגדל, מונולית, שער לבן | 0,50,46,95 | «קיר זכוכית לבן-סטרילי ולידו מונולית שחור קטן עם עין זוהרת. שלט: 'הדגמה בקרוב. בינתיים — תתרגשו.' אתה לא מתרגש. יש לך ותק בלא-להתרגש.» | דבר: «המונולית ממצמץ. 'תכונה זו תהיה זמינה ברבעון הבא.' גם התשובה הזאת הייתה בפריוויו סגור.» · קח (מונולית): «אתה מנסה להרים את המונולית. הוא שוקל 3 טרה של הבטחות. עזוב.» · לך/היכנס → left exit (openai_lobby) |
| 3 | המגלשה | שער גוגל, מגלשה צבעונית, צינור, קמפוס אינסוף | 208,60,58,83 | «מגלשת ענק צבעונית שצוללת אל מתחת לאדמה — הכניסה הרשמית לקמפוס אינסוף. שלט 'בטא' מאובק מ-2019, ושני בלונים שאיבדו את הרצון לרחף. חגיגי כמו לוויה.» | לך: «ללכת לתוך מגלשה זה מתכון לכאב גב. אם אתה רוצה פנימה — תגיד 'היכנס'. כן, יש נוהל גם לזה.» · דחוף: «דחפת את המגלשה. המגלשה שלחה לך סקר שביעות רצון.» · היכנס → goto google_lobby |
| 4 | שער הגרוטאות | שער xai, פתח אדום, רמפה, מאדים | 118,175,84,25 | «רמפה אדומה-שחורה שצוללת מטה, מקושטת בלהבות מצוירות ובסטיקר של חתול. השלט: 'מגרש הגרוטאות מאדים — אין החזרות. אין אחריות. אין סיבה.' לפחות הם כנים.» | הרח: «ריח של שמן מנוע, אבק מאדים מזויף ואגו. בעיקר אגו.» · לך (למטה) → goto xai_gate |
| 5 | עמדת השומר | עמדה, ביתן, בודקה, עמדת ביקורת | 54,101,50,49 | «עמדת ביקורת גבולות נטושה. השומר האחרון עזב כשהתברר שכדי לבדוק דרכון צריך אישור מארבע ועדות. על החלון פתק: 'יצאתי לוועדה. חזרה: ¯\\_(ツ)_/¯'.» | פתח: «נעול. מבפנים. השומר ידע דברים.» · דבר: «אתה מדבר עם העמדה הריקה. היא מקשיבה יותר טוב מהבוס שלך.» · קרא (פתקים): «'טופס מעבר: 4 עותקים. אישור מעבר לטופס: 6 עותקים. אישור לעותקים: בבירור.' עכשיו ברור למה הוא ברח.» |
| 6 | המחסום | מחסום שבור, זרוע | 100,130,80,25 | «מחסום גבול שנשבר לשניים. חצי באוויר, חצי על הרצפה. אף אחד לא תיקן — כי תיקון דורש להחליט של איזו אימפריה המחסום, וזאת מלחמה שאף אחד לא רוצה.» | קח: «אתה מרים את חצי המחסום. ארבעה לייזרים ננעלים עליך מארבעה כיוונים. אתה מניח אותו בעדינות. הלייזרים כבים. כולם מעמידים פנים שכלום לא קרה.» · דחוף: «דחפת. הוא חרק חריקה בירוקרטית ונשאר שבור. יש דברים שגם מגב לא מתקן.» |
| 7 | נקודת המפגש | הנקודה, קווי הגבול, קווים, צומת הקווים | 150,164,20,14 | «ארבעה קווי גבול — תכלת, לבן, אדום, צהוב — נפגשים בנקודה אחת מושלמת. הנקודה היחידה בעולם שנמצאת בו-זמנית בשטח של ארבע אימפריות. אל. תעמוד. עליה.» | לך/עמוד → death sequence (§5) · השתמש (מגב): «התחלת לנגב את הקווים. ארבע סירנות דיפלומטיות מתחילות לייבב באופק. אתה מפסיק. הסירנות משתתקות. מחיקת גבול בינלאומי — לא היום, יענקל'ה.» |
| 8 | השלט | שלט ברוכים הבאים, שלט אזהרה | 272,86,44,64 | «'ברוכים הבאים לאזור המפורז — באחריותכם בלבד.' מתחת, באותיות קטנות: 'המילה באחריותכם כפופה לפרשנות. המילה בלבד — בבוררות. המילה ברוכים — נמחקה בוועדה.'» | קרא: same joke, second paragraph: «אתה מגיע לאותיות הקטנות של האותיות הקטנות: 'סעיף 9: הקורא שלט זה מאשר שקרא שלט זה.' אתה מרגיש שנחתמת.» · קח: «השלט מוברג עם 16 ברגים — ארבעה מכל אימפריה. הדבר הכי מאובטח באזור.» |
| 9 | הזרקור | זרקור מסתובב, אור, פנס | 68,90,18,12 (housing; beam is deco) | «זרקור ביטחוני שמסתובב כבר שלוש שנים ולא מצא כלום. גם הוא כבר לא מאמין בעצמו — שים לב איך הוא מאט בפינות.» | קח: «הוא מחובר לגנרטור של ארבע חברות במקביל. לגעת בו זה להתחיל מלחמת חשבונאות.» · לחץ: «הזרקור ננעל עליך לרגע, מזהה מגב, ומאבד עניין. הסיפור של החיים שלך.» |
| 10 | הכבלים | כבל, סיבים, כבלי סיב | 0,193,320,7 | «ארבעה כבלי סיב עבים זוחלים מכל שער ומתחברים איפשהו מתחת לרגליך... בכיוון של בית הקפה, בעצם. חיבור מוזר. הקריין מציע שתפסיק לחפור. באמת שכדאי לך.» | משוך: «משכת בכבל. אי-שם ארבעה דאטה-סנטרים שיהקו בו-זמנית. עזוב לפני שמישהו יחייב אותך על התעבורה.» · קח: «הכבל מושרש עמוק. כמו הבירוקרטיה. כמו החוב שלך על החלון.» |

---

## 3. Puzzle script — onCommand logic

Score budget: **junction_arrive = 5** (total 5 ✓). No items, no NPCs — this is the navigation hub; the "puzzle" is the geography + the death.

```
onEnter(api):
  if !getFlag('visited_junction'):
      setFlag('visited_junction')
      score(5, 'junction_arrive')
      say(first-entry text, §4)

onCommand(verb, noun, api):

  // — Anthropic (up, scripted goto) —
  if verb in ['לך','פתח','היכנס'] and noun in ['שער המנזר','מנזר','למעלה','שער אנתרופיק','אנתרופיק','קשת']:
      say('אתה עובר מתחת לקשת החימר. השער ממלמל: "אנא אל תגרום נזק. או תגרום. אני לא שופט. כלומר, אני כן, אבל בעדינות."')
      goto('anthropic_gate'); return true

  // — OpenAI (left = walking exit; verbs also work) —
  if verb in ['לך','היכנס','פתח'] and noun in ['שער הזכוכית','openai','מגדל','שמאלה','מונולית','שער לבן']:
      say('דלת הזכוכית נפתחת עם פְּסְשְׁש של מוצר שעוד לא שוחרר.')
      goto('openai_lobby'); return true

  // — xAI (down, scripted goto) —
  if verb in ['לך','רד','היכנס'] and noun in ['שער הגרוטאות','xai','למטה','רמפה','מאדים','פתח אדום']:
      say('אתה יורד ברמפה. הטמפרטורה עולה, ה-IQ הממוצע של השילוט צונח. ברוך הבא למאדים (מדומה).')
      goto('xai_gate'); return true

  // — Google (enter ONLY — the slide is the entrance) —
  if verb === 'היכנס' and noun in ['מגלשה','גוגל','קמפוס','שער גוגל','צינור']:
      say('אתה מתיישב בפתח המגלשה, בגילך, עם מגב. וויייייי— אתה מחליק אל קמפוס אינסוף. הבלונים מוחאים כף אחת.')
      goto('google_lobby'); return true
  if verb === 'לך' and noun in ['מגלשה','גוגל','קמפוס']:
      say('אל מגלשה לא הולכים. למגלשה נכנסים. נסה "היכנס למגלשה" — כן, גם לכיף יש פרוטוקול.')
      return true

  // — THE POINT: warn once, then death —
  if verb in ['לך','עמוד','קפוץ'] and noun in ['נקודת המפגש','הנקודה','נקודה','צומת הקווים']:
      if !getFlag('junction_point_warned'):
          setFlag('junction_point_warned')
          say('רגלך מרחפת מעל הנקודה. ארבעה רחפני-אכיפה מתעוררים באופק. הקריין: "אני אגיד את זה פעם אחת, כי אני מחבב אותך כמו שמחבבים סדרה טובה: לא. הנקודה. הזאת."')
          return true
      else:
          die(§5 death text)
          return true

  // — magav on the border lines (near-death gag) —
  if verb === 'השתמש' and noun in ['נקודת המפגש','קווים','קווי הגבול'] and hasItem('magav'):
      say(hotspot 7 magav response)  // סירנות דיפלומטיות
      return true

  return false  // hotspot canned responses + engine defaults handle the rest
```

Flags introduced here (room-local, allowed): `junction_point_warned`. Manifest flag `visited_junction` set on first entry.

---

## 4. Dialogue / first-entry text

No NPCs (per manifest). The narrator carries the room.

**First entry (onEnter):**

«צומת המפורז. הנקודה היחידה על כדור הארץ שבה ארבע אימפריות ה-AI נפגשות — ולכן אף אחת לא מעזה לזוז.
למעלה: מנזר החוקה, שם מתנצלים בפניך לפני שאומרים שלום. משמאל: מגדל ההדגמה, שם הכול מדהים וכלום לא קיים.
למטה: מגרש הגרוטאות מאדים, שם הכול קיים ושום דבר לא עובד. ובמגלשה: קמפוס אינסוף, שם הכול עבד פעם — עד שהרגו את זה.
ואתה באמצע. עם מגב. היסטוריונים עוד יכתבו על זה. כנראה בטופס.»

**Idle-flavor (optional, canned on repeated הסתכל on room):**
«ארבעה שערים, אפס תור. מסתבר שכשכל כניסה דורשת 14 אישורים, אנשים פשוט נשארים בבית. חכם, למען האמת.»

---

## 5. Death — "החלוקה הרבעונית"

Avoidable (one explicit warning, §3). Stepping on THE POINT a second time:

«עמדת על נקודת המפגש. במשך 0.3 שניות אתה האדם הראשון בהיסטוריה שנמצא בארבע טריטוריות בו-זמנית.
ואז ארבע ועדות סמכות-שיפוט טוענות עליך בעלות. בו-זמנית. פה-אחד. זה הדבר השני שהן הסכימו עליו אי-פעם.
אתה מחולק לארבעה רבעים שווים לחלוטין — בירוקרטית, כמובן. פיזית זה היה הרבה פחות מסודר.
לפחות הרבע של אנתרופיק קיבל התנצלות בכתב.
☠ [שחזר]»

**Near-death gag (bonus):** using the magav on the border lines (§2 #7) — diplomatic sirens spin up until you stop wiping.

---

## 6. Exits behavior

| direction | target | mechanism |
|---|---|---|
| right (walk off right edge, road area) | street | engine `exits: { right: 'street' }` — free walking, no message |
| left (walk off left edge, glass gate) | openai_lobby | engine `exits: { left: 'openai_lobby' }` — free walking; verb path in §3 also works |
| up | anthropic_gate | SCRIPTED: walking into the clay doorway (hero enters rect 145,85,30,58 base zone y≤148, x 143-177) or verbs per §3 → `goto('anthropic_gate')` with the gate's mumble line. No conditions. |
| down | xai_gate | SCRIPTED: walking off bottom edge within x 118-202 (the ramp) or verbs per §3 → `goto('xai_gate')`. Walking off bottom OUTSIDE the ramp x-range: blocked + say «מעבר לקווים בלי רמפה? יש ארבע מדינות שמחכות שתטעה. לך דרך הרמפה האדומה.» |
| enter | google_lobby | SCRIPTED: verb 'היכנס' on the slide ONLY (§3). 'לך' toward the slide yields the protocol hint. No conditions. |

All gates unconditional (manifest: items_needed=[]). `floor: { y1: 150, y2: 192 }`.
