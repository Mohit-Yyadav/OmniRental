import React from 'react';
import { Bell, Check } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';

const NotificationPanel = ({ notifications, onClose, darkMode }) => {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className={`notification-panel ${darkMode ? 'dark' : 'light'}`}>
      <div className="notification-header">
        <h6>Notifications</h6>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>
      
      <div className="notification-list">
        {unreadNotifications.length > 0 && (
          <>
            <div className="notification-section-title">New</div>
            {unreadNotifications.map(notification => (
              <div key={notification.id} className="notification-item unread">
                <div className="notification-icon">
                  <Bell size={16} />
                </div>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <small>{notification.date}</small>
                </div>
                <button className="mark-read">
                  <Check size={14} />
                </button>
              </div>
            ))}
          </>
        )}

        {readNotifications.length > 0 && (
          <>
            <div className="notification-section-title">Earlier</div>
            {readNotifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-icon">
                  <Bell size={16} />
                </div>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <small>{notification.date}</small>
                </div>
              </div>
            ))}
          </>
        )}

        {notifications.length === 0 && (
          <div className="no-notifications">
            No notifications yet
          </div>
        )}
      </div>

      <div className="notification-footer">
        <button className="view-all">View All Notifications</button>
      </div>
    </div>
  );
};

export default NotificationPanel;