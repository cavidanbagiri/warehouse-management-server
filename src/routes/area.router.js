
const express = require('express');
const router = express.Router();

const AreaController = require('../controller/area.controller');
const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/fetchareas/:projectId', AreaController.getAreas);
router.get('/filter', AreaController.filterAreaData); 

module.exports = router