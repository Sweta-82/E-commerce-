import express from 'express'
const app = express();
import product from './routes/productRoutes.js'
import user from './routes/userRoute.js'
import order from './routes/orderRoute.js'
import payment from './routes/paymentRoute.js'
import cookieParser from 'cookie-parser';
import errorHandleMiddleware from './middleware/error.js';
import fileUpload from 'express-fileupload';
// middleware
app.use(express.json());
// cookie parser
app.use(cookieParser());

app.use(fileUpload({ useTempFiles: true }))


// Route

app.use("/api/v1", product)

app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)
import dashboard from "./routes/dashboardRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/v1", dashboard);

// Serve Static Files Only in Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}
app.use(errorHandleMiddleware)
export default app;