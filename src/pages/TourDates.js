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
    const [eventCourse, setEventCourse] = useState(null);
    const [eventProvince, setEventProvince] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState("");
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
            setEventCourse(eventForDay.course);
            setEventProvince(eventForDay.province);
        } else {
            setRegistrationLink(null);
            setEventName(null);
            setEventCourse(null);
            setEventProvince(null);
        }
        setSelectedDate(date);
    };

    const handleRegistrationClick = () => {
        if (registrationLink) {
            window.open(registrationLink, '_blank');
        }
    };

    const handleProvinceChange = event => {
        setSelectedProvince(event.target.value);
    };

    const tileContent = ({ date, view }) => {
        const isSelected = date.getTime() === selectedDate.getTime(); // Check if the date is selected
        const eventsForDay = tourDates.filter(event => event.date === date.toISOString().split('T')[0]);
        const eventsForSelectedProvince = selectedProvince ? eventsForDay.filter(event => event.province === selectedProvince) : eventsForDay;
        if (eventsForSelectedProvince.length > 0) {
            return eventsForSelectedProvince.map(event => (
                <div key={event.date} className={styles.eventProvinceContainer}>
                    <p className={`${styles.eventOnDay} ${isSelected ? styles.selected : ''}`}>
                        {event.name}<br/>
                    </p>
                    <p className={`${styles.eventOnDay} ${isSelected ? styles.selected : ''}`}>{event.province}</p>
                </div>
            ));
        }
        return null;
    };

    return (
        <div className={styles.container}>
            <h2>Tour Dates</h2>
            <div className={styles.calendarContainer}>
                {/*<p>Search for events by province</p>*/}
                <div className={styles.selectContainer}>
                    <select value={selectedProvince} onChange={handleProvinceChange}>
                        <option value="">All Provinces</option>
                         <option value="NS">Nova Scotia</option>
                         <option value="NB">New Brunswick</option>
                         <option value="PEI">Prince Edward Island</option>
                         <option value="NFL">Newfoundland and Labrador</option>
                    </select>
                </div>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileContent={tileContent}
                    onClickDay={handleDateClick}
                />
                {registrationLink && (
                    <div className={styles.registrationContainer}>
                        <p className={styles.blap}>
                            {eventName}
                            <br/>
                            <br/>
                            <strong>Province: </strong>{eventProvince}
                            <br/>
                            <br/>
                            <strong>Course: </strong>{eventCourse}
                        </p>
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
