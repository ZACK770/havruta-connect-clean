'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, User, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Mock data
const mockSessions = [
  {
    id: 1,
    partnerName: 'דוד לוי',
    topic: 'מסכת שבת - דף כ"א',
    time: '20:00 - 21:00',
    date: new Date(new Date().setHours(20, 0, 0, 0)),
    type: 'zoom',
    status: 'upcoming'
  },
  {
    id: 2,
    partnerName: 'יוסף כהן',
    topic: 'הלכות שבת - סימן רנ"ג',
    time: '19:30 - 20:30',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    type: 'in-person',
    status: 'upcoming'
  }
]

const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const nextWeek = () => {
    const next = new Date(currentDate)
    next.setDate(currentDate.getDate() + 7)
    setCurrentDate(next)
  }

  const prevWeek = () => {
    const prev = new Date(currentDate)
    prev.setDate(currentDate.getDate() - 7)
    setCurrentDate(prev)
  }

  // Get start of week (Sunday)
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const weekDates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-secondary flex items-center gap-2">
            <CalendarIcon className="w-8 h-8 text-primary" />
            יומן לימוד
          </h1>
          <p className="text-muted-foreground mt-1">
            מעקב אחר מפגשי הלימוד והחברותות שלך
          </p>
        </div>
        
        <Button className="btn-primary flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          קבע חברותא חדשה
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevWeek}>
          <ChevronRight className="w-5 h-5" />
        </Button>
        
        <h2 className="text-lg font-bold text-secondary text-center">
          {startOfWeek.toLocaleDateString('he-IL', { month: 'long', day: 'numeric' })} - 
          {weekDates[6].toLocaleDateString('he-IL', { month: 'long', day: 'numeric' })}
        </h2>

        <Button variant="ghost" size="icon" onClick={nextWeek}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Week Grid (Desktop) / List (Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {weekDates.map((date, idx) => {
          const isToday = new Date().toDateString() === date.toDateString()
          const daySessions = mockSessions.filter(
            s => s.date.toDateString() === date.toDateString()
          )

          return (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border ${
                isToday ? 'border-primary ring-1 ring-primary/20' : 'border-gray-100'
              } p-4 flex flex-col min-h-[120px]`}
            >
              {/* Day Header */}
              <div className="text-center mb-3">
                <span className="text-xs font-medium text-muted-foreground block mb-1">
                  {weekDays[idx]}
                </span>
                <span className={`text-xl font-bold ${
                  isToday ? 'text-primary' : 'text-secondary'
                }`}>
                  {date.getDate()}
                </span>
              </div>

              {/* Sessions */}
              <div className="space-y-2 flex-1">
                {daySessions.length > 0 ? (
                  daySessions.map(session => (
                    <div 
                      key={session.id}
                      className="bg-blue-50 border border-blue-100 rounded-xl p-2 text-sm"
                    >
                      <div className="font-bold text-blue-900 mb-1">
                        {session.time}
                      </div>
                      <div className="text-blue-800 text-xs mb-1">
                        {session.topic}
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 text-xs">
                        <User className="w-3 h-3" />
                        {session.partnerName}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-gray-300">אין מפגשים</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Upcoming List (Always visible on mobile, under calendar on desktop) */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          מפגשים קרובים
        </h3>
        
        <div className="space-y-4">
          {mockSessions.map(session => (
            <div 
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">{session.partnerName}</h4>
                  <p className="text-sm text-muted-foreground">{session.topic}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="text-right">
                  <div className="font-medium text-secondary" dir="ltr">{session.time}</div>
                  <div className="text-sm text-muted-foreground">
                    {session.date.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </div>
                </div>
                
                <Badge variant={session.type === 'zoom' ? 'info' : 'warning'}>
                  {session.type === 'zoom' ? 'זום' : 'פרונטלי'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
