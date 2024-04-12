import React from 'react';
import styles from './Home.module.css'
import hillsboroughImg from "./images/hillsboroughBanner.jpg";
import lightLogo from "./images/light_logo.png"
const Home = () => {


  return (
      <div className={styles.homePage}>
          <div className={`${styles.block} ${styles.blockLight} ${styles.blockOne}`}>
              <h1>Welcome to the home of the East Coast Disc Golf Tour</h1>
          </div>
          <div className={`${styles.block} ${styles.blockDark} ${styles.logoContainer}`}>
              <img src={lightLogo} alt="East Coast Disc Golf Tour Logo" className={styles.logoImage}/>
          </div>
          <div className={`${styles.block} ${styles.blockWhite} ${styles.blockOne}`}>
              <h2>An Eastern Canada disc golf tour born from Flickline Disc Golf and the Nova Scotia Disc Golf
                  Tour </h2>
          </div>
          <div className={`${styles.block} ${styles.blockLight} ${styles.blockOne}`}>
              <h3>First stop: Windsor Nova Scotia April 20th and 21st, 2024</h3>
          </div>
          <div className={`${styles.block} ${styles.blockDark}`}>
              <img src={hillsboroughImg} alt="East Coast Disc Golf Tour Logo" className={styles.logoImage}/>
          </div>
          <div className={`${styles.block} ${styles.blockWhite} ${styles.blockOne}`}>
              <p>
                  Connect with us on social media and send us a photo of your favorite course
                  featured on the tour
              </p>
          </div>
      </div>
  );
};

export default Home;