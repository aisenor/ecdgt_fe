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
        const divisionStandings = tourStandings[divisionId];
        const playersArray = Object.entries(divisionStandings).map(([id, data]) => ({ id, ...data }));
        playersArray.sort((a, b) => b.tour_points - a.tour_points);

        // Find the index of the player
        const playerIndex = playersArray.findIndex(player => player.id === playerId);

        // Handle ties: if the previous player has the same points, assign the same rank
        if (playerIndex > 0 && playersArray[playerIndex].tour_points === playersArray[playerIndex - 1].tour_points) {
            return getPlayerRank(divisionId, playersArray[playerIndex - 1].id);
        }

        return playerIndex !== -1 ? playerIndex + 1 : 'N/A';
    };


    const getSortedStandings = () => {
        const standings = [];
        Object.entries(tourStandings).forEach(([divisionId, playersData]) => {
            Object.entries(playersData).forEach(([playerId, data]) => {
                if (!selectedDivision || getDivisionName(divisionId) === selectedDivision) {
                    standings.push({
                        division: getDivisionName(divisionId),
                        rank: getPlayerRank(divisionId, playerId),
                        name: getPlayerName(playerId),
                        points: data.tour_points
                    });
                }
            });
        });

        if (!selectedDivision) {
            // Sort standings by points if no division is selected
            standings.sort((a, b) => b.points - a.points);
        } else {
            // Sort standings within each division by rank
            standings.sort((a, b) => a.rank - b.rank);
        }

        return standings;
    };


    return (
        <div className={styles.page}>
            <h1>Tour Standings</h1>
            <h2>Standings by Divisions</h2>
            <div className={styles.buttonContainer}>
                <button onClick={handleResetFilter} className={styles.resetDivisionButton}>
                    Reset
                </button>
                {divisionData
                    .slice()
                    .sort((a, b) => {
                        // First, sort by division
                        const divisionSort = a.name.localeCompare(b.name);
                        if (divisionSort !== 0) return divisionSort;

                        // If divisions are the same, sort by points within the division
                        return b.points - a.points; // Change to a.points - b.points for ascending order
                    })
                    .map((division, index) => (
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
                {getSortedStandings().map((player, index) => (
                    <tr key={index}>
                        {!selectedDivision && <td>{player.division}</td>}
                        {selectedDivision && <td>{player.rank}</td>}
                        <td>{player.name}</td>
                        <td>{player.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TourStandings;
