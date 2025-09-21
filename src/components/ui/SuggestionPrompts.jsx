// src/components/ui/SuggestionPrompts.jsx
import React from 'react';

const SuggestionPrompts = ({ prompts, onPromptClick }) => {
  if (!prompts || prompts.length === 0) {
    return null;
  }

  return (
    // Grid layout for prompt buttons
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          className="rounded-lg border border-gray-300 bg-white p-3 text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
          // Call the passed handler when a prompt is clicked
          onClick={() => onPromptClick && onPromptClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default SuggestionPrompts;