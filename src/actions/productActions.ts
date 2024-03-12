import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId: string) => {
        const response = await axios.get(`/api/product?productId=${productId}`);
        return response.data;

    }
);