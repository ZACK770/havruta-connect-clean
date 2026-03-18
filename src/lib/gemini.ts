interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
    }
  }[]
}

interface AIMatchRequest {
  currentUser: {
    firstName: string
    learningGoal: string
    level: string
    categories: string[]
  }
  candidateUser: {
    firstName: string
    learningGoal: string
    level: string
    categories: string[]
  }
}

interface StudyPlanRequest {
  topic: string
  weeks?: number
  level?: string
}

export class GeminiAPI {
  private apiKey: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || ''
    if (!this.apiKey) {
      console.warn('Gemini API key not found')
    }
  }

  private async callGemini(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const url = `${this.baseUrl}?key=${this.apiKey}`
    
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    }

    const backoff = [1000, 2000, 4000, 8000, 16000]
    
    for (let i = 0; i < backoff.length; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: GeminiResponse = await response.json()
        
        if (!data.candidates || data.candidates.length === 0) {
          throw new Error('No candidates returned from Gemini')
        }

        return data.candidates[0].content.parts[0].text
      } catch (error) {
        console.error(`Gemini API attempt ${i + 1} failed:`, error)
        
        if (i === backoff.length - 1) {
          throw new Error('Failed to call Gemini API after multiple attempts')
        }
        
        await new Promise(resolve => setTimeout(resolve, backoff[i]))
      }
    }

    throw new Error('Unexpected error in Gemini API call')
  }

  async analyzeMatch(request: AIMatchRequest): Promise<{
    analysis: string
    score: number
    reasoning: string
  }> {
    const prompt = `
אתה בוט חכם של אפליקציית "חברותא-קונקט".

נתח את ההתאמה בין שני לומדים:

משתמש 1: ${request.currentUser.firstName}
- רמת לימוד: ${request.currentUser.level}
- מטרת לימוד: ${request.currentUser.learningGoal}
- נושאים: ${request.currentUser.categories.join(', ')}

משתמש 2: ${request.candidateUser.firstName}
- רמת לימוד: ${request.candidateUser.level}
- מטרת לימוד: ${request.candidateUser.learningGoal}
- נושאים: ${request.candidateUser.categories.join(', ')}

אנא ספק תשובה בפורמט JSON עם השדות הבאים:
{
  "score": 0-100 (ציון התאמה),
  "analysis": "ניתוח קצר של ההתאמה (2-3 משפטים)",
  "reasoning": "הסבר מפורט יותר לציון ההתאמה"
}

התשובה צריכה להיות בעברית, בסגנון מעודד וחיובי.
    `.trim()

    try {
      const response = await this.callGemini(prompt)
      
      // Try to parse JSON response
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          return {
            analysis: parsed.analysis || '',
            score: Math.min(100, Math.max(0, parseInt(parsed.score) || 50)),
            reasoning: parsed.reasoning || ''
          }
        }
      } catch (parseError) {
        console.warn('Failed to parse JSON response, using text fallback')
      }

      // Fallback to text response
      return {
        analysis: response.slice(0, 200),
        score: 75,
        reasoning: response
      }
    } catch (error) {
      console.error('Error in analyzeMatch:', error)
      throw new Error('Failed to analyze match')
    }
  }

  async generateStudyPlan(request: StudyPlanRequest): Promise<string> {
    const prompt = `
צור תוכנית לימודים מפורטת ל-${request.weeks || 4} שבועות עבור: "${request.topic}"

${request.level ? `רמת הלומדים: ${request.level}` : ''}

התוכנית צריכה לכלול:
1. נושא לכל שבוע
2. מקורות מומלצים (פרקים, סימנים, דפים)
3. שאלות לדיון והעמקה
4. מטרות לימוד לכל שבוע

הסגנון צריך להיות:
- תורני ומכובד
- מעודד ומלמד
- מסודר וברור
- מעשיר ומעמיק

פורמט הפלט ב-Markdown עם כותרות ברורות לכל שבוע.
    `.trim()

    try {
      return await this.callGemini(prompt)
    } catch (error) {
      console.error('Error in generateStudyPlan:', error)
      throw new Error('Failed to generate study plan')
    }
  }
}

// Singleton instance
export const geminiAPI = new GeminiAPI()
