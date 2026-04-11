import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import './styles.css';
import { Link } from 'react-router-dom';

function HeroSection({ isLoggedIn }) {
  return (
    <div className='hero-container'>
      <h1>The future is exciting</h1>
      <p>Are you ready?</p>
      <div className='hero-btns'>
        <Link to={isLoggedIn ? '/option' : '/sign-in'}>
            <button className='btn btn--outline btn--large'>
                GET STARTED
            </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;