import React, { useState } from "react";

const prompts = [
  "Name one thing you’re grateful for today.",
  "What made you smile recently?",
  "Who is someone you appreciate in your life?",
  "What’s a small thing that brought you joy today?",
  "What’s one good memory you cherish?",
];

const feedbackMessages = [
  "Great reflection! 🌸",
  "You’re building a positive habit 💪",
  "That’s wonderful — keep going! ✨",
  "Your gratitude is inspiring 🌈",
  "Every entry makes you stronger 💜",
];

const moods = ["😊", "😌", "😔", "🌈", "❤️"];

const GratitudeJournal = () => {
  const [prompt, setPrompt] = useState(prompts[0]);
  const [entry, setEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const getNewPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
    setEntry("");
    setSelectedMood("");
  };

  const handleSave = () => {
    if (entry.trim() !== "") {
      setSavedEntries([...savedEntries, { prompt, entry, mood: selectedMood }]);
      setEntry("");
      setFeedback(feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]);
      getNewPrompt();
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Gratitude Journal
        </h2>

        <p className="mb-4 font-medium text-gray-700">{prompt}</p>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Write your reflection here..."
        />

        {/* Mood Picker */}
        <div className="flex justify-center gap-2 mb-4">
          {moods.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(m)}
              className={`text-2xl px-2 ${
                selectedMood === m ? "ring-2 ring-purple-500 rounded" : ""
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Save
          </button>
          <button
            onClick={getNewPrompt}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            New Prompt
          </button>
        </div>

        {/* Feedback message */}
        {feedback && <p className="mt-4 text-green-600 font-medium">{feedback}</p>}

        {/* Stats */}
        <p className="mt-4 text-gray-600">
          Total reflections: <span className="font-bold">{savedEntries.length}</span>
        </p>

        {savedEntries.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-purple-600 mb-2">Your Entries:</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {savedEntries.map((e, idx) => (
                <li
                  key={idx}
                  className="bg-purple-50 border rounded-lg p-2 text-sm flex justify-between items-start"
                >
                  <div>
                    <strong>{e.prompt}</strong>
                    <p>{e.entry}</p>
                  </div>
                  <span className="text-xl">{e.mood}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
