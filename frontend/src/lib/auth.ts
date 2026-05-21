import type { Guest } from '../App';

const TOKEN_KEY = 'wedding_rsvp_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken(): Guest | null {
  const token = getToken();
  if (!token) return null;

  try {
    // JWT payload is the second base64url segment
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.sub || !payload.firstName || !payload.role) return null;

    // Treat as expired if within 60 seconds of expiry
    if (payload.exp && Date.now() / 1000 > payload.exp - 60) {
      clearToken();
      return null;
    }

    return {
      code: payload.sub as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      role: payload.role as 'admin' | 'guest',
    };
  } catch {
    clearToken();
    return null;
  }
}
