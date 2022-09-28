import create from 'zustand';

const useHamburgerOnStore = create((set) => ({
  isMenuOpen: true,
  setIsMenuOpen: (bool) => set({ isMenuOpen: bool })
}));

export default useHamburgerOnStore;