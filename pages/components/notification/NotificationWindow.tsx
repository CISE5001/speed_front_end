import React, { useState, useEffect } from 'react';

interface NotificationWindowProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const NotificationWindow: React.FC<NotificationWindowProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className={`notification-box ${type}`}>
      {message}
    </div>
  ) : null;
};

export default NotificationWindow;