import { ReferralStats, ReferralRecord } from '../types';
import { MOCK_REFERRAL_STATS, MOCK_REFERRAL_HISTORY, MOCK_REFERRAL_BOOST_TIERS } from '../data/mockReferrals';

/**
 * Backend-Ready Referral Service Abstraction
 */
export const referralService = {
  async getReferralProfile(): Promise<{ referralId: string; referralUrl: string }> {
    return {
      referralId: MOCK_REFERRAL_STATS.referralId,
      referralUrl: MOCK_REFERRAL_STATS.referralUrl,
    };
  },

  async getReferralStats(): Promise<ReferralStats> {
    return MOCK_REFERRAL_STATS;
  },

  async getReferralBoostTiers() {
    return MOCK_REFERRAL_BOOST_TIERS;
  },

  async getReferralHistory(): Promise<ReferralRecord[]> {
    return MOCK_REFERRAL_HISTORY;
  },
};
