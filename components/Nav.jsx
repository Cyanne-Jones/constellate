import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css';
import useIsAuthStore from '../state/useIsAuthStore';
import useHamburgerOnStore from '../state/useHamburgerOnStore';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Nav() {

  const setIsAuthFalse = useIsAuthStore(state => state.setIsAuthFalse);
  const setIsAuthTrue = useIsAuthStore(state => state.setIsAuthTrue);

  const isAuth = useIsAuthStore(state => state.isAuth);
  const isMenuOpen = useHamburgerOnStore(state => state.isMenuOpen);
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isAuth") === true) {
      setIsAuthTrue();
    };
  });

  const logUserOut = () => {

    localStorage.setItem("isAuth", false);
    localStorage.setItem("userName", '');
    localStorage.setItem("userId", '');
    setIsAuthFalse();
    setIsMenuOpen(false);
    router.push('/login');

  };

  const handleHamburgerClick = () => {
 
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
    console.log("it happened")

  };

  const NavLinks = isAuth ? 
  (<><Link href="/create" passHref>
    <a 
      className={router.pathname === '/create' ? 
      (`${styles.link} ${styles.activeLink}`) : 
      (`${styles.link}`)}
    >
      create
    </a>
  </Link>
  <Link href="/calendar" passHref>
    <a 
      className={router.pathname === '/calendar' ? 
      (`${styles.link} ${styles.activeLink}`) : 
      (`${styles.link}`)}
    >
      calendar
    </a>
  </Link>
  <button 
    className={styles.logoutButton}
    onClick={logUserOut}
  >
    logout
  </button></>) :
  <><Link href="/login" passHref>
    <a 
      className={router.pathname === '/login' ? 
      (`${styles.link} ${styles.activeLink}`) : 
      (`${styles.link}`)}
    >
      login
    </a>
  </Link></>

  return (
    <nav className={`${styles.navBar} ${isMenuOpen ? styles.openNavBar : styles.closedNavBar}`}>
      <Link href="/">
        <p className={`${styles.title} ${isMenuOpen && styles.hiddenTitle}`}>constellate</p>
      </Link>
      <div className={`${styles.linkAndButtonContainer} ${isMenuOpen ? styles.openLinkAndButtonContainer : styles.closedLinkAndButtonContainer}`}>
        <div className={styles.buttonAndTitleContainer}>
          <Link href="/">
              <p className={`${isMenuOpen ? styles.mobileTitle : styles.closedMobileTitle}`}><em>menu</em></p>
          </Link>
          <button className={`${styles.hamburgerButton} ${isMenuOpen ? styles.openHamburger : styles.closedHamburger}`}
              onClick={handleHamburgerClick}
            >
              <Image className={styles.hamburgerImage}
                src={!isMenuOpen ? "/hamburger.png" : "/close-menu.png"}
                alt="menu button"
                height="40"
                width="40"
              />
            </button>
        </div>
        <div className={`${isMenuOpen && styles.openMenuContainer} ${(isAuth && isMenuOpen) && styles.loggedInMenuContainer} ${(!isAuth && isMenuOpen) && styles.loggedOutMenuContainer}` }>
          <div className={`${styles.navLinkContainer} ${isMenuOpen ? styles.openMenu : styles.hiddenMenu} ${isAuth ? styles.loggedInMenu : styles.loggedOutMenu}`}>
            <Link href="/" passHref>
              <a 
              className={router.pathname === '/' ? 
              (`${styles.link} ${styles.activeLink}`) : 
              (`${styles.link}`)}
              >
                about
              </a> 
            </Link>
            {NavLinks}
          </div>
        </div>
      </div>
    </nav>
  )
  
};