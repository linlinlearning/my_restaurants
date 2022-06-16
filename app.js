// Require packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// Require restaurant list
const restaurantList = require('./restaurant.json')

// Define port
const port = 3000

// Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Define route for index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// Define route for show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const selectedRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: selectedRestaurant })
})

// Define route for search results
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const filteredRestaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword))
  })

  if (filteredRestaurants.length === 0) {
    res.render('no_results', { keyword: keyword })
  } else {
    res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
  }
})

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})