// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 搜尋特定餐廳 Define rout for searching
router.get('/search', (req, res) => {
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
// 匯出路由模組
module.exports = router