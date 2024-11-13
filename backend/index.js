const express = require('express')
const cors = require('cors')

const app = express()

const RegisterRoutes = require('./routes/RegisterRoutes')

app.use(express.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use('/register', RegisterRoutes)

app.listen(3000)
