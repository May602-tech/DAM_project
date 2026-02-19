const mongoose = require('mongoose');
const { MBTIQuestion, MBTIType } = require('./models/mbti');

const mongoURI = 'mongodb://127.0.0.1:27017/MBTI_Career_Matcher_1';

const mbtiTypes = [
  { type: 'ISTJ', name: 'The Inspector', description: 'ISTJs are **responsible, organized, and practical** individuals who value tradition and loyalty. They are **methodical and thorough**, preferring to work with concrete facts and data. They take their commitments seriously and can be **counted on to follow through**.', strengths: ['Responsible', 'Organized', 'Practical', 'Detail-oriented'], weaknesses: ['Stubborn', 'Insensitive', 'By-the-book', 'Judgmental'], suitableRoles: [{ title: 'Database Administrator', description: 'Ensuring database integrity, performance, and security.' }, { title: 'Systems Administrator', description: 'Managing and maintaining IT infrastructure and server environments.' }] },
  { type: 'ISFJ', name: 'The Protector', description: 'ISFJs are **warm, considerate, and dedicated** individuals who are committed to the well-being of others. They are **meticulous and responsible**, with a strong sense of duty. They thrive in environments where they can provide **practical care and support**.', strengths: ['Supportive', 'Reliable', 'Patient', 'Imaginative'], weaknesses: ['Shy', 'Takes things too personally', 'Overloads themselves', 'Reluctant to change'], suitableRoles: [{ title: 'IT Support Specialist', description: 'Providing technical assistance and troubleshooting for users.' }, { title: 'QA Tester', description: 'Ensuring software quality through manual and automated testing.' }] },
  { type: 'INFJ', name: 'The Advocate', description: 'INFJs are **insightful, creative, and principled** individuals who are driven by a deep sense of idealism. They are passionate about making the world a better place and have a natural ability to understand **complex emotional dynamics** and human motivations.', strengths: ['Creative', 'Insightful', 'Principled', 'Passionate'], weaknesses: ['Sensitive to criticism', 'Reluctant to open up', 'Perfectionistic', 'Avoiding the ordinary'], suitableRoles: [{ title: 'UI/UX Designer', description: 'Creating intuitive and user-centered designs for software and websites.' }, { title: 'Technical Writer', description: 'Producing clear and concise documentation for IT products.' }] },
  { type: 'ISTP', name: 'The Crafter', description: 'ISTPs are **adventurous and independent** individuals who are masters of their chosen tools, whether physical or digital. They are **logical, practical problem-solvers** who thrive on understanding how things work and are **quick to act in a crisis**.', strengths: ['Optimistic', 'Energetic', 'Creative', 'Practical'], weaknesses: ['Stubborn', 'Insensitive', 'Private and reserved', 'Easily bored'], suitableRoles: [{ title: 'Network Engineer', description: 'Designing, implementing, and managing computer networks.' }, { title: 'DevOps Engineer', description: 'Automating and streamlining software development and deployment processes.' }] },
  { type: 'ISFP', name: 'The Artist', description: 'ISFPs are **gentle, sensitive, and artistic** individuals who live in the present moment. They are **spontaneous and flexible**, with a deep appreciation for aesthetics. They seek to create a personal environment that is both **beautiful and functional**.', strengths: ['Charming', 'Sensitive to others', 'Imaginative', 'Passionate'], weaknesses: ['Fiercely independent', 'Unpredictable', 'Easily stressed', 'Overly competitive'], suitableRoles: [{ title: 'Frontend Developer', description: 'Building the user interface and client-side logic of web applications.' }, { title: 'Digital Artist / Animator', description: 'Creating graphics and animations for games and multimedia.' }] },
  { type: 'INFP', name: 'The Mediator', description: 'INFPs are **imaginative idealists**, guided by their own core values and beliefs. They are **curious, open-minded**, and seek to understand people and their place in the world. They are passionate about causes that **align with their values**.', strengths: ['Idealistic', 'Seeks harmony', 'Open-minded', 'Flexible'], weaknesses: ['Too idealistic', 'Too altruistic', 'Impractical', 'Dislikes dealing with data'], suitableRoles: [{ title: 'UX Researcher', description: 'Understanding user behaviors and needs to inform design decisions.' }, { title: 'Content Strategist (IT)', description: 'Planning and managing content for tech-focused websites and products.' }] },
  { type: 'ESTP', name: 'The Dynamo', description: 'ESTPs are **energetic, action-oriented, and perceptive** individuals who thrive in the moment. They are **pragmatic problem-solvers** who enjoy taking risks and thinking on their feet. They are often the **first to respond in a crisis**.', strengths: ['Bold', 'Rational', 'Practical', 'Original'], weaknesses: ['Insensitive', 'Impatient', 'Risk-prone', 'Unstructured'], suitableRoles: [{ title: 'Cybersecurity Analyst', description: 'Protecting IT systems from security threats and breaches.' }, { title: 'IT Sales Engineer', description: 'Combining technical knowledge with sales skills to sell IT solutions.' }] },
  { type: 'ESTJ', name: 'The Executive', description: 'ESTJs are **organized, efficient, and decisive leaders** who excel at managing people and projects. They are **logical and assertive**, with a strong belief in rules and tradition. They are committed to **creating order and structure**.', strengths: ['Dedicated', 'Strong-willed', 'Direct and honest', 'Loyal, patient and reliable'], weaknesses: ['Inflexible and stubborn', 'Uncomfortable with unconventional situations', 'Judgmental', 'Too focused on social status'], suitableRoles: [{ title: 'IT Project Manager', description: 'Planning, executing, and overseeing IT projects to completion.' }, { title: 'Cloud Solutions Architect', description: 'Designing and managing cloud computing architecture.' }] },
  { type: 'ENFP', name: 'The Champion', description: 'ENFPs are **enthusiastic, creative, and sociable** individuals who see life as full of possibilities. They are **excellent communicators** who can inspire and motivate others. They thrive on **new ideas and experiences**.', strengths: ['Curious', 'Observant', 'Energetic and enthusiastic', 'Excellent communicator'], weaknesses: ['Poor practical skills', 'Finds it difficult to focus', 'Overthinks things', 'Highly emotional'], suitableRoles: [{ title: 'Product Manager (IT)', description: 'Defining the vision and strategy for a tech product.' }, { title: 'Scrum Master', description: 'Facilitating Agile development teams and processes.' }] },
  { type: 'ENFJ', name: 'The Giver', description: 'ENFJs are **charismatic, empathetic, and inspiring leaders** who are driven to help others realize their potential. They are **natural-born teachers and mentors** who can create a **positive and collaborative environment**.', strengths: ['Tolerant', 'Reliable', 'Charismatic', 'Altruistic'], weaknesses: ['Overly idealistic', 'Too selfless', 'Too sensitive', 'Fluctuating self-esteem'], suitableRoles: [{ title: 'IT Trainer / Tech Evangelist', description: 'Educating others on new technologies and products.' }, { title: 'Community Manager (Tech)', description: 'Building and engaging with a community around a tech product.' }] },
  { type: 'ESFP', name: 'The Performer', description: 'ESFPs are **vivacious, charming, and spontaneous** individuals who love to be the center of attention. They are **fun-loving and enjoy new experiences**, making life exciting for those around them. They are **practical and resourceful**.', strengths: ['Bold', 'Original', 'Aesthetics and showmanship', 'Practical'], weaknesses: ['Sensitive', 'Conflict-averse', 'Easily bored', 'Poor long-term planners'], suitableRoles: [{ title: 'Game Designer', description: 'Designing the core concepts and mechanics of video games.' }, { title: 'Mobile App Developer', description: 'Creating applications for mobile devices.' }] },
  {
    type: 'ESFJ',
    name: 'The Consul',
    description: 'ESFJs are **caring, sociable, and popular** individuals who are dedicated to helping others. They are **highly attuned to the needs of those around them** and enjoy creating a harmonious and supportive environment. They are **practical and organized**.',
    strengths: ['Strong Practical Skills', 'Strong Sense of Duty', 'Very Loyal', 'Sensitive and Warm'],
    weaknesses: ['Worried about Social Status', 'Inflexible', 'Vulnerable to Criticism', 'Often Too Needy'],
    suitableRoles: [
      { title: 'Help Desk Technician', description: 'Providing first-level support to resolve user issues.' },
      { title: 'Customer Success Manager (IT)', description: 'Ensuring customers are successful with a tech product.' }
    ],
  },
  {
    type: 'INTJ',
    name: 'The Architect',
    description: 'INTJs are **analytical problem-solvers**, eager to improve systems and processes with their innovative ideas. They have a talent for seeing **possibilities for improvement**, whether at work, at home, or in themselves.',
    strengths: ['Strategic', 'Independent', 'Determined', 'Open-minded', 'Insightful'],
    weaknesses: ['Overly critical', 'Dismissive of emotions', 'Perfectionistic'],
    suitableRoles: [
      { title: 'Software Architect', description: 'Designing high-level structures of a software system.' },
      { title: 'Chief Technology Officer (CTO)', description: 'Overseeing the technological needs and strategy of a company.' }
    ]
  },
  {
    type: 'INTP',
    name: 'The Logician',
    description: 'INTPs are fascinated by **logical analysis, systems, and design**. They are preoccupied with theory and are driven to understand the **universal laws that govern the world**. They are **detached, concise, and enjoy intellectual pursuits**.',
    strengths: ['Analytical', 'Original', 'Open-minded', 'Honest', 'Objective'],
    weaknesses: ['Insensitive', 'Absent-minded', 'Second-guessing'],
    suitableRoles: [
      { title: 'Data Scientist', description: 'Analyzing complex data to extract knowledge and insights.' },
      { title: 'AI/Machine Learning Engineer', description: 'Building and deploying machine learning models.' }
    ]
  },
  {
    type: 'ENTJ',
    name: 'The Commander',
    description: 'ENTJs are **strategic leaders**, motivated to organize change. They are quick to see inefficiency and **conceptualize new solutions**, and enjoy developing long-range plans to accomplish their vision. They **excel at logical reasoning**.',
    strengths: ['Confident', 'Strategic', 'Charismatic', 'Organized', 'Decisive'],
    weaknesses: ['Stubborn', 'Dominant', 'Intolerant', 'Impatient'],
    suitableRoles: [
      { title: 'Chief Information Officer (CIO)', description: 'Overseeing the IT strategy and systems of an organization.' },
      { title: 'Enterprise Architect', description: 'Aligning IT strategy with business goals.' }
    ]
  },
  {
    type: 'ENTP',
    name: 'The Debater',
    description: 'ENTPs are **inspired innovators**, motivated to find new solutions to intellectually challenging problems. They are **curious and clever**, and seek to understand the people, systems, and principles that surround them.',
    strengths: ['Innovative', 'Adaptable', 'Resourceful', 'Quick-thinking', 'Charismatic'],
    weaknesses: ['Argumentative', 'Insensitive', 'Disorganized', 'Unfocused'],
    suitableRoles: [
      { title: 'Solutions Architect', description: 'Designing and developing solutions to complex business problems.' },
      { title: 'Product Owner', description: 'Maximizing the value of a product resulting from the work of the Development Team.' }
    ]
  }
];

const mbtiQuestions = [
  // EI Dimension (10 questions)
  { question: 'At a social event, you are more likely to:', dimension: 'EI', direction: 1, options: [{ text: 'Interact with many people, including strangers', value: 2 }, { text: 'Stick to the people you already know', value: -2 }] },
  { question: 'After a long week, you prefer a weekend that is:', dimension: 'EI', direction: 1, options: [{ text: 'Full of social activities', value: 2 }, { text: 'Quiet with time for yourself', value: -2 }] },
  { question: 'In a discussion, you are more likely to:', dimension: 'EI', direction: 1, options: [{ text: 'Speak up and share your thoughts freely', value: 2 }, { text: 'Listen carefully before you speak', value: -2 }] },
  { question: 'When working on a group project, you prefer to:', dimension: 'EI', direction: 1, options: [{ text: 'Brainstorm ideas with the group', value: 2 }, { text: 'Think things through on your own first', value: -2 }] },
  { question: 'You would describe yourself as more:', dimension: 'EI', direction: 1, options: [{ text: 'Outgoing and expressive', value: 2 }, { text: 'Private and reserved', value: -2 }] },
  { question: 'When you are in a new environment, you tend to:', dimension: 'EI', direction: 1, options: [{ text: 'Introduce yourself to others', value: 2 }, { text: 'Wait for others to approach you', value: -2 }] },
  { question: 'Your energy levels are more affected by:', dimension: 'EI', direction: 1, options: [{ text: 'Being around people', value: 2 }, { text: 'Spending time alone', value: -2 }] },
  { question: 'When learning something new, you prefer to:', dimension: 'EI', direction: 1, options: [{ text: 'Discuss it with others', value: 2 }, { text: 'Reflect on it by yourself', value: -2 }] },
  { question: 'You feel more comfortable:', dimension: 'EI', direction: 1, options: [{ text: 'In a large, bustling crowd', value: 2 }, { text: 'In a small, intimate group', value: -2 }] },
  { question: 'When making a phone call, you:', dimension: 'EI', direction: 1, options: [{ text: 'Feel comfortable and do it without hesitation', value: 2 }, { text: 'Rehearse what you are going to say', value: -2 }] },
  // SN Dimension (10 questions)
  { question: 'You are more interested in:', dimension: 'SN', direction: 1, options: [{ text: 'Facts and concrete details', value: 2 }, { text: 'Ideas and abstract concepts', value: -2 }] },
  { question: 'When you read, you prefer:', dimension: 'SN', direction: 1, options: [{ text: 'Books based on real events', value: 2 }, { text: 'Fictional stories with imaginative plots', value: -2 }] },
  { question: 'You trust:', dimension: 'SN', direction: 1, options: [{ text: 'Your direct experience and observations', value: 2 }, { text: 'Your intuition and gut feelings', value: -2 }] },
  { question: 'In your work, you prefer tasks that require:', dimension: 'SN', direction: 1, options: [{ text: 'Practical application and tangible results', value: 2 }, { text: 'Innovation and theoretical thinking', value: -2 }] },
  { question: 'You would rather be seen as:', dimension: 'SN', direction: 1, options: [{ text: 'A realistic and practical person', value: 2 }, { text: 'An imaginative and innovative person', value: -2 }] },
  { question: 'When describing an event, you are more likely to:', dimension: 'SN', direction: 1, options: [{ text: 'Detail what actually happened', value: 2 }, { text: 'Explain the underlying meaning and possibilities', value: -2 }] },
  { question: 'You are more drawn to:', dimension: 'SN', direction: 1, options: [{ text: 'The present moment and current realities', value: 2 }, { text: 'Future possibilities and potential outcomes', value: -2 }] },
  { question: 'When following instructions, you prefer to:', dimension: 'SN', direction: 1, options: [{ text: 'Have clear, step-by-step directions', value: 2 }, { text: 'Have a general guideline and figure out the details yourself', value: -2 }] },
  { question: 'You notice:', dimension: 'SN', direction: 1, options: [{ text: 'Small details in your surroundings', value: 2 }, { text: 'The overall pattern and connections', value: -2 }] },
  { question: 'You prefer to talk about:', dimension: 'SN', direction: 1, options: [{ text: 'What is happening now', value: 2 }, { text: 'What could happen in the future', value: -2 }] },
  // TF Dimension (10 questions)
  { question: 'When making a decision, you rely more on:', dimension: 'TF', direction: 1, options: [{ text: 'Logical analysis and objective criteria', value: 2 }, { text: 'Personal values and how it affects others', value: -2 }] },
  { question: 'You are more concerned with:', dimension: 'TF', direction: 1, options: [{ text: 'Being fair and just', value: 2 }, { text: 'Being compassionate and empathetic', value: -2 }] },
  { question: 'In an argument, you are more likely to:', dimension: 'TF', direction: 1, options: [{ text: 'Focus on the logical inconsistencies', value: 2 }, { text: 'Consider the other person’s feelings', value: -2 }] },
  { question: 'You would rather be known as someone who is:', dimension: 'TF', direction: 1, options: [{ text: 'Clear-headed and rational', value: 2 }, { text: 'Warm and caring', value: -2 }] },
  { question: 'When giving feedback, you prioritize:', dimension: 'TF', direction: 1, options: [{ text: 'Honesty and directness, even if it hurts', value: 2 }, { text: 'Politeness and ensuring no one is offended', value: -2 }] },
  { question: 'You are more motivated by:', dimension: 'TF', direction: 1, options: [{ text: 'Achieving a goal and being effective', value: 2 }, { text: 'Making a positive impact on people', value: -2 }] },
  { question: 'It is worse to be:', dimension: 'TF', direction: 1, options: [{ text: 'Unfair', value: 2 }, { text: 'Uncaring', value: -2 }] },
  { question: 'You make decisions with your:', dimension: 'TF', direction: 1, options: [{ text: 'Head', value: 2 }, { text: 'Heart', value: -2 }] },
  { question: 'You are more impressed by:', dimension: 'TF', direction: 1, options: [{ text: 'A well-reasoned argument', value: 2 }, { text: 'A touching emotional appeal', value: -2 }] },
  { question: 'When evaluating a situation, you focus on:', dimension: 'TF', direction: 1, options: [{ text: 'The objective facts', value: 2 }, { text: 'The human element', value: -2 }] },
  // JP Dimension (10 questions)
  { question: 'You prefer your life to be:', dimension: 'JP', direction: 1, options: [{ text: 'Organized and planned', value: 2 }, { text: 'Spontaneous and flexible', value: -2 }] },
  { question: 'When starting a new project, you like to:', dimension: 'JP', direction: 1, options: [{ text: 'Create a detailed plan before you start', value: 2 }, { text: 'Jump in and figure it out as you go', value: -2 }] },
  { question: 'You feel more comfortable when:', dimension: 'JP', direction: 1, options: [{ text: 'Decisions are made and things are settled', value: 2 }, { text: 'Your options are open and you can adapt', value: -2 }] },
  { question: 'Your workspace is typically:', dimension: 'JP', direction: 1, options: [{ text: 'Neat and organized', value: 2 }, { text: 'A bit cluttered but you know where everything is', value: -2 }] },
  { question: 'You enjoy tasks that:', dimension: 'JP', direction: 1, options: [{ text: 'Have clear goals and deadlines', value: 2 }, { text: 'Allow for flexibility and last-minute changes', value: -2 }] },
  { question: 'When it comes to deadlines, you:', dimension: 'JP', direction: 1, options: [{ text: 'Prefer to finish work well in advance', value: 2 }, { text: 'Work best under pressure, close to the deadline', value: -2 }] },
  { question: 'You prefer to have:', dimension: 'JP', direction: 1, options: [{ text: 'A predictable daily routine', value: 2 }, { text: 'A variety of new experiences each day', value: -2 }] },
  { question: 'When on vacation, you prefer to:', dimension: 'JP', direction: 1, options: [{ text: 'Have a schedule and stick to it', value: 2 }, { text: 'Go with the flow and see what happens', value: -2 }] },
  { question: 'You like to:', dimension: 'JP', direction: 1, options: [{ text: 'Make lists and check things off', value: 2 }, { text: 'Keep your plans flexible', value: -2 }] },
  { question: 'You feel better after:', dimension: 'JP', direction: 1, options: [{ text: 'Making a decision', value: 2 }, { text: 'Keeping your options open', value: -2 }] },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('Connected to MongoDB');
    console.log('Clearing existing data...');
    
    // Clear existing data
    await MBTIQuestion.deleteMany({}).exec();
    await MBTIType.deleteMany({}).exec();

    console.log('Inserting MBTI types...');
    const insertedTypes = await MBTIType.insertMany(mbtiTypes);
    console.log(`Inserted ${insertedTypes.length} MBTI types`);

    console.log('Inserting questions...');
    const insertedQuestions = await MBTIQuestion.insertMany(mbtiQuestions);
    console.log(`Inserted ${insertedQuestions.length} MBTI questions`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Handle any unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Connect to MongoDB and run the seeder
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

seedDatabase();