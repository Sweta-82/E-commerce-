import express from 'express';
import { processPayment, sendRazorpayApiKey } from '../controller/paymentController.js';
import { verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.route('/payment/process').post(verifyUserAuth, processPayment);
router.route('/payment/apikey').get(verifyUserAuth, sendRazorpayApiKey);

export default router;
