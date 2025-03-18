import React from 'react';
import Point from '../Point/Point';
import './Board.css';

function Board({ points, onPointClick }) {
  return (
    <div className="board">
      {points.map(point => (
        <Point 
          key={point.id}
          number={point.id}
          position={{ x: point.x, y: point.y }}
          isVisible={point.isVisible}
          onClick={() => onPointClick(point.id)}
        />
      ))}
    </div>
  );
}

export default Board;