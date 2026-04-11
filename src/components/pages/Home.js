import React, { useEffect } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import { useNavigate } from 'react-router-dom';

function Home({ isLoggedIn }) {
  return (
    <>
      <HeroSection isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Home;