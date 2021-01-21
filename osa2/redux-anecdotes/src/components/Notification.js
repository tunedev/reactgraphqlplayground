import React from 'react';
import './Notification.css';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification.message !== '' ? (
    <div className={`notification ${notification.error ? 'error' : ''}`}>
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
