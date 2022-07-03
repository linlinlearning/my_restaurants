const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 進入新增餐廳的表單 Define route for new
router.get('/new', (req, res) => {
  res.render('new')
})
// 新增餐廳 Define rout for POST/create
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 刪除餐廳 Define route for delete
router.delete('/:id', (req, res) => {
  
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 詳細資訊 Define route for show page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 進入修改餐廳頁面 Define  route for entering editing page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳資料 Define route for editing details
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, req.body) //依照ID找到餐廳資料、更新資料、儲存至資料庫
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})


/* 修改餐廳資料 Define route for editing details
router.put('/:id', (req, res) => {
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
*/

module.exports = router