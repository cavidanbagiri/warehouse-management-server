
const express = require('express');
const router = express.Router();

const CommonController = require('../controller/common.controller');
const authMiddleware = require('../middleware/auth_middleware');

router.get('/projects', authMiddleware, CommonController.fetchProjects);
router.get('/groups', authMiddleware, CommonController.fetchGroups);
router.get('/companies', authMiddleware, CommonController.fetchCompanies);
router.get('/filtercompanies', authMiddleware,CommonController.filterCompanies);
router.get('/users', authMiddleware, CommonController.fetchUsers);
router.get('/ordereds', authMiddleware, CommonController.fetchOrdereds);
router.get('/filterordereds', authMiddleware, CommonController.filterOrdereds);
router.get('/rowinform/:module/:row_id', CommonController.getRowInfo);
router.get('/topcompanies', CommonController.getTopCompanies);
router.get('/stockanalyz/:project_id', CommonController.getStockAnalyz);
router.get('/groupchartanalyz/:project_id', CommonController.getGroupChartAnalyz);

module.exports = router;