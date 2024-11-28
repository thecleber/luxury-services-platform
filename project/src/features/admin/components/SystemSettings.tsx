import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Globe, DollarSign, Bell, Shield } from 'lucide-react';
import { useAdminStore } from '../stores/adminStore';

export const SystemSettings = () => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Settings className="h-6 w-6 text-gray-600" />
            <span>{t('admin.settings.title')}</span>
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* General Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <span>{t('admin.settings.general')}</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.settings.siteName')}
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={settings?.siteName}
                    onChange={(e) =>
                      updateSettings({ siteName: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Payment Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span>{t('admin.settings.payment')}</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('admin.settings.commission')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={settings?.commission}
                    onChange={(e) =>
                      updateSettings({ commission: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Security Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <span>{t('admin.settings.security')}</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={settings?.twoFactorAuth}
                    onChange={(e) =>
                      updateSettings({ twoFactorAuth: e.target.checked })
                    }
                  />
                  <label className="text-sm font-medium text-gray-700">
                    {t('admin.settings.twoFactor')}
                  </label>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span>{t('admin.settings.notifications')}</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={settings?.emailNotifications}
                    onChange={(e) =>
                      updateSettings({ emailNotifications: e.target.checked })
                    }
                  />
                  <label className="text-sm font-medium text-gray-700">
                    {t('admin.settings.emailNotifications')}
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {t('admin.settings.saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};