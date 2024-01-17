
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
 app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/language_quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    language: String, // The language the user is learning
    proficiency: String, // Beginner, Intermediate, Advanced, etc.
    progress: {
      totalExercises: { type: Number, default: 0 },
      correctAnswers: { type: Number, default: 0 },
    },
  });
  
  const exerciseSchema = new mongoose.Schema({
    language: String,
    question: String,
    options: [String],
    correctAnswer: String,
  });
  
  const User = mongoose.model('User', userSchema);
  const Exercise = mongoose.model('Exercise', exerciseSchema);
  



// User registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });
  
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username: user.username }, 'your-secret-key');
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  
 


// Get exercise questions for a specific language
app.get('/api/exercises', async (req, res) => {
    const { language } = req.query;
    const filter = language ? { language } : {};
  
    try {
      const exercises = await Exercise.find(filter);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch exercises' });
    }
  });
  
  
  // Submit user answer
  app.post('/api/submit-answer', (req, res) => {
    const { exerciseId, userAnswer } = req.body;
  
    // Implement  scoring logic here
  
    // Return the result to the frontend
    res.json({ result: 'correct' }); // Replace with  actual result
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
