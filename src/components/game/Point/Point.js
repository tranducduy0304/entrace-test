import React from 'react';
import './Point.css';

function Point({ number, position, isVisible, onClick }) {
  if (!isVisible) return null;
  
  return (
    <div 
      className="point"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: 'white',
        color: 'black'
      }}
      onClick={onClick}
    >
      {number}
    </div>
  );
}

export default Point;