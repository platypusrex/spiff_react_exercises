import { useCallback, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

export const useBreakpoints = ({ breakpoints, onBreakpointInRange }) => {
  const ref = useRef(null);
  const breakpointInRange = useRef(false);

  useResizeObserver({
    // if we don't have breakpoints pass null to opt out of resize observer instantiation
    ref: breakpoints ? ref : null,
    onResize: useCallback(
      ({ width }) => {
        // get the width in percent of the progress bar
        const progressBar = ref.current;
        const parentWidth = progressBar?.parentElement.offsetWidth;
        const currentWidthInPercent = Math.round((width / parentWidth) * 100);

        // if the breakpoints list includes the current percent then we're in range of the breakpoint
        const inRange = breakpoints?.includes(currentWidthInPercent);

        // we also need to readjust the transition duration to account
        // for the remaining width to reach 90% in the allotted 15s loading time
        const transitionTiming = currentWidthInPercent ? (90 / currentWidthInPercent) * 1000 : null;

        // the ref is being used to prevent potentially unnecessary calls to the callback
        // and therefore unnecessary renders
        if (inRange) {
          if (!breakpointInRange.current) {
            onBreakpointInRange(true, currentWidthInPercent, transitionTiming);
            breakpointInRange.current = true;
          }
        } else {
          if (breakpointInRange.current) {
            onBreakpointInRange(false, currentWidthInPercent, transitionTiming);
            breakpointInRange.current = false;
          }
        }
      },
      [breakpoints, onBreakpointInRange]
    )
  });

  return { ref }
};
