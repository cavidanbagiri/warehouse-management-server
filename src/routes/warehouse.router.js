
const express = require('express');
const WarehouseController = require('../controller/warehouse.controller');
const router = express.Router();

router.post('/receivewarehouse', WarehouseController.receiveMaterial);
router.get('/', WarehouseController.fetchWarehouseData);
router.get('/po/:id', WarehouseController.getPOById);
router.post('/update/:id', WarehouseController.updatePo);
router.get('/typecount', WarehouseController.getTypeCount);
router.get('/filter', WarehouseController.filterWarehouseData);


module.exports = router;