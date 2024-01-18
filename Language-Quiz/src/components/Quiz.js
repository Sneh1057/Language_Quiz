

import React, { useState, useEffect } from 'react';
import Question from './Question';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState(''); // Add language state
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises based on the selected language
    //  implement an API call to my backend here
    const fetchExercises = async () => {
      
      const response = await fetch(`http://localhost:8000/api/exercises?language=${language}`);
      const data = await response.json();
      setExercises(data);
    };

    fetchExercises();
  }, [language]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    
  };

  return (
    <div>
      <h1>Language Learning Quiz</h1>
      {/* Add language selection dropdown */}
      <div>
        <label htmlFor="language">Select Language: </label>
        <select
          id="language"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="">Choose a language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          {/* Add more languages based on your available exercises */}
        </select>
      </div>

      {/* Display exercises based on the selected language */}
      {exercises.map((exercise) => (
        <Question
          key={exercise._id}
          question={exercise.question}
          options={exercise.options}
          correctAnswer={exercise.correctAnswer}
          onAnswer={handleAnswer}
        />
      ))}

      <div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default Quiz;
