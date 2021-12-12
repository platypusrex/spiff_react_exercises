import React from 'react';
import { ProgressBar } from './index';
import { render, screen } from '@testing-library/react';

describe('ProgressBar', () => {
  it('should render a progress bar with provided percentage', () => {
    render(<ProgressBar percent={10} />);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 10%;')
  });

  it('should render with default transition timing', () => {
    render(<ProgressBar percent={10} />);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('transition-duration: 1000ms;')
  });

  it('should render with provided transition timing', () => {
    render(<ProgressBar percent={10} transitionTiming={15000}/>);
    expect(screen.getByTestId('progress-bar')).toHaveStyle('transition-duration: 15000ms;')
  });
})
