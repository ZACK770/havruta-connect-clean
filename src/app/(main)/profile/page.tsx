'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { User, MapPin, BookOpen, Clock, Settings, ShieldCheck, Video, Phone, CheckCircle2 } from 'lucide-react'

// Mock current user data
const currentUser = {
  id: 'current-1',
  firstName: 'דוד',
  lastName: 'לוי',
  email: 'david@example.com',
  phone: '050-1234567',
  city: 'ירושלים',
  level: 'אברך כולל',
  isExposed: true,
  categories: ['הלכה בעיון', 'גמרא בעיון', 'שולחן ערוך'],
  learningGoal: 'לימוד בעיון של מסכת שבת, עם חזרות וסיכומים, במטרה לכתוב חבורות.',
  bio: 'לומד בכולל בירושלים. מחפש חברותא רצינית לשעות הערב. אוהב ללמוד לאט ולהבין לעומק.',
  preferredTimes: ['ערב (18:00-23:00)', 'לילה (23:00-01:00)'],
  learningMethod: ['פרונטלי', 'זום / וידאו'],
  avatarColor: '#8b5cf6'
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showFullProfile, setShowFullProfile] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl pb-24 md:pb-6">
      {/* Profile Header */}
      <div className="relative mb-20 md:mb-24">
        {/* Cover Background */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary to-blue-400 rounded-t-[2rem] w-full absolute top-0 left-0 z-0"></div>
        
        {/* Settings Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Avatar & Basic Info */}
        <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center w-full">
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg bg-primary"
            style={{ backgroundColor: currentUser.avatarColor }}
          >
            <User className="w-12 h-12 md:w-16 md:h-16" />
          </div>
          
          <div className="mt-4 text-center">
            <h1 className="text-2xl md:text-3xl font-black text-secondary flex items-center justify-center gap-2">
              {currentUser.firstName} {showFullProfile ? currentUser.lastName : ''}
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{currentUser.city}</span>
            </div>
            <div className="mt-3">
              <Badge variant="info" className="text-sm px-4 py-1">
                {currentUser.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 md:mt-40 space-y-6">
        
        {/* Progressive Disclosure Toggle */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">חשיפה מדורגת</h3>
              <p className="text-sm text-blue-700">בחר אילו פרטים לחשוף לשאר המשתמשים</p>
            </div>
          </div>
          <Button 
            variant={showFullProfile ? "default" : "outline"}
            onClick={() => setShowFullProfile(!showFullProfile)}
            className="w-full sm:w-auto"
          >
            {showFullProfile ? "הסתר פרטים אישיים" : "הצג תצוגת פרופיל מלא"}
          </Button>
        </div>

        {/* Private Info (Only shown when exposed) */}
        {showFullProfile && (
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 animate-fade-in">
            <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              פרטים אישיים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-sm text-muted-foreground block mb-1">שם מלא</span>
                <span className="font-medium text-secondary">{currentUser.firstName} {currentUser.lastName}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-sm text-muted-foreground block mb-1">אימייל</span>
                <span className="font-medium text-secondary" dir="ltr">{currentUser.email}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <span className="text-sm text-muted-foreground block mb-1">טלפון</span>
                <span className="font-medium text-secondary" dir="ltr">{currentUser.phone}</span>
              </div>
            </div>
          </div>
        )}

        {/* Learning Preferences */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            העדפות לימוד
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-3">נושאי לימוד</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-3">מטרת הלימוד</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-secondary italic">"{currentUser.learningGoal}"</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-muted-foreground mb-3">קצת עליי</h3>
              <p className="text-secondary leading-relaxed">{currentUser.bio}</p>
            </div>
          </div>
        </div>

        {/* Availability & Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              זמנים מועדפים
            </h2>
            <div className="space-y-2">
              {currentUser.preferredTimes.map((time, idx) => (
                <div key={idx} className="flex items-center gap-2 text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              אופן הלימוד
            </h2>
            <div className="space-y-2">
              {currentUser.learningMethod.map((method, idx) => (
                <div key={idx} className="flex items-center gap-2 text-secondary">
                  {method.includes('זום') ? (
                    <Video className="w-4 h-4 text-blue-500" />
                  ) : method.includes('פרונטלי') ? (
                    <MapPin className="w-4 h-4 text-orange-500" />
                  ) : (
                    <Phone className="w-4 h-4 text-green-500" />
                  )}
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
