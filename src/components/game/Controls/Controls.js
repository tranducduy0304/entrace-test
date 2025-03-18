import React from 'react';

function Controls({ 
  isGameStarted, 
  isGameOver, 
  isAutoPlay, 
  nextNumber,
  onStart,
  onRestart,
  onAutoPlayToggle 
}) {
  return (
    <div className="game-controls">
      {!isGameStarted ? (
        <button className="btn-play" onClick={onStart}>
          Play
        </button>
      ) : (
        <>
          <button className="btn-restart" onClick={onRestart}>
            Restart
          </button>
          <button 
            className={`btn-autoplay ${isAutoPlay ? 'active' : ''}`}
            onClick={onAutoPlayToggle}
            disabled={isGameOver}
          >
            Auto Play {isAutoPlay ? 'OFF' : 'ON'}
          </button>
          {!isGameOver && (
            <div className="current-point">
              Current: <span>{nextNumber - 1}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Controls;