import handleAsyncError from '../middleware/handleAsyncError.js';
import Razorpay from 'razorpay';
import HandleError from "../utils/handleError.js";

// Process Payment
export const processPayment = handleAsyncError(async (req, res, next) => {
    console.log("Processing Payment...");
    console.log("Key ID Exists:", !!process.env.RAZORPAY_API_KEY);
    console.log("Key Secret Exists:", !!process.env.RAZORPAY_API_SECRET);
    console.log("Request Body:", req.body);

    // check if keys are available
    if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_API_SECRET) {
        return next(new HandleError("Razorpay API Keys are missing in backend configuration", 500));
    }

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
        amount: req.body.amount, // amount in the smallest currency unit (paise)
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });
});
// send razorpay API key
export const sendRazorpayApiKey = handleAsyncError(async (req, res, next) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    });
});
