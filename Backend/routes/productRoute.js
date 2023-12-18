const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct, reviewProduct, deleteReview, updateReview } = require("../controller/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/",protect,adminOnly,createProduct);
router.get("/",getProducts);
router.get("/:id",getProduct);
router.delete("/:id",protect,adminOnly,deleteProduct);
router.patch("/:id",protect,adminOnly,updateProduct);
router.patch("/review/:id",protect,reviewProduct);
router.patch("/deleteReview/:id",protect,deleteReview);
router.patch("/updateReview/:id",protect,updateReview);

module.exports = router;