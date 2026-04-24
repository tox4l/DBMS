import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Mistake {
  id: string; // unique hash or string of the question
  questionText: string;
  wrongAnswer: string;
  correctAnswer: string;
  explanation: string;
  trapExplanation?: string;
  moduleId: number;
  setId: number;
  timestamp: string;
  frequency: number;
  resolved: boolean;
}

interface AppState {
  xp: number;
  completedModules: number[];
  answeredQuestions: Record<number, boolean>; // id -> isCorrect
  weakAreas: string[];
  streak: number;
  lastActive: string | null;
  
  // New Practice & Mistake Bank state
  mistakeBank: Record<string, Mistake>;
  bestSetScores: Record<string, number>; // key: "moduleId-setId"
  
  addXP: (amount: number) => void;
  markModuleCompleted: (id: number) => void;
  recordQuestionAnswer: (id: number, isCorrect: boolean, moduleTitle: string) => void;
  updateStreak: () => void;
  
  // New actions
  recordMistake: (mistake: Omit<Mistake, "id" | "frequency" | "timestamp" | "resolved">) => void;
  resolveMistake: (id: string) => void;
  recordSetScore: (moduleId: number, setId: number, score: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      xp: 0,
      completedModules: [],
      answeredQuestions: {},
      weakAreas: [],
      streak: 0,
      lastActive: null,
      mistakeBank: {},
      bestSetScores: {},
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      markModuleCompleted: (id) => set((state) => {
        if (!state.completedModules.includes(id)) {
          return { 
            completedModules: [...state.completedModules, id],
            xp: state.xp + 500 // 500 XP for completing a module
          };
        }
        return state;
      }),
      
      recordQuestionAnswer: (id, isCorrect, moduleTitle) => set((state) => {
        const newAnswers = { ...state.answeredQuestions, [id]: isCorrect };
        
        let newWeakAreas = [...state.weakAreas];
        if (!isCorrect && !newWeakAreas.includes(moduleTitle)) {
          newWeakAreas.push(moduleTitle);
        } else if (isCorrect && newWeakAreas.includes(moduleTitle)) {
          // Keep it simple for now
        }
        
        return {
          answeredQuestions: newAnswers,
          weakAreas: newWeakAreas,
          xp: state.xp + (isCorrect ? 10 : 0) // 10 XP for correct answer
        };
      }),
      
      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastActive === today) return state; // Already active today
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (state.lastActive === yesterdayStr) {
          return { streak: state.streak + 1, lastActive: today };
        } else {
          return { streak: 1, lastActive: today };
        }
      }),

      recordMistake: (mistakeData) => set((state) => {
        // Use a simple hash instead of Buffer (which is Node-only)
        const id = btoa(mistakeData.questionText.substring(0, 100)).replace(/[^a-zA-Z0-0]/g, '').substring(0, 32);
        const existing = state.mistakeBank[id];
        
        const timestamp = new Date().toISOString();
        
        if (existing) {
          // If it exists, increment frequency, update timestamp, and mark unresolved
          return {
            mistakeBank: {
              ...state.mistakeBank,
              [id]: {
                ...existing,
                wrongAnswer: mistakeData.wrongAnswer, // Update with the latest wrong answer
                frequency: existing.frequency + 1,
                timestamp,
                resolved: false
              }
            }
          };
        }
        
        // Otherwise create new
        return {
          mistakeBank: {
            ...state.mistakeBank,
            [id]: {
              ...mistakeData,
              id,
              timestamp,
              frequency: 1,
              resolved: false
            }
          }
        };
      }),

      resolveMistake: (id) => set((state) => {
        if (!state.mistakeBank[id]) return state;
        return {
          mistakeBank: {
            ...state.mistakeBank,
            [id]: {
              ...state.mistakeBank[id],
              resolved: true
            }
          }
        };
      }),

      recordSetScore: (moduleId, setId, score) => set((state) => {
        const key = `${moduleId}-${setId}`;
        const currentBest = state.bestSetScores[key] || 0;
        if (score > currentBest) {
          return {
            bestSetScores: {
              ...state.bestSetScores,
              [key]: score
            }
          };
        }
        return state;
      })
    }),
    {
      name: 'velocitydb-storage',
    }
  )
);
