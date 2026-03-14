const ADMIN_PASSWORD = 'ilknurserbest';
const ADMIN_SESSION_KEY = 'admin_session';
const ADMIN_EXPIRY_KEY = 'admin_expiry';
const SESSION_DURATION = 1000 * 60 * 60 * 24; // 24 saat

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  if (typeof window !== 'undefined') {
    const now = new Date().getTime();
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    localStorage.setItem(ADMIN_EXPIRY_KEY, (now + SESSION_DURATION).toString());
  }
}

export function getAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem(ADMIN_SESSION_KEY);
  const expiry = localStorage.getItem(ADMIN_EXPIRY_KEY);
  
  if (!session || !expiry) return false;
  
  const now = new Date().getTime();
  const expiryTime = parseInt(expiry, 10);
  
  if (now > expiryTime) {
    clearAdminSession();
    return false;
  }
  
  return true;
}

export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_EXPIRY_KEY);
  }
}

export function generateBlogId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
