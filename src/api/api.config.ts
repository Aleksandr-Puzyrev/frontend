import axios from "axios";
import { getCookie } from "cookies-next";
import TokenService from "./services/token.service";
import Routes from "@/shared/config/routes.config";
import isClientSideCall from "@/shared/utils/isClientSideCall";
import { IToken } from "@/shared/types/auth/sign-in.type";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    let token;

    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      token = (await cookies()).get("token")?.value;
    } else token = getCookie("token");

    if (!!token) config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry && isClientSideCall()) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = getCookie("refresh");
        const { data: tokens } = await axios.post<IToken>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        TokenService.setTokens(tokens);
        originalRequest.headers.Authorization = `Bearer ${tokens.token}`;
        return axios(originalRequest);
      } catch {
        TokenService.removeTokens();
        window.location.replace(Routes.auth.login);
      }
    }
    throw error;
  }
);

export default api;
