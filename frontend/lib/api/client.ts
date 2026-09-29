"use client";

type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: { code: string; message: string } };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function isForbiddenChildError(error: unknown) {
  return error instanceof ApiError && error.code === "FORBIDDEN_CHILD";
}

export function redirectToProfileOnForbiddenChild(error: unknown) {
  if (!isForbiddenChildError(error)) return false;
  window.location.assign("/profile");
  return true;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("disaedu_token");
}

export function setToken(token: string) {
  window.localStorage.setItem("disaedu_token", token);
  clearActiveChildId();
}

export function clearToken() {
  window.localStorage.removeItem("disaedu_token");
  clearActiveChildId();
}

export function getActiveChildId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("disaedu_child_id");
}

export function setActiveChildId(id: string) {
  window.localStorage.setItem("disaedu_child_id", id);
}

export function clearActiveChildId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("disaedu_child_id");
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  let payload: ApiEnvelope<T>;
  try {
    payload = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiError("Server mengirim respons yang tidak valid.", "INVALID_RESPONSE", response.status);
  }

  if (!payload.success) {
    if (payload.error.code === "FORBIDDEN_CHILD") clearActiveChildId();
    throw new ApiError(payload.error.message, payload.error.code, response.status);
  }

  return payload.data;
}
