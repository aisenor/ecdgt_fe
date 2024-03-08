import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './TourDates.module.css';
import './calendar.css';

const TourDates = () => {
    const [tourDates, setTourDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [registrationLink, setRegistrationLink] = useState(null);
    const [eventText, setEventText] = useState(null);
    const [eventCourse, setEventCourse] = useState(null);
    const [eventProvince, setEventProvince] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState("");
    const registrationLinkRef = useRef(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/event`)
            .then(response => response.json())
            .then(data => setTourDates(data.event))
            .catch(error => console.error('Error fetching tour dates:', error));
    }, []);

    useEffect(() => {
        if (registrationLink) {
            registrationLinkRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [registrationLink]);

    const handleDateClick = date => {
        console.log(tourDates)
        const eventForDay = tourDates.find(event => event.date === date.toISOString().split('T')[0]);
        if (eventForDay) {
            setRegistrationLink(eventForDay.link);
            setEventText(eventForDay.text);
            setEventCourse(eventForDay.course);
            setEventProvince(eventForDay.province);
        } else {
            setRegistrationLink(null);
            setEventText(null);
            setEventCourse(null);
            setEventProvince(null);
        }
        setSelectedDate(date);
    };

    const handleRegistrationClick = () => {
        console.log(tourDates)
        if (registrationLink) {
            window.open(registrationLink, '_blank');
        }
    };

    const handleProvinceChange = event => {
        console.log(tourDates)
        setSelectedProvince(event.target.value);
    };

    const tileContent = ({ date }) => {
        const isSelected = date.getTime() === selectedDate.getTime(); // Check if the date is selected
        const eventsForDay = tourDates.filter(event => event.date === date.toISOString().split('T')[0]);
        const eventsForSelectedProvince = selectedProvince ? eventsForDay.filter(event => event.province === selectedProvince) : eventsForDay;
        if (eventsForSelectedProvince.length > 0) {
            return eventsForSelectedProvince.map(event => (
                <div key={event.date} className={styles.eventProvinceContainer}>
                    <p className={`${styles.eventOnDay} ${isSelected ? styles.selected : ''}`}>
                        {event.text}<br/>
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
                <div className={styles.selectContainer}>
                    <select value={selectedProvince} onChange={handleProvinceChange}>
                        <option value="">All Provinces</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NB">New Brunswick</option>
                        <option value="PEI">Prince Edward Island</option>
                        <option value="NL">Newfoundland and Labrador</option>
                    </select>
                </div>
                <Calendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    tileContent={tileContent}
                    onClickDay={handleDateClick}
                />
                <p>{selectedDate.toString()}</p>
                <p>{eventText} {eventCourse} {eventProvince} {registrationLink}</p>
                {eventText && (
                    <div className={styles.registrationContainer}>
                        <p className={styles.blap}>
                            {eventText}
                            <br/>
                            <br/>
                            <strong>Province: </strong>{eventProvince}
                            <br/>
                            <br/>
                            <strong>Course: </strong>{eventCourse}
                        </p>
                        {registrationLink ? (
                            <button ref={registrationLinkRef} className={styles.submitButton} onClick={handleRegistrationClick}>
                                Register Here
                            </button>
                        ) : (
                            <p>Registration is not available yet</p>
                        )}
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default TourDates;
