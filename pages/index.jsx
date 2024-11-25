import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import useHamburgerOnStore from '../state/useHamburgerOnStore';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {

  const setIsMenuOpen = useHamburgerOnStore(state => state.setIsMenuOpen);

  useEffect(() => {

    setIsMenuOpen(false);

  }, []);
  

  return (
    <div className={styles.aboutPage}>
    <Head>
      <title>Constellate</title>
    </Head>
      <Nav />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <div className={styles.whatIsContainer}>
            <h1 className={styles.heading}>what is constellate?</h1>
            <p className={styles.headerDescription}>
              constellate is a web application to keep track of your thoughts and 
              moods over time, like an online journal only accessible to you. if 
              you’re tired of having too many physical journals to count, and are 
              hoping for something a little more consistent and structured, 
              constellate is built with you in mind.
            </p>
          </div>
          <div className={styles.createContainer}>
            <div className={styles.imageContainer}>
              <Image className={styles.desktopImage}
                width="400"
                height="300"
                src="/create.png"
              />
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.heading}>create an entry</h1>
              <p className={styles.description}>
                every day you’re able to create a new journal entry with your thoughts, 
                a title, a mood and a color that today feels like. when you click the 
                save button, you can view the entry on your calendar.
              </p>
            </div>
          </div>
          <div className={styles.calendarContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.heading}>navigate your calendar</h1>
              <p className={styles.description}>
              from the calendar, you’re able to reflect on your past entries at a bird’s 
              eye view. you can click into your entry to view and edit it. 
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image className={styles.desktopImage}
                height="300"
                width="400"
                src="/calendar.png"
              />
            </div>
          </div>
          <div className={styles.mobileContainer}>
            <div className={styles.mobileImagesContainer}>
            <div className={`${styles.imageContainer} ${styles.mobileImageContainer}`}>
              <Image className={styles.mobileImage}
                height="250"
                width="150"
                src="/mobile-calendar.jpg"
              />
            </div>
            <div className={`${styles.imageContainer} ${styles.mobileImageContainer}`}>
              <Image className={styles.mobileImage}
                height="250"
                width="150"
                src="/mobile-create.jpg"
              />
            </div>
            <div className={`${styles.imageContainer} ${styles.mobileImageContainer}`}>
              <Image className={styles.mobileImage}
                height="250"
                width="150"
                src="/mobile-entry.jpg"
              />
            </div>
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.heading}>mobile responsive</h1>
              <p className={styles.description}>
              constellate is meant to keep your thoughts wherever you’re at, which 
              means on the go as well as when you’re at your computer, so feel free 
              to bring constellate with you wherever you are.
              </p>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          made with love in 2022 by
          <a 
            className={styles.footerLink} 
            href="https://cyanne.codes/"
          >
            cyanne jones
          </a>
          , you can find my github 
          <a
            className={styles.footerLink}
            href="https://github.com/Cyanne-Jones"
          >
            here
          </a>
        </footer>
      </div>
    </div>
  )
};
