import { describe, it, expect } from 'vitest';
import { sanitizeText, validateClaimInput, escapeHtml } from '../../utils/sanitize';

describe('Sanitization & Security Utilities', () => {
  describe('sanitizeText', () => {
    it('strips <script> tags and malicious payloads', () => {
      const malicious = 'Hello <script>alert("xss")</script> world!';
      expect(sanitizeText(malicious)).toBe('Hello world!');
    });

    it('strips HTML tags completely', () => {
      const html = '<div class="alert"><p>Bold <strong>claim</strong></p></div>';
      expect(sanitizeText(html)).toBe('Bold claim');
    });

    it('removes javascript: protocol execution attempts', () => {
      const payload = 'Check this: javascript:alert(1)';
      expect(sanitizeText(payload)).toBe('Check this: alert(1)');
    });

    it('removes inline event handlers like onerror and onclick', () => {
      const payload = '<img src="x" onerror=alert(1)>Test claim';
      expect(sanitizeText(payload)).toBe('Test claim');
    });

    it('normalizes excessive whitespace and trims', () => {
      const messy = '   Multiple    spaces   and\n\nnewlines   ';
      expect(sanitizeText(messy)).toBe('Multiple spaces and newlines');
    });

    it('enforces maxLength boundary', () => {
      const longText = 'a'.repeat(50);
      expect(sanitizeText(longText, 20)).toHaveLength(20);
    });

    it('returns empty string for non-string inputs safely', () => {
      expect(sanitizeText(null as unknown as string)).toBe('');
      expect(sanitizeText(undefined as unknown as string)).toBe('');
      expect(sanitizeText(12345 as unknown as string)).toBe('');
    });
  });

  describe('validateClaimInput', () => {
    it('validates a proper claim text', () => {
      const result = validateClaimInput('Artificial Intelligence will reshape healthcare.');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('Artificial Intelligence will reshape healthcare.');
      expect(result.errorMessage).toBeUndefined();
    });

    it('rejects empty or whitespace-only claim', () => {
      const result = validateClaimInput('    ');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('cannot be empty');
    });

    it('rejects claims shorter than 5 characters', () => {
      const result = validateClaimInput('AI');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('at least 5 characters');
    });

    it('sanitizes input while validating', () => {
      const result = validateClaimInput('  <b>Nuclear energy</b> is safe and clean.  ');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('Nuclear energy is safe and clean.');
    });
  });

  describe('escapeHtml', () => {
    it('escapes reserved HTML entities', () => {
      expect(escapeHtml('<div id="test">&\'"</div>')).toBe(
        '&lt;div id=&quot;test&quot;&gt;&amp;&#39;&quot;&lt;/div&gt;'
      );
    });
  });
});
