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
    <div>
      <Head>
        <title>Journal Entry</title>
      </Head>
      <Nav />
      {!isAuth && <p>Please sign in to access this entry</p>}
      <p>Title: {entry.title}</p>
      <p>Entry: {entry.journalEntry}</p>
    </div>
  )
};

export default Entry;