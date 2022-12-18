const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require('body-parser')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use('/docs', express.static(path.join(__dirname, 'docs')))

app.use('/auth', require('./routes/userRoutes'))
app.use('/api/facturi', require('./routes/facturiRoutes'))
app.use('/api/client', require('./routes/clientRoutes'))

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})
