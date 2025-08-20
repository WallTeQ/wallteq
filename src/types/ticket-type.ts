
// Types
export enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed",
  FINALIZED = "finalized",
}

export interface Template {
  id: string;
  title: string;
  price: number;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  user: User;
  templates: Template[];
  inquiry: string;
  adminResponse?: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketData {
  templateIds?: string[];
  inquiry: string;
}

export interface RespondToTicketData {
  adminResponse: string;
}
