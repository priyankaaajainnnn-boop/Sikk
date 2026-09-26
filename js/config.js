/**
 * SikshaSetu Site Configuration
 * ================================
 * Edit the values below before deploying to production.
 *
 * SECURITY NOTES:
 * - Never store real API keys or passwords in client-side JS for production.
 * - Replace adminPassword with a proper server-side authentication system.
 * - Replace upiId with your actual UPI merchant ID before going live.
 */

const CONFIG = {
  // ── Institute Details ──────────────────────────────────────────────────
  instituteName:     'SikshaSetu',
  instituteFullName: 'SikshaSetu Academy',
  tagline:           'Learn Practical Computer Skills. Build Your Future.',
  copyrightYear:     '2024',

  // ── Contact Information ────────────────────────────────────────────────
  phone:        '+91 98765 43210',
  email:        'hello@sikshasetu.in',
  supportEmail: 'support@sikshasetu.in',
  address:      'City Center Building, Phase 1, Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057',

  // ── Payment Configuration ──────────────────────────────────────────────
  upiId:   '8390217169-1@nyes',
  upiName: 'SikshaSetu Academy',

  // ── Admin (Development Mode — replace with real auth in production) ────
  // ⚠️  CHANGE this password or remove this section in production
  adminPassword: 'admin123',

  // ── Helpers ───────────────────────────────────────────────────────────

  /**
   * Build a standard UPI deep-link payment intent URL.
   * @param {number} amount       Amount in INR (e.g. 3999)
   * @param {string} enrollmentId Reference ID to embed in the note
   * @returns {string} upi://pay?... URL
   */
  buildUpiLink(amount, enrollmentId) {
    const params = new URLSearchParams({
      pa: this.upiId,
      pn: this.upiName,
      am: amount.toFixed(2),
      cu: 'INR',
      tn: `SikshaSetu Enrollment ${enrollmentId}`,
    });
    return `upi://pay?${params.toString()}`;
  },

  /**
   * Build a WhatsApp share URL for enrollment confirmation.
   * @param {string} enrollmentId
   * @param {string} courseName
   * @returns {string}
   */
  buildWhatsAppUrl(enrollmentId, courseName) {
    const msg = encodeURIComponent(
      `I just enrolled in *${courseName}* at SikshaSetu Academy!\nEnrollment ID: ${enrollmentId}\nWebsite: ${window.location.origin}`
    );
    return `https://wa.me/?text=${msg}`;
  },
};
