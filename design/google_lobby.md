# DESIGN — google_lobby — לובי קמפוס אינסוף

Act: google · Music: google · Score total: **5** (key prefix `google_lobby_*`)
Exits per manifest: `down → junction`, `right → google_corridors`.
Item here: `tofes_bitul` ("טופס ביטול-הפסקה"). Flag: `visited_google_lobby`.
NPC: קיוסק הטפסים (machine, talks via screen).

Vibe: playground-office that Google half-killed. Primary colors P[1]/P[4]/P[14]/P[2] on white P[15], everything dusty-beta, balloons at 40% helium, a slide instead of a door.

---

## 1. Layout (320x200)

Light source: top-center skylight → P[15] highlights on top edges, P[8] shadow strips under objects.

| Element | Rect / coords | Notes for artist |
|---|---|---|
| Ceiling strip | (0,0,320,14) P[7] | with a skylight (120,2,80,8) P[11], thin P[15] glare line |
| Wall | (0,14,320,131) P[15] | white; giant "circles" = concentric stacked rects: blue P[1] center ~(30,40), red P[4] ~(250,30), green P[2] ~(160,55) peeking behind desk. Each circle ≈ 3-4 nested rects (e.g. 40x40 P[1], inside 28x28 P[9]) |
| Floor | (0,145,320,55) P[7] | light gray, colored "carpet dots" — 6x3 rects P[14]/P[12]/P[10] scattered; walkable band y=150–192 |
| **המגלשה** (slide) | tube from ceiling: (52,14,26,20) P[14] vertical drop → curve rects (58,34,30,14),(72,48,30,14),(60,62,30,14) zig-zag → open chute (48,76,34,60) P[14] with P[6] inner shading → mouth at floor (44,136,42,14), P[8] shadow (44,150,42,4) | 1px P[0] outline. This is the OFFICIAL entrance. A tiny faded "כניסה →" arrow sign (88,70,18,10) P[7] pointing INTO the slide mouth |
| **דלפק קבלה** (reception desk) | (132,112,64,38), top (130,110,68,6) P[1] blue counter, body P[9], P[0] outline; shadow (132,150,64,4) P[8] | empty. On top: **פעמון** (156,102,10,8) P[14] dome + (154,108,14,2) P[6] base; **פתק** (172,100,12,10) P[15] with P[0] specks (text) |
| **קיוסק הטפסים** | body (224,96,40,54) P[9] rounded-ish (corner nibbles P[15]); **מסך** (232,104,24,16) P[10] smiley — two P[0] eyes 2x2 + mouth 8x2; **פתח פלט** (232,132,24,5) P[0] slot with P[7] lip; legs (228,150,6,4)+(254,150,6,4) P[8] | ANIM: screen face swaps every ~1.5s — `frame % 30 < 15` smile vs. wide-eyes (mouth becomes 4x4 "O"). After the puzzle (flag) draw screen P[8] DEAD with one P[0] pixel. Note: art is stateless — acceptable cheat: keep it animated; the DEATH of the screen lives in text only, or artist may key off nothing (approved) |
| **שלט BETA** | above kiosk (222,72,46,16) P[14] board, P[0] "dust" pixels sprinkled; on its corner a smaller sign (262,66,14,10) P[7] — a BETA sign on the BETA sign | crooked: right edge 2px lower |
| **בלונים** | 3 balloons hovering LOW: P[4] at ~(114,118,10,12), P[1] at ~(200,124,10,12), P[2] at ~(290,120,10,12), each with 1px P[8] string down to floor | ANIM: bob ±2px, `y + ((frame>>3)%2)*2`, out of phase per balloon. They float at knee height. Sad. |
| **פוף ירוק** (beanbag) | (96,138,34,16) P[2] blob + P[10] top highlight (100,138,26,4), P[8] shadow (96,152,34,3) | someone-shaped dent: P[0] 2px dip in top edge |
| **אופניים** | leaning on wall left: frame lines as thin rects (8,120,30,3) P[4] diagonalish steps, two wheels (6,132,14,14)+(28,132,14,14) P[0] rings with P[8] inner | flat tire: left wheel bottom row P[8] squashed 2px |
| **עציצים** | two: (296,120,16,30) P[2] leaves stack over P[6] pot (298,142,12,10); small one (208,136,10,14) | "אמיתיים מדי" — leaves TOO perfect, symmetric |
| Right exit gap | wall opening (308,80,12,70) P[7] darker corridor hint → google_corridors | hero walks off right edge |
| Bottom exit | open floor at bottom edge → junction | hero walks off bottom edge |

Hero (10x28) scale check: desk top y=110 ≈ chest height when hero feet at y=160. Slide mouth (42 wide) comfortably hero-sized. Kiosk slightly taller than hero — a friendly fridge.

---

## 2. Hotspots table

| # | name_he | aliases | rect (x,y,w,h) | look | other verbs |
|---|---|---|---|---|---|
| 1 | מגלשה | מגלשת, שקופית, כניסה, צינור | (44,14,64,136) | "המגלשה הצהובה היא הכניסה הרשמית לקמפוס. מישהו החליט שדלתות הן 'חיכוך במשפך המשתמש'. המישהו הזה קיבל קידום, ואז המוצר שלו הופסק." | השתמש/לך/קח/משוך/דחוף → **מוות** (ראה §5). טפס (raw) → same |
| 2 | קיוסק הטפסים | קיוסק, מכונה, מכונת טפסים, מסך | (224,72,44,82) | before flag: "מכונה עגלגלה עם מסך מחייך. היא מנפיקה טפסים בהתלהבות של גור לברדור. בפינת המסך: 'שירות זה בבטא מאז 2019'. כלומר — הוא בשיא חייו." · after: "המסך כבוי. פיקסל בודד מהבהב במרכז, כמו נר נשמה. הקיוסק הצטרף לבית הקברות בזמן אמת." | השתמש/לחץ/קח(טופס)/דבר → **הפאזל** (§3). דבר after-flag: "אתה מדבר אל מסך כבוי. אפילו בשבילך זה שפל חדש." |
| 3 | דלפק קבלה | דלפק, קבלה, שולחן | (130,96,68,54) | "דלפק קבלה מבריק, נקי, וריק לחלוטין. שכבת האבק דקה להפליא — סימן שמישהו עדיין מנקה פה. אתה מהנהן בכבוד מקצועי לעמיתך הנעלם." | פתח: "המגירות ננעלו בגרסה 2.4. הפיצ'ר 'פתיחת מגירה' הוסב לחוויית מנוי." |
| 4 | פעמון | פעמון קבלה, זמזם | (154,100,16,12) | "פעמון קבלה מנחושת. מתחתיו חרוט: 'צלצל פעם אחת לשירות. פעמיים — לשירות שהופסק.'" | לחץ/השתמש/דחוף → §3.2. קח: "אתה מרים את הפעמון. מתחתיו פתק: 'ידענו שתנסה. — הצוות (לשעבר)'. אתה מחזיר אותו." |
| 5 | פתק | פתק על הדלפק, הודעה | (172,98,14,14) | "פתק קטן ומנומס: 'הצוות אורגן מחדש. הצוות החדש אורגן מחדש. הצוות שאירגן את הרה-ארגון אורגן מחדש. לפניות: ראה פתק.' — זה הפתק." | קרא → same as look. קח: "הפתק הוא כרגע הסמכות הבכירה בלובי. עזוב אותו בתפקיד." |
| 6 | בלונים | בלון, בלוני מסיבה | (110,112,196,26) | "שלושה בלונים ממסיבת השקה כלשהי מרחפים בגובה ברך. ההליום עזב לפני שנתיים, אבל הם נשארו — מסירות שאין לאף מוצר בקמפוס." | קח: "אתה תופס בלון. הוא נאנח החוצה את שארית ההליום בקול של ועדה מתפרקת ומתרסק לרצפה. אתה מעמיד אותו בחזרה על החוט. מכובד יותר ככה." הרח: "ריח של גומי וחלומות רבעון שלישי 2024." |
| 7 | שלט בטא | שלט, בטא, שלט בטא על שלט | (222,64,54,26) | "שלט 'BETA' מאובק. עליו מודבק שלט 'BETA' קטן יותר. אתה מניח שיש שלישי, ברזולוציה שהעין לא קולטת. בטא עד הסוף — זה הסוף." | קח: "הוא מוברג. גם ההברגה בבטא, אבל דווקא היא יציבה להפליא." |
| 8 | פוף | פוף ירוק, כורסה, שק ישיבה | (96,134,36,22) | "פוף ירוק ענק עם שקע בצורת אדם. האדם עזב ב-2023. השקע נשאר, ממתין. יש דברים שגם רה-ארגון לא מוחק." | השתמש/לך: "אתה שוקע בפוף. הוא בולע אותך עד הצוואר. שלוש דקות של מאבק, ואתה נחלץ. הפוף רושם לעצמו נקודה." |
| 9 | אופניים | אופנים, אופני קמפוס | (4,116,40,32) | "אופני קמפוס צבעוניים עם צמיג קדמי שנפח את נשמתו. על הרמה: 'להנעה בין בניינים!' הבניינים היחידים שנותרו הם זה — וזה." | השתמש/קח: "אתה בן 54 עם ברך שמאל שדורשת טופס לפני כל כיפוף. האופניים האלה לא יקרו. גם הצמיג מסכים." |
| 10 | עציצים | עציץ, צמח, צמחים | (206,120,108,32)* | "עציצים אמיתיים. אמיתיים מדי — עלה אחד סימטרי מדי, ירוק מדי, מבריק מדי. אתה נשבע שאחד מהם הסתובב לעברך. בקמפוס הזה, גם הצמחייה עברה A/B טסטינג." | אכול → **כמעט-מוות** (§5.2). הרח: "ריח של פלסטיק בטעם כלורופיל. גרסת בטא של טבע." |

\* עציצים rect covers both pots; fine for a shared hotspot (kiosk rect wins on overlap — list kiosk earlier).

---

## 3. Puzzle script (onCommand)

Local flag: `google_lobby_form_printed`. Local flag: `google_lobby_bell_rung` (gag escalation).

### 3.1 The last form ever printed — **5 pts** (`google_lobby_form` = 5) ✅ sums to 5

```
if ((verb==='השתמש' || verb==='לחץ' || verb==='דבר') && noun==='קיוסק הטפסים')
   || (verb==='קח' && (noun==='טופס' || extra.raw includes 'טופס')):

  if api.hasItem('tofes_bitul'):
      api.say('הקיוסק מת, הטופס אצלך. אין פה יותר מה לחלוב. תתקדם.');
      return true;

  if api.getFlag('google_lobby_form_printed'):   // printed but somehow not held — safety
      api.say('המסך כבוי. הקיוסק סיים את תפקידו ההיסטורי. תן לו לנוח.');
      return true;

  // THE sequence:
  api.say('המסך מתעורר בחיוך: "שלום, משתמש! 👋 איזה טופס תרצה היום?"\nאתה מקיש: טופס ביטול-הפסקה.');
  api.say('"בחירה מצוינת! מדפיס... שים לב: שירות ההדפסה יופסק החל מ—"\nזזזט. הטופס מחליק מהפתח.\n"—עכשיו. הודפס! בדיוק בזמן." המסך מחייך חיוך אחרון, ונכבה.');
  api.addItem('tofes_bitul', 'טופס ביטול-הפסקה',
              'הטופס שמחיה מוצרים מתים. הודפס בעותק אחרון אי פעם. אל תקמט.');
  api.setFlag('google_lobby_form_printed');
  api.score(5, 'google_lobby_form');
  api.say('החזקת בידך את הטופס האחרון שיודפס אי פעם בקמפוס אינסוף. היסטוריונים היו בוכים. אתה בודק שאין עליו כתם קפה.');
  return true;
```

### 3.2 The bell (gag, 0 pts)

```
if ((verb==='לחץ' || verb==='השתמש' || verb==='דחוף') && noun==='פעמון'):
  if (!api.getFlag('google_lobby_bell_rung')):
      api.setFlag('google_lobby_bell_rung');
      api.say('דינג! ההד מתגלגל בלובי הריק. אף אחד לא בא.\nאחרי שלוש שניות, מדפסת נסתרת יורקת פתק: "תודה על פנייתך. הפעמון עבר רה-ארגון ומדווח כעת לצוות הצלילים, שאוחד עם צוות השקט."');
  else:
      api.say('דינג. הפעמון מתעלם ממך בנימוס. הוא בישיבת צוות. עם עצמו.');
  return true;
```

### 3.3 Flavor handlers

```
if (verb==='תן' && noun==='קיוסק הטפסים'):
  api.say('הקיוסק לא לוקח. הוא רק נותן. נתן. עבר זמן.'); return true;

if (verb==='קרא' && noun==='שלט בטא'):
  api.say('"BETA". ומתחת, בקטן: "BETA". אתה מפסיק לקרוא לפני שזה הופך רקורסיבי.'); return true;

if (verb==='הרח' && noun==='מגלשה'):
  api.say('ריח של פוליאתילן ואופטימיות משנת 2016. שניהם פגי תוקף.'); return true;
```

Everything else → `return false` (engine defaults).

---

## 4. Dialogue / onEnter

### First entry (`visited_google_lobby`)

```
onEnter:
  if (!api.getFlag('visited_google_lobby')):
      api.setFlag('visited_google_lobby');
      api.say('לובי קמפוס אינסוף. קירות לבנים, עיגולים בצבעי יסוד, ומגלשה במקום דלת — כי מישהו החליט שכיף זה KPI.\nהבלונים מרחפים בגובה ברך, שלטי הבטא מאובקים, והדלפק ריק. זה נראה כמו גן ילדים שפוטר.');
      api.say('אתה מיישר את הגב. ארבעים שנות ניסיון אומרות לך שמקום כזה נקי מדי בשביל מקום שאין בו אף אחד. מישהו פה עדיין מחזיק מגב. אתה מכבד את זה.');
```

### קיוסק הטפסים (NPC) — `דבר` before puzzle triggers the print (see §3.1). If somehow talked-at mid-nothing:
- "המסך מציג גלגל טעינה בצורת לב. הקיוסק אוהב אותך. זה לא הדדי, אבל נחמד שמנסים."

---

## 5. Death & near-death

### 5.1 DEATH — climbing the slide (avoidable, on-manifest)

Trigger: `השתמש/לך/משוך/דחוף/קח` on `מגלשה`, or raw "טפס" targeting it.

```
api.say('אתה מתחיל לטפס במגלשה נגד כיוון התנועה. מה כבר יכול לרדת ממנה? אף אחד לא ביקר פה שנים.');
api.die('רעם עמום. שלט דיגיטלי נדלק: "השקת בטא! 10,000 משתמשים חדשים!"\nנרמסת על ידי 10,000 משתמשי בטא. כולם נטשו אחרי יומיים. גם את הגופה שלך.');
```

### 5.2 Near-death gag — eating the plant

Trigger: `אכול עציץ/צמח`.

```
api.say('אתה נוגס בעלה. הוא קריספי, מבריק, ובטעם ניוזלטר.\nהגרון שלך מתחיל להתעדכן לגרסה חדשה. שלושים שניות של שיעול, והעדכון נכשל — אין לך הרשאות.\nניצלת. העלה, לעומת זאת, כבר שלח עליך דוח טלמטריה.');
```

---

## 6. Exits behavior

| Direction | Target | Type | Behavior |
|---|---|---|---|
| down (walk off bottom edge, y≥192) | `junction` | walking exit (`exits.down`) | free, always open |
| right (walk off right edge, through the wall gap at x≥308) | `google_corridors` | walking exit (`exits.right`) | free, always open |
| slide (up) | — | scripted TRAP | not an exit — it's the death (§5.1). The "official entrance" only lets beta users IN |
| left / up edges | — | none | engine default block; suggested canned: "הקיר לבן, סימטרי, ולא מתרשם ממך." |

No conditional exits in this room. `floor: { y1: 150, y2: 192 }`.

---

## 7. Score audit

| key | pts |
|---|---|
| `google_lobby_form` | 5 |
| **Total** | **5** ✅ matches manifest |
