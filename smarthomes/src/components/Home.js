import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Divider, Fab } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DoorbellIcon from '@mui/icons-material/Doorbell';
import LockIcon from '@mui/icons-material/Lock';
import SpeakerIcon from '@mui/icons-material/Speaker';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';

const categories = [
  { name: 'Smart Doorbells', icon: <DoorbellIcon fontSize="large" /> },
  { name: 'Smart Doorlocks', icon: <LockIcon fontSize="large" /> },
  { name: 'Smart Speakers', icon: <SpeakerIcon fontSize="large" /> },
  { name: 'Smart Lightings', icon: <LightbulbIcon fontSize="large" /> },
  { name: 'Smart Thermostats', icon: <ThermostatIcon fontSize="large" /> },
];

function Home({ user, onLogout }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: '50px',
        background: 'linear-gradient(135deg, #748d92 80%, #748d91 2%)',
        padding: '40px',
        borderRadius: '24px',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
        {user ? `Welcome to SmartHomes, ${user.name}` : 'Welcome to SmartHomes'}
      </Typography>
      <Divider variant="middle" style={{ marginBottom: '40px', backgroundColor: '#fff' }} />

      <Grid2 container spacing={5} justifyContent="center">
        {categories.map((category) => (
          <Grid2 xs={12} sm={6} md={4} key={category.name}>
            <Link
              to={`/products/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  borderRadius: '32px',
                  height: '300px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: '#fff',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.08)',
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                <CardContent>
                  <div style={{ marginBottom: '20px', color: '#1e3a8a', fontSize: '50px' }}>{category.icon}</div>
                  <Typography variant="h6" textAlign="center" sx={{ color: '#1e3a8a' }}>
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default Home;
