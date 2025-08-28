export interface StatsData {
  totalUsers: number;
  totalTemplates: number;
  totalPublishedTemplates: number;
  totalTickets: number;
  templateTicketCounts: TemplateTicketCount[];
  highestTicketTemplate: HighestTicketTemplate | null;
  topCategory: TopCategory | null;
  ticketsPerMonth: Record<string, number>;
  ticketsPerWeek: Record<string, number>;
}

export interface TemplateTicketCount {
  templateId: string;
  title: string;
  ticketCount: number;
}

export interface HighestTicketTemplate {
  templateId: string;
  title: string;
  ticketCount: number;
}

export interface TopCategory {
  categoryId: string;
  name: string;
  templateCount: number;
}
