const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { _id: true });

const mbtiQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  dimension: {
    type: String,
    required: true,
    enum: ['EI', 'SN', 'TF', 'JP']
  },
  direction: {
    type: Number,
    required: true,
    enum: [1, -1]
  },
  options: [optionSchema]
}, { timestamps: true });

const mbtiTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: /^[EI][SN][TF][JP]$/
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  strengths: [String],
  weaknesses: [String],
  suitableRoles: [{
    title: String,
    description: String
  }]
}, { timestamps: true });

const MBTIQuestion = mongoose.model('MBTIQuestion', mbtiQuestionSchema);
const MBTIType = mongoose.model('MBTIType', mbtiTypeSchema);

module.exports = { MBTIQuestion, MBTIType };