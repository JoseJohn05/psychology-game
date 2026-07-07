import apiClient from './client'

export interface AIOpponent {
  id: string
  name: string
  level: number
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  strengths: string[]
  weaknesses: string[]
  personality: string
  avatar?: string
}

export interface AIDecision {
  answer: number
  confidence: number
  reasoning: string
  timeTaken: number
}

class AIService {
  private opponents: AIOpponent[] = [
    {
      id: 'ai-1',
      name: 'Dr. Analytical',
      level: 5,
      difficulty: 'medium',
      strengths: ['logic', 'pattern_recognition'],
      weaknesses: ['emotional_intelligence', 'creativity'],
      personality: 'Logical, methodical, data-driven',
      avatar: '🧬',
    },
    {
      id: 'ai-2',
      name: 'Professor Empathy',
      level: 8,
      difficulty: 'hard',
      strengths: ['emotional_intelligence', 'social_awareness'],
      weaknesses: ['pattern_recognition', 'mathematics'],
      personality: 'Empathetic, intuitive, people-focused',
      avatar: '💜',
    },
    {
      id: 'ai-3',
      name: 'The Mastermind',
      level: 10,
      difficulty: 'expert',
      strengths: ['all'],
      weaknesses: [],
      personality: 'Highly intelligent, strategic thinker',
      avatar: '🧠',
    },
    {
      id: 'ai-4',
      name: 'Creative Maya',
      level: 6,
      difficulty: 'medium',
      strengths: ['creativity', 'pattern_recognition'],
      weaknesses: ['logic', 'emotional_control'],
      personality: 'Imaginative, artistic, unconventional',
      avatar: '🎨',
    },
  ]

  async getAvailableOpponents(playerLevel: number): Promise<AIOpponent[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return this.opponents.filter((opp) => Math.abs(opp.level - playerLevel) <= 5)
  }

  async getOpponent(opponentId: string): Promise<AIOpponent> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const opponent = this.opponents.find((opp) => opp.id === opponentId)
    if (!opponent) throw new Error('Opponent not found')
    return opponent
  }

  generateAIDecision(
    opponent: AIOpponent,
    questionIndex: number,
    questionOptions: number,
    _timeLimit: number
  ): AIDecision {
    // AI decision logic based on difficulty and strengths
    const baseCorrectRate = {
      easy: 0.4,
      medium: 0.65,
      hard: 0.85,
      expert: 0.95,
    }

    const correctRate = baseCorrectRate[opponent.difficulty]
    const isCorrect = Math.random() < correctRate

    return {
      answer: isCorrect ? Math.floor(Math.random() * questionOptions) : Math.floor(Math.random() * questionOptions),
      confidence: 0.5 + Math.random() * 0.5,
      reasoning: this.generateReasoning(opponent, isCorrect),
      timeTaken: Math.floor(Math.random() * 20) + 5,
    }
  }

  private generateReasoning(opponent: AIOpponent, isCorrect: boolean): string {
    const reasons = {
      correct: [
        `I analyzed this using my ${opponent.strengths[0]} skills`,
        `Based on pattern recognition, this is clearly the right answer`,
        `My logical framework indicates this is correct`,
        `Using critical thinking, I determined this answer`,
      ],
      incorrect: [
        `I made an intuitive guess on this one`,
        `This was a tricky question, I might have missed something`,
        `I applied different reasoning to this problem`,
        `My analysis led me in this direction`,
      ],
    }

    const reasonList = isCorrect ? reasons.correct : reasons.incorrect
    return reasonList[Math.floor(Math.random() * reasonList.length)]
  }

  async submitAIPerformance(
    opponentId: string,
    score: number,
    accuracy: number
  ): Promise<{ updatedRating: number; feedback: string }> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return {
      updatedRating: score,
      feedback: `${score} points earned! You performed well against this opponent.`,
    }
  }
}

export default new AIService()
