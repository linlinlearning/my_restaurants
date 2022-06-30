const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const Seeder = require('../restaurant.json')
const seederData = Seeder.results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < seederData.length; i++) {
    Restaurant.create({
      id: seederData[i].id,
      name: seederData[i].name,
      name_en: seederData[i].name_en,
      category: seederData[i].category,
      image: seederData[i].image,
      location: seederData[i].location,
      phone: seederData[i].phone,
      google_map: seederData[i].google_map,
      rating: seederData[i].rating,
      description: seederData[i].description
    })
  }
})