import React, { useEffect, useRef } from 'react';

export const Button = ({ children, variant = 'success', disabled, type, onClick }) => {
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
    btn.addEventListener('mouseleave', onMouseUp)
    return () => {
      btn.removeEventListener('mouseup', onMouseUp);
      btn.removeEventListener('mouseleave', onMouseUp);
    };
  });

  return (
    <button
      disabled={disabled}
      type={type}
      className={`button ${disabled ? 'disabled' : `${variant}`}`}
      ref={buttonRef}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
