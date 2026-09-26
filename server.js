import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const staticDir = path.join(__dirname, 'sikshasetu');

// Safely resolve data directory with read-only / serverless fallback (Vercel)
let dataDir = path.join(__dirname, 'data');
let isFsWritable = false;
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const testFile = path.join(dataDir, '.write-test');
  fs.writeFileSync(testFile, '1');
  fs.unlinkSync(testFile);
  isFsWritable = true;
} catch (e) {
  // If filesystem is read-only (such as Vercel Lambda), fallback to /tmp
  dataDir = path.join('/tmp', 'sikshasetu-data');
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    isFsWritable = true;
  } catch (err2) {
    isFsWritable = false;
  }
}

const ordersFilePath = path.join(dataDir, 'orders.json');
const authFilePath = path.join(dataDir, 'admin-auth.json');

// Default initial seed orders
const DEFAULT_ORDERS = [
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

// In-memory fallback in case filesystem is restricted
let inMemoryOrders = null;
let inMemoryPassword = 'admin123';

// Helper functions for orders file storage
function readOrdersFromFile() {
  if (inMemoryOrders && !isFsWritable) {
    return inMemoryOrders;
  }
  try {
    if (!fs.existsSync(ordersFilePath)) {
      if (isFsWritable) {
        fs.writeFileSync(ordersFilePath, JSON.stringify(DEFAULT_ORDERS, null, 2), 'utf-8');
      }
      inMemoryOrders = [...DEFAULT_ORDERS];
      return inMemoryOrders;
    }
    const raw = fs.readFileSync(ordersFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    inMemoryOrders = Array.isArray(parsed) ? parsed : [...DEFAULT_ORDERS];
    return inMemoryOrders;
  } catch (err) {
    if (!inMemoryOrders) inMemoryOrders = [...DEFAULT_ORDERS];
    return inMemoryOrders;
  }
}

function writeOrdersToFile(orders) {
  inMemoryOrders = orders;
  if (!isFsWritable) return true;
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing orders file:', err);
    return true; // Still preserved in memory
  }
}

// Helper for admin password
function getAdminPassword() {
  try {
    if (fs.existsSync(authFilePath)) {
      const data = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
      if (data && data.password) return data.password;
    }
  } catch (e) {
    // fallback
  }
  return inMemoryPassword || 'admin123';
}

function setAdminPassword(newPassword) {
  inMemoryPassword = newPassword;
  if (!isFsWritable) return true;
  try {
    fs.writeFileSync(authFilePath, JSON.stringify({ password: newPassword, updatedAt: new Date().toISOString() }, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return true;
  }
}

// Middlewares
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Helper to reliably find an HTML file across all potential locations
function findHtmlFile(fileName) {
  const candidates = [
    path.join(__dirname, fileName),
    path.join(process.cwd(), fileName),
    path.join(staticDir, fileName),
    path.join(__dirname, 'sikshasetu', fileName),
    path.join(process.cwd(), 'sikshasetu', fileName)
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (e) {}
  }
  return null;
}

function serveHtml(res, fileName) {
  const target = findHtmlFile(fileName);
  if (target) {
    return res.sendFile(target);
  }
  // If static directory has it
  const fallback = path.join(staticDir, fileName);
  return res.sendFile(fallback);
}

// Serve static assets from both root and sikshasetu directories
app.use(express.static(__dirname));
app.use(express.static(staticDir));
app.use('/sikshasetu', express.static(staticDir));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/sikshasetu/js', express.static(path.join(staticDir, 'js')));

// ── Admin Panel Dedicated Routes ──────────────────────────────────────────
// Guarantees /admin, /admin.html, /sikshasetu/admin all open Admin Panel directly
app.get(['/admin', '/admin.html', '/sikshasetu/admin', '/sikshasetu/admin.html'], (req, res) => {
  serveHtml(res, 'admin.html');
});

// Clean URLs for front-facing pages
app.get(['/enroll', '/enroll.html', '/sikshasetu/enroll', '/sikshasetu/enroll.html'], (req, res) => {
  serveHtml(res, 'enroll.html');
});

app.get(['/payment', '/payment.html', '/sikshasetu/payment', '/sikshasetu/payment.html'], (req, res) => {
  serveHtml(res, 'payment.html');
});

app.get(['/confirmation', '/confirmation.html', '/sikshasetu/confirmation', '/sikshasetu/confirmation.html'], (req, res) => {
  serveHtml(res, 'confirmation.html');
});

app.get(['/course', '/course.html', '/sikshasetu/course', '/sikshasetu/course.html'], (req, res) => {
  serveHtml(res, 'course.html');
});

// ── Backend API Endpoints for Orders & Admin ──────────────────────────────

// Admin login verification
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const currentPassword = getAdminPassword();
  if (password === currentPassword) {
    res.json({ success: true, message: 'Authenticated successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect admin password' });
  }
});

// Admin change password
app.post('/api/admin/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const currentPassword = getAdminPassword();
  if (oldPassword !== currentPassword) {
    return res.status(401).json({ success: false, message: 'Current password does not match' });
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'New password must be at least 4 characters long' });
  }
  setAdminPassword(newPassword);
  res.json({ success: true, message: 'Password changed successfully' });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  const orders = readOrdersFromFile();
  res.json({ success: true, orders });
});

// Save or update an order
app.post('/api/orders', (req, res) => {
  const incoming = req.body;
  if (!incoming || !incoming.enrollmentId) {
    return res.status(400).json({ success: false, message: 'Order ID is required' });
  }

  const orders = readOrdersFromFile();
  const existingIdx = orders.findIndex(o => o.enrollmentId === incoming.enrollmentId);

  if (existingIdx >= 0) {
    orders[existingIdx] = {
      ...orders[existingIdx],
      ...incoming,
      updatedAt: new Date().toISOString()
    };
  } else {
    orders.unshift({
      ...incoming,
      createdAt: incoming.createdAt || new Date().toISOString()
    });
  }

  writeOrdersToFile(orders);
  res.json({ success: true, order: incoming });
});

// Bulk update / import orders from CSV data
app.post('/api/orders/bulk', (req, res) => {
  const { orders: incomingOrders, mode } = req.body;
  if (!Array.isArray(incomingOrders)) {
    return res.status(400).json({ success: false, message: 'Invalid orders array' });
  }

  let currentOrders = readOrdersFromFile();
  let updatedCount = 0;
  let addedCount = 0;

  if (mode === 'replace') {
    currentOrders = incomingOrders;
    addedCount = incomingOrders.length;
  } else {
    // Update existing matched by enrollmentId (Order ID) or add new
    const map = new Map();
    currentOrders.forEach(o => map.set(o.enrollmentId, o));

    incomingOrders.forEach(item => {
      const id = item.enrollmentId || item['Order id'] || item.orderId;
      if (!id) return;
      if (map.has(id)) {
        map.set(id, { ...map.get(id), ...item, updatedAt: new Date().toISOString() });
        updatedCount++;
      } else {
        map.set(id, { ...item, createdAt: item.createdAt || new Date().toISOString() });
        addedCount++;
      }
    });

    currentOrders = Array.from(map.values());
  }

  writeOrdersToFile(currentOrders);
  res.json({
    success: true,
    total: currentOrders.length,
    updatedCount,
    addedCount,
    orders: currentOrders
  });
});

// Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  let orders = readOrdersFromFile();
  const initialLength = orders.length;
  orders = orders.filter(o => o.enrollmentId !== id);

  if (orders.length !== initialLength) {
    writeOrdersToFile(orders);
    res.json({ success: true, message: 'Order deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

// Root path fallback
app.get(['/', '/index.html', '/sikshasetu', '/sikshasetu/index.html'], (req, res) => {
  serveHtml(res, 'index.html');
});

// Unknown route fallback
app.use((req, res) => {
  if (req.accepts('html')) {
    serveHtml(res, 'index.html');
  } else {
    res.status(404).json({ success: false, message: `Route not found: ${req.url}` });
  }
});

// Initialize orders file if not present
readOrdersFromFile();

// Only listen if not invoked as a serverless function (Vercel/AWS)
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, HOST, () => {
    console.log(`SikshaSetu server running on http://${HOST}:${PORT}`);
    console.log(`Admin panel available at http://${HOST}:${PORT}/admin`);
  });
}

export default app;
