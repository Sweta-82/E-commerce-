import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { allMyOrder, createNewOrder, getAllMyOrder, getSingleOrder, updateOrderStatus, getAdminProductOrders, markNotificationsAsRead } from '../controller/orderController.js';
const router = express.Router();
router.route('/new/order').post(verifyUserAuth, createNewOrder)

router.route('/admin/order/:id').get(verifyUserAuth, roleBasedAccess('admin'), getSingleOrder)
    .put(verifyUserAuth, roleBasedAccess('admin'), updateOrderStatus)
    ;

router.route('/admin/orders').get(verifyUserAuth, roleBasedAccess('admin'), getAllMyOrder);


// Notifications
router.route('/admin/orders/notifications')
    .get(verifyUserAuth, roleBasedAccess('admin'), getAdminProductOrders)
    .put(verifyUserAuth, roleBasedAccess('admin'), markNotificationsAsRead);

router.route('/orders/user').get(verifyUserAuth, allMyOrder);


export default router;