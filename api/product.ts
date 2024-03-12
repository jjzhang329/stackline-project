
import fs from 'fs';
import path from 'path';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Product } from '../src/types/product'

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        const dbFilePath = path.resolve('./db.json');
        const dbData: { products: Product[] } = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

        const { productId } = req.query;
        const product = dbData.products.find(p => p.id === productId as string);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};