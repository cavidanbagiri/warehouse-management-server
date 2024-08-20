
const express = require('express');
const WarehouseController = require('../controller/warehouse.controller');
const authMiddleware = require("../middleware/auth_middleware");
const router = express.Router();

const multer = require("multer");

// Upload Image
const upload = multer({
    storage: multer.memoryStorage(),
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // }
})

router.post('/receivewarehouse', authMiddleware, WarehouseController.receiveMaterial); 

router.get('/fetch/:projectId', authMiddleware, WarehouseController.fetchWarehouseData); 

router.get('/filter', authMiddleware, WarehouseController.filterWarehouseData); 

router.get('/po/:id', authMiddleware, WarehouseController.getPOById); 

router.post('/update/:id', authMiddleware, WarehouseController.updatePo); // Checked

router.post('/updatecertorpassportbyid', authMiddleware, WarehouseController.updateCertOrPassportById);
router.post('/uploadcertificateorpassport', authMiddleware, upload.single("file"), WarehouseController.uploadCertificateOrPassport);
router.get('/fetchcertificatesorpassport/:warehouseId', WarehouseController.fetchCertificatesOrPassports);

router.get('/typecount/:projectId', authMiddleware, WarehouseController.getTypeCount); 

router.post('/fetchselecteditems', authMiddleware, WarehouseController.fetchSelectedItemsById); 

router.post('/receivetostock', authMiddleware, WarehouseController.receiveToStock); // Checked


module.exports = router;