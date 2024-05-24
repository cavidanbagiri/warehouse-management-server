
const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer_midd');

const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');


router.post('/createproject', authMiddleware, AdminController.createProject);
router.get('/projects', authMiddleware, AdminController.fetchProjects);
router.post('/creategroup', authMiddleware, AdminController.createGroup);
router.get('/groups', authMiddleware, AdminController.fetchGroups);
router.post('/createcompany', authMiddleware, AdminController.createCompany);
router.get('/companies', authMiddleware, AdminController.fetchCompanies);
router.post('/createordered', AdminController.createOrdered);

module.exports = router;