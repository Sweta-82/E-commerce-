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

    // Allow if admin or if the order belongs to the user
    if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
        return next(new HandleError("You are not authorized to view this order", 403));
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

// getting all order -- Admin
export const getAllMyOrder = handleAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const ordersCount = await Order.countDocuments();

    const apiFeature = new APIFunctionality(Order.find(), req.query)
        .pagination(resultPerPage);

    const orders = await apiFeature.query;

    let totalAmount = 0;
    // Calculate total amount for all orders (not just paginated ones) - Optional, but expensive query. 
    // For now let's just sum paginated ones or do a separate aggregate if needed.
    // The original logic summed ALL. Doing that is heavy. 
    // Let's do a simple aggregate for totalAmount separately if critical.
    // For now, removing the heavy loop over all orders and just return paginated orders.

    // const ordersTotal = await Order.find(); // Too heavy. 
    // ordersTotal.forEach(order => {
    //     totalAmount += order.totalPrice;
    // })
    // Better way for totalAmount:
    const totalAmountAgg = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    totalAmount = totalAmountAgg.length > 0 ? totalAmountAgg[0].total : 0;

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
        ordersCount,
        resultPerPage
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
    // 1. find all products created by this user (admin)
    const products = await Product.find({ user: req.user._id });
    const productIds = products.map(product => product._id);

    // 2. find all orders that contain any of these products
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

// mark admin notifications as read
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
