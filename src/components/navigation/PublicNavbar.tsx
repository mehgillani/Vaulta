import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute, UserRole } from '../../types';

interface PublicNavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPage,
  onNavigate,
  userRole,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'How It Works', route: 'how-it-works' },
    { label: 'Investments', route: 'investments' },
    { label: 'Referral', route: 'referral' },
    { label: 'Security', route: 'security' },
    { label: 'FAQ', route: 'faq' },
  ];

  const loggedInLinks: { label: string; route: PageRoute }[] = [
    { label: 'Dashboard', route: 'dashboard' },
    { label: 'Investments', route: 'my-investments' },
    { label: 'Deposit', route: 'deposit' },
    { label: 'Withdraw', route: 'withdraw' },
    { label: 'Transactions', route: 'transactions' },
    { label: 'Referrals', route: 'user-referrals' },
    { label: 'Profile', route: 'profile' },
  ];

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Title (Single text element per Top Bar Contract) */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer whitespace-nowrap"
        >
          VAULTA
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {publicLinks.map((item) => {
            const isActive = currentPage === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`py-1 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-slate-900 border-blue-700 font-semibold'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {userRole === 'guest' ? (
            <>
              <button
                type="button"
                onClick={() => handleNav('login')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleNav('signup')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNav('dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => handleNav('admin-overview')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Admin UI
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-5">
          <div className="space-y-1">
            <div className="px-2 pb-1 text-xs font-semibold text-slate-400">Public Platform</div>
            {publicLinks.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.route
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {userRole !== 'guest' && (
            <div className="space-y-1 pt-3 border-t border-slate-100">
              <div className="px-2 pb-1 text-xs font-semibold text-slate-400">Account Workspace</div>
              {loggedInLinks.map((item) => (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {userRole === 'guest' ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('signup')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('dashboard')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg"
                >
                  Open User Dashboard
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-600 border border-slate-200 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
