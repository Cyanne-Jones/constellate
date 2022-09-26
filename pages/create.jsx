import Head from 'next/head';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';
import styles from '../styles/Create.module.css';
import Image from 'next/image';
import { ChromePicker } from 'react-color';
import { db, auth } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';

export default function Create() {

  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();
  const [color, setColor] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const entriesCollectionRef = collection(db, 'entries');

  useEffect(() => {

    if (!isAuth) {
      setTimeout(() => router.push('/login'), 3000);
    }

  });

  const createEntry = async () => {

    await addDoc(entriesCollectionRef, { 
      title: title, 
      journalEntry: journalEntry,
      mood: mood,
      color: color,
      dateCreated: Date.now(),
      author: {
        name: auth.currentUser.displayName, 
        id: auth.currentUser.uid
      }
    });

    router.push('/calendar');

  }

  const handleChangeComplete = (userColor) => {

    setColor(userColor.hex);

  };

  const deleteInputs = () => {

    setColor('');
    setJournalEntry('');
    setTitle('');
    setMood('');

  }

  return (
    <div className={styles.create}>
      <Head>
        <title>Create a New Entry</title>
      </Head>
      <Nav />
      {!isAuth ? 
      <div className={styles.errorContainer}>
        <h1 className={styles.errorMessage}>
          Please sign in to create a new journal entry
        </h1> 
      </div>:
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <header className={styles.header}>
            <h2 className={styles.headerText}>new entry</h2>
            <div className={styles.buttonBox}>
              <button className={styles.saveButton}
                onClick={createEntry}>
                <Image className={styles.images}
                  src='/floppy-disk.png' 
                  alt="save button" 
                  height="40" 
                  width="40"
                />
              </button>
              <button className={styles.deleteButton}
              onClick={deleteInputs}>
                <Image className={styles.images}
                  src='/delete.png' 
                  alt="delete button" 
                  height="40" 
                  width="40"
                />
              </button>
            </div>
          </header>
          <div className={styles.userInputsContainer}>
            <textarea type="textarea"
              className={styles.textArea}
              placeholder="your thoughts"
              value={journalEntry}
              onChange={(event) => setJournalEntry(event.target.value)}
            />
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
