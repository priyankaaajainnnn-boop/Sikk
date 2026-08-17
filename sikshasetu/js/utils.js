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

  // ── Reward Confetti & Success Animation ─────────────────────────────────────

  /**
   * Spawns a subtle, elegant burst of colorful confetti particles from a coordinate or element.
   * Uses pure CSS animations without heavy external dependencies.
   * @param {number|Element} originXOrElement - X coordinate or target element
   * @param {number} [originY] - Y coordinate if first param is a number
   */
  triggerConfetti(originXOrElement, originY) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (originXOrElement instanceof Element) {
      const rect = originXOrElement.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    } else if (typeof originXOrElement === 'number' && typeof originY === 'number') {
      x = originXOrElement;
      y = originY;
    }

    // Ensure CSS styles for confetti exist
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confettiBurst {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--tx), var(--ty), 0) scale(var(--scale, 0.4)) rotate(var(--rot));
          }
        }
        @keyframes successPulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .btn-success-pulse {
          animation: successPulse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `;
      document.head.appendChild(style);
    }

    // Create container
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 99999;
      overflow: hidden;
    `;
    document.body.appendChild(container);

    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4', '#eab308'];
    const particleCount = 38;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 60 + Math.random() * 110;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - (30 + Math.random() * 40); // slight upward bias
      const rot = (Math.random() * 720 - 360) + 'deg';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() > 0.4 ? (6 + Math.random() * 6) : (4 + Math.random() * 4);
      const isCircle = Math.random() > 0.5;
      const duration = 0.65 + Math.random() * 0.4;
      const delay = Math.random() * 0.08;

      p.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${isCircle ? size : size * 1.5}px;
        background-color: ${color};
        border-radius: ${isCircle ? '50%' : '2px'};
        --tx: ${tx}px;
        --ty: ${ty}px;
        --rot: ${rot};
        --scale: ${0.2 + Math.random() * 0.5};
        animation: confettiBurst ${duration}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s forwards;
      `;
      container.appendChild(p);
    }

    // Clean up container after animations complete
    setTimeout(() => {
      container.remove();
    }, 1300);
  },

  /**
   * Helper to attach rewarding click effect to buttons
   * @param {Element} buttonElement
   * @param {Function} [onComplete]
   */
  rewardEnrollClick(buttonElement, onComplete) {
    if (!buttonElement) return;
    buttonElement.classList.add('btn-success-pulse');
    setTimeout(() => buttonElement.classList.remove('btn-success-pulse'), 350);
    this.triggerConfetti(buttonElement);
    if (typeof onComplete === 'function') {
      setTimeout(onComplete, 220);
    }
  }
};

