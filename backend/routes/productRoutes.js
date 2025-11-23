import express from 'express'
const router = express.Router();
import { createProducts, createReviewForProduct, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductReviews, getSingleProduct, updateProduct} from '../controller/productController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
// app.get("/api/v1/products",getAllProducts)
// routes
router.route("/products").get(getAllProducts).post(createProducts)

router.route("/admin/products").get(verifyUserAuth,roleBasedAccess("admin"),getAdminProducts)


router.route("/admin/products/create").post(verifyUserAuth,roleBasedAccess("admin"),createProducts);


router.route("/admin/product/:id").put(verifyUserAuth,roleBasedAccess("admin"),updateProduct).delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct);

router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUserAuth,createReviewForProduct);
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth,deleteReview);

export default router;