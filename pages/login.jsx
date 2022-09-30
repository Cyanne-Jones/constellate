import Head from 'next/head';
import Nav from '../components/Nav';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import useHamburgerOnStore from '../state/useHamburgerOnStore';
import { useEffect } from 'react';

export default function Login() {
  const setIsAuthTrue = useIsAuthStore((state) => state.setIsAuthTrue);
  const router = useRouter();
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);

  useEffect(() => {

    setIsMenuOpen(false);

  }, []);

  const signInWithGoogle = (event) => {

    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userId", auth.currentUser.uid);
      localStorage.setItem("userName", auth.currentUser.displayName);
      setIsAuthTrue();
      router.push('/calendar');
    });
  };

  return (
    <div className={styles.login}>
      <Head>
        <title>Login</title>
      </Head>
      <Nav />
      <div className={styles.loginContainer}>
        <div className={styles.yellowBox}>
          <p>sign in with google to continue</p> 
          <button 
            className={styles.loginWithGoogleButton}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );

};
