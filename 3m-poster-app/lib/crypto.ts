const ENCRYPTION_KEY = '3m-poster-fb-2024-secure-key!!';

function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(result);
}

function xorDecrypt(encrypted: string, key: string): string {
  const decoded = atob(encrypted);
  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    result += String.fromCharCode(
      decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

export function encryptCookies(cookies: string): string {
  return xorEncrypt(cookies, ENCRYPTION_KEY);
}

export function decryptCookies(encrypted: string): string {
  try {
    return xorDecrypt(encrypted, ENCRYPTION_KEY);
  } catch {
    return '';
  }
}

export function extractCookies(cookieHeader: string): { c_user?: string; xs?: string } {
  const cookies: { c_user?: string; xs?: string } = {};
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [name, ...valueParts] = part.trim().split('=');
    const value = valueParts.join('=');
    if (name === 'c_user') cookies.c_user = value;
    if (name === 'xs') cookies.xs = value;
  }
  return cookies;
}

export function hasValidSession(cookieHeader: string): boolean {
  const { c_user, xs } = extractCookies(cookieHeader);
  return !!(c_user && xs);
}
