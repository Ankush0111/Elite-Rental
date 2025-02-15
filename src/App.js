// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/index';
import SigninPage from './components/Signin';
import LoginPage from './components/Login';
import Contact from './components/contact_us';
import Rent from './components/rent';
import ProtectRoute from './components/protectRoute';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/Signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact_us" element={<Contact />} />
        <Route path="/rent" element={<Rent/>} />
        <Route path="/protectRoute" element={<ProtectRoute/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;
