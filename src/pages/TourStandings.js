import React, { useState, useEffect } from 'react';
import styles from './TourStandings.module.css';

const TourStandings = () => {
    const [divisionData, setDivisionData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [tourStandings, setTourStandings] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/tour_standings`)
            .then(response => response.json())
            .then(data => setTourStandings(data.tour_standings))
            .catch(error => console.error('Error fetching tour standings:', error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/division`)
            .then(response => response.json())
            .then(data => setDivisionData(data.division))
            .catch(error => console.error('Error fetching divisions:', error));
    }, []);

    const handleClick = (divisionName) => {
        setSelectedDivision(divisionName);
    };

    const handleResetFilter = () => {
        setSelectedDivision(null);
    };

    return (
        <div className={styles.page}>
            <h1>Tour Standings</h1>
            <h2>Standings by Divisions</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleResetFilter} className={styles.resetDivisionButton}>
                    Reset Filter
                </button>
                {divisionData.map((division, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(division.name)}
                        className={`${styles.divisionButton} ${selectedDivision === division.name ? styles.selected : ''}`}
                    >
                        {division.name}
                    </button>
                ))}
            </div>
            <h2>Standings</h2>
            <table className={styles.styledTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Points</th>
                    <th>Division</th>
                    <th>PDGA Number</th>
                    <th>Event</th>
                </tr>
                </thead>
                <tbody>
                {tourStandings
                    .filter(player => !selectedDivision || player.division === selectedDivision)
                    .map((player, index) => (
                        <tr key={index}>
                            <td>{player.id}</td>
                            <td>{player.name}</td>
                            <td>{player.points}</td>
                            <td>{player.division}</td>
                            <td>{player.pdga_number || 'N/A'}</td>
                            <td>{player.event}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TourStandings;
