import React from 'react';

const Notification = ({ message, error }) => {
  if (message === null || message === '') {
    return null;
  }

  return (
    <div className={`notification ${error ? 'error' : ''}`}>{message}</div>
  );
};

export default Notification;
