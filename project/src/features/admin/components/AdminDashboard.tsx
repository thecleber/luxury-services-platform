import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Settings,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      label: t('admin.totalUsers'),
      value: '1,234',
    },
    {
      icon: Calendar,
      label: t('admin.activeBookings'),
      value: '56',
    },
    {
      icon: DollarSign,
      label: t('admin.revenue'),
      value: 'R$ 45.678',
    },
    {
      icon: Star,
      label: t('admin.averageRating'),
      value: '4.8',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {t('admin.recentBookings')}
          </h3>
          {/* Recent bookings table will be added here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            {t('admin.pendingApprovals')}
          </h3>
          {/* Pending approvals list will be added here */}
        </div>
      </div>
    </div>
  );
};