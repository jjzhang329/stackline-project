import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId: string) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch product');
        }
    }
);