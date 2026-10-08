import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  ArrowDownLeft,
  ArrowUpRight,
  ListOrdered,
  Users,
  UserCheck,
  Shield,
  LifeBuoy,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { PageRoute, UserProfile, NotificationItem, DataViewState } from '../../types';
import { DemoStateBar } from '../ui/StateWrapper';

interface UserLayoutProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  user: UserProfile;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onLogout: () => void;
  dataViewState: DataViewState;
  onChangeDataViewState: (state: DataViewState) => void;
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({
  currentPage,
  onNavigate,
  user,
  notifications,
  onMarkAllRead,
  onLogout,
  dataViewState,
  onChangeDataViewState,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; icon: React.ReactNode }[] = [
    { label: 'Dashboard', route: 'dashboard', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    { label: 'My Investments', route: 'my-investments', icon: <Briefcase className="w-4 h-4 shrink-0" /> },
    { label: 'Deposit', route: 'deposit', icon: <ArrowDownLeft className="w-4 h-4 shrink-0" /> },
    { label: 'Withdraw', route: 'withdraw', icon: <ArrowUpRight className="w-4 h-4 shrink-0" /> },
    { label: 'Transactions', route: 'transactions', icon: <ListOrdered className="w-4 h-4 shrink-0" /> },
    { label: 'Referrals', route: 'user-referrals', icon: <Users className="w-4 h-4 shrink-0" /> },
    { label: 'Profile', route: 'profile', icon: <UserCheck className="w-4 h-4 shrink-0" /> },
    { label: 'Security', route: 'security-settings', icon: <Shield className="w-4 h-4 shrink-0" /> },
    { label: 'Support', route: 'support', icon: <LifeBuoy className="w-4 h-4 shrink-0" /> },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const activeNavLabel =
    navItems.find((item) => item.route === currentPage)?.label || 'Account Workspace';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Desktop & Tablet Collapsible Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-150 shrink-0 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
          {!sidebarCollapsed && (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-lg font-bold tracking-tight text-white cursor-pointer"
            >
              VAULTA
            </button>
          )}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer mx-auto"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-5 px-3 space-y-1 overflow-y-auto" aria-label="User Dashboard Navigation">
          {navItems.map((item) => {
            const active = currentPage === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Switchers & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            title="Public Website"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <Globe className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Public Website</span>}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin-overview')}
            title="Admin Console (/admin)"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Admin Console</span>}
          </button>
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar: Breadcrumbs, Notifications, Account Status, Profile */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900">Vaulta Client Portal</span>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-600 font-medium">{activeNavLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Account Status (Unboxed metadata per Zero-Pill rule) */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
              <span>Account Status:</span>
              <span className="font-semibold text-emerald-700">{user.accountStatus}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">{user.accountId}</span>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-700 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    <button
                      type="button"
                      onClick={onMarkAllRead}
                      className="text-xs font-medium text-blue-700 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-3 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-semibold ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                            {n.title}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Button */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover bg-slate-200"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">{user.fullName}</div>
                <div className="text-[11px] text-slate-500 font-mono leading-tight">{user.referralId}</div>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-slate-900 text-white h-full flex flex-col z-10">
              <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
                <span className="text-lg font-bold tracking-tight">VAULTA</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => {
                      onNavigate(item.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                      currentPage === item.route
                        ? 'bg-blue-700 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-3 border-t border-slate-800 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  <Globe className="w-4 h-4" />
                  <span>Public Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('admin-overview');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Console</span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Viewport Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-20 md:pb-10">
          <DemoStateBar
            currentState={dataViewState}
            onChangeState={onChangeDataViewState}
            label="Frontend Demo Data Layer"
          />
          {children}
        </main>

        {/* Mobile Bottom Quick Bar (<=15% viewport height cap) */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 px-2 flex items-center justify-around z-30"
          aria-label="Mobile Quick Navigation"
        >
          {[
            { label: 'Dashboard', route: 'dashboard' as PageRoute, icon: <LayoutDashboard className="w-4 h-4" /> },
            { label: 'Investments', route: 'my-investments' as PageRoute, icon: <Briefcase className="w-4 h-4" /> },
            { label: 'Deposit', route: 'deposit' as PageRoute, icon: <ArrowDownLeft className="w-4 h-4" /> },
            { label: 'Withdraw', route: 'withdraw' as PageRoute, icon: <ArrowUpRight className="w-4 h-4" /> },
            { label: 'Referrals', route: 'user-referrals' as PageRoute, icon: <Users className="w-4 h-4" /> },
          ].map((m) => (
            <button
              key={m.route}
              type="button"
              onClick={() => onNavigate(m.route)}
              className={`flex flex-col items-center justify-center py-1 px-2 text-[11px] font-medium ${
                currentPage === m.route ? 'text-blue-700 font-semibold' : 'text-slate-500'
              }`}
            >
              {m.icon}
              <span className="mt-0.5">{m.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
