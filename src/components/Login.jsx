import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlelogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous errors

    try {
      const res = await axios.post('http://localhost:3000/Login', { email, password });

      if (res.data.status === 'exist') {

        // Store user session in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userEmail", email);



        alert(`Welcome, ${res.data.name}`);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleChangePasswordClick = () => {
    navigate('/forget-password');
  };

  const handleBack = () => {
    navigate('/signin'); // Navigate to the previous page
  };

  return (
    <div className='full'>
      <div className='container1'>
      <div className='header1'>
        <div className='text1'>Login</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handlelogin}>
        <div className='inputs1'>
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
        {/* <div className='forget_password1'>
          Forget password?{' '}
          <span onClick={handleChangePasswordClick} style={{ cursor: 'pointer', color: 'blue' }}>
            Click here!
          </span>
        </div> */}
        {error && <div className='error'>{error}</div>}
        <div className='btns1'>
          <input type="submit" value="Submit" id='submit' />
        </div>
      </form>
      <div className='back-button-container'>
        <button className='back-button' onClick={handleBack}>Back</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
