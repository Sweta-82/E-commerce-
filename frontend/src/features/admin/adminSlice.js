import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (page = 1, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/products?page=${page}`)
        console.log("product", data);

        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While Fetching the products")
    }
})

// create product
export const createProduct = createAsyncThunk('admin/createProduct', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/admin/products/create', productData, config)
        console.log("data of admin slice:", data)
        return data

    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Product creation failed.")
    }
})

// update product
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, productData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)
        return data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Product update failed.")
    }
})


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        productCount: 0,
        resultPerPage: 1,
        resultPerPage: 1,
        success: false,
        isUpdated: false,
        loading: false,
        loading: false,
        error: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        resetUpdate: (state) => {
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false,
                    state.products = action.payload.products
                state.productCount = action.payload.productsCount
                state.resultPerPage = action.payload.resultPerPage


            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Error while fecting the detials'
            })
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false,
                    state.success = action.payload.success
                state.products.push(action.payload.product);
                console.log("Data", state.products);



            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Product creation failed.'
            })

        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.isUpdated = action.payload.success;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Product update failed.';
            })
    }
})

export const { removeErrors, removeSuccess, resetUpdate } = adminSlice.actions
export default adminSlice.reducer