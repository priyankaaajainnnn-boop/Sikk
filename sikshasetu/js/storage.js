/**
 * SikshaSetu Storage Service
 * ============================
 * Provides enrollment persistence using localStorage.
 *
 * TO CONNECT A REAL BACKEND:
 * Replace each method body with a fetch() / axios call to your API endpoint.
 * The method signatures and return shapes should remain the same so the
 * rest of the application continues to work without changes.
 *
 * Enrollment object shape:
 * {
 *   enrollmentId:   string,       // e.g. "SKS-2024-12345"
 *   fullName:       string,
 *   mobile:         string,
 *   email:          string,
 *   city:           string,
 *   courseSlug:     string,
 *   courseName:     string,
 *   coursePrice:    number,
 *   courseDuration: string,
 *   mode:           string,       // "online" | "offline"
 *   education:      string,
 *   message:        string,
 *   paymentStatus:  string,       // "awaiting_payment" | "verification_pending" | "verified" | "rejected"
 *   createdAt:      ISO string,
 *   payment?: {
 *     utr:           string,
 *     screenshotB64: string | null,  // base64 data URL (dev only)
 *     screenshotName:string | null,
 *     paymentDate:   string,
 *     submittedAt:   ISO string,
 *   },
 *   statusUpdatedAt?: ISO string,
 * }
 */

const STORAGE_KEY = 'sikshasetu_enrollments';

const Storage = {
  // ── Private helpers ─────────────────────────────────────────────────────

  _read() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  },

  _write(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // ── Public API ───────────────────────────────────────────────────────────

  /**
   * Save a new enrollment. Returns the enrollmentId.
   * @param {object} enrollmentData
   * @returns {string} enrollmentId
   */
  saveEnrollment(enrollmentData) {
    const all = this._read();
    all[enrollmentData.enrollmentId] = {
      ...enrollmentData,
      paymentStatus: 'awaiting_payment',
      createdAt: new Date().toISOString(),
    };
    this._write(all);
    return enrollmentData.enrollmentId;
  },

  /**
   * Retrieve an enrollment by its ID.
   * @param {string} enrollmentId
   * @returns {object|null}
   */
  getEnrollment(enrollmentId) {
    return this._read()[enrollmentId] || null;
  },

  /**
   * Attach payment details to an existing enrollment.
   * Sets paymentStatus = "verification_pending".
   * @param {string} enrollmentId
   * @param {object} paymentData  { utr, screenshotB64, screenshotName, paymentDate }
   * @returns {boolean} success
   */
  updatePayment(enrollmentId, paymentData) {
    const all = this._read();
    if (!all[enrollmentId]) return false;
    all[enrollmentId] = {
      ...all[enrollmentId],
      payment: {
        ...paymentData,
        submittedAt: new Date().toISOString(),
      },
      paymentStatus: 'verification_pending',
      paymentSubmittedAt: new Date().toISOString(),
    };
    this._write(all);
    return true;
  },

  /**
   * Update the payment status of an enrollment (admin action).
   * @param {string} enrollmentId
   * @param {'verified'|'rejected'|'verification_pending'} status
   * @returns {boolean}
   */
  updatePaymentStatus(enrollmentId, status) {
    const all = this._read();
    if (!all[enrollmentId]) return false;
    all[enrollmentId].paymentStatus  = status;
    all[enrollmentId].statusUpdatedAt = new Date().toISOString();
    this._write(all);
    return true;
  },

  /**
   * Return all enrollments as an array (newest first).
   * @returns {object[]}
   */
  getAllEnrollments() {
    const all = this._read();
    return Object.values(all).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  /**
   * Delete an enrollment (admin action).
   * @param {string} enrollmentId
   */
  deleteEnrollment(enrollmentId) {
    const all = this._read();
    delete all[enrollmentId];
    this._write(all);
  },
};
