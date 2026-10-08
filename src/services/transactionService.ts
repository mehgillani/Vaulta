import { TransactionRecord } from '../types';
import { MOCK_USER_TRANSACTIONS } from '../data/mockTransactions';

/**
 * Backend-Ready Transaction Service Abstraction
 */
export const transactionService = {
  async getTransactions(): Promise<TransactionRecord[]> {
    return MOCK_USER_TRANSACTIONS;
  },
};
