// Import All dependencies
const express = require("express")
const path = require("path")
const routes = require("./routes")
const { cars } = require('./models')
const flash = require('connect-flash')
const session = require("express-session")
const app = express()
const PORT = 8080

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash())

// Initialization request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialization View engine
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// Middleware path
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "assets/svg")))
app.use(express.static(path.join(__dirname, "controllers")))

// Render view edit
app.get("/edit/car/:id", async(req, res) => {
  const id = req.params.id
  const data = await cars.findByPk(id)

  res.render("editCar", {
    title: "Dashboard | Edit Car",
    id,
    data
  })
})

// render view add
app.get("/add/car", (req, res) => {
  res.render("addCar", {
    title: "Dashboard | Add Car",
  })
})

// Use all routes
app.use(routes)
// app.use(flash())

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})