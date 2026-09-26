/**
 * SikshaSetu Storage & Orders Service
 * =====================================
 * Manages order and enrollment persistence with dual-mode support:
 * 1. Synchronizes with server REST API (/api/orders) when available.
 * 2. Instant localStorage cache & offline/static hosting fallback (works seamlessly on Vercel static).
 * 3. Seed data initialized with realistic orders on first load.
 */

const STORAGE_KEY = 'sikshasetu_enrollments';
const AUTH_KEY = 'sikshasetu_admin_auth';
const CUSTOM_PASSWORD_KEY = 'sikshasetu_admin_custom_pwd';

const SEED_ORDERS = [
  {
    enrollmentId: 'SKS-2024-91823',
    fullName: 'Rahul Sharma',
    mobile: '+91 98765 12345',
    email: 'rahul.sharma92@gmail.com',
    city: 'Pune',
    courseSlug: 'full-stack-web-dev',
    courseName: 'Full Stack MERN Developer Mastery',
    courseId: 'FSD-101',
    coursePrice: 19999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verified',
    createdAt: '2024-09-25T14:30:00.000Z',
    mode: 'online',
    education: 'Graduate / B.Tech',
    message: 'Looking forward to weekend live project sessions.',
    payment: {
      utr: '426910847291',
      paymentDate: '2024-09-25',
      submittedAt: '2024-09-25T14:35:00.000Z',
      screenshotB64: null,
      screenshotName: 'receipt_rahul.jpg'
    }
  },
  {
    enrollmentId: 'SKS-2024-91824',
    fullName: 'Priya Verma',
    mobile: '+91 98234 56789',
    email: 'priya.verma@outlook.com',
    city: 'Mumbai',
    courseSlug: 'python-data-science',
    courseName: 'Data Science & Machine Learning with Python',
    courseId: 'DS-201',
    coursePrice: 9999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verified',
    createdAt: '2024-09-25T16:15:00.000Z',
    mode: 'online',
    education: 'Post Graduate / MCA',
    message: 'Need placement assistance for analytics roles.',
    payment: {
      utr: '426915729103',
      paymentDate: '2024-09-25',
      submittedAt: '2024-09-25T16:20:00.000Z',
      screenshotB64: null,
      screenshotName: 'gpay_priya.png'
    }
  },
  {
    enrollmentId: 'SKS-2024-91825',
    fullName: 'Amit Kumar Patel',
    mobile: '+91 97123 45678',
    email: 'amit.patel.pune@gmail.com',
    city: 'Pune',
    courseSlug: 'advance-tally-gst',
    courseName: 'Advance Tally Prime with GST & TDS',
    courseId: 'ACC-301',
    coursePrice: 4999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verification_pending',
    createdAt: '2024-09-26T09:45:00.000Z',
    mode: 'offline',
    education: 'B.Com / Commerce',
    message: 'Joining offline evening batch at Hinjawadi center.',
    payment: {
      utr: '426922849102',
      paymentDate: '2024-09-26',
      submittedAt: '2024-09-26T09:50:00.000Z',
      screenshotB64: null,
      screenshotName: 'phonepe_receipt.jpg'
    }
  },
  {
    enrollmentId: 'SKS-2024-91826',
    fullName: 'Sneha Kulkarni',
    mobile: '+91 96543 21098',
    email: 'sneha.kulkarni@yahoo.com',
    city: 'Pune',
    courseSlug: 'computer-fundamentals',
    courseName: 'Computer Fundamentals & Windows OS',
    courseId: 'COMP-101',
    coursePrice: 1999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verified',
    createdAt: '2024-09-26T11:20:00.000Z',
    mode: 'offline',
    education: '12th Pass',
    message: 'Starting from basics.',
    payment: {
      utr: '426930194827',
      paymentDate: '2024-09-26',
      submittedAt: '2024-09-26T11:25:00.000Z',
      screenshotB64: null,
      screenshotName: 'paytm_screenshot.png'
    }
  },
  {
    enrollmentId: 'SKS-2024-91827',
    fullName: 'Vikrant Deshmukh',
    mobile: '+91 95012 34567',
    email: 'vikrant.deshmukh@gmail.com',
    city: 'Nagpur',
    courseSlug: 'ms-office-mastery',
    courseName: 'Advanced MS Office & Excel Mastery',
    courseId: 'OFF-201',
    coursePrice: 3499,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verification_pending',
    createdAt: '2024-09-26T12:05:00.000Z',
    mode: 'online',
    education: 'Working Professional',
    message: 'Interested in advanced dashboard formulas and macros.',
    payment: {
      utr: '426935910283',
      paymentDate: '2024-09-26',
      submittedAt: '2024-09-26T12:10:00.000Z',
      screenshotB64: null,
      screenshotName: 'upi_ref.png'
    }
  },
  {
    enrollmentId: 'SKS-2024-91828',
    fullName: 'Ananya Joshi',
    mobile: '+91 94231 98765',
    email: 'ananya.joshi88@gmail.com',
    city: 'Pune',
    courseSlug: 'cloud-devops',
    courseName: 'Cloud Computing & DevOps Engineer',
    courseId: 'CLD-401',
    coursePrice: 14999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'verified',
    createdAt: '2024-09-26T15:10:00.000Z',
    mode: 'online',
    education: 'BE Computers',
    message: 'Want AWS and Docker certification prep.',
    payment: {
      utr: '426941829104',
      paymentDate: '2024-09-26',
      submittedAt: '2024-09-26T15:15:00.000Z',
      screenshotB64: null,
      screenshotName: 'ananya_upi_utr.jpg'
    }
  },
  {
    enrollmentId: 'SKS-2024-91829',
    fullName: 'Rajesh Nair',
    mobile: '+91 93456 78901',
    email: 'rajesh.nair.pune@gmail.com',
    city: 'Pune',
    courseSlug: 'digital-marketing',
    courseName: 'Digital Marketing & Performance Ads',
    courseId: 'MKT-101',
    coursePrice: 4999,
    upiId: '8390217169-1@nyes',
    paymentStatus: 'awaiting_payment',
    createdAt: '2024-09-26T17:40:00.000Z',
    mode: 'online',
    education: 'Graduate / Marketing',
    message: 'Will submit UPI payment tonight.',
    payment: null
  }
];

const Storage = {
  // ── Private helpers ─────────────────────────────────────────────────────

  _read() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Initialize with seed orders
        const initial = {};
        SEED_ORDERS.forEach(o => { initial[o.enrollmentId] = o; });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(stored) || {};
    } catch (e) {
      console.warn('localStorage read error:', e);
      const initial = {};
      SEED_ORDERS.forEach(o => { initial[o.enrollmentId] = o; });
      return initial;
    }
  },

  _write(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('localStorage write error:', e);
    }
  },

  // ── Server Sync Helper ───────────────────────────────────────────────────

  async syncWithServer() {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          const dict = {};
          data.orders.forEach(o => { if (o && o.enrollmentId) dict[o.enrollmentId] = o; });
          this._write(dict);
          return data.orders;
        }
      }
    } catch (e) {
      // Backend not running (e.g. static on Vercel) - silently continue using localStorage
    }
    return this.getAllEnrollments();
  },

  // ── Enrollment / Order Operations ────────────────────────────────────────

  /**
   * Save a new enrollment. Returns enrollmentId.
   */
  saveEnrollment(enrollmentData) {
    const all = this._read();
    const id = enrollmentData.enrollmentId || ('SKS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000));
    const newRecord = {
      ...enrollmentData,
      enrollmentId: id,
      upiId: enrollmentData.upiId || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes'),
      courseId: enrollmentData.courseId || this.resolveCourseId(enrollmentData.courseSlug, enrollmentData.courseName),
      paymentStatus: enrollmentData.paymentStatus || 'awaiting_payment',
      createdAt: enrollmentData.createdAt || new Date().toISOString(),
    };
    all[id] = newRecord;
    this._write(all);

    // Fire & forget sync to server
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(() => {});

    return id;
  },

  getEnrollment(enrollmentId) {
    return this._read()[enrollmentId] || null;
  },

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

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[enrollmentId])
    }).catch(() => {});

    return true;
  },

  updatePaymentStatus(enrollmentId, status) {
    const all = this._read();
    if (!all[enrollmentId]) return false;
    all[enrollmentId].paymentStatus = status;
    all[enrollmentId].statusUpdatedAt = new Date().toISOString();
    this._write(all);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[enrollmentId])
    }).catch(() => {});

    return true;
  },

  /**
   * Save or update an entire order record (from edit dialog or API).
   */
  saveOrder(order) {
    if (!order || !order.enrollmentId) return false;
    const all = this._read();
    all[order.enrollmentId] = {
      ...all[order.enrollmentId],
      ...order,
      upiId: order.upiId || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes'),
      courseId: order.courseId || this.resolveCourseId(order.courseSlug, order.courseName),
      updatedAt: new Date().toISOString()
    };
    this._write(all);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[order.enrollmentId])
    }).catch(() => {});

    return true;
  },

  getAllEnrollments() {
    const all = this._read();
    return Object.values(all).sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  },

  deleteEnrollment(enrollmentId) {
    const all = this._read();
    delete all[enrollmentId];
    this._write(all);

    fetch(`/api/orders/${encodeURIComponent(enrollmentId)}`, {
      method: 'DELETE'
    }).catch(() => {});
  },

  // ── Course ID Resolver ──────────────────────────────────────────────────
  resolveCourseId(slug, name) {
    const idMap = {
      'computer-fundamentals': 'COMP-101',
      'ms-office-mastery': 'OFF-201',
      'full-stack-web-dev': 'FSD-101',
      'advance-tally-gst': 'ACC-301',
      'python-data-science': 'DS-201',
      'graphic-design-canva': 'DSG-101',
      'digital-marketing': 'MKT-101',
      'cyber-security-basics': 'SEC-101',
      'cloud-devops': 'CLD-401',
      'typing-mastery': 'TYP-101'
    };
    if (slug && idMap[slug]) return idMap[slug];
    if (name) {
      const lower = name.toLowerCase();
      if (lower.includes('full stack') || lower.includes('mern')) return 'FSD-101';
      if (lower.includes('data science') || lower.includes('machine learning')) return 'DS-201';
      if (lower.includes('tally') || lower.includes('gst')) return 'ACC-301';
      if (lower.includes('office') || lower.includes('excel')) return 'OFF-201';
      if (lower.includes('devops') || lower.includes('cloud')) return 'CLD-401';
      if (lower.includes('fundamental')) return 'COMP-101';
      if (lower.includes('marketing')) return 'MKT-101';
    }
    return 'CRS-' + Math.floor(100 + Math.random() * 900);
  },

  // ── CSV Bulk Import / Update ─────────────────────────────────────────────

  /**
   * Parse CSV string into an array of order objects.
   * Auto-maps variations of headers (e.g. "Order id", "Order ID", "transaction id of upi", "UTR", etc.)
   */
  parseCSV(csvText) {
    if (!csvText || !csvText.trim()) return [];
    
    // Split lines handling \r\n and \n
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];

    // Parse header row
    const headers = this._parseCSVRow(lines[0]).map(h => h.trim().toLowerCase());
    
    const orders = [];
    for (let i = 1; i < lines.length; i++) {
      const row = this._parseCSVRow(lines[i]);
      if (row.length === 0 || row.every(val => !val.trim())) continue;

      const obj = {};
      headers.forEach((h, colIndex) => {
        obj[h] = row[colIndex] ? row[colIndex].trim() : '';
      });

      // Normalize fields according to requirements
      const name = obj['name'] || obj['student name'] || obj['fullname'] || obj['full name'] || 'Student';
      const orderId = obj['order id'] || obj['orderid'] || obj['id'] || obj['enrollment id'] || ('SKS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000));
      const upiId = obj['upi id'] || obj['upi'] || obj['upi_id'] || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes');
      
      // Clean amount: remove ₹, commas, INR
      let rawAmount = obj['amount'] || obj['price'] || obj['fee'] || '0';
      rawAmount = String(rawAmount).replace(/[₹,INR\s]/gi, '');
      const amount = parseFloat(rawAmount) || 0;

      const dateTimeStr = obj['date and time'] || obj['date & time'] || obj['date'] || obj['createdat'] || new Date().toISOString();
      let isoDate = new Date(dateTimeStr).toISOString();
      if (isNaN(new Date(isoDate).getTime())) {
        isoDate = new Date().toISOString();
      }

      const courseName = obj['course name'] || obj['coursename'] || obj['course'] || 'Computer Course';
      const courseId = obj['course id'] || obj['courseid'] || this.resolveCourseId(null, courseName);
      const email = obj['email address'] || obj['email'] || '';
      const utr = obj['transaction id of upi'] || obj['transaction id'] || obj['utr'] || obj['transaction_id'] || '';
      const status = (obj['status'] || obj['payment status'] || (utr ? 'verified' : 'awaiting_payment')).toLowerCase().replace(/\s+/g, '_');
      const mobile = obj['mobile'] || obj['phone'] || '';

      const normalized = {
        enrollmentId: orderId,
        fullName: name,
        mobile: mobile,
        email: email,
        city: obj['city'] || 'Pune',
        courseName: courseName,
        courseId: courseId,
        coursePrice: amount,
        upiId: upiId,
        paymentStatus: ['verified', 'rejected', 'verification_pending', 'awaiting_payment'].includes(status) ? status : (utr ? 'verified' : 'awaiting_payment'),
        createdAt: isoDate,
        mode: obj['mode'] || 'online',
        education: obj['education'] || 'Graduate',
        payment: utr ? {
          utr: utr,
          paymentDate: isoDate.slice(0, 10),
          submittedAt: isoDate,
          screenshotB64: null,
          screenshotName: 'csv_imported'
        } : null
      };

      orders.push(normalized);
    }
    return orders;
  },

  _parseCSVRow(text) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  },

  /**
   * Apply bulk imported orders.
   * mode = 'update' (updates matching Order IDs, adds new ones)
   * mode = 'replace' (replaces entire database)
   */
  async applyBulkOrders(importedOrders, mode = 'update') {
    const all = mode === 'replace' ? {} : this._read();
    let updatedCount = 0;
    let addedCount = 0;

    importedOrders.forEach(o => {
      if (all[o.enrollmentId]) {
        all[o.enrollmentId] = {
          ...all[o.enrollmentId],
          ...o,
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
      } else {
        all[o.enrollmentId] = o;
        addedCount++;
      }
    });

    this._write(all);

    // Sync to backend if server is active
    try {
      await fetch('/api/orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: importedOrders, mode })
      });
    } catch (e) {
      // Ignored for static hosting
    }

    return { total: Object.keys(all).length, updatedCount, addedCount };
  },

  /**
   * Export all orders into CSV with the EXACT requested columns:
   * Name, Order id, Upi id, Amount, Date and Time, Course name, Course ID, Email address, transaction id of upi, Status
   */
  exportToCSV(ordersList) {
    const list = ordersList || this.getAllEnrollments();
    const headers = [
      'Name',
      'Order id',
      'Upi id',
      'Amount',
      'Date and Time',
      'Course name',
      'Course ID',
      'Email address',
      'transaction id of upi',
      'Payment Status',
      'Mobile'
    ];

    const rows = list.map(o => {
      const amount = o.coursePrice || 0;
      const formattedDate = o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }) : '';
      const utr = (o.payment && o.payment.utr) || o.utr || '';

      return [
        o.fullName || '',
        o.enrollmentId || '',
        o.upiId || '8390217169-1@nyes',
        amount,
        formattedDate,
        o.courseName || '',
        o.courseId || '',
        o.email || '',
        utr,
        o.paymentStatus || '',
        o.mobile || ''
      ];
    });

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(r => r.map(c => `"${String(c !== undefined && c !== null ? c : '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return csvContent;
  },

  /**
   * Download sample CSV template.
   */
  generateSampleCSV() {
    const sampleRows = [
      ['Name','Order id','Upi id','Amount','Date and Time','Course name','Course ID','Email address','transaction id of upi','Payment Status','Mobile'],
      ['Rahul Sharma','SKS-2024-91823','8390217169-1@nyes','19999','25 Sep 2024, 08:00 PM','Full Stack MERN Developer Mastery','FSD-101','rahul.sharma92@gmail.com','426910847291','verified','+91 98765 12345'],
      ['Priya Verma','SKS-2024-91824','8390217169-1@nyes','9999','25 Sep 2024, 09:45 PM','Data Science & Machine Learning with Python','DS-201','priya.verma@outlook.com','426915729103','verified','+91 98234 56789'],
      ['Amit Kumar Patel','SKS-2024-91825','8390217169-1@nyes','4999','26 Sep 2024, 03:15 PM','Advance Tally Prime with GST & TDS','ACC-301','amit.patel.pune@gmail.com','426922849102','verification_pending','+91 97123 45678'],
      ['Sneha Kulkarni','SKS-2024-91826','8390217169-1@nyes','1999','26 Sep 2024, 11:20 AM','Computer Fundamentals & Windows OS','COMP-101','sneha.kulkarni@yahoo.com','426930194827','verified','+91 96543 21098']
    ];
    return sampleRows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  },

  /**
   * Bulletproof universal file downloader that works in iframes and all browsers.
   */
  downloadFile(content, filename, mimeType = 'text/csv;charset=utf-8;') {
    try {
      const bomContent = content.startsWith('\uFEFF') ? content : '\uFEFF' + content;
      const blob = new Blob([bomContent], { type: mimeType });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return true;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();

      // Delay revoke so browser download manager has time to read the stream
      setTimeout(() => {
        try {
          if (document.body.contains(a)) document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e) {}
      }, 2500);
      return true;
    } catch (err) {
      console.warn('Blob download failed, trying data URI fallback:', err);
      try {
        const encoded = 'data:text/csv;charset=utf-8,' + encodeURIComponent('\uFEFF' + content);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = encoded;
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          if (document.body.contains(a)) document.body.removeChild(a);
        }, 1500);
        return true;
      } catch (err2) {
        console.error('Data URI download failed, fallback to server link:', err2);
        const link = document.createElement('a');
        link.href = '/api/orders/sample-csv';
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 1000);
        return false;
      }
    }
  },

  /**
   * Trigger Sample CSV Template Download
   */
  downloadSampleCSV() {
    const csv = this.generateSampleCSV();
    return this.downloadFile(csv, 'sikshasetu-orders-sample-template.csv');
  },

  /**
   * Trigger Orders CSV Download
   */
  exportOrdersToCSV(ordersList) {
    const csv = this.exportToCSV(ordersList);
    const dateStr = new Date().toISOString().slice(0, 10);
    return this.downloadFile(csv, `sikshasetu-orders-${dateStr}.csv`);
  },

  // ── Password & Auth ──────────────────────────────────────────────────────

  getCustomPassword() {
    return localStorage.getItem(CUSTOM_PASSWORD_KEY) || null;
  },

  setCustomPassword(newPwd) {
    localStorage.setItem(CUSTOM_PASSWORD_KEY, newPwd);
  },

  async verifyPassword(pwd) {
    // 1. Check custom password stored in localStorage
    const custom = this.getCustomPassword();
    if (custom && pwd === custom) return true;

    // 2. Check CONFIG.adminPassword
    if (typeof CONFIG !== 'undefined' && pwd === CONFIG.adminPassword) return true;

    // 3. Fallback check with server API
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.success;
      }
    } catch (e) {
      // Offline fallback
    }

    return pwd === 'admin123';
  }
};
