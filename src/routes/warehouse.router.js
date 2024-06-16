
const express = require('express');
const WarehouseController = require('../controller/warehouse.controller');
const authMiddleware = require("../middleware/auth_middleware");
const router = express.Router();

router.post('/receivewarehouse', authMiddleware, WarehouseController.receiveMaterial);
router.get('/', authMiddleware, WarehouseController.fetchWarehouseData);
router.get('/po/:id', authMiddleware, WarehouseController.getPOById);
router.post('/update/:id', authMiddleware, WarehouseController.updatePo);
router.post('/updatecertorpassportbyid', authMiddleware, WarehouseController.updateCertOrPassportById);
router.get('/typecount', authMiddleware, WarehouseController.getTypeCount);
router.get('/filter', WarehouseController.filterWarehouseData);
router.post('/fetchselecteditems', authMiddleware, WarehouseController.fetchSelectedItemsById);
router.post('/receivetostock', authMiddleware, WarehouseController.receiveToStock);


module.exports = router;