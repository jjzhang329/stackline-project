import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId: string) => {
        const response = await axios.get(`/api/getProduct?productId=${productId}`);
        return response.data;
    }
);