# חברותא-קונקט (HevrutaConnect)

<div align="center">

**פלטפורמה חכמה לחיבור בין לומדי תורה**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Capacitor](https://img.shields.io/badge/Capacitor-5+-119EFF?style=for-the-badge&logo=capacitor)](https://capacitorjs.com/)

</div>

---

## 📖 תוכן עניינים

- [מבוא](#מבוא)
- [תכונות מרכזיות](#תכונות-מרכזיות)
- [Stack טכנולוגי](#stack-טכנולוגי)
- [התקנה ופיתוח](#התקנה-ופיתוח)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [מסמכים](#מסמכים)
- [תרומה לפרויקט](#תרומה-לפרויקט)

---

## 🎯 מבוא

**חברותא-קונקט** היא פלטפורמה היברידית (Web + Mobile APK) המיועדת לחיבור בין לומדי תורה ברחבי העולם. המערכת משלבת טכנולוגיה מתקדמת (AI, GPS, Mobile) עם רגישות לפרטיות ולערכים של קהילת הלומדים.

### הבעיה שאנו פותרים

- 🔍 **קושי במציאת חברותא מתאימה** לפי נושא, רמה וזמינות
- 📍 **חוסר מודעות לחברותות פוטנציאליות** באזור המגורים
- ❌ **חוסר התאמה** בסגנון או במטרות לימוד
- ⏰ **בזבוז זמן** בחיפוש ידני ממושך

### הפתרון שלנו

✅ חיפוש מבוסס מיקום (GPS)  
✅ סינון מתקדם לפי נושאים, זמנים ושיטות לימוד  
✅ התאמה חכמה מבוססת AI (Gemini)  
✅ חשיפה מדורגת לשמירה על פרטיות  
✅ יצירת תוכניות לימוד מותאמות אישית  

---

## ⚡ תכונות מרכזיות

### 🔎 גילוי חכם (Smart Discovery)
- תצוגת קארדים מעוצבת עם מידע מפורט
- חיפוש טקסט חופשי
- סינון מתקדם היררכי (נושאים, זמנים, שיטות)
- מיקום גיאוגרפי עם חישוב מרחקים

### 🤖 התאמה חכמה AI
- ניתוח התאמה אוטומטי באמצעות Gemini API
- הסבר מפורט מדוע שני לומדים מתאימים
- יצירת תוכניות לימוד מותאמות אישית (4 שבועות)

### 🔒 פרטיות ואבטחה
- **חשיפה מדורגת**: מידע בסיסי → פרטי קשר (לאחר התאמה)
- הצפנת סיסמאות (bcrypt)
- Validation מלא של קלט משתמשים (Zod)
- HTTPS בכל התקשורת

### 📱 חוויה היברידית
- **Web**: גישה דרך כל דפדפן
- **Mobile APK**: אפליקציה נייטיבית לאנדרואיד
- עיצוב Mobile-First רספונסיבי
- תמיכה מלאה ב-RTL (עברית)

### 📚 בית המדרש הדיגיטלי
- קישורים למאגרי מידע תורניים
- ספריא, אוצר החכמה, עלת התורה ועוד
- משאבים חיצוניים מאורגנים

---

## 🛠 Stack טכנולוגי

### Frontend
- **Next.js 14+** (App Router)
- **React 18+** (Server Components)
- **TypeScript 5+**
- **Tailwind CSS 3+**
- **Lucide React** (Icons)

### Backend
- **Next.js API Routes**
- **Server Actions**
- **Prisma ORM**
- **PostgreSQL** (Render)

### Mobile
- **Capacitor.js 5+**
- **@capacitor/geolocation**
- **Android WebView**

### AI
- **Google Gemini API** (gemini-2.5-flash-preview)

### Hosting
- **Render.com** (Web + Database)

---

## 🚀 התקנה ופיתוח

### דרישות מקדימות

- Node.js 18+ 
- npm או yarn
- PostgreSQL (local או Render)
- Android Studio (לבניית APK)

### התקנה

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/havruta.git
cd havruta

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# ערוך את .env.local עם הפרטים שלך

# 4. Setup database
npx prisma db push
npx prisma generate

# 5. Run development server
npm run dev
```

### Environment Variables

צור קובץ `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hevruta"
GEMINI_API_KEY="your-gemini-api-key"
NEXTAUTH_SECRET="random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

### פקודות שימושיות

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma db push       # Quick schema update (dev only)
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create migration

# Capacitor (Mobile)
npx cap sync android     # Sync web assets to Android
npx cap open android     # Open Android Studio
npx cap run android      # Run on device/emulator
```

---

## 📁 מבנה הפרויקט

```
havruta/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (main)/              # Main app routes
│   │   ├── discovery/       # חיפוש חברותות
│   │   ├── library/         # בית המדרש
│   │   ├── schedule/        # יומן לימוד
│   │   └── profile/         # פרופיל אישי
│   ├── api/                 # API Routes
│   └── layout.tsx           # Root layout
├── components/              # React Components
│   ├── ui/                  # Base UI components
│   └── features/            # Feature components
├── lib/                     # Utilities
│   ├── prisma.ts           # Prisma client
│   ├── gemini.ts           # Gemini API
│   └── capacitor.ts        # Capacitor helpers
├── prisma/                  # Database
│   ├── schema.prisma       # Schema definition
│   └── migrations/         # Migrations
├── דוקס/                     # Documentation
│   ├── ARCHITECTURE.md     # ארכיטקטורה
│   ├── SPECIFICATION.md    # אפיון
│   └── AI-RULES.md         # הנחיות AI
├── public/                  # Static assets
├── capacitor.config.ts      # Capacitor config
├── tailwind.config.ts       # Tailwind config
└── next.config.js           # Next.js config
```

---

## 📚 מסמכים

### מסמכי ליבה

- **[ARCHITECTURE.md](דוקס/ARCHITECTURE.md)** - ארכיטקטורה טכנית מפורטת
- **[SPECIFICATION.md](דוקס/SPECIFICATION.md)** - מסמך אפיון מלא
- **[AI-RULES.md](דוקס/AI-RULES.md)** - הנחיות לעבודה עם AI

### קבצי עזר

- **[reference-ui.html](reference-ui.html)** - UI Reference (React Component)

---

## 🏗 תהליך Build & Deploy

### Web Deployment (Render)

```bash
# 1. Push to GitHub
git push origin main

# 2. Render auto-builds and deploys
# Build Command: npm install && npx prisma generate && npm run build
# Start Command: npm start

# 3. Run migrations
npx prisma migrate deploy
```

### Android APK Build

```bash
# 1. Build Next.js
npm run build

# 2. Sync to Capacitor
npx cap sync android

# 3. Open Android Studio
npx cap open android

# 4. Build APK
# Build > Build Bundle(s) / APK(s) > Build APK(s)
```

---

## 🤝 תרומה לפרויקט

אנו מזמינים אותך לתרום לפרויקט! לפני שאתה מתחיל:

1. **קרא את המסמכים**:
   - `דוקס/ARCHITECTURE.md`
   - `דוקס/SPECIFICATION.md`
   - `דוקס/AI-RULES.md`

2. **עקוב אחר הכללים**:
   - TypeScript עם type safety מלא
   - Next.js App Router (לא Pages Router)
   - Prisma בלבד (לא SQL ישיר)
   - Mobile-First design
   - RTL support

3. **תהליך תרומה**:
   ```bash
   # Fork the repository
   git checkout -b feature/your-feature-name
   # Make your changes
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   # Open a Pull Request
   ```

---

## 📄 רישיון

MIT License - ראה קובץ [LICENSE](LICENSE) לפרטים.

---

## 📞 יצירת קשר

- **Email**: contact@hevruta-connect.com
- **GitHub Issues**: [github.com/yourusername/havruta/issues](https://github.com/yourusername/havruta/issues)

---

## 🙏 תודות

- **Next.js Team** - Framework מדהים
- **Prisma Team** - ORM מעולה
- **Capacitor Team** - Mobile wrapper נהדר
- **Google Gemini** - AI API חזק
- **Render** - Hosting אמין

---

<div align="center">

**בנוי באהבה עבור קהילת הלומדים** ❤️

[⬆ חזרה למעלה](#חברותא-קונקט-hevrutaconnect)

</div>
