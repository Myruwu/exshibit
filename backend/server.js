const path = require('path')
const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const cors = require('cors');
const app = express()

require('colors')
require('dotenv').config()

connectDB()
 
app.use(cors());
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Support Desk API',
  })
})


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
