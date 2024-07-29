
const express = require('express');
const router = express.Router();

const AreaController = require('../controller/area.controller');
const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/fetchareas/:projectId', AreaController.getAreas);
router.get('/filter', AreaController.filterAreaData); 
router.get('/:id', AreaController.getById); // Checked

router.post('/update', AreaController.updateArea);
router.post('/return', AreaController.returnArea);

module.exports = router