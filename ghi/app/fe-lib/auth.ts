import Cookies from "js-cookie";

export function getAuthToken(): string | null {
  return Cookies.get("token") || null;
}
