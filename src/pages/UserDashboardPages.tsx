import React, { useState } from 'react';
import {
  Copy,
  Check,
  QrCode,
  AlertTriangle,
  Clock,
  Search,
  Eye,
  X,
  CheckCircle2,
  Shield,
  Plus,
  Send,
  Laptop,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  PageRoute,
  DataViewState,
  UserProfile,
  UserInvestment,
  DepositNetwork,
  WithdrawalRecord,
  TransactionRecord,
  ReferralRecord,
  SupportTicket,
  LoginSession,
} from '../types';
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_INVESTMENT_PLANS,
  MOCK_USER_INVESTMENTS,
} from '../data/mockInvestments';
import {
  MOCK_DEPOSIT_NETWORKS,
  MOCK_USER_TRANSACTIONS,
} from '../data/mockTransactions';
import {
  MOCK_REFERRAL_STATS,
  MOCK_REFERRAL_BOOST_TIERS,
  MOCK_REFERRAL_HISTORY,
} from '../data/mockReferrals';
import {
  MOCK_USER_WITHDRAWALS,
  MOCK_SUPPORT_TICKETS,
  MOCK_FAQ_ITEMS,
} from '../data/mockWithdrawals';
import { MOCK_LOGIN_SESSIONS } from '../data/mockUsers';
import { StateWrapper, StatusText } from '../components/ui/StateWrapper';
import { PerformanceChart } from '../components/charts/PerformanceChart';

interface UserDashboardPagesProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  dataViewState: DataViewState;
  onResetDataViewState: () => void;
}

export const UserDashboardPages: React.FC<UserDashboardPagesProps> = ({
  currentPage,
  onNavigate,
  user,
  onUpdateUser,
  dataViewState,
  onResetDataViewState,
}) => {
  // Investments state
  const [investments, setInvestments] = useState<UserInvestment[]>(MOCK_USER_INVESTMENTS);
  const [selectedInvestment, setSelectedInvestment] = useState<UserInvestment | null>(null);
  const [showNewInvestmentModal, setShowNewInvestmentModal] = useState(false);

  // Deposit state
  const [selectedNetworkId, setSelectedNetworkId] = useState<DepositNetwork['id']>('network-b');
  const [showQrCode, setShowQrCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [depositStatusText, setDepositStatusText] = useState('Awaiting Transfer');
  const [depositConfirmedBanner, setDepositConfirmedBanner] = useState(false);

  // Withdrawal state
  const [withdrawAmount, setWithdrawAmount] = useState('250');
  const [withdrawNetworkName, setWithdrawNetworkName] = useState<'Network A' | 'Network B' | 'Network C'>('Network B');
  const [withdrawAddress, setWithdrawAddress] = useState('DEMO_DEST_TV8xLmP49Kq2W7nJ5R3cZ9B1mY6F8dQ2sH');
  const [withdrawError, setWithdrawError] = useState('');
  const [showWithdrawConfirmModal, setShowWithdrawConfirmModal] = useState(false);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(MOCK_USER_WITHDRAWALS);
  const [withdrawSuccessBanner, setWithdrawSuccessBanner] = useState(false);

  // Transactions state
  const [txFilter, setTxFilter] = useState<string>('All');
  const [txSearch, setTxSearch] = useState('');

  // Referrals state
  const [copiedRefId, setCopiedRefId] = useState(false);
  const [copiedRefLink, setCopiedRefLink] = useState(false);

  // Profile & Security state
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.fullName);
  const [editCountry, setEditCountry] = useState(user.country);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  const [twoFactorPlaceholderEnabled, setTwoFactorPlaceholderEnabled] = useState(user.twoFactorEnabled);
  const [sessions, setSessions] = useState<LoginSession[]>(MOCK_LOGIN_SESSIONS);
  const [secNotifLogin, setSecNotifLogin] = useState(true);
  const [secNotifWithdraw, setSecNotifWithdraw] = useState(true);
  const [secNotifWeeklyReturn, setSecNotifWeeklyReturn] = useState(true);

  // Support state
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<SupportTicket['category']>('Withdrawals & 72h Commitment');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmittedMsg, setTicketSubmittedMsg] = useState('');
  const [openSupportFaq, setOpenSupportFaq] = useState<string | null>('faq-4');

  /* ============================================================================
   * 14 & 15 & 16. USER DASHBOARD
   * ============================================================================ */
  if (currentPage === 'dashboard') {
    const metrics = MOCK_DASHBOARD_METRICS;
    const dashboardCards = [
      { label: 'Total Balance', value: `${metrics.totalBalance.toLocaleString('en-US')} USDT`, highlight: false },
      { label: 'Invested Capital', value: `${metrics.investedCapital.toLocaleString('en-US')} USDT`, highlight: false },
      { label: 'Total Earnings', value: `${metrics.totalEarnings.toLocaleString('en-US')} USDT`, highlight: true },
      { label: 'Available Balance', value: `${metrics.availableBalance.toLocaleString('en-US')} USDT`, highlight: false },
      { label: 'Pending Withdrawal', value: `${metrics.pendingWithdrawal.toLocaleString('en-US')} USDT`, highlight: false },
      { label: 'Referral Earnings', value: `${metrics.referralEarnings.toLocaleString('en-US')} USDT`, highlight: true },
    ];

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No portfolio activity yet."
        emptyDescription="Fund your account in USDT or activate an investment plan to view portfolio metrics."
        emptyActionLabel="Make a Demo Deposit"
        onEmptyAction={() => {
          onResetDataViewState();
          onNavigate('deposit');
        }}
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Portfolio Overview</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-800">Demo Data</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
                Welcome back, {user.fullName}
              </h1>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('deposit')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                Deposit USDT
              </button>
              <button
                type="button"
                onClick={() => onNavigate('withdraw')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Request Withdrawal
              </button>
            </div>
          </div>

          {/* 6 Required Dashboard Cards with Demo Data Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardCards.map((card, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">{card.label}</span>
                  <span className="text-amber-800 font-medium">Demo Data</span>
                </div>
                <div
                  className={`text-2xl font-mono font-bold tabular-nums ${
                    card.highlight ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Section 16: Performance Chart (7D, 1M, 3M, 6M, 1Y) */}
          <PerformanceChart initialPeriod="1M" />

          {/* Bottom Split: Active Investments Summary & Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Active & Recent Investments</h2>
                  <p className="text-xs text-slate-500">Demo Data · Standardized USDT plans</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('my-investments')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {investments.map((inv) => (
                  <div key={inv.investmentId} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-mono font-semibold text-slate-900">
                        {inv.investmentId} · {inv.planName}
                      </div>
                      <div className="text-slate-500 mt-0.5">
                        Started {inv.startDate} · Next Return: {inv.nextReturnDate}
                      </div>
                    </div>
                    <div className="text-right font-mono tabular-nums">
                      <div className="font-semibold text-slate-900">
                        {inv.amountUsdt.toLocaleString('en-US')} USDT
                      </div>
                      <StatusText status={inv.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 text-white border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>72-HOUR WITHDRAWAL COMMITMENT</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Target 72-Hour Settlement Processing
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Eligible withdrawal requests are targeted to be processed within 72 hours. If an eligible withdrawal request is not processed within 72 hours, Vaulta will provide compensation of $500, subject to the applicable Guarantee Terms.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate('guarantee-terms')}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 cursor-pointer"
                >
                  View Guarantee Terms →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('withdraw')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Open Withdrawals
                </button>
              </div>
            </div>
          </div>
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 17. MY INVESTMENTS PAGE
   * ============================================================================ */
  if (currentPage === 'my-investments') {
    const handleAddDemoInvestment = (planName: 'Starter' | 'Growth' | 'Premium', amountUsdt: number) => {
      const newInv: UserInvestment = {
        investmentId: `INV-${Math.floor(4200 + Math.random() * 799)}`,
        planName,
        userId: user.accountId,
        userName: user.fullName,
        amountUsdt,
        startDate: '2026-10-08',
        weeklyReturnPercent: 5.0,
        currentEarningsUsdt: 0,
        nextReturnDate: '2026-10-15',
        nextReturnAmountUsdt: amountUsdt * 0.05,
        status: 'Active',
        completedCycles: 0,
        totalCycles: 12,
      };
      setInvestments([newInv, ...investments]);
      setShowNewInvestmentModal(false);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No active investments."
        emptyDescription="You have not allocated capital to a Vaulta investment plan yet."
        emptyActionLabel="Explore Investment Plans"
        onEmptyAction={() => {
          onResetDataViewState();
          setShowNewInvestmentModal(true);
        }}
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Portfolio Allocations</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-800">Demo Data</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">My Investments</h1>
            </div>
            <button
              type="button"
              onClick={() => setShowNewInvestmentModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>New Demo Investment</span>
            </button>
          </div>

          {/* Desktop Investment Table */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-5">Investment ID</th>
                  <th className="py-3.5 px-5 text-right">Amount</th>
                  <th className="py-3.5 px-5">Start Date</th>
                  <th className="py-3.5 px-5 text-right">Weekly Return</th>
                  <th className="py-3.5 px-5 text-right">Current Earnings</th>
                  <th className="py-3.5 px-5">Next Return</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {investments.map((inv) => (
                  <tr
                    key={inv.investmentId}
                    onClick={() => setSelectedInvestment(inv)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">
                      {inv.investmentId} <span className="font-sans font-normal text-slate-500">({inv.planName})</span>
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono font-semibold text-slate-900 tabular-nums">
                      {inv.amountUsdt.toLocaleString('en-US')} USDT
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{inv.startDate}</td>
                    <td className="py-3.5 px-5 text-right font-mono text-emerald-700 font-semibold tabular-nums">
                      {inv.weeklyReturnPercent}%
                    </td>
                    <td className="py-3.5 px-5 text-right font-mono text-emerald-700 font-semibold tabular-nums">
                      +{inv.currentEarningsUsdt.toLocaleString('en-US')} USDT
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{inv.nextReturnDate}</td>
                    <td className="py-3.5 px-5">
                      <StatusText status={inv.status} />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInvestment(inv);
                        }}
                        className="inline-flex items-center gap-1 text-blue-700 font-semibold hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {investments.map((inv) => (
              <div
                key={inv.investmentId}
                onClick={() => setSelectedInvestment(inv)}
                className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {inv.investmentId} · {inv.planName}
                  </div>
                  <StatusText status={inv.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-slate-500">Amount</div>
                    <div className="font-mono font-semibold text-slate-900 tabular-nums">
                      {inv.amountUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Weekly Return</div>
                    <div className="font-mono font-semibold text-emerald-700 tabular-nums">
                      {inv.weeklyReturnPercent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Current Earnings</div>
                    <div className="font-mono font-semibold text-emerald-700 tabular-nums">
                      +{inv.currentEarningsUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Next Return</div>
                    <div className="font-mono text-slate-700 tabular-nums">{inv.nextReturnDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Investment Inspector Modal */}
          {selectedInvestment && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs text-slate-500">Investment Allocation Detail (Demo)</div>
                    <h3 className="text-lg font-bold text-slate-900 font-mono">
                      {selectedInvestment.investmentId} — {selectedInvestment.planName} Plan
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedInvestment(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700"
                    aria-label="Close detail view"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Principal Amount</div>
                    <div className="text-base font-mono font-bold text-slate-900 mt-0.5 tabular-nums">
                      {selectedInvestment.amountUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Current Earnings</div>
                    <div className="text-base font-mono font-bold text-emerald-700 mt-0.5 tabular-nums">
                      +{selectedInvestment.currentEarningsUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Start Date</div>
                    <div className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                      {selectedInvestment.startDate}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Next Return Date</div>
                    <div className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                      {selectedInvestment.nextReturnDate}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Weekly Return Schedule</div>
                    <div className="font-mono font-semibold text-emerald-700 mt-0.5 tabular-nums">
                      {selectedInvestment.weeklyReturnPercent}% ({selectedInvestment.nextReturnAmountUsdt} USDT)
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-slate-500">Cycle Progress</div>
                    <div className="font-mono font-semibold text-slate-900 mt-0.5 tabular-nums">
                      {selectedInvestment.completedCycles} / {selectedInvestment.totalCycles} Weeks
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <StatusText status={selectedInvestment.status} />
                  <button
                    type="button"
                    onClick={() => setSelectedInvestment(null)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                  >
                    Close Inspector
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* New Demo Investment Modal */}
          {showNewInvestmentModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs text-amber-800 font-semibold">Demo Simulation</div>
                    <h3 className="text-lg font-bold text-slate-900">Select an Investment Plan</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewInvestmentModal(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MOCK_INVESTMENT_PLANS.map((plan) => (
                    <div key={plan.id} className="p-4 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{plan.name}</div>
                        <div className="text-lg font-mono font-bold text-slate-900 mt-1 tabular-nums">
                          {plan.amountUsdt.toLocaleString('en-US')} USDT
                        </div>
                        <div className="text-xs text-emerald-700 font-mono mt-1">
                          {plan.weeklyReturnPercent}% weekly return
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddDemoInvestment(plan.name, plan.amountUsdt)}
                        className="w-full py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        Activate {plan.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 18. DEPOSIT PAGE
   * ============================================================================ */
  if (currentPage === 'deposit') {
    const activeNetwork =
      MOCK_DEPOSIT_NETWORKS.find((n) => n.id === selectedNetworkId) || MOCK_DEPOSIT_NETWORKS[0];

    const handleCopyWallet = () => {
      navigator.clipboard?.writeText(activeNetwork.demoWalletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    };

    const handleConfirmMadeDeposit = () => {
      setDepositStatusText('Confirming on Network (Demo)');
      setDepositConfirmedBanner(true);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No deposit channels configured."
        emptyDescription="Select a supported USDT transfer network to generate a demo deposit address."
        onRetry={onResetDataViewState}
      >
        <div className="max-w-4xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Account Funding</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">Placeholder Demo Address Only</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Deposit USDT</h1>
          </div>

          {/* Mandatory Network Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Network Compatibility Warning: </span>
              Only send USDT using the selected network. Sending funds through an unsupported network may result in permanent loss.
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            {/* Asset & Network Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Digital Asset
                </label>
                <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>USDT (Tether USD Stablecoin)</span>
                  <span className="text-xs font-mono text-slate-500">Selected</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Transfer Network
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MOCK_DEPOSIT_NETWORKS.map((net) => (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => {
                        setSelectedNetworkId(net.id);
                        setDepositConfirmedBanner(false);
                        setDepositStatusText('Awaiting Transfer');
                      }}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        selectedNetworkId === net.id
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {net.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deposit Details Box */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <div className="text-xs text-slate-500">Selected Network Protocol</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {activeNetwork.name} — {activeNetwork.protocolLabel}
                  </div>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500 mr-1.5">Deposit Status:</span>
                  <StatusText status={depositStatusText} />
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1.5">
                  Placeholder Demo Wallet Address (Do NOT send real funds)
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg font-mono text-xs text-slate-900 break-all">
                    {activeNetwork.demoWalletAddress}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyWallet}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy Address'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQrCode(!showQrCode)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{showQrCode ? 'Hide QR' : 'Show QR'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Optional SVG Demo QR Code */}
              {showQrCode && (
                <div className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-32 p-2 border border-slate-200 rounded bg-white flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="5" y="5" width="25" height="25" fill="none" stroke="#0F172A" strokeWidth="6" />
                      <rect x="13" y="13" width="9" height="9" fill="#0F172A" />
                      <rect x="70" y="5" width="25" height="25" fill="none" stroke="#0F172A" strokeWidth="6" />
                      <rect x="78" y="13" width="9" height="9" fill="#0F172A" />
                      <rect x="5" y="70" width="25" height="25" fill="none" stroke="#0F172A" strokeWidth="6" />
                      <rect x="13" y="78" width="9" height="9" fill="#0F172A" />
                      <rect x="40" y="15" width="8" height="8" fill="#0F172A" />
                      <rect x="52" y="25" width="8" height="16" fill="#0F172A" />
                      <rect x="38" y="42" width="16" height="8" fill="#0F172A" />
                      <rect x="15" y="42" width="12" height="8" fill="#0F172A" />
                      <rect x="64" y="45" width="8" height="20" fill="#0F172A" />
                      <rect x="42" y="62" width="14" height="14" fill="#0F172A" />
                      <rect x="72" y="74" width="18" height="8" fill="#0F172A" />
                      <rect x="40" y="84" width="20" height="8" fill="#0F172A" />
                    </svg>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="font-semibold text-slate-900">
                      Simulated QR Code ({activeNetwork.name})
                    </div>
                    <p>
                      This QR pattern is a frontend visual placeholder representing <span className="font-mono">{activeNetwork.demoWalletAddress}</span>.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500">Network:</span>{' '}
                  <span className="font-mono font-semibold text-slate-900">{activeNetwork.name}</span>
                </div>
                <div>
                  <span className="text-slate-500">Minimum Deposit:</span>{' '}
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {activeNetwork.minimumDepositUsdt} USDT
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Estimated Settlement:</span>{' '}
                  <span className="font-mono text-slate-700">{activeNetwork.estimatedConfirmations}</span>
                </div>
              </div>
            </div>

            {depositConfirmedBanner && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Deposit Notification Logged (Demo)</div>
                  <p className="mt-0.5">
                    Your simulated deposit notification on {activeNetwork.name} has been recorded as "{depositStatusText}".
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleConfirmMadeDeposit}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                I've Made the Deposit
              </button>
            </div>
          </div>
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 19. WITHDRAWAL PAGE
   * ============================================================================ */
  if (currentPage === 'withdraw') {
    const availableBalance = MOCK_DASHBOARD_METRICS.availableBalance;
    const selectedNetObj =
      MOCK_DEPOSIT_NETWORKS.find((n) => n.name === withdrawNetworkName) || MOCK_DEPOSIT_NETWORKS[1];
    const networkFee = selectedNetObj.withdrawalFeeUsdt;
    const parsedRequested = parseFloat(withdrawAmount) || 0;
    const estimatedReceived = Math.max(0, parsedRequested - networkFee);

    const handleInitiateWithdraw = (e: React.FormEvent) => {
      e.preventDefault();
      if (parsedRequested <= 0) {
        setWithdrawError('Please enter a valid withdrawal amount greater than 0 USDT.');
        return;
      }
      if (parsedRequested > availableBalance) {
        setWithdrawError(
          `Requested amount (${parsedRequested} USDT) exceeds your Available Balance (${availableBalance} USDT).`
        );
        return;
      }
      if (!withdrawAddress.trim() || withdrawAddress.trim().length < 10) {
        setWithdrawError('Please enter a valid destination USDT wallet address.');
        return;
      }
      setWithdrawError('');
      setShowWithdrawConfirmModal(true);
    };

    const handleConfirmWithdrawalModal = () => {
      const newRecord: WithdrawalRecord = {
        withdrawalId: `WDR-${Math.floor(51000 + Math.random() * 8999)}`,
        userId: user.accountId,
        userName: user.fullName,
        userEmail: user.email,
        amountUsdt: parsedRequested,
        networkFeeUsdt: networkFee,
        netAmountUsdt: estimatedReceived,
        network: withdrawNetworkName,
        walletAddress: withdrawAddress,
        requestedDate: '2026-10-08 10:45 UTC',
        ageHours: 0,
        status: 'Pending',
        eligibleFor72hCommitment: true,
      };
      setWithdrawals([newRecord, ...withdrawals]);
      setShowWithdrawConfirmModal(false);
      setWithdrawSuccessBanner(true);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No withdrawal requests yet."
        emptyDescription="Submit an eligible withdrawal request from your Available Balance above."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Capital Settlement</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">Demo Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Withdraw USDT</h1>
          </div>

          {/* 72-Hour Withdrawal Commitment Notice */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-white tracking-wide">
                  72-HOUR WITHDRAWAL COMMITMENT
                </div>
                <p className="text-slate-300">
                  Eligible withdrawal requests are targeted to be processed within 72 hours. If an eligible withdrawal request is not processed within 72 hours, Vaulta will provide compensation of $500, subject to the applicable Guarantee Terms.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('guarantee-terms')}
              className="text-xs font-semibold text-sky-400 hover:underline whitespace-nowrap cursor-pointer"
            >
              Guarantee Terms →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Withdrawal Form */}
            <form
              onSubmit={handleInitiateWithdraw}
              className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
              noValidate
            >
              <h2 className="text-base font-semibold text-slate-900">Withdrawal Request Form</h2>

              {withdrawError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {withdrawError}
                </div>
              )}

              {withdrawSuccessBanner && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Withdrawal request submitted (Demo Status: Pending). Track its progress in the table below.
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Amount (USDT)</label>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount(String(availableBalance))}
                    className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                  >
                    Max Available: {availableBalance} USDT
                  </button>
                </div>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  USDT Network
                </label>
                <select
                  value={withdrawNetworkName}
                  onChange={(e) =>
                    setWithdrawNetworkName(e.target.value as 'Network A' | 'Network B' | 'Network C')
                  }
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-700"
                >
                  <option value="Network A">Network A (Fee: 2.00 USDT)</option>
                  <option value="Network B">Network B (Fee: 1.00 USDT)</option>
                  <option value="Network C">Network C (Fee: 0.50 USDT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  placeholder="Enter destination USDT wallet address"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Review & Submit Withdrawal
              </button>
            </form>

            {/* Live Calculation Summary Box */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
                Settlement Breakdown
              </h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Available Balance</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Requested Amount</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {parsedRequested.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Network Fee ({withdrawNetworkName})</span>
                  <span className="font-mono text-slate-700 tabular-nums">
                    -{networkFee.toFixed(2)} USDT
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-semibold text-slate-900">Estimated Amount Received</span>
                  <span className="text-lg font-mono font-bold text-emerald-700 tabular-nums">
                    {estimatedReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="font-semibold text-slate-700">Supported Status Stages:</div>
                <p>Pending · Under Review · Processing · Completed · Rejected</p>
              </div>
            </div>
          </div>

          {/* User Withdrawal History */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Recent Withdrawal Requests</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-5">Withdrawal ID</th>
                    <th className="py-3 px-5">Network</th>
                    <th className="py-3 px-5 text-right">Requested</th>
                    <th className="py-3 px-5 text-right">Net Received</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {withdrawals.map((w) => (
                    <tr key={w.withdrawalId} className="hover:bg-slate-50">
                      <td className="py-3 px-5 font-mono font-semibold text-slate-900">{w.withdrawalId}</td>
                      <td className="py-3 px-5">{w.network}</td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums">
                        {w.amountUsdt.toFixed(2)} USDT
                      </td>
                      <td className="py-3 px-5 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {w.netAmountUsdt.toFixed(2)} USDT
                      </td>
                      <td className="py-3 px-5 font-mono text-slate-500 tabular-nums">{w.requestedDate}</td>
                      <td className="py-3 px-5">
                        <StatusText status={w.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mandatory Confirmation Modal */}
          {showWithdrawConfirmModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Confirm Withdrawal Details</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Please verify that the wallet address and selected network are correct. Blockchain transactions may not be reversible.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Network:</span>
                    <span className="font-mono font-semibold text-slate-900">{withdrawNetworkName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Requested Amount:</span>
                    <span className="font-mono font-semibold text-slate-900">{parsedRequested.toFixed(2)} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Received:</span>
                    <span className="font-mono font-bold text-emerald-700">{estimatedReceived.toFixed(2)} USDT</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-slate-500 mb-0.5">Destination Address:</div>
                    <div className="font-mono text-[11px] text-slate-900 break-all">{withdrawAddress}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawConfirmModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmWithdrawalModal}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
                  >
                    Confirm & Submit (Demo)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 20. TRANSACTION HISTORY PAGE
   * ============================================================================ */
  if (currentPage === 'transactions') {
    const filterTabs = ['All', 'Deposits', 'Withdrawals', 'Returns', 'Referral Rewards'];
    const filteredTx: TransactionRecord[] = MOCK_USER_TRANSACTIONS.filter((t) => {
      const matchesTab =
        txFilter === 'All' ||
        (txFilter === 'Deposits' && t.type === 'Deposit') ||
        (txFilter === 'Withdrawals' && t.type === 'Withdrawal') ||
        (txFilter === 'Returns' && t.type === 'Return') ||
        (txFilter === 'Referral Rewards' && t.type === 'Referral Reward');

      const matchesSearch =
        t.transactionId.toLowerCase().includes(txSearch.toLowerCase()) ||
        t.type.toLowerCase().includes(txSearch.toLowerCase()) ||
        (t.referenceNote || '').toLowerCase().includes(txSearch.toLowerCase());

      return matchesTab && matchesSearch;
    });

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No transactions yet."
        emptyDescription="Your deposits, withdrawals, investments, weekly returns, and referral rewards will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Account Ledger</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">Demo Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Transactions</h1>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTxFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    txFilter === tab
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={txSearch}
                onChange={(e) => setTxSearch(e.target.value)}
                placeholder="Search Transaction ID or type..."
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-5">Transaction ID</th>
                  <th className="py-3.5 px-5">Type</th>
                  <th className="py-3.5 px-5 text-right">Amount</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredTx.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No transactions matched your current filter.
                    </td>
                  </tr>
                ) : (
                  filteredTx.map((tx) => (
                    <tr key={tx.transactionId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">
                        {tx.transactionId}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-800">{tx.type}</div>
                        {tx.referenceNote && (
                          <div className="text-[11px] text-slate-500">{tx.referenceNote}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {tx.type === 'Withdrawal' ? '-' : '+'}
                        {tx.amountUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{tx.date}</td>
                      <td className="py-3.5 px-5">
                        <StatusText status={tx.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredTx.map((tx) => (
              <div key={tx.transactionId} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{tx.transactionId}</span>
                  <StatusText status={tx.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{tx.type}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {tx.amountUsdt.toLocaleString('en-US')} USDT
                  </span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">{tx.date}</div>
              </div>
            ))}
          </div>
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 21 & 22. REFERRAL PROGRAM & REFERRAL HISTORY PAGE
   * ============================================================================ */
  if (currentPage === 'user-referrals') {
    const stats = MOCK_REFERRAL_STATS;
    const history: ReferralRecord[] = MOCK_REFERRAL_HISTORY;

    const copyId = () => {
      navigator.clipboard?.writeText(stats.referralId);
      setCopiedRefId(true);
      setTimeout(() => setCopiedRefId(false), 2000);
    };

    const copyLink = () => {
      navigator.clipboard?.writeText(stats.referralUrl);
      setCopiedRefLink(true);
      setTimeout(() => setCopiedRefLink(false), 2000);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No referrals yet."
        emptyDescription="Share your Referral ID or Referral Link below to invite eligible investors."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Referral Center</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">Demo Data</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Grow With Vaulta</h1>
          </div>

          {/* Referral ID & Referral Link Card */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Your Referral ID</div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-base font-bold text-white">
                  {stats.referralId}
                </div>
                <button
                  type="button"
                  onClick={copyId}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 cursor-pointer whitespace-nowrap"
                >
                  {copiedRefId ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRefId ? 'Copied ID' : 'Copy Referral ID'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400">Referral URL</div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-slate-200 truncate">
                  {stats.referralUrl}
                </div>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-600 cursor-pointer whitespace-nowrap"
                >
                  {copiedRefLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRefLink ? 'Copied Link' : 'Copy Referral Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Referral Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-xs text-slate-500">Total Referrals</div>
              <div className="text-2xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
                {stats.totalReferrals}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-xs text-slate-500">Active Referrals</div>
              <div className="text-2xl font-mono font-bold text-emerald-700 mt-1 tabular-nums">
                {stats.activeReferrals}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-xs text-slate-500">Referral Investment Volume</div>
              <div className="text-2xl font-mono font-bold text-slate-900 mt-1 tabular-nums">
                {stats.referralInvestmentVolumeUsdt.toLocaleString('en-US')} USDT
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-xs text-slate-500">Referral Earnings</div>
              <div className="text-2xl font-mono font-bold text-emerald-700 mt-1 tabular-nums">
                {stats.referralEarningsUsdt.toLocaleString('en-US')} USDT
              </div>
            </div>
          </div>

          {/* Referral Reward & Percentage-Point Boost Explanation */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-slate-900">Referral Program Structure</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Earn a referral reward when an eligible user joins Vaulta through your referral ID and makes an eligible investment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-mono font-semibold text-blue-700">DIRECT INVESTMENT REWARD</div>
                <div className="text-sm font-bold text-slate-900">
                  5% referral reward on the eligible investment amount.
                </div>
                <p className="text-xs text-slate-500">
                  Credited to your Referral Earnings balance upon eligible investment activation.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-xs font-mono font-semibold text-emerald-700">WEEKLY RETURN RATE BOOST</div>
                <div className="text-sm font-bold text-slate-900">
                  0.05 percentage-point weekly return boost per eligible referral.
                </div>
                <p className="text-xs text-slate-500">
                  Added in percentage points directly to your weekly return rate (not a multiplier).
                </p>
              </div>
            </div>

            {/* Required Example UI: 1, 2, 3 Eligible Referrals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {MOCK_REFERRAL_BOOST_TIERS.map((tier) => (
                <div key={tier.eligibleReferrals} className="p-4 rounded-lg border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500 font-medium">
                    {tier.eligibleReferrals} eligible {tier.eligibleReferrals === 1 ? 'referral' : 'referrals'}
                  </div>
                  <div className="text-base font-mono font-bold text-emerald-700 mt-1 tabular-nums">
                    {tier.boostLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 22: Referral History Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Referral History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-5">Referral ID</th>
                    <th className="py-3 px-5">User</th>
                    <th className="py-3 px-5">Join Date</th>
                    <th className="py-3 px-5 text-right">Investment</th>
                    <th className="py-3 px-5 text-right">Reward</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {history.map((r) => (
                    <tr key={r.referralId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">{r.referralId}</td>
                      <td className="py-3.5 px-5 text-slate-800">{r.referredUserCode}</td>
                      <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{r.joinDate}</td>
                      <td className="py-3.5 px-5 text-right font-mono tabular-nums">
                        {r.investmentAmountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                        {r.rewardAmountUsdt > 0 ? `+${r.rewardAmountUsdt} USDT` : '0 USDT'}
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusText status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StateWrapper>
    );
  }

  /* ============================================================================
   * 23. PROFILE PAGE
   * ============================================================================ */
  if (currentPage === 'profile') {
    const handleSaveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      onUpdateUser({ fullName: editName, country: editCountry });
      setEditingProfile(false);
      setProfileSavedMsg('Profile details updated in demo session.');
      setTimeout(() => setProfileSavedMsg(''), 3000);
    };

    const handleSavePassword = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPwd || newPwd.length < 8 || newPwd !== confirmPwd) {
        setPwdMsg('Please enter matching passwords of at least 8 characters.');
        return;
      }
      setChangingPassword(false);
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setProfileSavedMsg('Password updated successfully (Demo).');
      setTimeout(() => setProfileSavedMsg(''), 3000);
    };

    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Account Identity</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Profile</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setEditingProfile(!editingProfile);
                setChangingPassword(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setChangingPassword(!changingPassword);
                setEditingProfile(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>

        {profileSavedMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{profileSavedMsg}</span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900">{user.fullName}</h2>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <div className="text-slate-500">Full Name</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{user.fullName}</div>
            </div>
            <div>
              <div className="text-slate-500">Email</div>
              <div className="text-sm font-mono text-slate-900 mt-1">{user.email}</div>
            </div>
            <div>
              <div className="text-slate-500">Country</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">{user.country}</div>
            </div>
            <div>
              <div className="text-slate-500">Account ID</div>
              <div className="text-sm font-mono font-semibold text-slate-900 mt-1">{user.accountId}</div>
            </div>
            <div>
              <div className="text-slate-500">Referral ID (Immutable)</div>
              <div className="text-sm font-mono font-semibold text-blue-700 mt-1">{user.referralId}</div>
            </div>
            <div>
              <div className="text-slate-500">Account Created</div>
              <div className="text-sm font-mono text-slate-900 mt-1 tabular-nums">{user.accountCreated}</div>
            </div>
            <div>
              <div className="text-slate-500">Email Verification Status</div>
              <div className="mt-1">
                <StatusText status={user.emailVerified ? 'Verified' : 'Pending Verification'} />
              </div>
            </div>
          </div>
        </div>

        {editingProfile && (
          <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900">Edit Profile Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProfile(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {changingPassword && (
          <form onSubmit={handleSavePassword} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900">Change Account Password</h3>
            {pwdMsg && <div className="text-xs text-red-700">{pwdMsg}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setChangingPassword(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  /* ============================================================================
   * 24. SECURITY SETTINGS PAGE
   * ============================================================================ */
  if (currentPage === 'security-settings') {
    return (
      <div className="max-w-4xl space-y-6">
        <div>
          <div className="text-xs text-slate-500">Protection & Access</div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Security Settings</h1>
        </div>

        {/* 1. Email Verification & 2. Change Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Email Verification</h2>
              <StatusText status="Verified" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your registered email (<span className="font-mono">{user.email}</span>) is verified for account notifications and withdrawal confirmations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Change Password</h2>
              <p className="text-xs text-slate-600 mt-1">
                Rotate your account password periodically to maintain strong credential hygiene.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Open Password Form
              </button>
            </div>
          </div>
        </div>

        {/* 3. Two-Factor Authentication (UI Placeholder State Only) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-700" />
              <h2 className="text-base font-semibold text-slate-900">
                Two-Factor Authentication (UI Placeholder)
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Protect logins and withdrawal requests with an authenticator app (TOTP). This control is a frontend UI placeholder ready to connect to backend 2FA verification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusText status={twoFactorPlaceholderEnabled ? 'Active (Demo Placeholder)' : 'Pending Setup'} />
            <button
              type="button"
              onClick={() => setTwoFactorPlaceholderEnabled(!twoFactorPlaceholderEnabled)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer whitespace-nowrap"
            >
              {twoFactorPlaceholderEnabled ? 'Disable 2FA Preview' : 'Configure 2FA (Demo)'}
            </button>
          </div>
        </div>

        {/* 4. Login Sessions */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Login Sessions</h2>
          <div className="divide-y divide-slate-100">
            {sessions.map((ses) => (
              <div key={ses.sessionId} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <Laptop className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">
                      {ses.device} · {ses.browser}
                    </div>
                    <div className="text-slate-500 font-mono mt-0.5">
                      {ses.location} · IP {ses.ipAddress} · {ses.lastActive}
                    </div>
                  </div>
                </div>
                <div>
                  {ses.isCurrent ? (
                    <span className="text-xs font-semibold text-emerald-700">Current Session</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSessions(sessions.filter((s) => s.sessionId !== ses.sessionId))}
                      className="text-xs font-semibold text-red-700 hover:underline cursor-pointer"
                    >
                      Revoke Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Security Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Security Notifications</h2>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between py-2 border-b border-slate-100 cursor-pointer">
              <div>
                <div className="font-semibold text-slate-900">New Device Login Alerts</div>
                <div className="text-slate-500">Receive an email alert whenever a new IP or browser signs in</div>
              </div>
              <input
                type="checkbox"
                checked={secNotifLogin}
                onChange={(e) => setSecNotifLogin(e.target.checked)}
                className="rounded border-slate-300 text-blue-700"
              />
            </label>
            <label className="flex items-center justify-between py-2 border-b border-slate-100 cursor-pointer">
              <div>
                <div className="font-semibold text-slate-900">Withdrawal Request Dispatches</div>
                <div className="text-slate-500">Immediate notification when a USDT withdrawal is requested or updated</div>
              </div>
              <input
                type="checkbox"
                checked={secNotifWithdraw}
                onChange={(e) => setSecNotifWithdraw(e.target.checked)}
                className="rounded border-slate-300 text-blue-700"
              />
            </label>
            <label className="flex items-center justify-between py-2 cursor-pointer">
              <div>
                <div className="font-semibold text-slate-900">Weekly Return Settlement Notices</div>
                <div className="text-slate-500">Notify when weekly investment returns are credited to Available Balance</div>
              </div>
              <input
                type="checkbox"
                checked={secNotifWeeklyReturn}
                onChange={(e) => setSecNotifWeeklyReturn(e.target.checked)}
                className="rounded border-slate-300 text-blue-700"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================================
   * 25. SUPPORT PAGE
   * ============================================================================ */
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    const newTck: SupportTicket = {
      ticketId: `TCK-${Math.floor(2100 + Math.random() * 899)}`,
      userId: user.accountId,
      userName: user.fullName,
      subject: ticketSubject,
      category: ticketCategory,
      message: ticketMessage,
      createdAt: 'Just now (Demo)',
      updatedAt: 'Just now (Demo)',
      status: 'Open',
    };
    setTickets([newTck, ...tickets]);
    setTicketSubject('');
    setTicketMessage('');
    setTicketSubmittedMsg(`Support ticket ${newTck.ticketId} submitted with status "Open".`);
    setTimeout(() => setTicketSubmittedMsg(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs text-slate-500">Client Assistance</div>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Support Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submit Ticket Form */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Submit Ticket</h2>
          <p className="text-xs text-slate-500">
            Contact Support directly from your client portal. Supported statuses: Open, In Progress, Resolved, Closed.
          </p>

          {ticketSubmittedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{ticketSubmittedMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Brief summary of your request"
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value as SupportTicket['category'])}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-700"
              >
                <option value="Deposits & Networks">Deposits & Networks</option>
                <option value="Withdrawals & 72h Commitment">Withdrawals & 72h Commitment</option>
                <option value="Investments & Returns">Investments & Returns</option>
                <option value="Referral Program">Referral Program</option>
                <option value="Account & Security">Account & Security</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Include relevant Investment ID, Withdrawal ID, or Referral ID..."
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-700"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Support Ticket</span>
            </button>
          </form>
        </div>

        {/* Contact Support & Quick FAQ Accordion */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h2 className="text-base font-semibold text-slate-900">Contact Support</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our institutional client desk monitors support tickets 24/7. For urgent withdrawal address corrections while a request is still in Pending status, reference your Withdrawal ID in the subject line.
            </p>
            <div className="text-xs font-mono text-slate-700 pt-1">
              Direct Email (Demo): support@vaulta-demo.com
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Frequently Asked Questions</h2>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Full FAQ Page →
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_FAQ_ITEMS.slice(3, 8).map((item) => {
                const open = openSupportFaq === item.id;
                return (
                  <div key={item.id} className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setOpenSupportFaq(open ? null : item.id)}
                      className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-900 py-1 cursor-pointer"
                    >
                      <span>{item.question}</span>
                      {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {open && <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Support Tickets History */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Your Support Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="py-3 px-5">Ticket ID</th>
                <th className="py-3 px-5">Subject</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Updated</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {tickets.map((t) => (
                <tr key={t.ticketId} className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">{t.ticketId}</td>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-slate-900">{t.subject}</div>
                    {t.lastReply && <div className="text-[11px] text-slate-500 mt-0.5">{t.lastReply}</div>}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">{t.category}</td>
                  <td className="py-3.5 px-5 font-mono text-slate-500">{t.updatedAt}</td>
                  <td className="py-3.5 px-5">
                    <StatusText status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
