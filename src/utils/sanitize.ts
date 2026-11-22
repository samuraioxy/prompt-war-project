/**
 * Security sanitization utility for ECHO.
 * Prevents XSS, script injection, and invalid or malicious inputs.
 */

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /data:text\/html/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi, // onerror=, onclick=, etc.
];

/**
 * Strips HTML tags and script patterns, normalizes whitespace, and enforces max length.
 */
export function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Remove dangerous script tags and execution vectors
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  // Strip remaining HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Normalize Unicode and control characters (except common punctuation and emojis)
  sanitized = sanitized.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

  // Trim and collapse excessive whitespace
  sanitized = sanitized.trim().replace(/\s+/g, ' ');

  // Enforce boundary length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength).trim();
  }

  return sanitized;
}

/**
 * Validates a user claim input before ingestion into the intelligence engine.
 */
export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}

export function validateClaimInput(rawClaim: unknown): ValidationResult {
  if (typeof rawClaim !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      errorMessage: 'Claim must be a valid text string.'
    };
  }

  const sanitized = sanitizeText(rawClaim, 300);

  if (!sanitized) {
    return {
      isValid: false,
      sanitized: '',
      errorMessage: 'Claim cannot be empty or contain only invalid characters.'
    };
  }

  if (sanitized.length < 5) {
    return {
      isValid: false,
      sanitized,
      errorMessage: 'Claim must be at least 5 characters long for meaningful critical deconstruction.'
    };
  }

  return {
    isValid: true,
    sanitized
  };
}

/**
 * Escapes characters for safe inclusion in SVG text and HTML representations.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
