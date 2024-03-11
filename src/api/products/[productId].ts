import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { productId } = req.query;
    console.log('jiohjhiu')
    // Read data from db.json
    const data = JSON.parse(fs.readFileSync('../db.json', 'utf-8'));

    // Find product by ID
    const product = data.products.find((p: { id: string }) => p.id === productId);

    if (!product) {
        // Product not found
        res.status(404).json({ error: 'Product not found' });
    } else {
        // Product found, return it
        res.status(200).json(product);
    }
}