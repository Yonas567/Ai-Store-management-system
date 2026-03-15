import axios from "axios";
import { LoginPayload, LoginResponse } from "@/types/auth";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      if (typeof document === "undefined") return config;

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
      }
    } catch {}

    return config;
  },
  (error) => Promise.reject(error),
);

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/user/login/", payload);
  return res.data;
}

export function setAccessToken(token: string) {
  document.cookie = `access_token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearAccessToken() {
  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
