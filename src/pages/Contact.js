import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact/`, {
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

        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Name:</label>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email:</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Message:</label>
              <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
  );
};

export default Contact;