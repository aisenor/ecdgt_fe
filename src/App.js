import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TourDates from './pages/TourDates';
import TourStandings from './pages/TourStandings';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import './theme.css'; // Import custom CSS variables

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/about" element={<About data={data} />} />
        <Route path="/tour_dates" element={<TourDates data={data} />} />
        <Route path="/tour_standings" element={<TourStandings data={data} />} />
        <Route path="/contact" element={<Contact data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;