import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Briefcase,
  ArrowDownLeft,
  ArrowUpRight,
  ListOrdered,
  Share2,
  LifeBuoy,
  FileSearch,
  Settings,
  Menu,
  X,
  Globe,
  LayoutDashboard,
} from 'lucide-react';
import { PageRoute, DataViewState } from '../../types';
import { DemoStateBar } from '../ui/StateWrapper';

interface AdminLayoutProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  dataViewState: DataViewState;
  onChangeDataViewState: (state: DataViewState) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPage,
  onNavigate,
  dataViewState,
  onChangeDataViewState,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNav: { label: string; route: PageRoute; icon: React.ReactNode }[] = [
    { label: 'Overview', route: 'admin-overview', icon: <BarChart3 className="w-4 h-4 shrink-0" /> },
    { label: 'Users', route: 'admin-users', icon: <Users className="w-4 h-4 shrink-0" /> },
    { label: 'Investments', route: 'admin-investments', icon: <Briefcase className="w-4 h-4 shrink-0" /> },
    { label: 'Deposits', route: 'admin-deposits', icon: <ArrowDownLeft className="w-4 h-4 shrink-0" /> },
    { label: 'Withdrawals', route: 'admin-withdrawals', icon: <ArrowUpRight className="w-4 h-4 shrink-0" /> },
    { label: 'Transactions', route: 'admin-transactions', icon: <ListOrdered className="w-4 h-4 shrink-0" /> },
    { label: 'Referrals', route: 'admin-referrals', icon: <Share2 className="w-4 h-4 shrink-0" /> },
    { label: 'Support', route: 'admin-support', icon: <LifeBuoy className="w-4 h-4 shrink-0" /> },
    { label: 'Audit Logs', route: 'admin-audit-logs', icon: <FileSearch className="w-4 h-4 shrink-0" /> },
    { label: 'Settings', route: 'admin-settings', icon: <Settings className="w-4 h-4 shrink-0" /> },
  ];

  const activeLabel = adminNav.find((n) => n.route === currentPage)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">VAULTA</span>
            <span className="text-xs font-mono text-sky-400">/admin</span>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
          {adminNav.map((item) => {
            const active = currentPage === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Switch to User Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Return to Public Site</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
              aria-label="Open admin navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs text-slate-500">/admin</span>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="font-semibold text-slate-900">{activeLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="hidden sm:inline">UI Placeholder Mode</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="font-mono text-slate-800">compliance.lead@vaulta.com</span>
          </div>
        </header>

        {/* Mobile Admin Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-slate-950/60" onClick={() => setMobileOpen(false)} />
            <div className="relative w-72 bg-slate-950 text-white h-full flex flex-col z-10">
              <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
                <span className="text-base font-bold">VAULTA /admin</span>
                <button type="button" onClick={() => setMobileOpen(false)} className="p-1.5 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {adminNav.map((item) => (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => {
                      onNavigate(item.route);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                      currentPage === item.route ? 'bg-blue-700 text-white' : 'text-slate-300'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <DemoStateBar
            currentState={dataViewState}
            onChangeState={onChangeDataViewState}
            label="Admin Console Demo State"
          />
          {children}
        </main>
      </div>
    </div>
  );
};
