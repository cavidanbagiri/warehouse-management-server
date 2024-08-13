
const express = require('express');
const router = express.Router();

const AreaController = require('../controller/area.controller');
const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/fetchareas/:projectId', authMiddleware, AreaController.getAreas);
router.get('/filter', authMiddleware, AreaController.filterAreaData); 
router.get('/:id', authMiddleware, AreaController.getById); 

router.post('/update', authMiddleware, AreaController.updateArea);
router.post('/return', authMiddleware, AreaController.returnArea);

router.get('/fetchcunusablematerials/:projectId', authMiddleware, AreaController.getUnusableMaterials);
router.get('/fetchcservicematerials/:projectId', authMiddleware, AreaController.getServiceMaterials);

router.post('/unusabletostock', authMiddleware, AreaController.unusableReturnToStock);
router.post('/servicetostock', authMiddleware, AreaController.serviceReturnToStock);


module.exports = router