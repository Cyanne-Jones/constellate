import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from '/components/Nav';
import { useState, useEffect } from 'react';
import { db, auth } from '/firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import useIsAuthStore from '/state/useIsAuthStore';
import styles from '/styles/[pid].module.css';
import Image from 'next/image';
import useHamburgerOnStore from '/state/useHamburgerOnStore';

const Entry = () => {

  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();
  const { pid } = router.query;
  const [ entry, setEntry ] = useState({});
  const entryCollectionRef = collection(db, 'entries');
  const [ entryAuthorId, setEntryAuthorId] = useState(0);
  const [ userName, setUserName ] = useState('');
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);
  const [errorText, setErrorText ] = useState('');

  useEffect(() => {

    setIsMenuOpen(false);

    if (!localStorage.getItem("isAuth")) {
      setErrorText('please sign in to the correct account to edit this entry');
      setTimeout(() => router.push('/login'), 3000);
      return;
    };

    const getEntry = async () => {
      const data = await getDocs(entryCollectionRef);

      setEntry(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)));
      if(!data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid))) {
        setErrorText('please sign in to access this entry');
        setTimeout(() => router.push('/login'), 3000);
        return;
      }
      setEntryAuthorId(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).author.id);
      setUserName(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).author.name);
    };
    getEntry();

  }, []);

  const deleteEntry = async () => {

    const postDoc = doc(db, 'entries', pid);
    await deleteDoc(postDoc);
    router.push('/calendar');

  };

  const editEntry = () => {
    router.push(`/edit/${pid}`);
  };


  return (
    <div className={styles.entryPage}>
      <Head>
        <title>{userName && `${userName.split(' ')[0]}'s `}Journal Entry</title>
      </Head>
      <Nav />
      <div className={styles.entryContainer}>
        {(!isAuth || auth.currentUser.uid !== entryAuthorId) ? 
          <div className={styles.errorContainer}>
            <h1 className={styles.errorMessage}>
              {errorText}
            </h1>
          </div> :
          <div className={styles.entryBox}>
            <div className={styles.header}>
              <div className={styles.headerTextBox}>
                <p 
                  className={styles.title}>
                    {entry.title ? entry.title : 'untitled entry'}
                </p>
                <p 
                  className={styles.headerText}>
                    <span className={styles.headerTitle}>mood: </span>
                    {entry.mood ? entry.mood : 'mood not entered on entry'}
                </p>
                <p 
                  className={styles.headerText}>
                    <span className={styles.headerTitle}>date created: </span>
                    {new Date(entry.dateCreated).toDateString().toLowerCase()}
                </p>
              </div>
              <div className={styles.colorAndButtons}>
              <button className={styles.editButton}
                  onClick={editEntry}
              >
                <Image className={styles.images}
                    src='/edit.png' 
                    alt="delete button" 
                    height="40" 
                    width="40"
                  />
                </button>
                <button className={styles.deleteButton}
                  onClick={deleteEntry}
                >
                <Image className={styles.images}
                    src='/delete-document.png' 
                    alt="delete button" 
                    height="40" 
                    width="40"
                  />
                </button>
                { entry.color && <div className={styles.colorBox} style={{backgroundColor: entry.color}}></div> }
              </div>
            </div>
            <div className={styles.entryTextBox}>
              <div className={styles.entryText}>
                { entry.journalEntry && entry.journalEntry.split(`\n`).map((line, index) => (
                    <p key={index}className={styles.entryTextLine}>{line}</p>))
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
};

export default Entry;