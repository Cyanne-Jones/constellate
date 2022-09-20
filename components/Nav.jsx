import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Nav.module.css';

const navLinks = [

  { title: 'home', path: '/' },
  { title: 'create', path: '/create' },
  { title: 'login', path: '/login' }

];

export default function Nav() {

  const router = useRouter();

  return (
    <nav className={styles.navBar}>
      <h1>the write stuff</h1>
      <div className={styles.navLinkContainer}>
        {navLinks.map(link => (
          <Link key={link.title} href={link.path} passHref>
            <a className={router.pathname === link.path ? styles.activeLink : styles.inactiveLink}>
              {link.title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  )

};