
const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer_midd');

const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

// Fetch Material List
router.get('/products', AdminController.fetchProducts);

// Fetch Categories and Variants
router.get('/categoriesvariants', AdminController.getCategoriesAndVariants);

// Create new product
router.post('/createproduct', authMiddleware, isAdmin, upload.single("file"), AdminController.createProduct);

// Create new category
router.post('/createcategory', authMiddleware, isAdmin, AdminController.createCategory)

// Create new variant
router.post('/createvariant', authMiddleware, isAdmin, AdminController.createVariant)


module.exports = router;