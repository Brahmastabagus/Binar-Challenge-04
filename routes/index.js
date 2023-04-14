const router = require('express').Router()

const carController = require('../controllers/carController')

// GET
router.get("/dashboard", carController.getCar)

// GET by ID
router.get("/api/get/:id", carController.getIdCar)

// POST
router.post("/api/post", carController.postCar)

// PUT
router.post('/api/update/:id', carController.updateCar)

// DELETE
router.get('/api/delete/:id', carController.deleteCar)

module.exports = router