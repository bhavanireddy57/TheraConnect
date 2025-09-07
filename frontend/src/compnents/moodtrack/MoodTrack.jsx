/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../navbar/Navbar";

// Mood emojis
const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

// Playlist map
const suggestionsMap = {
  "😄": {
    playlists: [
      { name: "Happy Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC" },
      { name: "Feel Good Friday", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0" }
    ],
    message: "You're radiating positivity 🌟 Keep spreading the joy!"
  },
  "😊": {
    playlists: [
      { name: "Positive Vibes", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned" },
      { name: "Sunny Day", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75" }
    ],
    message: "Feeling good is contagious 😌 Stay in this moment."
  },
  "😐": {
    playlists: [
      { name: "Chill Tracks", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6" },
      { name: "Relax & Unwind", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUZ5bk6qqDSy" }
    ],
    message: "Neutral days are okay 🤍 Take it slow and breathe."
  },
  "😔": {
    playlists: [
      { name: "Melancholy Moods", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVrtsSlLKzro" },
      { name: "Sad Songs", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1" }
    ],
    message: "It's okay to feel low 💙 Be kind to yourself today."
  },
  "😢": {
    playlists: [
      { name: "Tearjerkers", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR" },
      { name: "Emotional Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7gIoKXt0gmx" }
    ],
    message: "Crying can be healing 💧 Let your feelings flow."
  }
};

// Random motivational quotes
const quotes = [
  "Every day may not be good… but there’s something good in every day.",
  "Your present circumstances don’t determine where you can go; they merely determine where you start.",
  "This too shall pass. 🌈",
  "Breathe. Relax. Trust yourself.",
  "You are stronger than you think."
];

const MoodTrack = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [quote, setQuote] = useState("");

  const username = localStorage.getItem("tokenUser");

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:5001/api/moods/${username}`)
      .then((res) => setMoodData(res.data || []))
      .catch((err) => console.error("Error fetching mood data:", err));
  }, [username]);

  const openMoodModal = (event) => {
    setSelectedDate(event.target.value);
    setIsModalOpen(true);
  };

  const handleMoodSelect = async (mood) => {
    setSuggestions(suggestionsMap[mood]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    try {
      await axios.post(`http://localhost:5001/api/moods/${username}`, {
        date: selectedDate,
        mood,
      });

      // Refresh moods
      const res = await axios.get(`http://localhost:5001/api/moods/${username}`);
      setMoodData(res.data || []);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving mood:", err);
    }
  };

  const latestMood = moodData.length > 0 ? moodData[moodData.length - 1] : null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-20 space-y-8 max-w-4xl">
        
        { }
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Track Your Mood
          </h2>
          <input
            type="date"
            value={selectedDate}
            onChange={openMoodModal}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {}
        <Transition appear show={isModalOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 text-center">
                    How are you feeling today?
                  </Dialog.Title>
                  <div className="mt-6 flex justify-around text-5xl">
                    {moodOptions.map((emoji, idx) => (
                      <button
                        key={idx}
                        className="transition transform hover:scale-125"
                        onClick={() => handleMoodSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>

        {}
        {latestMood && suggestions && (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Latest Mood</h3>
            <div className="text-5xl my-2">{latestMood.mood}</div>
            <p className="text-gray-500">{new Date(latestMood.date).toLocaleDateString()}</p>
            <p className="mt-3 text-purple-600 italic">{suggestions.message}</p>
          </div>
        )}

        {}
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Mood Timeline</h2>
          <div className="flex space-x-6">
            {moodData.map((entry, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl">{entry.mood}</span>
                <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {}
        {suggestions && suggestions.playlists && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Playlists for Your Mood 🎶
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.playlists.map((playlist, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg shadow p-2">
                  <iframe
                    src={playlist.link}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-lg"
                    title={playlist.name}
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">{playlist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {quote && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md p-6 text-center">
            <p className="text-lg italic text-gray-700">"{quote}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MoodTrack;*/



/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../navbar/Navbar";

// Mood emojis
const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

// Playlist map
const suggestionsMap = {
  "😄": {
    playlists: [
      { name: "Happy Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC" },
      { name: "Feel Good Friday", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0" }
    ],
    message: "You're radiating positivity 🌟 Keep spreading the joy!"
  },
  "😊": {
    playlists: [
      { name: "Positive Vibes", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned" },
      { name: "Sunny Day", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75" }
    ],
    message: "Feeling good is contagious 😌 Stay in this moment."
  },
  "😐": {
    playlists: [
      { name: "Chill Tracks", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6" },
      { name: "Relax & Unwind", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUZ5bk6qqDSy" }
    ],
    message: "Neutral days are okay 🤍 Take it slow and breathe."
  },
  "😔": {
    playlists: [
      { name: "Melancholy Moods", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVrtsSlLKzro" },
      { name: "Sad Songs", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1" }
    ],
    message: "It's okay to feel low 💙 Be kind to yourself today."
  },
  "😢": {
    playlists: [
      { name: "Tearjerkers", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR" },
      { name: "Emotional Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7gIoKXt0gmx" }
    ],
    message: "Crying can be healing 💧 Let your feelings flow."
  }
};

// Random motivational quotes
const quotes = [
  "Every day may not be good… but there’s something good in every day.",
  "Your present circumstances don’t determine where you can go; they merely determine where you start.",
  "This too shall pass. 🌈",
  "Breathe. Relax. Trust yourself.",
  "You are stronger than you think."
];

const MoodTrack = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [quote, setQuote] = useState("");

  const username = localStorage.getItem("tokenUser");

  // Pick a random quote on load
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:5001/api/moods/${username}`)
      .then((res) => setMoodData(res.data || []))
      .catch((err) => console.error("Error fetching mood data:", err));
  }, [username]);

  const openMoodModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleMoodSelect = async (mood) => {
    setSuggestions(suggestionsMap[mood]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    try {
      await axios.post(`http://localhost:5001/api/moods/${username}`, {
        date: selectedDate,
        mood,
      });

      // Refresh moods
      const res = await axios.get(`http://localhost:5001/api/moods/${username}`);
      setMoodData(res.data || []);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving mood:", err);
    }
  };

  const latestMood = moodData.length > 0 ? moodData[moodData.length - 1] : null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-20 space-y-8 max-w-4xl">
        
       
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-md p-6 text-center">
          <p className="text-lg italic text-gray-700">"{quote}"</p>
        </div>

    
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg p-6 text-center space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Track Your Mood</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => openMoodModal(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={() => openMoodModal(new Date().toISOString().split("T")[0])}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Log Today’s Mood ✨
          </button>
        </div>

        
        <Transition appear show={isModalOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 text-center">
                    How are you feeling today?
                  </Dialog.Title>
                  <div className="mt-6 flex justify-around text-5xl">
                    {moodOptions.map((emoji, idx) => (
                      <button
                        key={idx}
                        className="transition transform hover:scale-125"
                        onClick={() => handleMoodSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>

      
        {latestMood && suggestions && (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Latest Mood</h3>
            <div className="text-5xl my-2">{latestMood.mood}</div>
            <p className="text-gray-500">{new Date(latestMood.date).toLocaleDateString()}</p>
            <p className="mt-3 text-purple-600 italic">{suggestions.message}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Mood Timeline</h2>
          <div className="flex space-x-6">
            {moodData.map((entry, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl">{entry.mood}</span>
                <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

      
        {suggestions && suggestions.playlists && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Playlists for Your Mood 🎶
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.playlists.map((playlist, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg shadow p-2">
                  <iframe
                    src={playlist.link}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-lg"
                    title={playlist.name}
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">{playlist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoodTrack;*/



import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../navbar/Navbar";

const moodOptions = ["😄", "😊", "😐", "😔", "😢"];

const suggestionsMap = {
  "😄": {
    playlists: [
      { name: "Happy Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC" },
      { name: "Feel Good Friday", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0" }
    ],
    message: "You're radiating positivity 🌟 Keep spreading the joy!"
  },
  "😊": {
    playlists: [
      { name: "Positive Vibes", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned" },
      { name: "Sunny Day", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7KNKjOK0o75" }
    ],
    message: "Feeling good is contagious 😌 Stay in this moment."
  },
  "😐": {
    playlists: [
      { name: "Chill Tracks", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6" },
      { name: "Relax & Unwind", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWUZ5bk6qqDSy" }
    ],
    message: "Neutral days are okay 🤍 Take it slow and breathe."
  },
  "😔": {
    playlists: [
      { name: "Melancholy Moods", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVrtsSlLKzro" },
      { name: "Sad Songs", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1" }
    ],
    message: "It's okay to feel low 💙 Be kind to yourself today."
  },
  "😢": {
    playlists: [
      { name: "Tearjerkers", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DWVV27DiNWxkR" },
      { name: "Emotional Hits", link: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7gIoKXt0gmx" }
    ],
    message: "Crying can be healing 💧 Let your feelings flow."
  }
};

const quotes = [
  "Every day may not be good… but there’s something good in every day.",
  "Your present circumstances don’t determine where you can go; they merely determine where you start.",
  "This too shall pass. 🌈",
  "Breathe. Relax. Trust yourself.",
  "You are stronger than you think."
];

const MoodTrack = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [quote, setQuote] = useState("");

  const username = localStorage.getItem("tokenUser");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/moods/${username}`)
      .then((res) => setMoodData(res.data || []))
      .catch((err) => console.error("Error fetching mood data:", err));
  }, [username]);

  const openMoodModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleMoodSelect = async (mood) => {
    setSuggestions(suggestionsMap[mood]);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/moods/${username}`, {
        date: selectedDate,
        mood,
      });
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/moods/${username}`);
      setMoodData(res.data || []);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving mood:", err);
    }
  };

  const latestMood = moodData.length > 0 ? moodData[moodData.length - 1] : null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20 space-y-8 max-w-5xl">
        
        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-md p-6 text-center border">
          <p className="text-lg italic text-gray-700">"{quote}"</p>
        </div>

        {/* Mood Logging */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md p-6 text-center border space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">🌤️ Track Your Mood</h2>
          <p className="text-gray-600">Select a date or quickly log today’s mood</p>
          <div className="flex gap-4 justify-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => openMoodModal(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={() => openMoodModal(new Date().toISOString().split("T")[0])}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            >
              Log Today ✨
            </button>
          </div>
        </div>

        {/* Mood Modal */}
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4">
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 text-center">
                    How are you feeling today?
                  </Dialog.Title>
                  <div className="mt-6 flex justify-around text-5xl">
                    {moodOptions.map((emoji, idx) => (
                      <button
                        key={idx}
                        className="transition transform hover:scale-125"
                        onClick={() => handleMoodSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Latest Mood */}
        {latestMood && suggestions && (
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border">
            <h3 className="text-xl font-semibold text-gray-700">✨ Latest Mood</h3>
            <div className="text-6xl my-3">{latestMood.mood}</div>
            <p className="text-gray-500">{new Date(latestMood.date).toLocaleDateString()}</p>
            <p className="mt-3 text-purple-600 italic">{suggestions.message}</p>
          </div>
        )}

        
        {/* Spotify Playlists */}
        {suggestions && suggestions.playlists && (
          <div className="bg-white rounded-2xl shadow-md p-6 border space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">🎶 Playlists for Your Mood</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.playlists.map((playlist, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl shadow p-2">
                  <iframe
                    src={playlist.link}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-lg"
                    title={playlist.name}
                  />
                  <p className="text-sm text-gray-600 mt-2 text-center">{playlist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoodTrack;

