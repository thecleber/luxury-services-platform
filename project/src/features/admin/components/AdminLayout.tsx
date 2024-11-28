import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings,
  Shield,
  AlertTriangle,
  Star
} from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'users', icon: Users, path: '/admin/users' },
  { name: 'bookings', icon: Calendar, path: '/admin/bookings' },
  { name: 'reviews', icon: Star, path: '/admin/reviews' },
  { name: 'disputes', icon: AlertTriangle, path: '/admin/disputes' },
  { name: 'support', icon: MessageSquare, path: '/admin/support' },
  { name: 'settings', icon: Settings, path: '/admin/settings' },
];

export const AdminLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-indigo-600" />
              <span className="text-lg font-semibold">{t('admin.title')}</span>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{t(`admin.nav.${item.name}`)}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {t('admin.dashboard')}
              </h1>
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};