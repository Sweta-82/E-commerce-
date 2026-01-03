import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

console.log('Testing Dotenv Load:');
console.log('PORT exists:', !!process.env.PORT);
console.log('DB_URL exists:', !!process.env.DB_URL);
console.log('RAZORPAY_API_KEY exists:', !!process.env.RAZORPAY_API_KEY);
console.log('RAZORPAY_API_SECRET exists:', !!process.env.RAZORPAY_API_SECRET);
