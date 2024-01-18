// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import the corresponding CSS file

const CountdownTimer = () => {
  const [countdownTime, setCountdownTime] = useState(2 * 60 * 60); // 2 hours in seconds
  const [inputTime, setInputTime] = useState('00:00:00');
  const [counting, setCounting] = useState(false);

  const startTimer = () => {
    const inputTimeArray = inputTime.split(':');
    const newCountdownTime =
      inputTimeArray[0] * 3600 + inputTimeArray[1] * 60 + inputTimeArray[2] * 1;

    setCountdownTime(newCountdownTime);
    setCounting(true);
  };

  const stopTimer = () => {
    setCounting(false);
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
  };

  useEffect(() => {
    let countdownInterval;

    if (counting && countdownTime > 0) {
      countdownInterval = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (counting && countdownTime === 0) {
      setCounting(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [counting, countdownTime]);

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div className="timer-display">Time remaining: {formatTime(countdownTime)}</div>
      <label htmlFor="time" className="timer-label">
        Set Timer (hh:mm:ss):
      </label>
      <input
        type="text"
        id="time"
        placeholder="00:00:00"
        value={inputTime}
        onChange={handleInputChange}
        className="timer-input"
      />
      <button onClick={startTimer} disabled={counting} className="timer-button start">
        Start
      </button>
      <button onClick={stopTimer} disabled={!counting} className="timer-button stop">
        Stop
      </button>
    </div>
  );
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default CountdownTimer;
