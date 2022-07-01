// Require packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
// Require mongoose
const mongoose = require('mongoose')

// mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// Get mongoose connection status
const db = mongoose.connection
// connection fails
db.on('error', () => {
  console.log('mongodb error!')
})
// connection success
db.once('open', () => {
  console.log('mongodb connected!')
})


/* OLD: Require restaurant list
const restaurantList = require('./restaurant.json')*/

// New: Require Restaurant model
const Restaurant = require('./models/restaurant')

// Define port
const port = 3000

// Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Define route for index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

// Define route for new
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 新增餐廳
app.post('/create', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// Define route for show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// 搜尋特定餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          //data.name_en.toLowerCase().includes(keyword) ||
          data.category.includes(keyword) ||
          data.description.toLowerCase().includes(keyword)
      )
      if (filterRestaurantsData.length === 0) {
        res.render('no_results', { keyword: keyword })
      } else {
        res.render("index", { restaurants: filterRestaurantsData, keyword })
      }
    })
    .catch(err => console.log(err))
})





// Start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})