import create from 'zustand';

const useIsAuthStore = create((set) => ({
  isAuth: false,
  setIsAuthFalse: () => set({ isAuth: false }),
  setIsAuthTrue: () => set({ isAuth: true }),
}));

export default useIsAuthStore;
