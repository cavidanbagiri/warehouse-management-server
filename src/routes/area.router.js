
const express = require('express');
const router = express.Router();

const AreaController = require('../controller/area.controller');
const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');

router.get('/fetchareas/:projectId', AreaController.getAreas);
router.get('/filter', AreaController.filterAreaData); 
router.get('/:id', AreaController.getById); 

router.post('/update', AreaController.updateArea);
router.post('/return', AreaController.returnArea);

router.get('/fetchcunusablematerials/:projectId', AreaController.getUnusableMaterials);
router.get('/fetchcservicematerials/:projectId', AreaController.getServiceMaterials);

router.post('/unusabletostock', AreaController.unusableReturnToStock);
router.post('/servicetostock', AreaController.serviceReturnToStock);


module.exports = router