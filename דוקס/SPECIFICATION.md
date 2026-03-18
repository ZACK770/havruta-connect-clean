# מסמך אפיון מלא: חברותא-קונקט (HevrutaConnect)

## 1. תמצית המערכת

### 1.1 מהי חברותא-קונקט?
**חברותא-קונקט** היא פלטפורמה חברתית-לימודית המיועדת לחיבור בין לומדי תורה ברחבי העולם. המערכת משלבת טכנולוגיה מתקדמת (AI, GPS, Mobile) עם רגישות לפרטיות ולערכים של קהילת הלומדים.

### 1.2 בעיה שהמערכת פותרת
- **בידוד לימודי**: קושי למצוא חברותא מתאימה לפי נושא, רמה וזמינות
- **מרחק גיאוגרפי**: חוסר מודעות לחברותות פוטנציאליות באזור המגורים
- **חוסר התאמה**: זוגות לימוד שלא מתאימים בסגנון או במטרות
- **בזבוז זמן**: חיפוש ידני ממושך ללא כלים חכמים

### 1.3 הפתרון
פלטפורמה היברידית (Web + Mobile APK) המאפשרת:
- ✅ חיפוש מבוסס מיקום (GPS)
- ✅ סינון מתקדם לפי נושאים, זמנים ושיטות לימוד
- ✅ התאמה חכמה מבוססת AI
- ✅ חשיפה מדורגת לשמירה על פרטיות
- ✅ יצירת תוכניות לימוד מותאמות אישית

---

## 2. חוויית המשתמש (User Experience)

### 2.1 תאימות פלטפורמות

#### Web (Desktop/Mobile Browser)
- **גישה**: דרך כל דפדפן מודרני
- **ניווט**: Sidebar בדסקטופ, Bottom Nav במובייל
- **יתרונות**: אין צורך בהתקנה, עדכונים אוטומטיים

#### Mobile APK (Android)
- **גישה**: אפליקציה מותקנת מקובץ APK
- **ניווט**: Bottom Navigation מותאם למגע
- **יתרונות**: 
  - גישה ל-GPS מדויק
  - התראות Push (עתידי)
  - חוויה נייטיבית מהירה

### 2.2 מסע המשתמש (User Journey)

```
1. הרשמה/התחברות
   ↓
2. בניית פרופיל
   - שם, עיר, רמת לימוד
   - נושאי לימוד מועדפים
   - זמני זמינות
   - מטרת לימוד
   ↓
3. גילוי חברותות (Discovery)
   - תצוגת קארדים
   - סינון מתקדם
   - חיפוש חכם AI
   ↓
4. צפייה בפרופיל מלא
   - מידע בסיסי (ציבורי)
   - יצירת תוכנית לימוד AI
   ↓
5. בקשת התאמה
   - שליחת בקשה
   - המתנה לאישור
   ↓
6. חשיפה הדדית
   - שם מלא
   - טלפון/אימייל
   - תיאום פגישה
   ↓
7. לימוד משותף
   - יומן לימוד
   - מעקב התקדמות (עתידי)
```

### 2.3 עיצוב ממשק (UI/UX Design)

#### עקרונות עיצוב
1. **Mobile-First**: עיצוב ראשוני למובייל, התאמה לדסקטופ
2. **RTL Native**: תמיכה מלאה בעברית מימין לשמאל
3. **Accessibility**: ניגודיות גבוהה, גדלי פונט נוחים
4. **Modern & Clean**: עיצוב מינימליסטי עם פינות מעוגלות

#### פלטת צבעים
```
Primary:   #3B82F6 (Blue 500)
Secondary: #0F172A (Slate 900)
Accent:    #10B981 (Emerald 500)
Warning:   #F59E0B (Amber 500)
Background:#F4F7FA (Slate 50)
Text:      #1E293B (Slate 800)
```

#### טיפוגרפיה
- **Headers**: Font Black (900 weight)
- **Body**: Font Medium (500 weight)
- **Labels**: Font Bold (700 weight)
- **Sizes**: 10px - 48px (responsive)

---

## 3. תכונות מרכזיות (Core Features)

### 3.1 גילוי חכם (Smart Discovery)

#### 3.1.1 תצוגת קארדים (Card View)
כל קארד מציג:
- **Header**: רקע כהה עם אווטר צבעוני
- **שם פרטי** (שם משפחה רק לאחר חשיפה)
- **עיר מגורים** + אייקון מיקום
- **רמת לימוד**: Badge בצבע כחול
- **נושאי לימוד**: עד 2 Badges בצבע סגול
- **מטרת לימוד**: ציטוט באיטליק ברקע אפור
- **כפתור פעולה**: "לפרופיל המלא"

#### 3.1.2 חיפוש טקסט חופשי
```typescript
interface SearchQuery {
  text: string;  // "גמרא", "ירושלים", "אברהם"
  fields: ['firstName', 'city', 'learningGoal', 'categories'];
}
```

#### 3.1.3 סינון מתקדם (Advanced Filters)
**Sidebar** עם קטגוריות מתקפלות (Accordion):

**א. נושאי לימוד** (BookOpen icon)
- הלכה למעשה
- הלכה בעיון
- רבנות
- דיינות
- חב"ד
- ברסלב
- קומרנא
- רמב"ם יומי
- גמרא בעיון
- רי"ף ורא"ש

**ב. זמני לימוד** (Clock icon)
- בוקר (6:00-12:00)
- צהריים (12:00-15:00)
- אחר הצהריים (15:00-18:00)
- ערב (18:00-23:00)

**ג. אופן הלימוד** (Video icon)
- זום / וידאו
- פרונטלי (מפגש פנים-אל-פנים)
- טלפוני

**ד. מיקום** (MapPin icon)
- מרחק מקסימלי (5, 10, 25, 50, 100 ק"מ)
- עיר ספציפית

### 3.2 התאמה חכמה AI (Smart Matching)

#### 3.2.1 תהליך ההתאמה
```
1. User clicks "התאמה חכמה AI"
   ↓
2. Loading overlay: "מחפש התאמה חכמה..."
   ↓
3. Algorithm:
   - מציאת משתמשים עם נושאים משותפים
   - סינון לפי זמינות וזמנים
   - ניקוד התאמה (0-100)
   ↓
4. Gemini API Analysis:
   - השוואת מטרות לימוד
   - ניתוח סגנון לימוד
   - יצירת הסבר טקסטואלי
   ↓
5. BotMatchDialog:
   - "נמצאה התאמה!"
   - הצגת הניתוח
   - כפתור "פתח פרופיל"
```

#### 3.2.2 דוגמת Prompt ל-Gemini
```
אתה בוט חכם של אפליקציית "חברותא-קונקט".
נתח מדוע המשתמש "ישראל" (מטרה: לימוד תניא בעיון, ביו: מחפש ללמוד חסידות לעומק)
מתאים למשתמש "אברהם" (מטרה: הלכות שבת בבית יוסף, ביו: לומד בישיבה כבר 5 שנים).
כתוב הסבר קצר (2-3 משפטים) בעיצוב חגיגי ויהודי על היתרונות של הלימוד המשותף שלהם.
```

#### 3.2.3 תוצאה לדוגמה
```
"שני לומדים עם תשוקה עמוקה ללימוד בעיון! 
בעוד שישראל מעמיק בחסידות ואברהם בהלכה, 
שניהם יכולים להעשיר זה את זה בגישות שונות ללימוד התורה. 
חיבור מבורך זה יכול להוליד חברותא של ממש!"
```

### 3.3 פרופיל משתמש (User Profile)

#### 3.3.1 מידע ציבורי (לפני חשיפה)
- שם פרטי
- עיר מגורים
- רמת לימוד
- נושאי לימוד
- מטרת לימוד
- ביוגרפיה קצרה
- שפות

#### 3.3.2 מידע פרטי (לאחר חשיפה הדדית)
- שם מלא
- מספר טלפון
- כתובת אימייל
- כתובת מדויקת (אופציונלי)

#### 3.3.3 תוכנית לימוד AI
**כפתור**: "בנה תוכנית לימודים אישית עם AI"

**Prompt לדוגמה**:
```
צור תוכנית לימודים מפורטת ל-4 שבועות עבור חברותא שרוצה ללמוד: "הלכות שבת בבית יוסף".
התוכנית צריכה לכלול:
- נושא לכל שבוע
- מקורות מומלצים (פרקים, סימנים)
- שאלות לדיון
- מטרות לימוד
הסגנון צריך להיות תורני, מעודד ומסודר.
```

**תוצאה לדוגמה**:
```markdown
## תוכנית לימוד: הלכות שבת בבית יוסף

### שבוע 1: יסודות הלכות שבת
- **מקורות**: בית יוסף אורח חיים סימנים רמב-שא
- **נושאים**: 39 מלאכות, תולדות מלאכות
- **שאלות**: מהי מלאכה? מהו תולדה?
- **מטרה**: הבנת המבנה הכללי

### שבוע 2: הלכות בישול ואפייה
...
```

### 3.4 בית המדרש הדיגיטלי (Library)

#### 3.4.1 משאבים חיצוניים
קישורים למאגרי מידע:
- **ספריא (Sefaria)**: ספרייה תורנית פתוחה
- **אוצר החכמה**: מאגר ספרים סרוקים
- **עלת התורה**: שיעורי תורה
- **ויקיטקסט תורני**: טקסטים מוקלדים

#### 3.4.2 עיצוב
- Hero section עם רקע כהה
- Grid של קארדים (2 columns בדסקטופ)
- כל קארד עם אייקון, כותרת, תיאור וקישור חיצוני

### 3.5 יומן לימוד (Schedule)

#### 3.5.1 תכונות בסיסיות (Phase 1)
- תצוגת יומן שבועי/חודשי
- כפתור "קבע חברותא"
- סנכרון עם Google Calendar (עתידי)

#### 3.5.2 תכונות מתקדמות (Phase 2)
- [ ] תזכורות אוטומטיות
- [ ] מעקב נוכחות
- [ ] סטטיסטיקות לימוד
- [ ] Streak counter (ימים רצופים)

### 3.6 פרופיל אישי (My Profile)

#### 3.6.1 תצוגה
- Header עם רקע gradient
- אווטר גדול ממורכז
- שם מלא
- Badges (רמה, מאומת)

#### 3.6.2 הגדרות (Settings)
- **פרטי חשבון**: עריכת שם, אימייל, טלפון
- **העדפות לימוד**: עדכון נושאים וזמנים
- **פרטיות**: בחירת רמת חשיפה
- **התראות**: ניהול התראות (עתידי)
- **שפה**: עברית/אנגלית (עתידי)

---

## 4. גישה למיקום (GPS Integration)

### 4.1 מטרות
- מציאת חברותות קרובות גיאוגרפית
- סינון לפי מרחק מקסימלי
- הצעת מפגשים פרונטליים

### 4.2 יישום טכני

#### Web (Browser API)
```typescript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    updateUserLocation(latitude, longitude);
  },
  (error) => {
    console.error('Location access denied');
  }
);
```

#### Mobile (Capacitor)
```typescript
import { Geolocation } from '@capacitor/geolocation';

const position = await Geolocation.getCurrentPosition();
const { latitude, longitude } = position.coords;
```

### 4.3 פרטיות מיקום
- **אחסון**: רק קואורדינטות (lat/lng) בדאטאבייס
- **תצוגה**: רק שם עיר (לא כתובת מדויקת)
- **חישוב מרחק**: בצד שרת בלבד
- **אישור משתמש**: בקשת הרשאה מפורשת

---

## 5. ניהול בסיס נתונים (Database Management)

### 5.1 Prisma Workflow

#### Development (Local)
```bash
# עדכון schema
npx prisma db push

# פתיחת Prisma Studio
npx prisma studio
```

#### Production (Render)
```bash
# יצירת migration
npx prisma migrate dev --name add_user_location

# Deploy ל-production
npx prisma migrate deploy
```

### 5.2 Seed Data (Optional)
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        firstName: 'אברהם',
        lastName: 'כהן',
        email: 'avraham@example.com',
        level: 'בוגר ישיבה גבוהה',
        city: 'ירושלים',
        learningGoal: 'הלכות שבת בבית יוסף',
        categories: ['halacha_deep', 'chabad']
      },
      // More users...
    ]
  });
}

main();
```

---

## 6. תהליך יצירת APK (APK Build Process)

### 6.1 הכנה ראשונית
```bash
# התקנת Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npm install @capacitor/geolocation

# אתחול Capacitor
npx cap init
```

### 6.2 Build & Sync
```bash
# 1. Build Next.js (static export)
npm run build

# 2. Sync עם Capacitor
npx cap sync android

# 3. פתיחת Android Studio
npx cap open android
```

### 6.3 Build APK ב-Android Studio
```
1. Build > Build Bundle(s) / APK(s) > Build APK(s)
2. הקובץ יישמר ב: android/app/build/outputs/apk/debug/app-debug.apk
3. העברה למכשיר והתקנה
```

### 6.4 Webview Configuration
ה-APK טוען את ה-URL של השרת ב-Render:
```typescript
// capacitor.config.ts
server: {
  url: 'https://hevruta-connect.onrender.com',
  cleartext: true
}
```

**יתרונות**:
- ✅ עדכונים אוטומטיים (ללא צורך ב-APK חדש)
- ✅ קוד אחד לכל הפלטפורמות
- ✅ גישה ל-Native APIs (GPS, Camera, etc.)

---

## 7. הנחיות לעבודה עם AI

### 7.1 Prompts מומלצים

#### עיצוב רכיב
```
צור רכיב דף ראשי ב-Next.js ו-Tailwind שהוא Mobile-first.
במובייל הניווט יהיה בתחתית, ובדסקטופ הוא יהיה בסיידבר צדדי.
השתמש ב-Cards רספונסיביים עם פינות מעוגלות (rounded-[2.5rem]).
הצבעים: slate-900, blue-600, white.
RTL support מלא.
```

#### לוגיקת מיקום
```
כתוב Hook ב-TypeScript שמשתמש ב-Capacitor Geolocation 
כדי לקבל מיקום נוכחי ומעדכן את המשתמש ב-Postgres 
דרך Next.js Server Action.
כלול טיפול בשגיאות ובקשת הרשאות.
```

#### Server Action
```
צור Next.js Server Action שמקבל userId ו-filters object,
מבצע query ל-Prisma עם סינון לפי categories ו-location,
ומחזיר מערך של משתמשים מתאימים.
כלול type safety מלא עם Zod validation.
```

### 7.2 Best Practices
- 🎯 **ספציפיות**: תן הקשר מלא (Next.js, Tailwind, Prisma)
- 🎯 **דוגמאות**: בקש דוגמאות קוד מלאות
- 🎯 **Type Safety**: דרוש TypeScript עם types מלאים
- 🎯 **RTL**: הדגש תמיכה בעברית
- 🎯 **Mobile-First**: תמיד התחל ממובייל

---

## 8. פריסה (Deployment)

### 8.1 Render Configuration

#### Web Service
```yaml
# render.yaml
services:
  - type: web
    name: hevruta-connect
    env: node
    buildCommand: npm install && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: hevruta-db
          property: connectionString
      - key: GEMINI_API_KEY
        sync: false
```

#### Database
```
Type: PostgreSQL
Plan: Free (or Starter)
Name: hevruta-db
Version: 15
```

### 8.2 Environment Variables
```env
# .env.local (Development)
DATABASE_URL="postgresql://localhost:5432/hevruta"
GEMINI_API_KEY="your-api-key-here"
NEXTAUTH_SECRET="random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# .env.production (Render)
DATABASE_URL="postgresql://user:pass@host:5432/db"
GEMINI_API_KEY="production-api-key"
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://hevruta-connect.onrender.com"
```

### 8.3 תהליך Deploy
```
1. Push to GitHub
   ↓
2. Render auto-detects changes
   ↓
3. Runs build command
   ↓
4. Runs Prisma migrations
   ↓
5. Starts Next.js server
   ↓
6. App live at: hevruta-connect.onrender.com
```

---

## 9. אבטחה ופרטיות (Security & Privacy)

### 9.1 חשיפה מדורגת (Progressive Disclosure)

#### Level 1: Public Profile
```typescript
{
  firstName: "אברהם",
  city: "ירושלים",
  level: "בוגר ישיבה",
  categories: ["halacha_deep"],
  learningGoal: "הלכות שבת"
}
```

#### Level 2: After Match Acceptance
```typescript
{
  ...publicProfile,
  lastName: "כהן",
  phone: "050-1234567",
  email: "avraham@example.com"
}
```

### 9.2 הצפנה (Encryption)
- **Passwords**: bcrypt hashing
- **API Keys**: Environment variables only
- **HTTPS**: SSL/TLS בכל התקשורת

### 9.3 Validation
```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^05\d-?\d{7}$/),
  firstName: z.string().min(2).max(50),
  city: z.string().min(2)
});
```

---

## 10. מדדי הצלחה (Success Metrics)

### 10.1 KPIs
- **User Acquisition**: מספר הרשמות חדשות
- **Match Rate**: אחוז התאמות מוצלחות
- **Engagement**: זמן ממוצע באפליקציה
- **Retention**: משתמשים פעילים חודשיים
- **Study Sessions**: מספר פגישות לימוד שתואמו

### 10.2 Analytics (Phase 2)
- [ ] Google Analytics
- [ ] Mixpanel / Amplitude
- [ ] Hotjar (Heatmaps)
- [ ] Sentry (Error tracking)

---

## 11. Roadmap

### Phase 1: MVP (חודשים 1-2) ✅
- [x] הרשמה והתחברות
- [x] בניית פרופיל
- [x] גילוי חברותות
- [x] סינון מתקדם
- [x] התאמה חכמה AI
- [x] תוכנית לימוד AI
- [x] בית המדרש הדיגיטלי
- [x] Build APK

### Phase 2: Enhanced Features (חודשים 3-4)
- [ ] Real-time messaging
- [ ] Video calls (Zoom integration)
- [ ] Calendar sync
- [ ] Push notifications
- [ ] iOS support

### Phase 3: Community (חודשים 5-6)
- [ ] קבוצות לימוד
- [ ] פורומים לדיון
- [ ] שיתוף תוכניות לימוד
- [ ] דירוג ומשוב

### Phase 4: Gamification (חודשים 7-8)
- [ ] Achievements & Badges
- [ ] Leaderboards
- [ ] Streak tracking
- [ ] Referral program

---

## 12. סיכום

**חברותא-קונקט** היא פלטפורמה מקיפה המשלבת:

🎯 **טכנולוגיה מתקדמת**: Next.js, AI, GPS, Mobile  
🎯 **חוויית משתמש מעולה**: Mobile-First, RTL, Responsive  
🎯 **פרטיות ואבטחה**: חשיפה מדורגת, הצפנה  
🎯 **מדרגיות**: ארכיטקטורה מוכנה לצמיחה  
🎯 **ערך חברתי**: חיבור בין לומדים, חיזוק קהילה  

המערכת מוכנה לשימוש מיידי ולהתפתחות עתידית בהתאם לצרכי הקהילה.
