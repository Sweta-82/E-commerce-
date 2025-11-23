import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAdminProducts=createAsyncThunk('admin/fetchAdminProducts',async(_,{rejectWithValue})=>{
    try{
        const {data}=await axios.get('/api/v1/admin/products')
        console.log("product",data);
        
        return data
    }catch(error){
        return rejectWithValue(error.response?.data || "Error While Fetching the products")
    }
})

// create product
export const createProduct=createAsyncThunk('admin/createProduct',async(productData,{rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/v1/admin/products/create',productData,config)
        console.log("data of admin slice:",data)
        return data
        
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Product creation failed.")
    }
})


const adminSlice= createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        loading:false,
        error:null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=false;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchAdminProducts.fulfilled,(state, action)=>{
            state.loading=false,
            state.products=action.payload.products
            

        })
        .addCase(fetchAdminProducts.rejected,(state, action)=>{
            state.loading=false,
            state.error=action.payload?.message|| 'Error while fecting the detials'
        })
        builder
        .addCase(createProduct.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createProduct.fulfilled,(state, action)=>{
            state.loading=false,
            state.success=action.payload.success
            state.products.push(action.payload.product);
            console.log("Data",state.products);

            
            
        })
        .addCase(createProduct.rejected,(state, action)=>{
            state.loading=false,
            state.error=action.payload?.message|| 'Product creation failed.'
        })
    }
})

export const {removeErrors, removeSuccess}=adminSlice.actions
export default adminSlice.reducer