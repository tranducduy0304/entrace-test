import React from 'react';

function GameHeader({ isGameOver, nextNumber, numPoints }) {
  return (
    <h1 style={{ 
      color: isGameOver ? 
        (nextNumber > numPoints ? '#4CAF50' : 'red') : 
        'black' 
    }}>
      {isGameOver ? 
        (nextNumber > numPoints ? "ALL CLEARED" : "GAME OVER") : 
        "LET'S PLAY"}
    </h1>
  );
}

export default GameHeader;