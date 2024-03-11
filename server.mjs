import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = process.env.PORT || 3100;

const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Serve static files from the 'build' directory
app.use(express.static(join(__dirname, 'build')));

// Define a route to serve the React app
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.get('/api/products/:productId', (req, res) => {
    const product = data.products.find((p) => p.id === req.params.productId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.status(200).json(product);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});