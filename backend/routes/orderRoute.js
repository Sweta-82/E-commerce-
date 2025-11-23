import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { allMyOrder, createNewOrder, getAllMyOrder, getSingleOrder, updateOrderStatus } from '../controller/orderController.js';
const router = express.Router();
router.route('/new/order').post(verifyUserAuth,createNewOrder)

router.route('/admin/order/:id').get(verifyUserAuth,roleBasedAccess('admin'),getSingleOrder)
.put(verifyUserAuth,roleBasedAccess('admin'),updateOrderStatus)
;

router.route('/admin/orders').get(verifyUserAuth,roleBasedAccess('admin'),getAllMyOrder);


router.route('/orders/user').get(verifyUserAuth,allMyOrder);


export default router;