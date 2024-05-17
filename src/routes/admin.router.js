
const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer_midd');

const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');


router.post('/createproject', AdminController.createProject);
router.get('/projects', AdminController.fetchProjects);
router.post('/creategroup', AdminController.createGroup);
router.get('/groups', AdminController.fetchGroups);
router.post('/createcompany', AdminController.createCompany);
router.get('/companies', AdminController.fetchCompanies);

module.exports = router;