import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'
export const getProduct=createAsyncThunk('product/getProduct',async({keyword,page=1},{rejectWithValue})=>{
    try{
        const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`: `/api/v1/products?page=${page}`;
        const {data}= await axios.get(link);
        console.log("Response",data);
        return data;
        
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred')
    }
})

//  productDetials 
export const getProductDetails=createAsyncThunk('product/getProductDetails',async(id,{rejectWithValue})=>{
    try{
        const link=`/api/v1/product/${id}`;
        const {data}= await axios.get(link);
        console.log("Response",data);
        return data;
        
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred')
    }
})

export const createReview=createAsyncThunk('product/createReview',async({rating,comment,productId},{rejectWithValue})=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }  
        const {data}=await axios.put('/api/v1/review',{rating,comment,productId},config);
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || 'An error occurred')
    }
})
const productSlice=createSlice({
name:'product',
initialState:{
    products:[],
    productCount:0,
    loading:false,
    error:null,
    product:null,
    resultsPerPage:0,
    totalPages:1,
    reviewSuccess:false,
    reviewLoading:false
},

// if any error we can assign null
reducers:{
    removeErrors:(state)=>{
        state.error=null
    },
    removeSuccess:(state)=>{
        state.reviewSuccess=false
    },
},

extraReducers:(builder)=>{
    builder.addCase(getProduct.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
    .addCase(getProduct.fulfilled,(state,action)=>{
        console.log("Fullfilled action payload",action.payload);
        state.loading=false;
        state.error=null;
        state.products=action.payload.products;
        state.productCount=action.payload.productCount;
        // state.resultsPerPage=action.payload.resultsPerPage;
        // state.totalPages=action.payload.totalPages;
        })


        .addCase(getProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload ||'Someting went wrong';
        // state.products=[]
    })


    // reviews
    builder.addCase(getProductDetails.pending,(state)=>{
        state.loading=true;
        state.error=null
    })
    .addCase(getProductDetails.fulfilled,(state,action)=>{
        console.log('Product details',action.payload);
        
        state.loading=false;
        state.error=null;
        state.product=action.payload.product;
        state.productCount=action.payload.productCount;
        state.resultsPerPage=action.payload.resultsPerPage;
        state.totalPages=action.payload.totalPages;
    })
    .addCase(getProductDetails.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload ||'Something went wrong'
    })

    builder.addCase(createReview.pending,(state)=>{
        state.reviewLoading=true;
        state.error=null
    })
    .addCase(createReview.fulfilled,(state,action)=>{
        state.reviewLoading=false;
        state.reviewSuccess=true;
    })
    .addCase(createReview.rejected,(state,action)=>{
        state.reviewLoading=false;
        state.error=action.payload ||'Something went wrong'
       
        
    })

}

})

export const {removeSuccess,removeErrors}=productSlice.actions;
export default productSlice.reducer;