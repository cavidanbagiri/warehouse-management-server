
const express = require('express');
const router = express.Router();

const CommonController = require('../controller/admin.controller');

router.get('/projects', CommonController.fetchProjects);
router.get('/groups', CommonController.fetchGroups);
router.get('/companies', CommonController.fetchCompanies);

module.exports = router;