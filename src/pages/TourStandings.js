import React, { useState, useEffect } from 'react';

const TourStandings = () => {
  const [data, setData] = useState({});

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/tour_standings`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
};

export default TourStandings;