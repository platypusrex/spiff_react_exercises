import React, { useEffect, useRef } from 'react';

export const Button = ({ children, variant = 'success', disabled, onClick }) => {
  const buttonRef = useRef(null);

  // both useEffect blocks are here to support the 'clicked' animation requirements
  // using refs and avoiding additional rerenders to support the animation
  useEffect(() => {
    const btn = buttonRef.current;
    const onMouseDown = () => {
      btn.classList.add('clicked');
    }
    btn.addEventListener('mousedown', onMouseDown);

    return () => {
      btn.removeEventListener('mousedown', onMouseDown);
    };
  });

  useEffect(() => {
    const btn = buttonRef.current;
    const onMouseUp = () => {
      btn.classList.remove('clicked');
    }
    btn.addEventListener('mouseup', onMouseUp);

    return () => {
      btn.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <button
      disabled={disabled}
      className={`button ${disabled ? 'disabled' : `${variant}`}`}
      ref={buttonRef}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
