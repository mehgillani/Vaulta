import { WithdrawalRecord, WithdrawalStatus } from '../types';
import { MOCK_USER_WITHDRAWALS, MOCK_ADMIN_WITHDRAWALS } from '../data/mockWithdrawals';

/**
 * Backend-Ready Withdrawal Service Abstraction
 * Simulates withdrawal submission and status retrieval using demo records.
 */
export const withdrawalService = {
  async createWithdrawal(payload: {
    amountUsdt: number;
    network: 'Network A' | 'Network B' | 'Network C';
    walletAddress: string;
    networkFeeUsdt: number;
  }): Promise<WithdrawalRecord> {
    return {
      withdrawalId: `WDR-${Math.floor(51000 + Math.random() * 8999)}`,
      userId: 'VLT-ACC-904821',
      userName: 'Alexander Lindqvist',
      userEmail: 'a.lindqvist@nordiccapital-demo.ch',
      amountUsdt: payload.amountUsdt,
      networkFeeUsdt: payload.networkFeeUsdt,
      netAmountUsdt: Math.max(0, payload.amountUsdt - payload.networkFeeUsdt),
      network: payload.network,
      walletAddress: payload.walletAddress,
      requestedDate: 'Just now (Demo)',
      ageHours: 0,
      status: 'Pending',
      eligibleFor72hCommitment: true,
    };
  },

  async getWithdrawalStatus(): Promise<WithdrawalRecord[]> {
    return MOCK_USER_WITHDRAWALS;
  },

  async getAdminWithdrawals(): Promise<WithdrawalRecord[]> {
    return MOCK_ADMIN_WITHDRAWALS;
  },

  async updateWithdrawalStatus(
    withdrawalId: string,
    status: WithdrawalStatus
  ): Promise<{ withdrawalId: string; status: WithdrawalStatus }> {
    return { withdrawalId, status };
  },
};
