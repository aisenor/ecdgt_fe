import React from 'react';
import styles from './Home.module.css'

const Home = () => {


  return (
    <div className={styles.page}>
      <h1>Welcome to the home of the East Coast Disc Golf Tour</h1>
      <h3>Here you will find everything you need to know about the tour, how it started, and where it's going.</h3>
      <p>Be sure to follow us on all social media platforms for up to date information on Tour Stops, Standings, and other cool things that are on their way.</p>
      <p>Thank you for joining us, we can't wait to see you all on the course!</p>
    </div>
  );
};

export default Home;