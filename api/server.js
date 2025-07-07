const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const placesRoutes = require('./routes/places')
app.use('/places', placesRoutes)

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`)
})
