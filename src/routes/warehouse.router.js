
const express = require('express');
const WarehouseController = require('../controller/warehouse.controller');
const authMiddleware = require("../middleware/auth_middleware");
const router = express.Router();

router.post('/receivewarehouse', authMiddleware, WarehouseController.receiveMaterial); // Checked

router.get('/fetch/:projectId', authMiddleware, WarehouseController.fetchWarehouseData); // Checked

router.get('/filter', WarehouseController.filterWarehouseData); // Checked

router.get('/po/:id', authMiddleware, WarehouseController.getPOById); // Checked

router.post('/update/:id', authMiddleware, WarehouseController.updatePo); // Checked

router.post('/updatecertorpassportbyid', authMiddleware, WarehouseController.updateCertOrPassportById);  // Checked

router.get('/typecount/:projectId', authMiddleware, WarehouseController.getTypeCount); // Checked

router.post('/fetchselecteditems', authMiddleware, WarehouseController.fetchSelectedItemsById); // Checked

router.post('/receivetostock', authMiddleware, WarehouseController.receiveToStock); // Checked


module.exports = router;