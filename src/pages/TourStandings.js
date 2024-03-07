import React, { useState, useEffect } from 'react';
import styles from './TourStandings.module.css';

const TourStandings = () => {
    const [divisionData, setDivisionData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [tourStandings, setTourStandings] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/standings`)
            .then(response => response.json())
            .then(data => setTourStandings(data.standings))
            .catch(error => console.error('Error fetching tour standings:', error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/division`)
            .then(response => response.json())
            .then(data => setDivisionData(data.division))
            .catch(error => console.error('Error fetching divisions:', error));
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/player`)
            .then(response => response.json())
            .then(data => setPlayers(data.player))
            .catch(error => console.error('Error fetching divisions:', error));
    }, []);


    const handleClick = (divisionName) => {
        setSelectedDivision(divisionName);
    };

    const handleResetFilter = () => {
        setSelectedDivision(null);
    };

    const getDivisionName = (divisionId) => {
        const division = divisionData.find(div => div.id === divisionId);
        return division ? division.name : 'N/A';
    };

    const getPlayerName = (playerId) => {
        const player = players.find(p => p.id === playerId);
        return player ? player.name : 'N/A';
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
                    {!selectedDivision && <th>Division</th>}
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {tourStandings
                    .filter(player => !selectedDivision || getDivisionName(player.division) === selectedDivision)
                    .map((player, index) => (
                        <tr key={index}>
                            {!selectedDivision && <td>{getDivisionName(player.division)}</td>}
                            <td>{player.rank}</td>
                            <td>{getPlayerName(player.id)}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TourStandings;
