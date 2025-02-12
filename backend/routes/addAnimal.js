const express = require('express');
const router = express.Router();
const addAnimalController = require('../controllers/addAnimalController');

router.post('/', addAnimalController.handleNewAnimal);
// set route for get all animal from animal table
router.get('/', addAnimalController.getAllAnimals);

module.exports = router;
