const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/name/ase', (req, res) => {
  Restaurant.find().lean().sort({ name: 'asc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/name/desc', (req, res) => {
  Restaurant.find().lean().sort({ name: 'desc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/category', (req, res) => {
  Restaurant.find().lean().sort({ category: 'asc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

router.get('/location', (req, res) => {
  Restaurant.find().lean().sort({ location: 'asc' })
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => { console.log(error) })
})

module.exports = router