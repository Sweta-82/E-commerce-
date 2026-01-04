import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
import app from './app.js';
import { connectMongoDB } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';

const port = process.env.PORT || 3000;



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
