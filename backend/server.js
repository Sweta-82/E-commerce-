import dotenv, { config } from 'dotenv';
dotenv.config({ path: './config/config.env' })
import app from './app.js';
import { connectMongoDB } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';

const port = process.env.PORT || 3000;

console.log('DB_URL:', process.env.DB_URL);  // Debugging line to check

connectMongoDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to uncaught exception');
    process.exit(1);
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to unhandledRejection');
    server.close(() => {
        process.exit(1);
    });
});
