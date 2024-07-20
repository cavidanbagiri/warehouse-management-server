
const express = require('express');
const router = express.Router();

const StockController = require('../controller/stock.controller.js');
const WarehouseController = require("../controller/warehouse.controller");
const authMiddleware = require("../middleware/auth_middleware");

router.get('/fetch/:projectId', StockController.getStocks); // Checked
router.get('/filter', StockController.filterStockData); // Checked
router.get('/:id', StockController.getById); // Checked
router.post('/datas', StockController.getDataByIds); // Checked
router.post('/provide', authMiddleware, StockController.provideStock); // Checked
router.post('/update', StockController.updateStock); // Checked
router.post('/return',StockController.returnToWarehouse); // Checked

module.exports = router;