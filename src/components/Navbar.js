import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userSign');
    localStorage.removeItem('userName');
    closeMobileMenu();
    navigate('/');
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          🔮 
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to='/sign-up'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/sign-in'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-links'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
          {button && !isLoggedIn && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
