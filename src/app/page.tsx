import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { BookOpen, Users, MapPin, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-secondary mb-6">
              חברותא-קונקט
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-8">
              חברו לומדי תורה מכל העולם בפלטפורמה חכמה ומתקדמת
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              מצא את חברותא המושלמת לפי נושאי לימוד, רמה, זמינות ומיקום גיאוגרפי
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="btn-primary text-lg px-8 py-4">
                  התחל עכשיו
                </Button>
              </Link>
              <Link href="/discovery">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  גלה חברותות
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-secondary mb-16">
            למה חברותא-קונקט?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">חיפוש מבוסס מיקום</h3>
              <p className="text-muted-foreground">
                מצא חברותות קרובות למקום מגוריך ללימוד פרונטלי
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">סינון מתקדם</h3>
              <p className="text-muted-foreground">
                סנן לפי נושאים, רמת לימוד, זמנים ואופן הלימוד
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">התאמה חכמה AI</h3>
              <p className="text-muted-foreground">
                אלגוריתם AI מתקדם מוצא את ההתאמה המושלמת עבורך
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">פרטיות מוגנת</h3>
              <p className="text-muted-foreground">
                חשיפה מדורגת של מידע אישי רק לאחר התאמה הדדית
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            מוכן למצוא את חברותא הבאה?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            הצטרף לאלפי לומדים שכבר מחוברים בפלטפורמה
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              הרשם חינם
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
