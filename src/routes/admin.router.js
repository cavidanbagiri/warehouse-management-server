
const express = require('express');
const router = express.Router();

const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/categoriesvariants', AdminController.getCategoriesAndVariants);

router.post('/createcategory', authMiddleware, isAdmin, AdminController.createCategory)
router.post('/createvariant', authMiddleware, isAdmin, AdminController.createVariant)


module.exports = router;