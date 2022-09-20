import Head from 'next/head';
import Nav from '../components/Nav';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';

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
