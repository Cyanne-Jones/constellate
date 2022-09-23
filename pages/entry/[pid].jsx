import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from '/components/Nav';
import { useState, useEffect } from 'react';
import { db, auth } from '/firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import useIsAuthStore from '/state/useIsAuthStore';
import styles from '/styles/[pid].module.css';

const Entry = () => {

  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();
  const { pid } = router.query;
  const [ entry, setEntry ] = useState({});
  const entryCollectionRef = collection(db, 'entries');

  useEffect(() => {

    if (!isAuth) {
      setTimeout(() => router.push('/login'), 3000);
      return;
    };

    const getEntry = async () => {
      const data = await getDocs(entryCollectionRef);

      setEntry(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)));
    };
    getEntry();

  }, []);

  return (
    <div className={styles.entryPage}>
      <Head>
        <title>Journal Entry</title>
      </Head>
      <Nav />
      <div className={styles.entryContainer}>
        {!isAuth && <p className={styles.errorMessage}>Please sign in to access this entry</p>}
        <div className={styles.entryBox}>
          <div className={styles.header}>
            <div className={styles.headerTextBox}>
              <p>Title: {entry.title}</p>
              <p>Mood: {entry.mood}</p>
              <p>Date Created: {new Date(entry.dateCreated).toDateString()}</p>
            </div>
            <div className={styles.colorBox} style={{backgroundColor: entry.color}}></div>
          </div>
          <div className={styles.entryBox}>
            <p>Entry: {entry.journalEntry}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Entry;