import Head from 'next/head';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import styles from '../styles/Calendar.module.css';
import Calendar from 'react-calendar';
import { db, auth } from '../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import useIsAuthStore from '../state/useIsAuthStore';
import { useRouter } from 'next/router';
import useHamburgerOnStore from '../state/useHamburgerOnStore';

export default function CalendarPage() {

  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ entryList, setEntryList ] = useState([]);
  const entryCollectionRef = collection(db, 'entries');
  const isAuth = useIsAuthStore(state => state.isAuth);
  const router = useRouter();
  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);

  useEffect(() => {

    setIsMenuOpen(false);

    const getEntries = async () => {

      if (!localStorage.getItem("isAuth")) {
        setTimeout(() => router.push('/login'), 3000);
        return;
      }

      const data = await getDocs(entryCollectionRef);
      setEntryList(data.docs.map(data => ({...data.data(), id: data.id}))
      .filter(entry => entry.author.id === localStorage.getItem('userId')));

    };
    getEntries();

  }, []);


  function tileContent({ activeStartDate, date, view }) {
    
    if (view === 'month') {

      const newEntry = entryList.find(entry => 
        ((new Date(entry.dateCreated).getDate() === date.getDate()) && 
          (new Date(entry.dateCreated).getMonth() === date.getMonth()) && 
          (new Date(entry.dateCreated).getYear() === date.getYear())));


      if (newEntry) {
        return (
          <div className={styles.tile}
            onClick={() => router.push(`/entry/${newEntry.id}`)}
          >
            <div className={styles.colorSphere}
              style={{backgroundColor: newEntry.color || '#233E49'}}>
            </div>
            <p
              className={styles.calendarEntry} 
            >
              {newEntry.title ? newEntry.title : 'an untitled entry'}
            </p>
          </div>
        );
       } else {
        return (
          <div className={styles.tile}
            onClick={() => alert('No journal entry this day')}
          >
            <p
              className={styles.calendarEntry} 
            >
            </p>
          </div>
        )
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
            please sign in to view your calendar
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