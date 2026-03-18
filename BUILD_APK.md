# 📱 בניית APK לחברותא-קונקט

## דרך 1: בנייה אוטומטית דרך GitHub Actions (מומלץ)

### שלב 1: העלאה ל-GitHub
```bash
git add .
git commit -m "Add APK build workflow"
git push origin main
```

### שלב 2: הפעלת הבנייה
1. גש ל- [GitHub Actions](https://github.com/lemaanyilmedo/ORIGAMI/actions)
2. בחר את ה-workflow "Build Android APK"
3. לחץ על "Run workflow"
4. המתן כ-5-10 דקות לסיום הבנייה
5. הורד את קובץ ה-APK מה-artifacts

## דרך 2: בנייה מקומית (דורש התקנות)

### דרישות מקדימות
1. **Java 17+**
   ```bash
   # Windows - הורד מ: https://adoptium.net/
   # או התקן דרך package manager
   ```

2. **Android Studio** (אופציונלי)
   ```bash
   # הורד מ: https://developer.android.com/studio
   ```

### תהליך הבנייה
```bash
# 1. בניית Next.js
npm run build

# 2. סינכרון עם Capacitor
npx cap sync android

# 3. בניית APK
cd android
./gradlew assembleDebug

# 4. ה-APK יהיה ב:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## דרך 3: שימוש ב-Android Studio

### אחרי סינכרון Capacitor
```bash
# פתח את Android Studio
npx cap open android
```

### ב-Android Studio:
1. בחר `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. המתן לסיום הבנייה
3. ה-APK יישמר בתיקיית הפרויקט

## מידע על ה-APK

### פרטי אפליקציה
- **שם**: חברותא-קונקט
- **Package**: com.hevruta.connect
- **גרסה**: 0.1.0
- **מינימום Android**: API 21+

### תכונות
- ✅ תמיכה מלאה בעברית (RTL)
- ✅ עיצוב Mobile-First
- ✅ חיבור לשרת החי
- ✅ GPS ותכונות מקומיות
- ✅ התאמה חכמה עם AI

## התקנה על מכשיר

### התקנה מקומית
```bash
# העברה למכשיר (עם ADB)
adb install android/app/build/outputs/apk/debug/app-debug.apk

# או העתק ישירות למכשיר והתקן דרך מנהל הקבצים
```

### הפצה למשתמשים
1. **פיתוח**: שתף את קובץ ה-APK ישירות
2. **ייצור**: השתמש ב-App Signing לחתימה דיגיטלית
3. **חנות**: העלה ל-Google Play Store

## פתרון בעיות

### בעיות נפוצות
1. **JAVA_HOME לא מוגדר**
   ```bash
   export JAVA_HOME=/path/to/java
   ```

2. **שגיאות גריידל**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

3. **בעיות תלות**
   ```bash
   npm ci
   npx cap sync android
   ```

### תמיכה
- 📧 דרך GitHub Issues
- 📖 מסמכים בתיקיית `דוקס/`
- 🔧 קוד מקור ב-GitHub

---

**הערה**: ה-APK מתחבר לשרת החי ב-Render.com ומציג את הגרסה העדכנית של האפליקציה.
