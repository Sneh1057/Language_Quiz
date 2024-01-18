// src/components/Question.js
import React, { useState } from 'react';

const Question = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionClick = (option) => {
    
    setSelectedAnswer(option);
    // Provide feedback to the user (e.g., highlight selected answer).
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === correctAnswer;
    console.log(isCorrect);
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            style={{ cursor: 'pointer' }}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default Question;
