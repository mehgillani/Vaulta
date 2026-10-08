import React, { useState } from 'react';
import {
  Search,
  Eye,
  X,
  CheckCircle2,
  XCircle,
  ShieldQuestion,
  Check,
} from 'lucide-react';
import {
  PageRoute,
  DataViewState,
  AdminUserRecord,
  WithdrawalRecord,
  WithdrawalStatus,
  TicketStatus,
  SupportTicket,
} from '../types';
import { MOCK_ADMIN_OVERVIEW, MOCK_ADMIN_USERS } from '../data/mockUsers';
import { MOCK_ADMIN_ALL_INVESTMENTS } from '../data/mockInvestments';
import { MOCK_ADMIN_DEPOSITS, MOCK_USER_TRANSACTIONS } from '../data/mockTransactions';
import { MOCK_REFERRAL_HISTORY } from '../data/mockReferrals';
import {
  MOCK_ADMIN_WITHDRAWALS,
  MOCK_SUPPORT_TICKETS,
  MOCK_AUDIT_LOGS,
} from '../data/mockWithdrawals';
import { StateWrapper, StatusText } from '../components/ui/StateWrapper';

interface AdminPagesProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  dataViewState: DataViewState;
  onResetDataViewState: () => void;
}

export const AdminPages: React.FC<AdminPagesProps> = ({
  currentPage,
  onNavigate,
  dataViewState,
  onResetDataViewState,
}) => {
  // Admin Users state
  const [users, setUsers] = useState<AdminUserRecord[]>(MOCK_ADMIN_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<string>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  // Admin Withdrawals state
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(MOCK_ADMIN_WITHDRAWALS);
  const [withdrawalFilter, setWithdrawalFilter] = useState<string>('All');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRecord | null>(null);
  const [adminActionBanner, setAdminActionBanner] = useState<string>('');

  // Admin Support Tickets state
  const [adminTickets, setAdminTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);

  // Admin Audit Log search
  const [auditSearch, setAuditSearch] = useState('');

  // Admin Settings state
  const [settingSlaHours, setSettingSlaHours] = useState('72');
  const [settingCompAmount, setSettingCompAmount] = useState('500');
  const [settingRefRewardPct, setSettingRefRewardPct] = useState('5.0');
  const [settingRefBoostPts, setSettingRefBoostPts] = useState('0.05');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const triggerPlaceholderBanner = (message: string) => {
    setAdminActionBanner(message);
    setTimeout(() => setAdminActionBanner(''), 4000);
  };

  /* ============================================================================
   * 28. ADMIN DASHBOARD OVERVIEW
   * ============================================================================ */
  if (currentPage === 'admin-overview') {
    const ov = MOCK_ADMIN_OVERVIEW;
    const overviewCards = [
      { label: 'Total Users', value: ov.totalUsers.toLocaleString('en-US') },
      { label: 'Verified Users', value: ov.verifiedUsers.toLocaleString('en-US') },
      { label: 'Total Investment Volume', value: `${ov.totalInvestmentVolumeUsdt.toLocaleString('en-US')} USDT` },
      { label: 'Total Deposits', value: `${ov.totalDepositsUsdt.toLocaleString('en-US')} USDT` },
      { label: 'Total Withdrawals', value: `${ov.totalWithdrawalsUsdt.toLocaleString('en-US')} USDT` },
      { label: 'Pending Withdrawals', value: `${ov.pendingWithdrawalsUsdt.toLocaleString('en-US')} USDT (${ov.pendingWithdrawalsCount})` },
      { label: 'Referral Rewards', value: `${ov.referralRewardsUsdt.toLocaleString('en-US')} USDT` },
    ];

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No platform metrics recorded."
        emptyDescription="Admin overview metrics will populate once backend telemetry is connected."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Operations Console (/admin)</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-800">UI Placeholder Demo Data</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Admin Overview</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('admin-withdrawals')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Manage Withdrawals
              </button>
              <button
                type="button"
                onClick={() => onNavigate('admin-audit-logs')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Audit Logs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewCards.map((c, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{c.label}</span>
                  <span className="text-amber-800 font-medium">Demo</span>
                </div>
                <div className="text-xl font-mono font-bold text-slate-900 tabular-nums">
                  {c.value}
                </div>
              </div>
            ))}
          </div>

          {/* Pending Withdrawals Queue Snapshot */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  72-Hour Withdrawal Queue Snapshot
                </h2>
                <p className="text-xs text-slate-500">
                  Monitor withdrawal requests by age and status
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('admin-withdrawals')}
                className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Open Full Withdrawal Queue →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-5">Withdrawal ID</th>
                    <th className="py-3 px-5">User</th>
                    <th className="py-3 px-5 text-right">Amount</th>
                    <th className="py-3 px-5">Age</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {withdrawals.slice(0, 4).map((w) => (
                    <tr key={w.withdrawalId} className="hover:bg-slate-50">
                      <td className="py-3 px-5 font-mono font-semibold text-slate-900">{w.withdrawalId}</td>
                      <td className="py-3 px-5">{w.userName}</td>
                      <td className="py-3 px-5 text-right font-mono font-semibold tabular-nums">
                        {w.amountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3 px-5 font-mono text-slate-600 tabular-nums">{w.ageHours}h / 72h</td>
                      <td className="py-3 px-5">
                        <StatusText status={w.status} />
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
   * 29. ADMIN USERS PAGE
   * ============================================================================ */
  if (currentPage === 'admin-users') {
    const statusTabs = ['All', 'Active', 'Suspended', 'Pending Verification'];
    const filteredUsers = users.filter((u) => {
      const matchesStatus = userStatusFilter === 'All' || u.accountStatus === userStatusFilter;
      const matchesSearch =
        u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.accountId.toLowerCase().includes(userSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    const handleChangeUserStatus = (
      accountId: string,
      newStatus: AdminUserRecord['accountStatus']
    ) => {
      const updated = users.map((u) =>
        u.accountId === accountId ? { ...u, accountStatus: newStatus } : u
      );
      setUsers(updated);
      if (selectedUser && selectedUser.accountId === accountId) {
        setSelectedUser({ ...selectedUser, accountStatus: newStatus });
      }
      triggerPlaceholderBanner(`UI Placeholder Action: Account ${accountId} set to "${newStatus}".`);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No registered users found."
        emptyDescription="User accounts will populate here once connected to the backend user directory."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Directory & Compliance</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Users Management</h1>
          </div>

          {adminActionBanner && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium">
              {adminActionBanner}
            </div>
          )}

          {/* Search & Status Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
              {statusTabs.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setUserStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    userStatusFilter === st
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search name, email, or Account ID..."
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-700"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">User / Account ID</th>
                    <th className="py-3.5 px-5">Country</th>
                    <th className="py-3.5 px-5">Verification</th>
                    <th className="py-3.5 px-5 text-right">Invested</th>
                    <th className="py-3.5 px-5">Account Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredUsers.map((u) => (
                    <tr key={u.accountId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-900">{u.fullName}</div>
                        <div className="font-mono text-[11px] text-slate-500">
                          {u.accountId} · {u.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-slate-700">{u.country}</td>
                      <td className="py-3.5 px-5">
                        <StatusText status={u.emailVerified ? 'Verified' : 'Pending Verification'} />
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {u.totalInvestedUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusText status={u.accountStatus} />
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(u)}
                          className="inline-flex items-center gap-1 text-blue-700 font-semibold hover:underline cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View User</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comprehensive User Inspector Modal (Account status, Verification, Investments, Deposits, Withdrawals, Referrals) */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500">{selectedUser.accountId}</div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedUser.fullName}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Account & Verification Status Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <div className="space-y-1">
                    <div className="text-slate-500">Account Status</div>
                    <StatusText status={selectedUser.accountStatus} />
                    <div className="flex items-center gap-1.5 pt-2">
                      {(['Active', 'Suspended', 'Pending Verification'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleChangeUserStatus(selectedUser.accountId, st)}
                          className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer ${
                            selectedUser.accountStatus === st
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">Verification Status</div>
                    <StatusText
                      status={selectedUser.emailVerified ? 'Verified Email' : 'Pending Verification'}
                    />
                    <div className="text-slate-500 pt-1 font-mono">
                      Joined: {selectedUser.joinedDate} · Ref Code: {selectedUser.referralCode}
                    </div>
                  </div>
                </div>

                {/* History Summaries: Investment, Deposit, Withdrawal, Referral */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 border border-slate-200 rounded-lg">
                    <div className="text-slate-500">Investment History</div>
                    <div className="text-sm font-mono font-bold text-slate-900 mt-1 tabular-nums">
                      {selectedUser.totalInvestedUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div className="p-3.5 border border-slate-200 rounded-lg">
                    <div className="text-slate-500">Deposit History</div>
                    <div className="text-sm font-mono font-bold text-slate-900 mt-1 tabular-nums">
                      {selectedUser.totalDepositedUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div className="p-3.5 border border-slate-200 rounded-lg">
                    <div className="text-slate-500">Withdrawal History</div>
                    <div className="text-sm font-mono font-bold text-slate-900 mt-1 tabular-nums">
                      {selectedUser.totalWithdrawnUsdt.toLocaleString('en-US')} USDT
                    </div>
                  </div>
                  <div className="p-3.5 border border-slate-200 rounded-lg">
                    <div className="text-slate-500">Referral Activity</div>
                    <div className="text-sm font-mono font-bold text-emerald-700 mt-1 tabular-nums">
                      {selectedUser.referralCount} Referrals
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                  >
                    Close User Record
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
   * 30. ADMIN WITHDRAWALS MANAGEMENT PAGE
   * ============================================================================ */
  if (currentPage === 'admin-withdrawals') {
    const statuses: ('All' | WithdrawalStatus)[] = [
      'All',
      'Pending',
      'Under Review',
      'Processing',
      'Completed',
      'Rejected',
    ];

    const filteredWithdrawals = withdrawals.filter(
      (w) => withdrawalFilter === 'All' || w.status === withdrawalFilter
    );

    const handleWithdrawalAction = (id: string, nextStatus: WithdrawalStatus, actionLabel: string) => {
      setWithdrawals(
        withdrawals.map((w) => (w.withdrawalId === id ? { ...w, status: nextStatus } : w))
      );
      triggerPlaceholderBanner(
        `UI Placeholder Action: Withdrawal ${id} marked as "${nextStatus}" (${actionLabel}). No real blockchain transaction occurred.`
      );
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No withdrawal requests in queue."
        emptyDescription="User withdrawal requests will appear here for administrative review."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Settlement Controls</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">
                UI Placeholders Only — No Real Transactions
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Withdrawal Management</h1>
          </div>

          {adminActionBanner && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium">
              {adminActionBanner}
            </div>
          )}

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-200/70 p-1 rounded-lg w-fit">
            {statuses.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setWithdrawalFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  withdrawalFilter === st
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Required Columns: Withdrawal ID, User, Amount, Wallet, Requested Date, Status, Age + Actions */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-4">Withdrawal ID</th>
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4 text-right">Amount</th>
                    <th className="py-3.5 px-4">Wallet</th>
                    <th className="py-3.5 px-4">Requested Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Age</th>
                    <th className="py-3.5 px-4 text-right">Actions (UI Placeholders)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredWithdrawals.map((w) => (
                    <tr key={w.withdrawalId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                        {w.withdrawalId}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{w.userName}</div>
                        <div className="text-[11px] font-mono text-slate-500">{w.userId}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                        {w.amountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 max-w-[160px] truncate">
                        {w.network}: {w.walletAddress}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                        {w.requestedDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusText status={w.status} />
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700 tabular-nums">
                        {w.ageHours}h
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedWithdrawal(w)}
                            className="px-2 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleWithdrawalAction(w.withdrawalId, 'Completed', 'Approve')
                            }
                            className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100 cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleWithdrawalAction(w.withdrawalId, 'Rejected', 'Reject')
                            }
                            className="px-2 py-1 text-[11px] font-semibold text-red-800 bg-red-50 border border-red-200 rounded hover:bg-red-100 cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleWithdrawalAction(
                                w.withdrawalId,
                                'Under Review',
                                'Request Verification'
                              )
                            }
                            className="px-2 py-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 cursor-pointer whitespace-nowrap"
                          >
                            Request Verification
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedWithdrawal && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-mono">
                    Withdrawal {selectedWithdrawal.withdrawalId}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedWithdrawal(null)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">User:</span>
                    <span className="font-semibold text-slate-900">{selectedWithdrawal.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Requested Amount:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedWithdrawal.amountUsdt} USDT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Network:</span>
                    <span className="font-mono text-slate-900">{selectedWithdrawal.network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Age Against 72h Target:</span>
                    <span className="font-mono text-slate-900">{selectedWithdrawal.ageHours} hours</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-slate-500 mb-1">Destination Wallet Address (Demo):</div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] break-all">
                      {selectedWithdrawal.walletAddress}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWithdrawal(null)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
                  >
                    Close
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
   * 31. ADMIN AUDIT LOG PAGE
   * ============================================================================ */
  if (currentPage === 'admin-audit-logs') {
    const filteredLogs = MOCK_AUDIT_LOGS.filter(
      (l) =>
        l.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
        l.admin.toLowerCase().includes(auditSearch.toLowerCase()) ||
        l.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
        l.transaction.toLowerCase().includes(auditSearch.toLowerCase())
    );

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No audit log entries recorded."
        emptyDescription="Administrative actions and security events will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500">Compliance & Security Ledger</div>
              <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Audit Logs</h1>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search admin, action, user..."
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4">Admin</th>
                    <th className="py-3.5 px-4">Action</th>
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Transaction</th>
                    <th className="py-3.5 px-4">IP</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredLogs.map((log) => (
                    <tr key={log.logId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                        {log.timestamp}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">{log.admin}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{log.action}</td>
                      <td className="py-3.5 px-4 text-slate-700">{log.user}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{log.transaction}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{log.ip}</td>
                      <td className="py-3.5 px-4">
                        <StatusText status={log.status} />
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
   * ADDITIONAL ADMIN PAGES: INVESTMENTS, DEPOSITS, TRANSACTIONS, REFERRALS, SUPPORT, SETTINGS
   * ============================================================================ */
  if (currentPage === 'admin-investments') {
    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No investments recorded."
        emptyDescription="Client investment plans will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Capital Allocations</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">All Platform Investments</h1>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">Investment ID</th>
                    <th className="py-3.5 px-5">User</th>
                    <th className="py-3.5 px-5">Plan</th>
                    <th className="py-3.5 px-5 text-right">Amount</th>
                    <th className="py-3.5 px-5 text-right">Weekly Return</th>
                    <th className="py-3.5 px-5">Start Date</th>
                    <th className="py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {MOCK_ADMIN_ALL_INVESTMENTS.map((inv) => (
                    <tr key={inv.investmentId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">
                        {inv.investmentId}
                      </td>
                      <td className="py-3.5 px-5 text-slate-800">{inv.userName}</td>
                      <td className="py-3.5 px-5 font-semibold">{inv.planName}</td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold tabular-nums">
                        {inv.amountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono text-emerald-700 tabular-nums">
                        {inv.weeklyReturnPercent}%
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{inv.startDate}</td>
                      <td className="py-3.5 px-5">
                        <StatusText status={inv.status} />
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

  if (currentPage === 'admin-deposits') {
    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No deposits recorded."
        emptyDescription="Inbound USDT deposits will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Inbound Transfers</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Deposits Ledger</h1>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">Deposit ID</th>
                    <th className="py-3.5 px-5">User</th>
                    <th className="py-3.5 px-5">Network</th>
                    <th className="py-3.5 px-5 text-right">Amount</th>
                    <th className="py-3.5 px-5">Demo TX Reference</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {MOCK_ADMIN_DEPOSITS.map((d) => (
                    <tr key={d.depositId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">{d.depositId}</td>
                      <td className="py-3.5 px-5 text-slate-800">{d.userName}</td>
                      <td className="py-3.5 px-5 font-mono">{d.network}</td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold tabular-nums">
                        {d.amountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-500">{d.txReference}</td>
                      <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{d.date}</td>
                      <td className="py-3.5 px-5">
                        <StatusText status={d.status} />
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

  if (currentPage === 'admin-transactions') {
    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No transactions recorded."
        emptyDescription="Global platform transactions will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Master Financial Ledger</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">All Transactions</h1>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">Transaction ID</th>
                    <th className="py-3.5 px-5">User</th>
                    <th className="py-3.5 px-5">Type</th>
                    <th className="py-3.5 px-5 text-right">Amount</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {MOCK_USER_TRANSACTIONS.map((tx) => (
                    <tr key={tx.transactionId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">
                        {tx.transactionId}
                      </td>
                      <td className="py-3.5 px-5 text-slate-800">{tx.userName}</td>
                      <td className="py-3.5 px-5 font-semibold">{tx.type}</td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold tabular-nums">
                        {tx.amountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-600 tabular-nums">{tx.date}</td>
                      <td className="py-3.5 px-5">
                        <StatusText status={tx.status} />
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

  if (currentPage === 'admin-referrals') {
    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No referrals recorded."
        emptyDescription="Referral attributions and rewards will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Attribution & Boost Ledger</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Referrals Administration</h1>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">Referral ID</th>
                    <th className="py-3.5 px-5">Referred User</th>
                    <th className="py-3.5 px-5">Referrer Code</th>
                    <th className="py-3.5 px-5 text-right">Investment</th>
                    <th className="py-3.5 px-5 text-right">5% Reward</th>
                    <th className="py-3.5 px-5 text-right">Weekly Boost</th>
                    <th className="py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {MOCK_REFERRAL_HISTORY.map((r) => (
                    <tr key={r.referralId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">
                        {r.referralId}
                      </td>
                      <td className="py-3.5 px-5 text-slate-800">{r.referredUserCode}</td>
                      <td className="py-3.5 px-5 font-mono text-blue-700">{r.referredByCode}</td>
                      <td className="py-3.5 px-5 text-right font-mono tabular-nums">
                        {r.investmentAmountUsdt.toLocaleString('en-US')} USDT
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                        {r.rewardAmountUsdt} USDT
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono text-slate-800 tabular-nums">
                        +{r.weeklyBoostContributionPoints.toFixed(2)} pct pts
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

  if (currentPage === 'admin-support') {
    const updateTicketStatus = (id: string, status: TicketStatus) => {
      setAdminTickets(
        adminTickets.map((t) => (t.ticketId === id ? { ...t, status } : t))
      );
      triggerPlaceholderBanner(`Support ticket ${id} updated to "${status}".`);
    };

    return (
      <StateWrapper
        state={dataViewState}
        emptyTitle="No support tickets in queue."
        emptyDescription="Client support tickets will appear here."
        onRetry={onResetDataViewState}
      >
        <div className="space-y-6">
          <div>
            <div className="text-xs text-slate-500">Client Desk Queue</div>
            <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Support Tickets</h1>
          </div>

          {adminActionBanner && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium">
              {adminActionBanner}
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-5">Ticket ID</th>
                    <th className="py-3.5 px-5">User</th>
                    <th className="py-3.5 px-5">Subject / Category</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {adminTickets.map((t) => (
                    <tr key={t.ticketId} className="hover:bg-slate-50">
                      <td className="py-3.5 px-5 font-mono font-semibold text-slate-900">{t.ticketId}</td>
                      <td className="py-3.5 px-5 text-slate-800">{t.userName}</td>
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-900">{t.subject}</div>
                        <div className="text-[11px] text-slate-500">{t.category}</div>
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusText status={t.status} />
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex gap-1">
                          {(['Open', 'In Progress', 'Resolved', 'Closed'] as TicketStatus[]).map(
                            (st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => updateTicketStatus(t.ticketId, st)}
                                className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer ${
                                  t.status === st
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {st}
                              </button>
                            )
                          )}
                        </div>
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
   * 35. ADMIN SETTINGS PAGE
   * ============================================================================ */
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="text-xs text-slate-500">System Parameters (UI Placeholder)</div>
        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Platform Settings</h1>
      </div>

      {settingsSaved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Demo configuration parameters saved in session state.</span>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-slate-900 border-b border-slate-100 pb-3">
          Withdrawal Commitment & Referral Program Parameters (Demo)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Target Withdrawal Processing Window (Hours)
            </label>
            <input
              type="text"
              value={settingSlaHours}
              onChange={(e) => setSettingSlaHours(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Eligible Delay Compensation Amount (USD)
            </label>
            <input
              type="text"
              value={settingCompAmount}
              onChange={(e) => setSettingCompAmount(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Direct Referral Reward (%)
            </label>
            <input
              type="text"
              value={settingRefRewardPct}
              onChange={(e) => setSettingRefRewardPct(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono text-sm"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Weekly Return Boost Per Eligible Referral (Percentage Points)
            </label>
            <input
              type="text"
              value={settingRefBoostPts}
              onChange={(e) => setSettingRefBoostPts(e.target.value)}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 3000);
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            Save Demo Settings
          </button>
        </div>
      </div>
    </div>
  );
};
