const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mbtiService = require('../services/mbtiService');

// @route   GET api/mbti/questions
// @desc    Get MBTI questions
// @access  Private
router.get('/questions', async (req, res) => {
  try {
    const questions = await mbtiService.getQuestions();
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mbti/calculate
// @desc    Calculate MBTI type from answers
// @access  Private
router.post('/calculate', async (req, res) => {
  try {
    const { answers } = req.body;
    const mbtiType = await mbtiService.calculateMBTIType(answers);
    
    // Save MBTI type to user profile (implementation depends on your user model)
    // req.user.mbtiType = mbtiType;
    // await req.user.save();
    
    res.json({ mbtiType });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/mbti/type/:type
// @desc    Get MBTI type details
// @access  Private
router.get('/type/:type', async (req, res) => {
  try {
    const type = req.params.type.toUpperCase();
    console.log('Getting type details for:', type);
    const mbtiType = await mbtiService.getTypeDetails(type);
    console.log('Found type:', mbtiType);
    res.json(mbtiType);
  } catch (err) {
    console.error('Error in /type/:type:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   GET api/mbti/recommendations/:type
// @desc    Get job recommendations for MBTI type
// @access  Private
// Debug route to check database contents
router.get('/debug/types', async (req, res) => {
  try {
    const { MBTIType } = require('../models/mbti');
    const types = await MBTIType.find({});
    console.log('All types in database:', types);
    res.json({ count: types.length, types });
  } catch (err) {
    console.error('Debug error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/recommendations/:type', async (req, res) => {
  try {
    const type = req.params.type.toUpperCase();
    const recommendations = await mbtiService.getJobRecommendations(type);
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
