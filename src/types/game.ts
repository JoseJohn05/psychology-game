export interface PlayerStats {
  username: string
  level: number
  totalScore: number
  gamesPlayed: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt: Date
}

export interface ChallengeResult {
  score: number
  timeSpent: number
  accuracy: number
  psychology: string
}

export interface CognitiveQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: 'bias' | 'logic' | 'decision'
  explanation: string
  psychologyInsight: string
}

export interface MemoryObject {
  id: string
  position: [number, number, number]
  color: string
  shape: 'cube' | 'sphere' | 'cone'
}

export interface EmotionScenario {
  id: string
  title: string
  description: string
  context: string
  responses: {
    text: string
    emotionalIntelligence: number
    type: 'empathetic' | 'logical' | 'assertive' | 'avoidant'
  }[]
  feedback: string
}

export interface PatternChallenge {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  pattern: number[] | string[]
  options: (number[] | string[])[]
  correctIndex: number
  timeLimit: number
  category: 'visual' | 'logical' | 'sequence'
}
