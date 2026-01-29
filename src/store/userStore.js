import { create } from 'zustand';

export const useUserStore = create((set) => ({
  stage: null,
  loading: false,
  user: null,
  
  setStage: (stage) => set({ stage }),
  setLoading: (loading) => set({ loading }),
  setUser: (user) => set({ user }),
  
  logout: () => set({ stage: null, user: null }),
}));