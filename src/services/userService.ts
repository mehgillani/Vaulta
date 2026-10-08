import {
  UserProfile,
  LoginSession,
  NotificationItem,
  SupportTicket,
  AdminOverviewMetrics,
  AdminUserRecord,
  AuditLogEntry,
  FAQItem,
} from '../types';
import {
  MOCK_CURRENT_USER,
  MOCK_LOGIN_SESSIONS,
  MOCK_NOTIFICATIONS,
  MOCK_ADMIN_OVERVIEW,
  MOCK_ADMIN_USERS,
} from '../data/mockUsers';
import {
  MOCK_SUPPORT_TICKETS,
  MOCK_AUDIT_LOGS,
  MOCK_FAQ_ITEMS,
} from '../data/mockWithdrawals';

/**
 * Backend-Ready User & Admin Service Abstraction
 */
export const userService = {
  async getUserProfile(): Promise<UserProfile> {
    return MOCK_CURRENT_USER;
  },

  async getLoginSessions(): Promise<LoginSession[]> {
    return MOCK_LOGIN_SESSIONS;
  },

  async getNotifications(): Promise<NotificationItem[]> {
    return MOCK_NOTIFICATIONS;
  },

  async getSupportTickets(): Promise<SupportTicket[]> {
    return MOCK_SUPPORT_TICKETS;
  },

  async getFaqItems(): Promise<FAQItem[]> {
    return MOCK_FAQ_ITEMS;
  },

  async getAdminOverview(): Promise<AdminOverviewMetrics> {
    return MOCK_ADMIN_OVERVIEW;
  },

  async getAdminUsers(): Promise<AdminUserRecord[]> {
    return MOCK_ADMIN_USERS;
  },

  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return MOCK_AUDIT_LOGS;
  },
};
