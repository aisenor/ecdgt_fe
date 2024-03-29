import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState({});

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
};

export default Home;