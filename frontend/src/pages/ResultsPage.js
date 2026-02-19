import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTypeDetails, getJobRecommendations } from '../services/api';
import { Container, Typography, CircularProgress, Box, Paper, List, ListItem, ListItemText, Grid, Card, CardContent, Button, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ResultsPage = () => {

  const parseDescription = (description) => {
    const parts = description.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };
  const { type } = useParams();
  const navigate = useNavigate();
  const [typeDetails, setTypeDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const details = await getTypeDetails(type);
        const jobs = await getJobRecommendations(type);
        setTypeDetails(details);
        setRecommendations(jobs);
      } catch (error) {
        console.error('Failed to load results');
      }
      setLoading(false);
    };
    fetchResults();
  }, [type]);

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (!typeDetails) {
    return <Container><Typography>Could not load results for type {type}.</Typography></Container>;
  }

  return (
    <Container>
      <Paper sx={{ padding: '30px', marginTop: '20px', backgroundColor: '#f0f4f8' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Your MBTI Type: <span style={{ color: 'primary.main' }}>{typeDetails.type}</span>
          <br />
          <span style={{ color: 'secondary.main' }}>({typeDetails.name})</span>
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '30px' }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Detailed Description
                </Typography>
                <Box sx={{ maxHeight: 200, overflow: 'auto', pr: 2 }}>
                  <Typography variant="body1" component="div" sx={{ lineHeight: 1.7 }}>
                    {parseDescription(typeDetails.description)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>Strengths</Typography>
                <List>
                  {typeDetails.strengths.map((strength, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                      <ListItemText primary={strength} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>Weaknesses</Typography>
                <List>
                  {typeDetails.weaknesses.map((weakness, index) => (
                    <ListItem key={index}>
                      <ListItemIcon><HighlightOffIcon color="error" /></ListItemIcon>
                      <ListItemText primary={weakness} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">Suitable Job Roles</Typography>
          <List>
            {recommendations.map((role, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={role.title} secondary={role.description} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/test')}>
            Take Test Again
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResultsPage;
