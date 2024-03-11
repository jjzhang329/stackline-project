import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { fetchProduct } from '../actions/productActions';

interface ProductState {
    product: Product | null;
    error: string | null;
}

const initialState: ProductState = {
    product: null,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                console.log('jijij')
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to fetch product';
            });
    },
});


export default productSlice.reducer;