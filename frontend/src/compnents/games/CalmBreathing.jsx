import React, { useState, useEffect } from "react";

const CalmBreathing = () => {
  const [phase, setPhase] = useState("Inhale");
  const [size, setSize] = useState(100);

  useEffect(() => {
    const sequence = ["Inhale", "Hold", "Exhale", "Hold"];
    let i = 0;
    const interval = setInterval(() => {
      setPhase(sequence[i % sequence.length]);
      if (sequence[i % sequence.length] === "Inhale") setSize(280);
      if (sequence[i % sequence.length] === "Exhale") setSize(120);
      i++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-purple-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Calm Breathing Exercise
        </h2>
        <p className="text-lg font-medium mb-6 text-gray-700">{phase}</p>

        {/* Breathing Circle */}
        <div className="flex justify-center mb-6">
          <div
            className="rounded-full bg-blue-400 transition-all duration-[4000ms] ease-in-out"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          ></div>
        </div>

        <p className="mt-4 text-gray-600">
          Follow the circle and breathe slowly.
        </p>
      </div>
    </div>
  );
};

export default CalmBreathing;
