import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './index';

describe('Button', () => {
  it('should render a button with Text', () => {
    render(<Button>Button text</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Button text');
  });

  it('should render default variant success', () => {
    render(<Button>Button text</Button>);
    expect(screen.getByRole('button')).toHaveClass('success');
  });

  it('should render with provided variant', () => {
    render(<Button variant="error">Button text</Button>);
    expect(screen.getByRole('button')).toHaveClass('error');
  });

  it('should render with provided variant', () => {
    render(<Button variant="error">Button text</Button>);
    expect(screen.getByRole('button')).toHaveClass('error');
  });

  it('should render a disabled button', () => {
    render(<Button disabled>Button text</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('should fire a click event', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button text</Button>);
    const buttonNode = screen.getByRole('button');
    fireEvent.click(buttonNode);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent click event if disabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>Button text</Button>);
    const buttonNode = screen.getByRole('button');
    fireEvent.click(buttonNode);
    expect(onClick).not.toHaveBeenCalled();
  });
});
