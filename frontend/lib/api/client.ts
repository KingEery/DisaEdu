"use client";

type ApiEnvelope<T> = { success: true; data: T } | { success: false; error: { code: string; message: string } };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("disaedu_token");
}

export function setToken(token: string) {
  window.localStorage.setItem("disaedu_token", token);
}

export function clearToken() {
  window.localStorage.removeItem("disaedu_token");
  window.localStorage.removeItem("disaedu_child_id");
}

export function getActiveChildId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("disaedu_child_id");
}

export function setActiveChildId(id: string) {
  window.localStorage.setItem("disaedu_child_id", id);
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!payload.success) throw new Error(payload.error.message);
  return payload.data;
}

