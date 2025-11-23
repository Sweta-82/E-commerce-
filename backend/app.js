import express from 'express'
const app = express();
import product from './routes/productRoutes.js'
import user from './routes/userRoute.js'
import order from './routes/orderRoute.js'
import cookieParser from 'cookie-parser';
import errorHandleMiddleware from './middleware/error.js';
import fileUpload from 'express-fileupload';
// middleware
app.use(express.json());
// cookie parser
app.use(cookieParser());

app.use(fileUpload())
// Route

app.use("/api/v1",product)

app.use("/api/v1",user)
app.use("/api/v1",order)
app.use(errorHandleMiddleware)
export default app;