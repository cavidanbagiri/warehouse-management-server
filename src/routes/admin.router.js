
const express = require('express');
const router = express.Router();

const multer = require('multer');


const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/categoriesvariants', AdminController.getCategoriesAndVariants);



const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/createproduct', authMiddleware, isAdmin, upload.single("file"), AdminController.createProduct);

router.post('/createcategory', authMiddleware, isAdmin, AdminController.createCategory)
router.post('/createvariant', authMiddleware, isAdmin, AdminController.createVariant)


module.exports = router;