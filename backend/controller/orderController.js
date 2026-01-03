import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import HandleError from "../utils/handleError.js";
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';


// create new order
export const createNewOrder = handleAsyncError(async (req, res, next) => {
    // Restrict Admin from placing orders
    // if (req.user && req.user.role === 'admin') {
    //     return next(new HandleError("Admins cannot place orders.", 403));
    // }

    const { shippingInfo, orderItems, paymentInfo, user, paidAt, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt: Date.now(),
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id

    })
    res.status(201).json({
        success: true,
        order
    })
})

// getting single order
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})


// all my orders
export const allMyOrder = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        orders
    })
})

// getting all order
export const getAllMyOrder = handleAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})
// update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    if (order.orderStatus === 'Delivered') {
        return next(new HandleError("This product is alrady delivered", 404));
    }
    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)))
    // destructureing
    order.orderStatus = req.body.status;
    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        order
    })
})

// get orders for products created by the specific admin
export const getAdminProductOrders = handleAsyncError(async (req, res, next) => {
    // 1. Find all products created by this user (admin)
    const products = await Product.find({ user: req.user._id });
    const productIds = products.map(product => product._id);

    // 2. Find all orders that contain any of these products
    const orders = await Order.find({
        "orderItems.product": { $in: productIds }
    });

    const unreadCount = orders.filter(order => !order.isSeenByAdmin).length;

    res.status(200).json({
        success: true,
        count: orders.length,
        unreadCount,
        orders
    });
});

// Mark admin notifications as read
export const markNotificationsAsRead = handleAsyncError(async (req, res, next) => {
    const products = await Product.find({ user: req.user._id });
    const productIds = products.map(product => product._id);

    await Order.updateMany(
        { "orderItems.product": { $in: productIds }, isSeenByAdmin: false },
        { $set: { isSeenByAdmin: true } }
    );

    res.status(200).json({
        success: true
    });
});

async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
}

// delete order
export const deleteOrder = handleAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("Order not found with this Id", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});
