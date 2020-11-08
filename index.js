const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 4000

mongoose.connect('mongodb://localhost/snake')

app.use('/scripts', express.static(__dirname + '/scripts'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})