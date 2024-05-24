
const express = require('express');
const WarehouseController = require('../controller/warehouse.controller');
const router = express.Router();

router.post('/receivewarehouse', WarehouseController.receiveMaterial);


module.exports = router;