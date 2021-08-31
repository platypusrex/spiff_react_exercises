import React from 'react';

export const ProgressBarToggle = ({ value, onChange }) => (
  <div className="progress-bar-toggle">
    <div className="progress-bar-toggle__radio">
      <label>
        <input
          type="radio"
          value="simple"
          checked={value === 'simple'}
          onChange={onChange}
        />
        Simple
      </label>
    </div>
    <div className="progress-bar-toggle__radio">
      <label>
        <input
          type="radio"
          value="breakpoints"
          checked={value === 'breakpoints'}
          onChange={onChange}
        />
        Breakpoints
      </label>
    </div>
  </div>
);
