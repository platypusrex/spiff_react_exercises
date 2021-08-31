import React, { useEffect, useState } from 'react';
import { useBreakpoints } from './useBreakpoints';

export const ProgressBar = ({ percent, transitionTiming = 1000, breakpoints }) => {
  const [breakpoint, setBreakpointTiming] = useState(null);

   // Using the resize abserver API to obtain the current width of the progress bar,
   // determine whether it's 'in range' of a breakpoint,
   // and also recalculate the duration based on current width in percentage (this should ensure the animation still completes in 15s),
   // The hook itself only runs if breakpoints are provided by the consumer
  const { ref } = useBreakpoints({
    breakpoints,
    onBreakpointInRange: (inRange, currentPercent, timing) => {
      // if percent is === 100 then we need to short circuit the breakpoint logic and complete the progress
      if (percent === 100) {
        setBreakpointTiming(null);
        return;
      }

      // if we're in breakpoint range override the current timing and percent complete
      if (inRange) {
        setBreakpointTiming({ timing: 20000, percent: currentPercent + 10 })
      } else {
        // if our percent is zero reset the breakpoint timing
        // else update timing according to useBreakpoints calculation
        percent > 0
          ? setBreakpointTiming({ timing, percent })
          : setBreakpointTiming(null);
      }
    }
  });

  useEffect(() => {
    // if we have breakpoints and completion was triggered
    // we need to short circuit here to override any 'inRange' logic above
    if (breakpoints && percent === 100) {
      setBreakpointTiming(null);
    }
  }, [breakpoints, percent])

  return (
    <div className="progress-bar">
      <div
        data-testid="progress-bar"
        className={`progress-bar__inner ${percent === 100 ? 'fade' : ''}`}
        ref={ref}
        style={{
          width: `${breakpoint?.percent ?? percent}%`,
          transitionProperty: 'width',
          transitionDuration: `${breakpoint?.timing ?? transitionTiming}ms`,
          transitionTimingFunction: 'linear'
        }}
      />
    </div>
  );
}