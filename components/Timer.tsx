"use client";
import { useState, useEffect, useCallback } from "react";
import { Clock, Play, Pause, RefreshCcw } from "lucide-react";
import '../app/(root)/Styles/timer.css';

const Timer = () => {
  const [isEditing, setIsEditing] = useState(true); // Initially shows the clock button
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0); // To reset input fields correctly
  const [initialSeconds, setInitialSeconds] = useState(0); // To reset input fields correctly

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused && (minutes > 0 || seconds > 0)) {
      const id = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 0) return prev - 1;
          if (minutes > 0) {
            setMinutes((min) => min - 1);
            return 59;
          }
          stopTimer();
          return 0;
        });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [isRunning, isPaused, minutes, seconds, stopTimer]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setInitialMinutes(minutes); // Store initial values
      setInitialSeconds(seconds); // Store initial values
      setIsEditing(false);
      setIsRunning(true);
      setIsPaused(false); // Ensure it starts running immediately
    }
  };

  const handlePlay = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isRunning) {
      setIsPaused(true);
      setIsRunning(false); // Stop running to avoid multiple intervals
    }
  };

  const handleReset = () => {
    stopTimer();
    setIsEditing(true);
    setMinutes(initialMinutes); // Reset to initial values
    setSeconds(initialSeconds); // Reset to initial values
  };

  const handleStop = () => {
    stopTimer();
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="timer-container">
      {isEditing ? (
        <div className="timer-edit">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="MM"
            className="timer-input"
          />
          :
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
            placeholder="SS"
            className="timer-input"
          />
          <button onClick={handleStart} className="timer-button">Start</button>
        </div>
      ) : (
        <div className="timer-display">
          <Clock size={24} className="clock-icon" />
          <span className="timer-text">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <div className="timer-controls">
            {isPaused ? (
              <button onClick={handlePlay} className="timer-button"><Play size={20} /></button>
            ) : (
              <button onClick={handlePause} className="timer-button"><Pause size={20} /></button>
            )}
            <button onClick={handleReset} className="timer-button"><RefreshCcw size={20} /></button>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
