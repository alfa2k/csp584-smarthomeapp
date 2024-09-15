import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Alert, Card, CardContent } from '@mui/material';

function Account({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [isLoginMode, setIsLoginMode] = useState(true); // Switch between login and registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch users from the public directory
    fetch('http://localhost:5001/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLoginMode && !name)) {
      setError('All fields are required.');
      return;
    }

    if (isLoginMode) {
      // Handle login logic
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        onLogin(user); // Login successful
        setError(null);
        setSuccess('Login successful!');
      } else {
        setError('Invalid email or password.');
        setSuccess(null);
      }
    } else {
      // Handle registration logic
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        setError('An account with this email already exists.');
        return;
      }

      const newUser = { name, email, password };

      fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }
          return response.json();
        })
        .then(() => {
          setUsers([...users, newUser]);
          setSuccess('Account created successfully!');
          setError(null);
          onLogin(newUser); // Auto login after successful registration
          setName('');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          setError(error.message || 'Error creating account.');
          setSuccess(null);
        });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: '#748d92' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#fff' }}>
            {isLoginMode ? 'Login' : 'Create Account'}
          </Typography>

          {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
          {success && <Alert severity="success" style={{ marginBottom: '20px' }}>{success}</Alert>}

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <TextField
                required
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: '#333' } }}
                inputProps={{ style: { color: '#333' } }}
                sx={{ borderRadius: '8px', backgroundColor: '#fff' }}
              />
            )}
            <TextField
              required
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              InputLabelProps={{ style: { color: '#333' } }}
              inputProps={{ style: { color: '#333' } }}
              sx={{ borderRadius: '8px', backgroundColor: '#fff' }}
            />
            <TextField
              required
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              InputLabelProps={{ style: { color: '#333' } }}
              inputProps={{ style: { color: '#333' } }}
              sx={{ borderRadius: '8px', backgroundColor: '#fff' }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '20px', borderRadius: '8px', padding: '12px 0' }}
            >
              {isLoginMode ? 'Login' : 'Register'}
            </Button>
          </form>

          <Button
            onClick={() => setIsLoginMode((prevMode) => !prevMode)}
            sx={{ marginTop: '20px', color: '#fff', textDecoration: 'underline' }}
          >
            {isLoginMode ? "Don't have an account? Register" : 'Already have an account? Login'}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Account;
