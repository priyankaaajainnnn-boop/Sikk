/**
 * SikshaSetu Utility Functions
 * ==============================
 * Shared helpers used across all pages.
 */

const Utils = {
  // ── ID Generation ─────────────────────────────────────────────────────────

  /**
   * Generate a unique enrollment reference ID.
   * Format: SKS-YYYY-NNNNN  e.g. SKS-2024-83921
   * @returns {string}
   */
  generateEnrollmentId() {
    const year   = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `SKS-${year}-${random}`;
  },

  // ── Validation ────────────────────────────────────────────────────────────

  /**
   * Validate an Indian mobile number.
   * Accepts: 10-digit numbers starting with 6-9, optionally prefixed with +91 or 91.
   * @param {string} phone
   * @returns {boolean}
   */
  validateIndianMobile(phone) {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
  },

  /**
   * Validate an email address.
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  },

  /**
   * Validate an uploaded file is an allowed image type and within size limit.
   * @param {File} file
   * @param {number} [maxSizeMB=5]
   * @returns {{ valid: boolean, error?: string }}
   */
  validateImageFile(file, maxSizeMB = 5) {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) {
      return { valid: false, error: 'Please upload a valid image (JPG, PNG, GIF, or WebP).' };
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return { valid: false, error: `File must be smaller than ${maxSizeMB} MB.` };
    }
    return { valid: true };
  },

  // ── Formatting ────────────────────────────────────────────────────────────

  /**
   * Format a number as Indian Rupee currency.
   * @param {number} amount
   * @returns {string}  e.g. "₹3,999"
   */
  formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  },

  /**
   * Format an ISO date string to a human-readable date.
   * @param {string} isoString
   * @returns {string}  e.g. "10 Aug 2024"
   */
  formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  /**
   * Format an ISO date string to date + time.
   * @param {string} isoString
   * @returns {string}  e.g. "10 Aug 2024, 2:30 PM"
   */
  formatDateTime(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  },

  // ── URL / Routing ─────────────────────────────────────────────────────────

  /**
   * Read a single URL query parameter.
   * @param {string} name
   * @returns {string|null}
   */
  getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  // ── UI Helpers ────────────────────────────────────────────────────────────

  /**
   * Show a brief toast notification.
   * @param {string} message
   * @param {'success'|'error'|'info'|'warning'} [type='info']
   * @param {number} [duration=3500] ms
   */
  showToast(message, type = 'info', duration = 3500) {
    document.getElementById('toast-notification')?.remove();

    const icons = { success: 'check_circle', error: 'error', info: 'info', warning: 'warning' };
    const colors = {
      success: 'bg-green-600',
      error:   'bg-red-600',
      info:    'bg-blue-700',
      warning: 'bg-amber-500 text-black',
    };

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = [
      'fixed bottom-6 right-6 z-[9999] max-w-sm',
      'px-5 py-3 rounded-lg shadow-2xl',
      'flex items-center gap-3',
      'font-body-md text-body-md text-white',
      'transition-all duration-300 translate-y-0 opacity-100',
      colors[type] || colors.info,
    ].join(' ');

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px]" style="font-variation-settings:'FILL' 1;">${icons[type]}</span>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Set a button into loading state (disabled + spinner), or restore it.
   * @param {HTMLButtonElement} button
   * @param {boolean} loading
   * @param {string} [loadingText='Please wait…']
   */
  setButtonLoading(button, loading, loadingText = 'Please wait…') {
    if (loading) {
      button.disabled = true;
      button.dataset.origHtml = button.innerHTML;
      button.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>${loadingText}`;
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.origHtml || button.innerHTML;
    }
  },

  /**
   * Convert a File object to a base64 data URL.
   * @param {File} file
   * @returns {Promise<string>}
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Show an inline validation error below a form field.
   * @param {string} fieldId
   * @param {string} message
   */
  showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('border-red-500', 'ring-1', 'ring-red-500');
    field.classList.remove('border-[#CBD5E1]');

    let err = document.getElementById(`${fieldId}-error`);
    if (!err) {
      err = document.createElement('p');
      err.id = `${fieldId}-error`;
      err.className = 'text-red-600 text-[13px] mt-1 flex items-center gap-1';
      field.parentNode.appendChild(err);
    }
    err.innerHTML = `<span class="material-symbols-outlined text-[14px]">error</span>${message}`;
  },

  /**
   * Clear an inline validation error for a form field.
   * @param {string} fieldId
   */
  clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
    field.classList.add('border-[#CBD5E1]');
    document.getElementById(`${fieldId}-error`)?.remove();
  },

  /**
   * Escape HTML to prevent XSS when injecting user data into the DOM.
   * @param {string} str
   * @returns {string}
   */
  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  // ── Mobile Navigation ─────────────────────────────────────────────────────

  /**
   * Initialize the hamburger mobile navigation toggle.
   * Expects: #mobile-menu-btn (toggle button) and #mobile-menu (drawer).
   */
  initMobileNav() {
    const btn   = document.getElementById('mobile-menu-btn');
    const menu  = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-menu-close');
    if (!btn || !menu) return;

    const open = () => {
      menu.classList.remove('hidden');
      setTimeout(() => menu.classList.remove('opacity-0', '-translate-y-2'), 10);
    };
    const hide = () => {
      menu.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => menu.classList.add('hidden'), 200);
    };

    btn.addEventListener('click', () =>
      menu.classList.contains('hidden') ? open() : hide()
    );
    close?.addEventListener('click', hide);

    // Close on outside click
    document.addEventListener('click', e => {
      if (!menu.classList.contains('hidden') &&
          !menu.contains(e.target) &&
          e.target !== btn &&
          !btn.contains(e.target)) {
        hide();
      }
    });
  },
};
