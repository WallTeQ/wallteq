import { useState, useEffect } from "react";
import { API } from "../services/API";
import { CreateTicketData, RespondToTicketData, Ticket, TicketStatus } from "../types/ticket-type";

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = new API();

  // Fetch all tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/api/tickets");

      if (response.success && response.tickets) {
        setTickets(response.tickets);
        return response.tickets;
      }

      return [];
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch tickets";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create new ticket
  const createTicket = async (data: CreateTicketData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/api/tickets/create", data);

      if (response.success && response.ticket) {
        setTickets((prev) => [response.ticket, ...prev]);
        return response.ticket;
      }

      throw new Error("Failed to create ticket");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create ticket";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Respond to ticket (admin)
  const respondToTicket = async (
    ticketId: string,
    data: RespondToTicketData
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/api/tickets/respond/${ticketId}`, data);

      if (response.success && response.ticket) {
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.id === ticketId ? response.ticket : ticket
          )
        );
        return response.ticket;
      }

      throw new Error("Failed to respond to ticket");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to respond to ticket";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Finalize sale (admin)
  const finalizeSale = async (ticketId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(`/api/tickets/finalize/${ticketId}`, {});

      if (response.success && response.ticket) {
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.id === ticketId ? response.ticket : ticket
          )
        );
        return response.ticket;
      }

      throw new Error("Failed to finalize sale");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to finalize sale";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get tickets by status
  const getTicketsByStatus = (status: TicketStatus) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  // Get ticket statistics
  const getTicketStats = () => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === TicketStatus.OPEN).length;
    const inProgress = tickets.filter(
      (t) => t.status === TicketStatus.IN_PROGRESS
    ).length;
    const closed = tickets.filter(
      (t) => t.status === TicketStatus.CLOSED
    ).length;
    const finalized = tickets.filter(
      (t) => t.status === TicketStatus.FINALIZED
    ).length;

    return { total, open, inProgress, closed, finalized };
  };

  // Clear error
  const clearError = () => setError(null);

  // Load tickets on mount
  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    respondToTicket,
    finalizeSale,
    getTicketsByStatus,
    getTicketStats,
    clearError,
  };
};
