import { apiFetch } from "@/lib/api";

/* ==================== Tipe respons backend ==================== */

type ApiBooking = {
  id: number;
  booking_code: string;
  package_name: string;
  visit_date: string;
  session: string | null;
  visitor_count: number;
  adult_count: number;
  child_count: number;
  contact_name: string | null;
  contact_phone: string | null;
  total_amount: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  customer_name: string;
  customer_email: string;
  payment_id: number | null;
  payment_method: string | null;
  payment_status: "pending" | "verified" | "rejected" | null;
  payment_proof_path: string | null;
  ticket_id: number | null;
  ticket_code: string | null;
  ticket_status: "active" | "used" | "cancelled" | null;
};

type BookingsResponse = {
  data: ApiBooking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type BookingStatsResponse = {
  data: {
    pending: number;
    confirmed: number;
    cancelled: number;
    total: number;
    totalAmount: string;
  };
};

/* ==================== Mapping ==================== */

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: number;
  bookingCode: string;
  customer: string;
  email: string;
  paket: string;
  visitDate: string;
  session: string | null;
  visitorCount: number;
  adultCount: number;
  childCount: number;
  contactName: string | null;
  contactPhone: string | null;
  total: number;
  status: BookingStatus;
  createdAt: string;
  paymentMethod: string | null;
  paymentStatus: "pending" | "verified" | "rejected" | null;
  hasProof: boolean;
  ticketCode: string | null;
  ticketStatus: "active" | "used" | "cancelled" | null;
};

export type BookingStats = {
  pending: number;
  confirmed: number;
  cancelled: number;
  total: number;
  totalAmount: number;
};

function mapBooking(row: ApiBooking): Booking {
  return {
    id: row.id,
    bookingCode: row.booking_code,
    customer: row.customer_name,
    email: row.customer_email,
    paket: row.package_name,
    visitDate: row.visit_date,
    session: row.session,
    visitorCount: Number(row.visitor_count ?? 0),
    adultCount: Number(row.adult_count ?? 0),
    childCount: Number(row.child_count ?? 0),
    contactName: row.contact_name,
    contactPhone: row.contact_phone,
    total: Number(row.total_amount),
    status: row.status,
    createdAt: row.created_at,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    hasProof: Boolean(row.payment_proof_path),
    ticketCode: row.ticket_code,
    ticketStatus: row.ticket_status,
  };
}

/* ==================== Service ==================== */

export const bookingsService = {
  async list(params: {
    page: number;
    limit: number;
    status: string;
    search: string;
  }): Promise<{
    bookings: Booking[];
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

    const res = await apiFetch<BookingsResponse>(
      `/api/admin/bookings?${query}`,
    );

    return {
      bookings: res.data.map(mapBooking),
      page: res.pagination.page,
      totalPages: res.pagination.totalPages,
      total: res.pagination.total,
    };
  },

  async stats(): Promise<BookingStats> {
    const res = await apiFetch<BookingStatsResponse>(
      "/api/admin/bookings/stats",
    );

    return {
      pending: res.data.pending,
      confirmed: res.data.confirmed,
      cancelled: res.data.cancelled,
      total: res.data.total,
      totalAmount: Number(res.data.totalAmount),
    };
  },

  async updateStatus(id: number, status: BookingStatus): Promise<void> {
    await apiFetch(`/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
