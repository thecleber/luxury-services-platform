import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Edit, Trash2, Shield } from 'lucide-react';

export const UserManagement = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">{t('admin.userManagement')}</h2>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.user')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* User rows will be rendered here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};