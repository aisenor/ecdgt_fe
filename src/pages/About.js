import React, { useState, useEffect } from 'react';
import discGolfImage from './images/stock.jpg'

const About = () => {
  const [data, setData] = useState({});

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/about`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <h1>About the East Coast Disc Golf Tour</h1>
        <img src={discGolfImage} alt="Disc Golf" />
        <h2>Smaller points to be made</h2>
      <p>and things about them</p>
    </div>
  );
};

export default About;