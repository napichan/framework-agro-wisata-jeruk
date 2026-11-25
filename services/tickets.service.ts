import { apiFetch } from "@/lib/api";

/* ==================== Tipe respons backend ==================== */

export type TicketStatus = "active" | "used" | "cancelled";
export type ScanResult = "valid" | "invalid" | "already_used" | "cancelled";

type ApiTicket = {
  id: number;
  ticket_code: string;
  status: TicketStatus;
  scanned_at: string | null;
  created_at: string;
  booking_code: string;
  package_name: string;
  visit_date: string;
  visitor_count: number;
  customer_name: string;
  customer_email: string;
};

type TicketsResponse = {
  data: ApiTicket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type StatsResponse = {
  data: {
    active: number;
    used: number;
    cancelled: number;
    total: number;
    scansToday: number;
  };
};

type ScanHistoryResponse = {
  data: Array<{
    id: number;
    scanned_at: string;
    result: ScanResult;
    ticket_code: string;
    booking_code: string;
    customer_name: string;
    admin_name: string | null;
  }>;
};

type ScanResponse = {
  result: ScanResult;
  ticket: {
    ticket_code: string;
    status: TicketStatus;
    booking_code: string;
    package_name: string;
    visit_date: string;
    visitor_count: number;
    customer_name: string;
    customer_email: string;
    scanned_at: string | null;
  } | null;
};

/* ==================== Mapping ==================== */

export type Ticket = {
  id: number;
  code: string;
  status: TicketStatus;
  scannedAt: string | null;
  createdAt: string;
  bookingCode: string;
  paket: string;
  visitDate: string;
  visitorCount: number;
  customer: string;
  email: string;
};

export type TicketStats = {
  active: number;
  used: number;
  cancelled: number;
  total: number;
  scansToday: number;
};

export type ScanHistory = {
  id: number;
  scannedAt: string;
  result: ScanResult;
  ticketCode: string;
  bookingCode: string;
  customer: string;
  admin: string | null;
};

export type ScanOutcome = {
  result: ScanResult;
  ticket: ScanResponse["ticket"];
};

function mapTicket(row: ApiTicket): Ticket {
  return {
    id: row.id,
    code: row.ticket_code,
    status: row.status,
    scannedAt: row.scanned_at,
    createdAt: row.created_at,
    bookingCode: row.booking_code,
    paket: row.package_name,
    visitDate: row.visit_date,
    visitorCount: Number(row.visitor_count ?? 0),
    customer: row.customer_name,
    email: row.customer_email,
  };
}

/* ==================== Service ==================== */

export const ticketsService = {
  async list(params: {
    page: number;
    limit: number;
    status: string;
    search: string;
  }): Promise<{
    tickets: Ticket[];
    page: number;
    totalPages: number;
    total: number;
  }> {
    const query = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
    });

    if (params.status) query.set("status", params.status);
    if (params.search.trim()) query.set("search", params.search.trim());

    const res = await apiFetch<TicketsResponse>(`/api/admin/tickets?${query}`);

    return {
      tickets: res.data.map(mapTicket),
      page: res.pagination.page,
      totalPages: res.pagination.totalPages,
      total: res.pagination.total,
    };
  },

  async stats(): Promise<TicketStats> {
    const res = await apiFetch<StatsResponse>("/api/admin/tickets/stats");
    return res.data;
  },

  async scans(limit = 10): Promise<ScanHistory[]> {
    const res = await apiFetch<ScanHistoryResponse>(
      `/api/admin/tickets/scans?limit=${limit}`,
    );

    return res.data.map((row) => ({
      id: row.id,
      scannedAt: row.scanned_at,
      result: row.result,
      ticketCode: row.ticket_code,
      bookingCode: row.booking_code,
      customer: row.customer_name,
      admin: row.admin_name,
    }));
  },

  async scan(code: string): Promise<ScanOutcome> {
    return apiFetch<ScanResponse>("/api/admin/tickets/scan", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },

  async cancel(id: number): Promise<void> {
    await apiFetch(`/api/admin/tickets/${id}/cancel`, { method: "PATCH" });
  },
};
