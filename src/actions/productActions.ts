import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId: string) => {
        try {
            console.log('calling')
            const response = await fetch(`/api/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            return data as Product; 
        } catch (error) {
            throw new Error('Failed to fetch product');
        }
    }
);