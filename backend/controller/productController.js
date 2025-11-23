import Product from '../models/productModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import {v2 as cloudinary} from 'cloudinary'
// http://localhost:8000/api/v1/product/68445377b0444fae5827e157?keyword=shirt



// creating products


export const createProducts = handleAsyncError(async (req, res, next) => {
    // 1️⃣ Check user authentication
    if (!req.user || !req.user.id) {
        return next(new HandleError("Authentication info missing", 401));
    }

    // 2️⃣ Handle images input
    let images = [];

    // If images come as string or array in body
    if (req.body.images) {
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images;
        }
    }

    // If images come as files (multipart/form-data)
    if (req.files && req.files.length > 0) {
        images = images.concat(req.files.map(file => file.path));
    }

    // 3️⃣ Upload images to Cloudinary
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return next(new HandleError("Image upload failed", 500));
        }
    }

    // 4️⃣ Prepare product data
    req.body.images = imageLinks;
    req.body.user = req.user.id;

    // 5️⃣ Create the product
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// get all products

export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  // Calculate totalPages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  //Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

// update product
export const updateProduct=handleAsyncError( async(req,res,next)=>{
    const product=await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true
    })
    if(!product){
        return next(new HandleError("Produect not found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
})
// delete 
export const deleteProduct=handleAsyncError( async(req,res,next)=>{
    const product=await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return next(new HandleError("Produect not found",404));
    }
    res.status(200).json({
        success:true,
        message:"Product deletled sucessfully"
    })
})

// acessing a single product
export const getSingleProduct =handleAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new HandleError("Produect not found",404));

    }
    res.status(200).json({
        success:true,
        product
    })
})

// creating and updating reviews
export const createReviewForProduct =handleAsyncError( async(req,res,next)=>{
    // console.log(req.body);
    // console.log(req.user.id);
    const {rating, comment, productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product=await Product.findById(productId);
    if(!product){
        return next(new HandleError("Product not found",400));
    }
    // console.log(product);
    const reviewExists=product.reviews.find(review=>review.user.toString()===req.user.id.toString());
    if(reviewExists){
        product.reviews.forEach(review=>{
            if(review.user.toString()===req.user.id.toString()){
                review.rating=rating,
                review.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review);
    }
    product.numberOfReviews=product.reviews.length
    let avg=0;
    product.reviews.forEach(review=>{
        avg+=review.rating
    }) 

    product.ratings=product.reviews.length>0?avg/product.reviews.length:0;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        product
    })
})


// getting reviews
export const getProductReviews =handleAsyncError( async(req,res,next)=>{
    // console.log(req.query.id);
    const product= await Product.findById(req.query.id);
    if(!product){
        return next(new HandleError("Product not found",400));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

// deleting reviews
export const deleteReview =handleAsyncError( async(req,res,next)=>{
   const product=await Product.findById(req.query.productId)
   if(!product){
        return next(new HandleError("Product not found",400));
    }
    const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString());
    // console.log(reviews);
    let sum=0;
    reviews.forEach(review=>{
        sum+=review.rating
    })
    const ratings=reviews.length>0?sum/reviews.length:0;
    const numberOfReviews=reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numberOfReviews
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"Review deleted successfully"
    })
})

// getting all product for admin
export const getAdminProducts=handleAsyncError(async(req, res, next)=>{
    const products=await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})