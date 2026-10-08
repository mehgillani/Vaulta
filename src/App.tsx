/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, UserRole, DataViewState, UserProfile, NotificationItem } from './types';
import { MOCK_CURRENT_USER, MOCK_NOTIFICATIONS } from './data/mockUsers';
import { PublicNavbar } from './components/navigation/PublicNavbar';
import { PublicFooter } from './components/navigation/PublicFooter';
import { UserLayout } from './components/navigation/UserLayout';
import { AdminLayout } from './components/navigation/AdminLayout';
import { PublicPages } from './pages/PublicPages';
import { AuthPages } from './pages/AuthPages';
import { UserDashboardPages } from './pages/UserDashboardPages';
import { AdminPages } from './pages/AdminPages';

const USER_ROUTES: PageRoute[] = [
  'dashboard',
  'my-investments',
  'deposit',
  'withdraw',
  'transactions',
  'user-referrals',
  'profile',
  'security-settings',
  'support',
];

const ADMIN_ROUTES: PageRoute[] = [
  'admin-overview',
  'admin-users',
  'admin-investments',
  'admin-deposits',
  'admin-withdrawals',
  'admin-transactions',
  'admin-referrals',
  'admin-support',
  'admin-audit-logs',
  'admin-settings',
];

const AUTH_ROUTES: PageRoute[] = [
  'login',
  'signup',
  'verify-email',
  'forgot-password',
  'reset-password',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin')) {
        return 'admin-overview';
      }
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as PageRoute | null;
      if (pageParam) return pageParam;
    }
    return 'home';
  });

  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [user, setUser] = useState<UserProfile>(MOCK_CURRENT_USER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [dataViewState, setDataViewState] = useState<DataViewState>('populated');
  const [referralCodeFromUrl, setReferralCodeFromUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) setReferralCodeFromUrl(ref);
    }
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    setDataViewState('populated');
    if (USER_ROUTES.includes(page) && userRole === 'guest') {
      setUserRole('user');
    }
    if (ADMIN_ROUTES.includes(page)) {
      setUserRole('admin');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (role: 'user' | 'admin', email?: string) => {
    setUserRole(role);
    if (email) {
      setUser((prev) => ({ ...prev, email }));
    }
    if (role === 'admin') {
      setCurrentPage('admin-overview');
    } else {
      setCurrentPage('dashboard');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setUserRole('guest');
    setCurrentPage('home');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleQuickAccessRole = (role: 'user' | 'admin', targetPage: PageRoute) => {
    setUserRole(role);
    setCurrentPage(targetPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render Admin Interface (/admin)
  if (ADMIN_ROUTES.includes(currentPage)) {
    return (
      <AdminLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        dataViewState={dataViewState}
        onChangeDataViewState={setDataViewState}
      >
        <AdminPages
          currentPage={currentPage}
          onNavigate={handleNavigate}
          dataViewState={dataViewState}
          onResetDataViewState={() => setDataViewState('populated')}
        />
      </AdminLayout>
    );
  }

  // Render User Dashboard Interface
  if (USER_ROUTES.includes(currentPage)) {
    return (
      <UserLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onLogout={handleLogout}
        dataViewState={dataViewState}
        onChangeDataViewState={setDataViewState}
      >
        <UserDashboardPages
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onUpdateUser={handleUpdateUser}
          dataViewState={dataViewState}
          onResetDataViewState={() => setDataViewState('populated')}
        />
      </UserLayout>
    );
  }

  // Render Public & Authentication Pages
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {AUTH_ROUTES.includes(currentPage) ? (
          <AuthPages
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
            initialReferralId={referralCodeFromUrl}
          />
        ) : (
          <PublicPages
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <PublicFooter
        onNavigate={handleNavigate}
        onQuickAccessRole={handleQuickAccessRole}
      />
    </div>
  );
}

