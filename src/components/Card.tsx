import React from 'react';

interface CardProps {
  operation: string;
  left: number;
  right: number;
  result: number;
  message: string;
}

function Card({
  operation, left, right, result, message,
}: CardProps) {
  return (
    <div className="card bg-white border border-gray-300 shadow-sm rounded-lg p-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="font-bold">Returned Data:</div>
        <div>{`${operation}: ${left} and ${right}`}</div>
        <div className="font-bold">Calculation Result:</div>
        <div>{result}</div>
        <div className="font-bold">Result Check:</div>
        <div>{message}</div>
      </div>
    </div>

  );
}

export default Card;
