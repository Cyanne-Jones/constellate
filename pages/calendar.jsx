import Head from 'next/head';
//import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import styles from '../styles/Calendar.module.css';
import Calendar from 'react-calendar';
import { db, auth } from '../firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';

export default function CalendarPage() {

  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ entryList, setEntryList ] = useState([]);
  const entryCollectionRef = collection(db, 'entries');
  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();

  useEffect(() => {

    const getEntries = async () => {

      if (!isAuth) {
        setTimeout(() => router.push('/login'), 3000);
        return;
      }

      const data = await getDocs(entryCollectionRef);
      setEntryList(data.docs.map(data => ({...data.data(), id: data.id}))
      .filter(entry => entry.author.id === auth.currentUser.uid));
      console.log(entryList);

    };
    getEntries();

  }, []);


  function tileContent({ activeStartDate, date, view }) {

    let title;

    const entryDates = entryList.map(entry => entry.dateCreated);
    
    if (view === 'month') {

      const newEntry = entryList.find(entry => 
        (new Date(entry.dateCreated).getDate() === date.getDate()) && 
        (new Date(entry.dateCreated).getMonth() === date.getMonth()) && 
        (new Date(entry.dateCreated).getYear() === date.getYear()));

      if (newEntry) {

        return (
          <div className={styles.tile}>
            <p
              className={styles.calendarEntry} 
              style={{backgroundColor: newEntry.color}}
              onClick={() => router.push('/create')}
            >
              {newEntry.title}
            </p>
          </div>
        );
       };

    }
  }

  return (

    <>
    <Head>
      <title>Calendar</title>
    </Head>
      <div className={styles.calendar}>
        <Nav />
        {!isAuth ? 
        <div className={styles.errorContainer}>
          <h1 className={styles.errorMessage}>
            Please sign in to create a new journal entry
          </h1> 
        </div> :
        <div className={styles.calendarContainer}>
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            tileContent={tileContent}
            className={styles.reactCalendar}
          />
        </div>
        }
      </div>
    </>
  )
  
};