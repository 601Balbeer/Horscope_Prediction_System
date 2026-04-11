import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';



function SignupPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add validation and signup logic here
    console.log({
      username,
      email,
      password,
      name
    });

    // Register the user locally
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (!registeredUsers.includes(email)) {
        registeredUsers.push(email);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

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
      <h3>Sign Up</h3>
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
      <Link to="/sign-in">Already have an account? Log in</Link>
      <br/><br/><br/>
    </Container>
  );
}

export default SignupPage;
