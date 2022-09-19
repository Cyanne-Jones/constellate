import Head from 'next/head';
import Nav from '../components/Nav';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import useIsAuthStore from '../state/useIsAuthStore';

export default function Login() {
  const setIsAuthTrue = useIsAuthStore((state) => state.setIsAuthTrue);

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuthTrue();
      window.location.pathname = '/create';
    });
  };
  return (
    <>
    <Head>
      <title>User Login</title>
    </Head>
    <Nav />
    <div>
      <p>Sign in with Google to continue</p> 
      <button 
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
    </>
  )

};
