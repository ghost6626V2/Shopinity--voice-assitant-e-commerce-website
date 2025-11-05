import React from 'react';

function Title({ text1, text2 }) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
        {text1} <span className="text-black-500">{text2}</span>
      </h2>
      <div className="w-16 h-1 bg-black-500 rounded mt-2" />
    </div>
  );
}

export default Title;
