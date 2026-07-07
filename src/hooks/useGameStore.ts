import { create } from 'zustand'

interface GameStore {
  playerName: string
  totalScore: number
  level: number
  achievements: string[]
  setPlayerName: (name: string) => void
  addScore: (score: number) => void
  levelUp: () => void
  unlockAchievement: (achievement: string) => void
  resetStats: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  playerName: 'Anonymous Psychologist',
  totalScore: 0,
  level: 1,
  achievements: [],
  setPlayerName: (name) => set({ playerName: name }),
  addScore: (score) => set((state) => ({ totalScore: state.totalScore + score })),
  levelUp: () => set((state) => ({ level: state.level + 1 })),
  unlockAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),
  resetStats: () =>
    set({
      playerName: 'Anonymous Psychologist',
      totalScore: 0,
      level: 1,
      achievements: [],
    }),
}))
