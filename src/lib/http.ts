import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

type ApiErrorEnvelope = {
  success: false;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
};

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = error.response?.data as ApiErrorEnvelope | undefined;
    const message =
      apiError?.error?.message ?? error.message ?? "Request failed.";

    return Promise.reject(new Error(message));
  }
);

export async function unwrapResponse<T>(
  request: Promise<{ data: ApiEnvelope<T> }>
) {
  const response = await request;
  return response.data.data;
}
