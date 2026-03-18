'use client'

import { useState } from 'react'
import { UserCard } from '@/components/ui/UserCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Drawer } from '@/components/ui/Drawer'
import { Search, Filter, Sparkles, MapPin, Clock, Video, Phone, BookOpen, ChevronDown, Check } from 'lucide-react'

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    firstName: 'אברהם',
    city: 'ירושלים',
    level: 'בוגר ישיבה גבוהה',
    categories: ['הלכה בעיון', 'רמב"ם יומי'],
    learningGoal: 'ללמוד הלכות שבת בבית יוסף בעיון עם חברותא קבועה',
    avatarColor: '#3b82f6'
  },
  {
    id: '2', 
    firstName: 'ישראל',
    city: 'תל אביב',
    level: 'סמיכה לרבנות',
    categories: ['חב"ד', 'תניא'],
    learningGoal: 'חיפוש חברותא ללימוד תניא וספרי חב"ד בעיון',
    avatarColor: '#10b981'
  },
  {
    id: '3',
    firstName: 'משה',
    city: 'בני ברק',
    level: 'בוגר ישיבה',
    categories: ['גמרא בעיון', 'רי"ף ורא"ש'],
    learningGoal: 'ללמוד מסכת ברכות בעיון עם הכנה לקבוצות',
    avatarColor: '#f59e0b'
  }
]

const filterCategories = [
  {
    id: 'topics',
    title: 'נושאי לימוד',
    icon: BookOpen,
    options: [
      { id: 'halacha-m', label: 'הלכה למעשה' },
      { id: 'halacha-i', label: 'הלכה בעיון' },
      { id: 'rabak', label: 'רבנות' },
      { id: 'dayanut', label: 'דיינות' },
      { id: 'chabad', label: 'חב"ד' },
      { id: 'breslov', label: 'ברסלב' },
      { id: 'gemara', label: 'גמרא בעיון' }
    ]
  },
  {
    id: 'times',
    title: 'זמני לימוד',
    icon: Clock,
    options: [
      { id: 'morning', label: 'בוקר (6:00-12:00)' },
      { id: 'afternoon', label: 'צהריים (12:00-15:00)' },
      { id: 'evening', label: 'ערב (18:00-23:00)' }
    ]
  },
  {
    id: 'methods',
    title: 'אופן לימוד',
    icon: Video,
    options: [
      { id: 'zoom', label: 'זום / וידאו' },
      { id: 'in-person', label: 'פרונטלי' },
      { id: 'phone', label: 'טלפוני' }
    ]
  }
]

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['topics', 'times', 'methods'])
  const [isLoading, setIsLoading] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
    setSearchQuery('')
  }

  const handleAIMatch = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log('AI matching completed')
    }, 2000)
  }

  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl pb-24 md:pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-secondary mb-4">
          גילוי חברותות
        </h1>
        <p className="text-lg text-muted-foreground">
          מצא את חברותא המושלמת לפי נושאי לימוד, זמנים ומיקום
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חפש לפי שם, עיר, או נושא לימוד..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pr-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              סינון מתקדם
              {selectedFilters.length > 0 && (
                <Badge variant="secondary" className="text-xs mr-1 px-2 py-0">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
            
            {(selectedFilters.length > 0 || searchQuery) && (
              <Button variant="ghost" onClick={clearFilters}>
                נקה
              </Button>
            )}
          </div>

          <Button
            onClick={handleAIMatch}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? 'מחפש...' : 'התאמה חכמה AI'}
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary">
            נמצאו {mockUsers.length} חברותות
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      </div>

      {/* Filters Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="סינון מתקדם"
      >
        <div className="space-y-2 pb-20">
          {filterCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id)
            
            return (
              <div key={category.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5 text-primary" />
                    <span className="font-bold text-secondary">{category.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 border-t border-border space-y-3">
                    {category.options.map((option) => {
                      const isSelected = selectedFilters.includes(option.id)
                      return (
                        <label 
                          key={option.id}
                          className="flex items-center gap-3 group cursor-pointer"
                        >
                          <div className={`
                            w-5 h-5 rounded-md border flex items-center justify-center transition-colors
                            ${isSelected 
                              ? 'bg-primary border-primary text-white' 
                              : 'border-gray-300 text-transparent group-hover:border-primary'
                            }
                          `}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-sm ${isSelected ? 'font-medium text-secondary' : 'text-muted-foreground'}`}>
                            {option.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border flex gap-3 z-10">
          <Button 
            className="flex-1" 
            onClick={() => setIsDrawerOpen(false)}
          >
            הצג תוצאות
          </Button>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="px-6"
          >
            נקה הכל
          </Button>
        </div>
      </Drawer>
    </div>
  )
}
