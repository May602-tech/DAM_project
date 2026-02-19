const { MBTIQuestion, MBTIType } = require('../models/mbti');

class MBTIService {
  // Get all MBTI questions
  async getQuestions() {
    try {
      const questions = await MBTIQuestion.aggregate([
        { $sample: { size: 40 } } // Get random 40 questions (10 per dimension)
      ]);
      return questions;
    } catch (error) {
      throw new Error('Failed to fetch MBTI questions');
    }
  }

  // Calculate MBTI type from answers
  async calculateMBTIType(answers) {
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      throw new Error('Invalid answers format');
    }

    // Initialize scores for each dimension
    const dimensions = {
      EI: { E: 0, I: 0 },
      SN: { S: 0, N: 0 },
      TF: { T: 0, F: 0 },
      JP: { J: 0, P: 0 }
    };

    // Process each answer
    for (const answer of answers) {
      const question = await MBTIQuestion.findById(answer.questionId);
      if (!question) continue;

      const dimension = question.dimension;
      const selectedOption = question.options.find(opt => opt._id.toString() === answer.optionId);
      
      if (selectedOption) {
        const score = selectedOption.value * question.direction;
        const [first, second] = dimension.split('');
        
        if (score > 0) {
          dimensions[dimension][first] += Math.abs(score);
        } else if (score < 0) {
          dimensions[dimension][second] += Math.abs(score);
        }
      }
    }

    // Determine MBTI type
    let mbtiType = '';
    
    // E/I
    mbtiType += dimensions.EI.E >= dimensions.EI.I ? 'E' : 'I';
    // S/N
    mbtiType += dimensions.SN.S >= dimensions.SN.N ? 'S' : 'N';
    // T/F
    mbtiType += dimensions.TF.T >= dimensions.TF.F ? 'T' : 'F';
    // J/P
    mbtiType += dimensions.JP.J >= dimensions.JP.P ? 'J' : 'P';

    return mbtiType;
  }

  // Get MBTI type details
  async getTypeDetails(type) {
    try {
      const mbtiType = await MBTIType.findOne({ type });
      if (!mbtiType) {
        throw new Error('Invalid MBTI type');
      }
      return mbtiType;
    } catch (error) {
      throw new Error('Failed to fetch MBTI type details');
    }
  }

  // Get job recommendations based on MBTI type
  async getJobRecommendations(mbtiType) {
    try {
      const mbtiInfo = await MBTIType.findOne({ type: mbtiType });
      if (!mbtiInfo) {
        throw new Error('Invalid MBTI type');
      }
      return mbtiInfo.suitableRoles || [];
    } catch (error) {
      throw new Error('Failed to get job recommendations');
    }
  }
}

module.exports = new MBTIService();
