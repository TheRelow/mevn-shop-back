require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')
const { routes } = require('./src/routes')

// Подключение к БД
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})

// Инициализация приложения
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes.forEach(item => {
  app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})

// Объявление роутов
const PORT = 3100
http.createServer({}, app).listen(PORT)
console.log(`Server running at ${PORT}`)