import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  xp: number;
  completedModules: number[];
  answeredQuestions: Record<number, boolean>; // id -> isCorrect
  weakAreas: string[];
  streak: number;
  lastActive: string | null;
  
  addXP: (amount: number) => void;
  markModuleCompleted: (id: number) => void;
  recordQuestionAnswer: (id: number, isCorrect: boolean, moduleTitle: string) => void;
  updateStreak: () => void;
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
          // If they get it right, maybe remove from weak areas? 
          // For now, let's keep it simple.
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
      })
    }),
    {
      name: 'velocitydb-storage',
    }
  )
);
