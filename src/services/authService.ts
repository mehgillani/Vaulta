import { UserProfile } from '../types';
import { MOCK_CURRENT_USER } from '../data/mockUsers';

/**
 * Backend-Ready Auth Service Abstraction
 * Currently resolves with demo/mock responses.
 * Connect to REST/GraphQL auth endpoints when backend is provisioned.
 */
export const authService = {
  async login(email: string, _password: string): Promise<{ user: UserProfile; role: 'user' | 'admin' }> {
    const isAdmin = email.toLowerCase().includes('admin');
    return {
      user: {
        ...MOCK_CURRENT_USER,
        email: email || MOCK_CURRENT_USER.email,
      },
      role: isAdmin ? 'admin' : 'user',
    };
  },

  async register(payload: {
    fullName: string;
    email: string;
    password: string;
    referralId?: string;
  }): Promise<{ verificationRequired: boolean; email: string }> {
    return {
      verificationRequired: true,
      email: payload.email,
    };
  },

  async verifyEmail(email: string): Promise<{ verified: boolean; email: string }> {
    return {
      verified: true,
      email,
    };
  },

  async requestPasswordReset(email: string): Promise<{ dispatched: boolean; email: string }> {
    return {
      dispatched: true,
      email,
    };
  },

  async resetPassword(_newPassword: string): Promise<{ updated: boolean }> {
    return {
      updated: true,
    };
  },
};
