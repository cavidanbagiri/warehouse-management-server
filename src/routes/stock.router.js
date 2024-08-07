
const express = require('express');
const router = express.Router();

const StockController = require('../controller/stock.controller.js');
const WarehouseController = require("../controller/warehouse.controller");
const authMiddleware = require("../middleware/auth_middleware");

router.get('/fetch/:projectId', StockController.getStocks); 
router.get('/filter', StockController.filterStockData); 
router.get('/:id', authMiddleware, StockController.getById); 
router.post('/datas', authMiddleware, StockController.getDataByIds); 
router.post('/provide', authMiddleware, StockController.provideStock); 
router.post('/update', authMiddleware, StockController.updateStock); // Checked
router.post('/return', authMiddleware, StockController.returnToWarehouse); // Checked
router.post('/setunusablematerial', authMiddleware , StockController.setUnusableMaterial); // Checked

module.exports = router;