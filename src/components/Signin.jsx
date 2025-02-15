import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous error messages

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/Signin', { username, email, password });
  
      if (res.data.status === 'notexist') {
        alert('Sign up successful!');
        navigate('/login');
      } else if (res.data.status === 'exist') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('An unexpected error occurred.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show server-provided error message
      } else {
        setError('An error occurred. Please try again.');
      }
    }  
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/'); // Navigate to the previous page
  };

  return (
    <body>
      <div className='full'>

      <div className='container1'>
      <div className='header1'>
        <div className='text1'>Sign up</div>
        <div className='underline1'></div>
      </div>
      <form onSubmit={handleSignUp}>
        <div className='inputs1'>
          <div className='input1'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='input1'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input1'>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {error && <div className='error'>{error}</div>}
        <div className='btns1'>
          <input 
            type="submit" 
            value={isLoading ? 'Submitting...' : 'Submit'} 
            id='submit' 
            disabled={isLoading} // Disable the button while loading
          />
          <input 
            type="button" 
            value="Login" 
            id='login' 
            onClick={handleLoginClick} 
          />
        </div>
      </form>
      <div className='back-button-container'>
        <button className='back-button' onClick={handleBack}>Back</button>
      </div>
    </div>
      </div>
      
    </body>
  );
};

export default Signin;
