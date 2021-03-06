import React, { useReducer, useState } from 'react';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { ProgressBarToggle } from './ProgressBarToggle';

const LOADING_DURATION = 15000;
const COMPLETE_DURATION = 1000;

const INACTIVE = 'INACTIVE'
const LOADING = 'LOADING';
const COMPLETE = 'COMPLETE';

const reducer = (state, action) => {
  switch (action.type) {
    case INACTIVE:
      return { percent: 0, transitionTiming: 0 };
    case LOADING:
      return { percent: 90, transitionTiming: LOADING_DURATION };
    case COMPLETE:
      return { percent: 100, transitionTiming: COMPLETE_DURATION };
    default:
      return state;
  }
};

export const ProgressBarSolution = () => {
  const [value, setValue] = useState('simple')
  const [requestTimer, setRequestTimer] = useState()
  const [{ percent, transitionTiming }, dispatch] = useReducer(
    reducer,
    { percent: 0, transitionTiming: 0 }
  );

  const resetTimer = () => {
    // clear out the timer
    clearTimeout(requestTimer);
  }

  const handleInactive = () => {
    // dispatch the inactive state
    dispatch({ type: INACTIVE });

    // reset all timer data
    resetTimer();
    setRequestTimer(undefined);
  }

  const handleStartRequest = () => {
    // short circuit if request is in flight
    if (requestTimer) {
      return;
    }

    // dispatch the progress bar loading state
    dispatch({ type: LOADING });

    // start a mock request of 15s (pretty sure this isn't ideal)
    const timer = setTimeout(() => {
      // if request exceeds 15s this should hang so do nothing here
      // only the finish handler should complete the request?
    }, LOADING_DURATION);
    setRequestTimer(timer);
  };

  const handleFinishRequest = () => {
    if (percent === 0 || percent === 100) {
      return;
    }

    // clear current in flight request timeout and dispatch completion
    resetTimer();
    dispatch({ type: COMPLETE });

    // start new timer for the completion phase
    // dispatch inactive after timeout of 4s to set progress back to initial state
    const timer = setTimeout(() => {
      handleInactive();
    }, 4000);
    setRequestTimer(timer);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    handleInactive();
  }

  return (
    <div className="progress-bar-solution">
      {value === 'simple' ? (
        <ProgressBar
          percent={percent}
          transitionTiming={transitionTiming}
        />
      ) : (
        <ProgressBar
          percent={percent}
          transitionTiming={transitionTiming}
          breakpoints={[20, 40, 60, 80]}
        />
      )}
      <div className="progress-bar-solution__content">
        <ProgressBarToggle value={value} onChange={handleChange} />
        <Button onClick={handleStartRequest} disabled={requestTimer}>
          Start request
        </Button>
        <Button
          variant="error"
          onClick={handleFinishRequest}
          disabled={percent === 0 || percent === 100}
        >
          Finish request
        </Button>
      </div>
    </div>
  );
}
