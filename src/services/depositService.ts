import { DepositNetwork, DepositRecord } from '../types';
import { MOCK_DEPOSIT_NETWORKS, MOCK_ADMIN_DEPOSITS } from '../data/mockTransactions';

/**
 * Backend-Ready Deposit Service Abstraction
 * Provides placeholder demo deposit networks and statuses.
 */
export const depositService = {
  async getDepositNetworks(): Promise<DepositNetwork[]> {
    return MOCK_DEPOSIT_NETWORKS;
  },

  async getDepositAddress(networkId: DepositNetwork['id']): Promise<DepositNetwork> {
    const found = MOCK_DEPOSIT_NETWORKS.find((n) => n.id === networkId);
    return found || MOCK_DEPOSIT_NETWORKS[0];
  },

  async getDepositStatus(): Promise<DepositRecord[]> {
    return MOCK_ADMIN_DEPOSITS;
  },
};
