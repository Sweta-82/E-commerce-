import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import handleAsyncError from '../middleware/handleAsyncError.js';

export const getDashboardStats = handleAsyncError(async (req, res, next) => {
    const products = await Product.find();
    const users = await User.find();
    const orders = await Order.find();

    const productCount = products.length;
    const userCount = users.length;
    const orderCount = orders.length;

    let totalIncome = 0;
    orders.forEach(order => {
        totalIncome += order.totalPrice;
    });

    const outOfStock = products.filter(product => product.stock === 0).length;
    const inStock = products.length - outOfStock;

    res.status(200).json({
        success: true,
        productCount,
        userCount,
        orderCount,
        totalIncome,
        outOfStock,
        inStock
    });
});
