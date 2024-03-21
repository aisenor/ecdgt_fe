import React, { useState } from 'react';
import styles from './Contact.module.css';
import MailIcon from './images/send_mail.png';
import TwitterIcon from './images/twitter.png';
import FacebookIcon from './images/facebook.png';
import InstagramIcon from './images/instagram.png';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.page}>
                <h2>Contact Us</h2>
            </div>
            {/* Social Media Links */}
            <div className={styles.socialMediaContainer}>
                <h3 className={styles.page}>Connect with us on social media!</h3>
                <div className={styles.socialMediaIcons}>
                    <a href="link-to-twitter-profile" target="_blank">
                        <img src={TwitterIcon} alt="Twitter"/>
                    </a>
                    <a href="https://www.facebook.com/EastCoastDGT?locale=de_DE" target="_blank">
                        <img src={FacebookIcon} alt="Facebook"/>
                    </a>
                    <a href="https://www.instagram.com/ec_dgt/" target="_blank">
                        <img src={InstagramIcon} alt="Instagram"/>
                    </a>
                </div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.contactFormImageContainer}>
                    <img src={MailIcon} alt="mail"/>
                </div>

                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <br/>
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
