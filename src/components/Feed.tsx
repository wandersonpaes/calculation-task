import React from 'react';
import Card from './Card';

interface Calculation {
  id: string;
  operation: string;
  left: number;
  right: number;
  result: number;
  message: string;
  status: string;
}

interface FeedProps {
  calculations: Calculation[];
}

function Feed({ calculations }: FeedProps) {
  return (
    <div className="feed">
      {calculations.map((calculation) => (
        <Card key={calculation.id} {...calculation} />
      ))}
    </div>
  );
}

export default Feed;
