import { useState, useEffect } from "react";
import { API } from "../services/API";
import type {
  StatsData,
  TemplateTicketCount,
  HighestTicketTemplate,
  TopCategory,
} from "../types/stats-type";

export const useStats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalTemplates: 0,
    totalPublishedTemplates: 0,
    totalTickets: 0,
    templateTicketCounts: [],
    highestTicketTemplate: null,
    topCategory: null,
    ticketsPerMonth: {},
    ticketsPerWeek: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = new API();

  // Fetch all stats data
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all stat endpoints in parallel
      const [
        totalUsersRes,
        totalTemplatesRes,
        totalPublishedTemplatesRes,
        totalTicketsRes,
        templateTicketCountsRes,
        highestTicketTemplateRes,
        topCategoryRes,
        ticketsPerMonthRes,
        ticketsPerWeekRes,
      ] = await Promise.all([
        api.get("/api/stats/total-users"),
        api.get("/api/stats/total-templates"),
        api.get("/api/stats/total-published-templates"),
        api.get("/api/stats/total-tickets"),
        api.get("/api/stats/template-ticket-counts"),
        api.get("/api/stats/highest-ticket-template"),
        api.get("/api/stats/top-category"),
        api.get("/api/stats/tickets-per-month"),
        api.get("/api/stats/tickets-per-week"),
      ]);

      const statsData: StatsData = {
        totalUsers: totalUsersRes.totalUsers || 0,
        totalTemplates: totalTemplatesRes.totalTemplates || 0,
        totalPublishedTemplates:
          totalPublishedTemplatesRes.totalPublishedTemplates || 0,
        totalTickets: totalTicketsRes.totalTickets || 0,
        templateTicketCounts:
          templateTicketCountsRes.templateTicketCounts || [],
        highestTicketTemplate:
          highestTicketTemplateRes.highestTicketTemplate || null,
        topCategory: topCategoryRes.topCategory || null,
        ticketsPerMonth: ticketsPerMonthRes.ticketsPerMonth || {},
        ticketsPerWeek: ticketsPerWeekRes.ticketsPerWeek || {},
      };

      setStats(statsData);
      return statsData;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch stats";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get individual stat methods for backward compatibility
  const getTotalUsers = async () => {
    try {
      const response = await api.get("/api/stats/total-users");
      return response.totalUsers || 0;
    } catch (err: any) {
      setError(err.message || "Failed to fetch total users");
      throw err;
    }
  };

  const getTotalTemplates = async () => {
    try {
      const response = await api.get("/api/stats/total-templates");
      return response.totalTemplates || 0;
    } catch (err: any) {
      setError(err.message || "Failed to fetch total templates");
      throw err;
    }
  };

  const getTotalPublishedTemplates = async () => {
    try {
      const response = await api.get("/api/stats/total-published-templates");
      return response.totalPublishedTemplates || 0;
    } catch (err: any) {
      setError(err.message || "Failed to fetch total published templates");
      throw err;
    }
  };

  const getTotalTickets = async () => {
    try {
      const response = await api.get("/api/stats/total-tickets");
      return response.totalTickets || 0;
    } catch (err: any) {
      setError(err.message || "Failed to fetch total tickets");
      throw err;
    }
  };

  const getTemplateTicketCounts = async (): Promise<TemplateTicketCount[]> => {
    try {
      const response = await api.get("/api/stats/template-ticket-counts");
      return response.templateTicketCounts || [];
    } catch (err: any) {
      setError(err.message || "Failed to fetch template ticket counts");
      throw err;
    }
  };

  const getHighestTicketTemplate =
    async (): Promise<HighestTicketTemplate | null> => {
      try {
        const response = await api.get("/api/stats/highest-ticket-template");
        return response.highestTicketTemplate || null;
      } catch (err: any) {
        setError(err.message || "Failed to fetch highest ticket template");
        throw err;
      }
    };

  const getTopCategory = async (): Promise<TopCategory | null> => {
    try {
      const response = await api.get("/api/stats/top-category");
      return response.topCategory || null;
    } catch (err: any) {
      setError(err.message || "Failed to fetch top category");
      throw err;
    }
  };

  const getTicketsPerMonth = async (): Promise<Record<string, number>> => {
    try {
      const response = await api.get("/api/stats/tickets-per-month");
      return response.ticketsPerMonth || {};
    } catch (err: any) {
      setError(err.message || "Failed to fetch tickets per month");
      throw err;
    }
  };

  const getTicketsPerWeek = async (): Promise<Record<string, number>> => {
    try {
      const response = await api.get("/api/stats/tickets-per-week");
      return response.ticketsPerWeek || {};
    } catch (err: any) {
      setError(err.message || "Failed to fetch tickets per week");
      throw err;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Load stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    fetchStats,
    getTotalUsers,
    getTotalTemplates,
    getTotalPublishedTemplates,
    getTotalTickets,
    getTemplateTicketCounts,
    getHighestTicketTemplate,
    getTopCategory,
    getTicketsPerMonth,
    getTicketsPerWeek,
    clearError,
  };
};
