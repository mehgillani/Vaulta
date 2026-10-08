import {
  DashboardMetrics,
  InvestmentPlan,
  UserInvestment,
  TimePeriod,
  ChartDataPoint,
} from '../types';
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_INVESTMENT_PLANS,
  MOCK_USER_INVESTMENTS,
  MOCK_ADMIN_ALL_INVESTMENTS,
  MOCK_PERFORMANCE_CHART,
} from '../data/mockInvestments';

/**
 * Backend-Ready Investment Service Abstraction
 * Returns centralized demo data; ready to be swapped for real API calls.
 */
export const investmentService = {
  async getDashboard(): Promise<DashboardMetrics> {
    return MOCK_DASHBOARD_METRICS;
  },

  async getInvestmentPlans(): Promise<InvestmentPlan[]> {
    return MOCK_INVESTMENT_PLANS;
  },

  async getInvestments(): Promise<UserInvestment[]> {
    return MOCK_USER_INVESTMENTS;
  },

  async getAdminInvestments(): Promise<UserInvestment[]> {
    return MOCK_ADMIN_ALL_INVESTMENTS;
  },

  async getPerformanceChart(period: TimePeriod): Promise<ChartDataPoint[]> {
    return MOCK_PERFORMANCE_CHART[period];
  },
};
