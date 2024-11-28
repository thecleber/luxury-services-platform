import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { useAdminStore } from '../stores/adminStore';

export const DisputeManagement = () => {
  const { t } = useTranslation();
  const { disputes, resolveDispute } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <span>{t('admin.disputes.title')}</span>
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {disputes?.map((dispute) => (
              <div
                key={dispute.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{dispute.title}</h3>
                    <p className="text-sm text-gray-500">
                      {t('admin.disputes.case')} #{dispute.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      dispute.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : dispute.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {t(`admin.disputes.status.${dispute.status}`)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => resolveDispute(dispute.id, 'resolved')}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>{t('admin.disputes.resolve')}</span>
                  </button>
                  <button
                    onClick={() => resolveDispute(dispute.id, 'rejected')}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>{t('admin.disputes.reject')}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <MessageSquare className="h-5 w-5" />
                    <span>{t('admin.disputes.contact')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};