import React from 'react';

function PointsInput({ numPoints, onPointsChange }) {
  return (
    <div className="points">
      Points: <input 
        type="number" 
        value={numPoints}
        onChange={onPointsChange}
        min="1"
        max="10000"
        style={{ 
          width: '80px',
          padding: '5px',
          fontSize: '16px'
        }}
      />
    </div>
  );
}

export default PointsInput; 