import React from 'react';
import styles from './About.module.css';
import discGolfImage from './images/stock.jpg'

const About = () => {
  // const [data, setData] = useState({});
  //
  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}/about`)
  //       .then(response => response.json())
  //       .then(data => setData(data))
  //       .catch(error => console.error('Error fetching data:', error));
  //   }, []);

  return (
    <div className={styles.page}>
      <h1>About the East Coast Disc Golf Tour</h1>
      <div className={styles.container}>
        <img src={discGolfImage} alt="Disc Golf"/>
      </div>
      <h2>Smaller points to be made</h2>
      <p>and things about them</p>
    </div>
  );
};

export default About;