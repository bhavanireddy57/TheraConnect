/*import React from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  const gamesList = [
    { name: 'Memory Game', path: '/games/memory' },
    { name: 'Color Match', path: '/games/color' },
    { name: 'Calm Breathing', path: '/games/calm' },
     { name: 'GratitudeJournal', path: '/games/gratitude' },
    // Add more games here
  ];

  return (
    <div className="bg-purple-50 min-h-screen">
      <div className="container mx-auto pt-24 pb-12">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Mindful Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {gamesList.map((game) => (
            <Link
              key={game.name}
              to={game.path}
              className="bg-white shadow rounded-2xl p-6 text-center hover:bg-purple-100 transition"
            >
              <h3 className="text-xl font-semibold text-purple-700">{game.name}</h3>
              <p className="mt-2 text-gray-600">Play a calming and fun activity</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;*/



import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Palette, Wind, Notebook } from 'lucide-react'; // nice icons

const Games = () => {
  const gamesList = [
    { name: 'Memory Game', path: '/games/memory', icon: <Brain className="w-8 h-8 text-purple-500" /> },
    { name: 'Color Match', path: '/games/color', icon: <Palette className="w-8 h-8 text-blue-500" /> },
    { name: 'Calm Breathing', path: '/games/calm', icon: <Wind className="w-8 h-8 text-teal-500" /> },
    { name: 'Gratitude Journal', path: '/games/gratitude', icon: <Notebook className="w-8 h-8 text-pink-500" /> },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-100 via-white to-blue-100 min-h-screen">
      <div className="container mx-auto pt-24 pb-16">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          🌿 Mindful Games
        </h2>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {gamesList.map((game) => (
            <Link
              key={game.name}
              to={game.path}
              className="group bg-white/70 backdrop-blur-md shadow-md rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-white/30 transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 transform group-hover:rotate-6 transition">
                {game.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600">
                {game.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Play a calming and fun activity
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;

