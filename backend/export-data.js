// In d:\VIII_DAM_project\backend\export-data.js
const mongoose = require('mongoose');
const { MBTIType, MBTIQuestion } = require('./models/mbti');
const fs = require('fs');

const mongoURI = 'mongodb://127.0.0.1:27017/MBTI_Career_Matcher_1';

async function exportData() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Export MBTI Types
    const types = await MBTIType.find({});
    fs.writeFileSync('mbti_types_export.json', JSON.stringify(types, null, 2));
    console.log('Exported mbtitypes to mbti_types_export.json');

    // Export MBTI Questions
    const questions = await MBTIQuestion.find({});
    fs.writeFileSync('mbti_questions_export.json', JSON.stringify(questions, null, 2));
    console.log('Exported mbtiquestions to mbti_questions_export.json');

    mongoose.connection.close();
    console.log('Export complete! Check your backend folder for the JSON files.');
  } catch (error) {
    console.error('Export failed:', error);
    mongoose.connection.close();
  }
}

exportData();
