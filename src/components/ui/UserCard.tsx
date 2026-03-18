import { Badge } from './Badge'
import { Button } from './Button'
import { MapPin, BookOpen, User } from 'lucide-react'

interface UserCardProps {
  user: {
    id: string
    firstName: string
    city: string
    level: string
    categories: string[]
    learningGoal: string
    avatarColor?: string
  }
  onViewProfile: (userId: string) => void
  className?: string
}

export function UserCard({ user, onViewProfile, className }: UserCardProps) {
  return (
    <div className={`card card-hover ${className}`}>
      {/* Header with avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
          style={{ backgroundColor: user.avatarColor || '#3b82f6' }}
        >
          <User className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-secondary">
            {user.firstName}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{user.city}</span>
          </div>
        </div>
      </div>

      {/* Level badge */}
      <div className="mb-3">
        <Badge variant="info" className="text-xs">
          {user.level}
        </Badge>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {user.categories.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {user.categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{user.categories.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* Learning goal */}
      <div className="mb-4 p-3 bg-muted rounded-xl">
        <div className="flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground italic">
            "{user.learningGoal}"
          </p>
        </div>
      </div>

      {/* Action button */}
      <Button 
        onClick={() => onViewProfile(user.id)}
        className="w-full btn-primary"
      >
        לפרופיל המלא
      </Button>
    </div>
  )
}
