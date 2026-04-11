import React from 'react';
import '../../App.css';
import SignupForm from '../Signup';

function SignUp({ setIsLoggedIn }) {
  return (
    <>
      <SignupForm setIsLoggedIn={setIsLoggedIn} />
      
    </>
  );
}

export default SignUp;