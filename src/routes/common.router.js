
const express = require('express');
const router = express.Router();

const CommonController = require('../controller/common.controller');

router.get('/projects', CommonController.fetchProjects);
router.get('/groups', CommonController.fetchGroups);
router.get('/companies', CommonController.fetchCompanies);
router.get('/users', CommonController.fetchUsers);
router.get('/ordereds', CommonController.fetchOrdereds);

module.exports = router;