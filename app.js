// 載入套件 Require packages
const express = require('express')
// 引用路由器
const routes = require('./routes')

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


// 載入 Restaurant Model 
//const Restaurant = require('./models/restaurant')

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

// 將 request 導入路由器
app.use(routes)

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})

