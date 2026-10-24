import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import { AuthUser, LoginPayload, RegisterPayload, RegisterResponse } from "@/types/auth.types";


export function registerUser(payload: RegisterPayload) {
  return apiClient<ApiResponse<RegisterResponse>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload: LoginPayload) {
  return apiClient<ApiResponse<AuthUser>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}