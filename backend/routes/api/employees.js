const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');
const pool = require('../../utils/db');


// Existing routes for actual users of the system (not admins)
router.route('/')
    .get(verifyRoles('Admin'), employeesController.getAllEmployees)
    .post(verifyRoles('Admin'), employeesController.createNewEmployee)
    .put(verifyRoles('Admin'), employeesController.updateEmployee)
    .delete(verifyRoles('Admin'), employeesController.deleteEmployee);



module.exports = router;