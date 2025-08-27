/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some(a => a.answer === '')) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ summary: "Error analyzing answers", areas: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-24 bg-gray-100 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Mental Health Quiz</h1>

        {questionsData.map((q, index) => (
          <Question
            key={q.id}
            question={q.question}
            options={options}
            selected={answers[index].answer}
            onSelect={(value) => handleChange(index, value)}
          />
        ))}

        <div className="flex justify-center mt-6">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-full">
            Submit
          </button>
        </div>

        {loading && <Loader type="spinner-cub" bgColor="#000" color="#fff" size={100} />}

        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analysis Summary</h2>
            <p className="whitespace-pre-wrap mb-4">{result.summary}</p>

            {result.areas?.length > 0 && result.areas.map((area, idx) => (
              <div key={idx} className="mb-4 p-3 border rounded">
                <h3 className="font-bold text-lg">{area.name} - {area.severity}</h3>
                <ul className="list-disc list-inside">
                  {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;*/



/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const answeredCount = answers.filter(a => a.answer !== '').length;

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setError("");
    if (answers.some(a => a.answer === '')) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ summary: "We couldn’t analyze your answers right now. Here are some general tips:", areas: [] });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
  };

  const YouTubeEmbed = ({ url }) => {
    // Accept either watch?v= or youtu.be formats
    let embed = url;
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    }
    return (
      <iframe
        title={url}
        src={embed}
        width="100%"
        height="200"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-24 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Progress: {answeredCount}/{questionsData.length}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {!result && (
          <>
            {questionsData.map((q, index) => (
              <Question
                key={q.id}
                question={q.question}
                options={options}
                selected={answers[index].answer}
                onSelect={(value) => handleChange(index, value)}
              />
            ))}

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={resetQuiz}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
                disabled={loading}
              >
                Reset
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`py-2 px-6 rounded-full text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {loading ? 'Analyzing…' : 'Submit'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#000" color="#fff" size={100} />
              </div>
            )}
          </>
        )}

        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-4 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{area.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {area.severity}
                    </span>
                  </div>

                  {Array.isArray(area.suggestions) && area.suggestions.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-1">Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-3 text-gray-700">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && area.videos.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => (
                          <YouTubeEmbed key={i} url={v} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself and check in again later 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;*/



/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const answeredCount = answers.filter(a => a.answer !== '').length;

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setError("");
    if (answers.some(a => a.answer === '')) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ summary: "We couldn’t analyze your answers right now. Here are some general tips:", areas: [] });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
  };

  const YouTubeEmbed = ({ url }) => {
    // Accept either watch?v= or youtu.be formats
    let embed = url;
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    }
    return (
      <iframe
        title={url}
        src={embed}
        width="100%"
        height="200"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-24 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Progress: {answeredCount}/{questionsData.length}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {!result && (
          <>
            {questionsData.map((q, index) => (
              <Question
                key={q.id}
                question={q.question}
                options={options}
                selected={answers[index].answer}
                onSelect={(value) => handleChange(index, value)}
              />
            ))}

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={resetQuiz}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
                disabled={loading}
              >
                Reset
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`py-2 px-6 rounded-full text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {loading ? 'Analyzing…' : 'Submit'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#000" color="#fff" size={100} />
              </div>
            )}
          </>
        )}

        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-4 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{area.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {area.severity}
                    </span>
                  </div>

                  {Array.isArray(area.suggestions) && area.suggestions.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-1">Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-3 text-gray-700">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && area.videos.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => (
                          <YouTubeEmbed key={i} url={v} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself and check in again later 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;*/




/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const answeredCount = answers.filter(a => a.answer !== '').length;

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setError("");
    if (answers.some(a => a.answer === '')) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Enhanced fallback with tips + videos
      setResult({
        summary: "We couldn’t analyze your answers right now. Here are some general tips:",
        areas: [
          {
            name: "General",
            severity: "Low",
            suggestions: [
              "Take short breaks during the day.",
              "Practice a simple breathing exercise.",
              "Stay hydrated and move around a bit.",
            ],
            videos: [
              "https://www.youtube.com/watch?v=ZToicYcHIOU",
              "https://www.youtube.com/watch?v=inpok4MKVLM"
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
  };

  const YouTubeEmbed = ({ url }) => {
    let embed = url;
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    } else if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      embed = `https://www.youtube.com/embed/${id}`;
    }
    return (
      <iframe
        title={url}
        src={embed}
        width="100%"
        height="200"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-24 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Progress: {answeredCount}/{questionsData.length}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {!result && (
          <>
            {questionsData.map((q, index) => (
              <Question
                key={q.id}
                question={q.question}
                options={options}
                selected={answers[index].answer}
                onSelect={(value) => handleChange(index, value)}
              />
            ))}

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={resetQuiz}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white"
                disabled={loading}
              >
                Reset
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`py-2 px-6 rounded-full text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {loading ? 'Analyzing…' : 'Submit'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#000" color="#fff" size={100} />
              </div>
            )}
          </>
        )}

        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-4 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{area.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {area.severity}
                    </span>
                  </div>

                  {Array.isArray(area.suggestions) && area.suggestions.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-1">Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-3 text-gray-700">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && area.videos.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => (
                          <YouTubeEmbed key={i} url={v} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself and check in again later 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;*/



/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const answeredCount = answers.filter(a => a.answer !== '').length;

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setError("");
    if (answers.some(a => a.answer === '')) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        summary: "We couldn’t analyze your answers right now. Here are some general tips:",
        areas: [
          {
            name: "General",
            severity: "Low",
            suggestions: [
              "Take short breaks during the day.",
              "Practice a simple breathing exercise.",
              "Stay hydrated and move around a bit.",
            ],
            videos: [
              "https://www.youtube.com/watch?v=ZToicYcHIOU",
              "https://www.youtube.com/watch?v=inpok4MKVLM"
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
  };

  const YouTubeEmbed = ({ url }) => {
    let embed = url.includes("watch?v=")
      ? `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`
      : url.includes("youtu.be/")
      ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`
      : url;
    return <iframe title={url} src={embed} width="100%" height="200" frameBorder="0" allowFullScreen className="rounded-lg" />;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-24 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Progress: {answeredCount}/{questionsData.length}
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-200">{error}</div>}

        {!result && (
          <>
            {questionsData.map((q, index) => (
              <Question
                key={q.id}
                question={q.question}
                options={options}
                selected={answers[index].answer}
                onSelect={(value) => handleChange(index, value)}
              />
            ))}

            <div className="flex items-center justify-between mt-6">
              <button onClick={resetQuiz} className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-white" disabled={loading}>Reset</button>
              <button onClick={handleSubmit} disabled={loading} className={`py-2 px-6 rounded-full text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}>
                {loading ? 'Analyzing…' : 'Submit'}
              </button>
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#000" color="#fff" size={100} />
              </div>
            )}
          </>
        )}

        {result && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-4 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{area.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{area.severity}</span>
                  </div>

                  {area.friendlyAdvice && (
                    <p className="mb-2 text-gray-800"><strong>Advice from AI:</strong> {area.friendlyAdvice}</p>
                  )}

                  {Array.isArray(area.suggestions) && area.suggestions.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-1">Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-3 text-gray-700">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && area.videos.length > 0 && (
                    <>
                      <h4 className="font-semibold mb-2">Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => <YouTubeEmbed key={i} url={v} />)}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself and check in again later 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;*/


/*import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion].answer = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion].answer) {
      setError("⚠️ Please select an option before proceeding.");
      return;
    }
    setError("");
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = async () => {
    if (answers.some(a => a.answer === '')) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/quiz/analyze-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        summary: "We couldn’t analyze your answers right now. Here are some general tips:",
        areas: [
          {
            name: "General",
            severity: "Low",
            suggestions: [
              "Take short breaks during the day.",
              "Practice a simple breathing exercise.",
              "Stay hydrated and move around a bit.",
            ],
            videos: [
              "https://www.youtube.com/watch?v=ZToicYcHIOU",
              "https://www.youtube.com/watch?v=inpok4MKVLM"
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
    setCurrentQuestion(0);
  };

  const YouTubeEmbed = ({ url }) => {
    let embed = url.includes("watch?v=")
      ? `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`
      : url.includes("youtu.be/")
      ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`
      : url;
    return <iframe title={url} src={embed} width="100%" height="200" frameBorder="0" allowFullScreen className="rounded-lg shadow-md" />;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10 mt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg">
        
       
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-blue-700">🧠 Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} / {questionsData.length}
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">{error}</div>}

       
        {!result && (
          <>
            <Question
              question={questionsData[currentQuestion].question}
              options={options}
              selected={answers[currentQuestion].answer}
              onSelect={handleChange}
            />

            <div className="flex justify-between mt-6">
              <button 
                onClick={handlePrev} 
                disabled={currentQuestion === 0}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuestion === questionsData.length - 1 ? (
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className={`py-2 px-6 rounded-full text-white shadow-md ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {loading ? 'Analyzing…' : 'Submit'}
                </button>
              ) : (
                <button 
                  onClick={handleNext} 
                  className="py-2 px-6 rounded-full text-white shadow-md bg-blue-500 hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#3b82f6" color="#3b82f6" size={80} />
              </div>
            )}
          </>
        )}

        
        {result && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-800">📊 Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-6 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-5 border rounded-lg bg-blue-50 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-blue-800">{area.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{area.severity}</span>
                  </div>

                  {Array.isArray(area.suggestions) && (
                    <>
                      <h4 className="font-semibold mb-2">✅ Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && (
                    <>
                      <h4 className="font-semibold mb-3">🎥 Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => <YouTubeEmbed key={i} url={v} />)}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};





export default Quiz;*/




import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Question from './Question';
import Loader from 'react-js-loader';

const questionsData = [
  { id: 0, question: "How often have you felt down, depressed, or hopeless in the past two weeks?" },
  { id: 1, question: "How often do you feel little interest or pleasure in doing things?" },
  { id: 2, question: "How often do you feel nervous, anxious, or on edge?" },
  { id: 3, question: "How often do you have trouble relaxing?" },
  { id: 4, question: "How often do you feel so restless that it is hard to sit still?" },
  { id: 5, question: "How often do you feel fatigued or have little energy?" },
  { id: 6, question: "How often do you feel bad about yourself, or that you are a failure or have let yourself or your family down?" },
  { id: 7, question: "How often do you have trouble concentrating on things, such as reading the newspaper or watching television?" },
  { id: 8, question: "How often do you feel afraid, as if something awful might happen?" },
  { id: 9, question: "How often do you have trouble falling or staying asleep, or sleeping too much?" },
  { id: 10, question: "How often do you feel easily annoyed or irritable?" },
  { id: 11, question: "How often do you experience physical symptoms such as headaches, stomachaches, or muscle pain?" },
  { id: 12, question: "How often do you feel disconnected or detached from reality or your surroundings?" },
  { id: 13, question: "How often do you find it difficult to control your worry?" },
  { id: 14, question: "How often do you avoid social situations due to fear of being judged or embarrassed?" },
];

const options = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

const Quiz = () => {
  const [answers, setAnswers] = useState(questionsData.map(q => ({ questionId: q.id, answer: '' })));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion].answer = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion].answer) {
      setError("⚠️ Please select an option before proceeding.");
      return;
    }
    setError("");
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = async () => {
    if (answers.some(a => a.answer === '')) {
      setError("⚠️ Please answer all questions before submitting.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/analyze-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers.map(a => ({
            question: questionsData[a.questionId].question,
            answer: a.answer
          }))
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        summary: "We couldn’t analyze your answers right now. Here are some general tips:",
        areas: [
          {
            name: "General",
            severity: "Low",
            suggestions: [
              "Take short breaks during the day.",
              "Practice a simple breathing exercise.",
              "Stay hydrated and move around a bit.",
            ],
            videos: [
              "https://www.youtube.com/watch?v=ZToicYcHIOU",
              "https://www.youtube.com/watch?v=inpok4MKVLM"
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers(questionsData.map(q => ({ questionId: q.id, answer: '' })));
    setResult(null);
    setError("");
    setCurrentQuestion(0);
  };

  const YouTubeEmbed = ({ url }) => {
    let embed = url.includes("watch?v=")
      ? `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`
      : url.includes("youtu.be/")
      ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`
      : url;
    return <iframe title={url} src={embed} width="100%" height="200" frameBorder="0" allowFullScreen className="rounded-lg shadow-md" />;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10 mt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-blue-700">🧠 Mental Health Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} / {questionsData.length}
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">{error}</div>}

        {/* Questions (Step by Step) */}
        {!result && (
          <>
            <Question
              question={questionsData[currentQuestion].question}
              options={options}
              selected={answers[currentQuestion].answer}
              onSelect={handleChange}
            />

            <div className="flex justify-between mt-6">
              <button 
                onClick={handlePrev} 
                disabled={currentQuestion === 0}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuestion === questionsData.length - 1 ? (
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className={`py-2 px-6 rounded-full text-white shadow-md ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {loading ? 'Analyzing…' : 'Submit'}
                </button>
              ) : (
                <button 
                  onClick={handleNext} 
                  className="py-2 px-6 rounded-full text-white shadow-md bg-blue-500 hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loader type="spinner-cub" bgColor="#3b82f6" color="#3b82f6" size={80} />
              </div>
            )}
          </>
        )}

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-800">📊 Analysis Summary</h2>
              <button onClick={resetQuiz} className="text-sm text-blue-600 hover:underline">Retake</button>
            </div>
            <p className="whitespace-pre-wrap mb-6 text-gray-700">{result.summary}</p>

            {result.areas?.length > 0 ? (
              result.areas.map((area, idx) => (
                <div key={idx} className="mb-6 p-5 border rounded-lg bg-blue-50 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-blue-800">{area.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{area.severity}</span>
                  </div>

                  {/* Gemini’s advice */}
                  {area.friendlyAdvice && (
                    <p className="mb-3 italic text-gray-700">💡 {area.friendlyAdvice}</p>
                  )}

                  {Array.isArray(area.suggestions) && (
                    <>
                      <h4 className="font-semibold mb-2">✅ Helpful Steps</h4>
                      <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
                        {area.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </>
                  )}

                  {Array.isArray(area.videos) && (
                    <>
                      <h4 className="font-semibold mb-3">🎥 Motivational / Skills Videos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {area.videos.map((v, i) => <YouTubeEmbed key={i} url={v} />)}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No specific areas detected. Keep taking care of yourself 💙</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;


