
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
    id: string
    ticketNumber: string
    inquiry: string
    status: TicketStatus
    adminResponse?: string
    user: {
        id: string
        name: string
        email: string
    }
    templates: Array<{
        id: string
        title: string
        price: number
        category?: {
            id: string
            name: string
        }
    }>
    createdAt: string
    updatedAt: string
}
export interface CreateTicketData {
  templateIds?: string[];
  inquiry: string;
}

export interface RespondToTicketData {
  adminResponse: string;
}
