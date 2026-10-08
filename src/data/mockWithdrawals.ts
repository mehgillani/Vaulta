import { WithdrawalRecord, SupportTicket, AuditLogEntry, FAQItem } from '../types';

/**
 * DEMO DATA NOTICE:
 * Withdrawal requests, support tickets, and admin audit logs below are mock data.
 * No real blockchain transfers are executed.
 */

export const MOCK_USER_WITHDRAWALS: WithdrawalRecord[] = [
  {
    withdrawalId: 'WDR-50419',
    userId: 'VLT-ACC-904821',
    userName: 'Alexander Lindqvist',
    userEmail: 'a.lindqvist@nordiccapital-demo.ch',
    amountUsdt: 750,
    networkFeeUsdt: 1.0,
    netAmountUsdt: 749.0,
    network: 'Network B',
    walletAddress: 'DEMO_NET_B_TV8xLmP49Kq2W7nJ5R3cZ9B1mY6F8dQ2sH',
    requestedDate: '2026-09-10 10:30 UTC',
    ageHours: 19,
    status: 'Completed',
    eligibleFor72hCommitment: true,
  },
  {
    withdrawalId: 'WDR-49802',
    userId: 'VLT-ACC-904821',
    userName: 'Alexander Lindqvist',
    userEmail: 'a.lindqvist@nordiccapital-demo.ch',
    amountUsdt: 400,
    networkFeeUsdt: 2.0,
    netAmountUsdt: 398.0,
    network: 'Network A',
    walletAddress: 'DEMO_NET_A_0x71C98A4D2F09B3E88412C6A90F1E5B44908A2B1C',
    requestedDate: '2026-08-14 15:20 UTC',
    ageHours: 24,
    status: 'Completed',
    eligibleFor72hCommitment: true,
  },
];

export const MOCK_ADMIN_WITHDRAWALS: WithdrawalRecord[] = [
  {
    withdrawalId: 'WDR-50912',
    userId: 'VLT-ACC-905104',
    userName: 'Elena Rostova',
    userEmail: 'e.rostova@balticventures-demo.ee',
    amountUsdt: 1250,
    networkFeeUsdt: 1.0,
    netAmountUsdt: 1249.0,
    network: 'Network B',
    walletAddress: 'DEMO_NET_B_TR9kPqM21Lw8X4vN6B5cZ1M3nY8F2dQ9pL',
    requestedDate: '2026-10-08 06:15 UTC',
    ageHours: 4,
    status: 'Pending',
    eligibleFor72hCommitment: true,
  },
  {
    withdrawalId: 'WDR-50908',
    userId: 'VLT-ACC-908012',
    userName: 'Sofia Al-Mansoor',
    userEmail: 's.almansoor@difc-demo.ae',
    amountUsdt: 2500,
    networkFeeUsdt: 2.0,
    netAmountUsdt: 2498.0,
    network: 'Network A',
    walletAddress: 'DEMO_NET_A_0x88B12F9E4A03C7D11520B6E99D4F3C22701A8B3D',
    requestedDate: '2026-10-07 18:40 UTC',
    ageHours: 16,
    status: 'Under Review',
    eligibleFor72hCommitment: true,
  },
  {
    withdrawalId: 'WDR-50895',
    userId: 'VLT-ACC-906332',
    userName: 'Marcus Vance',
    userEmail: 'mvance@kensington-demo.co.uk',
    amountUsdt: 600,
    networkFeeUsdt: 0.5,
    netAmountUsdt: 599.5,
    network: 'Network C',
    walletAddress: 'DEMO_NET_C_0x42A89D1C7F20E6B33910C5D77A2E1B00503C7F9E',
    requestedDate: '2026-10-07 09:00 UTC',
    ageHours: 26,
    status: 'Processing',
    eligibleFor72hCommitment: true,
  },
  {
    withdrawalId: 'WDR-50419',
    userId: 'VLT-ACC-904821',
    userName: 'Alexander Lindqvist',
    userEmail: 'a.lindqvist@nordiccapital-demo.ch',
    amountUsdt: 750,
    networkFeeUsdt: 1.0,
    netAmountUsdt: 749.0,
    network: 'Network B',
    walletAddress: 'DEMO_NET_B_TV8xLmP49Kq2W7nJ5R3cZ9B1mY6F8dQ2sH',
    requestedDate: '2026-09-10 10:30 UTC',
    ageHours: 19,
    status: 'Completed',
    eligibleFor72hCommitment: true,
  },
  {
    withdrawalId: 'WDR-50311',
    userId: 'VLT-ACC-903118',
    userName: 'Dominic Mercier',
    userEmail: 'd.mercier@rhone-demo.fr',
    amountUsdt: 500,
    networkFeeUsdt: 2.0,
    netAmountUsdt: 498.0,
    network: 'Network A',
    walletAddress: 'INVALID_DEMO_CHECKSUM_0x0000000000000000',
    requestedDate: '2026-09-02 14:10 UTC',
    ageHours: 11,
    status: 'Rejected',
    eligibleFor72hCommitment: false,
  },
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    ticketId: 'TCK-2049',
    userId: 'VLT-ACC-904821',
    userName: 'Alexander Lindqvist',
    subject: 'Confirmation of +0.15 percentage-point referral boost on INV-4092',
    category: 'Referral Program',
    message: 'Hello Vaulta team, I would like to confirm when my third eligible referral boost takes effect on my active Premium investment cycle.',
    createdAt: '2026-10-06 10:15 UTC',
    updatedAt: '2026-10-06 14:40 UTC',
    status: 'Resolved',
    lastReply: 'Confirmed: Your +0.15 percentage-point weekly boost is active and applies to the next scheduled weekly settlement.',
  },
  {
    ticketId: 'TCK-2081',
    userId: 'VLT-ACC-904821',
    userName: 'Alexander Lindqvist',
    subject: 'Documentation for institutional annual audit statement',
    category: 'Account & Security',
    message: 'Could you provide a downloadable CSV statement of my Q3 demo transactions for internal bookkeeping review?',
    createdAt: '2026-10-07 16:00 UTC',
    updatedAt: '2026-10-08 08:10 UTC',
    status: 'In Progress',
    lastReply: 'Our compliance reporting desk is preparing your Q3 account activity summary.',
  },
  {
    ticketId: 'TCK-2094',
    userId: 'VLT-ACC-907890',
    userName: 'Kenji Takahashi',
    subject: 'Network C deposit confirmation timing inquiry',
    category: 'Deposits & Networks',
    message: 'I submitted a 1,000 USDT deposit via Network C 20 minutes ago and wanted to check the confirmation status.',
    createdAt: '2026-10-08 08:05 UTC',
    updatedAt: '2026-10-08 08:05 UTC',
    status: 'Open',
  },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    logId: 'AUD-88421',
    timestamp: '2026-10-08 09:42:11 UTC',
    admin: 'compliance.lead@vaulta.com',
    action: 'Withdrawal Placed Under Review',
    user: 'Sofia Al-Mansoor (VLT-ACC-908012)',
    transaction: 'WDR-50908 (2,500 USDT)',
    ip: '10.240.18.92',
    status: 'Completed',
  },
  {
    logId: 'AUD-88418',
    timestamp: '2026-10-08 08:19:04 UTC',
    admin: 'treasury.ops@vaulta.com',
    action: 'Withdrawal Approved for Processing',
    user: 'Marcus Vance (VLT-ACC-906332)',
    transaction: 'WDR-50895 (600 USDT)',
    ip: '10.240.18.44',
    status: 'Completed',
  },
  {
    logId: 'AUD-88395',
    timestamp: '2026-10-07 17:05:39 UTC',
    admin: 'risk.officer@vaulta.com',
    action: 'Additional KYC Verification Requested',
    user: 'Kenji Takahashi (VLT-ACC-907890)',
    transaction: 'DEP-70618 (1,000 USDT)',
    ip: '10.240.19.12',
    status: 'Verification Requested',
  },
  {
    logId: 'AUD-88340',
    timestamp: '2026-10-05 11:20:00 UTC',
    admin: 'system.settlement@vaulta.com',
    action: 'Referral Reward Credited (5%)',
    user: 'Alexander Lindqvist (VLT-ACC-904821)',
    transaction: 'TXN-90719 (50 USDT)',
    ip: '10.240.0.10',
    status: 'Completed',
  },
  {
    logId: 'AUD-88112',
    timestamp: '2026-09-02 14:22:18 UTC',
    admin: 'treasury.ops@vaulta.com',
    action: 'Withdrawal Rejected (Invalid Address Format)',
    user: 'Dominic Mercier (VLT-ACC-903118)',
    transaction: 'WDR-50311 (500 USDT)',
    ip: '10.240.18.44',
    status: 'Flagged',
  },
];

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Vaulta?',
    answer:
      'Vaulta is a modern digital investment platform designed to provide users with a clean, structured interface to manage USDT allocations, monitor weekly return schedules, process deposits and withdrawals, and participate in an institutional-style referral program. Note: This web interface currently operates in frontend demonstration mode with mock data.',
  },
  {
    id: 'faq-2',
    category: 'Account & Security',
    question: 'How do I create an account?',
    answer:
      'Select "Get Started" in the top navigation bar, enter your full name, email address, a strong password, and an optional Referral ID, then accept the Terms & Conditions and Privacy Policy. After submitting the registration form, you will be prompted to verify your email address.',
  },
  {
    id: 'faq-3',
    category: 'Account & Security',
    question: 'How do I verify my email?',
    answer:
      'Immediately upon registration, Vaulta dispatches a verification link to your registered email address. Click the verification link in that message (or use the interactive verification confirmation button in this demo environment) to activate full dashboard access.',
  },
  {
    id: 'faq-4',
    category: 'Deposits & Withdrawals',
    question: 'How do I deposit USDT?',
    answer:
      'Navigate to the Deposit page inside your dashboard, select USDT and your preferred transfer network (Network A, Network B, or Network C), copy the displayed wallet address or scan the QR code, and initiate the transfer from your external wallet. Always ensure the network selected in your external wallet matches the network selected on Vaulta.',
  },
  {
    id: 'faq-5',
    category: 'Deposits & Withdrawals',
    question: 'How do withdrawals work?',
    answer:
      'On the Withdraw page, enter the USDT amount you wish to withdraw from your Available Balance, select the target USDT network, and provide your destination wallet address. You will see the applicable network fee and estimated net amount before confirming the request in a verification modal.',
  },
  {
    id: 'faq-6',
    category: 'Deposits & Withdrawals',
    question: 'How long do withdrawals take?',
    answer:
      'Eligible withdrawal requests are targeted to be processed within 72 hours after submission and required security checks. You can track the live status of every request (Pending, Under Review, Processing, Completed, or Rejected) directly from your Withdrawals and Transactions pages.',
  },
  {
    id: 'faq-7',
    category: 'Investments & Referrals',
    question: 'What is the referral program?',
    answer:
      'The Vaulta Referral Program ("Grow With Vaulta") rewards users who invite eligible participants. When an eligible user registers using your Referral ID and activates an eligible investment, you receive a 5% referral reward on their eligible investment amount, plus a +0.05 percentage-point weekly return boost per eligible referral (for example, 1 eligible referral adds +0.05 percentage points; 2 add +0.10 percentage points; 3 add +0.15 percentage points).',
  },
  {
    id: 'faq-8',
    category: 'Investments & Referrals',
    question: 'How do I find my referral ID?',
    answer:
      'Your unique Referral ID (for example, VLT-8F3K92) and shareable referral link are displayed at the top of the Referrals section in your dashboard, as well as on your Profile page.',
  },
  {
    id: 'faq-9',
    category: 'Investments & Referrals',
    question: 'Can I change my referral ID?',
    answer:
      'No. Referral IDs are permanently bound to your Account ID upon registration to maintain an immutable audit trail for referral attribution and reward distribution.',
  },
  {
    id: 'faq-10',
    category: 'Deposits & Withdrawals',
    question: 'What happens if I enter the wrong wallet address?',
    answer:
      'Blockchain transactions are irreversible once broadcast. Before a withdrawal enters the "Processing" stage, our confirmation modal requires you to verify the destination address and network. If you notice an error while your request is still in "Pending" status, contact Support immediately.',
  },
  {
    id: 'faq-11',
    category: 'Deposits & Withdrawals',
    question: 'How does the 72-hour withdrawal commitment work?',
    answer:
      'Eligible withdrawal requests are targeted to be processed within 72 hours. If an eligible withdrawal request is not processed within 72 hours, Vaulta will provide compensation of $500, subject to the applicable Guarantee Terms (including identity verification, valid destination address, absence of security holds, and force majeure exclusions). Review the full Guarantee Terms page for complete eligibility criteria.',
  },
];
