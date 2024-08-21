
const express = require('express');
const router = express.Router();

const upload = require('../middleware/multer_midd');

const AdminController = require('../controller/admin.controller');

const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');


router.post('/createproject', authMiddleware, isAdmin, AdminController.createProject);
// router.post('/createproject', AdminController.createProject);
router.get('/projects', authMiddleware, AdminController.fetchProjects); 

router.post('/createuserstatus', isAdmin, authMiddleware, AdminController.createUserStatus);
// router.post('/createuserstatus', AdminController.createUserStatus);
router.get('/fetchuserstatus', authMiddleware, AdminController.fetchUserStatus);

router.post('/creategroup', authMiddleware, AdminController.createGroup); // Checked
// router.post('/creategroup',  AdminController.createGroup); // Checked
router.get('/groups', authMiddleware, AdminController.fetchGroups); // Checked

router.post('/createcompany', authMiddleware, AdminController.createCompany); // Checked
router.get('/companies', authMiddleware, AdminController.fetchCompanies); // Checked

router.post('/createordered', authMiddleware, AdminController.createOrdered); // Checked
router.get('/fetchordereds', authMiddleware, AdminController.fetchOrdereds); // Checked


router.post('/creatematerialcode', authMiddleware, AdminController.createMaterialCode); // Testing
router.get('/materialcodes', authMiddleware, AdminController.fetchMaterialCodes);
router.get('/filtermaterialcodes', authMiddleware, AdminController.filterMaterialCodes);



module.exports = router;