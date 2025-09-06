/*import React, { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatch = () => {
  const [colorWord, setColorWord] = useState("");
  const [buttonColors, setButtonColors] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const newWord = getRandomColor();
    setColorWord(newWord);
    setButtonColors(shuffleArray([...colors]));
  };

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleClick = (color) => {
    if (color === colorWord) {
      setScore(score + 1);
      generateRound();
    } else {
      alert(`Wrong! Final score: ${score}`);
      setScore(0);
      generateRound();
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Color Match Game
        </h2>
        <p className="text-lg mb-6">
          Click the button matching the color word:{" "}
          <span className="font-bold">{colorWord.toUpperCase()}</span>
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {buttonColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(color)}
              className="py-2 px-4 rounded-lg font-bold text-white shadow-md hover:scale-105 transition"
              style={{ backgroundColor: color }}
            >
              {color}
            </button>
          ))}
        </div>
        <p className="mt-4 font-semibold text-gray-700">Score: {score}</p>
      </div>
    </div>
  );
};

export default ColorMatch;*/



import React, { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatch = () => {
  const [colorWord, setColorWord] = useState("");
  const [buttonColors, setButtonColors] = useState([]);
  const [score, setScore] = useState(0);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const generateNewRound = () => {
    const newWord = getRandomColor();
    setColorWord(newWord);
    setButtonColors(shuffleArray([...colors]));
  };

  // Generate the first round on component mount
  useEffect(() => {
    generateNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (color) => {
    if (color === colorWord) {
      setScore((prev) => prev + 1);
    } else {
      alert(`Wrong! Final score: ${score}`);
      setScore(0);
    }
    generateNewRound();
  };

  return (
    <div className="bg-purple-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Color Match Game
        </h2>
        <p className="text-lg mb-6">
          Click the button matching the color word:{" "}
          <span className="font-bold">{colorWord.toUpperCase()}</span>
        </p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {buttonColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(color)}
              className="py-2 px-4 rounded-lg font-bold text-white shadow-md hover:scale-105 transition"
              style={{ backgroundColor: color }}
            >
              {color}
            </button>
          ))}
        </div>
        <p className="mt-4 font-semibold text-gray-700">Score: {score}</p>
      </div>
    </div>
  );
};

export default ColorMatch;
