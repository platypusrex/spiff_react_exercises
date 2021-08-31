import React from 'react';

export const ProgressBar = ({ percent, transitionTiming = 1000 }) => (
  <div className="progress-bar">
    <div
      data-testid="progress-bar"
      className={`progress-bar__inner ${percent === 100 ? 'fade' : ''}`}
      style={{
        width: `${percent}%`,
        transitionProperty: 'width',
        transitionDuration: `${transitionTiming}ms`,
        transitionTimingFunction: 'linear'
      }}
    />
  </div>
);
