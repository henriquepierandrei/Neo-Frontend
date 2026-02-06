// src/utils/cookies.ts

interface CookieOptions {
  expires?: number; // dias
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean;
}

export const cookies = {
  set(name: string, value: string, options: CookieOptions = {}): void {
    const {
      expires = 7,
      path = '/',
      secure = window.location.protocol === 'https:',
      sameSite = 'Strict'
    } = options;

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expires * 24 * 60 * 60 * 1000);

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookieString += `; expires=${expirationDate.toUTCString()}`;
    cookieString += `; path=${path}`;
    cookieString += `; SameSite=${sameSite}`;
    
    if (secure) {
      cookieString += '; Secure';
    }

    document.cookie = cookieString;
  },

  get(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },

  remove(name: string, path: string = '/'): void {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  },

  // Verifica se cookies estão habilitados
  isEnabled(): boolean {
    try {
      document.cookie = 'testcookie=1';
      const result = document.cookie.indexOf('testcookie') !== -1;
      document.cookie = 'testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return result;
    } catch {
      return false;
    }
  }
};

// Constantes para nomes dos cookies
export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'vxo_access_token',
  REFRESH_TOKEN: 'vxo_refresh_token',
  USER_DATA: 'vxo_user_data',
} as const;