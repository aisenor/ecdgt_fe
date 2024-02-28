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

    const tileContent = ({ date, view }) => {
        const isSelected = date.getTime() === selectedDate.getTime(); // Check if the date is selected
        const eventForDay = tourDates.find(event => event.date === date.toISOString().split('T')[0]);
        if (eventForDay) {
            return (
                <div className={styles.eventProvinceContainer}>
                    <p className={`${styles.eventOnDay} ${isSelected ? styles.selected : ''}`}>
                        {eventForDay.name}<br/>
                    </p>
                    <p className={`${styles.eventOnDay} ${isSelected ? styles.selected : ''}`}>{eventForDay.province}</p>
                </div>
            );
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
                    <div className={styles.registrationContainer}>
                        <p className={styles.blap}>{eventName}</p>
                        <a ref={registrationLinkRef} className={styles.submitButton} onClick={handleRegistrationClick}>
                            Register Here
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TourDates;
