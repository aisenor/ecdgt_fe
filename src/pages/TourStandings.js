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
            .then(data => {
                setTourStandings(data);
            })
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
        const division = divisionData.find(div => div.id === parseInt(divisionId));
        return division ? division.name : 'N/A';
    };

    const getPlayerName = (playerId) => {
        const player = players.find(p => p.id === parseInt(playerId));
        return player ? player.name : 'N/A';
    };

    const getPlayerRank = (divisionId, playerId) => {
        // Get the tour standings for the selected division
        const divisionStandings = tourStandings[divisionId];

        // Convert player data into an array for easier sorting
        const playersArray = Object.entries(divisionStandings).map(([id, data]) => ({ id, ...data }));

        // Sort players by tour points in descending order
        playersArray.sort((a, b) => b.tour_points - a.tour_points);

        // Find the index of the player with the given playerId in the sorted array
        const playerIndex = playersArray.findIndex(player => player.id === playerId);

        // Return the rank (index + 1) if player is found, otherwise return 'N/A'
        return playerIndex !== -1 ? playerIndex + 1 : 'N/A';
    };


    return (
        <div className={styles.page}>
            <h1>Tour Standings</h1>
            <h2>Standings by Divisions</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleResetFilter} className={styles.resetDivisionButton}>
                    Reset
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
                    {selectedDivision && <th>Rank</th>}
                    <th>Name</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {tourStandings &&
                    Object.entries(tourStandings).map(([divisionId, playersData]) => (
                        Object.entries(playersData).map(([playerId, data]) => (
                            (!selectedDivision || getDivisionName(divisionId) === selectedDivision) && (
                                <tr key={`${playerId}-${divisionId}`}>
                                    {!selectedDivision && <td>{getDivisionName(divisionId)}</td>}
                                    {selectedDivision && <td>{getPlayerRank(divisionId, playerId)}</td>}
                                    <td>{getPlayerName(playerId)}</td>
                                    <td>{data.tour_points}</td>
                                </tr>
                            )
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TourStandings;
