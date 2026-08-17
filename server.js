import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const staticDir = path.join(__dirname, 'sikshasetu');

// Serve static assets from the sikshasetu directory at root
app.use(express.static(staticDir));

// Also serve under /sikshasetu prefix for compatibility
app.use('/sikshasetu', express.static(staticDir));

// Fallback to index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`SikshaSetu server running on http://${HOST}:${PORT}`);
});
