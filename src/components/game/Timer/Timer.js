import React from 'react';

function Timer({ time }) {
  return (
    <div className="timer">
      Time: {time.toFixed(1)}s
    </div>
  );
}

export default Timer;