import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css';
import useIsAuthStore from '../state/useIsAuthStore';
import useHamburgerOnStore from '../state/useHamburgerOnStore';
import Image from 'next/image';

export default function Nav() {

  const setIsAuthFalse = useIsAuthStore(state => state.setIsAuthFalse)
  const isAuth = useIsAuthStore(state => state.isAuth);
  const isMenuOpen = useHamburgerOnStore(state => state.isMenuOpen);
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);
  const router = useRouter();

  const logUserOut = () => {

    localStorage.setItem("isAuth", false);
    setIsAuthFalse();
    router.push('/login');

  };

  const handleHamburgerClick = () => {

    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
    console.log(isMenuOpen);

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
    <nav className={styles.navBar}>
      <a 
        href="/"
        className={`${styles.title} ${isMenuOpen && styles.hiddenTitle}`}
      >
        the write stuff
      </a>
      <div className={`${styles.linkAndButtonContainer} ${isMenuOpen ? styles.openLinkAndButtonContainer : styles.closedLinkAndButtonContainer}`}>
        <div className={styles.buttonAndTitleContainer}>
          <a href="/"
            className={`${isMenuOpen ? styles.mobileTitle : styles.closedMobileTitle}`}>
              menu
            </a>
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
        <div className={`${styles.navLinkContainer} ${isMenuOpen ? styles.openMenu : styles.hiddenMenu}`}>
          <Link href="/" passHref>
            <a 
            className={router.pathname === '/' ? 
            (`${styles.link} ${styles.activeLink}`) : 
            (`${styles.link}`)}
            >
              home
            </a> 
          </Link>
          {NavLinks}
        </div>
        
      </div>
    </nav>
  )

};