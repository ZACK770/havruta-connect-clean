# מסמך ארכיטקטורה: חברותא-קונקט (HevrutaConnect)

## 1. סקירה כללית

**חברותא-קונקט** היא פלטפורמה היברידית (Web + Mobile APK) המיועדת לחיבור בין לומדי תורה. המערכת בנויה כ-**Single Codebase** ב-Next.js שמתפקד גם כאתר וגם כאפליקציה מובייל נייטיבית באמצעות Capacitor.js.

---

## 2. Stack טכנולוגי

### 2.1 Frontend Framework
- **Next.js 14+** (App Router)
  - React Server Components
  - Server Actions לניהול מצב
  - API Routes למסלולי Backend
  
### 2.2 UI/UX Layer
- **Tailwind CSS** - עיצוב רספונסיבי Mobile-First
- **Lucide React** - ספריית אייקונים מודרנית
- **shadcn/ui** (אופציונלי) - קומפוננטות UI מתקדמות
- **RTL Support** - תמיכה מלאה בעברית (dir="rtl")

### 2.3 Mobile Wrapper
- **Capacitor.js 5+**
  - גישה ל-Native APIs (GPS, Camera, Storage)
  - Build ל-Android APK
  - WebView מתקדם עם ביצועים גבוהים

### 2.4 Database & ORM
- **PostgreSQL** (Hosted on Render)
- **Prisma ORM**
  - Type-safe database queries
  - Schema migrations
  - Automatic TypeScript types

### 2.5 AI Integration
- **Google Gemini API** (gemini-2.5-flash-preview)
  - ניתוח התאמה בין משתמשים
  - יצירת תוכניות לימוד מותאמות אישית
  - Retry logic עם exponential backoff

### 2.6 Hosting & Deployment
- **Render.com**
  - Web Service (Next.js)
  - PostgreSQL Database
  - Automatic deployments from Git

---

## 3. ארכיטקטורה היברידית (Hybrid Architecture)

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
├──────────────────────┬──────────────────────────────────┤
│   Web Browser        │      Mobile APK (Capacitor)      │
│   (Desktop/Mobile)   │      (Android WebView)           │
└──────────────────────┴──────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│              Next.js Application (Render)                │
├─────────────────────────────────────────────────────────┤
│  • App Router (Pages & Layouts)                         │
│  • Server Components                                     │
│  • Server Actions (DB Operations)                       │
│  • API Routes (REST/GraphQL)                            │
└─────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────┬──────────────────┬──────────────────┐
│   Prisma ORM     │   Gemini API     │  Capacitor APIs  │
│   (Database)     │   (AI Logic)     │  (GPS, Native)   │
└──────────────────┴──────────────────┴──────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│            PostgreSQL Database (Render)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 4. מבנה תיקיות (Project Structure)

```
havruta/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (main)/                   # Main app routes
│   │   ├── discovery/            # חיפוש חברותות
│   │   ├── library/              # בית המדרש הדיגיטלי
│   │   ├── schedule/             # יומן לימוד
│   │   └── profile/              # פרופיל אישי
│   ├── api/                      # API Routes
│   │   ├── users/
│   │   ├── matches/
│   │   └── ai/
│   ├── layout.tsx                # Root layout (RTL, fonts)
│   └── page.tsx                  # Landing page
├── components/                   # React Components
│   ├── ui/                       # Base UI components
│   │   ├── Badge.tsx
│   │   ├── NavButton.tsx
│   │   └── UserCard.tsx
│   ├── features/                 # Feature components
│   │   ├── FilterSidebar.tsx
│   │   ├── UserDetailModal.tsx
│   │   └── BotMatchDialog.tsx
│   └── layouts/                  # Layout components
├── lib/                          # Utilities & Helpers
│   ├── prisma.ts                 # Prisma client instance
│   ├── gemini.ts                 # Gemini API wrapper
│   ├── capacitor.ts              # Capacitor helpers
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema
│   ├── schema.prisma             # Prisma schema
│   └── migrations/               # DB migrations
├── public/                       # Static assets
│   ├── icons/
│   └── images/
├── capacitor.config.ts           # Capacitor configuration
├── android/                      # Android project (auto-generated)
├── tailwind.config.ts            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

---

## 5. Data Model (Prisma Schema)

### 5.1 User Model
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  phone         String?  @unique
  firstName     String
  lastName      String
  isExposed     Boolean  @default(false)  // האם חשף פרטים
  
  // Profile
  level         String                     // "בוגר ישיבה", "סמיכה לרבנות"
  bio           String?
  learningGoal  String
  avatarColor   String   @default("#3b82f6")
  
  // Location
  city          String
  country       String   @default("ישראל")
  latitude      Float?
  longitude     Float?
  
  // Preferences
  categories    String[]                   // Array of category IDs
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  sentMatches     Match[] @relation("MatchSender")
  receivedMatches Match[] @relation("MatchReceiver")
  studyPlans      StudyPlan[]
}
```

### 5.2 Match Model
```prisma
model Match {
  id          String   @id @default(cuid())
  
  senderId    String
  sender      User     @relation("MatchSender", fields: [senderId], references: [id])
  
  receiverId  String
  receiver    User     @relation("MatchReceiver", fields: [receiverId], references: [id])
  
  status      MatchStatus @default(PENDING)
  aiAnalysis  String?                      // Gemini analysis
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([senderId, receiverId])
}

enum MatchStatus {
  PENDING
  ACCEPTED
  REJECTED
  EXPIRED
}
```

### 5.3 StudyPlan Model
```prisma
model StudyPlan {
  id          String   @id @default(cuid())
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  partnerId   String?                      // חברותא
  topic       String
  content     String                       // AI-generated plan
  weeks       Int      @default(4)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 6. תהליכי עבודה מרכזיים (Core Workflows)

### 6.1 חיפוש חברותא (Discovery Flow)

```typescript
// 1. User applies filters
const filters = {
  categories: ["halacha_deep", "chabad"],
  times: ["time_evening"],
  method: ["method_zoom"],
  maxDistance: 50 // km
};

// 2. Server Action queries DB
const matches = await prisma.user.findMany({
  where: {
    categories: { hasSome: filters.categories },
    // Location-based filtering using PostGIS or manual calculation
  },
  take: 20
});

// 3. Display results in UserCard components
```

### 6.2 התאמה חכמה AI (Smart Matching)

```typescript
// 1. User clicks "התאמה חכמה AI"
const currentUser = await getCurrentUser();

// 2. Find potential matches
const candidates = await findPotentialMatches(currentUser);

// 3. Call Gemini API for analysis
const analysis = await callGemini(`
  נתח מדוע ${currentUser.firstName} מתאים ל-${candidate.firstName}
  על בסיס: ${currentUser.learningGoal} ו-${candidate.learningGoal}
`);

// 4. Show BotMatchDialog with analysis
```

### 6.3 יצירת תוכנית לימוד (Study Plan Generation)

```typescript
// 1. User opens profile and clicks "בנה תוכנית"
const studyPlan = await callGemini(`
  צור תוכנית לימודים ל-4 שבועות עבור: ${user.learningGoal}
  כלול נושא שבועי ומקורות מומלצים
`);

// 2. Save to database
await prisma.studyPlan.create({
  data: {
    userId: user.id,
    topic: user.learningGoal,
    content: studyPlan,
    weeks: 4
  }
});
```

### 6.4 גישה ל-GPS (Location Access)

```typescript
// lib/capacitor.ts
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

export async function getCurrentPosition() {
  if (Capacitor.isNativePlatform()) {
    // Native app - use Capacitor
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  } else {
    // Web - use browser API
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }),
        reject
      );
    });
  }
}
```

---

## 7. Responsive Design Strategy

### 7.1 Mobile-First Approach
```tsx
// Bottom Navigation (Mobile)
<nav className="fixed bottom-8 left-1/2 -translate-x-1/2 
                bg-slate-900 rounded-[3rem] p-4 
                md:hidden">
  {/* Navigation buttons */}
</nav>

// Sidebar Navigation (Desktop)
<aside className="hidden md:block fixed right-0 top-0 
                  h-full w-64 bg-white shadow-xl">
  {/* Sidebar content */}
</aside>
```

### 7.2 Breakpoints
- **Mobile**: < 768px (Bottom Nav)
- **Tablet**: 768px - 1024px (Adaptive layout)
- **Desktop**: > 1024px (Sidebar Nav)

---

## 8. תהליך Build & Deploy

### 8.1 Development
```bash
# Install dependencies
npm install

# Setup database
npx prisma db push

# Run dev server
npm run dev
```

### 8.2 Production Web Deploy (Render)
```bash
# Build Next.js
npm run build

# Prisma migrations
npx prisma migrate deploy

# Start production server
npm start
```

### 8.3 Android APK Build
```bash
# 1. Build Next.js
npm run build

# 2. Sync with Capacitor
npx cap sync android

# 3. Open Android Studio
npx cap open android

# 4. Build APK from Android Studio
# Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### 8.4 Capacitor Configuration
```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hevruta.connect',
  appName: 'חברותא-קונקט',
  webDir: 'out',  // Next.js static export
  server: {
    url: 'https://hevruta-connect.onrender.com',  // Production URL
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
```

---

## 9. אבטחה ופרטיות (Security & Privacy)

### 9.1 חשיפה מדורגת
- **שלב 1**: שם פרטי, עיר, רמה, נושאי לימוד
- **שלב 2**: לאחר התאמה הדדית - שם מלא, טלפון, אימייל

### 9.2 הגנת מידע
```typescript
// Server Action - Hide sensitive data
export async function getPublicProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      level: true,
      city: true,
      categories: true,
      // Exclude: lastName, phone, email
    }
  });
  return user;
}
```

### 9.3 Environment Variables
```env
DATABASE_URL="postgresql://..."
GEMINI_API_KEY="..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://..."
```

---

## 10. ביצועים ו-Optimization

### 10.1 Next.js Optimizations
- **Server Components** - Reduce client-side JavaScript
- **Image Optimization** - next/image component
- **Code Splitting** - Automatic route-based splitting
- **Caching** - ISR (Incremental Static Regeneration)

### 10.2 Database Optimizations
```prisma
// Indexes for fast queries
model User {
  @@index([city])
  @@index([categories])
  @@index([createdAt])
}
```

### 10.3 AI Rate Limiting
```typescript
// Exponential backoff for Gemini API
const backoff = [1000, 2000, 4000, 8000, 16000];
for (let i = 0; i < backoff.length; i++) {
  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    if (i === backoff.length - 1) throw error;
    await sleep(backoff[i]);
  }
}
```

---

## 11. Future Enhancements

### 11.1 Phase 2 Features
- [ ] Real-time messaging (WebSockets/Pusher)
- [ ] Video call integration (Zoom API)
- [ ] Calendar sync (Google Calendar API)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] iOS support (Capacitor iOS)

### 11.2 Advanced AI Features
- [ ] Personality matching algorithm
- [ ] Learning style analysis
- [ ] Automatic scheduling suggestions
- [ ] Progress tracking & analytics

---

## 12. סיכום טכני

**חברותא-קונקט** בנויה על ארכיטקטורה מודרנית ומדרגית:

✅ **Single Codebase** - קוד אחד לכל הפלטפורמות  
✅ **Type-Safe** - TypeScript + Prisma  
✅ **AI-Powered** - Gemini integration  
✅ **Mobile-Native** - Capacitor.js  
✅ **Production-Ready** - Render hosting  
✅ **Privacy-First** - חשיפה מדורגת  

המערכת מוכנה לסקייל ולהתפתחות עתידית תוך שמירה על חוויית משתמש מעולה ופרטיות מקסימלית.
