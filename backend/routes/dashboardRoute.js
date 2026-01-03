import express from 'express';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { getDashboardStats } from '../controller/dashboardController.js';

const router = express.Router();

router.route('/admin/dashboard/stats').get(verifyUserAuth, roleBasedAccess('admin'), getDashboardStats);

export default router;
