import React from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const MBTIQuestion = ({ question, onAnswer, selectedValue }) => {
  const handleRadioChange = (event) => {
    onAnswer(question._id, event.target.value);
  };

  return (
    <FormControl component="fieldset" sx={{ margin: '20px 0', width: '100%' }}>
      <FormLabel component="legend"><Typography variant="h6">{question.question}</Typography></FormLabel>
      <RadioGroup
        aria-label={question.question}
        name={question._id}
        value={selectedValue || ''}
        onChange={handleRadioChange}
      >
        {question.options.map(option => (
          <FormControlLabel 
            key={option._id} 
            value={option._id} 
            control={<Radio />} 
            label={option.text} 
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MBTIQuestion;
