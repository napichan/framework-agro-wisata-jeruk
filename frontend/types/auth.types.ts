export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  nama: string;
  email: string;
  role: "admin" | "staf";
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};