import Head from 'next/head';
import Nav from '../components/Nav';
import { useEffect } from 'react';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';
import styles from '../styles/Create.module.css';
import Image from 'next/image';

export default function Create() {

  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();

  useEffect(() => {

    if (!isAuth) {
      setTimeout(() => router.push('/login'), 3000);
    }

  });

  return (
    <>
      <Head>
        <title>Create a New Entry</title>
      </Head>
      <Nav />
      {!isAuth && <h1 className={styles.errorMessage}>Please sign in to create a new journal entry</h1>}
      <main className={styles.main}>
        <header className={styles.header}>
          <h2>new entry</h2>
          <div className={styles.buttonBox}>
            <button className={styles.saveButton}>
              <Image className={styles.images}
                src='/floppy-disk.png' 
                alt="save button" 
                height="20" 
                width="20"
              />
            </button>
            <button className={styles.deleteButton}>
              <Image className={styles.images}
                src='/delete.png' 
                alt="delete button" 
                height="20" 
                width="20"
              />
            </button>
          </div>
        </header>
        <div classname={styles.userInputsContainer}>
          <input type="textarea"
            className={styles.textArea}
            placeholder="your thoughts"
          />
          <div className={styles.additionalInputsContainer}>
            <input 
              type="text"
              className={styles.additionalInput}
              placeholder="title (optional)"
              name="title"
            />
            <input 
              type="text"
              className={styles.additionalInput}
              placeholder="your mood (optional)"
              name="mood"
            />
          </div>
          <div className={styles.reactColorContainer}>
            <h4>What color does today feel like?</h4>
            <p>ReactColor goes here</p>
          </div>
        </div>
      </main>
    </>
  )
  
};
