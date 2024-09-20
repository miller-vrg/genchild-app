import { jwtDecode } from "jwt-decode";

export const getDecodeJWT = (token?: string): { id: string, rol: string } | null=> {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
