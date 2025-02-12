const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// these are the new admin users
router.post('/', registerController.handleNewUser);

module.exports = router;