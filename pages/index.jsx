import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import useHamburgerOnStore from '../state/useHamburgerOnStore';
import { useEffect } from 'react';

export default function Home() {

  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);

  useEffect(() => {

    setIsMenuOpen(false);

  }, []);
  

  return (
    <>
    <Head>
      <title>The Write Stuff</title>
    </Head>
      <Nav />
      HOME
    </>
  )
};
