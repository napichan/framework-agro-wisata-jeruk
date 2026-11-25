export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};