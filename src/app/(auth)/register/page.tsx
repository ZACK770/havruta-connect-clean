'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { User, Mail, Phone, Lock, Eye, EyeOff, BookOpen, MapPin, Clock, ChevronLeft, Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    studyLevel: '',
    location: '',
    availability: '',
    topics: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration data:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-primary/5">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(14 165 233) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ChevronLeft className="w-4 h-4 ml-2" />
            חזרה לדף הבית
          </Link>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-secondary mb-4">
            הצטרף לחברותא-קונקט
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            צור פרופיל ומצא את חברותא המושלמת ללימוד מעמיק ומשמעותי
          </p>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-border rounded-3xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-secondary flex items-center">
                  <User className="w-5 h-5 ml-2 text-primary" />
                  מידע אישי
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      שם מלא
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                        placeholder="הכנס שם מלא"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      אימייל
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    טלפון
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pr-10 pl-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                      placeholder="05X-XXXXXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-secondary flex items-center">
                  <Lock className="w-5 h-5 ml-2 text-primary" />
                  אבטחה
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      סיסמה
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                        placeholder="סיסמה חזקה"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      אימות סיסמה
                    </label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                        placeholder="הכנס סיסמה שוב"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Preferences */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-secondary flex items-center">
                  <BookOpen className="w-5 h-5 ml-2 text-primary" />
                  העדפות לימוד
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      רמת לימוד
                    </label>
                    <select
                      name="studyLevel"
                      value={formData.studyLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                      required
                    >
                      <option value="">בחר רמה</option>
                      <option value="beginner">מתחיל</option>
                      <option value="intermediate">בינוני</option>
                      <option value="advanced">מתקדם</option>
                      <option value="expert">מומחה</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      מיקום
                    </label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                        placeholder="עיר / אזור"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    זמינות
                  </label>
                  <div className="relative">
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full pr-10 pl-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                      required
                    >
                      <option value="">בחר זמינות</option>
                      <option value="morning">בוקר</option>
                      <option value="afternoon">צהריים</option>
                      <option value="evening">ערב</option>
                      <option value="flexible">גמיש</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    נושאי לימוד מועדפים
                  </label>
                  <textarea
                    name="topics"
                    value={formData.topics}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background resize-none"
                    placeholder="גמרא, הלכה, חסידות, מחשבה, וכו'..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  צור חשבון חדש
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  כבר יש לך חשבון?{' '}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    התחבר כאן
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                מאובטח באמצעות SSL
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                פרטיות מוגנת
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                ביטול בכל עת
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
