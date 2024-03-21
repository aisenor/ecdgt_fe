import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'

const Home = () => {
  const [data, setData] = useState({});

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div className={styles.page}>
      <h1>{data.message}</h1>
    </div>
  );
};

export default Home;