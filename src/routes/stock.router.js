
const express = require('express');
const router = express.Router();

const StockController = require('../controller/stock.controller.js');
const WarehouseController = require("../controller/warehouse.controller");

router.get('/', StockController.getStocks);
router.get('/filter', StockController.filterStockData);
router.get('/:id', StockController.getById);
router.post('/update', StockController.updateStock);
router.post('/return',StockController.returnToWarehouse);

module.exports = router;