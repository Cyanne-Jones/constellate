import Head from 'next/head';
import Nav from '/components/Nav';
import { useEffect, useState } from 'react';
import useIsAuthStore from '/state/useIsAuthStore';
import { useRouter } from 'next/router';
import styles from '/styles/Edit.module.css';
import Image from 'next/image';
import { ChromePicker } from 'react-color';
import { db, auth } from '/firebase-config';
import { setDoc, collection, getDocs, doc } from 'firebase/firestore';
import useHamburgerOnStore from '/state/useHamburgerOnStore';

export default function Edit() {

  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();
  const { pid } = router.query;
  const [color, setColor] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [ entry, setEntry ] = useState({});
  const entriesCollectionRef = collection(db, 'entries');
  const [ entryAuthorId, setEntryAuthorId] = useState(0);
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);

  useEffect(() => {

    setIsMenuOpen(false);

    if (!isAuth) {
      setTimeout(() => router.push('/login'), 3000);
      return;
    };

    const getEntry = async () => {
      const data = await getDocs(entriesCollectionRef);

      setEntry(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)));
      setEntryAuthorId(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).author.id);
      setColor(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).color);
      setJournalEntry(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).journalEntry);
      setTitle(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).title);
      setMood(data.docs.map(data => ({...data.data(), id: data.id})).find(data => (data.id === pid)).mood);

    };
    getEntry();

  }, []);

  const saveEntry = async () => {

    if (!journalEntry) {
      alert('Please enter journal text before submitting!');
      return;
    };

    await setDoc(doc(db, 'entries', pid), { 
      title: title, 
      journalEntry: journalEntry,
      mood: mood,
      color: color,
      dateCreated: entry.dateCreated,
      author: {
        name: auth.currentUser.displayName, 
        id: auth.currentUser.uid
      }
    });

    router.push(`/entry/${pid}`);

  }

  const handleChangeComplete = (userColor) => {

    setColor(userColor.hex);

  };

  return (
    <div className={styles.create}>
      <Head>
        <title>edit your entry</title>
      </Head>
      <Nav />
      {(!isAuth) ? 
      <div className={styles.errorContainer}>
        <h1 className={styles.errorMessage}>
          please sign in to edit your journal entry
        </h1> 
      </div>:
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <header className={styles.header}>
            <h2 className={styles.headerText}>edit your entry</h2>
            <div className={styles.buttonBox}>
              <button className={styles.saveButton}
                onClick={saveEntry}>
                <Image className={styles.images}
                  src='/disk.png' 
                  alt="save button" 
                  height="40" 
                  width="40"
                />
              </button>
            </div>
          </header>
          <div className={styles.userInputsContainer}>
            <div className={styles.textContainer}>
              <textarea type="textarea"
                className={styles.textArea}
                placeholder="your thoughts"
                value={journalEntry}
                onChange={(event) => setJournalEntry(event.target.value)}
              />
            </div>
            <div className={styles.additionalInputsContainer}>
              <input 
                type="text"
                className={styles.additionalInput}
                placeholder="title (optional)"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <input 
                type="text"
                className={styles.additionalInput}
                placeholder="your mood (optional)"
                name="mood"
                value={mood}
                onChange={(event) => setMood(event.target.value)}
              />
            </div>
            <div className={styles.reactColorContainer}>
              <h4>What color does today feel like?</h4>
              <ChromePicker 
                color={color}
                onChangeComplete={handleChangeComplete}
                className={styles.reactColor}
              />
            </div>
          </div>
        </main>
      </div>}
    </div>
)
  
};
