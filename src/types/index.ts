export type PageRoute =
  // Public Pages
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'investments'
  | 'referral'
  | 'security'
  | 'faq'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'risk-disclosure'
  | 'guarantee-terms'
  | 'referral-terms'
  // Auth Pages
  | 'login'
  | 'signup'
  | 'verify-email'
  | 'forgot-password'
  | 'reset-password'
  // User Dashboard Pages
  | 'dashboard'
  | 'my-investments'
  | 'deposit'
  | 'withdraw'
  | 'transactions'
  | 'user-referrals'
  | 'profile'
  | 'security-settings'
  | 'support'
  // Admin Pages
  | 'admin-overview'
  | 'admin-users'
  | 'admin-investments'
  | 'admin-deposits'
  | 'admin-withdrawals'
  | 'admin-transactions'
  | 'admin-referrals'
  | 'admin-support'
  | 'admin-audit-logs'
  | 'admin-settings';

export type DataViewState = 'populated' | 'loading' | 'empty' | 'error';

export type UserRole = 'guest' | 'user' | 'admin';

export interface UserProfile {
  accountId: string;
  fullName: string;
  email: string;
  country: string;
  referralId: string;
  referredBy?: string;
  accountCreated: string;
  emailVerified: boolean;
  accountStatus: 'Active' | 'Suspended' | 'Pending Verification';
  twoFactorEnabled: boolean;
  avatarUrl: string;
}

export interface DashboardMetrics {
  totalBalance: number;
  investedCapital: number;
  totalEarnings: number;
  availableBalance: number;
  pendingWithdrawal: number;
  referralEarnings: number;
  weeklyReturnRate: number;
  referralBoostPercentagePoints: number;
  isDemoData: boolean;
}

export type TimePeriod = '7D' | '1M' | '3M' | '6M' | '1Y';

export interface ChartDataPoint {
  label: string;
  portfolioValue: number;
  weeklyEarnings: number;
}

export interface InvestmentPlan {
  id: string;
  name: 'Starter' | 'Growth' | 'Premium';
  amountUsdt: number;
  weeklyReturnPercent: number;
  periodWeeks: number;
  estimatedWeeklyUsdt: number;
  estimatedTotalEarningsUsdt: number;
  status: 'Active investment' | 'Capacity Open' | 'Temporarily Closed';
  targetAudience: string;
  features: string[];
}

export type InvestmentStatus = 'Active' | 'Pending' | 'Completed';

export interface UserInvestment {
  investmentId: string;
  planName: string;
  userId: string;
  userName: string;
  amountUsdt: number;
  startDate: string;
  weeklyReturnPercent: number;
  currentEarningsUsdt: number;
  nextReturnDate: string;
  nextReturnAmountUsdt: number;
  status: InvestmentStatus;
  completedCycles: number;
  totalCycles: number;
}

export interface DepositNetwork {
  id: 'network-a' | 'network-b' | 'network-c';
  name: 'Network A' | 'Network B' | 'Network C';
  protocolLabel: string;
  demoWalletAddress: string;
  minimumDepositUsdt: number;
  estimatedConfirmations: string;
  withdrawalFeeUsdt: number;
}

export type DepositStatus = 'Awaiting Transfer' | 'Confirming on Network' | 'Completed' | 'Flagged';

export interface DepositRecord {
  depositId: string;
  userId: string;
  userName: string;
  amountUsdt: number;
  network: 'Network A' | 'Network B' | 'Network C';
  walletAddress: string;
  txReference: string;
  date: string;
  status: DepositStatus;
}

export type WithdrawalStatus =
  | 'Pending'
  | 'Under Review'
  | 'Processing'
  | 'Completed'
  | 'Rejected';

export interface WithdrawalRecord {
  withdrawalId: string;
  userId: string;
  userName: string;
  userEmail: string;
  amountUsdt: number;
  networkFeeUsdt: number;
  netAmountUsdt: number;
  network: 'Network A' | 'Network B' | 'Network C';
  walletAddress: string;
  requestedDate: string;
  ageHours: number;
  status: WithdrawalStatus;
  eligibleFor72hCommitment: boolean;
}

export type TransactionType =
  | 'Deposit'
  | 'Withdrawal'
  | 'Investment'
  | 'Return'
  | 'Referral Reward'
  | 'Adjustment';

export type TransactionStatus = 'Completed' | 'Pending' | 'Processing' | 'Rejected';

export interface TransactionRecord {
  transactionId: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amountUsdt: number;
  date: string;
  status: TransactionStatus;
  networkOrPlan?: string;
  referenceNote?: string;
}

export type ReferralStatus = 'Pending' | 'Eligible' | 'Rewarded' | 'Ineligible';

export interface ReferralStats {
  referralId: string;
  referralUrl: string;
  totalReferrals: number;
  activeReferrals: number;
  referralInvestmentVolumeUsdt: number;
  referralEarningsUsdt: number;
  directRewardPercent: number; // 5%
  weeklyBoostPerEligibleReferralPoints: number; // 0.05 percentage points
  currentWeeklyBoostPoints: number; // e.g. 0.15 percentage points
}

export interface ReferralRecord {
  referralId: string;
  referredUserCode: string;
  referredUserName: string;
  referredByCode: string;
  joinDate: string;
  investmentAmountUsdt: number;
  rewardAmountUsdt: number;
  weeklyBoostContributionPoints: number;
  status: ReferralStatus;
}

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface SupportTicket {
  ticketId: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'Deposits & Networks' | 'Withdrawals & 72h Commitment' | 'Investments & Returns' | 'Referral Program' | 'Account & Security';
  message: string;
  createdAt: string;
  updatedAt: string;
  status: TicketStatus;
  lastReply?: string;
}

export interface LoginSession {
  sessionId: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  category: 'return' | 'security' | 'withdrawal' | 'referral';
}

export interface AdminOverviewMetrics {
  totalUsers: number;
  verifiedUsers: number;
  totalInvestmentVolumeUsdt: number;
  totalDepositsUsdt: number;
  totalWithdrawalsUsdt: number;
  pendingWithdrawalsUsdt: number;
  pendingWithdrawalsCount: number;
  referralRewardsUsdt: number;
}

export interface AdminUserRecord {
  accountId: string;
  fullName: string;
  email: string;
  country: string;
  accountStatus: 'Active' | 'Suspended' | 'Pending Verification';
  emailVerified: boolean;
  joinedDate: string;
  totalInvestedUsdt: number;
  totalDepositedUsdt: number;
  totalWithdrawnUsdt: number;
  referralCount: number;
  referralCode: string;
}

export interface AuditLogEntry {
  logId: string;
  timestamp: string;
  admin: string;
  action: string;
  user: string;
  transaction: string;
  ip: string;
  status: 'Completed' | 'Flagged' | 'Verification Requested';
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Account & Security' | 'Deposits & Withdrawals' | 'Investments & Referrals';
  question: string;
  answer: string;
}
