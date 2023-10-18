import React, { useState, useEffect } from 'react';

interface NotificationWindowProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const NotificationWindow: React.FC<NotificationWindowProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  const notificationBoxStyles: React.CSSProperties = {
    backgroundColor: type === 'success' ? '#4e9117' : type === 'error' ? 'red' : 'blue', 
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '9999',
    borderRadius: '5px',
  };
  
  useEffect(() => {
    // Automatically hide the notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isVisible ? (
    <div style={notificationBoxStyles}>
      {message}
    </div>
  ) : null;
};

export default NotificationWindow;
