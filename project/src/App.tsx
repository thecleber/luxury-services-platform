import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { AdminDashboard } from './features/admin/components/AdminDashboard';
import { UserManagement } from './features/admin/components/UserManagement';
import { DisputeManagement } from './features/admin/components/DisputeManagement';
import { ReviewManagement } from './features/admin/components/ReviewManagement';
import { SystemSettings } from './features/admin/components/SystemSettings';
import { Header } from './components/layout/Header';
import './i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="disputes" element={<DisputeManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      LuxeServ Platform
                    </h1>
                    <p className="text-lg text-gray-600">
                      Development in progress...
                    </p>
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;