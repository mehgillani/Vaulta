import { UserProfile, LoginSession, NotificationItem, AdminUserRecord, AdminOverviewMetrics } from '../types';
import executiveAvatar from '../assets/images/avatar_executive_user_1791481314791.jpg';

/**
 * DEMO DATA NOTICE:
 * Centralized mock user profiles, sessions, and admin records for frontend demonstration.
 * Replace with authenticated backend API responses before production deployment.
 */

export const MOCK_CURRENT_USER: UserProfile = {
  accountId: 'VLT-ACC-904821',
  fullName: 'Alexander Lindqvist',
  email: 'a.lindqvist@nordiccapital-demo.ch',
  country: 'Switzerland',
  referralId: 'VLT-8F3K92',
  referredBy: 'VLT-2A9M10',
  accountCreated: '2026-04-12',
  emailVerified: true,
  accountStatus: 'Active',
  twoFactorEnabled: false,
  avatarUrl: executiveAvatar,
};

export const MOCK_LOGIN_SESSIONS: LoginSession[] = [
  {
    sessionId: 'SES-9941',
    device: 'MacBook Pro 16" (macOS Sequoia)',
    browser: 'Chrome 134.0',
    location: 'Zurich, Switzerland',
    ipAddress: '185.42.190.14',
    lastActive: 'Active now',
    isCurrent: true,
  },
  {
    sessionId: 'SES-9810',
    device: 'iPhone 16 Pro (iOS 19.2)',
    browser: 'Safari Mobile',
    location: 'Zurich, Switzerland',
    ipAddress: '185.42.190.88',
    lastActive: '2026-10-07 19:42 UTC',
    isCurrent: false,
  },
  {
    sessionId: 'SES-9604',
    device: 'ThinkPad X1 Carbon (Windows 11)',
    browser: 'Edge 133.0',
    location: 'Geneva, Switzerland',
    ipAddress: '194.230.148.22',
    lastActive: '2026-10-01 09:15 UTC',
    isCurrent: false,
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Weekly Return Credited (Demo)',
    description: '500.00 USDT weekly return from Premium Plan INV-4092 credited to Available Balance.',
    timestamp: '2 hours ago',
    read: false,
    category: 'return',
  },
  {
    id: 'NOTIF-02',
    title: 'Referral Eligibility Confirmed',
    description: 'Referral VLT-REF-309 (M. Vance) completed a 1,000 USDT Starter allocation (+50 USDT reward).',
    timestamp: '1 day ago',
    read: false,
    category: 'referral',
  },
  {
    id: 'NOTIF-03',
    title: 'New Login Session Verified',
    description: 'Authenticated login recognized from Zurich, Switzerland (185.42.190.14).',
    timestamp: '3 days ago',
    read: true,
    category: 'security',
  },
];

export const MOCK_ADMIN_OVERVIEW: AdminOverviewMetrics = {
  totalUsers: 10482,
  verifiedUsers: 9840,
  totalInvestmentVolumeUsdt: 25480000,
  totalDepositsUsdt: 27150000,
  totalWithdrawalsUsdt: 4820000,
  pendingWithdrawalsUsdt: 48500,
  pendingWithdrawalsCount: 6,
  referralRewardsUsdt: 612500,
};

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [
  {
    accountId: 'VLT-ACC-904821',
    fullName: 'Alexander Lindqvist',
    email: 'a.lindqvist@nordiccapital-demo.ch',
    country: 'Switzerland',
    accountStatus: 'Active',
    emailVerified: true,
    joinedDate: '2026-04-12',
    totalInvestedUsdt: 10000,
    totalDepositedUsdt: 11000,
    totalWithdrawnUsdt: 1150,
    referralCount: 5,
    referralCode: 'VLT-8F3K92',
  },
  {
    accountId: 'VLT-ACC-905104',
    fullName: 'Elena Rostova',
    email: 'e.rostova@balticventures-demo.ee',
    country: 'Estonia',
    accountStatus: 'Active',
    emailVerified: true,
    joinedDate: '2026-05-19',
    totalInvestedUsdt: 15000,
    totalDepositedUsdt: 15000,
    totalWithdrawnUsdt: 2250,
    referralCount: 3,
    referralCode: 'VLT-4C9N18',
  },
  {
    accountId: 'VLT-ACC-906332',
    fullName: 'Marcus Vance',
    email: 'mvance@kensington-demo.co.uk',
    country: 'United Kingdom',
    accountStatus: 'Active',
    emailVerified: true,
    joinedDate: '2026-07-03',
    totalInvestedUsdt: 6000,
    totalDepositedUsdt: 6500,
    totalWithdrawnUsdt: 600,
    referralCount: 1,
    referralCode: 'VLT-7B2P44',
  },
  {
    accountId: 'VLT-ACC-907890',
    fullName: 'Kenji Takahashi',
    email: 'k.takahashi@minato-demo.jp',
    country: 'Japan',
    accountStatus: 'Pending Verification',
    emailVerified: false,
    joinedDate: '2026-10-04',
    totalInvestedUsdt: 0,
    totalDepositedUsdt: 1000,
    totalWithdrawnUsdt: 0,
    referralCount: 0,
    referralCode: 'VLT-9L5T71',
  },
  {
    accountId: 'VLT-ACC-903118',
    fullName: 'Dominic Mercier',
    email: 'd.mercier@rhone-demo.fr',
    country: 'France',
    accountStatus: 'Suspended',
    emailVerified: true,
    joinedDate: '2026-03-08',
    totalInvestedUsdt: 5000,
    totalDepositedUsdt: 5000,
    totalWithdrawnUsdt: 250,
    referralCount: 0,
    referralCode: 'VLT-1X6W80',
  },
  {
    accountId: 'VLT-ACC-908012',
    fullName: 'Sofia Al-Mansoor',
    email: 's.almansoor@difc-demo.ae',
    country: 'United Arab Emirates',
    accountStatus: 'Active',
    emailVerified: true,
    joinedDate: '2026-08-21',
    totalInvestedUsdt: 20000,
    totalDepositedUsdt: 20000,
    totalWithdrawnUsdt: 3000,
    referralCount: 4,
    referralCode: 'VLT-5K8R29',
  },
];
