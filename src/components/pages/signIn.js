import React from 'react';
import '../../App.css';

import SigninForm from '../Signin';


function SignIn({ setIsLoggedIn }) {
  return (
    <>
      <SigninForm setIsLoggedIn={setIsLoggedIn} />
      
    </>
  );
}

export default SignIn;
