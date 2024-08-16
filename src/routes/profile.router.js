
const express = require('express');
const router = express.Router();

const ProfileController = require('../controller/profile.controller');
const authMiddleware = require("../middleware/auth_middleware");

const multer = require("multer");

// Upload Image
const upload = multer({
    storage: multer.memoryStorage(),
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // }
})

router.post('/uploadprofileimage',authMiddleware, upload.single("file"), ProfileController.uploadProfileImage);

module.exports = router