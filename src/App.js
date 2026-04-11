import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Zodic from './components/pages/Zodic';
import Person from './components/pages/Persona';
import Options from './components/Options';
import Match from './components/Match';
import SignIn from './components/pages/signIn';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/zodic" element={<Zodic />} />
          <Route path="/persona" element={<Person />} />
          <Route path="/option" element={<Options />} />
          <Route path="/match" element={<Match />} />
          <Route path="/sign-in" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
