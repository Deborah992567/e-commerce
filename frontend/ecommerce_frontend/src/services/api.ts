const API_BASE = 'http://localhost:8000';

export interface ApiUser {
  id: number;
  email: string;
  role: string;
  is_admin: boolean;
  full_name?: string | null;
  phone?: string | null;
}

interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: ApiUser;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string | null, refresh: string | null) => {
  accessToken = access;
  refreshToken = refresh;
};

export const getAccessToken = () => accessToken;

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && refreshToken && retry) {
    const refreshed = await refresh();
    if (refreshed) {
      return request<T>(path, options, false);
    }
  }

  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.detail) detail = body.detail;
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, detail);
  }

  return res.json() as Promise<T>;
}

async function refresh(): Promise<boolean> {
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    accessToken = data.access_token;
    refreshToken = data.refresh_token;
    return true;
  } catch {
    return false;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

export interface ApiProduct {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  avg_rating: number;
  category_id: number;
  images: { id: number; url: string }[];
}

export interface ApiOrder {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: { product_id: number; quantity: number; unit_price: number }[];
}

export interface ApiReview {
  id: number;
  product_id: number;
  rating: number;
  comment: string | null;
  user_id: number;
}
