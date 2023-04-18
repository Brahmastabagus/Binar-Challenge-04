// Import all dependencies
const { Op } = require('sequelize');
const { cars } = require('../models')

// app.use(flash())

const imagekit = require('../lib/imagekit')

// Get all cars
const getCar = async (req, res) => {
  try {
    // Initialization variables
    let data = []
    let size = "all"

    if (req.query.size) { // if query size available
      if (req.query.size === "all") { // if query size is all
        data = await cars.findAll({ order: [["id", "Asc"]], })
        size = "all"
      } else if (req.query.size != "all") { // if query size except all
        size = req.query.size
        data = await cars.findAll({
          order: [["id", "Asc"]],
          where: {
            size: {
              [Op.eq]: req.query.size
            }
          }
        })
      } else {
        data = await cars.findAll({ order: [["id", "Asc"]], })
      }
    } else if (req.query.name) { // if query name avilable
      data = await cars.findAll({
        order: [["id", "Asc"]],
        where: {
          name: {
            [Op.substring]: req.query.name
          }
        }
      })
    } else {
      data = await cars.findAll({ order: [["id", "Asc"]], })
    }

    // console.log(req.flash());

    // req.flash('message', 'Data dengan id ${id} berhasil dirubah');

    res.render("index", {
      title: "Dashboard Cars",
      data,
      size,
      message: req.flash('message')
    })
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message
    })
  }
}

// Get car by ID
const getIdCar = async (req, res) => {
  try {
    const id = req.params.id
    const data = await cars.findByPk(id)

    res.status(201).json({
      status: 'success',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

// Post car
const postCar = async (req, res) => {
  try {
    const file = req.file

    // get extension file
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer, // required
      fileName: `IMG-${Date.now()}.${ext}`,
    })
    await cars.create({ ...req.body, image: img.url })

    req.flash('message', `Data berhasil ditambahkan`);
    res.redirect("/dashboard")
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

// Update car by ID
const updateCar = async (req, res) => {
  try {
    const file = req.file

    // get extension file
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer, // required
      fileName: `IMG-${Date.now()}.${ext}`,
    })

    const id = req.params.id
    // req.flash('message', 'Data dengan id ${id} berhasil dirubah');
    
    await cars.update({ ...req.body, image: img.url }, {
      where: {
        id
      }
    })
    
    req.flash('message', `Data dengan id ${id} berhasil dirubah`);
    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

// Delete car by ID
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id

    await cars.destroy({
      where: {
        id
      }
    })

    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

// app.use(flash())

module.exports = {
  getCar,
  getIdCar,
  postCar,
  updateCar,
  deleteCar
}