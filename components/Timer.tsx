"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Draggable from "react-draggable";
import { Clock, Play, Pause, RefreshCcw } from "lucide-react";
import { useCall } from "@stream-io/video-react-sdk";
import '../app/(root)/Styles/timer.css';

const Timer = ({ isHost }: {isHost : boolean}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [showClockButton, setShowClockButton] = useState(true);
  const timerRef = useRef<HTMLDivElement>(null);
  const call = useCall();

  const broadcastTimerState = useCallback((isRunning: boolean, isPaused: boolean) => {
    call?.sendCustomEvent({
      type: "timer_update",
      data: { minutes, seconds, isRunning, isPaused },
    });
  }, [call, minutes, seconds]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    broadcastTimerState(false, false);
  }, [broadcastTimerState]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      if (minutes === 0 && seconds === 0) {
        stopTimer();
        setShowClockButton(true);
        setIsEditing(false);
      } else {
        const id = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else if (minutes > 0 && seconds === 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
          broadcastTimerState(true, false);
        }, 1000);

        return () => clearInterval(id);
      }
    }
  }, [isRunning, isPaused, minutes, seconds, stopTimer, broadcastTimerState]);

  const handleStart = () => {
    if (isHost && (minutes > 0 || seconds > 0)) {
      setInitialMinutes(minutes);
      setInitialSeconds(seconds);
      setIsEditing(false);
      setIsRunning(true);
      setIsPaused(false);
      setShowClockButton(false);
      broadcastTimerState(true, false);
    }
  };

  const handlePlay = () => {
    if (isHost && !isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      broadcastTimerState(true, false);
    }
  };

  const handlePause = () => {
    if (isHost && isRunning) {
      setIsPaused(true);
      setIsRunning(false);
      broadcastTimerState(false, true);
    }
  };

  const handleReset = () => {
    if (isHost) {
      stopTimer();
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
      setIsEditing(true);
      setShowClockButton(false);
      broadcastTimerState(false, false);
    }
  };

  const handleClockButtonClick = () => {
    if (isHost) {
      setIsEditing(true);
      setShowClockButton(false);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (timerRef.current && !timerRef.current.contains(event.target as Node) && !isRunning && !isPaused) {
      setIsEditing(false);
      setShowClockButton(true);
    }
  }, [isRunning, isPaused]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const handleCustomEvent = (event: {type : string; data : any}) => {
      if (event.type === "timer_update" && !isHost) {
        const { minutes, seconds, isRunning, isPaused } = event.data;
        setMinutes(minutes);
        setSeconds(seconds);
        setIsRunning(isRunning);
        setIsPaused(isPaused);
        setIsEditing(false);
        setShowClockButton(false);
      }
    };

    call?.on("custom_event" as any, handleCustomEvent);
    return () => {
      call?.off("custom_event" as any, handleCustomEvent);
    };
  }, [call, isHost]);

  return (
    <Draggable>
      <div className="timer-container" ref={timerRef}>
        {showClockButton ? (
          <button onClick={handleClockButtonClick} className="timer-button">
            <Clock size={24} />
          </button>
        ) : isEditing ? (
          <div className="timer-edit">
            <div className="timer-input-group">
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="MM"
                className="timer-input"
              />
              <span className="timer-separator">:</span>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="SS"
                className="timer-input"
              />
            </div>
            <button onClick={handleStart} className="timer-button">Start</button>
          </div>
        ) : (
          <div className="timer-display">
            <Clock size={24} className="clock-icon" />
            <span className="timer-text">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            {isRunning || isPaused ? (
              <div className="timer-controls">
                {isPaused ? (
                  <button onClick={handlePlay} className="timer-button"><Play size={20} /></button>
                ) : (
                  <button onClick={handlePause} className="timer-button"><Pause size={20} /></button>
                )}
                <button onClick={handleReset} className="timer-button"><RefreshCcw size={20} /></button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Timer;
