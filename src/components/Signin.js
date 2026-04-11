import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if user has signed up first
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (!registeredUsers.includes(email)) {
        alert("Account not found. Please Sign Up first!");
        navigate("/sign-up");
        return;
    }

    // Add validation and login logic here
    console.log({
      email,
      password
    });

    // Persist login state
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');

    // Redirect to the Option page
    navigate("/option");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
      <br/><br/><br/>
        <h3>Log In</h3>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
      </form>
      <Link to="/sign-up">Don't have an account? Sign up</Link>
      <br/>
      <br/>
      <br/>
    </Container>
  );
}

export default LoginPage;
