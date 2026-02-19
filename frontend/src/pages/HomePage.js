import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
        }}
      >
        <PsychologyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography component="h1" variant="h3" align="center" gutterBottom>
          Discover Your Career Path
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Take our comprehensive MBTI-based personality test to understand your strengths and weaknesses, and find the IT career that truly fits you.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/test')}
          >
            Start the Test
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
