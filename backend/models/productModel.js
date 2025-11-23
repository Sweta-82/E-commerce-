import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    price: {
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength: [7, "Price cannot exceed 7 digits"]
    },
    size: {
        type:String,
        required:[true,"Please Enter Product Size"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required: true
        }
    }],
    back: [{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required: true
        }
    }],
    
    category: {
        type:String,
        required:[true,"Please Enter Product Category"],
        
    },
    stock: {
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength: [5, "Price cannot exceed 5 digits"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default: 0,
    },
    reviews: [{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },

        name:{
            type:String,
            required: true,
        },
        rating:{
            type:Number,
            required: true,
        },
        comment:{
            type:String,
            required: true,
        }
    }],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("Product",productSchema)