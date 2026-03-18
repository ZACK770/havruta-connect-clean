# AI Development Rules: חברותא-קונקט

## 🎯 מסמך הנחיות קריטיות לעבודה עם AI

מסמך זה מכיל הנחיות מחייבות לכל AI העובד על פרויקט חברותא-קונקט. **קרא בעיון לפני כל פעולה**.

---

## 1. עקרונות יסוד (Core Principles)

### ✅ DO (חובה)
- **תמיד** עבוד ב-TypeScript עם type safety מלא
- **תמיד** השתמש ב-Next.js App Router (לא Pages Router)
- **תמיד** תמוך ב-RTL (dir="rtl") לעברית
- **תמיד** עצב Mobile-First ואז התאם לדסקטופ
- **תמיד** השתמש ב-Prisma לכל פעולות DB
- **תמיד** השתמש ב-Server Actions במקום API Routes כשאפשר
- **תמיד** בדוק אם קובץ קיים לפני יצירה (read_file תחילה)

### ❌ DON'T (אסור)
- **לעולם אל** תשתמש ב-Pages Router של Next.js
- **לעולם אל** תכתוב SQL ישיר (רק Prisma)
- **לעולם אל** תשכח RTL support
- **לעולם אל** תשתמש ב-inline styles (רק Tailwind)
- **לעולם אל** תמחק קוד קיים ללא אישור מפורש
- **לעולם אל** תשנה את ה-Prisma schema ללא migration

---

## 2. ארכיטקטורה (Architecture Rules)

### 2.1 מבנה תיקיות
```
✅ CORRECT:
app/
  (auth)/login/page.tsx
  (main)/discovery/page.tsx
  api/users/route.ts
  layout.tsx

❌ WRONG:
pages/login.tsx          # Pages Router - אסור!
src/app/...              # אין src/ folder
components/Login.tsx     # קומפוננטות לא בתיקיית app/
```

### 2.2 Naming Conventions
```typescript
✅ CORRECT:
// Files
UserCard.tsx             // PascalCase לקומפוננטות
user-actions.ts          // kebab-case לקבצים
useUserLocation.ts       // camelCase ל-hooks

// Variables
const userName = "...";  // camelCase
const MAX_USERS = 100;   // UPPER_CASE לקבועים

❌ WRONG:
usercard.tsx             // lowercase - לא!
User_Card.tsx            // snake_case - לא!
```

### 2.3 Import Order
```typescript
✅ CORRECT:
// 1. External packages
import React from 'react';
import { PrismaClient } from '@prisma/client';

// 2. Internal utilities
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// 3. Components
import { UserCard } from '@/components/ui/UserCard';

// 4. Types
import type { User } from '@prisma/client';

// 5. Styles (if any)
import './styles.css';
```

---

## 3. Database Rules (Prisma)

### 3.1 פקודות מותרות

#### Development (Local)
```bash
✅ ALLOWED:
npx prisma db push              # עדכון מהיר של schema
npx prisma studio               # UI לצפייה בנתונים
npx prisma generate             # יצירת Prisma Client
npx prisma format               # פורמט של schema

❌ FORBIDDEN:
npx prisma db push --force-reset  # מוחק את כל הנתונים!
DROP TABLE users;                 # SQL ישיר - אסור!
```

#### Production (Render)
```bash
✅ ALLOWED:
npx prisma migrate deploy       # Deploy של migrations
npx prisma generate             # יצירת client

❌ FORBIDDEN:
npx prisma db push              # רק ב-dev!
npx prisma migrate reset        # מוחק נתונים!
```

### 3.2 Schema Changes Workflow

```typescript
// ✅ CORRECT WORKFLOW:

// 1. עדכן את schema.prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  // + שדה חדש:
  phone String?
}

// 2. Development:
// npx prisma db push

// 3. Production:
// npx prisma migrate dev --name add_user_phone
// npx prisma migrate deploy

// ❌ WRONG WORKFLOW:
// לשנות schema ולהריץ ישר npm run build - יגרום לשגיאות!
```

### 3.3 Query Best Practices

```typescript
// ✅ CORRECT:
// Server Action עם type safety
'use server';

export async function getUsers(filters: FilterInput) {
  const users = await prisma.user.findMany({
    where: {
      categories: { hasSome: filters.categories },
      city: filters.city
    },
    select: {
      id: true,
      firstName: true,
      city: true,
      // לא לחשוף: phone, email
    },
    take: 20
  });
  return users;
}

// ❌ WRONG:
// SQL ישיר
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE city = ${city}
`; // SQL Injection risk!

// חשיפת כל הנתונים
const users = await prisma.user.findMany(); // מחזיר phone, email!
```

### 3.4 Transactions

```typescript
// ✅ CORRECT:
await prisma.$transaction(async (tx) => {
  const match = await tx.match.create({
    data: { senderId, receiverId }
  });
  
  await tx.user.update({
    where: { id: senderId },
    data: { matchCount: { increment: 1 } }
  });
});

// ❌ WRONG:
// פעולות נפרדות ללא transaction
await prisma.match.create({ ... });
await prisma.user.update({ ... }); // אם זה נכשל, ה-match כבר נוצר!
```

---

## 4. Next.js Rules

### 4.1 Server vs Client Components

```typescript
// ✅ CORRECT:

// Server Component (default)
// app/discovery/page.tsx
export default async function DiscoveryPage() {
  const users = await prisma.user.findMany();
  return <UserList users={users} />;
}

// Client Component (when needed)
// components/UserCard.tsx
'use client';
import { useState } from 'react';

export function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}

// ❌ WRONG:
// שימוש ב-'use client' בלי סיבה
'use client';
export default function Page() {
  return <div>Static content</div>; // לא צריך client!
}
```

### 4.2 Server Actions

```typescript
// ✅ CORRECT:
// app/actions/user-actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(userId: string, data: ProfileData) {
  const user = await prisma.user.update({
    where: { id: userId },
    data
  });
  
  revalidatePath('/profile');
  return user;
}

// ❌ WRONG:
// Server Action ללא 'use server'
export async function updateUser() { ... } // לא יעבוד!

// Server Action עם client-side code
'use server';
export async function updateUser() {
  const element = document.getElementById('user'); // Error!
}
```

### 4.3 API Routes (כשצריך)

```typescript
// ✅ CORRECT:
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  
  const users = await prisma.user.findMany({
    where: { city }
  });
  
  return NextResponse.json(users);
}

// ❌ WRONG:
// API Route בסגנון Pages Router
export default function handler(req, res) { // לא App Router!
  res.json({ users });
}
```

---

## 5. Tailwind CSS Rules

### 5.1 Class Naming

```tsx
// ✅ CORRECT:
<div className="flex items-center gap-4 p-6 bg-white rounded-[2.5rem] shadow-xl">
  <UserCircle size={24} className="text-blue-600" />
  <span className="text-lg font-black text-slate-900">שלום</span>
</div>

// ❌ WRONG:
<div style={{ display: 'flex', padding: '24px' }}> // inline styles!
<div className="flex padding-6"> // לא קיים!
<div className="flex p-6px"> // syntax שגוי!
```

### 5.2 Responsive Design

```tsx
// ✅ CORRECT: Mobile-First
<nav className="
  fixed bottom-8 left-1/2 -translate-x-1/2
  md:static md:translate-x-0
  lg:w-64
">
  {/* Mobile: bottom nav, Desktop: sidebar */}
</nav>

// ❌ WRONG: Desktop-First
<nav className="
  w-64 static
  md:fixed md:bottom-8
">
  {/* הפוך! */}
</nav>
```

### 5.3 RTL Support

```tsx
// ✅ CORRECT:
<div dir="rtl" className="text-right">
  <p className="mr-4"> {/* margin-right בעברית */}
    טקסט בעברית
  </p>
</div>

// ❌ WRONG:
<div className="text-left"> {/* יישור שמאל בעברית! */}
<p className="ml-4"> {/* margin-left - לא נכון ב-RTL */}
```

---

## 6. Capacitor Rules

### 6.1 Platform Detection

```typescript
// ✅ CORRECT:
import { Capacitor } from '@capacitor/core';

export async function getLocation() {
  if (Capacitor.isNativePlatform()) {
    // Native app
    const { Geolocation } = await import('@capacitor/geolocation');
    return await Geolocation.getCurrentPosition();
  } else {
    // Web browser
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}

// ❌ WRONG:
// שימוש ב-Capacitor API ללא בדיקה
import { Geolocation } from '@capacitor/geolocation';
const pos = await Geolocation.getCurrentPosition(); // יכשל בדפדפן!
```

### 6.2 Build Process

```bash
# ✅ CORRECT ORDER:
1. npm run build              # Build Next.js
2. npx cap sync android       # Sync to Capacitor
3. npx cap open android       # Open Android Studio
4. Build APK from Android Studio

# ❌ WRONG:
npx cap sync android          # לפני build - יסנכרן קבצים ישנים!
npm run build                 # מאוחר מדי
```

### 6.3 Configuration

```typescript
// ✅ CORRECT:
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hevruta.connect',
  appName: 'חברותא-קונקט',
  webDir: 'out',  // Next.js static export
  server: {
    url: process.env.NODE_ENV === 'production' 
      ? 'https://hevruta-connect.onrender.com'
      : 'http://localhost:3000'
  }
};

// ❌ WRONG:
webDir: 'build',  // לא Next.js!
webDir: '.next',  // תיקייה פנימית!
```

---

## 7. AI Integration Rules (Gemini)

### 7.1 API Calls

```typescript
// ✅ CORRECT:
const RETRY_DELAYS = [1000, 2000, 4000, 8000, 16000];

async function callGemini(prompt: string) {
  for (let i = 0; i < RETRY_DELAYS.length; i++) {
    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      
      if (!response.ok) throw new Error('API failed');
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === RETRY_DELAYS.length - 1) throw error;
      await new Promise(r => setTimeout(r, RETRY_DELAYS[i]));
    }
  }
}

// ❌ WRONG:
// ללא retry logic
const response = await fetch(GEMINI_URL, { ... });
return response.json(); // אם נכשל - crash!

// API key hardcoded
const apiKey = "AIza..."; // חשיפת מפתח!
```

### 7.2 Prompt Engineering

```typescript
// ✅ CORRECT:
const prompt = `
אתה בוט חכם של "חברותא-קונקט".
נתח מדוע המשתמש "${user1.firstName}" מתאים ל-"${user2.firstName}".

משתמש 1:
- מטרה: ${user1.learningGoal}
- רמה: ${user1.level}
- ביוגרפיה: ${user1.bio}

משתמש 2:
- מטרה: ${user2.learningGoal}
- רמה: ${user2.level}
- ביוגרפיה: ${user2.bio}

כתוב הסבר קצר (2-3 משפטים) בסגנון חגיגי ויהודי.
`;

// ❌ WRONG:
const prompt = `למה ${user1} מתאים ל-${user2}?`; // חסר הקשר!
const prompt = user1.toString(); // לא יעבוד!
```

### 7.3 Error Handling

```typescript
// ✅ CORRECT:
try {
  const analysis = await callGemini(prompt);
  setAiAnalysis(analysis);
} catch (error) {
  console.error('Gemini API failed:', error);
  setAiAnalysis('נמצאה התאמה מצוינת על בסיס נושאי הלימוד המשותפים!');
  // Fallback message
}

// ❌ WRONG:
const analysis = await callGemini(prompt);
setAiAnalysis(analysis); // אם נכשל - UI שבור!
```

---

## 8. Security & Privacy Rules

### 8.1 Data Exposure

```typescript
// ✅ CORRECT:
// Public profile (before match)
export async function getPublicProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,  // ✅
      city: true,       // ✅
      level: true,      // ✅
      // lastName: false  ❌ חסוי
      // phone: false     ❌ חסוי
      // email: false     ❌ חסוי
    }
  });
}

// Private profile (after match)
export async function getPrivateProfile(userId: string, requesterId: string) {
  // בדוק אם יש התאמה
  const match = await prisma.match.findFirst({
    where: {
      OR: [
        { senderId: userId, receiverId: requesterId, status: 'ACCEPTED' },
        { senderId: requesterId, receiverId: userId, status: 'ACCEPTED' }
      ]
    }
  });
  
  if (!match) throw new Error('Unauthorized');
  
  return await prisma.user.findUnique({
    where: { id: userId }
    // כל השדות
  });
}

// ❌ WRONG:
export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId }
  }); // חושף הכל לכולם!
}
```

### 8.2 Environment Variables

```typescript
// ✅ CORRECT:
// .env.local (NOT committed to Git)
DATABASE_URL="postgresql://..."
GEMINI_API_KEY="AIza..."

// lib/gemini.ts
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

// ❌ WRONG:
const apiKey = "AIzaSyC..."; // Hardcoded!
console.log(process.env.GEMINI_API_KEY); // לוג מפתח!
```

### 8.3 Input Validation

```typescript
// ✅ CORRECT:
import { z } from 'zod';

const UserInputSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^05\d-?\d{7}$/),
  firstName: z.string().min(2).max(50),
  city: z.string().min(2).max(100)
});

export async function createUser(input: unknown) {
  const validated = UserInputSchema.parse(input);
  return await prisma.user.create({ data: validated });
}

// ❌ WRONG:
export async function createUser(input: any) {
  return await prisma.user.create({ data: input }); // SQL Injection!
}
```

---

## 9. Performance Rules

### 9.1 Database Queries

```typescript
// ✅ CORRECT:
// עם pagination
const users = await prisma.user.findMany({
  take: 20,
  skip: page * 20,
  orderBy: { createdAt: 'desc' }
});

// עם select specific fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    firstName: true,
    city: true
  }
});

// ❌ WRONG:
// ללא limit
const users = await prisma.user.findMany(); // יכול להחזיר מיליונים!

// N+1 queries
for (const user of users) {
  const matches = await prisma.match.findMany({
    where: { senderId: user.id }
  }); // שאילתה לכל משתמש!
}

// ✅ FIX:
const users = await prisma.user.findMany({
  include: {
    sentMatches: true  // Single query
  }
});
```

### 9.2 Image Optimization

```tsx
// ✅ CORRECT:
import Image from 'next/image';

<Image 
  src="/avatar.jpg"
  alt="User avatar"
  width={100}
  height={100}
  className="rounded-full"
/>

// ❌ WRONG:
<img src="/avatar.jpg" /> // לא אופטימיזציה!
```

### 9.3 Code Splitting

```typescript
// ✅ CORRECT:
// Dynamic import לקומפוננטות כבדות
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loader />,
  ssr: false  // אם לא צריך SSR
});

// ❌ WRONG:
import HeavyComponent from './HeavyComponent'; // טוען תמיד!
```

---

## 10. Testing Rules

### 10.1 Manual Testing Checklist

```bash
# ✅ לפני כל commit:
□ npm run build              # Build מצליח?
□ npm run dev                # Dev server עובד?
□ npx prisma generate        # Prisma types עדכניים?
□ TypeScript errors = 0      # אין שגיאות type?
□ Mobile view tested         # בדקת responsive?
□ RTL tested                 # בדקת עברית?
```

### 10.2 Common Errors to Avoid

```typescript
// ❌ ERROR 1: Prisma Client not generated
// FIX: npx prisma generate

// ❌ ERROR 2: Module not found '@/lib/...'
// FIX: Check tsconfig.json paths

// ❌ ERROR 3: Hydration mismatch
// FIX: Don't use Date.now() or Math.random() in Server Components

// ❌ ERROR 4: CORS error in API
// FIX: Add headers in next.config.js

// ❌ ERROR 5: Capacitor plugin not found
// FIX: npx cap sync
```

---

## 11. Git & Deployment Rules

### 11.1 Commit Messages

```bash
# ✅ CORRECT:
git commit -m "feat: add AI matching feature"
git commit -m "fix: resolve GPS permission issue"
git commit -m "docs: update architecture docs"

# ❌ WRONG:
git commit -m "changes"
git commit -m "fix bug"
git commit -m "asdfasdf"
```

### 11.2 .gitignore

```bash
# ✅ MUST IGNORE:
.env
.env.local
.env.production
node_modules/
.next/
out/
android/
ios/

# ❌ NEVER COMMIT:
.env files with secrets
node_modules
build artifacts
```

### 11.3 Deployment Checklist

```bash
# ✅ לפני deploy ל-Render:
□ Environment variables set in Render dashboard
□ DATABASE_URL configured
□ GEMINI_API_KEY configured
□ Build command: npm install && npx prisma generate && npm run build
□ Start command: npm start
□ Prisma migrations deployed: npx prisma migrate deploy
```

---

## 12. Emergency Procedures

### 12.1 Database Issues

```bash
# ⚠️ אם DB לא מסונכרן:
1. npx prisma db pull        # Pull schema from DB
2. npx prisma generate       # Generate client
3. npm run dev               # Test

# ⚠️ אם migration נכשל:
1. Check Render logs
2. npx prisma migrate resolve --rolled-back <migration-name>
3. npx prisma migrate deploy
```

### 12.2 Build Failures

```bash
# ⚠️ אם build נכשל:
1. rm -rf .next node_modules
2. npm install
3. npx prisma generate
4. npm run build

# ⚠️ אם TypeScript errors:
1. Check tsconfig.json
2. npx tsc --noEmit
3. Fix errors one by one
```

### 12.3 APK Issues

```bash
# ⚠️ אם APK לא עובד:
1. Check capacitor.config.ts server.url
2. npx cap sync android
3. Clean build in Android Studio
4. Rebuild APK

# ⚠️ אם GPS לא עובד:
1. Check AndroidManifest.xml permissions
2. Request runtime permissions in code
3. Test on real device (not emulator)
```

---

## 13. Quick Reference Commands

### 13.1 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npx prisma studio              # DB GUI
npx prisma db push             # Quick schema update (dev only)
npx prisma generate            # Generate Prisma Client
npx prisma migrate dev         # Create migration (dev)
npx prisma migrate deploy      # Deploy migrations (prod)

# Capacitor commands
npx cap sync                   # Sync web assets
npx cap open android           # Open Android Studio
npx cap run android            # Run on device
```

### 13.2 Troubleshooting

```bash
# Clear cache
rm -rf .next node_modules
npm install

# Reset database (⚠️ DELETES DATA)
npx prisma migrate reset

# Check TypeScript
npx tsc --noEmit

# Check linting
npm run lint
```

---

## 14. Final Checklist

### ✅ לפני כל feature:
- [ ] קראתי את ARCHITECTURE.md
- [ ] קראתי את SPECIFICATION.md
- [ ] הבנתי את הדרישות
- [ ] תכננתי את המימוש

### ✅ במהלך פיתוח:
- [ ] כתבתי TypeScript עם types
- [ ] השתמשתי ב-Prisma (לא SQL)
- [ ] בדקתי RTL support
- [ ] בדקתי Mobile-First
- [ ] טיפלתי בשגיאות

### ✅ לפני commit:
- [ ] Build מצליח
- [ ] אין TypeScript errors
- [ ] בדקתי במובייל ובדסקטופ
- [ ] בדקתי בעברית
- [ ] עדכנתי documentation

### ✅ לפני deploy:
- [ ] Environment variables מוגדרים
- [ ] Migrations deployed
- [ ] Build מצליח ב-Render
- [ ] בדקתי ב-production URL

---

## 15. סיכום

**זכור תמיד**:

🎯 **Type Safety**: TypeScript + Prisma  
🎯 **Security**: חשיפה מדורגת, validation  
🎯 **Performance**: Pagination, caching, optimization  
🎯 **UX**: Mobile-First, RTL, Responsive  
🎯 **Architecture**: Next.js App Router, Server Actions  
🎯 **Database**: Prisma only, migrations, transactions  
🎯 **AI**: Retry logic, error handling, fallbacks  

**אם בספק - עצור ושאל!**

מסמך זה הוא המקור האמין היחיד. כל סטייה ממנו דורשת אישור מפורש.

---

**גרסה**: 1.0  
**עדכון אחרון**: מרץ 2026  
**מחבר**: צוות חברותא-קונקט
