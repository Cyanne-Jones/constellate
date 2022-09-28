import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css';
import useIsAuthStore from '../state/useIsAuthStore';
import Image from 'next/image';

export default function Nav() {

  const setIsAuthFalse = useIsAuthStore(state => state.setIsAuthFalse)
  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();

  const logUserOut = () => {

    localStorage.setItem("isAuth", false);
    setIsAuthFalse();
    router.push('/login');

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
        className={styles.title}
      >
        the write stuff
      </a>
      <div className={styles.navLinkContainer}>
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
      <button className={`${styles.hamburgerButton}`}>
        <Image className={styles.hamburgerImage}
          src="/hamburger.png"
          alt="menu button"
          height="40"
          width="40"
        />
      </button>
    </nav>
  )

};