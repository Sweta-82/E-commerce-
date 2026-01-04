import mongoose from 'mongoose';

export const connectMongoDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then((data) => {
            console.log(`MongoDB connected to server ${process.env.DB_URL}`);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });
};
