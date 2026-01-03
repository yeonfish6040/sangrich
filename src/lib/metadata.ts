import { headers } from 'next/headers';

export function getBaseUrl() {
  const headerList = headers();
  const getHeader = (name: string) => {
    if (headerList && typeof (headerList as Headers).get === 'function') {
      return (headerList as Headers).get(name);
    }
    const fallback = headerList as Record<string, string> | null | undefined;
    return fallback?.[name] || fallback?.[name.toLowerCase()] || null;
  };
  const protocol = getHeader('x-forwarded-proto') || 'https';
  const host = getHeader('x-forwarded-host') || getHeader('host');

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function buildAbsoluteUrl(baseUrl: string, path: string) {
  if (!path) return baseUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalized}`;
}
