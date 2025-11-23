import mongoose from 'mongoose';

export const connectMongoDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
    .then((data) => {
        console.log(`MongoDB connected to server ${data.connection.host}`);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);  
    });
};
