/*import React from 'react';

const Answer = ({ index, value, checked, handleChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        name={`question-${index}`}
        value={value}
        checked={checked}
        onChange={() => handleChange(index, value)}
        className="mr-2"
      />
      {value}
    </label>
  );
};

export default Answer;*/


import React from 'react';

const Answer = ({ value, checked, handleChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => handleChange(value)}
        className="mr-2 accent-blue-500"
      />
      {value}
    </label>
  );
};

export default Answer;
