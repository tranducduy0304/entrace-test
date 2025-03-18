import React, { useState, useEffect, useCallback } from 'react';
import Board from './game/Board/Board';
import Controls from './game/Controls/Controls';
import Timer from './game/Timer/Timer';
import PointsInput from './game/PointsInput/PointsInput';
import GameHeader from './game/GameHeader/GameHeader';
import './Game.css';

function Game() {
  const [numPoints, setNumPoints] = useState(5);
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const generateInitialPoints = useCallback((count) => {
    const boardSize = 450;
    const pointSize = 30;
    const newPoints = [];
    
    for (let i = 1; i <= count; i++) {
      newPoints.push({
        id: i,
        x: Math.floor(Math.random() * (boardSize - pointSize)),
        y: Math.floor(Math.random() * (boardSize - pointSize)),
        isVisible: true
      });
    }

    return newPoints;
  }, []);

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 10000) {
      setNumPoints(value);
      if (isGameStarted) {
        requestAnimationFrame(() => {
          setPoints(generateInitialPoints(value));
          setNextNumber(1);
          setIsGameOver(false);
          setIsAutoPlay(false);
        });
      }
    }
  };

  useEffect(() => {
    let timer;
    if (!isGameOver) {
      timer = setInterval(() => {
        setTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handlePointClick = useCallback((pointId) => {
    if (pointId === nextNumber) {
      setPoints(prev => prev.map(point => 
        point.id === pointId ? {...point, isVisible: false} : point
      ));
      setNextNumber(prev => prev + 1);
      
      if (pointId === numPoints) {
        setIsGameOver(true);
      }
    } else {
      setIsGameOver(true);
      document.querySelector('h1').textContent = "GAME OVER";
      document.querySelector('h1').style.color = 'red';
    }
  }, [nextNumber, numPoints]);

  useEffect(() => {
    let autoPlayInterval;
    
    if (isAutoPlay && !isGameOver) {
      autoPlayInterval = setInterval(() => {
        const nextPoint = points.find(point => point.id === nextNumber && point.isVisible);
        
        if (nextPoint) {
          handlePointClick(nextPoint.id);
        } else {
          setIsAutoPlay(false);
          clearInterval(autoPlayInterval);
        }
      }, 1000);
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [isAutoPlay, nextNumber, points, isGameOver, handlePointClick]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    requestAnimationFrame(() => {
      setPoints(generateInitialPoints(numPoints));
      setNextNumber(1);
      setTime(0);
      setIsGameOver(false);
    });
  };

  const handleRestart = () => {
    requestAnimationFrame(() => {
      setPoints(generateInitialPoints(numPoints));
      setNextNumber(1);
      setTime(0);
      setIsGameOver(false);
      setIsAutoPlay(false);
    });
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <GameHeader 
          isGameOver={isGameOver}
          nextNumber={nextNumber}
          numPoints={numPoints}
        />
        <div className="game-info">
          <PointsInput 
            numPoints={numPoints}
            onPointsChange={handlePointsChange}
          />
          <Timer time={time} />
        </div>
        <Controls 
          isGameStarted={isGameStarted}
          isGameOver={isGameOver}
          isAutoPlay={isAutoPlay}
          nextNumber={nextNumber}
          onStart={handleStartGame}
          onRestart={handleRestart}
          onAutoPlayToggle={() => setIsAutoPlay(!isAutoPlay)}
        />
      </div>
      <div className="board-container">
        {isGameStarted && points.length > 0 && (
          <Board points={points} onPointClick={handlePointClick} />
        )}
      </div>
    </div>
  );
}

export default Game;
