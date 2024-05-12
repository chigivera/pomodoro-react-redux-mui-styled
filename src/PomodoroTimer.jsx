import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { decrementBreak, incrementBreak, resetBreak } from './state/break/breakReducer';
import { decrementSession, incrementSession, resetSession } from './state/session/sessionReducer';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #5e5e5e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: white;
`;

const beepSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

export default function PomodoroTimer() {
  const breakValue = useSelector((state) => state.break.value);
  const sessionValue = useSelector((state) => state.session.value);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(sessionValue * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            beepSound.play();
            setIsBreakTime(true);
            return breakValue * 60;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, breakValue]);

  useEffect(() => {
    setTimeLeft(isBreakTime ? breakValue * 60 : sessionValue * 60);
  }, [sessionValue, breakValue, isBreakTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsTimerRunning((prevState) => !prevState);
    setIsBreakTime(false);
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setIsBreakTime(false);
    setTimeLeft(sessionValue * 60);
    dispatch(resetBreak());
    dispatch(resetSession());
  };

  return (
    <StyledBox>
      <div className="" id="break-label">Break Length:</div>
      <div className="" id="break-length">{breakValue}</div>
      <div>
        <button id="break-decrement" onClick={() => dispatch(decrementBreak())}>
          -
        </button>
        <button id="break-increment" onClick={() => dispatch(incrementBreak())}>
          +
        </button>
      </div>
      <div className="" id="session-label">Session Length:</div>
      <div className="" id="session-length">{sessionValue}</div>
      <div>
        <button id="session-decrement" onClick={() => dispatch(decrementSession())}>
          -
        </button>
        <button id="session-increment" onClick={() => dispatch(incrementSession())}>
          +
        </button>
      </div>
      <div id="timer-label">{isBreakTime ? 'Break' : 'Session'}</div>
      <div className="" id="time-left">{formatTime(timeLeft)}</div>
      <div>

      <button id="start_stop" onClick={handleStartStop}>
        {isTimerRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      </div>
    </StyledBox>
  );
}
