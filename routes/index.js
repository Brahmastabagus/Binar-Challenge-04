const router = require('express').Router()

const carController = require('../controllers/carController')
const upload = require('../middleware/uploader')

// GET
router.get("/dashboard", carController.getCar)

// GET by ID
router.get("/api/get/:id", carController.getIdCar)

// POST
router.post("/api/post", upload.single('image'), carController.postCar)

// PUT
router.post('/api/update/:id', upload.single('image'), carController.updateCar)

// DELETE
router.get('/api/delete/:id', carController.deleteCar)

module.exports = router