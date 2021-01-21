import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, error }) => {
  if (message === null || message === '') {
    return null;
  }

  return (
    <div className={`notification ${error ? 'error' : ''}`}>{message}</div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool,
};

export default Notification;
