import Product from '../models/productModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import { v2 as cloudinary } from 'cloudinary'
// creating products
export const createProducts = handleAsyncError(async (req, res, next) => {
    console.log("createProducts called");
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("req.user:", req.user);

    // check user authentication
    if (!req.user || !req.user.id) {
        return next(new HandleError("Authentication info missing", 401));
    }

    let images = [];

    // Handle express-fileupload
    if (req.files && req.files.images) {
        const fileUploads = req.files.images;
        if (Array.isArray(fileUploads)) {
            images = fileUploads.map(file => file.tempFilePath);
        } else {
            images.push(fileUploads.tempFilePath);
        }
    } else if (req.body.images) {
        // Fallback if images are sent as strings (e.g. base64 or urls)
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else if (Array.isArray(req.body.images)) {
            images = req.body.images;
        }
    }

    // upload images to Cloudinary
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
            // return next(new HandleError("Image upload failed", 500)); 
            // Continue if one fails? Or fail all? Let's fail for now to be safe.
            return next(new HandleError("Image upload failed", 500));
        }
    }

    // prepare product data
    // Map 'name' to 'title' if title is missing
    if (!req.body.title && req.body.name) {
        req.body.title = req.body.name;
    }

    req.body.image = imageLinks; // Model expects 'image'
    req.body.back = imageLinks;  // Model expects 'back', using same images for now
    req.body.user = req.user.id;

    // create the product
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// get all products

export const getAllProducts = handleAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new APIFunctionality(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;
    const filteredProductsCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})
/*
export const getAllProducts = handleAsyncError(async (req, res, next) => {
    console.log("getAllProducts called"); // Debug log
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
*/

// update product
export const updateProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return next(new HandleError("Produect not found", 404));
    }
    res.status(200).json({
        success: true,
        product
    })
})
// delete 
export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new HandleError("Produect not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Product deletled sucessfully"
    })
})

// acessing a single product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Produect not found", 404));

    }
    res.status(200).json({
        success: true,
        product
    })
})

// creating and updating reviews
export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.user.id);
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }
    const reviewExists = product.reviews.find(review => review.user.toString() === req.user.id.toString());
    if (reviewExists) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.rating = rating,
                    review.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review);
    }
    product.numberOfReviews = product.reviews.length
    let avg = 0;
    product.reviews.forEach(review => {
        avg += review.rating
    })

    product.ratings = product.reviews.length > 0 ? avg / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        product
    })
})


// getting reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
    // console.log(req.query.id);
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// deleting reviews
export const deleteReview = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new HandleError("Product not found", 400));
    }
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    // console.log(reviews);
    let sum = 0;
    reviews.forEach(review => {
        sum += review.rating
    })
    const ratings = reviews.length > 0 ? sum / reviews.length : 0;
    const numberOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numberOfReviews
    }, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    })
})

// getting all product for admin
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new APIFunctionality(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await apiFeature.query;
    const filteredProductsCount = products.length;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})