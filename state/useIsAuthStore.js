import create from 'zustand';

const useIsAuthStore = create((set) => ({
  isAuth: false,
  test: 'cyanne is trying to test',
  setIsAuthFalse: () => set({ isAuth: false }),
  setIsAuthTrue: () => set({ isAuth: true }),
  setCyanneTest: () => set((state) => ({ test: `${state.test} AND IT WORKED!`}))
}));

export default useIsAuthStore;
