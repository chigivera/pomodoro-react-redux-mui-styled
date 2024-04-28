import { useDispatch, useSelector } from 'react-redux';
import { decrementBreak, incrementBreak } from './state/break/breakReducer';
import { decrementSession, incrementSession } from './state/session/sessionReducer';
import { useEffect, useState } from 'react';
function App() {
  const breakValue = useSelector((state) => state.break.value);
const sessionValue = useSelector((state) => state.session.value);
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(sessionValue * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    setTimeLeft(sessionValue * 60);
  }, [sessionValue]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsTimerRunning((prevState) => !prevState);
  };
  return (
    <div className="App">
     <div className="" id="break-label">Break Length:</div>
     <div className="" id="break-length">{breakValue}</div>
     <button id="break-increment" onClick={()=>dispatch(incrementBreak())}>Increment Break By 1</button>
     <button id="break-increment" onClick={()=>dispatch(decrementBreak())}>Decrement Break By 1</button>
     <div className="" id="session-label">Session Length:</div>
     <div className="" id="session-length">{sessionValue}</div>
     <button id="session-increment" onClick={()=>dispatch(incrementSession())}>Increment Session By 1</button>
     <button id="session-increment" onClick={()=>dispatch(decrementSession())}>Decrement Session By 1</button>
     <div id="timer-label">{isTimerRunning ? 'Session' : 'Stopped'}</div>
      <div className="" id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={handleStartStop}>
        {isTimerRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default App;
