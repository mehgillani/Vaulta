import { ReferralStats, ReferralRecord } from '../types';

/**
 * DEMO DATA NOTICE:
 * Referral program statistics and records are static demo values.
 * Note on Program Rules:
 * - 5% direct referral reward on the eligible investment amount.
 * - +0.05 percentage-point weekly return boost per eligible referral (additive percentage points, NOT a multiplier).
 */

export const MOCK_REFERRAL_STATS: ReferralStats = {
  referralId: 'VLT-8F3K92',
  referralUrl: 'vaulta.com/signup?ref=VLT-8F3K92',
  totalReferrals: 5,
  activeReferrals: 3,
  referralInvestmentVolumeUsdt: 3000,
  referralEarningsUsdt: 150,
  directRewardPercent: 5,
  weeklyBoostPerEligibleReferralPoints: 0.05,
  currentWeeklyBoostPoints: 0.15,
};

export const MOCK_REFERRAL_BOOST_TIERS = [
  {
    eligibleReferrals: 1,
    boostLabel: '+0.05 percentage points',
    exampleBaseRate: '5.00%',
    exampleAdjustedRate: '5.05%',
    description: '1 eligible referral adds 0.05 percentage points to weekly return rate',
  },
  {
    eligibleReferrals: 2,
    boostLabel: '+0.10 percentage points',
    exampleBaseRate: '5.00%',
    exampleAdjustedRate: '5.10%',
    description: '2 eligible referrals add 0.10 percentage points to weekly return rate',
  },
  {
    eligibleReferrals: 3,
    boostLabel: '+0.15 percentage points',
    exampleBaseRate: '5.00%',
    exampleAdjustedRate: '5.15%',
    description: '3 eligible referrals add 0.15 percentage points to weekly return rate',
  },
];

export const MOCK_REFERRAL_HISTORY: ReferralRecord[] = [
  {
    referralId: 'VLT-REF-309',
    referredUserCode: 'M. Vance (VLT-ACC-906332)',
    referredUserName: 'Marcus Vance',
    referredByCode: 'VLT-8F3K92',
    joinDate: '2026-10-04',
    investmentAmountUsdt: 1000,
    rewardAmountUsdt: 50,
    weeklyBoostContributionPoints: 0.05,
    status: 'Rewarded',
  },
  {
    referralId: 'VLT-REF-284',
    referredUserCode: 'H. Bergstrom (VLT-ACC-905891)',
    referredUserName: 'Henrik Bergstrom',
    referredByCode: 'VLT-8F3K92',
    joinDate: '2026-09-16',
    investmentAmountUsdt: 1000,
    rewardAmountUsdt: 50,
    weeklyBoostContributionPoints: 0.05,
    status: 'Rewarded',
  },
  {
    referralId: 'VLT-REF-241',
    referredUserCode: 'C. Moreau (VLT-ACC-905410)',
    referredUserName: 'Claire Moreau',
    referredByCode: 'VLT-8F3K92',
    joinDate: '2026-08-29',
    investmentAmountUsdt: 1000,
    rewardAmountUsdt: 50,
    weeklyBoostContributionPoints: 0.05,
    status: 'Eligible',
  },
  {
    referralId: 'VLT-REF-318',
    referredUserCode: 'K. Takahashi (VLT-ACC-907890)',
    referredUserName: 'Kenji Takahashi',
    referredByCode: 'VLT-8F3K92',
    joinDate: '2026-10-07',
    investmentAmountUsdt: 0,
    rewardAmountUsdt: 0,
    weeklyBoostContributionPoints: 0,
    status: 'Pending',
  },
  {
    referralId: 'VLT-REF-192',
    referredUserCode: 'R. Kowalski (VLT-ACC-904992)',
    referredUserName: 'Rafal Kowalski',
    referredByCode: 'VLT-8F3K92',
    joinDate: '2026-07-11',
    investmentAmountUsdt: 0,
    rewardAmountUsdt: 0,
    weeklyBoostContributionPoints: 0,
    status: 'Ineligible',
  },
];
