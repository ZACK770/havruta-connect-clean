'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, User, Target, TrendingUp } from 'lucide-react'

interface AIMatchResult {
  analysis: string
  score: number
  reasoning: string
}

interface BotMatchDialogProps {
  isOpen: boolean
  onClose: () => void
  matchResult: AIMatchResult | null
  suggestedUser: {
    id: string
    firstName: string
    city: string
    level: string
    categories: string[]
    learningGoal: string
  } | null
  onViewProfile: (userId: string) => void
  isLoading?: boolean
}

export function BotMatchDialog({
  isOpen,
  onClose,
  matchResult,
  suggestedUser,
  onViewProfile,
  isLoading = false
}: BotMatchDialogProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'התאמה מצוינת!'
    if (score >= 60) return 'התאמה טובה'
    return 'התאמה מסוימת'
  }

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-2">
            מחפש התאמה חכמה...
          </h3>
          <p className="text-muted-foreground">
            ה-AI מנתח את כל המשתמשים כדי למצוא את ההתאמה המושלמת עבורך
          </p>
        </div>
      </Modal>
    )
  }

  if (!matchResult || !suggestedUser) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="התאמה חכמה AI">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            לא נמצאה התאמה מתאימה כרגע. נסה שוב מאוחר יותר.
          </p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="נמצאה התאמה!">
      <div className="space-y-6">
        {/* Match Score */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <div className={`text-4xl font-bold ${getScoreColor(matchResult.score)}`}>
            {matchResult.score}%
          </div>
          <p className={`text-lg font-medium mt-2 ${getScoreColor(matchResult.score)}`}>
            {getScoreLabel(matchResult.score)}
          </p>
        </div>

        {/* AI Analysis */}
        <div className="bg-muted rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-secondary mb-2">ניתוח AI</h4>
              <p className="text-muted-foreground leading-relaxed">
                {matchResult.analysis}
              </p>
            </div>
          </div>
        </div>

        {/* Suggested User */}
        <div className="bg-card rounded-xl border border-gray-200 p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-secondary mb-1">
                {suggestedUser.firstName}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {suggestedUser.city} • {suggestedUser.level}
              </p>
              
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {suggestedUser.categories.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm italic text-muted-foreground">
                  "{suggestedUser.learningGoal}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reasoning */}
        {matchResult.reasoning && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">למה התאמה זו טובה?</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {matchResult.reasoning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={() => onViewProfile(suggestedUser.id)}
            className="flex-1 btn-primary"
          >
            פתח פרופיל
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            חפש התאמה אחרת
          </Button>
        </div>
      </div>
    </Modal>
  )
}
