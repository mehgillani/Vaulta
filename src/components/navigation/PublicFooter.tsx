import React from 'react';
import { PageRoute } from '../../types';

interface PublicFooterProps {
  onNavigate: (page: PageRoute) => void;
  onQuickAccessRole: (role: 'user' | 'admin', targetPage: PageRoute) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigate,
  onQuickAccessRole,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xl font-bold tracking-tight text-white">VAULTA</div>
            <p className="text-sm text-slate-300 font-medium">Invest. Grow. Repeat.</p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Vaulta is a modern digital investment platform focused on providing users with a simple interface to manage their investments, monitor returns, make deposits and withdrawals, and participate in a referral program.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Zurich & London Desk (Demo)</span>
              <span aria-hidden="true">·</span>
              <span>USDT Digital Asset Infrastructure</span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white tracking-wide">Platform</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Vaulta
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('investments')} className="hover:text-white transition-colors cursor-pointer">
                  Investment Plans
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('referral')} className="hover:text-white transition-colors cursor-pointer">
                  Referral Program
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Trust */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white tracking-wide">Trust & Support</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => onNavigate('security')} className="hover:text-white transition-colors cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('guarantee-terms')} className="hover:text-white transition-colors cursor-pointer">
                  72-Hour Withdrawal Guarantee Terms
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Institutional Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onQuickAccessRole('user', 'dashboard')}
                  className="text-sky-400 hover:text-sky-300 font-medium transition-colors cursor-pointer"
                >
                  Open User Dashboard (Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onQuickAccessRole('admin', 'admin-overview')}
                  className="text-sky-400 hover:text-sky-300 font-medium transition-colors cursor-pointer"
                >
                  Open Admin Console (/admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white tracking-wide">Legal & Disclaimers</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('risk-disclosure')} className="hover:text-white transition-colors cursor-pointer">
                  Risk Disclosure & Investment Disclaimer
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('guarantee-terms')} className="hover:text-white transition-colors cursor-pointer">
                  Withdrawal Guarantee Terms
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('referral-terms')} className="hover:text-white transition-colors cursor-pointer">
                  Referral Program Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Vaulta Financial Technologies (Frontend Demo Environment). All figures, wallet addresses, and returns shown are simulated demonstration values.
          </p>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <button type="button" onClick={() => onNavigate('terms')} className="hover:text-slate-300 cursor-pointer">
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-slate-300 cursor-pointer">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => onNavigate('risk-disclosure')} className="hover:text-slate-300 cursor-pointer">
              Risk Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
