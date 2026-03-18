import { BookOpen, ExternalLink, Library as LibraryIcon, Search, FileText, Video } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const resources = [
  {
    title: 'ספריא (Sefaria)',
    description: 'ספרייה דיגיטלית פתוחה של טקסטים יהודיים עם תרגומים וקישורים.',
    icon: LibraryIcon,
    url: 'https://www.sefaria.org.il',
    color: 'bg-blue-100 text-blue-600',
    tags: ['טקסטים', 'תרגומים', 'מפרשים']
  },
  {
    title: 'אוצר החכמה',
    description: 'הספרייה הווירטואלית הגדולה בעולם לספרות תורנית.',
    icon: BookOpen,
    url: 'https://www.otzar.org',
    color: 'bg-amber-100 text-amber-600',
    tags: ['ספרים סרוקים', 'חיפוש מתקדם']
  },
  {
    title: 'עלת התורה',
    description: 'מאגר שיעורי וידאו ושמע ממיטב הרבנים.',
    icon: Video,
    url: '#',
    color: 'bg-purple-100 text-purple-600',
    tags: ['וידאו', 'שמע', 'שיעורים']
  },
  {
    title: 'ויקיטקסט תורני',
    description: 'מאגר טקסטים מוקלדים חופשי לשימוש.',
    icon: FileText,
    url: 'https://he.wikisource.org',
    color: 'bg-green-100 text-green-600',
    tags: ['טקסטים', 'חופשי']
  }
]

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8 bg-secondary text-white rounded-3xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
            <LibraryIcon className="w-8 h-8 md:w-10 md:h-10" />
            בית המדרש הדיגיטלי
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            גישה מהירה למאגרי מידע תורניים, ספריות דיגיטליות ומשאבי לימוד מומלצים.
          </p>
        </div>
        
        {/* Decorative elements */}
        <BookOpen className="absolute -left-4 -bottom-4 w-48 h-48 text-white/5 -rotate-12" />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <a 
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-xl ${resource.color} group-hover:scale-110 transition-transform duration-200`}>
                <resource.icon className="w-8 h-8" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-secondary">
                    {resource.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* AI Study Plan Banner */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-50 border border-primary/20 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-secondary mb-3">
          צריך עזרה בבניית תוכנית לימוד?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          העזר ב-AI שלנו כדי לבנות תוכנית לימודים מותאמת אישית לצרכים שלך, כולל מקורות מומלצים ושאלות מנחות.
        </p>
        <Button className="btn-primary" size="lg">
          בנה תוכנית לימודים עם AI
        </Button>
      </div>
    </div>
  )
}
