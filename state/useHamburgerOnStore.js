import create from 'zustand';

const useHamburgerOnStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (bool) => set({ isMenuOpen: bool })
}));

export default useHamburgerOnStore;