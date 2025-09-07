import React, { useState, useEffect } from 'react';
import './gameStyles.css';

const cards = ['🍎','🍌','🍇','🍒','🍉','🍓'];

const MemoryGame = () => {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const doubleCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(doubleCards);
  }, []);

  const handleClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const first = shuffledCards[newFlipped[0]];
      const second = shuffledCards[newFlipped[1]];

      if (first === second) {
        setMatched([...matched, ...newFlipped]);
      }

      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-purple-100 p-8">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Memory Game</h2>
      <div className="grid grid-cols-3 gap-4 max-w-md">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleClick(index)}
          >
            <span>{flipped.includes(index) || matched.includes(index) ? card : '❓'}</span>
          </div>
        ))}
      </div>
      {matched.length === shuffledCards.length && (
        <p className="mt-6 text-green-700 font-semibold text-lg">🎉 You matched all pairs!</p>
      )}
    </div>
  );
};

export default MemoryGame;
