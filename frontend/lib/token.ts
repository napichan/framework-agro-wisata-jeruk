const TOKEN_KEY = "agro_token";
const MAX_AGE = 60 * 60 * 24; // 1 hari

export function setToken(token: string) {
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token
  )}; path=/; max-age=${MAX_AGE}; samesite=lax`;
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_KEY}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export function removeToken() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}