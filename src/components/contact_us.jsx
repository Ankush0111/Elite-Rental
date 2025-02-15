import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/contact_us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Request submitted successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        navigate('/');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="full">
      <div className="container">
      <div className="form-container">
        <div className="left-container">
          <div className="left-inner-container">
            <button onClick={() => navigate(-1)} className="top">
              ⬅
            </button>
            <h2>Let's Chat</h2>
            <p>
              Feel free to send us a message in the contact form regarding any
              issue.
            </p>
          </div>
        </div>
        <div className="right-container">
          <div className="right-inner-container">
            <form onSubmit={handleSubmit}>
              <h2 className="lg-view">Contact Us</h2>
              <h2 className="sm-view">Let's Chat</h2>
              <p>* Required</p>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
                aria-label="Name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Email"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                aria-label="Phone"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                aria-label="Message"
              ></textarea>
              <button type="submit" className='submit'>Submit</button>
              <button type="button" className="sm-view" onClick={() => navigate(-1)}>
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
