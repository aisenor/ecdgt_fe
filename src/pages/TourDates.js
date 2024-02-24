import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './TourDates.module.css';
import './calendar.css';

const TourDates = () => {
    const [tourDates, setTourDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [registrationLink, setRegistrationLink] = useState(null);
    const [eventName, setEventName] = useState(null);
    const registrationLinkRef = useRef(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/tour_dates`)
            .then(response => response.json())
            .then(data => setTourDates(data.TourDates))
            .catch(error => console.error('Error fetching tour dates:', error));
    }, []);

    useEffect(() => {
        if (registrationLink) {
            registrationLinkRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [registrationLink]);

    const handleDateClick = date => {
        const eventForDay = tourDates.find(event => event.date === date.toISOString().split('T')[0]);
        if (eventForDay) {
            setRegistrationLink(eventForDay.link);
            setEventName(eventForDay.name);
        } else {
            setRegistrationLink(null);
            setEventName(null);
        }
        setSelectedDate(date);
    };

    const handleRegistrationClick = () => {
        if (registrationLink) {
            window.open(registrationLink, '_blank');
        }
    };

    const tileContent = ({ date }) => {
        const eventForDay = tourDates.find(event => event.date === date.toISOString().split('T')[0]);
        if (eventForDay) {
            return <p className={styles.eventOnDay}>{eventForDay.name}</p>;
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <h2>Tour Dates</h2>
            <div className={styles.calendarContainer}>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileContent={tileContent}
                    onClickDay={handleDateClick}
                />
                {registrationLink && (
                    <div ref={registrationLinkRef} className={styles.submitButton} onClick={handleRegistrationClick}>
                        <p>Registration for {eventName}:</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TourDates;
