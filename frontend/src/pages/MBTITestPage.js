import React, { useState, useEffect } from 'react';
import { getQuestions, calculateResult } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Box, Card, CardContent, LinearProgress, Grid, Paper } from '@mui/material';
import MBTIQuestion from '../components/MBTIQuestion';

const MBTITestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to load questions');
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const answerList = Object.keys(answers).map(questionId => ({ questionId, optionId: answers[questionId] }));
      const result = await calculateResult(answerList);
      navigate(`/results/${result.mbtiType}`);
    } catch (error) {
      console.error('Failed to submit test');
    }
  };

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: '30px', marginTop: '20px', backgroundColor: '#f0f4f8' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">MBTI Test</Typography>
        {questions.length > 0 && (
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress variant="determinate" value={((currentQuestionIndex + 1) / questions.length) * 100} />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                </Typography>
              </Box>
              <MBTIQuestion 
                question={questions[currentQuestionIndex]} 
                onAnswer={handleAnswer} 
                selectedValue={answers[questions[currentQuestionIndex]?._id]} 
              />
              <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
                <Grid item>
                  <Button variant="outlined" onClick={handleBack} disabled={currentQuestionIndex === 0}>
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button variant="contained" onClick={handleNext} disabled={!answers[questions[currentQuestionIndex]?._id]}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!allQuestionsAnswered}>
                      See Results
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default MBTITestPage;
