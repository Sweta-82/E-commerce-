import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create order
export const createOrder = createAsyncThunk('order/createOrder', async (order, { rejectWithValue }) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };
        const { data } = await axios.post('/api/v1/new/order', order, config);
        console.log("order slice data", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Order Creating Failed');
    }
});

// Get all my orders
export const getAllMyOrder = createAsyncThunk('order/getAllMyOrder', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/orders/user');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
});

// Get order details
export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (orderID, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/order/${orderID}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch order details');
    }
});

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        success: false,
        loading: false,
        error: null,
        orders: [],
        order: {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // createOrder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.success = action.payload.success;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Order Creating Failed';
            })

            // getAllMyOrder
            .addCase(getAllMyOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMyOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.success = action.payload.success;
            })
            .addCase(getAllMyOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch orders';
            })

            // getOrderDetails
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.success = action.payload.success;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch order details';
            });
    }
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;
