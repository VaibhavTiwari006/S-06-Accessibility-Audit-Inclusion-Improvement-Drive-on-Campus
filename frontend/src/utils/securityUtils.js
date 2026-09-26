/**
 * Enterprise Client-Side Cyber Security Utilities
 * 
 * Provides defense-in-depth utilities:
 * - Real-time client-side XSS input sanitization
 * - Sensitive PII masking
 * - Inactivity session watchdog protecting public/shared lab workstations
 */

/**
 * Sanitizes user-supplied strings by stripping script tags, javascript URLs, and inline event handlers
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/onerror\s*=/gi, '')
    .replace(/onclick\s*=/gi, '')
    .replace(/onmouseover\s*=/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim();
};

/**
 * Masks sensitive email addresses to prevent shoulder-surfing and PII disclosure
 * Example: vaibhavtiwari@cusoc.edu -> v**********i@cusoc.edu
 */
export const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  const parts = email.split('@');
  if (parts.length !== 2) return email;

  const [name, domain] = parts;
  if (name.length <= 2) return `${name.charAt(0)}*@${domain}`;

  const maskedName = name.charAt(0) + '*'.repeat(Math.max(1, name.length - 2)) + name.charAt(name.length - 1);
  return `${maskedName}@${domain}`;
};

/**
 * Session Inactivity Watchdog
 * Automatically triggers callback (e.g., auto-logout) after statutory idle window.
 * Default idle timeout: 30 minutes (1,800,000 ms)
 */
export const initInactivityWatchdog = (onTimeout, timeoutMs = 30 * 60 * 1000) => {
  let timerId = null;

  const resetTimer = () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (typeof onTimeout === 'function') {
        onTimeout();
      }
    }, timeoutMs);
  };

  const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

  activityEvents.forEach((event) => {
    window.addEventListener(event, resetTimer, { passive: true });
  });

  resetTimer();

  return () => {
    if (timerId) clearTimeout(timerId);
    activityEvents.forEach((event) => {
      window.removeEventListener(event, resetTimer);
    });
  };
};
