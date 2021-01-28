const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const expensesRouter = require('./controllers/expenses')

const mongoURI = config.MONGODBURI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/expenses', expensesRouter)
app.use(middleware.errorHandler)


module.exports = app