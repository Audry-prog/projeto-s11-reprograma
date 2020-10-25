const express = require('express')
const router = express.Router()
const controller = require('../controllers/petsController')

router.get('/', controller.getAllPets);
router.get('/:id', controller.getPetById);
router.put('/:id', controller.updatePet);
router.post('/', controller.createNewPet);

module.exports = router;