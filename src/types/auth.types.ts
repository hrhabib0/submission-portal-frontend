export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UserRole = "STUDENT" | "MENTOR";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
