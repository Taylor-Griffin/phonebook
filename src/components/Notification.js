import React from 'react';

const Notification = ({ message, errorStyle }) =>
  message ? (
    <div className={errorStyle ? 'message error' : 'message'}>{message}</div>
  ) : null;

export default Notification;
