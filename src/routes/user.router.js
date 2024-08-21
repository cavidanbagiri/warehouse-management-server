
const express = require('express');
const router = express.Router();
const UserController = require( "../controller/user.controller");
const authMiddleware = require('../middleware/auth_middleware');
const isAdmin = require('../middleware/auth_admin');
const {body} = require('express-validator');



router.post('/login', UserController.userLogin);



// router.post('/register', authMiddleware, isAdmin,
//   body('email').isEmail(),
//   body('password').isLength({min:8, max:64}),
// UserController.userRegister);


router.post('/register', 
  body('email').isEmail(),
  body('password').isLength({min:8, max:64}),
UserController.userRegister);

router.post('/logout', UserController.userLogout);

router.get('/refresh', UserController.refresh);

router.get('/users', authMiddleware, UserController.fetchUsers);

module.exports = router;