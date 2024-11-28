import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, X } from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';

export const NotificationCenter = () => {
  const { t } = useTranslation();
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed right-4 top-20 w-96 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm">{notification.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};