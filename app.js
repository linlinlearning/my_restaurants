// 載入套件 Require packages
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')

// 載入 Mongoose Require mongoose
const mongoose = require('mongoose')

// Mongoose　連線　mongoose connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// 取得連線狀態　Get mongoose connection status
const db = mongoose.connection
// 連線失敗　connection fails
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功　connection success
db.once('open', () => {
  console.log('mongodb connected!')
})


/* OLD: 先前用 json 檔案 Require restaurant list
const restaurantList = require('./restaurant.json')*/

// 載入 Restaurant Model 
const Restaurant = require('./models/restaurant')

// 設定連接埠 Define port
const port = 3000

// 設定樣板引擎 Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案 Set static files
app.use(express.static('public'))

// 經過 body-parser 處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 首頁 Define route for index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

// 進入新增餐廳的表單 Define route for new
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 新增餐廳 Define rout for POST/create
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 刪除餐廳 Define route for delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 詳細資訊 Define route for show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 進入修改餐廳頁面 Define  route for entering editing page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳資料 Define route for editing details
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const newData = req.body
  return Restaurant.findById(id) //查詢資料
    .then((restaurant) => { //若查詢成功，儲存為 restaurant 變數
      restaurant.name = newData.name // 修改資料名稱
      restaurant.category = newData.category
      restaurant.location = newData.location
      restaurant.google_map = newData.google_map
      restaurant.phone = newData.phone
      restaurant.rating = newData.rating
      restaurant.description = newData.description
      restaurant.image = newData.image
      return restaurant.save() // 並重新儲存
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳 Define rout for searching
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