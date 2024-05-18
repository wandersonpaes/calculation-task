import React from 'react';

interface BarProps {
  onNewCalculation: () => void;
  onClearHistory: () => void;
  isButtonDisabled: boolean;
}

function Bar({ onNewCalculation, onClearHistory, isButtonDisabled }: BarProps) {
  return (
    <div className="flex justify-center py-4">
      <button
        type="button"
        onClick={onNewCalculation}
        disabled={isButtonDisabled}
        className="px-4 py-2 mx-2 bg-green-500 text-white rounded"
      >
        New Calculation
      </button>
      <button
        type="button"
        onClick={onClearHistory}
        className="px-4 py-2 mx-2 bg-gray-500 text-white rounded"
      >
        Clear History
      </button>
    </div>
  );
}

export default Bar;
