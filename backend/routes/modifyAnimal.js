const express = require('express');
const router = express.Router();
const modifyAnimalController = require('../controllers/modifyAnimalController');

// router.post('/', addAnimalController.handleNewAnimal);
router.post('/', modifyAnimalController.updateAnimal);
// router.post('/', modifyAnimalController.modifyAnimalById);
router.post('/', modifyAnimalController.insertAnimalObservationTreatment);
router.get('/', modifyAnimalController.getAnimalDataFromId);
router.put('/', modifyAnimalController.updateAnimalObservationTreatment);
// router.put('/', modifyAnimalController.updateAnimalDataById);
router.get('/', modifyAnimalController.getAllAnimalsData);

module.exports = router;
