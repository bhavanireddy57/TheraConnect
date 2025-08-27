/*import React from 'react';

const Question = ({ question }) => {
  return (
    <p className="mb-2 text-lg">{question}</p>
  );
};

export default Question;*/



/*import React from 'react';
import Answer from './Answer';

const Question = ({ question, options, selected, onSelect, questionId }) => {
  return (
    <div className="mb-6">
      <p className="mb-2 text-lg font-bold">{question}</p>
      <div className="flex flex-col space-y-2">
        {options.map((option, idx) => (
          <Answer
            key={idx}
            index={questionId}
            value={option}
            checked={selected === option}
            handleChange={(value) => onSelect(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;*/


import React from 'react';
import Answer from './Answer';

const Question = ({ question, options, selected, onSelect }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <p className="mb-3 font-medium">{question}</p>
      <div className="flex flex-col space-y-2">
        {options.map((opt, idx) => (
          <Answer
            key={idx}
            value={opt}
            checked={selected === opt}
            handleChange={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
