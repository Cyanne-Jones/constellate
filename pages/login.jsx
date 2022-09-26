import Head from 'next/head';
import Nav from '../components/Nav';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
  const setIsAuthTrue = useIsAuthStore((state) => state.setIsAuthTrue);
  const router = useRouter();

  const signInWithGoogle = (event) => {

    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuthTrue();
      router.push('/create');
    });
  };

  return (
    <div className={styles.login}>
      <Head>
        <title>User Login</title>
      </Head>
      <Nav />
      <div className={styles.loginContainer}>
        <div className={styles.yellowBox}>
          <p>Sign in with Google to continue</p> 
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
