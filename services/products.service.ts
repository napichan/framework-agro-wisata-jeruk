import { apiFetch } from "@/lib/api";

/* ==================== Tipe respons backend ==================== */

type ApiProduct = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  booking_count: number;
};

type ProductsResponse = {
  total: number;
  data: ApiProduct[];
};

type ProductResponse = {
  data: ApiProduct | null;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  status: "active" | "inactive";
  bookingCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductPayload = {
  name: string;
  description: string | null;
  price: number;
  status: "active" | "inactive";
};

/* ==================== Mapping ==================== */

function mapProduct(row: ApiProduct): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    status: row.status,
    bookingCount: Number(row.booking_count ?? 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/* ==================== Service ==================== */

export const productsService = {
  async list(): Promise<Product[]> {
    const res = await apiFetch<ProductsResponse>("/api/admin/products");
    return res.data.map(mapProduct);
  },

  async create(payload: ProductPayload): Promise<Product | null> {
    const res = await apiFetch<ProductResponse>("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return res.data ? mapProduct(res.data) : null;
  },

  async update(id: number, payload: ProductPayload): Promise<Product | null> {
    const res = await apiFetch<ProductResponse>(`/api/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return res.data ? mapProduct(res.data) : null;
  },

  async remove(id: number): Promise<void> {
    await apiFetch(`/api/admin/products/${id}`, { method: "DELETE" });
  },
};
