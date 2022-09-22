import Head from 'next/head';
//import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import styles from '../styles/Calendar.module.css';
import Calendar from 'react-calendar';
import { db, auth } from '../firebase-config';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

export default function CalendarPage() {

  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ entryList, setEntryList ] = useState([]);
  const entryCollectionRef = collection(db, 'entries');

  useEffect(() => {

    const getEntries = async () => {

      const data = await getDocs(entryCollectionRef);
      setEntryList(data.docs.map(data => ({...data.data(), id: data.id})));
      console.log(entryList);

    };
    getEntries();

  }, []);


  function tileContent({ activeStartDate, date, view }) {

    let title;

    const entryDates = entryList.map(entry => entry.dateCreated);
    
    if (view === 'month') {

      const newEntry = entryList.find(entry => (new Date(entry.dateCreated).getDate() === date.getDate()));

      if (newEntry) {

        return (
          <p className={styles.calendarEntry} style={{backgroundColor: newEntry.color}}>{newEntry.title}</p>
        );

       };

    }
  }

  return (

    <>
    <Head>
      <title>Calendar</title>
    </Head>
      <Nav />
      Calendar
      <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate}
        tileContent={tileContent}
        className={styles.reactCalendar}
      />
    </>
  )
  
};